/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/dom-construct",
	"idx/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"dijit/form/TextBox",
	"dijit/form/Button",
	"ecm/model/Request",
	"ecm/model/ResultSet",
	"ecm/widget/layout/_LaunchBarPane",
	"ecm/widget/layout/_RepositorySelectorMixin",
	"ecm/widget/listView/ContentList",
	"ecm/widget/listView/gridModules/RowContextMenu",
	"ecm/widget/listView/modules/Toolbar2",
	"ecm/widget/listView/modules/DocInfo",
	"ecm/widget/listView/gridModules/DndRowMoveCopy",
	"ecm/widget/listView/gridModules/DndFromDesktopAddDoc",
	"ecm/widget/listView/modules/Bar",
	"ecm/widget/listView/modules/ViewDetail",
	"ecm/widget/listView/modules/ViewMagazine",
	"ecm/widget/listView/modules/ViewFilmStrip",
	"dojo/text!./templates/SampleFeaturePane.html"
],

function(declare,
		lang,
		domAttr,
		domStyle,
		domConstruct,
		idxBorderContainer,
		ContentPane,
		TextBox,
		Button,
		Request,
		ResultSet,
		_LaunchBarPane,
		_RepositorySelectorMixin,
		ContentList,
		RowContextMenu,
		Toolbar,
		DocInfo,
		DndRowMoveCopy,
		DndFromDesktopAddDoc,
		Bar,
		ViewDetail,
		ViewMagazine,
		ViewFilmStrip,
		template) {

	/**
	 * @name samplePluginDojo.SampleFeaturePane
	 * @class Provides a pane that demonstrates how to insert new features into the standard IBM Content Navigator layout.
	 * @augments ecm.widget.layout._LaunchBarPane, ecm.widget.layout._RepositorySelectorMixin
	 */
	return declare("samplePluginDojo.SampleFeaturePane", [
		_LaunchBarPane,
		_RepositorySelectorMixin
	], {
		/** @lends samplePluginDojo.SampleFeaturePane.prototype */

		templateString: template,
		widgetsInTemplate: true,

		postCreate: function() {
			this.logEntry("postCreate");
			this.inherited(arguments);
			
			domAttr.set(this.searchResults.domNode, "role", "region");
			domAttr.set(this.searchResults.domNode, "aria-label", this.messages.browse_content_list_label);
			this.searchResults.setContentListModules(this.getContentListModules());
			this.searchResults.setGridExtensionModules(this.getContentListGridModules());
			
			this.defaultLayoutRepositoryComponent = "others";
			this.setRepositoryTypes("cm,p8");
			this.createRepositorySelector();
			this.doRepositorySelectorConnections();
			
			// If there is more than one repository in the list, show the selector to the user.
			if (this.repositorySelector.getNumRepositories() > 1) {
				domConstruct.place(this.repositorySelector.domNode, this.repositorySelectorArea, "only");
			}
			
			this.logExit("postCreate");
		},
		
		/**
		 * Sets the repository being used for search.
		 * 
		 * @param repository
		 * 			An instance of {@link ecm.model.Repository}
		 */
		setRepository: function(repository) {
			this.repository = repository;
			if (this.repositorySelector && this.repository) {
				this.repositorySelector.getDropdown().set("value", this.repository.id);
				if (this.repository.type == "cm") {
					domStyle.set(this.p8HelpText, "display", "none");
					domStyle.set(this.cm8HelpText, "display", "inline");
				} else if (this.repository.type == "p8") {
					domStyle.set(this.cm8HelpText, "display", "none");
					domStyle.set(this.p8HelpText, "display", "inline");
				}
			}
			this.clear();
		},
		
		/**
		 * Returns the content list grid modules used by this view.
		 * 
		 * @return Array of grid modules.
		 */
		getContentListGridModules: function() {
			var array = [];
			array.push(DndRowMoveCopy);
			array.push(DndFromDesktopAddDoc);
			array.push(RowContextMenu);
			return array;
		},

		/**
		 * Returns the content list modules used by this view.
		 * 
		 * @return Array of content list modules.
		 */
		getContentListModules: function() {
			var viewModules = [];
			viewModules.push(ViewDetail);
			viewModules.push(ViewMagazine);
			if (ecm.model.desktop.showViewFilmstrip) {
				viewModules.push(ViewFilmStrip);
			}

			var array = [];
			array.push(DocInfo);
			array.push({
				moduleClass: Bar,
				top: [
					[
						[
							{
								moduleClass: Toolbar
							},
							{
								moduleClasses: viewModules,
								"className": "BarViewModules"
							}
						]
					]
				]
			});
			return array;
		},

		/**
		 * Loads the content of the pane. This is a required method to insert a pane into the LaunchBarContainer.
		 */
		loadContent: function() {
			this.logEntry("loadContent");
			
			if (!this.repository) {
				this.setPaneDefaultLayoutRepository();
				if (this.repository && this.repository.type == "cm") {
					domStyle.set(this.p8HelpText, "display", "none");
					domStyle.set(this.cm8HelpText, "display", "inline");
				} else if (this.repository && this.repository.type == "p8") {
					domStyle.set(this.cm8HelpText, "display", "none");
					domStyle.set(this.p8HelpText, "display", "inline");
				}
			} else if (!this.isLoaded && this.repository && this.repository.connected) {
				this.setRepository(this.repository);
				this.isLoaded = true;
				this.needReset = false;
			}
			
			this.logExit("loadContent");
		},

		/**
		 * Resets the content of this pane.
		 */
		reset: function() {
			this.logEntry("reset");
			
			if (this.repositorySelector && this.repository)
				this.repositorySelector.getDropdown().set("value", this.repository.id);
			this.needReset = false;
			
			this.logExit("reset");
		},
		
		/**
		 * Runs the search entered by the user.
		 */
		runSearch: function() {
			var requestParams = {};
			requestParams.repositoryId = this.repository.id;
			requestParams.repositoryType = this.repository.type;
			requestParams.query = this.queryString.get("value");
			
			Request.invokePluginService("SamplePlugin", "samplePluginSearchService",
				{
					requestParams: requestParams,
					requestCompleteCallback: lang.hitch(this, function(response) {	// success
						response.repository = this.repository;
						var resultSet = new ResultSet(response);
						this.searchResults.setResultSet(resultSet);
					})
				}
			);
		},

		/**
		 * Clears the search results.
		 */
		clear: function() {
			this.queryString.set("value", "");
			this.searchResults.reset();
		}
	});
});
