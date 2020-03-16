/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/widget/ValidationTextBox",
		"ecm/widget/admin/PluginRepositoryGeneralConfigurationPane",
		"dojo/text!./templates/SampleRepositoryGeneralConfigurationPane.html"
	],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, ValidationTextBox, PluginRepositoryGeneralConfigurationPane, template) {

		/**
		 * @name samplePluginDojo.SampleRepositoryGeneralConfigurationPane
		 * @class Provides a configuration panel for general repository configuration for a sample plug-in repository type.  This panel appears on the general tab of the repository 
		 * configuration page  in administration when creating or editing a repository of the defined repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 */
		return declare("samplePluginDojo.SampleRepositoryGeneralConfigurationPane", [ PluginRepositoryGeneralConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends samplePluginDojo.SampleRepositoryGeneralConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		load: function(repositoryConfig) {
			this.jsonFilenameField.set('value',repositoryConfig.getServerName());
		},
		
		_onParamChange: function() {
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if(!this.jsonFilenameField.isValid()) {
				return false;
			}
			return true;
		},
		
		save: function(repositoryConfig) {
			repositoryConfig.setServerName(this.jsonFilenameField.get("value"));
		},
		
		getLogonParams: function(params) {
			params.serverName = this.jsonFilenameField.get("value");
		}
		
	});
});
