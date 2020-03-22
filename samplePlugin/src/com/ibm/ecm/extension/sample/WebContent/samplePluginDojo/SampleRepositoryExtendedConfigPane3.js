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
		"dojo/text!./templates/SampleRepositoryExtendedConfigPane3.html"
	],
	function(declare, dojoJson, _TemplatedMixin, _WidgetsInTemplateMixin, ValidationTextBox, PluginRepositoryConfigurationParametersPane, template) {

		/**
		 * @name samplePluginDojo.SampleRepositoryExtendedConfigPane3
		 * @class Provides an extended configuration panel for repository configuration for a sample plug-in repository type. This panel appears as a tab of the repository 
		 * configuration page in administration when creating or editing a repository of the defined repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 * @since 3.0.6
		 */
		return declare("samplePluginDojo.SampleRepositoryExtendedConfigPane3", [ PluginRepositoryConfigurationParametersPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends samplePluginDojo.SampleRepositoryExtendedConfigPane3.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		load: function(repositoryConfig) {
			var customProperties = repositoryConfig.getCustomProperties();
			if (customProperties) {
				try {
					var jsonConfig = dojoJson.parse(customProperties);
					this.param6Field.set('value',jsonConfig.configuration[5].value);
				} catch (e) {
					this.logError("load", "failed to load custom properties: " + e.message);
				}
			}
		},
		
		_onParamChange: function() {
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			return this.param6Field.isValid();
		},
		
		save: function(repositoryConfig) {
			var customProperties = repositoryConfig.getCustomProperties();
			if (customProperties) {
				try {
					var jsonConfig = dojoJson.parse(customProperties);
					
					var configString = {  
						name: "param6Field",
						value: this.param6Field.get('value')
					}; 
					jsonConfig.configuration.splice(5,5,configString);
					repositoryConfig.setCustomProperties(JSON.stringify(jsonConfig));
				} catch (e) {
					this.logError("load", "failed to save custom properties: " + e.message);
				}
			}
		}
	});
});
