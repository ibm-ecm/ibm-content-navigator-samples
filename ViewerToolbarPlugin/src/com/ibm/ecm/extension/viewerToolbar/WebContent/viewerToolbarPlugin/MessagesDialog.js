/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2018 All Rights Reserved.
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
		"ecm/widget/dialog/BaseDialog",
		"dojo/text!./templates/MessagesDialog.html"
	],
	function(declare, BaseDialog, template) {

	/**
	 * @name ViewerToolbarPlugin.MessagesDialog
	 * @class Provides a dialog to display a messages.  Invoking addMessage will append a new message line
	 * to those already appearing in the dialog.
	 * @augments ecm.widget.dialog.BaseDialog
	 */
	return declare("ViewerToolbarPlugin.MessagesDialog", [ BaseDialog ], {
	/** @lends ViewerToolbarPlugin.MessagesDialog.prototype */
	
		contentString: template,
		widgetsInTemplate: true,
	
		postCreate: function() {
			this.inherited(arguments);
			this.setResizable(true);
			this.setMaximized(false);
			this.setTitle("Messages");
			this.addButton("Clear", "clearMessages", false, true);
		},
		
		addMessage: function(message) {
			this.clearMessages();
			
			if (typeof message == "string") {
				this.messagesTextarea.value += message + "\n";
			} else {
				this.messagesTextarea.value += message.text + "\n";
			}
			this.show();
		},
	
		clearMessages: function(evt) {
			this.messagesTextarea.value = "";
		}
	});
});
