/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/widget/admin/PluginConfigurationPane",
		"dojo/text!./templates/ConfigurationPane.html"
	],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, template) {

		return declare("CustomEventPluginDojo.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		
		templateString: template,
		widgetsInTemplate: true,
	
		load: function(callback) {
		},
		
		validate: function() {
			return true;
		}
	});
});
