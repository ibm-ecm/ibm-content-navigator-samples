/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare", 
	"dojo/dom-class",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/form/Button",
	"ecm/widget/ValidationTextBox",
	"dojo/text!./templates/SamplePropertyEditor.html"
],
function(declare, domClass, _WidgetsInTemplateMixin, Button, ValidationTextBox, template) { 
	/**
	 * @name samplePlugin.SamplePropertyEditor
	 * @class Provides a sample widget customization for the textbox property editor used for DocumentTitle and USER_ID fields
	 * in the {@link ecm.widget.CommonPropertiesPane}. This extension adds a button that calls back to a custom plugin service
	 * which sets the value.
	 * @augments ValidationTextBox
	 */
	return declare("samplePlugin.SamplePropertyEditor", [
	   ValidationTextBox,
	   _WidgetsInTemplateMixin
	], {
		/** @lends samplePlugin.SamplePropertyEditor.prototype */

		templateString: template,
		widgetsInTemplate: true,
		
		postCreate: function() {
			this.inherited(arguments);
			
			this.set("readOnly", true);
			// Remove the base class from the domNode
			domClass.remove(this.domNode, this.baseClass);
			domClass.add(this.domNode, "samplePropertyEditor");
		},
		
		_buttonClick: function(evt) {
			// Add custom lookup service call here.
			this.set("value", "user1");
		}
	});
});
