/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/declare",  "dojo/_base/lang", "dojo/json", "ecm/model/Action",  "ecm/model/Request",  "../dialog/LoginDialog", "../dialog/DocumentHistory", "ecm/widget/dialog/MessageDialog"],
	function(declare, lang, json, Action, Request, LoginDialog, DocumentHistory, MessageDialog) {

	/**
	 * @name docuSign.action.DocumentHistoryAction
	 * @class Describes a user-executable action. Used to override the standard code for enabling/disabling
	 * menu actions.
	 * @augments ecm.model.Action
	 */
	return declare("docuSign.action.DocumentHistoryAction", [ Action ], {
	/** @lends docuSign.action.DocumentHistoryAction.prototype */
	
		performAction: function(repository, items, callback, teamspace, resultSet, parameterMap) 
		{
			this._getDocumentHistory(items);
		},
		
		_getDocumentHistory: function(items, requestData)
		{
			var self = this;
			var payLoadObject = {requestType: "Get", id: items[0].id};
			Request.invokePluginService("DocuSignPlugin", "GetDocumentHistoryService", {
				requestParams: {
					repositoryId : items[0].repository.id,
					serverType : items[0].repository.type,
					docId : items[0].docid,
					payLoad: json.stringify(payLoadObject)
				},
				requestCompleteCallback: function(response) {
					if (response.returncode == 0)
					{					
						self.documentHistoryDialog = new DocumentHistory({
							repository: items[0].repository
						});
					
						self.documentHistoryDialog.show(response);
					}
					else if (response.returncode == -1)
					{
					    //Request a new Token
						self._loginDocuSign(items);
					}
				},
				backgroundRequest : false,
				requestFailedCallback: function(errorResponse) {
					// ignore handline failures
				}
			});
		},

		_loginDocuSign: function(items)
		{	
			var self = this;
			
			Request.postPluginService("DocuSignPlugin", "DocuSignLoginService", "application/json", {
				requestParams: {
					repositoryId : items[0].repository.id,
					serverType : items[0].repository.type,
					docId : items[0].docid
				},
				requestCompleteCallback: function(response) {
					if (response.returncode == 0)
					{
						self._getDocumentHistory(items);
					}
					else if (response.returncode == -1)
					{
						if (!this._messageDialog) {
							this._messageDialog = new MessageDialog();
						}
						this._messageDialog.showMessage(response.errorMessage);
					}						
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
					(items[0].attributes.DSSignatureStatus == 2 || 
							items[0].attributes.DSSignatureStatus == 3) || items[0].attributes.DSSignatureStatus == 4) {
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
		},

		destroy: function() {
			this.inherited(arguments);
			if (this._messageDialog) {
				this._messageDialog.destroyRecursive();
				this._messageDialog = null;
			}
		}
	});
});
