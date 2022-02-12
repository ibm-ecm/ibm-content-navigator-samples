/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
//-----------------------------------
/*
* OAuth2.0 Migration
* Updated to require Integration Key & Secret Key
*/

define([
		"dojo/_base/declare",
		"dojo/json",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/widget/ValidationTextBox",
		"dijit/Tooltip",
		"ecm/widget/admin/PluginConfigurationPane",
		"dojo/text!./templates/ConfigurationPane.html"
	],
	function(declare, dojoJson, _TemplatedMixin, _WidgetsInTemplateMixin, ValidationTextBox,HoverHelp,PluginConfigurationPane, template) {

		/**
		 * @name samplePluginDojo.ConfigurationPane
		 * @class Provides a configuration panel for the sample plugin.  This panel appears on the plug-in configuration page in
		 * administration after loading the plug-in.
		 * @augments ecm.widget.admin.PluginConfigurationPane
		 */
		return declare("docuSign.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends docuSign.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		postCreate:function(){
			this.inherited(arguments);
		},
		
		load: function(callback) {
			if (this.configurationString) {
				try {
					var jsonConfig = dojoJson.parse(this.configurationString);
					this.userIDField.set('value', jsonConfig.configuration[0].value);
					this.integratorKeyField.set('value', jsonConfig.configuration[1].value);
					this.accountIDField.set('value', jsonConfig.configuration[2].value);
					this.rsaKeyField.set('value', jsonConfig.configuration[3].value);
				} catch (e) {
					this.logError("load", "failed to load configuration: " + e.message);
				}
			}
		},
		
		_onParamChange: function() {
			var configArray = [];

			//add integrator key then accountID
			configString = {  
				name: "userID",
				value: this.userIDField.get('value')
			}; 
			configArray.push(configString);

			configString = {  
					name: "integratorKey",
					value: this.integratorKeyField.get('value')
				}; 
			configArray.push(configString);

			configString = {  
				name: "accountID",
				value: this.accountIDField.get('value')
			};
			configArray.push(configString);

			configString = {  
				name: "rsaKey",
				value: this.rsaKeyField.get('value')
			};
			configArray.push(configString);
			
			var configJson = {
				"configuration" : configArray
			};
			
			this.configurationString = JSON.stringify(configJson);
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if(!this.userIDField.isValid() || !this.integratorKeyField.isValid() || !this.accountIDField.isValid() || !this.rsaKeyField.isValid())
				return false;
			
			return true;
		}	
	});
});
