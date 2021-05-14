/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/aspect",
         "ecm/content/ContentDialog",
         "ecm/model/Request",
         "ecm/widget/layout/CommonActionsHandler",
         "ecm/widget/viewer/model/ViewerItem"], 
function(declare, lang, aspect, ContentDialog, Request, CommonActionsHandler, ViewerItem) {		
	/**
	 * Use this function to add any global JavaScript methods your plug-in requires.
	 */

	// overwrites ICN function to create only download event for view operations leading to download 
	CommonActionsHandler.prototype.actionView = function(repository, items, callback, teamspace, resultSet, parameterMap, openUseSelf) {
		var methodName = "actionView";
		this.logEntry(methodName);
		
		for ( var item in items )  {
			if ( item.contentElementParentId != null ) {
				item.id = item.contentElementParentId;
			}
		}
		
		var contentItems = this._convertItems(items);
		var repository = items[0].repository;
		repository.addRecentItems(items);
		
		if (!resultSet) {
			resultSet = items[0].resultSet;
		}

		var message;

		if (CommonActionsHandler._viewAction.canPerformAction(repository, contentItems, "", null, resultSet)) {
			ecm.model.desktop.loadViewerClasses(lang.hitch(this, function() {
				var viewerPopupQueue = new Array();
				var downloadQueue = new Array();
				for ( var i in contentItems) {
					var contentItem = contentItems[i];
					this.logDebug(methodName, "Getting viewer for contentitem.");
					var version = contentItem._getSearchVersion(resultSet);
					contentItem.version = version;
					if(contentItem.mimetype == "application/line" && contentItem.repository && contentItem.repository.type == "od"){
						if(parameterMap && parameterMap.viewFullReport == true)
							contentItem.viewFullReport = true;
						else if(contentItem.viewFullReport)
							contentItem.viewFullReport = false;
					}
					var viewerItem = new ViewerItem(contentItem);
					var handled = false;

					var viewer = viewerItem.getViewer(false);
					if (viewer != null) {
						if (viewer.id == "noViewerViewer") {
							handled = true;
							if (!this._actionViewNoViewer(contentItem)) {
								message = ecm.model.Message.createErrorMessage("no_viewer_to_view_error");
								if (message) {
									ecm.model.desktop.addMessage(message);
								}
							}
						} else if (contentItem.hasContent && contentItem.hasContent()) {
							handled = true;
							if (viewer.launchInSeparateWindow) {
								if (this._delegateToDownload(viewer, contentItem)) {
									downloadQueue.push(contentItem);
								} else {
									var viewerUrl = viewer.getLaunchUrl(contentItem);
									var popupWindow = window.open("", "_blank");
									if( viewer.id == "browser" ){
										popupWindow.opener = null;
										if( popupWindow.document ){
											popupWindow.document.cookie = null;
										}
									}
									ecm.widget.viewer.model.ViewerItem.loadSecure(popupWindow, viewerUrl, true);
								}
							} else {
								//ecm.widget.dialog.contentViewerWindow.open(contentItem);
								// Queue these up so that we can tell the viewer to only launch the last visible out of the list.
								viewerPopupQueue.push(contentItem);
							}
						}
					} else {
						handled = this._actionViewInternal(repository, contentItem, callback, teamspace, resultSet, parameterMap, openUseSelf);
						if (!handled) {
							this._actionViewNoViewer(contentItem);
							message = ecm.model.Message.createErrorMessage("viewer_unable_to_view_error");
							if (message) {
								ecm.model.desktop.addMessage(message);
							}
							handled = true;
						}
					}

					if (!handled) {
						this.actionEdit(repository, items);
					}
				}

				// If there are any going to the viewer framework launch them now as a batch.
				if (viewerPopupQueue.length > 0) {
					console.log("CustomEventPlugin - actionView - viewing items");
					var docIds = getDocIds(viewerPopupQueue);
					createEvent("View", repository.id, repository.type, docIds);

					if (ecm.model.desktop.viewInDialog && !ecm.widget.dialog.contentViewerWindow._hasContentViewer()) {
						ContentDialog.singleton().openContent(viewerPopupQueue);
					} else {
						ecm.widget.dialog.contentViewerWindow.open(viewerPopupQueue);						
					}					
				}

				if (downloadQueue.length > 0) {
					this.actionDownload(repository, downloadQueue, callback, teamspace, resultSet, parameterMap);
				}
			}));
		} else {
			message = Message.createErrorMessage("viewer_privilege_to_view_error");
			if (message) {
				ecm.model.desktop.addMessage(message);
			}
		}
	};
	
	// create event when user clicks "Merge and Split" action
	aspect.after(CommonActionsHandler.prototype, "actionMergeSplit", function(repository, items) {
		console.log("CustomEventPlugin - actionMergeSplit is called");	
		var docIds = getDocIds(items);
		createEvent("MergeSplit", repository.id, repository.type, docIds);		
	}, true);
	
	// create event when user clicks Preview action
	aspect.after(CommonActionsHandler.prototype, "actionPreview", function(repository, items) {
		console.log("CustomEventPlugin - actionPreview is called");	
		var docIds = getDocIds(items);
		createEvent("Preview", repository.id, repository.type, docIds);		
	}, true);

	// create event for download invoked by View, "Download As Original" and "Check Out and Download" actions.
	aspect.after(CommonActionsHandler.prototype, "actionDownload", function(repository, items) {
		console.log("CustomEventPlugin - actionDownload is called");	
		var docIds = getDocIds(items);
		createEvent("Download", repository.id, repository.type, docIds);		
	}, true);
	
	// create event when user clicks Download All action
	aspect.after(CommonActionsHandler.prototype, "actionDownloadAll", function(repository, items) {
		console.log("CustomEventPlugin - actionDownloadAll is called");	
		var docIds = getDocIds(items);
		createEvent("DownloadAll", repository.id, repository.type, docIds);		
	}, true);

	// create event for download using Aspera, that may be invoked by "Download As Original" and "Check Out and Download" actions.
	aspect.after(CommonActionsHandler.prototype, "actionAsperaDownload", function(repository, item) {
		console.log("CustomEventPlugin - actionAsperaDownload is called");	
		createEvent("AsperaDownload", repository.id, repository.type, [item.id]);		
	}, true);
	
	// create event when user clicks Download As PDF action
	aspect.after(CommonActionsHandler.prototype, "actionDownloadAsPdf", function(repository, items) {
		console.log("CustomEventPlugin - actionDownloadAsPdf is called");	
		var docIds = getDocIds(items);
		createEvent("DownloadAsPdf", repository.id, repository.type, docIds);		
	}, true);

	// create event when user clicks "Download All Parts as a PDF file" action
	aspect.after(CommonActionsHandler.prototype, "actionDownloadAllAsPdf", function(repository, items) {
		console.log("CustomEventPlugin - actionDownloadAllAsPdf is called");	
		var docIds = getDocIds(items);
		createEvent("DownloadAllAsPdf", repository.id, repository.type, docIds);		
	}, true);
	
	// get docid array from items array
	function getDocIds(items) {
		var docIds = [];
		for ( var i in items )  {
			docIds.push(items[i].id);
		}
		return docIds;		
	}
	
	function createEvent(actionId, repositoryId, serverType, docIds) {
		if (serverType == "p8") {
			var params = {
					actionId: actionId,
					repositoryId: repositoryId,
					docIds: docIds
				};
			console.log("CustomEventPlugin - createEvent - actionId: " + actionId + ", repositoryId: " + repositoryId + ", docIds: " + docIds);
			
			Request.invokePluginService("CustomEventPlugin", "RaiseEventService", {
				requestParams: params,
				requestCompleteCallback: lang.hitch(this, function(data) { // success
					console.log("CustomEventPlugin - createEvent - RaiseEventService completed");
				}),
				requestFailedCallback : lang.hitch(this,function(response, errorMessages) {   
					console.error("CustomEventPlugin - createEvent - RaiseEventService failed");
				}),
				backgroundRequest: true
			});
		}		
	}
});
