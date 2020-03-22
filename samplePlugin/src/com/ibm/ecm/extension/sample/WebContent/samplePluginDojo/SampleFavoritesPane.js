/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"ecm/widget/layout/FavoritesPane",
	"ecm/widget/listView/modules/Breadcrumb",
	"ecm/widget/listView/modules/Toolbar2",
	"ecm/widget/listView/modules/DocInfo",
	"ecm/widget/listView/modules/FilterDataServer",
	"ecm/widget/listView/modules/Bar",
	"ecm/widget/listView/modules/ViewDetail",
	"ecm/widget/listView/modules/ViewMagazine",
	"ecm/widget/listView/modules/ViewFilmStrip",
	"ecm/widget/listView/modules/InlineMessage"
],
function(declare, //
		FavoritesPane, //
		Breadcrumb, //
		Toolbar, //
		DocInfo, //
		FilterDataServer, //
		Bar, //
		ViewDetail, //
		ViewMagazine, //
		ViewFilmStrip, //
		InlineMessage) {
	
	/**
	 * @name samplePluginDojo.SampleFavoritesPane
	 * @class Provides a sample extension to {@link ecm.widget.layout.FavoritesPane, which sets the default view to magazine view and
	 * sets the default behavior of the document information pane to collapse system properties.
	 * @augments ecm.widget.layout.FavoritesPane
	 */
	return declare("samplePluginDojo.SampleFavoritesPane", [
		FavoritesPane
	], {
		/** @lends samplePluginDojo.SampleFavoritesPane.prototype */

		postCreate:function() {
			this.logEntry("postCreate");
			this.favoritesContent._viewCurrentName = "viewMagazine";
			this.inherited(arguments);
			this.logExit("postCreate");
		},
		
		/**
		 * Returns the content list modules.
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
			array.push({
				moduleClass: Bar,
				top: [
					[ // Table
						[ // Row 
							{
								moduleClass: Toolbar
							},
							{
								moduleClasses: viewModules,
								"className": "BarViewModules"
							}
						]
					],
					[ // Table
						[ // Row 
							{
								moduleClass: Breadcrumb
							},
							{
								moduleClass: FilterDataServer,
								"className": "BarFilterData"
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
				]
			});
			array.push({
				moduleClass: DocInfo,
				showSystemProps: false
			});
			return array;
		}
	});
});
