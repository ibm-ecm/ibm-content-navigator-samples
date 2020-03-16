/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"ecm/widget/dialog/BaseDialog",
		"dojo/text!./templates/MessagesDialog.html"
	],
	function(declare, BaseDialog, template) {

	/**
	 * @name samplePluginDojo.MessagesDialog
	 * @class Provides a dialog to display a messages.  Invoking addMessage will append a new message line
	 * to those already appearing in the dialog.
	 * @augments ecm.widget.dialog.BaseDialog
	 */
	return declare("samplePluginDojo.MessagesDialog", [ BaseDialog ], {
	/** @lends samplePluginDojo.MessagesDialog.prototype */
	
		contentString: template,
		widgetsInTemplate: true,
	
		postCreate: function() {
			this.inherited(arguments);
			this.setResizable(true);
			this.setMaximized(false);
			this.setTitle("Messages");
			this.addButton("Clear", "clearMessages", false, true);
		},
		
		addMessage: function(message) {
			this.clearMessages();
			
			if (typeof message == "string") {
				this.messagesTextarea.value += message + "\n";
			} else {
				this.messagesTextarea.value += message.text + "\n";
			}
			this.show();
		},
	
		clearMessages: function(evt) {
			this.messagesTextarea.value = "";
		}
	});
});
