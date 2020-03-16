/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/has",
	"dojo/dom-class",
	"idx/form/TextBox",
	"pvr/widget/editors/mixins/_EditorMixin",
	"pvr/widget/editors/mixins/_TextMixin"
], function(declare, has, domClass, TextBox, _EditorMixin, _TextMixin) {

	var defaultPattern = ".*";

	/**
	 * @name samplePluginDojo.SampleTextBoxEditor
	 * @class Provides a custom sample text box editor widget for editing properties of type "string".
	 * @augments idx.form.TextBox, pvr.widget.editors.mixins._EditorMixin, pvr.widget.editors.mixins._TextMixin,
	 */
	return declare("samplePluginDojo.SampleTextBoxEditor", [
		TextBox,
		_EditorMixin,
		_TextMixin
	], {
		/** @lends samplePluginDojo.SampleTextBoxEditor.prototype */

		instantValidate: true,

		selectOnClick: true,

		/** 
		 * Apply extra custom css class for additional styling of the sample control
		 */
		editorClass: "pvrTextBoxEditor ecmSampleTextBoxEditor",

		textDir: has("text-direction"),

		_setPatternAttr: function(pattern) {
			this.inherited(arguments, [
				pattern || defaultPattern
			]);

			try {
				// validate pattern
				this.isValid();
			} catch (e) {
				// invalid pattern, reset to default pattern.
				this.inherited(arguments, [
					defaultPattern
				]);
			}
		},
	
		/**
		 * Overload to incorporate a test for the custom error setting.
		 * 
		 * @param isFocused
		 *            Indicates whether the editor currently has focus.
		 * @returns true if valid.
		 */
		isValid: function(isFocused) {
			var valid = this.inherited(arguments);
			
			// You can get a hold of your custom controller like this. 
			var controller = this.property.controller;

			// You can get a hold of the new attributes added by the sample object 
			// controller and dereference their value like the following:
			var repositoryFromAttr = controller.getAttribute("repository").get("value");

			// If you have added your data as new Attributes to your controller, they
			// can be accessed directly as properties on your editor like the following:
			var repository = this.repository;
			var repoType = this.repositoryType;
			if (repository && repository.type != repoType) {
				valid = false;
			}
			return valid;
		},

	});

});
