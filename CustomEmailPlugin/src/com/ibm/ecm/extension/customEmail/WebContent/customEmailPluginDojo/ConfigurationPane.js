/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2020  All Rights Reserved.
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
    "dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/HoverHelp",
	"ecm/widget/TextBox",
	"ecm/widget/SimpleTextarea",
	"ecm/widget/admin/PluginConfigurationPane",
	"dojo/text!./templates/ConfigurationPane.html",
	"./Messages"
], function(lang, declare, _TemplatedMixin, _WidgetsInTemplateMixin, HoverHelp, TextBox, SimpleTextarea, PluginConfigurationPane, template, Messages) {
    return declare("customEmailPluginDojo.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {

        templateString: template,
        widgetsInTemplate: true,
        messages: Messages,

        load: function(callback) {
            if (this.configurationString) {
                var config = eval("(" + this.configurationString + ")");
                //set text boxes with stored data
                this.subjectTextBox.set("value", config.subject || null);
                this.messageTextArea.set("value", config.message || null);
            }
        },

        _onFieldChange: function() {
            this.configurationString = JSON.stringify({
                subject: this.subjectTextBox.get("value"),
                message: this.messageTextArea.get("value")
            });

            this.onSaveNeeded(true);
        }
    });
});