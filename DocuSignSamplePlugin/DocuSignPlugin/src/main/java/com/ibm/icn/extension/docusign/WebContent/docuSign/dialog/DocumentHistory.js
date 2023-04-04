/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/sniff",
	"dojo/data/ItemFileWriteStore",
	"dojo/json",
	"ecm/widget/grid/DataGrid",
	"dojo/_base/connect",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojox/validate/web",
	"ecm/Messages",
	"ecm/widget/Button",
	"ecm/model/Request",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/_base/array",
	"ecm/widget/dialog/BaseDialog",
	"dojo/text!./templates/DocumentHistory.html"
],

function(declare, lang, has, ItemFileWriteStore, dojoJson, DataGrid, connect, domClass, domStyle, web, Messages, Button, Request, dom, domConstruct, array, BaseDialog, template) {

	return declare("docuSign.dialog.DocumentHistory", [
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
			this.textDir = has("text-direction");
			this.setMaximized(true);
			domClass.add(this.domNode, "ecmManageProcessRolesDialog");
			
			//set title and into text
			this.setTitle("Document Signature History");
			this.setIntroText("History of the document signature.");

			
			this._saveButton =  this.addButton("Download Certificate", "_downloadCertificate", false, false, "DOWNLOAD_CERTIFICATE");
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
			this._certificateUri = signStatus.certificateUri;
			this.setAuditEvents(signStatus.auditEvents);
		},
		
		setAuditEvents: function(auditEvents) {
			if (this.auditEventsGrid) {
				this.auditEventsGrid.destroy();
			}
			var data = this._getStoreData(auditEvents);
			this._auditEventsStore = new ItemFileWriteStore({
				data: data
			});
				
			var layout = [
				{
					field: "time",
					name: "Time",
					width: "20%",
				},
				{
					field: "user",
					name: "User",
					width: "20%"
				},
				{
					field: "action",
					name: "Action",
					width: "20%"
				},
				{
					field: "activity",
					name: "Activity",
					width: "20%"
				},
				{
					field: "status",
					name: "Status",
					width: "20%"
				}
			];

			this.auditEventsGrid = new DataGrid({
				structure: layout,
				//selectionMode: "extended",
				canSort: function() {
					return false;
				},
				//textDir: this.textDir,
				store: this._auditEventsStore
				
			});
			domClass.add(this.auditEventsGrid.domNode, "compact gridxWholeRow");
			this._auditEventsContainer.addChild(this.auditEventsGrid);
			
			this.auditEventsGrid.startup();
		},
		
		_getStoreData: function(auditEvents){
			var data = {
				items: []
			};
			var events = dojoJson.parse(auditEvents).auditEvents;
			if (events && events.length) {
				for ( var i = 0; i < events.length; i++) {
					var time = "";
					var user = "";
					var language = ""
					var action = "";
					var activity = "";
					var status = "";
					for ( var j = 0; j < events[i].eventFields.length; j++) {
						if(events[i].eventFields[j].name == "logTime")
							time = ecm.model.desktop.valueFormatter.formatValue(events[i].eventFields[j].value, "xs:timestamp", null);
						else if(events[i].eventFields[j].name == "UserName")
							user = events[i].eventFields[j].value;
						else if(events[i].eventFields[j].name == "Language")
							language = events[i].eventFields[j].value;
						else if(events[i].eventFields[j].name == "Action")
							action = events[i].eventFields[j].value;
						else if(events[i].eventFields[j].name == "Message")
							activity = events[i].eventFields[j].value;
						else if(events[i].eventFields[j].name == "EnvelopeStatus")
							status = events[i].eventFields[j].value;
							
					}
					var item = {
							time: time,
							user: user + "(" + language + ")",
							action: action,
							activity: activity,
							status: status
					};
					data.items.push(item);
				}
			}

			return data;
		},

		_downloadCertificate: function () 
		{
			this.logEntry("_downloadCertificate");
			var params = {};
			params.certificateUri = encodeURIComponent(this._certificateUri);
			params["plugin"] = "DocuSignPlugin";
			params["action"] = "DownloadCertificateService";
			Request.setSecurityToken(params);
			this.downloadForm = this._createDownloadForm();
			if(this.downloadForm) {
				var requestUrl = Request.getServiceRequestUrl("plugin", "", params);
				var inputs = []; // temporary input elements for additional parameters
		
				if (Request.enableSecureService && Request._security_token) {
					inputs.push(domConstruct.create("input", {
						type: "hidden",
						name: "security_token",
						value: Request._security_token
					}, this.downloadForm));
				}
				inputs.push(domConstruct.create("input", {
									type: "hidden",
									name:  "certificateUri",
									value: params.certificateUri
								}, this.downloadForm));
	
				
				var request = new Request({
					requestMethod: "GET",
					requestUrl: requestUrl,
					requestHeaders: {
						"Cache-Control": "no-cache"
					},
					synchronous: true,
				});
				try{
					request.dojoIOIFrameDownload(this.downloadForm);
				} finally {
					// clean up temporary input elements
					array.forEach(inputs, domConstruct.destroy);
				}
			} 
			this.logExit("_downloadCertificate");
		},
		
		_createDownloadForm: function() {
			// Create form for passing download parameter values to get around the 2K URL length limitation for IE
			var downloadForm = dom.byId("documentDownloadForm");
			if (downloadForm) {
				document.body.removeChild(downloadForm);
			}
			downloadForm = document.createElement("form");
			downloadForm.setAttribute("id", "documentDownloadForm");
			downloadForm.setAttribute("name", "documentDownloadForm");
			downloadForm.setAttribute("method", "post");
			downloadForm.setAttribute("accept-charset", "UTF-8");
			document.body.appendChild(downloadForm);
			return downloadForm;
		},
		
		resize: function() {
			this.inherited(arguments);
		}

	});
});