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
	"dojo/data/ObjectStore",
	"dojo/store/Memory",
	"dojo/aspect",
	"docuSign/widget/TemplateSelect",
	"ecm/widget/dialog/EmailDialog",
	"ecm/widget/dialog/ConfirmationDialog"
],

function(declare, lang, connect, domClass, domStyle, ObjectStore, Memory, aspect, TemplateSelect, EmailDialog, ConfirmationDialog) {

	return declare("docuSign.dialog.SignDialog", [EmailDialog], {

		callback: null,

		postCreate: function() 
		{
			this.inherited(arguments);
			
			//set title and into text
			this.setTitle("Send for Signature");
			
			domClass.add(this.bccLink, "dijitHidden");
			this.fromInput.set("value", "p8admin@demo.example.com");
			
			this.own(aspect.after(this.subjectInput, "onChange", lang.hitch(this, function() {
				this.updateSendButtonState();
			})));
			
			this._createTemplateDropDown();
		},
		
		isValid: function(){
			var valid = this.inherited(arguments);
			if (valid){
				var subject = this.subjectInput.get("value")
				if (subject == null || subject.trim().length == 0){
					valid = false;
				}
			}
			
			return valid;
		},
		
		_createTemplateDropDown: function()
		{
			var data = this.templateList.map(function(item){
				return {id: item.templateId, label: item.name};
			});
			
			var store = new Memory({
			    data: data
			  });
			
			var os = new ObjectStore({ objectStore: store });

			this.selectDropDown = new TemplateSelect({
				}, this.fromTable, 'first');
				
			this.selectDropDown.tempelateInput.setStore(os);
			this.selectDropDown.startup();
		},

		onSend: function() 
		{
			this.sendButton.set("disabled", true);
			if (!this.subjectInput.get("value")) {
				if (!this._confirmationDialog) {
					this._confirmationDialog = new ConfirmationDialog({
						title: this.messages.email_subject_reminder,
						text: this.messages.email_subject_reminder_confirm,
						buttonLabel: this.messages.email_send,
						cancelButtonLabel: ecm.messages.email_dont_send,
						onExecute: lang.hitch(this, "_send"),
						onCancel: lang.hitch(this, function() {
							this.sendButton.set("disabled", false);
							setTimeout(lang.hitch(this, function() {
								this.subjectInput.focus();
							}), 500);
						})
					});
				}
				this._confirmationDialog.show();
			} else if (this.isValid()) {
				this._send();
			}
		},
		
		_send: function() 
		{
			var data = {
				templateId: this.selectDropDown.tempelateInput.get('value'),
				to: this.toInput.get("value"),
				cc: this.ccInput.get("value"),
				//bcc: this.bccInput.get("value"),
				subject: this.subjectInput.get("value"),
				message: this.messageInput.get("value")
			};
			
			this.onCancel();
			if (this.callback) {
				this.callback(data);
			}
		}
	});
});
