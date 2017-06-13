define([
		"dojo/_base/declare",
		"ecm/model/Repository",
	],
	function(declare, Repository) {

		/**
		 * @name ${DojoModuleName}.${ClassName}Model
		 * @class Provides a custom repository model class for a repository type.   Providing this class is optional, but it allows
		 * new methods to be added to the ecm.model.Repository for a plug-in provided repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 */
		return declare("${DojoModuleName}.${ClassName}Model", [ Repository], {
		/** @lends ${DojoModuleName}.${ClassName}Model.prototype */

			logon: function(password, callback, desktopId, synchronous, errorCallback, backgroundRequest) {
				this.inherited(arguments);
			},
			
			/** Override to return true so change password is enabled. */
			canChangePassword: function() {
				if (this.connected && !this.useSSO) {
					return true;
				}
				return false;
			}

		
	});
});
