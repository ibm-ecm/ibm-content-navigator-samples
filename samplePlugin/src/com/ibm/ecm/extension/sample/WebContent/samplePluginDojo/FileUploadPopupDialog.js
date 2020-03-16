/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ecm/model/Request",
	"ecm/widget/dialog/BaseDialog",
	"dojo/text!./templates/FileUploadPopupDialog.html"
	],
	function (declare, lang, Request, BaseDialog, template) {
	
	/**
	 * @name samplePluginDojo.FileUploadPopupDialog
	 * @class
	 * @augments ecm.widget.dialog.BaseDialog
	 */
	return declare("samplePluginDojo.FileUploadPopupDialog", [ BaseDialog ], {
	/** @lends samplePluginDojo.FileUploadPopupDialog.prototype */

		//needed to load from template
		contentString: template,
		widgetsInTemplate: true,
		
		//limit uploads to 1MB
		_maxFileSize: 1048576,
		
		_items: null,
		_repository: null,
		
		postCreate: function() {
			this.inherited(arguments);
			this.setResizable(true);
			this.setMaximized(false);
			this.setTitle("Custom Upload");
			this.setIntroText("Choose a file with which to replace the existing document content.");
			this._addButton = this.addButton("Add", "onAdd", true, true);
		},
		
		show: function(repository, items) {
			this._items = items;
			this._repository = repository;
			this._addButton.set("disabled",true);
			this.inherited("show", []);
		},
			
		isValid: function() {
			var valid = this._fileInput;
			// This test works for both HTML5 and non-HTML5 browsers. 
			valid = valid && (this._fileInput.value) && (this._fileInput.value.length > 0);
			return valid;
		},
		
		onFileInputChange: function() {
			this._addButton.set("disabled",(this.isValid() ? false : true));
		},
		
		onAdd: function() {
			var item = this._items[0];
			
			var reqParams = {
				desktop: ecm.model.desktop.id,
				serverType: this._repository.type,
				repositoryId: this._repository.id,
				docid: item.id,
				doc_name_attribute: item.getContentClass().nameAttribute,
				template_name: item.getContentClass().id,
			};

			var callback = lang.hitch(this, this._onAddCompleted);
			
			// HTML5 browser
			if (this._fileInput.files) {
				var file = this._fileInput.files[0];
				reqParams.mimetype = file.type;
				reqParams.parm_part_filename = (file.fileName ? file.fileName : file.name)

				var form = new FormData();
				form.append("file", file);
				
				Request.postFormToPluginService("SamplePlugin", "samplePluginFileUploadService", form, {
					requestParams: reqParams,
					requestCompleteCallback: callback
				});	
			} else { // Non-HTML5 browser
				var fileName = this._fileInput.value;
				if (fileName && fileName.length > 0) {
					var i = fileName.lastIndexOf("\\");
					if (i != -1) {
						fileName = fileName.substr(i + 1);
					}
				}
				reqParams.parm_part_filename = fileName;
				
				// MIME type is not available, must be determined at the server.

				reqParams.plugin = "SamplePlugin";
				reqParams.action = "samplePluginFileUploadService";
				
				Request.ieFileUploadServiceAPI("plugin", "", {requestParams: reqParams, 
					requestCompleteCallback: callback
				}, this._fileInputForm);
			}
		},
		
		_onAddCompleted: function(response) {
			if (response.fieldErrors) {
				console.dir(response.fieldErrors);
			} else if (this._items && this._items.length > 0 && response && response.mimetype) {
				lang.mixin(this._items[0], response);
				this._items[0].refresh();
			}
			this.hide();
		}
	});
});
