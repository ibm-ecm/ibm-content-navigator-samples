/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/string",
	"ecm/model/Desktop",
	"ecm/model/Request",
	"ecm/widget/taskManager/BaseTaskCreationDialog",
	"samplePluginDojo/asyncTasks/ICNSampleTaskCreationPane",
	"dojo/text!./templates/ICNSampleTaskCreationDialog.html",
	"ecm/widget/search/SearchInDropDown"
], function(declare, lang, construct, style, string, Desktop, Request, BaseTaskCreationDialog, ICNSampleTaskCreationPane, contentString) {

	/**
	 * @name samplePluginDojo.asyncTasks.ICNSampleTaskCreationDialog
	 * @class Provides an extended creation dialog for the ICNSampleTask.  This dialog extends from the {@link ecm.widget.taskManager.BaseTaskCreationDialog} and provides an interface
	 * 		  to select a folder.
	 * @augments ecm.widget.taskManager.BaseTaskCreationDialog
	 */
	return declare("samplePluginDojo.asyncTasks.ICNSampleTaskCreationDialog", [
	     BaseTaskCreationDialog
	], {
		/** @lends ecm.widget.taskManager.BaseTaskCreationDialog.prototype */

		contentString: contentString,
		widgetsInTemplate: true,

		/**
		 * Creates and initializes this dialog.
		 */
		postCreate: function() {
			this.inherited(arguments);
			this.sampleTaskCreationPane = new ICNSampleTaskCreationPane();
			this.taskSchedulerPane.addTitlePaneSection("General", this.sampleTaskCreationPane, 0);
			this.repository = Desktop.getAuthenticatingRepository();
		},

		onSchedule: function() {
			var valid = this.sampleTaskCreationPane.validate();

			if (valid == true) {
				this.inherited(arguments);
			}
		}
	});
});
