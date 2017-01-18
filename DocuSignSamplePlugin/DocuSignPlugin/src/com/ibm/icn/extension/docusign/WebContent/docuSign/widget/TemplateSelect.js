/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dijit/form/Select",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetBase",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/TemplateSelect.html"
],

function(declare, Select, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, template) {

	return declare("docuSign.widget.TemplateSelect", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		
		templateString: template,
		
		 postMixInProperties: function() {
	        this.inherited(arguments);
	        
	        this.templateSelectLabel = "Template: ";
	    }
	});
});
