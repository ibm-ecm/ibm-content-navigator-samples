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

define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
    	"dojo/dom-style",
        "dojo/aspect",
        "dojo/sniff",
        "dojo/string",
		"dijit/layout/StackContainer",
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
		"idx/html",
		"ecm/model/Desktop",
		"ecm/model/Message",
		"ecm/widget/layout/NavigatorMainLayout",
		"ecm/widget/layout/LaunchBarContainer",
        "navLayoutRefreshPluginDojo/_LayoutMixin",
		"dojo/text!./templates/NavLayout.html"
	],
	function(declare, lang, array, domStyle, aspect, has, string, StackContainer, BorderContainer, ContentPane,
			idxhtml, Desktop, Message, NavigatorMainLayout, LaunchBarContainer, _LayoutMixin, template) {

	/**
	 * @name navLayoutRefreshPluginDojo.NavLayout
	 * @class Provides the plug-in's layout.
	 * @augments ecm.widget.layout.NavigatorMainLayout, navLayoutRefreshPluginDojo._LayoutMixin
	 */
	return declare("navLayoutRefreshPluginDojo.NavLayout", [ NavigatorMainLayout, _LayoutMixin ], {
	/** @lends navLayoutRefreshPluginDojo.NavLayout.prototype */

		templateString: template,
		widgetsInTemplate: true,
        
		startup: function() {
			var methodName = "startup";
			this.logEntry(methodName);	
			this.inherited(arguments);
			this._setupUI();
			this.logExit(methodName);
		},
		
		/**
		 * Overrides {@link ecm.widget.layout.NavigatorMainLayout.openSearch} to obtain the menu item corresponding
		 * to the search feature, as suppose to a button used in the standard layout.
		 */
		openSearch: function(item, data) {
			var methodName = "openSearch";
			this.logEntry(methodName);	
			var menuItem = this.launchBarContainer ? this.launchBarContainer.getMenuItemByID("searchPane") : null;
			if (menuItem) {
				menuItem.onClick();
				var searchTemplate = item.item ? item.item : item;
				this.launchBarContainer.selectContentPane(menuItem, "searchPane", {
					tabType: data.tabType || "search",
					repository: searchTemplate.repository,
					teamspace: null,
					selected: true,
					closable: true,
					openNewTab: data.openNewTab === true,
					UUID: data.UUID || null,
					version: data.version,
					"searchTemplate": searchTemplate
				});
			} else { // no search pane
				var message = Message.createErrorMessage("search_cannot_open_error");
				if (message) {
					Desktop.addMessage(message);
				}
			}
			this.logExit(methodName);
		},
		
		/**
		 * Overrides {@link ecm.widget.layout.NavigatorMainLayout.openEditSearch} to obtain the menu item corresponding
		 * to the search feature, as suppose to a button used in the standard layout.
		 */
		openEditSearch: function(item) {
			var methodName = "openEditSearch";
			this.logEntry(methodName);
			var menuItem = this.launchBarContainer ? this.launchBarContainer.getMenuItemByID("searchPane") : null;
			if (menuItem) {
				menuItem.onClick();
				var searchTemplate = item.item ? item.item : item;
				var tabType = "searchbuilder";
				if (searchTemplate.isInstanceOf && searchTemplate.isInstanceOf(ecm.model.UnifiedSearchTemplate))
					tabType = "unifiedsearchbuilder";

				this.launchBarContainer.selectContentPane(menuItem, "searchPane", {
					tabType: tabType,
					repository: searchTemplate.repository,
					teamspace: null,
					selected: true,
					closable: true,
					openNewTab: false,
					"searchTemplate": searchTemplate,
					UUID: searchTemplate.generateUUID()
				});
			} else { // no search pane
				var message = Message.createErrorMessage("search_cannot_open_error");
				if (message) {
					Desktop.addMessage(message);
				}
			}
			this.logExit(methodName);
		},
		
		/**
		 * Overrides {@link ecm.widget.layout.NavigatorMainLayout.openTeamspace} to obtain the menu item corresponding
		 * to the search feature, as suppose to a button used in the standard layout.
		 */
		openTeamspace: function(item, teamspace) {
			var methodName = "openTeamspace";
			this.logEntry(methodName);	
			var menuItem = this.launchBarContainer ? this.launchBarContainer.getMenuItemByID("manageTeamspaces") : null;
			if (menuItem) {
				menuItem.onClick();
				this.launchBarContainer.selectContentPane(menuItem, "manageTeamspaces", {
					tabType: "teamspace",
					teamspace: teamspace,
					repository: teamspace.repository,
					selected: true,
					openNewTab: true,
					title: idxhtml.escapeHTML(teamspace.name),
					closable: false,
					contentClass: "ecm.widget.layout.TeamspacePane",
					uid: teamspace.id,
					UUID: teamspace.id
				});
			}
			this.logExit(methodName);
		}
	});
});
