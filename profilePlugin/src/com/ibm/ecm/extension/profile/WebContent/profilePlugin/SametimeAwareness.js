/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/_base/event",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/dom",
	"dojo/has", 
	"dojo/_base/sniff",
	"dojo/request/xhr",
	"dijit/MenuItem",
	"ecm/model/Request",
	"ecm/model/Desktop"
], function(declare, kernel, lang, connect, event, domClass, domStyle, domAttr, dom, has, sniff, xhr, MenuItem, Request, Desktop) {

	var STAware = declare("profilePlugin.SametimeAwareness", [], {
	
	SAMETIME_DISABLED: -1,
	SAMETIME_ALWAYS: 0,
	SAMETIME_WHEN_CLICKED: 1,
	
	constructor: function(config) {
		this.config = config;
		//console.debug("in constructor with Sametime at " + config.STProxyURL);
        this._preloadSTProxy();      
    },
    
    setDisplayMode: function(displayMode) {
    	var oldDisplayMode = this.config.displayMode;
    	this.config.displayMode = displayMode;
		this.disableMode = (displayMode == this.SAMETIME_DISABLED);
    	if (displayMode != this.SAMETIME_DISABLED && oldDisplayMode == this.SAMETIME_DISABLED && this.loadcount <= 0) {
    		this._preloadSTProxy();
    	}
    },

    _patchDojo: function() {
		var ver = kernel.version;
		if (ver.major == 1 && ver.minor >= 7) {
			dojo.boxModel = "content-box";
			dojo._loaders = [];
			if (has("ie") && !dojo._event_listener) {
				// IE9 fix for Sametime Livename widget
				dojo._event_listener = {};
			}

		}
		if (ver.major == 1 && ver.minor >= 8) {
			// workaround for dojo 1.8.3 error: lang.hitch: scope["_onClick"] is null (scope= "[Widget sametime.MenuItem, sametime_MenuItem_0]")
			if(!MenuItem.prototype._onClick) {
				MenuItem.prototype._onClick = function(evt) {
					// Get content between first { and last }
					var m = this.onClick.toString().match(/\{([\s\S]*)\}/m)[1];
					// Strip comments
					var content = m.replace(/^\s*\/\/.*$/mg,'');
					if (content.length > 1) {
						this.onClick(evt);
					} else {
						this.getParent().onItemClick(this, evt);
						event.stop(evt);
					}
				};
			}
		}
    },
        
    _preloadSTProxy: function() {
        this.loadcount = 0;
        this.loadtotal = 2;
        this.liveNamesReady = false;
        this.liveNameQueue = [];
        this.disableMode = false;   
        this.userName = this.config.currentUser;

		if (!this.config.displayMode) { 
			this.config.displayMode = this.SAMETIME_DISABLED;
		} 
		this.config.enableSameTime = (this.config.displayMode != this.SAMETIME_DISABLED);

        if (this.config.proxyContextRoot.indexOf("/") < 0) this.config.proxyContextRoot = "/" + this.config.proxyContextRoot;

        if (this.config.enableSameTime == true && this.config.STProxyURL && this.config.proxyContextRoot) {
        	this._patchDojo();
        	if (typeof stproxy == "undefined" || typeof (stproxy.addOnLoad) == "undefined") {
        		// skip loading the proxy scripts again if already loaded, so as to be able to re-init
        		this._loadSTProxy(this.userName);
        	} else {
        		this.loadcount = 2;
        		this.liveNamesReady = true;
        	}
            this.loginByShortname(this.userName);
        } else {
            console.dir(["Sametime config info","disabling sametime"]);
            this.disableMode = true;
        }
    },

	addJavascript: function(jsname,pos) {
		var th = document.getElementsByTagName(pos)[0];
		var s = document.createElement('script');
		s.setAttribute('type','text/javascript');
		s.setAttribute('src',jsname);
		th.appendChild(s);
		console.info("adding javascript: " + jsname);
	},

    _loadSTProxy: function(currentUser) {
        var STProxyURL = this.config.STProxyURL;
        var parsedSTProxyURL = STProxyURL.replace(":/","");
        var baseURL = window.location.protocol+"//"+window.location.host;
        var stproxserv = baseURL + this.config.proxyContextRoot + "/proxy/" + parsedSTProxyURL;
        var OAHTunnelUri = this.config.tunnelHtmlUrl;
        var isST851 = false;
        
        var STBuildInfo = "/SSCConnecter/buildinfo.txt";
        dojo.xhrGet({ 
            handleAs : "text",
            url : stproxserv + STBuildInfo,
            sync : true,
            load : dojo.hitch(this, function(resp) {    
                console.info("ST Build Info: " + resp);
                if (resp.search("8.5.1") != -1){
                    isST851 = true;
                }
            }),

            error : function(f) {
                console.error("Unable to locate Sametime build info! Assuming 8.5.2 or later.");
            }
        });
        
        if (isST851) {
            console.info("Intializing Sametime integration for ST 8.5.1");
        }
        else{
            console.info("Intializing Sametime integration for ST 8.5.2 or later");
        }

        var stProxyServerRef = STProxyURL;
        if (isST851){
            stProxyServerRef = stproxserv;
        }

		//console.log(stproxyConfig);
        stproxyConfig = {
            server: stProxyServerRef,
            tunnelURI: OAHTunnelUri, 
            isConnectClient: false,
            disableXDomain: true
        };
		if (typeof djConfig == "undefined") {
			djConfig = {
				parseOnLoad: false,
				locale: "en-us"
			};
		}
		console.log(stproxyConfig);

		var stDojoPath = isST851 ? "dojo_1.2.3" : "dojo.blue";
		headID = document.getElementsByTagName("head")[0];         
		cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = STProxyURL+'/stwebclient/' + stDojoPath + '/sametime/themes/WebClientAllNoTundra.css';
		cssNode.media = 'screen';
		headID.appendChild(cssNode);

		var libraryUrl = stproxserv + "/stbaseapi/baseComps.js"; // ['OpenAjax is not defined' if] + "?noHub=true";
        dojo.xhrGet({ 
            handleAs : "text",
            url : libraryUrl,
            //does not work using ICM 5.1 library url : "http://ecmdemo1.ecm.ibm.local:9080/mum/proxy/http/ecmdemo2.ecm.ibm.local:9082/stbaseapi/baseComps.js?noHub=true",
            // works url : "http://ecmdemo1.ecm.ibm.local:9080/mum/proxy/http/ecmdemo2.ecm.ibm.local:9082/stbaseapi/latest/baseComps.js",
            sync : true,
            load : dojo.hitch(this, function(resp) {    
	            this.loadcount++;   
	            if(dojo.isIE) {
	                window.execScript(resp);
	            }
	            else {
	                dojo.eval(resp);    
	            }
	            }),
            error : function(f) {
                console.dir(["basecomp",f]);
            }
        });
            
		libraryUrl = stproxserv + "/stwebclient/widgetsLight.js",
        dojo.xhrGet({ 
            handleAs : "javascript",
            url : libraryUrl,
            //url : "http://ecmdemo1.ecm.ibm.local:9080/mum/proxy/http/ecmdemo2.ecm.ibm.local:9082/stwebclient/widgetsLight.js",
            sync : true,
            load : dojo.hitch(this, function(resp) {
            
                this.loadcount++;       
                if(dojo.isIE) {
                window.execScript(resp);
                }
                else{
                    dojo.eval(resp);    
                }

                this.liveNamesReady = true;
                this._processQueuedLiveNames();
                this._checkLoadCompletion();
            }),
            
            error : function(f) {
                console.dir(["livenamelight",f]);
            }
        });
    },

    _processQueuedLiveNames : function() {
        var x = 0;
        while (x = this.liveNameQueue.pop()) {
            this.createLiveName(x.shortName, x.domNode, x.useLiteralShortname, Desktop.getDefaultRepository());
        }
    },

    createLiveName : function(shortName, domNode, repository, useLiteralShortname, disableTemporaryDomNodeCreation) {
    	if (this.disableMode == true) {
    		profilePlugin.showDisplayName(shortName, domNode, repository);
            return;
        }

        if (this.liveNamesReady == false || this.config == undefined) {
            this.liveNameQueue.push({'shortName' : shortName, 'domNode': domNode, 'useLiteralShortname': useLiteralShortname});
            return;
        }

        var newDomNode = null;

        //added check for display mode due to blank nodes if not a valid state set
        if(!disableTemporaryDomNodeCreation && this.config.displayMode != this.SAMETIME_DISABLED) {
//            if(this.userNotFoundHash[shortName] == true   && this.config.displayMode == 0){
//                return;  // don't want to add empty dom node for empty email address names
//            }

            newDomNode = document.createElement('div');
            newDomNode.innerHTML = shortName;
            //to fix ecmdb00934057

	        var tmpDomNode = typeof(domNode) == 'string' ? 
            	dom.byId(domNode) : domNode;
            tmpDomNode.innerHTML = "";
            tmpDomNode.appendChild(newDomNode);
        } else {
	        newDomNode = typeof(domNode) == 'string' ? 
            	dom.byId(domNode) : domNode;
        }
        
        if (this.config.displayMode == this.SAMETIME_ALWAYS) {  // 0 = show always
            this._hashCreateLiveName(shortName, newDomNode, repository, useLiteralShortname);
            domStyle.set(newDomNode, {display : "inline"});
        }  else if (this.config.displayMode == this.SAMETIME_WHEN_CLICKED) {  //1 == div replacement mode
            this._createLiveNameTransform(shortName, newDomNode, repository, useLiteralShortname);
            domClass.add(newDomNode, "stIcnIcmName");
        }
    },

    _createLiveNameTransform: function (shortName, domNode, repository, useShortName) {
        var attachNode = typeof(domNode) == 'string' ? dom.byId(domNode) : domNode;
        var userObj = profilePlugin.userHash[shortName];
        
       	repository = repository || Desktop.getDefaultRepository();

        if(!userObj && repository.type == "p8") {
        	// lookup only if not previously done
			Request.invokePluginService("ProfilePlugin", "profilePluginLookupService", {
				requestParams: {
					repositoryId: repository.id, 
					shortname: shortName
				},
				requestCompleteCallback: lang.hitch(this, function(response) { // success
					var userObj = profilePlugin._lookupComplete(shortName, response);

                    if (userObj.email) {
                    	userDisplayName = profilePlugin.getNameToDisplay(shortName, userObj.displayName);
                    	domNode.innerHTML = userDisplayName;

                    	connect.connect(attachNode, "onclick", lang.hitch(this, "_hashCreateLiveName", userDisplayName, attachNode, repository));
                        domAttr.set(domNode, "tabindex",0);
                        connect.connect(domNode,"onkeyup", 
                        	lang.hitch(this, function (e) {  
                        		event.stop(e);  
                        		if (e.keyCode == 13 || e.keyCode == 32) {
                        			this._hashCreateLiveName(shortName, attachNode, repository);                 
                        		}
                        	})
                        );
                    } else {
                    	attachNode.innerHTML = userObj.displayName || shortName;
                    	domStyle.set(attachNode, {display : "inline"});
                    }
                }),
                requestFailedCallback : lang.hitch(this,function(response) {   
                	profilePlugin._lookupFailed(response);
                	attachNode.innerHTML = profilePlugin.getNameToDisplay(shortName);
                	domStyle.set(attachNode, {display : "inline"});
                }),
                backgroundRequest: true
            });
        } else {
        	var userDisplayName = shortName;
        	var userId = shortName;
            if (userObj && userObj.email) {
            	userDisplayName = profilePlugin.getNameToDisplay(shortName, userObj.displayName);
            	domNode.innerHTML = userDisplayName;
            	userId = userObj.email;
            }
            connect.connect(attachNode, "onclick", lang.hitch(this, "_hashCreateLiveName", shortName, attachNode, repository, useShortName));
            domAttr.set(domNode, "tabindex",0);
            connect.connect(domNode,"onkeyup", 
            	lang.hitch(this, function (e) {  
            		event.stop(e);  
            		if (e.keyCode == 13 || e.keyCode == 32) {
            			this._hashCreateLiveName(shortName, attachNode, repository, useShortName);                 
            		}
            	})
            );
        }

    },

    _hashCreateLiveName : function (shortName, domNode, repository, useShortName) {
//        if(this.userNotFoundHash[shortName] == true ) {
//            return;
//        }
        var attachNode = typeof(domNode) == 'string' ? dom.byId(domNode) : domNode;
        var userObj = profilePlugin.userHash[shortName];
        
       	repository = repository || Desktop.getDefaultRepository();

        if(!userObj && repository.type == "p8") {
        	// lookup only if not previously done
			Request.invokePluginService("ProfilePlugin", "profilePluginLookupService", {
				requestParams: {
					repositoryId: repository.id, 
					shortname: shortName
				},
				requestCompleteCallback: lang.hitch(this, function(response) { // success
					var userObj = profilePlugin._lookupComplete(shortName, response);

                    if (userObj.email) {
                    	userDisplayName = useShortName ? shortName: userObj.displayName;
                        ln = new sametime.LiveName({'userId': userObj.email, 'displayName': userDisplayName}, attachNode);
                        domStyle.set(ln.domNode,{display: "inline"}); 
                    } else {
                    	attachNode.innerHTML = useShortName ? shortName : (userObj.displayName || shortName);
                    	domStyle.set(attachNode, {display : "inline"});
                    }
                }),
                requestFailedCallback : lang.hitch(this,function(response) {   
                	profilePlugin._lookupFailed(response);
                	attachNode.innerHTML = shortName;
                	domStyle.set(attachNode, {display : "inline"});
                }),
                backgroundRequest: true
            });
        } else {
        	var userDisplayName = shortName;
        	var userId = shortName;
            if (userObj && userObj.email) {
            	userDisplayName = useShortName ? shortName: userObj.displayName;
            	userId = userObj.email;
            }
            var ln = new sametime.LiveName({'userId': userId, 'displayName': userDisplayName }, attachNode);
            domStyle.set(ln.domNode , {display : "inline"});
        }
    },

    _checkLoadCompletion : function() {
        if (this.loadcount == this.loadtotal) {
            if (this.deferredLoginUserName) {
                this.loginByShortname(this.deferredLoginUserName);
            }
        }
    },

	loginByEmail : function(userEmail) {
    	console.log("loginByEmail using email: " + userEmail);
        window.setTimeout(
        	"window.stproxy.login.loginByToken('" + userEmail + "'," +
        	"window.stproxy.awareness.AVAILABLE,window.stproxy.i18nStrings.statusAvailable," +
        	"profilePlugin.loginOk, profilePlugin.loginFailed)",
        0);
	},
	
    loginByShortname : function(shortName, repository) {
        if (this.disableMode == true) {
            console.dir(["Sametime is disabled, not logging in",""]);
            return;
        }

        if ((!window.stproxy && this.deferredLoginUserName == undefined) || this.config == undefined) {
            this.deferredLoginUserName = shortName;
            return;
        }
        
        if (profilePlugin.userHash[shortName]) {
        	var email = profilePlugin.userHash[shortName].email;
        	this.loginByEmail(email);
        	return;
        }
        
        if (!repository) {
        	repository = Desktop.getDefaultRepository();
        }
        
		if (repository.type == "p8") {
	        Request.invokePluginService("ProfilePlugin", "profilePluginLookupService", {
				requestParams: {
					repositoryId: repository.id, 
					shortname: shortName
				},
				requestCompleteCallback: lang.hitch(this, function(response) { // success
					var userObj = profilePlugin._lookupComplete(shortName, response);
	
	                if (userObj.email) {
	                	var userEmail = userObj.email;
	                	this.loginByEmail(userEmail);
	                } 
	                else {
	                    console.dir(["loginByShortname - Email null or empty","disabling sametime",f]);
	                    this.disableMode = true;
	                }
	            }),
	            requestFailedCallback : function(f) {
	                console.dir(["loginByShortname - lookup service call not found or failed to return","disabling sametime",f]);
	                this.disableMode = true;
	            },
                backgroundRequest: true
	        });
		} else {
			this.loginByEmail(shortName);
		}
	}
	});
	
	STAware.defaultPosition = ["after-centered", "before-centered", "below", "above"];
	return STAware;
});
