define(["dojo/_base/declare", "ecm/model/Action"],
	function(declare, Action) {

	return declare("reactEmailDialogPlugin.ReactSendAsAttachmentAction", [ Action ], {
	/** @lends reactEmailDialogPlugin.ReactSendAsAttachmentAction.prototype */
	
		/**
		 * Returns true if this action should be enabled for the given repository, list type, and items.
		 */
		isEnabled: function(repository, listType, items, teamspace, resultSet) {
			var result =true;
			for(var i=0;i<items.length;i++){
				if(!items[i].hasContent()){
					result = false;
					break;
				}
			}
			return result;
		}
	});
});