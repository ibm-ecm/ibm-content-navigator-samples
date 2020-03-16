/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"dojo/json",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/model/Desktop",
		"dojo/store/Memory",
		"ecm/widget/admin/PluginConfigurationPane",
		"dojo/text!./templates/FeatureConfigurationPane.html",
		"ecm/widget/ValidationTextBox",
		"ecm/widget/FilteringSelect",
		"ecm/widget/HoverHelp",
		"dijit/form/Textarea"
	],
	function(declare, dojoJson, _TemplatedMixin, _WidgetsInTemplateMixin, Desktop, MemoryStore, PluginConfigurationPane, template) {

		/**
		 * @name samplePluginDojo.FeatureConfigurationPane
		 * @class Provides a configuration panel for the sample plugin's feature.  This panel appears in each desktop's layout tab in the IBM Content Navigator administration 
		 * tool for configuration specific to this feature.
		 * 
		 * @augments ecm.widget.admin.PluginConfigurationPane
		 */
		return declare("samplePluginDojo.FeatureConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends samplePluginDojo.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		/**
		 * Initially load all the values from the configurationString onto the various fields.
		 */
		load: function(callback) {
			//initialize fields
			if (this.configurationString) {
				try {
					//evaluate the string to form valid json
					this.jsonConfig = dojoJson.parse(this.configurationString);

					//set the first field based on the configuration values
					if(this.jsonConfig.configuration[0])
						this.param1Field.set("value", this.jsonConfig.configuration[0].value);
					
					//set the second field based on the configuration values
					if(this.jsonConfig.configuration[1])
						this.param2Field.set("value", this.jsonConfig.configuration[1].value);
				} catch (e) {
					this.logError("load", "failed to load configuration: " + e.message);
				}
			}
		},
		
		/**
		 * Saves all the values from fields onto the configuration string which will be stored into the admin's configuration.
		 */
		save: function(){
			var configArray = [];
			var configString = {  
				name: "param1Field",
				value: this.param1Field.get("value")
			}; 
			configArray.push(configString);
			
			configString = {  
					name: "param2Field",
					value: this.param2Field.get("value")
				}; 
				configArray.push(configString);
			
			var configJson = {
				"configuration" : configArray
			};
						
			this.configurationString = JSON.stringify(configJson);
		},
		
		_onParamChange: function() {
			this.onSaveNeeded(true);
		},
		
		/**
		 * Validates this feature configuration pane.
		 */
		validate: function() {
			if(!this.param1Field.isValid() || !this.param2Field.get("value"))
				return false;
			return true;
		}
	});
});
