/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"ecm/model/Favorite",
	"ecm/model/Item"
], function(declare, lang, array, Favorite, Item) {

	/**
	 * @name samplePluginDojo.SampleFavorite
	 * @class Represents a sample favorite item. It overrides the Favorites factory to display a different icon and state for any favorites named "Sample". 
	 * You can do further overrides to completely change what is displayed in the favorites pane.
	 * @augments ecm.model.Favorite
	 */
	var SampleFavorite = declare("samplePluginDojo.SampleFavorite", [
		Favorite
	], {
		/** @lends samplePluginDojo.SampleFavorite.prototype */
		
		/**
		 * Returns a different state icon for locked.
		 */
		getStateClass: function(state) {
			if(state == "locked")
				return "ecmRecordIcon";
			else
				return this.inherited(arguments);
		},

		/**
		 * Returns a record entry template mime type class for this sample favorite.
		 */
		getMimeClass: function() {
			return "ftDeclareRecordEntryTemplate";
		},
		
		/**
		 *	Returns the teamspace context menu for this favorite item.
		 */
		getActionsMenuItemsType: function() {
			return "FavoriteTeamspaceContextMenu";
		}
	});


	/**
	 * In this sample, if the favorite's name is "Sample", this subclass will be created instead of the regular Favorite class.
	 * Return null for the other cases so others can register and create their own subclasses.
	 * 
	 * @param itemJSON
	 * 			  The itemJSON to create this favorite item.
	 */
	SampleFavorite.createFromJSON = function(itemJSON) {
		if(itemJSON){
			if(itemJSON.name == "Sample")
			return new SampleFavorite(itemJSON);
		}
		return null;
	};
	
	/**
	 * Register this SampleFavorite into the factory.
	 */
	if (Favorite.registerFactory) {
		Favorite.registerFactory(SampleFavorite);
	}
	
	return SampleFavorite;
});
