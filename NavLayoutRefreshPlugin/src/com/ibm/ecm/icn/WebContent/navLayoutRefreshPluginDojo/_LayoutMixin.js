/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016  All Rights Reserved.
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
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/aspect",
	"dojo/sniff",
	"dijit/registry",
	"ecm/model/Desktop",
	"ecm/widget/Toolbar",
	"ecm/widget/Button", 
	"ecm/LoggerMixin"
],
function(declare, lang, domClass, domStyle, aspect, has, registry, Desktop, Toolbar, Button, LoggerMixin) {
	
	/**
	 * @name navLayoutRefreshPluginDojo._LayoutMixin
	 * @class A mixin class for plug-in provided layouts like {@link navLayoutRefreshPluginDojo.NavLayout} and {@link navLayoutRefreshPluginDojo.BookmarkLayout}.
	 * @augments ecm.LoggerMixin
	 */
	return declare("navLayoutRefreshPluginDojo._LayoutMixin", [
		LoggerMixin
	], {
		/** @lends navLayoutRefreshPluginDojo._LayoutMixin.prototype */

        _setupUI: function() {
			domClass.add(document.body, "navLayoutRefreshTheme");		
			
			Toolbar.prototype._createButton = function(id, label, iconClass) {
				var toolbarButton = null;
				
				if (id == "RefreshGrid") {
					// Customize the toolbar's refresh button using CSS
					toolbarButton = new Button({
						iconClass: "refreshButtonIcon",
						label: label,
						showLabel: false,
						"class": "refreshButton",
						id: registry.getUniqueId((id ? (id.toUpperCase() + "_") : "") + "dijit_form_Button")
					});
				} else {
					toolbarButton = new Button({
						iconClass: iconClass,
						label: label,
						showLabel: this.showButtonLabels,
						id: registry.getUniqueId((id ? (id.toUpperCase() + "_") : "") + "dijit_form_Button")
					});
				}
		
				// Block right-click event, so the browser doesn't show an annoying right-click window
				toolbarButton.own(aspect.after(toolbarButton.domNode, "oncontextmenu", lang.hitch(this, function(evt) {
					this._stopEvent(evt);
				}), true));
				return toolbarButton;
			};

			this._setupFeatures();
        },
		
		_setupFeatures: function() {
			var signal = aspect.after(Desktop, "onLogin", lang.hitch(this, function(repository) {
				signal.remove();

				var repo = repository ? repository : Desktop.getDefaultRepository();
				if (!repo || !repo.connected || !this.launchBarContainer || !this.launchBarContainer.layoutObj || !(this.launchBarContainer.layoutObj.buttons instanceof Array))
					return;

				var currentDisplay = domStyle.get(this.launchBarContainer.launchBarButtonArea.domNode, "display");
				var display = this.launchBarContainer.layoutObj.buttons instanceof Array && this.launchBarContainer.layoutObj.buttons.length > 1;
				if ((currentDisplay != "none") != display) {
					domStyle.set(this.launchBarContainer.launchBarButtonArea.domNode, "display", display ? "block" : "none");
					this.resize();
				}
			}), true);
		}
	});
});
