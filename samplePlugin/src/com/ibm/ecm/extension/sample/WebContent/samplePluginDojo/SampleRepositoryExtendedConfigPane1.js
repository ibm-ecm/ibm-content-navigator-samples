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
		"dojo/text!./templates/SampleRepositoryExtendedConfigPane1.html"
	],
	function(declare, dojoJson, _TemplatedMixin, _WidgetsInTemplateMixin, ValidationTextBox, PluginRepositoryConfigurationParametersPane, template) {

		/**
		 * @name samplePluginDojo.SampleRepositoryExtendedConfigPane1
		 * @class Provides an extended configuration panel for repository configuration for a sample plug-in repository type.  This panel appears as a tab of the repository 
		 * configuration page in administration when creating or editing a repository of the defined repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 * @since 3.0.6
		 */
		return declare("samplePluginDojo.SampleRepositoryExtendedConfigPane1", [ PluginRepositoryConfigurationParametersPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends samplePluginDojo.SampleRepositoryExtendedConfigPane1.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		load: function(repositoryConfig) {
			var customProperties = repositoryConfig.getCustomProperties();
			if (customProperties) {
				try {
					var jsonConfig = dojoJson.parse(customProperties);
					this.param4Field.set('value',jsonConfig.configuration[3].value);
				} catch (e) {
					this.logError("load", "failed to load custom properties: " + e.message);
				}
			}
		},
		
		_onParamChange: function() {
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			return this.param4Field.isValid();
		},
		
		save: function(repositoryConfig) {
			var customProperties = repositoryConfig.getCustomProperties();
			if (customProperties) {
				try {
					var jsonConfig = dojoJson.parse(customProperties);
					
					var configString = {  
						name: "param4Field",
						value: this.param4Field.get('value')
					}; 
					jsonConfig.configuration.splice(3,3,configString);
					repositoryConfig.setCustomProperties(JSON.stringify(jsonConfig));
				} catch (e) {
					this.logError("load", "failed to save custom properties: " + e.message);
				}
			}
		}
	});
});
