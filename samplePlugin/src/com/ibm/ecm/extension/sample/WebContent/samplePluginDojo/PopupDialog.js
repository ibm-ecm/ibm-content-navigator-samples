/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"ecm/widget/dialog/BaseDialog",
		"dojo/text!./templates/PopupDialog.html"
	],
	function(declare, BaseDialog, template) {

	/**
	 * @name samplePluginDojo.PopupDialog
	 * @class Provides a dialog whose main content is an html page displayed in an iframe.  
	 * @augments ecm.widget.dialog.BaseDialog
	 */
	return declare("samplePluginDojo.PopupDialog", [ BaseDialog ], {
	/** @lends samplePluginDojo.PopupDialog.prototype */	

		contentString: template,
		widgetsInTemplate: true,
		
		postCreate: function() {
			this.inherited(arguments);
			this.setResizable(true);
			this.setMaximized(false);
			this.setTitle("Popup Dialog");
		},
		
		show: function(src) {
			this.mainContent.src = src;
			this.inherited("show", []);
		}
	});
});
