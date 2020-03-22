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
		"ecm/widget/admin/PluginRepositoryConfigurationParametersPane",
		"dojo/text!./templates/SampleRepositoryConfigurationParametersPane.html"
	],
	function(declare, dojoJson, _TemplatedMixin, _WidgetsInTemplateMixin, ValidationTextBox, PluginRepositoryConfigurationParametersPane, template) {

		/**
		 * @name samplePluginDojo.SampleRepositoryGeneralConfigurationPane
		 * @class Provides a configuration panel for general repository configuration for a sample plug-in repository type.  This panel appears on the general tab of the repository 
		 * configuration page  in administration when creating or editing a repository of the defined repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 * @since 2.0.3
		 */
		return declare("samplePluginDojo.SampleRepositoryConfigurationParametersPane", [ PluginRepositoryConfigurationParametersPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends samplePluginDojo.SampleRepositoryGeneralConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		load: function(repositoryConfig) {
			var customProperties = repositoryConfig.getCustomProperties();
			if (customProperties) {
				try {
					var jsonConfig = dojoJson.parse(customProperties);
					this.param1Field.set('value',jsonConfig.configuration[0].value);
					this.param2Field.set('value',jsonConfig.configuration[1].value);
					this.param3Field.set('value',jsonConfig.configuration[2].value);
				} catch (e) {
					this.logError("load", "failed to load custom properties: " + e.message);
				}
			}
		},
		
		_onParamChange: function() {
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if(!this.param1Field.isValid() || !this.param3Field.isValid())
				return false;
			return true;
		},
		
		save: function(repositoryConfig) {
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
			
			var configJson = {
				"configuration" : configArray
			};
			
			repositoryConfig.setCustomProperties(JSON.stringify(configJson));
		}
	});
});
