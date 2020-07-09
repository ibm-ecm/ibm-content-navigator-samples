/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/dom-construct",
	"dojo/io-query",
	"dojo/aspect",
	"dojo/on",
	"dojo/string",
	"dojo/topic",
	"idx/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"ecm/model/Desktop",
	"ecm/model/Message",
	"ecm/model/Request",
	"ecm/model/Repository",
	"ecm/model/ResultSet",
	"ecm/widget/layout/_LaunchBarPane",
	"ecm/widget/viewer/ContentViewer",
	"dojo/text!./templates/ContentViewerFrame.html"
],

function(declare, lang, domAttr, domStyle, domConstruct, ioQuery, aspect, on, string, topic, idxBorderContainer, ContentPane, Desktop, Message, Request, Repository, ResultSet, _LaunchBarPane, ContentViewer, template) {

	/**
	 * @name embeddedContentViewerDojo.ContentViewerFrame
	 * @class Provides an embeddable viewer widget. <code>ContentViewer</code> creates instances of this widget, to
	 *        open single viewer instances.
	 * @augments ecm.widget.layout._LaunchBarPane
	 */
	return declare("embeddedContentViewerDojo.ContentViewerFrame", [
		_LaunchBarPane
	], {
		/** @lends embeddedContentViewerDojo.ContentViewerFrame.prototype */

		templateString: template,
		widgetsInTemplate: true,
		_documentQueue: [],

		_paneLabel: {
            "main": {
            	"left": "Right",
               	"right": "Left",
               	"bottom": "Top"
            },

			"split": {
			   	"left": "Left",
			   	"right": "Right",
			   	"bottom": "Bottom"
			}
		},

		postCreate: function() {
			this.logEntry("postCreate");
			this.inherited(arguments);

			this.own(
					this.connect(ecm.model.desktop, "onLogin", lang.hitch(this, function() {
			            this.loggedIn();
					})),

					this.connect(ecm.model.desktop, "onBeforeClose", lang.hitch(this, function(statusMessages) {
						var status = this.contentViewer.getViewersStatus(true);  // true says to include whether or not any viewers are spooling printouts.
		                this.getAllStatusMessages(status, statusMessages);
					})),

					aspect.before(ecm.model.desktop, "logoff", lang.hitch(this, function() {
						this.closeAllViewers();
						this.isLoaded = false;
					})),

					on(window, "message", lang.hitch(this, function(event) {
						var o = event.data;
						if ( !o.call ) {
							o = JSON.parse(o);
						}

						if ( o.call ) {
							this.logDebug("onMessage", "Message received: " + event.data.call);
							switch (o.call) {
							case "openDocument":
								this.openDocument(o.repositoryId, o.docId, o.classId, o.vsId, o.version);
								break;
							case "openBookmark":
								this.openBookmark(o.bookmarkUrl);
								break;
							case "closeAllViewers":
								this.closeAllViewers();
								break;
							}
						}
					})),

					topic.subscribe(this.contentViewer.mainTabContainer.id + "-addChild", lang.hitch(this, function() {
						if ( window.parent ) {
							var message = {
								call: "addChild",
								count: this.contentViewer.mainTabContainer.getChildren().length
							}
							window.parent.postMessage(JSON.stringify(message), "*");
						}
					})),

					topic.subscribe(this.contentViewer.mainTabContainer.id + "-removeChild", lang.hitch(this, function() {
						if ( window.parent ) {
							var message = {
								call: "removeChild",
								count: this.contentViewer.mainTabContainer.getChildren().length
							}
							window.parent.postMessage(JSON.stringify(message), "*");
						}
					}))
			);

			window.icnContentViewer = this;

			if ( window.parent ) {
				window.parent.postMessage("ready", "*");
			}

			this.logExit("postCreate");
		},

		getAllStatusMessages: function(status, statusMessages) {
			this._getStatusMessages(statusMessages, status.mainStatus, "main", status.splitMode);
			if ( status.splitStatus ) {
				this._getStatusMessages(statusMessages, status.splitStatus, "split", status.splitMode);
			}
		},

		_getStatusMessages: function(statusMessages, statusList, pane, splitMode) {
			if ( statusList && statusList.length > 0 ) {
				for (var n=0; n<statusList.length; n++ ) {
					var doc = statusList[n];
					if ( doc.isDirty ) {
						if ( splitMode != "none" ) {
							statusMessages.push(string.substitute("Document ${0}(${1}) has unsaved annotations that will be lost.",
									[doc.title,this._paneLabel[pane][splitMode]]));
						} else {
							statusMessages.push(string.substitute("Document ${0} has unsaved annotations that will be lost.", [doc.title]));
						}
					}
					if ( doc.isPrinting ) {
						if ( splitMode != "none" ) {
							statusMessages.push(string.substitute("Document ${0}(${1}) is printing and might be cancelled prematurely.",
									[doc.title,this._paneLabel[pane][splitMode]]));
						} else {
    						statusMessages.push(string.substitute("Document ${0} is printing and might be cancelled prematurely.", [doc.title]));
						}
					}
				}
			}
		},

		/**
		 * Open a document in the viewer.
		 */
		openDocument: function(repositoryId, docId, classId, vsId, version) {
			if ( this.isLoaded ) {
				this._openDocument(repositoryId, docId, classId, vsId, version);
			} else {
				this._queueDocument(repositoryId, docId, classId, vsId, version);
			}
		},

		/**
		 *  Parses a bookmark URL to a document and opens it in the viewer if found.
		 */
		openBookmark: function(bookmarkUrl) {
			var query = ioQuery.queryToObject(bookmarkUrl);
			this.openDocument(query.repositoryId, query.docid, query.template_name, query.vsId || null, query.version || null)
		},

		closeAllViewers: function() {
			if (this.contentViewer.splitTabContainer != null) {
				this.contentViewer.splitTabContainer.unloadViewers();
			}

			this.contentViewer.mainTabContainer.unloadViewers();
		},

		_openDocument: function(repositoryId, docId, classId, vsId, version) {
			var repository = ecm.model.desktop.getRepository(repositoryId);

			if ( repository != null ) {
				repository.retrieveItem(docId, lang.hitch(this, function(item) {
					this.contentViewer.open(item, false);
				}), classId, version, vsId);
			} else {
				var errorMessage = {
					id: "id???",
					number: 0,
					level: 4,
					messageProductId: "CIWEB",
					text:  "The repository " + repositoryId + " was not found, or could not be accessed.",
					userResponse:  "Ask your system administrator to verify existence and access to the repository.",
					explanation: "An attempt was made to retrieve repository information for repository " + repositoryId + ", but no repository information was found.",
					backgroundRequest: undefined
				};
				ecm.model.desktop.addMessage(errorMessage);
			}
		},

		_queueDocument: function(repositoryId, docId, classId, vsId, version) {
			this._documentQueue.push({
				repositoryId: repositoryId,
				docId: docId,
				classId: classId,
				vsId: vsId,
				version: version
			});
		},

		loggedIn: function() {
			if (this.selected && !this.isLoaded) {
				this.loadContent();
			} else {
				this.needReset = false;
			}
		},

		loadContent: function() {
			this.logEntry("loadContent");

			var queue = this._documentQueue;
			this._documentQueue = [];

			for ( var n=0; n < queue.length; n++ ) {
				var d = queue[n];
				this._openDocument(d.repositoryId, d.docId, d.classId, d.vsId, d.version);
			}

			this.isLoaded = true;

			this.logExit("loadContent");
		},

		reset: function() {
			this.needReset = false;
		}
	});
});
