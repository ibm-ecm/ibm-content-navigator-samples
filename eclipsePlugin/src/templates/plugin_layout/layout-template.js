define([
		"dojo/_base/declare",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dijit/layout/StackContainer",
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
		"ecm/widget/layout/BaseLayout",
		"ecm/widget/Banner",
		"ecm/widget/LoginPane",
		"dojo/text!./templates/${ClassName}.html"
	],
	function(declare, _TemplatedMixin, _WidgetsInTemplateMixin, StackContainer, BorderContainer, ContentPane, BaseLayout, Banner, LoginPane, template) {

	/**
	 * @name ${DojoModuleName}.${ClassName}
	 * @class  
	 * @augments ecm.widget.layout.BaseLayout, dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin
	 */
	return declare("${DojoModuleName}.${ClassName}", [ BaseLayout, _TemplatedMixin, _WidgetsInTemplateMixin ], {
	/** @lends ${DojoModuleName}.${ClassName}.prototype */

		templateString: template,

		// Set this to true if your widget contains other widgets
		widgetsInTemplate: true,
		
		/**
		 * Add your custom layout code here.
		 */
		
	});
});
