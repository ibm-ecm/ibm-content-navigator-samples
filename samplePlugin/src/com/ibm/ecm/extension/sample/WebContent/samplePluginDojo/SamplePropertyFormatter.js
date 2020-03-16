/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",  
	"dijit/_TemplatedMixin",  
	"dijit/_Widget"
],
function(declare, _TemplatedMixin, _Widget) { 
	/**
	 * @name samplePlugin.SamplePropertyFormatter
	 * @class Provides a sample widget customization for the property grids used to display property values. The
	 * extension looks for email addresses and enables them as "mailto" links.
	 * @augments _Widget, _TemplatedMixin
	 */
	return declare("samplePlugin.SamplePropertyFormatter", [
		_Widget,
		_TemplatedMixin
	], {
		/** @lends samplePlugin.SamplePropertyFormatter.prototype */

		templateString: "<div></div>",
		
		/**
		 * The {@link ecm.model.ContentItem} object being rendered.
		 */
		item: null,
		
		/**
		 * Name of the property being displayed.
		 */
		propertyName: null,
		
		/**
		 * String value being rendered in the property grid.
		 */
		data: null,
		
		postCreate: function() {
			var propertyValue = null;
			
			// retrieve the property value
			if (this.data && this.propertyName) {
				propertyValue = this.data[this.propertyName];
			}
			
			// is the property value an e-mail address?
			if (propertyValue && propertyValue.indexOf("@") > 0) {
				this.domNode.innerHTML = "<a href=\"mailto:" + propertyValue + "\">" + propertyValue + "</a>";
			} else {
				this.domNode.innerHTML = propertyValue;
			}
		}
	});
});
