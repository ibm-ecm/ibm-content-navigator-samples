/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2018  All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

define([
		"dojo/_base/declare",
		"dojo/json",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"ecm/widget/ValidationTextBox",
		"ecm/widget/admin/PluginConfigurationPane",
		"dojo/i18n!./nls/messages",
		"dojo/text!./templates/ConfigurationPane.html",
	],
	function(declare, dojoJson, _TemplatedMixin, _WidgetsInTemplateMixin, ValidationTextBox, PluginConfigurationPane, mes, template) {

		/**
		 * @name ViewerToolbarPlugin.ConfigurationPane
		 * @class Provides a configuration panel for the viewer toolbar plugin.  This panel appears on the plug-in configuration page in
		 * administration after loading the plug-in.
		 * @augments ecm.widget.admin.PluginConfigurationPane
		 */
		return declare("ViewerToolbarPlugin.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {
		/** @lends ViewerToolbarPlugin.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
		messages: mes,
		
		defaultTopButtonTooltip: "Viewer Toolbar Plugin Action",
		defaultTopButtonImageEnabled: "plugin/ViewerToolbarPlugin/getResource/images/button.png",
		defaultTopButtonImageDisabled: "plugin/ViewerToolbarPlugin/getResource/images/button-disabled.png",
		defaultStampButtonLabel: "Sample Stamp",
		defaultStampButtonImage: "plugin/ViewerToolbarPlugin/getResource/images/SampleStamp.png",
	
		postCreate: function(){
			this.inherited(arguments);
		},
		
		load: function(callback) {
			if (this.configurationString) {
				try {
					var jsonConfig = dojoJson.parse(this.configurationString);
					this.topButtonTooltipField.set('value', jsonConfig.topButtonTooltip);
					this.topButtonImageEnabledField.set('value', jsonConfig.topButtonImageEnabled);
					this.topButtonImageDisabledField.set('value', jsonConfig.topButtonImageDisabled);
					this.stampButtonLabelField.set('value', jsonConfig.stampButtonLabel);
					this.stampImageField.set('value', jsonConfig.stampImage);
				} catch (e) {
					this.logError("load", "failed to load configuration: " + e.message);
				}
			} else {
				this.topButtonTooltipField.set('value', this.defaultTopButtonTooltip);
				this.topButtonImageEnabledField.set('value', this.defaultTopButtonImageEnabled);
				this.topButtonImageDisabledField.set('value', this.defaultTopButtonImageDisabled);
				this.stampButtonLabelField.set('value', this.defaultStampButtonLabel);
				this.stampImageField.set('value', this.defaultStampButtonImage);
				this._onParamChange();
			}
		},
		
		_onParamChange: function() {
			var configJson = {
				topButtonTooltip: this.topButtonTooltipField.get('value'),
				topButtonImageEnabled: this.topButtonImageEnabledField.get('value'),
				topButtonImageDisabled: this.topButtonImageDisabledField.get('value'),
				stampButtonLabel: this.stampButtonLabelField.get('value'),
				stampImage: this.stampImageField.get('value')				
			};
			this.configurationString = JSON.stringify(configJson);
			this.onSaveNeeded(true);
		},
		
		validate: function() {
			if(!this.topButtonTooltipField.isValid() || !this.topButtonImageEnabledField.isValid()
				|| !this.topButtonImageDisabledField.isValid() || !this.stampButtonLabelField.isValid()
				|| !this.stampImageField.isValid())
				return false;
			return true;
		}
	});
});
