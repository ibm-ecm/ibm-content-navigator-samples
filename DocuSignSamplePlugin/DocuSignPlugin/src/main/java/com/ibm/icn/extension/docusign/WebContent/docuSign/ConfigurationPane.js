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
                    // if jsonConfig.configuration
                    if(Array.isArray(jsonConfig.configuration)) {
                        this.integratorKeyField.set('value', jsonConfig.configuration[0].value);
                        this.userIDField.set('value', jsonConfig.configuration[1].value);
                        this.accountIDField.set('value', jsonConfig.configuration[2].value);
                        this.rsaKeyField.set('value', jsonConfig.configuration[3].value);


                        jsonConfig.configuration = {
                            "integratorKey" : this.integratorKeyField.get('value'),
                            "userID" : this.userIDField.get('value'),
                            "accountID" : this.accountIDField.get('value'),
                            "rsaKey" : this.rsaKeyField.get('value')
                        };
                    } else {
                        this.integratorKeyField.set('value',jsonConfig.configuration.integratorKey);
                        this.userIDField.set('value', jsonConfig.configuration.userID);
                        this.accountIDField.set('value', jsonConfig.configuration.accountID);
                        this.rsaKeyField.set('value', jsonConfig.configuration.rsaKey);
                    }
                } catch (e) {
                    this.logError("load", "failed to load configuration: " + e.message);
                }
			}
		},
		
		_onParamChange: function() {
			var configArray = [];

			configString = {
                "integratorKey" : this.integratorKeyField.get('value'),
                "userID" : this.userIDField.get('value'),
                "accountID" : this.accountIDField.get('value'),
                "rsaKey" : this.rsaKeyField.get('value')
            }
			
			var configJson = {
				"configuration" : configString
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
