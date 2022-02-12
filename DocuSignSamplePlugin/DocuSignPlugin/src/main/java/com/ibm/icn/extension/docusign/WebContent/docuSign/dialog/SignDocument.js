/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojox/validate/web",
	"ecm/Messages",
	"ecm/widget/Button",
	"ecm/widget/dialog/BaseDialog",
	"dojo/text!./templates/SignDocument.html"
],

function(declare, lang, connect, domClass, domStyle, web, Messages, Button, BaseDialog, template) {

	return declare("docuSign.dialog.SignDocument", [
		BaseDialog
	], {

		contentString: template,
		widgetsInTemplate: true,
		_callback: null,

		constructor: function(args) 
		{
			if (args) {
				this.repository = args.repository;
			}
		},

		postCreate: function() 
		{
			this.inherited(arguments);
			this.setResizable(true);
			this.setMaximized(true);
			domClass.add(this.domNode, "ecmManageProcessRolesDialog");
			
			//set title and into text
			this.setTitle("Sign Document");
			this.setIntroText("Send the document for signature to the recipient.");

			this._saveButton = this.addButton("Send for Sign", "onSave", false, false, "SAVE");
			this._saveButton.set("disabled", true);
		},

		/**
		 * Shows the dialog.
		 * 
		 * @param document
		 *            An {@link ecm.model.ContentItem} object.
		 * @param callback
		 *            A callback function called when the dialog is shown.
		 */
		show: function(document, callback) 
		{
			this._callback = callback;

			this._displayWarning("");
			this.inherited("show", []);
			this.resize();
		},

		onSave: function() 
		{
			this.logEntry("onSave");
			// Get the JSON from the UI
			var signRequest = {};

			signRequest.signerName = this._nameTextBox.get("value");
			signRequest.signerEmail = this._emailTextBox.get("value");
			signRequest.subject = this._subjectTextBox.get("value");
			
			this.onCancel();
			if (this._callback) {
				this._callback(signRequest);
			}
			this.logExit("onSave");
		},
		
		_onKeyPress: function() 
		{
			this._saveButton.set("disabled", !(this._isValid()));
		},
		
		_onEmailMouseOut: function() 
		{
			var emailId = this._emailTextBox.get("value");
			if(this._isValidEmail(emailId)) {
				this._displayWarning("");
			}
			else {
				this._displayWarning("Enter a valid email address.");
			}
		},
		
		_isValid: function() 
		{
			if(!this._nameTextBox.get("value")) {
				return false;
			}
			if(!this._emailTextBox.get("value")) {
				return false;
			}
			if(!this._subjectTextBox.get("value")) {
				return false;
			}
			return this._isValidEmail(this._emailTextBox.get("value"));
		},

		_isValidEmail: function(emailId) 
		{
			return web.isEmailAddress(emailId);
		},
		
		_displayWarning: function(message) 
		{
			//var warningMessage = idxHtml.message(message);
			this._infoText.innerHTML = message;
			if (message.length > 0) {
				this._infoPane.style.display = "block";
			} else {
				this._infoPane.style.display = "none";
			}
			this.resize();
		},

		resize: function() 
		{
			this.inherited(arguments);
		}

	});
});
