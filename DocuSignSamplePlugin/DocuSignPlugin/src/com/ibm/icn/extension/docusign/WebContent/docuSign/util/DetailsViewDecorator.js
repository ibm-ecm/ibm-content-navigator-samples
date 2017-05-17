/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/lang",
	"dojo/_base/declare"
], function(lang, declare) {

	var Utils = declare("docuSign.util.DetailsViewDecorator", [], {
		
		docuSignPluginStatusDecorator: function(data, rowId, rowIndex) 
		{	
			var returnTag = "";
			var item = this.grid.row(rowId).item();
			
			if (data) 
			{
				if(data == "Sent"){
					returnTag = '<img class="ecmStatusIcon ecmSignSentIcon" alt="Sent for signature" title="Sent for signature" src="' + this._blankGif + '" />';
					returnTag += '<div class="dijitHidden">Sent for signature</div>';
					
					return returnTag;
				}
				else if (data == "Completed"){
					returnTag = '<img class="ecmStatusIcon ecmSignDoneIcon" alt="Signature Completed" title="Signature Completed" src="' + this._blankGif + '" />';
					returnTag += '<div class="dijitHidden">Signature Completed</div>';
					
					return returnTag;
				}
				else if (data == "Checkedin")
				{
					returnTag = '<img class="ecmStatusIcon ecmSignCheckedinIcon" alt="Signature Completed and Checkedin" title="Signature Completed and Checkedin" src="' + this._blankGif + '" />';
					returnTag += '<div class="dijitHidden">Signature Completed and Checkedin</div>';
					
					return returnTag;
				}
			}
			else 
			{
				return "";
			}
		}
	});
	
	docuSign.util.DetailsViewDecorator = new Utils();
    return docuSign.util.DetailsViewDecorator;
});
