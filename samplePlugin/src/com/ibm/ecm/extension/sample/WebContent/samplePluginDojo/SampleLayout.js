/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"ecm/model/Desktop",
		"ecm/model/Feature",
		"ecm/widget/layout/NavigatorMainLayout"
	],
	function(declare, Desktop, Feature, NavigatorMainLayout) {

	/**
	 * @name samplePluginDojo.SampleLayout
	 * @class A sample layout provided by the sample plugin.  This sample overrides the favorites feature of the Content Navigator's layout, providing a custom favorites.
	 * @augments ecm.widget.layout.NavigatorMainLayout
	 */
	return declare("samplePluginDojo.SampleLayout", [ NavigatorMainLayout ], {
	/** @lends samplePluginDojo.SampleLayout.prototype */

		/**
		 * Returns an array of identifiers of the features supported by this layout.
		 */
		getAvailableFeatures: function() {
			return [
					new Feature({
						id: "sampleFeature",
						name: "Sample Feature",
						separator: false,
						iconUrl: "sampleFeatureLaunchIcon",
						featureClass: "samplePluginDojo.SampleFeaturePane",
						popupWindowClass: null,
						featureTooltip: "This is a sample feature, provided by the sample plugin",
						popupWindowTooltip: null,
						preLoad: false
					}),		        
				new Feature({
					id: "myfavorites",
					name: "Custom Favorites",
					separator: false,
					iconUrl: "favoritesLaunchIcon",
					featureClass: "ecm.widget.layout.FavoritesPane",
					popupWindowClass: null,
					featureTooltip: this.messages.launchbar_favorites,
					popupWindowTooltip: null,
					preLoad: false
				}),
				new Feature({
					id: "browsePane",
					name: Desktop.getConfiguredLabelsvalue("browse"),
					separator: false,
					iconUrl: "browseLaunchIcon",
					featureClass: "ecm.widget.layout.BrowsePane",
					popupWindowClass: "ecm.widget.layout.BrowseFlyoutPane",
					featureTooltip: this.messages.launchbar_browse,
					popupWindowTooltip: this.messages.launchbar_browse_popup,
					preLoad: false
				}),
				new Feature({
					id: "searchPane",
					name: Desktop.getConfiguredLabelsvalue("search"),
					separator: false,
					iconUrl: "searchLaunchIcon",
					featureClass: "ecm.widget.layout.SearchPane",
					popupWindowClass: "ecm.widget.layout.SearchFlyoutPane",
					featureTooltip: this.messages.launchbar_search,
					popupWindowTooltip: this.messages.launchbar_search_popup,
					preLoad: false
				}),
				new Feature({
					id: "manageTeamspaces",
					name: Desktop.getConfiguredLabelsvalue("workspaces"),
					separator: false,
					iconUrl: "teamspacesLaunchIcon",
					featureClass: "ecm.widget.layout.ManageTeamspacesPane",
					popupWindowClass: "ecm.widget.layout.TeamspaceFlyoutPane",
					featureTooltip: this.messages.launchbar_teamspaces,
					popupWindowTooltip: this.messages.launchbar_teamspaces_popup,
					preLoad: false
				}),
				new Feature({
					id: "workPane",
					name: Desktop.getConfiguredLabelsvalue("work"),
					separator: false,
					iconUrl: "workLaunchIcon",
					featureClass: "ecm.widget.layout.WorkPane",
					popupWindowClass: "ecm.widget.layout.WorkFlyoutPane",
					featureTooltip: this.messages.launchbar_work,
					popupWindowTooltip: this.messages.launchbar_work_popup,
					preLoad: false
				})
			];
		}
	});
});
