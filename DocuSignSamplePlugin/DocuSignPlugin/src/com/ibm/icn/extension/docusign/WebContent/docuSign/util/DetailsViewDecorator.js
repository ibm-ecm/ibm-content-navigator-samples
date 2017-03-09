/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/aspect",
	"ecm/widget/listView/decorators/common",
	"ecm/widget/listView/decorators/DetailsViewDecorator"
], function(lang, declare, aspect, common, decorator) {
	
	lang.setObject("docuSign.util.DetailsViewDecorator.docuSignPluginStatusDecorator", function(data, rowId, rowIndex) {

		var item = this.grid.row(rowId).item();
		var returnTag = common.multiStateIcon(item, this._states, true);
		
		if (data && data.attributeDisplayValues.DSSignatureStatus == "Sent")
		{
			returnTag += '<img class="ecmStatusIcon ecmSignSentIcon" alt="Sent for signature" title="Sent for signature" src="' + this._blankGif + '" />';
			returnTag += '<div class="dijitHidden">Multi Filed In Document</div>';
			
            return returnTag;
		}
		else if (data && data.attributeDisplayValues.DSSignatureStatus == "Completed")
		{
			returnTag += '<img class="ecmStatusIcon ecmSignDoneIcon" alt="Signature Completed" title="Signature Completed" src="' + this._blankGif + '" />';
			returnTag += '<div class="dijitHidden">Multi Filed In Document</div>';
			
			return returnTag;
		}
		else if (data && data.attributeDisplayValues.DSSignatureStatus == "Checkedin")
		{
			returnTag += '<img class="ecmStatusIcon ecmSignCheckedinIcon" alt="Signature Completed and Checkedin" title="Signature Completed and Checkedin" src="' + this._blankGif + '" />';
			returnTag += '<div class="dijitHidden">Multi Filed In Document</div>';
			
			return returnTag;
		}
		
	});
});