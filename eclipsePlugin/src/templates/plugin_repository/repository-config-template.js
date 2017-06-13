define([
		"dojo/_base/declare",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/widget/admin/PluginRepositoryConfigurationParametersPane",
		"dojo/text!./templates/${ClassName}ConfigurationParametersPane.html"
	],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, PluginRepositoryConfigurationParametersPane, template) {

		/**
		 * @name ${DojoModuleName}.${ClassName}
		 * @class Provides a configuration panel for general repository configuration for the repository type.  This panel appears 
		 *		  on the general tab of the repository configuration page in administration when creating or editing a repository 
		 *		  of the defined repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 */
		return declare("${DojoModuleName}.${ClassName}ConfigurationParametersPane", [ PluginRepositoryConfigurationParametersPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends ${DojoModuleName}.${ClassName}ConfigurationParametersPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		load: function(repositoryConfig) {
		},
		
		validate: function() {
			return true;
		},
		
		save: function(repositoryConfig) {
		}
	});
});
