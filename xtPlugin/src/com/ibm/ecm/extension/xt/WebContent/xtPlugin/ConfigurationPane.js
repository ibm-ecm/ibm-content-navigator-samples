/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2013 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
		"dojo/_base/declare",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/widget/admin/PluginConfigurationPane",
		"ecm/widget/HoverHelp",
		"ecm/widget/ValidationTextBox",
		"dojo/text!./templates/ConfigurationPane.html"
	],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, PluginConfigurationPane, HoverHelp, ValidationTextBox, template) {

		/**
		 * @name xtPlugin.ConfigurationPane
		 * @class Creates a configuration panel for the ICN web administration.
		 * @augments ecm.widget.admin.PluginConfigurationPane
		 */
		return declare("xtPlugin.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends xtPlugin.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		//server_input_label: this.messages.xtplugin_server_label,
		//server_input_hover: this.messages.xtplugin_server_hover,

		server_input_label: "IBM Workplace XT Server URL",
		server_input_hover: "The URL address for IBM Workplace XT Server, for example, http://localhost:8080/WorkplaceXT",

		constructor: function() {
		},
	
		postCreate: function() {
			this.inherited(arguments);
		},
		
		load: function(callback){
			if (this.configurationString) {
				this.xtServerURI.set('value', this.configurationString);
			}
		},
		
		_onFieldChange: function() {
			this.configurationString = this.xtServerURI.get('value');
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if (!this.xtServerURI.isValid())
				return false;
			return true;
		}
	});
});
