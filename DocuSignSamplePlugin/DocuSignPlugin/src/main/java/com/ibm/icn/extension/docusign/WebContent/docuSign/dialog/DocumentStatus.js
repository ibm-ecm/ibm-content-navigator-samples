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
	"dojo/text!./templates/DocumentStatus.html"
],

function(declare, lang, connect, domClass, domStyle, web, Messages, Button, BaseDialog, template) {

	return declare("docuSign.dialog.DocumentStatus", [
		BaseDialog
	], {

		contentString: template,
		widgetsInTemplate: true,
		_callback: null,

		constructor: function(args) {
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
			this.setTitle("Document Signature Status");
			this.setIntroText("Status of signature for the document to the recipient.");

			this._saveButton = this.addButton("Check-in Signed Document", "onSave", false, false, "SAVE");
			this._saveButton.set("disabled", true);
		},

		/**
		 * Shows the dialog.
		 */
		show: function(signStatus, callback) 
		{
			this._callback = callback;

			this.setData(signStatus);
			
			this.inherited("show", []);
			this.resize();
		},
		
		setData: function(signStatus) 
		{
			if(signStatus.status == 'completed') {
				this._saveButton.set("disabled", false);
			}
			this._statusDiv.innerHTML = signStatus.status;
			this._nameDiv.innerHTML = signStatus.signerName;
			this._emailDiv.innerHTML = signStatus.signerEmail;
			this._subjectDiv.innerHTML = signStatus.emailSubject;
			this._sentTimeDiv.innerHTML = signStatus.sentDateTime;
			
			this._sentTimeDiv.innerHTML = dojo.date.locale.format(new Date(signStatus.sentDateTime), {formatLength: "medium"});
			
			if(signStatus.completedDateTime){
				this._completedTimeDiv.innerHTML = dojo.date.locale.format(new Date(signStatus.completedDateTime), {formatLength: "medium"});
			}
		},

		onSave: function() 
		{
			this.logEntry("onSave");
			// Get the JSON from the UI
			var signRequest = {};
			
			this.onCancel();
			if (this._callback) {
				this._callback(signRequest);
			}
			this.logExit("onSave");
		},

		resize: function() {
			this.inherited(arguments);
		}

	});
});