/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */
 
define([
	"dojo/_base/declare",
	"ecm/widget/layout/_LaunchBarPane",
	"dojo/text!./templates/AngularTestFeature.html"
],
function(declare,
		_LaunchBarPane,
		template) {
	/**
	 * @name angularSamplePluginDojo.AngularTestFeature
	 * @class 
	 * @augments ecm.widget.layout._LaunchBarPane
	 */
	return declare("angularSamplePluginDojo.AngularTestFeature", [
		_LaunchBarPane
	], {
		/** @lends angularSamplePluginDojo.AngularTestFeature.prototype */

		templateString: template,
		
		// Set to true if widget template contains DOJO widgets.
		widgetsInTemplate: false,

		postCreate: function() {
			this.logEntry("postCreate");
			this.inherited(arguments);
			
			System.import('app').catch(function(err){ console.error(err); });
			
			this.logExit("postCreate");
		},
		
		/**
		 * Optional method that sets additional parameters when the user clicks on the launch button associated with 
		 * this feature.
		 */
		setParams: function(params) {
			this.logEntry("setParams", params);
			
			if (params && !this.isLoaded && this.selected) {
				this.loadContent();
			}
			
			this.logExit("setParams");
		},

		/**
		 * Loads the content of the pane. This is a required method to insert a pane into the LaunchBarContainer.
		 */
		loadContent: function() {
			this.logEntry("loadContent");
			
			if (!this.isLoaded) {
				/**
				 * Add custom load logic here. The LaunchBarContainer widget will call this method when the user
				 * clicks on the launch button associated with this feature.
				 */
				this.isLoaded = true;
				this.needReset = false;
			}
			
			this.logExit("loadContent");
		},

		/**
		 * Resets the content of this pane.
		 */
		reset: function() {
			this.logEntry("reset");
			
			/**
			 * This is an option method that allows you to force the LaunchBarContainer to reset when the user
			 * clicks on the launch button associated with this feature.
			 */
			this.needReset = false;
			
			this.logExit("reset");
		}
	});
});
