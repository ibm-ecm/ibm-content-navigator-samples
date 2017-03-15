/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/declare", "dojo/_base/lang", "dojo/json", "ecm/model/Action", 
        "ecm/model/Request", "ecm/model/Message", "../dialog/LoginDialog", "../dialog/SignDialog"],
	function(declare, lang, json, Action, Request, Message, LoginDialog, SignDialog) {

	/**
	 * @name docuSign.action.SignSubmitAction
	 * @class Describes a user-executable action. Used to override the standard code for enabling/disabling
	 * menu actions.
	 * @augments ecm.model.Action
	 */
	return declare("docuSign.action.SignSubmitAction", [ Action ], {
	/** @lends docuSign.action.SignSubmitAction.prototype */
	
		performAction: function(repository, items, callback, teamspace, resultSet, parameterMap) 
		{	
			if(!items || items.length == 0){
				return;
			}
			
			this._getTemplateList(items);
		},
		
		_getTemplateList: function(items)
		{
			var self = this;
			var payLoadObject = {requestType: "Get"};
			Request.invokePluginService("DocuSignPlugin", "GetTemplatesService", {
				requestParams: {
					repositoryId : items[0].repository.id,
					serverType : items[0].repository.type,
					docId : items[0].docid,
					payLoad: json.stringify(payLoadObject)
				},
				requestCompleteCallback: function(response) {
					if (response.returncode == 0)
					{
						self._showSignDialog(items, response.templates);
					}
					else if (response.returncode == -1)
					{
						self._showLoginDialog(items);
					}
				},
				backgroundRequest : false,
				requestFailedCallback: function(errorResponse) {
					// ignore handline failures
				}
			});
		},
		
		_showLoginDialog: function(items) 
		{
			var callback = lang.hitch(this, function(requestData){
				this._loginDocuSign(items, requestData);
			});
			
			if(this.loginDialog){
				this.loginDialog.destroy();
			}
			this.loginDialog = new LoginDialog({
				callback: callback
			});
			
			this.loginDialog.show();
		},	

		_loginDocuSign: function(items, data)
		{	
			var self = this;
			
			Request.postPluginService("DocuSignPlugin", "DocuSignLoginService", "application/json", {
				requestParams: {
					repositoryId : items[0].repository.id,
					serverType : items[0].repository.type,
					docId : items[0].docid
				},
				requestBody: json.stringify(data),
				requestCompleteCallback: function(response) {
					if (response.returncode == 0)
					{
						self._getTemplateList(items);
					}
					else if (response.returncode == -1)
					{
						self._showLoginDialog(items);
					}					
				},
				backgroundRequest : false,
				requestFailedCallback: function(errorResponse) {
					self._showLoginDialog(items);
				}
			});
		},		
		
		_showSignDialog: function(items, templates)
		{	
			var callback = lang.hitch(this, function(requestData) {	
				this._signDocument(items, requestData);
			});
			
			if(this.signDocumentDialog){
				this.signDocumentDialog.destroy();
			}
			this.signDocumentDialog = new SignDialog({
				templateList: templates,
				attachments: items,
				attachmentType: "link",
				attachmentVersion: "released",
				callback: callback
			});
			
			this.signDocumentDialog.show();
		},
		
		_signDocument: function(items, data)
		{
			Request.postPluginService("DocuSignPlugin", "SignRequestService", "application/json", {
				requestParams: {
					repositoryId : items[0].repository.id,
					serverType : items[0].repository.type,
					docId : items[0].docid
				},
				requestBody: json.stringify(data),
				requestCompleteCallback: function(response) {
					items[0].attributeDisplayValues.DSSignatureStatus = "Sent";
					items[0].attributes.DSSignatureStatus = 2;
					items[0].update(items[0]);
				},
				backgroundRequest : false,
				requestFailedCallback: function(errorResponse) {
					// ignore handline failures
				}
			});
		},
	
		/**
		 * Returns true if this action should be enabled for the given repository, list type, and items.
		 */
		isEnabled: function(repository, listType, items, teamspace, resultSet) 
		{
			var enabled = this.inherited(arguments);	

			if(!items || items.length != 1){
				return false;
			};
			if(items[0].attributes && 
					items[0].attributes.DSSignatureStatus !== 2 && 
						items[0].attributes.DSSignatureStatus !== 3) {
				return (enabled && true);
			}
			return false;
		},
	
		/**
		 * Returns true if this action should be visible for the given repository and list type.
		 */
		isVisible: function(repository, listType) 
		{
			return this.inherited(arguments);
		}
	});
});
