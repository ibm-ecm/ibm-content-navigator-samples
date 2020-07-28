/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
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
					this.param1Field.set('value', jsonConfig.param1Field);
				} catch (e) {
					this.logError("load", "failed to load configuration: " + e.message);
				}
			}
		},
		
		_onParamChange: function() {
			var configJson = {  
				param1Field: this.param1Field.get('value')
			}; 
			
			this.configurationString = JSON.stringify(configJson);
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			return true;
		}
	});
});
