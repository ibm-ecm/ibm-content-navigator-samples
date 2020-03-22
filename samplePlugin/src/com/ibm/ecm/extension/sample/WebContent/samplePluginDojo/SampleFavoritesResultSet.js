/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"ecm/model/FavoritesResultSet",
	"ecm/model/Item"
], function(declare, lang, array, FavoritesResultSet, Item) {

	/**
	 * @name samplePluginDojo.SampleFavoritesResultSet
	 * @class Represents a sample favorites result set to return a different toolbar and context menu.
	 * @augments ecm.model.FavoritesResultSet
	 */
	var SampleFavoritesResultSet = declare("samplePluginDojo.SampleFavoritesResultSet", [
		FavoritesResultSet
	], {
		/** @lends samplePluginDojo.SampleFavoritesResultSet.prototype */
		
		/**
		 * Returns the content list toolbar instead.
		 */
		getToolbarDef: function() {
			return "ContentListToolbar";
		},
	});


	/**
	 * In this sample, if first item in this favorites result set is called "Sample", return a different context menu and toolbar.
	 * 
	 * @param itemJSON
	 * 			  The itemJSON to create this favorite item.
	 */
	SampleFavoritesResultSet.createFromJSON = function(itemJSON) {
		if(itemJSON && itemJSON.items){
			for(var i in itemJSON.items){
				if(itemJSON.items[i].name == "Sample")
					return new SampleFavoritesResultSet(itemJSON);
			}
		}
		return null;
	};
	
	/**
	 * Register this SampleFavoritesResultSet into the factory.
	 */
	if (FavoritesResultSet.registerFactory) {
		FavoritesResultSet.registerFactory(SampleFavoritesResultSet);
	}
	
	return SampleFavoritesResultSet;
});
