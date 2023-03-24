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
	"ecm/model/Request",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/_base/array",
	"ecm/widget/dialog/BaseDialog",
	"dojo/text!./templates/DocumentStatus.html"
],

function(declare, lang, connect, domClass, domStyle, web, Messages, Button, Request, dom, domConstruct, array, BaseDialog, template) {

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
			
			this._getCertificateButton = this.addButton("Download Certificate", "_downloadCertificate", false, false, "DOWNLOAD_CERTIFICATE");
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
			this._certificateUri = signStatus.certificateUri;
			
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