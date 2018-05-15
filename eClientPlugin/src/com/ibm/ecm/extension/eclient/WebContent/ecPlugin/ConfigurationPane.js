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
		 * @name ecPlugin.ConfigurationPane
		 * @class Creates a configuration panel for the ICN web administration.
		 * @augments ecm.widget.admin.PluginConfigurationPane
		 */
		return declare("ecPlugin.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends ecPlugin.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
	
		server_input_label: "IBM CM8 eClient URL",
		server_input_hover: "The URL address for IBM CM8 eClient, for example, http://localhost:9080/eClient/",

		constructor: function() {
		},
	
		postCreate: function() {
			this.inherited(arguments);
		},
		
		load: function(callback){
			if (this.configurationString) {
				this.ecServerURI.set('value', this.configurationString);
			}
		},
		
		_onFieldChange: function() {
			this.configurationString = this.ecServerURI.get('value');
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if (!this.ecServerURI.isValid())
				return false;
			return true;
		}
	});
});
