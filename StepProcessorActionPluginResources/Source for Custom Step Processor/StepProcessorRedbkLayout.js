/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2012, 2013 All Rights Reserved.
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
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/aspect",
	"ecm/LoggerMixin",
	"ecm/widget/process/_ProcessorMixin",
	"ecm/widget/process/StepProcessorLayout",
	"dojo/text!./templates/StepProcessorRedbkLayout.html"
], function(declare, lang, connect, aspect, LoggerMixin, _ProcessorMixin, StepProcessorLayout, template) {
	/**
	 * @name ecm.custom.widget.process.StepProcessorRedbkLayout
	 * @class Provides a custom layout for step processors.
	 * @augments ecm.custom.widget.process.StepProcessorLayout
	 */
	return declare("ecm.custom.widget.process.StepProcessorRedbkLayout", [
		StepProcessorLayout
	], {
		/** @lends ecm.custom.widget.process.StepProcessorRedbkLayout.prototype */

		// widgetsInTemplate: Boolean
		// 		Set this to true if your widget contains other widgets
		widgetsInTemplate: true,
		contentString: template,

		contentContainer: null,
		contentViewer: null,

		// postCreate() is called to override the superclass.
		postCreate: function() {
			this.logEntry("postCreate-custom");
			this.inherited(arguments);
			this.logExit("postCreate-custom");
		},

		// startup() is called to create the create and place the Content 
		// Viewer instance, resize the Content Viewer layout and override 
		// the default Viewer toolbar text.
		startup: function() {
			this.logEntry("startup-custom");
			this.inherited(arguments);

			// if an instance of the Content Viewer doesn't exist then create one 
			if (this.contentViewer == null) {
				this.own(aspect.after(ecm.model.desktop, "onDesktopLoaded", lang.hitch(this, function() {
					var bidiDir = "ltr"; // left-to-right for English locale as default.
					var language = dojo.locale;
					if ((language.indexOf("ar") === 0) || (language.indexOf("he") === 0) || (language.indexOf("iw") === 0)) {
						bidiDir = "rtl"; // Use right-to-left for Arabic locale.
					}
	
					dojo['require']("ecm.widget.viewer.ContentViewer");
	
					var tabStyle = "margin: 0px; padding: 0px; width: 100%; height: 100%;";
	
					// create an instance of the Content Viewer	
					this.logDebug("startup-custom", "instantiate CV");
					this.contentViewer = new ecm.widget.viewer.ContentViewer({
						style: tabStyle,
						isEntireWindow: false,
						dir: bidiDir,
						lang: language
					});
	
					// place the Content Viewer on the step processor page 
					this.logDebug("startup-custom", "place CV in the step processor page");
					this.contentContainer = dojo.byId("contentViewer");
					this.contentContainer.appendChild(this.contentViewer.domNode);
	
					// resize the Content Viewer layout
					this.logDebug("startup-custom", "resizing the CV layout");
					this.contentViewer.startup();
	
					// set the text on the Content Viewer toolbar
					this.logDebug("startup-custom", "set the text on the CV toolbar");
					this.contentViewer.viewerToolbarText.innerHTML = "Viewer";
	
					// detect splitter movement and resize container
					this.connect(this.stepContentPane._splitterWidget.domNode, "onmouseup", function() {
						if (this.contentViewer != null) {
							this.contentViewer._winResizeEnd();
						}
					});
				})));
			}

			this.logExit("startup-custom");
		},

	});
});
