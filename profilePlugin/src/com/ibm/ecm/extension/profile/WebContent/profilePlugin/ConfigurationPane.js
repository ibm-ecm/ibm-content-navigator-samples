/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"dojo/_base/json",
		"dojo/_base/lang",
		"dojo/dom-class",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dijit/form/CheckBox",
		"dijit/form/Button",
		"ecm/widget/admin/PluginConfigurationPane",
		"ecm/widget/TextBox",
		"ecm/widget/HoverHelp",
		"./Messages",
		"dojo/text!./templates/ConfigurationPane.html"
	],
	function(declare, 
			dojojson, 
			lang,
			domClass,
			_TemplatedMixin, 
			_WidgetsInTemplateMixin, 
			CheckBox, 
			Button, 
			PluginConfigurationPane, 
			TextBox, 
			HoverHelp,
			Messages,
			template) {

		/**
		 * @name profilePlugin.ConfigurationPane
		 * @class
		 * @augments ecm.widget.admin.PluginConfigurationPane
		 */
		return declare("profilePlugin.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends profilePlugin.ConfigurationPane.prototype */

			templateString: template,
			widgetsInTemplate: true,
			INVALID_HOSTNAME: -2,
			PROXY_FAIL: -1,
			PROXY_SUCCESS: 0,
			messages: Messages,
				
			postCreate: function() {
				this.inherited(arguments);
				this.stTestOne.setAttribute("aria-label", Messages.test_result_label);
			},
			
			load: function(callback) {
				if (this.configurationString) {
					var jsonConfig = dojojson.fromJson(this.configurationString);
					this.profileServerURI.set('value', jsonConfig.profile_server);
					this.sametimeURI.set('value', jsonConfig.sametime);
					this.showDisplayName.set('value', jsonConfig.showDisplayName);
					this.proxyURI.set('value', jsonConfig.proxyContextRoot);
					this.sametimePolling.set('value', jsonConfig.sametimePolling)
				}
				this.okButton.onClick = dojo.hitch(this, this.testInput);
				this._enableOrDisableProxyField();
				this._enableOrDisableTestButton();
			},
			
			_enableOrDisableProxyField: function() {
				var sametimeUriValue = this.sametimeURI.get("value").trim();
				if(sametimeUriValue == "") { // clear the proxy value if sametime Uri is cleared
					this.proxyURI.set("value", "");
				}
				this.proxyURI.set("disabled", sametimeUriValue == "");
				this._enableOrDisableTestButton();
			},
			
			_enableOrDisableTestButton: function() {
				var sametimeUriValue = this.sametimeURI.get("value").trim();
				var proxyUriValue = this.proxyURI.get("value").trim();
				this.sametimePolling.set("disabled", sametimeUriValue == "" || proxyUriValue == "");
				this.okButton.set("disabled", !(sametimeUriValue && proxyUriValue));
			},
			
			testInput: function() {
				if (window.location.hostname.indexOf(".") < 0 || window.location.hostname.replace(/[0-9\.]+/, "") === "") {
					this._showTestResult(this.INVALID_HOSTNAME);
					return;
				}
				var valid = true;
				var age = 0;
				var proxyURIvalue = this.proxyURI.get("value").trim();
				var sametimeUriValue = this.sametimeURI.get("value").trim();
				if(!proxyURIvalue || !sametimeUriValue) {
					// skip the Sametime proxy testing
					return;
				}
				console.log("test sametime url: " + (sametimeUriValue ? sametimeUriValue : "no"));
				if(sametimeUriValue) {
					url = proxyURIvalue+ "/proxy/" + 
						sametimeUriValue.replace("://", "/") 
						+ "/stwebclient/widgetsLight.js";
					var self = this;
					dojo.xhrGet({
						handleAs: "text",
						url: url,
						sync: true,
						load: function(f) {
							console.log(url + " returned: " + f.length);
							self._showTestResult(self.PROXY_SUCCESS);
						},
						error: function(f) {
							console.log(url + " error: " + f);
							self._showTestResult(self.PROXY_FAIL);
						}
					});
				}
				return;
			},
			
			_showTestResult: function(testResult) {
				var valid = testResult >= 0;
				var displayMessage;
				if (valid) {
					displayMessage = Messages.testResultValid;
				} else if (testResult == this.INVALID_HOSTNAME){
					displayMessage = Messages.invalidHostName;
				} else {
					displayMessage = Messages.testResultInvalid;
				}
				this.stTestIcon.style.visibility = "visible";
				this.stTestOneTooltip.domNode.innerHTML = displayMessage; 
				domClass.remove(this.stTestOne, 
						valid? "stTestResultInvalid" : "stTestResultValid");
				domClass.add(this.stTestOne, 
						valid? "stTestResultValid" : "stTestResultInvalid");
			},
			
			_onFieldChangeSametimeURI: function() {
				this._enableOrDisableProxyField();
				this._onFieldChange();
			},

			_onFieldChangeProxyRoot: function() {
				this._enableOrDisableTestButton();
				this._onFieldChange();
			},

			_onFieldChange: function() {
				var sametimeUriValue = this.sametimeURI.get("value").trim();
				var proxyUriValue = this.proxyURI.get("value").trim();
				if(sametimeUriValue || proxyUriValue) {
					this.stTestIcon.style.visibility = "hidden";
				}
				var configJson = {
					"profile_server" : this.profileServerURI.get("value"),
					"sametime" : this.sametimeURI.get("value"),
					"showDisplayName": this.showDisplayName.get("value"),
					"proxyContextRoot": this.proxyURI.get("value"),
					"sametimePolling": this.sametimePolling.get("value")
				};
				
				this.configurationString = dojojson.toJson(configJson);
				this.onSaveNeeded(true);
			},
			
			save: function(onComplete) {
				var configJson = {
						"profile_server" : this.profileServerURI.get("value"),
						"sametime" : this.sametimeURI.get("value"),
						"showDisplayName": this.showDisplayName.get("value"),
						"proxyContextRoot": this.proxyURI.get("value"),
						"sametimePolling": this.sametimePolling.get("value")
				};
				console.log("saving profile plugin configuration");
				profilePlugin.configuration = configJson;
				console.log(profilePlugin.configuration);
				if(!(ecm.model.desktop.id == "admin" || ecm.model.desktop.repositories.length == 0)) {
					// initialize sametime only if on non-admin desktop
					profilePlugin.initSametime();
				}
				if (profilePlugin.Sametime) {
					profilePlugin.Sametime.setDisplayMode(configJson.sametimePolling);
				}
			},
			
			_eof: null
		}
	);
});
