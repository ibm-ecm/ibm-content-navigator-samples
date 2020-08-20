/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/_base/lang",
         "dojo/_base/connect",
         "dojo/_base/array",
         "dojo/dom-construct",
         "dojo/_base/sniff",
         "dojo/dom-style",
         "profilePlugin/PersonCard",
         "profilePlugin/PersonCardDecorator",
         "profilePlugin/SametimeAwareness",
         "ecm/model/Desktop",
         "ecm/model/Request",
		 "ecm/widget/TeamList",
		 // Including these for the compression build. They're not used within this JavaScript class.
		 "profilePlugin/ConfigurationPane",
		 "profilePlugin/Messages",
		 "profilePlugin/HoverCard",
		 "profilePlugin/PropertyGridFormatter"], 
function(
	lang, 
	connect,
	dojo_array,
	domConstruct, 
	has,
	domStyle,
	PersonCard, 
	PersonCardDecorator, 
	SametimeAwareness, 
	Desktop, 
	Request, 
	TeamList) {
	if (!window.profilePlugin || !window.profilePlugin.configuration) { 
		lang.setObject("profilePlugin.configuration", "");
	}
	if (!profilePlugin.userHash) {
		lang.setObject("profilePlugin.userHash", {});
	}

	profilePlugin.getEmail = function (shortName) {
		var userObject = profilePlugin.userHash[shortName]; 
		return userObject ? userObject.email : null; 
	};
	
	profilePlugin.getDisplayNameFromCache = function (shortName) {
		var userObject = profilePlugin.userHash[shortName]; 
		return userObject ? userObject.displayName : shortName;
	};
	
	profilePlugin.getNameToDisplay = function (shortName, displayName) {
		if (!displayName) {
			displayName = profilePlugin.getDisplayNameFromCache(shortName);
		}
		if (!displayName) return shortName;
		if (!shortName) return displayName;
		if (shortName === displayName) return displayName;
		return profilePlugin.configuration.showDisplayName ? displayName : shortName; 
	};
	
	profilePlugin._fieldsForSametime = 
		[
		 "modifiedBy",
		 "createdBy",
		 "LastModifier",
		 "Creator",
		 "cmis:lastModifiedBy",
		 "cmis:createdBy"
		];

	profilePlugin.isUserNameField = function(columnName) {
		if (!columnName)
			return false;
		var index = dojo_array.indexOf(profilePlugin._fieldsForSametime, columnName);
		return index >= 0;
	};

	profilePlugin.processNode = function(targetNode, shortName, userDisplayName, bAppendToExisting) {
		if (!bAppendToExisting) {
			targetNode.innerHTML = "";
		}
		domConstruct.create("span", 
				{
					userId: shortName, 
					"class": "awareness", 
					innerHTML: userDisplayName
				}, targetNode);
	};
	
	profilePlugin.getRepositoryId = function() {
		return Desktop.getDefaultRepository().id;
	};
	
	profilePlugin.getRepository = function() {
		return Desktop.getDefaultRepository();
	};
	
	profilePlugin.addUserToCache = function(shortName, displayName, emailAddress) {
		profilePlugin.userHash[shortName] = {shortName: shortName, displayName: displayName, email: emailAddress}; 
	};
	
	profilePlugin.showDisplayName = function(shortName, targetNode, repository, callback) {
		if (!callback) {
			callback = profilePlugin.processNode;
		}
		if (profilePlugin.shouldUseShortName()) {
			// if 'show Display name' is not checked, just show short name
    		callback(targetNode, shortName, shortName);
			return;
		}
		if (!repository) { 
			repository = Desktop.getDefaultRepository();
		}
		var userObj = this.userHash[shortName];
		var userDisplayName;
        if (userObj) {
        	userDisplayName = userObj.displayName;
       		callback(targetNode, shortName, userDisplayName);
        } else {  
        	if (repository.type == "p8") {
	        	Request.invokePluginService("ProfilePlugin", "profilePluginLookupService", {
					requestParams: {
						repositoryId: repository.id, 
						shortname: shortName
					},
					requestCompleteCallback: lang.hitch(this, function(response) { // success
						userObj = profilePlugin._lookupComplete(shortName, response);
			        	userDisplayName = userObj.displayName;
			        	callback(targetNode, shortName, userDisplayName);
	                }),
	                requestFailedCallback : lang.hitch(this,function(response) {   
	                	profilePlugin._lookupFailed(response);
	                	callback(targetNode, shortName, shortName);
	                }),
	                backgroundRequest: true
	            });
        	} else {
        		callback(targetNode, shortName, shortName);
        	}
        }
	};
	
	if (!profilePlugin.loginHandle) {
		profilePlugin.loginHandle = connect.connect(Desktop, "onLogin", function() {
			if (Desktop.id == "admin" || Desktop.repositories.length == 0) {
				// do nothing in admin desktop
				return;
			}
			Request.invokePluginService("ProfilePlugin", "profilePluginService", {
				requestCompleteCallback: function(response) { // success
					if (response) {
						lang.setObject("profilePlugin.configuration", response);
						profilePlugin.initSametime();
					}
				},
				requestFailedCallback : lang.hitch(this,function(response) {   
					console.log("initial service return: " + response);
				}),
				backgroundRequest: true
			});
		});
	}
	
	profilePlugin.isSametimeAvailable = function() {
		if (!profilePlugin.Sametime || !profilePlugin.configuration) return false;
		if (profilePlugin.configuration.sametimePolling == profilePlugin.Sametime.SAMETIME_DISABLED) {
			return false;
		}
		return true;
	};
	
	profilePlugin.shouldUseShortName = function() {
		return profilePlugin.configuration && profilePlugin.configuration.showDisplayName ? 
				false : true;
	};
	
	profilePlugin.createLiveName = function(shortName, targetNode, repository, callback) {
		if (window.location.hostname.indexOf(".") < 0 || window.location.hostname.replace(/[0-9\.]+/, "") === "") {
			console.error("A fully qualified URL is needed for Sametime awareness. The hostname in your URL is: " + window.location.hostname);
			profilePlugin.showDisplayName(shortName, targetNode, repository, callback);
			return;
		}
		var needToCallback = true;
		var useShortName = profilePlugin.shouldUseShortName();
		if (!profilePlugin.Sametime) profilePlugin.initSametime();
		if (profilePlugin.Sametime && profilePlugin.configuration.profile_server) {
			profilePlugin.createHoverCard(null, shortName, targetNode, repository);
		} else if (profilePlugin.isSametimeAvailable()) {
			profilePlugin.Sametime.createLiveName(shortName, targetNode, repository, useShortName);
		} else if (!useShortName) {// fall back to showing display name
			profilePlugin.showDisplayName(shortName, targetNode, repository);
		} else {
			// simply show short name
			targetNode.innerHTML = shortName;
			needToCallback = false;
		}
		if (callback && needToCallback) {
			callback(targetNode, shortName, shortName);
		}
	};
	
	profilePlugin.loginOk = function(response) {
		console.dir(["Sametime login success", response]);
	};
	
	profilePlugin.loginFailed = function(reason, error) {
		console.error("Sametime login failed: " + reason + " with: " + error);
	};
	
	profilePlugin.initSametime = function() {
		if (profilePlugin.configuration.sametimePolling === SametimeAwareness.SAMETIME_DISABLED) {
			return;
		}
		var currentUser = Desktop.userId;
		if (profilePlugin.isSametimeAvailable()) {
			console.log("sametime already instantiated, login again as " + currentUser);
			profilePlugin.Sametime.loginByShortname(currentUser);
			return;
		}
		if (profilePlugin.configuration.sametime && !profilePlugin.Sametime) {
			console.log("instantiating SametimeAwareness() as " + currentUser);

			var proxyContextRoot = profilePlugin.configuration.proxyContextRoot; 
			if(!proxyContextRoot) proxyContextRoot = "/AjaxProxy";
			var tunnelHtmlUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
			tunnelHtmlUrl += "plugin/ProfilePlugin/getResource/profilePlugin/tunnel.html";

			var sametimeConfig = {
				"STProxyURL": profilePlugin.configuration.sametime, 
				"proxyContextRoot": proxyContextRoot,
				"tunnelHtmlUrl": tunnelHtmlUrl,
				"currentUser": currentUser,
				"displayMode": profilePlugin.configuration.sametimePolling
			};
			profilePlugin.Sametime = new SametimeAwareness(sametimeConfig);
		} else {
			console.log("sametime url not specified in Profile plugin configuration"); 
		}
	};
	
	/**
	 * Add Sametime and Profile business cards to the team list
	 */
	TeamList.setLayout([
		{
			id: 'id',
			field: 'id',
			name: '',
			width: '64px',
			widgetsInCell: true,
			decorator: function() {
				return '<div style="width: 100%" data-dojo-attach-point="entry"></div>';
			},
			setCellValue: function(gridData, storeData, cellWidget) {
				// Uninitialize the cellWidget
				cellWidget.uninitialize = function() {
					var objsToDestroy = this.objectsToDestroy;
					if (objsToDestroy) {
						for ( var i in objsToDestroy) {
							objsToDestroy[i].destroy();
						}
						this.objectsToDestroy = null;
					}
				};

				cellWidget.uninitialize();
				cellWidget.entry.innerHTML = "";
				
				var _createPersonCardIconErrorEntry = function(teamEntry, domNode) {
					var blankImg = require.toUrl("dojo/resources/blank.gif");
					var className = "idxPersonCardPhoto entryGroup";
					if (teamEntry.isInstanceOf && teamEntry.isInstanceOf(ecm.model.User)) {
						className = "entryUser";
					}
					domConstruct.create("img", {
						"class": className,
						"width": "24",
						"height": "24",
						"alt": teamEntry.name,
						"title": teamEntry.name,
						"src": blankImg
					}, domNode);
				};

				var rowId = cellWidget.cell.row.id;
				var teamEntry = this.grid.row(rowId).item();
				
				if (profilePlugin.configuration.profile_server && teamEntry.isInstanceOf(ecm.model.User)) {
					var query = {
						email: teamEntry.emailAddress
					};
					var pCard = new PersonCard({
						repository: this.teamspace.repository,
						query: query,
						url: profilePlugin.configuration.profile_server,
						jsonp: "callback",
						spec: [ "photo" ],
						placeHolder: teamEntry.emailAddress,
						teamEntry: teamEntry,
						valueCallback: function(value) {
							if (value && value.email) {
								domConstruct.place(pCard.domNode, cellWidget.entry, "only");
							} else {
								_createPersonCardIconErrorEntry(teamEntry, cellWidget.entry);
							}
						},
						errorCallback: function(error) {
							_createPersonCardIconErrorEntry(teamEntry, cellWidget.entry);
						}
					});
					if (!cellWidget.objectsToDestroy) {
						cellWidget.objectsToDestroy = [];
						cellWidget.objectsToDestroy.push(pCard);
					}
				} else {
					_createPersonCardIconErrorEntry(teamEntry, cellWidget.entry);
				}
			}
		},
		{
			id: 'name',
			field: 'name',
			name: '',
			width: "100%",
			widgetsInCell: true,
			decorator: function() {
				return '<div style="width: 100%" data-dojo-attach-point="entry"></div>';
			},
			setCellValue: function(gridData, storeData, cellWidget) {
				// Uninitialize the cellWidget
				cellWidget.uninitialize = function() {
					var objsToDestroy = this.objectsToDestroy;
					if (objsToDestroy) {
						for ( var i in objsToDestroy) {
							objsToDestroy[i].destroy();
						}
						this.objectsToDestroy = null;
					}
				};
				
				cellWidget.uninitialize();
				cellWidget.entry.innerHTML = "";

				var _createPersonCardErrorEntry = function(entryName, entryRoles, domNode) {
					domConstruct.create("div", {
						'class': 'entryName',
						innerHTML: entryName
					}, domNode);

					var divRoles = domConstruct.create("div", {
						'class': 'entryRoles',
						innerHTML: entryRoles
					});
					domConstruct.place(divRoles, domNode, "last");
				};
				
				var rowId = cellWidget.cell.row.id;
				var teamEntry = this.grid.row(rowId).item();
				
				var displayName = teamEntry.displayName;
				if (!displayName || displayName.length == 0)
					displayName = teamEntry.name;
				var entryName = !this.textDir ? displayName : this.enforceTextDirWithUcc(null, displayName);

				if (displayName && this.isEmailAddress(displayName)) {
					entryName = '<a href="mailto:"' + displayName + '"/>';
				}
				var roleNames = this.getRoleNames(teamEntry);
				
				if (!profilePlugin.configuration.profile_server && profilePlugin.isSametimeAvailable()) {
					var attachNode = domConstruct.create("span", {userId: name, "class": "awareness", innerHTML: "&nbsp;"}, cellWidget.entry);
					profilePlugin.addUserToCache(teamEntry.shortName, teamEntry.displayName, teamEntry.emailAddress);
					profilePlugin.createLiveName(teamEntry.shortName, attachNode, this.teamspace.repository);

					var divRoles = domConstruct.create("div", {
						'class': 'entryRoles',
						innerHTML: roleNames
					});
					domConstruct.place(divRoles, cellWidget.entry, "last");
				} else if (profilePlugin.configuration.profile_server && teamEntry.isInstanceOf(ecm.model.User)) {
					var query = {
						email: teamEntry.emailAddress
					};
					var specList = [ "fn", "role", "sametime.awareness" ];
					var pCard = new PersonCard({
						repository: this.teamspace.repository,
						query: query,
						url: profilePlugin.configuration.profile_server,
						jsonp: "callback",
						spec: specList,
						placeHolder: teamEntry.emailAddress,
						role: roleNames,
						teamEntry: teamEntry,
						valueCallback: function(value) {
							if (value && value.email) {
								domConstruct.place(pCard.domNode, cellWidget.entry, "only");
							} else {
								_createPersonCardErrorEntry(entryName, roleNames, cellWidget.entry);
							}
						},
						errorCallback: function(error) {
							_createPersonCardErrorEntry(entryName, roleNames, cellWidget.entry);
						}
					});
					if (!cellWidget.objectsToDestroy) {
						cellWidget.objectsToDestroy = [];
						cellWidget.objectsToDestroy.push(pCard);
					}
				} else {
					_createPersonCardErrorEntry(entryName, roleNames, cellWidget.entry);
				} 
			}
		}
	]);
});
