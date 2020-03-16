/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-style",
	"samplePluginDojo/asyncTasks/ICNSampleSearchTaskResultsPane",
	"ecm/widget/taskManager/BaseTaskInformationPane"
], function(declare, lang, style, SampleSearchTaskResultsPane, BaseTaskInformationPane) {

	/**
	 * @name samplePluginDojo.asyncTasks.ICNSampleSearchTaskInformationPane
	 * @class Provides the task information for this sample ICN search task.
	 * @augments ecm.widget.taskManager.BaseTaskInformationPane
	 * @since 2.0.3
	 */
	return declare("samplePluginDojo.asyncTasks.ICNSampleSearchTaskInformationPane", [
		BaseTaskInformationPane
	], {
		messages: ecm.messages,

		/**
		 * Creates and initializes this pane.
		 */
		postCreate: function() {
			this.inherited(arguments);
		},

		/**
		 * Override this function to create a separate set of tabs or add additional tabs. By default, it will be
		 * initialized with a {@link ecm.widget.taskManager.TaskDetailsPane},
		 * {@link ecm.widget.taskManager.TaskErrorPane}, and {@link ecm.widget.taskManager.TaskInstancesPane}. The
		 * details tab will always be shown to display detailed information about a particular task such as name,
		 * description, creation time, creator, and etc. The error tab will only be shown if an error occurs on the
		 * running of the task. Finally the task instances tab will only be shown for recurring tasks.
		 */
		setUpTabs: function() {
			this.inherited(arguments);

			this.taskResultsPane = new SampleSearchTaskResultsPane({
				UUID: "results",
				title: this.messages.taskInformationPane_results,
				informationPane: this
			});
			this.taskPreviewTabContainer.addChild(this.taskResultsPane);
		},

		/**
		 * Sets the {@link ecm.model.AsyncTask} item for this information pane. Information will be obtained and then
		 * displayed for this item.
		 * 
		 * @param item
		 *            The {@link ecm.model.AsyncTask} that this information pane will open.
		 * @param onComplete
		 *            The function that will be called once this information pane has finished loading.
		 * @param tabIdToOpen
		 *            The UUID of the tab or pane that will be opened up first when this information panes opens. This
		 *            value is optional and if it is not provided, the first tab will be opened.
		 */
		setItem: function(item, onComplete, tabIdToOpen) {
			var _arguments = arguments;
			this.getDetails(lang.hitch(this, function(){
				if(item && item.results){
					this.taskResultsPane.createRendering(item);
					style.set(this.taskResultsPane.controlButton.domNode, "display", "");
				}
				else {
					style.set(this.taskResultsPane.controlButton.domNode, "display", "none");
				}
				this.inherited(_arguments);
			}));
		}
	});
});
