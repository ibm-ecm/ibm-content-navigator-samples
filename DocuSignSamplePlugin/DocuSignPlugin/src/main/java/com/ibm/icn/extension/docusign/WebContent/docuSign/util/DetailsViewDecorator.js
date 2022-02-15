/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/aspect",
	"dojo/dom-construct",
	"ecm/widget/listView/decorators/common",
	"ecm/widget/listView/decorators/DetailsViewDecorator"
], function(lang, declare, aspect, domConstruct, common, decorator) {
	
	lang.setObject("docuSign.util.DetailsViewDecorator.docuSignPluginStatusDecorator", function(data, rowId, rowIndex) {

		if (!rowId || !data || !rowIndex)
			return;
		
		var item = this.grid.row(rowId).item();
		var returnTag = common.multiStateIcon(item, this._states, true);
		
		// append signature status icon based on the sign status property value
		if (data && data.attributeDisplayValues.DSSignatureStatus == "Sent")
		{
			returnTag += '<img class="ecmStatusIcon ecmSignSentIcon" alt="Sent for signature" title="Sent for signature" src="' + this._blankGif + '" />';
			returnTag += '<div class="dijitHidden">Sent for signature</div>';
			
            return returnTag;
		}
		else if (data && data.attributeDisplayValues.DSSignatureStatus == "Completed")
		{
			returnTag += '<img class="ecmStatusIcon ecmSignDoneIcon" alt="Signature Completed" title="Signature Completed" src="' + this._blankGif + '" />';
			returnTag += '<div class="dijitHidden">Signature Completed</div>';
			
			return returnTag;
		}
		else if (data && data.attributeDisplayValues.DSSignatureStatus == "Checkedin")
		{
			returnTag += '<img class="ecmStatusIcon ecmSignCheckedinIcon" alt="Signature Completed and Checkedin" title="Signature Completed and Checkedin" src="' + this._blankGif + '" />';
			returnTag += '<div class="dijitHidden">Signature Completed and Checkedin</div>';
			
			return returnTag;
		}
		
	});

	lang.setObject("docuSign.util.DetailsViewDecorator.syncServiceDetailsDecorator", function() {
		return "<div></div>";
	});
	
	lang.setObject("docuSign.util.DetailsViewDecorator.syncServiceDetailsCellValue", function(gridData, storeData, cellWidget) {

		var rowId = cellWidget.cell.row.id;
		var item = this.grid.row(rowId).item();

		var stateIcons = "";
		if (item) {
			var itemToGetIcon = item;
			if (item.item) {
				itemToGetIcon = item.item;
			}
			var stateIconValue = common.multiStateIcon(itemToGetIcon, this._states, true);
			if (itemToGetIcon instanceof ecm.model.Teamspace && itemToGetIcon.state == "offline") {
				//stateIconValue = common.stateIcon(itemToGetIcon);
				stateIconValue = common.multiStateIcon(itemToGetIcon, [
					"offline"
				], true);
			}
			stateIcons = stateIconValue ? stateIconValue.toString() : null;
			if (!stateIcons || stateIcons == "&nbsp;")
				stateIcons = "";
			else
				stateIcons += "&nbsp;";
		}
		
		// append signature status icon based on the sign status property value
		if (item && item.attributeDisplayValues.DSSignatureStatus == "Sent")
		{
			stateIcons += '<img class="ecmStatusIcon ecmSignSentIcon" alt="Sent for signature" title="Sent for signature" src="' + this._blankGif + '" />';
			stateIcons += '<div class="dijitHidden">Sent for signature</div>';
			
            //return returnTag;
		}
		else if (item && item.attributeDisplayValues.DSSignatureStatus == "Completed")
		{
			stateIcons += '<img class="ecmStatusIcon ecmSignDoneIcon" alt="Signature Completed" title="Signature Completed" src="' + this._blankGif + '" />';
			stateIcons += '<div class="dijitHidden">Signature Completed</div>';
			
			//return returnTag;
		}
		else if (item && item.attributeDisplayValues.DSSignatureStatus == "Checkedin")
		{
			stateIcons += '<img class="ecmStatusIcon ecmSignCheckedinIcon" alt="Signature Completed and Checkedin" title="Signature Completed and Checkedin" src="' + this._blankGif + '" />';
			stateIcons += '<div class="dijitHidden">Signature Completed and Checkedin</div>';
			
			//return returnTag;
		}
		
		cellWidget.domNode.innerHTML = stateIcons;

		var className = "";
		var tooltip = ecm.messages.sync_favorite_sync_unavailable_hover;
		var onClickHandler = null;

		if (item.item) {
			item.syncEnabled = item.item.syncEnabled;
		}

		if (item && item.syncEnabled) {
			className = item.getStateClass("syncEnabled");
			tooltip = ecm.messages.sync_favorite_enable_hover;
			var itemToSync = item;
			if (item.item) {
				itemToSync = item.item;
			}
			onClickHandler = function(evt) {
				Desktop.syncServer.disableSyncForItems([
					itemToSync
				]);
				item.syncEnabled = false;
			};
		}

		var imgParams = {
			src: require.toUrl("dojo/resources/blank.gif"),
			"class": className,
			alt: tooltip,
			title: tooltip
		};

		if (lang.isFunction(onClickHandler)) {
			imgParams.onclick = onClickHandler;
		}

		var syncImg = domConstruct.create("img", imgParams);
		domConstruct.place(syncImg, cellWidget.domNode, "last");
		
	});
});