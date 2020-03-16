/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define(["dojo/_base/declare", "ecm/model/Action"],
	function(declare, Action) {

	/**
	 * @name samplePluginDojo.CustomAction
	 * @class Describes a user-executable action. Used to override the standard code for enabling/disabling
	 * menu actions.
	 * @augments ecm.model.Action
	 */
	return declare("samplePluginDojo.CustomAction", [ Action ], {
	/** @lends samplePluginDojo.CustomAction.prototype */
	
		/**
		 * Returns true if this action should be enabled for the given repository, list type, and items.
		 */
		isEnabled: function(repository, listType, items, teamspace, resultSet) {
			var enabled = this.inherited(arguments);
			// only enable for text files:
			if (enabled && items[0] && items[0].getContentType) {
				var mimeType = items[0].getContentType();
				enabled = (mimeType == "text/plain");
			}
			return enabled;
		},
	
		/**
		 * Returns true if this action should be visible for the given repository and list type.
		 */
		isVisible: function(repository, listType) {
			return this.inherited(arguments);
		}
	});
});
