/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"ecm/model/Repository",
	],
	function(declare, Repository) {

		/**
		 * @name samplePluginDojo.SampleRepositoryModel
		 * @class Provides a custom repository model class for the sample plug-in repository type.   Providing this class is optional, but it allows
		 * new methods to be added to the ecm.model.Repository for a plug-in provided repository type.
		 * @augments ecm.widget.admin.PluginRepositoryGeneralConfigurationPane
		 */
		return declare("samplePluginDojo.SampleRepositoryModel", [ Repository], {
		/** @lends samplePluginDojo.SampleRepositoryModel.prototype */

			logon: function(password, callback, desktopId, synchronous, errorCallback, backgroundRequest) {
				//alert("SampleRepositoryModel.logon");
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
