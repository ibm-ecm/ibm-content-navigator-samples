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
	"docuSign/widget/TemplateSelect",
	"ecm/model/Request",
	"ecm/widget/dialog/LoginDialog",
	"ecm/widget/dialog/ConfirmationDialog"
],

function(declare, lang, connect, domClass, domStyle, ObjectStore, Memory, TemplateSelect, Request, LoginDialog, ConfirmationDialog) {

	return declare("docuSign.dialog.LoginDialog", [LoginDialog], {

		callback: null,

		postCreate: function() 
		{
			this.inherited(arguments);
			
			//this.setTitle("Login to Docusign Account");
			this.titleBar.title = "DocuSign Log In";
			this.intro.innerHTML = "Log in to your DocuSign account";
		},
		
		_login: function() 
		{
			var methodName = "_login";
			this.logEntry(methodName);

			this.cleanMessage();
			
			var data = {
				user: this.username.get('value'),
				password: this.password.get('value')
			};

			this.hide();
			if (this.callback) {
				this.callback(data);
			}
		}
	});
});
