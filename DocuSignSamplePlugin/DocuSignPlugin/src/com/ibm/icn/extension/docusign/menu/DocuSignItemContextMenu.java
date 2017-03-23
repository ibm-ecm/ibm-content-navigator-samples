/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.icn.extension.docusign.menu;

import java.util.Locale;

import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginMenuItem;

public class DocuSignItemContextMenu extends PluginMenu {

	@Override
	public String getId() {
		return "DocuSignItemContextMenu";
	}

	@Override
	public String getName(Locale locale) {
		return "Menu for DocuSign document ItemContextMenu";
	}

	@Override
	public String getMenuType() {
		return "ItemContextMenu";
	}

	@Override
	public PluginMenuItem[] getMenuItems() {
		
		String[] downloadActionIds = new String[] {"DownloadAsOriginal","DownloadAsPdf","DownloadAll","DownloadAllAsPdf"};//],"labelId":"DefaultDownload"}
		String[] checkoutActionIds = new String[] {"CheckOutDownload", "CheckOutNoDownload"};
		String[] boxActionIds = new String[] {"Share","Unshare", "BoxCopy"};
		
		String[] linkActionIds = new String[] {"ShowHyperlink"};
		String[] emailActionIds = new String[] {"SendLinksToDocs","SendAttachments","SendAttachmentsAll","SendAsPDF","SendAllAsPDF"};
		String[] versionActionIds = new String[] {"PromoteVersion","DemoteVersion"};
		String[] folderActionIds = new String[] {"AddToFolder","CopyToFolder", "MoveDocumentToFolder", "RemoveFromFolder"};			
		String[] printActionIds = new String[] {"PrintDoc","PrintDocAll"};
		String[] workflowActionIds = new String[] {"Launch","StartWF", "TransferWorkflow", "ViewProcessInformation"};
		String[] holdsActionIds = new String[] {"ApplyHold", "RemoveHold"};
		
		return new PluginMenuItem[] { new PluginMenuItem("View"), new PluginMenuItem("Preview"), 
			new PluginMenuItem("Edit"), new PluginMenuItem("ViewChildDocuments"), 
			new PluginMenuItem("ViewAnnotation"), new PluginMenuItem("DefaultDownload", downloadActionIds), 
			new PluginMenuItem("AddToFavorites"), new PluginMenuItem("Export"),
			new PluginMenuItem("EnableSync"), new PluginMenuItem("DisableSync"), 
			new PluginMenuItem("DeleteItem"), new PluginMenuItem("Separator"),
			new PluginMenuItem("DefaultCheckOut", checkoutActionIds), new PluginMenuItem("CheckIn"), 
			new PluginMenuItem("Unlock"), new PluginMenuItem("Separator"),
			new PluginMenuItem("docuSign.action.SignSubmitAction"), new PluginMenuItem("docuSign.action.CheckinAction"), new PluginMenuItem("Separator"),
			new PluginMenuItem("DefaultBox", boxActionIds),
			new PluginMenuItem("DefaultLink", linkActionIds),
			new PluginMenuItem("DefaultSendEmail", emailActionIds),
			new PluginMenuItem("DefaultVersion", versionActionIds),
			new PluginMenuItem("DefaultFolderActions", folderActionIds),
			new PluginMenuItem("DefaultPrint", printActionIds),
			new PluginMenuItem("DefaultWorkflow", workflowActionIds),
			new PluginMenuItem("DefaultHolds", holdsActionIds)
		};
	}

	@Override
	public String getDescription(Locale locale) {
		return "This menu is displayed when the user right-clicks a document in the search results or list of repository contents.";
	}
}
