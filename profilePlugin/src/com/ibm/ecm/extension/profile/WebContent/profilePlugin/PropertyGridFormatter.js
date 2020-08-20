/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",  
	"dijit/_TemplatedMixin",  
	"dijit/_Widget",           
	"ecm/LoggerMixin", 
	"profilePlugin/PersonCardDecorator"
],
function(declare,   
_TemplatedMixin,  
_Widget,         
LoggerMixin, 
PersonCardDecorator) { 

	/**
	 * @name profilePlugin.PropertyGridFormatter
	 * @class
	 * @augments profilePlugin.PropertyGridFormatter
	 */
	return declare("profilePlugin.PropertyGridFormatter", [
		_Widget,
		_TemplatedMixin,
		LoggerMixin
	], {
		/** @lends profilePlugin.PropertyGridFormatter.prototype */

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
			this.logEntry("postCreate");
			this.inherited(arguments);
			this.load();
			this.logExit("postCreate");
		},
		
		/**
		 * Handles cleanup for the widget.
		 */
		destroy: function() {
			this.inherited(arguments);
			
			if (this.objectsToDestroy) {
				for ( var i in this.objectsToDestroy) {
					this.objectsToDestroy[i].destroy();
				}
				this.objectsToDestroy = null;
			}
		},
		
		/**
		 * @private
		 */
		load: function() {
			if (this.item && this.propertyName && this.data) {
				var node = profilePlugin._getValueNode(this.data, this, this.propertyName, this.item);
				this.domNode.appendChild(node);
			}
		}
	});
});
