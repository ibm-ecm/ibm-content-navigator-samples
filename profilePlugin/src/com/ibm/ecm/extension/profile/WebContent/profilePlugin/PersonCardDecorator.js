/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
/* 
Licensed Materials - Property of IBM

Copyright IBM Corp. 2012 All Rights Reserved.

US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with
IBM Corp.

DISCLAIMER OF WARRANTIES :                                             
                                                                       
Permission is granted to copy and modify this  Sample code, and to           
distribute modified versions provided that both the copyright        
notice, and this permission notice and warranty disclaimer appear
in all copies and modified versions. 

THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND
LICENSORS DISCLAIM ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, IN SUCH SAMPLE
CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES
OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  IN NO EVENT WILL
IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR ANY DAMAGES ARISING OUT OF
THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE
CODE, OR COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT
SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE FOR ANY LOST REVENUE,
LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL,
INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY
OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE BEEN ADVISED OF
THE POSSIBILITY OF SUCH DAMAGES.                                     
*/

define(["dojo/_base/lang",
        "dojo/_base/event",
        "dojo/_base/window",
    	"dojo/string",
        "dojo/dom-construct",
        "idx/html",
        "profilePlugin/HoverCard",
        "profilePlugin/PersonCard",
        "profilePlugin/Messages",
    	"ecm/model/Request",
    	"ecm/widget/listView/decorators/common"
        ], 
function(lang, event, dojo_win, string, domConstruct, idxHtml, HoverCard, PersonCard, Messages, Request, common) {
	
	lang.setObject("businessHoverCardDecorator", function() {
		var entry = '<span data-dojo-attach-point="entry"></span>';
		return entry;
	});
	
	lang.setObject("businessHoverCardCellValue", function(gridData, storeData, cellWidget) {
		// memory cleanup and decorator value reset when column is sorted
		cellWidget.uninitialize();
		cellWidget.entry.innerHTML = "";

		var rowId = cellWidget.cell.row.id;
		var item = this.grid.row(rowId).item();

		if (item.isInstanceOf && item.isInstanceOf(ecm.model.Teamspace)) {
			var userInfo = item.lastModifiedUserInfo;
			profilePlugin.addUserToCache(userInfo.shortName, userInfo.displayName, userInfo.emailAddress);
		}
		
		var valueNode = profilePlugin._getValueNode(gridData, cellWidget, null, item);
		domConstruct.place(valueNode, cellWidget.entry);
		
		// Make sure we destroy hover cards when the cellWidget is destroyed or we will leak DOM nodes
		cellWidget.uninitialize = function() {
			var objsToDestroy = cellWidget.objectsToDestroy;
			if (objsToDestroy) {
				for ( var i in objsToDestroy) {
					objsToDestroy[i].destroy();
				}
				cellWidget.objsToDestroy = null;
			}
		};
	});
	
	lang.setObject("businessHoverCardMagazineDecorator", function(cellWidget, domNode, name, gridData, field) {
		// name is display name of the field, e.g. "Modified By"
		var rowId = cellWidget.cell.row.id;
		var item = this.grid.row(rowId).item();
		
		// Add the separator
		if (domNode.children && domNode.children.length > 0) {
			domConstruct.place(domConstruct.create("span", {
				"class": "labelValueSeparator",
				innerHTML: "|"
			}), domNode, "last");
		}

		// Add the label and value
		domConstruct.place(domConstruct.create("span", {
			innerHTML: "<label>" + string.substitute(ecm.messages.append_colon, [
				idxHtml.escapeHTML(name)
			]) + "</label>"
		}), domNode, "last");
		
		var userInfo = null;
		if (item.isInstanceOf && item.isInstanceOf(ecm.model.Teamspace)) {
			userInfo = item.lastModifiedUserInfo;
		} else {
			userInfo = item.getUserInfo(field);
		}
		if (userInfo) {
			shortName = userInfo; // in the case of CM8, only userId is returned in userInfo
			if (userInfo.shortName) { // P8
				shortName = userInfo.shortName;
			}
		}
		
		if (!profilePlugin.configuration.profile_server && profilePlugin.isSametimeAvailable()) {
			profilePlugin.createLiveName(shortName, domNode, item.repository);
		} else if (profilePlugin.canShowBusinessCard()) {
			profilePlugin.createHoverCard(cellWidget, shortName, domNode, item.repository);
		} else if (!profilePlugin.configuration.profile_server && !profilePlugin.isSametimeAvailable() && 
				profilePlugin.configuration.showDisplayName) {
			profilePlugin.showDisplayName(shortName, domNode, item.repository);
		} else { // default: show shortname
			domConstruct.place(domConstruct.create("span", {userId: name, "class": "awareness", innerHTML: shortName}),
				domNode, "last");
		}
	});
	
	profilePlugin.canShowBusinessCard = function() {
		return profilePlugin.configuration.profile_server; 
	};
	
	profilePlugin._lookupComplete = function(shortName, response) {
        var userObj = {};
        var email = null;
        if (response) {
        	email = response.email;
        	userObj = {
        		email: email,
        		shortName: response.shortname,
            	displayName: response.displayName
        	}
        	profilePlugin.userHash[shortName] = userObj;
        }
    	if (!email) {
    		console.dir(["email address is empty while looking up", shortName, response]);
    	}
        return userObj;
	};
	
	profilePlugin._lookupFailed = function(shortName, response) {
        var userEmail = null;
        var userName = shortName;
        var userDisplayName = null;
        if (response) {
            userEmail = response.email;
            userDisplayName = response.displayName;
        }

        console.dir(["PersonCardDecorator - lookup service call failed.", userEmail, userName, response]);
	};
	
	profilePlugin.getShortNameFromCell = function(cellWidget, item, name) {
		if (cellWidget.cell) {
			var cell = cellWidget.cell.column;
			var fields = cellWidget.cell.column.fieldsToDisplay;
			var field = null;
			for(var field in fields) {
				if (fields[field].displayName == name) {
					field = fields[field].field;
					break;
				}
			}
		}
		return profilePlugin._getRealShortName(cellWidget, field, item);
	};
	
	profilePlugin.createHoverCard = function(cellWidget, gridData, targetNode, repository) {
		if (cellWidget && !cellWidget.objectsToDestroy) {
			cellWidget.objectsToDestroy = [];
		}
		
		if (!repository) {
			repository = profilePlugin.getRepository();
		}
		var nameText = gridData;
		if (profilePlugin.configuration.showDisplayName) {
			nameText = " ";
		}
		var attachNode = domConstruct.create("a", {href: "#", innerHTML: nameText}, targetNode);
		
		if (profilePlugin.configuration.showDisplayName) {
			var nameNode = domConstruct.create("div", {style: "display: inline"}, attachNode);
			profilePlugin.showDisplayName(gridData, nameNode, repository);
		}
		
		if (profilePlugin.userHash[gridData]) {
			profilePlugin._createHoverCard(cellWidget, gridData, attachNode, repository);
		} else {
			var shortName = gridData;
			if (repository.type == "p8") {
				Request.invokePluginService("ProfilePlugin", "profilePluginLookupService", {
					requestParams: {
						repositoryId: repository.id, 
						shortname: shortName
					},
					requestCompleteCallback: function(response) { // success
						profilePlugin._lookupComplete(shortName, response);
						profilePlugin._createHoverCard(cellWidget, shortName, attachNode, repository);
	                },
	                requestFailedCallback : dojo.hitch(this,function(response) {   
	                	profilePlugin._lookupFailed(shortName, response);
						attachNode = domConstruct.create("span", {userId: shortName, "class": "awareness", innerHTML: shortName}, targetNode);
	                    return;
	                }),
	                backgroundRequest: true
	            });
			} else {
				profilePlugin._createHoverCard(cellWidget, shortName, attachNode, repository);
			}
		}
	};
	
	profilePlugin.getEmailQueryParameters = function(email) {
		var query = {
			email: email
		};
		return query;
	};
	
	profilePlugin._createHoverCard = function(cellWidget, shortName, attachNode, repository) {
		var email = shortName;
		var userDisplayName = shortName;
		var realShortName = shortName;
		
		if (!repository) {
			repository = profilePlugin.getRepository();
		}
		var userObj = profilePlugin.userHash[shortName];
		if (userObj) {
			email = userObj.email;
			userDisplayName = userObj.displayName;
			realShortName = userObj.shortName;
		}

		// Create the hover card
		var hoverCard = new HoverCard({
			target: attachNode,
			moreActionsLabel: Messages["button.links"],
			onShow: function() {
				if (!hoverCard.retrievedCardData) {
					var query = profilePlugin.getEmailQueryParameters(email || shortName);
					var personCard = new PersonCard({
						repository: repository,
						query: query,
						jsonp: "callback",
						url: profilePlugin.configuration.profile_server,
						spec: [ "photo","fn","title","org","adr","tel.work","role","sametime.awareness"],
						placeHolder: shortName,
						valueCallback: function(profileData) {
							if (profileData) {
								var actions = null;
								if (profileData.email.internet) {
									actions = [];
									actions.push({
										label: Messages["button.send.email"],
										link: null,
										onClick: function() {
											window.location.href = "mailto:" + profileData.email.internet;
										}
									});
								}
								
								var moreActions = null;
								if (profileData.X_bizCardServiceLinks) {
									var links = profileData.X_bizCardServiceLinks;
									moreActions = [];
									
									for (var i=0; i < links.length; i++) {
										var link = links[i];
										moreActions.push({
											label: Messages["connections." + link.name],
											href: link.href,
											onClick: function() {
												window.open(this.href, "new");
											}
										});
									}
								}
								
								hoverCard.set("actions", actions);
								hoverCard.set("moreActions", moreActions);
								hoverCard.set("content", personCard);
								hoverCard.retrievedCardData = true;
							}
						}
					});
				}
			}
		});
		
		// Add object to the cell widget for cleanup later.
		if( cellWidget) cellWidget.objectsToDestroy.push(hoverCard);
	};
	
	lang.setObject("businessHoverCardTeamspaceMagazineDecorator", function() {
		var entry = '<div style="width: 100%" data-dojo-attach-point="entry"></div>';
		return entry;
	});
	
	lang.setObject("businessHoverCardTeamspaceMagazineCellValue", function(gridData, storeData, cellWidget) {
		// Uninitialize the cellWidget
		cellWidget.uninitialize = lang.hitch(this, function() {
			var objsToDestroy = cellWidget.objectsToDestroy;
			if (objsToDestroy) {
				for ( var i in objsToDestroy) {
					objsToDestroy[i].destroy();
				}
				cellWidget.objsToDestroy = null;
			}
			var objsToRemove = cellWidget.objectsToRemove;
			if (objsToRemove) {
				for ( var i in objsToRemove) {
					objsToRemove[i].remove();
				}
				cellWidget.objectsToRemove = null;
			}
		});
		
		var rowId = cellWidget.cell.row.id;
		var item = this._grid.row(rowId).item();
		var name = item.getValue("name");
		
		if (item.state == "default") {
			name += " (" + ecm.messages.repository_tab_DefaultTemplate + ")";
		}
		
		var stateIconValue = common.stateIcon(item);
		var stateIcons = stateIconValue ? stateIconValue.toString() : null;
		if (!stateIcons || stateIcons == "&nbsp;")
			stateIcons = "";
		else
			stateIcons += "&nbsp;";
		var firstElement = domConstruct.create("span", {"innerHTML": stateIcons});

		var nextElement;
		if (item.state == "offline" && item.type == "instance" && !item.currentUserIsOwner) {
			nextElement = domConstruct.create("div", {
				"class": "title",
				innerHTML: this.grid.enforceTextDirWithUcc(0, idxHtml.escapeHTML(name))
			});
		}
		else {
			nextElement = domConstruct.create("a", {
				"class": "title", 
				href:"javascript:;", 
				onclick: lang.hitch(this, function(evt) {
					event.stop(evt);
					ecm.widget.listView.ContentList.callMethod(this.id, '_performDefaultActionForRowId', rowId);
					return false;
				}),
				innerHTML: this.grid.enforceTextDirWithUcc(0, idxHtml.escapeHTML(name))
			});
		}
		
		if (item && item.syncEnabled) {

			var itemToSync = item;
			if (item.item) {
				itemToSync = item.item;
			}

			var syncImg = domConstruct.create("img", {
				src: require.toUrl("dojo/resources/blank.gif"),
				'className': item.getStateClass("syncEnabled"),
				alt: ecm.messages.sync_favorite_enable_hover,
				title: ecm.messages.sync_favorite_enable_hover,
				onclick: function(evt) {
					ecm.model.desktop.syncServer.disableSyncForItems([
						itemToSync
					]);
					itemToSync.syncEnabled = false;
					item.syncEnabled = false;
				}
			});
			firstElement.appendChild(syncImg);
		}
		
		firstElement.appendChild(nextElement);
		domConstruct.place(firstElement, cellWidget.entry, "only");

		cellWidget.entry.appendChild(domConstruct.create("br"));
		var content = domConstruct.create("div", {"class": "content"});

		var description = item.getValue("desc");
		if (description && description.length > 0) {
			content.appendChild(domConstruct.create("span", {"class": "summary", innerHTML: idxHtml.escapeHTML(description)}));
			content.appendChild(domConstruct.create("br"));
		}

		var modifiedByLabel = ecm.messages.modified_label;
		var modifiedBy = item.getDisplayValue ? item.getDisplayValue("lastModifiedUser") : item.getValue("lastModifiedUser");
		var modifiedTimestampLabel = ecm.messages.modified_date_label;
		var stateLabel = ecm.messages.status_label;
		var modifiedTimestamp = item.getDisplayValue ? item.getDisplayValue("lastModified") : item.getValue("lastModified");
		
		content.appendChild(domConstruct.create("label", {innerHTML: modifiedByLabel}));
		content.appendChild(document.createTextNode(" "));
		content.appendChild(profilePlugin._getValueNode(modifiedBy, cellWidget, "lastModifiedUser", item));
		content.appendChild(document.createTextNode(" | "));
		content.appendChild(domConstruct.create("label", {innerHTML: modifiedTimestampLabel}));
		content.appendChild(document.createTextNode(" "));
		content.appendChild(document.createTextNode(modifiedTimestamp));
		
		if (item.type == "template" || item.type == "instance") {
			var stateMsg = null;
			if (item.state == "validate")
				stateMsg = ecm.messages.workspace_stat_validate;
			else if (item.state == "offline")
				stateMsg = ecm.messages.workspace_stat_offline;
			else if (item.state == "pendingDelete")
				stateMsg = ecm.messages.workspace_stat_pendingDelete;
			else if (item.state == "deleteError")
				stateMsg = ecm.messages.workspace_stat_deleteError;
			else if (item.state != "deleted")
				stateMsg = ecm.messages.workspace_stat_online;

			content.appendChild(domConstruct.create("span", {"class": "labelValueSeparator", "innerHTML": "|"}));
			content.appendChild(domConstruct.create("label", {innerHTML: stateLabel}));
			content.appendChild(document.createTextNode(" "));
			content.appendChild(document.createTextNode(stateMsg));
		}
		
		cellWidget.entry.appendChild(content);
	});

	profilePlugin._getRealShortName = function(cellWidget, field, currentItem) {
		var currentColumnName = field;
		if (!field && cellWidget.cell)
			currentColumnName = cellWidget.cell.column.field(); // such as LastModifier
		
		if (currentItem.isInstanceOf(ecm.model.Teamspace))
			return currentItem[currentColumnName];
		else
			return currentItem.attributes[currentColumnName];
	};
	
	profilePlugin._getValueNode = function(name, cellWidget, field, item, propertyName) {
		var valueNode = null;
		var userInfo = null;
		if (item.isInstanceOf && item.isInstanceOf(ecm.model.Teamspace)) {
			userInfo = item.lastModifiedUserInfo;
		}
		else {
			userInfo = item.getUserInfo(field);
		}
		var shortName = name;
		if (userInfo) {
			shortName = userInfo; // in the case of CM8, only userId is returned in userInfo
			if (userInfo.shortName) { // P8
				shortName = userInfo.shortName;
			}
		}
		else {
			shortName = profilePlugin.getShortNameFromCell(cellWidget, item, name);
		}
		if (name != shortName) {
			name = shortName;
		}
		if (!profilePlugin.configuration.profile_server && profilePlugin.isSametimeAvailable()) {
			valueNode = domConstruct.create("span", {userId: name, "class": "awareness", innerHTML: "&nbsp;"});
			profilePlugin.createLiveName(name, valueNode, item.repository);
		} else if (profilePlugin.canShowBusinessCard()) {
			valueNode = domConstruct.create("span", {innerHTML: "&nbsp;"});
			profilePlugin.createHoverCard(cellWidget, name, valueNode, item.repository);
		} else if (!profilePlugin.configuration.profile_server && !profilePlugin.isSametimeAvailable() && 
				profilePlugin.configuration.showDisplayName) {
			valueNode = domConstruct.create("span", {innerHTML: "&nbsp;"});
			profilePlugin.showDisplayName(name, valueNode, item.repository);
		} else { // default: show shortname
			valueNode = domConstruct.create("span", {userId: name, "class": "awareness", innerHTML: name});
		}
		
		return valueNode;
	};
});
