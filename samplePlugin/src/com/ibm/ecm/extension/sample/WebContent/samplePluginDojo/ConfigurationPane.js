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
		return declare("samplePluginDojo.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends samplePluginDojo.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		postCreate:function(){
			this.inherited(arguments);
		},
		
		load: function(callback) {
			if (this.configurationString) {
				try {
					var jsonConfig = dojoJson.parse(this.configurationString);
					this.param1Field.set('value',jsonConfig.configuration[0].value);
					this.param2Field.set('value',jsonConfig.configuration[1].value);
					this.param3Field.set('value',jsonConfig.configuration[2].value);
					this.secretField.set('value',jsonConfig.configuration[3].value);
				} catch (e) {
					this.logError("load", "failed to load configuration: " + e.message);
				}
			}
		},
		
		_onParamChange: function() {
			var configArray = [];
			var configString = {  
				name: "param1Field",
				value: this.param1Field.get('value')
			}; 
			configArray.push(configString);
			
			configString = {  
				name: "param2Field",
				value: this.param2Field.get('value')
			}; 
			configArray.push(configString);

			configString = {
				name: "param3Field",
				value: this.param3Field.get('value')
			};
			configArray.push(configString);

			configString = {  
				name: "secretField",
				value: this.secretField.get('value')
			}; 
			configArray.push(configString);
			
			var configJson = {
				"configuration" : configArray
			};
			
			this.configurationString = JSON.stringify(configJson);
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if(!this.param1Field.isValid() || !this.param3Field.isValid())
				return false;
			return true;
		}
	});
});
