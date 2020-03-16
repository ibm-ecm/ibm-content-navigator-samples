/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-construct",
	"ecm/model/Request",
	"ecm/widget/viewer/DocViewer",
	"dojo/text!./templates/SampleImageViewer.html",
	"ecm/LoggerMixin"
], //
function(declare, lang, xhr, dom, domStyle, domConstruct, Request, DocViewer, template, LoggerMixin) {

	var SampleImageViewer = declare("samplePluginDojo.SampleImageViewer", [
		DocViewer,
		LoggerMixin
	], {
		templateString: template,

		_itemLoaded: false,

		postCreate: function() {
			this.inherited(arguments);
		},

		setItem: function(item, pageNumber) {
			this.inherited(arguments);
			this._itemLoaded = false;
		},

		showItem: function() {
			var methodName = "showItem";
			this.logEntry(methodName);

			if (!this.isLoading() && !this._itemLoaded) {
				this.setIsLoading(true);
				this._loadImage();
			}

			this.logExit(methodName);
		},

		_loadImage: function() {
			var methodName = "_loadImage";
			this.logEntry(methodName);
			
			domStyle.set(this.containerNode, "overflow", "scroll");
			var img = this._setLoading(this.imageContainer, this._item.contentType);

			// get the document url
			var repository = this._item.repository;
			var imageUrl;
			var docUrlParams = {
				docid: this._item.id,
				repositoryId: repository.id,
				template_name: this._item.template,
				parm_part_filename: this._item.name
			};
			ecm.model.Request.setSecurityToken(docUrlParams);
			imageUrl = ecm.model.Request.getServiceRequestUrl("getDocument", repository.type, docUrlParams);
			this.logDebug(methodName, "image url is " + imageUrl);

			// display the image
			img.src = imageUrl;
			img.style.height = "auto";
			img.style.width = "auto";

			if (repository.type != "cmis") {
				domStyle.set(this.allAnnotations, "visibility", "visible");
				this._retrieveAnnotations(repository);
			} else {
				this._itemLoaded = true;
				this.onDocumentLoaded();
			}

			this.logExit(methodName);
		},

		_retrieveAnnotations: function(repository) {
			var methodName = "_retrieveAnnotations";
			this.logEntry(methodName);
			this._retrieveAnnotationData(repository, false, false, this.annotationContainer, lang.hitch(this, function(data, args) {
				this._retrieveNativeAnnotations(repository);
			}));
			this.logExit(methodName);
		},

		_retrieveNativeAnnotations: function(repository) {
			var methodName = "_retrieveNativeAnnotations";
			this.logEntry(methodName);
			this._retrieveAnnotationData(repository, true, false, this.nativeContainer, lang.hitch(this, function(data, args) {
				if (repository.type == "cm") {
					domStyle.set(this.cmBookmarks, "visibility", "visible");
					this._retrieveBookmarks(repository);
				} else {
					this._itemLoaded = true;
					this.onDocumentLoaded();
				}
			}));
			this.logExit(methodName);
		},

		_retrieveBookmarks: function(repository) {
			var methodName = "_retrieveBookmarks";
			this.logEntry(methodName);
			this._retrieveAnnotationData(repository, false, true, this.bookmarkContainer, lang.hitch(this, function(data, args) {
				this._retrieveCMBookmarks(repository);
			}));
			this.logExit(methodName);
		},

		_retrieveCMBookmarks: function(repository) {
			var methodName = "_retrieveCMBookmarks";
			this.logEntry(methodName);
			this._retrieveAnnotationData(repository, true, true, this.nativeBookmarkContainer, lang.hitch(this, function(data, args) {
				this._itemLoaded = true;
				this.onDocumentLoaded();
			}));
			this.logExit(methodName);
		},

		_retrieveAnnotationData: function(repository, nativeObj, bookmarks, annotationDomNode, loadCallback) {
			this._setLoading(annotationDomNode);

			var requestContent = {
				repositoryId: repository.id,
				repositoryType: repository.type,
				docid: this._item.id,
				vsId: this._item.vsId,
				version: "current",
				template_name: this._item.template,
				cmBookmarks: bookmarks
			};

			if (nativeObj === true) {
				requestContent.alt_output = "native";
			}
			Request.invokePluginService("SamplePlugin", "samplePluginGetAnnotationsService", {
				requestParams: requestContent,
				requestCompleteCallback: lang.hitch(this, function(data) { // success
					if (data) {
						if (data.p8AnnotationXml) {
							var p8Data = data.p8AnnotationXml + "\n\n";
							if (data.p8Annotations) {
								p8Data += JSON.stringify(data.p8Annotations, null, 4);
							}
							var xmp = domConstruct.create("xmp", {
								innerHTML: p8Data,
								style: "font-size: large"
							});
							domConstruct.place(xmp, annotationDomNode, "only");
						} else {
							var xmp = domConstruct.create("xmp", {
								innerHTML: JSON.stringify(data, null, 4),
								style: "font-size: large"
							});
							domConstruct.place(xmp, annotationDomNode, "only");
						}

					} else {
						var errorDiv = domConstruct.create("div", {
							innerHTML: "<p>Null data returned</p>"
						});
						domConstruct.place(errorDiv, annotationDomNode, "only");
					}

					this.onDocumentLoaded();
					loadCallback(data);
				}),
				requestFailedCallback : lang.hitch(this,function(response, errorMessages) {   
					if (lang.isArray(errorMessages) && errorMessages.length > 0) {
			 			var errorDiv = domConstruct.create("div", {
			 				innerHTML: "<p>" + errorMessages[0].text + "</p>"
			 			});
			 			domConstruct.place(errorDiv, annotationDomNode, "only");
			 			this._itemLoaded = true;
			 			this.onDocumentLoaded();	
			 		}
				}),
				backgroundRequest: true
			});
		},

		_setLoading: function(annotationDomNode, altValue) {
			if (!altValue) {
				altValue = "Loading...";
			}

			var img = domConstruct.create("img", {
				'class': 'loadingPreviewImg',
				alt: altValue,
				title: altValue,
				src: ecm.model.desktop.getServicesUrl() + "/ecm/widget/resources/images/busy_large.gif",
				onerror: function() {
					this.src = ecm.model.desktop.getServicesUrl() + "/ecm/widget/resources/images/spacer.gif";
				}
			});

			domConstruct.place(img, annotationDomNode, "only");
			return img;
		}
	});

	return SampleImageViewer;
});
