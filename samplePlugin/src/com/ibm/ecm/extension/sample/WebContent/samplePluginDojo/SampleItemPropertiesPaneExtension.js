/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define( ["dojo/_base/declare",
         "ecm/widget/ItemPropertiesPaneExtension", 
         "ecm/widget/CommonPropertiesPane"],
	function(declare, ItemPropertiesPaneExtension, CommonPropertiesPane) {

	/**
	 * @name samplePluginDojo.SampleItemPropertiesPaneExtension
	 * @class Demonstrates how to extend the item properties pane, used in the property editor, to add a custom section.
	 * @augments ecm.widget.ItemPropertiesPaneExtension
	 */
	return declare("samplePluginDojo.SampleItemPropertiesPaneExtension", [ ItemPropertiesPaneExtension ], {
		/** @lends samplePluginDojo.SampleItemPropertiesPaneExtension.prototype */

		postCreate: function() {
			this.inherited(arguments);
			this.set("title", "Sample Plugin Custom Properties");
			this._commonProperties = new CommonPropertiesPane();
			this.addChild(this._commonProperties);
		},

		isEnabledFor: function(item) {
			return true;
		},
	
		getPropertiesTitle: function() {
			return "Sample Properties";
		},
		
		setItem: function(item) {
			this.item = item;
		}
	});
});
