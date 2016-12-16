/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/lang",
	"dojo/_base/declare"
], function(lang, declare) {

	var Utils = declare("docuSign.util.DetailsViewDecorator", [], {
		
		docuSignPluginStatusDecorator: function(data, rowId, rowIndex) {
			var item = this.grid.row(rowId).item();
			if (data) {
				var statusText = "";
				var styleText = "";
				var altText = "";
				
				if(data == "Sent"){
					statusText = "&#x1F558;";
					styleText = "font-size: medium;";
					altText = "Waiting for others to sign";
				}
				else if (data == "Completed"){
					statusText = "&#x2713;";
					styleText = "color: #82b74e;font-size: large;";
					altText = "Digitally signed";
				}
				
				return '<span class="statusIcon" style="' + styleText + '" title="' + altText + '" >' + statusText + '</span>';
			} else {
				
				return "";
			}
		}
	});
	
	docuSign.util.DetailsViewDecorator = new Utils();
    return docuSign.util.DetailsViewDecorator;
});
