/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/layout/ContentPane",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/listView/gridModules/SingleSort",
	"ecm/widget/listView/gridModules/DndRowCopy",
	"ecm/widget/listView/gridModules/DndFromDesktopAddDoc",
	"ecm/widget/listView/gridModules/RowContextMenu",
	"ecm/LoggerMixin",
	"dojo/text!./templates/ICNSampleSearchTaskResultsPane.html",
	"ecm/widget/listView/ContentList" //in template
], function(declare, lang, ContentPane, TemplatedMixin, WidgetsInTemplateMixin, SingleSort, DndRowCopy, DndFromDesktopAddDoc, RowContextMenu, LoggerMixin, templateString) {

	/**
	 * @name ecm.widget.taskManager.TaskResultsPane
	 * @class The pane is responsible for listing the results of a task.
	 * @augments ecm.widget.taskManager.TaskDetailsPane
	 * @since 2.0.3
	 */
	return declare("samplePluginDojo.asyncTasks.ICNSampleSearchTaskResultsPane", [
		ContentPane,
		TemplatedMixin,
		WidgetsInTemplateMixin,
		LoggerMixin
	], {
		templateString: templateString,
		widgetsInTemplate: true,
		messages: ecm.messages,
		
		postCreate: function() {
			this.searchResults.setGridExtensionModules(this.getContentListGridModules());
			this.searchResults.setContentListModules(this.getContentListModules());
		},

		createRendering: function(item) {
			this.logEntry("createRendering");
			
			if(item && item.results){
				item.results.repository = ecm.model.desktop.getAuthenticatingRepository();
				//response.repository = this.repository;
				//response.parentFolder = this;
				//response.searchTemplate = this;
				//response.teamspaceId = this.teamspaceId;

				var results = ecm.model.ContentItem.createResultSet(item.results);
				this.searchResults.setResultSet(results);
			}
				
			
			this.logExit("createRendering");
		},
		
		getContentListGridModules: function() {
			var array = [];
			array.push(SingleSort);
			array.push(RowContextMenu);
			return array;
		},
		
		getContentListModules: function() {
			var array = [];
			require([
				"ecm/widget/listView/modules/Toolbar2",
				"ecm/widget/listView/modules/Bar",
				"ecm/widget/listView/modules/Breadcrumb",
				"ecm/widget/listView/modules/DocInfo",
				"ecm/widget/listView/modules/ViewDetail",
				"ecm/widget/listView/modules/ViewMagazine",
				"ecm/widget/listView/modules/ViewFilmStrip",
				"ecm/widget/listView/modules/TotalCount",
				"ecm/widget/listView/modules/InlineMessage"
			], lang.hitch(this, function(Toolbar, Bar, Breadcrumb, DocInfo, ViewDetail, ViewMagazine, ViewFilmStrip, TotalCount, InlineMessage) {
				var viewModules = [];
				viewModules.push(ViewDetail);
				viewModules.push(ViewMagazine);
				if (ecm.model.desktop.showViewFilmstrip) {
					viewModules.push(ViewFilmStrip);
				}

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
						],
						[
							[
								{
									moduleClass: Breadcrumb,
									rootPrefix: ecm.messages.showing_results + " "
								}
							]
						],
						[
							[
								{
									moduleClass: InlineMessage
								}
							]
						]
					],
					bottom: [
						[
							[
								{
									moduleClass: TotalCount
								}
							]
						]
					]
				});
			}));
			return array;
		}
	});
});
