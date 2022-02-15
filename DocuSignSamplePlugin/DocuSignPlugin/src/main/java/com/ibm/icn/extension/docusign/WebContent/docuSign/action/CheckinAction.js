/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/declare",  "dojo/_base/lang", "dojo/json", "ecm/model/Action",  "ecm/model/Request",  "../dialog/LoginDialog"],
	function(declare, lang, json, Action, Request, LoginDialog) {

	/**
	 * @name docuSign.action.CheckinAction
	 * @class Describes a user-executable action. Used to override the standard code for enabling/disabling
	 * menu actions.
	 * @augments ecm.model.Action
	 */
	return declare("docuSign.action.CheckinAction", [ Action ], {
	/** @lends docuSign.action.CheckinAction.prototype */
	
		performAction: function(repository, items, callback, teamspace, resultSet, parameterMap) 
		{
			this._checkInDocument(items[0]);
		},
		
		_checkInDocument: function (item, requestData) 
		{
			var self = this;
			var payLoadObject = {requestType: "Get", id: item.id};
			
			Request.postPluginService("DocuSignPlugin", "UpdateSignedDocumentService",  "application/json", {
				requestParams: {
					repositoryId : item.repository.id,
					serverType : item.repository.type,
					docId : item.docid,
					envelopeId: item.attributes.DSEnvelopeID,
					payLoad: json.stringify(payLoadObject)
				},
				requestCompleteCallback: function(response) {
					if (response.returncode == 0)
					{
						item.attributeDisplayValues.DSSignatureStatus = "Checkedin";
						item.attributes.DSSignatureStatus = 4;
						item.update(item);
					}
					else if (response.returncode == -1)
					{
						items = [];
						items.push(item);
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
						self._checkInDocument(items[0], data);
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
		
		/**
		 * Returns true if this action should be enabled for the given repository, list type, and items.
		 */
		isEnabled: function(repository, listType, items, teamspace, resultSet) 
		{
			var enabled = this.inherited(arguments);
			
			if(!items || items.length != 1){
				return false;
			};
			if(items[0].attributes && items[0].attributes.DSSignatureStatus == 3 && !items[0].locked) {
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
