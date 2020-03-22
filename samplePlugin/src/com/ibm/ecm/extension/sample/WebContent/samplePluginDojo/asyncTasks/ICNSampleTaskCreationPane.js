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
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"dijit/layout/ContentPane",
	"ecm/model/Desktop",
	"ecm/model/Request",
	"ecm/widget/UnselectableFolder",
	"ecm/widget/FolderSelectorCallback",
	"dojo/text!./templates/ICNSampleTaskCreationPane.html",
	"ecm/widget/search/SearchInDropDown"
], function(declare, lang, construct, style, string, TemplatedMixin, WidgetsInTemplateMixin, ContentPane, Desktop, Request, UnselectableFolder, 
		FolderSelectorCallback, contentString) {

	/**
	 * @name samplePluginDojo.asyncTasks.ICNSampleTaskCreationPane
	 * @class Provides a pane that will be inserted into the ICNSampleTaskCreationDialog.
	 * @augments ecm.widget.taskManager.BaseTaskCreationPane
	 */
	return declare("samplePluginDojo.asyncTasks.ICNSampleTaskCreationPane", [ContentPane, TemplatedMixin, WidgetsInTemplateMixin], {
		/** @lends ecm.widget.taskManager.BaseTaskCreationPane.prototype */

		templateString: contentString,
		
		widgetsInTemplate: true,
		
		/**
		 * Returns true if this pane contains all valid values.
		 */
		validate: function() {
			return true;
		}
	});
});
