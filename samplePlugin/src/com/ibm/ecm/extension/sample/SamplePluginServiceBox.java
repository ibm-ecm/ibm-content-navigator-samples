/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import com.box.sdk.BoxAPIConnection;
import com.box.sdk.BoxFile;
import com.box.sdk.BoxFolder;
import com.box.sdk.BoxItem;
import com.box.sdk.BoxWebLink;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

/**
 * This class contains Box specific logic for the sample plugin service. It demonstrates using the PluginServiceCallbacks
 * object to get connection information and invoke the Box API's.
 */
public class SamplePluginServiceBox {

	public static void writeBoxItemProperties(HttpServletRequest request, JSONResponse jsonResponse, PluginServiceCallbacks callbacks, String repositoryId, String docId) throws Exception {
		String methodName = "writeBoxItemProperties";
		callbacks.getLogger().logEntry(SamplePluginService.class, methodName, request, "docId: " + docId);

		BoxAPIConnection connection = callbacks.getBoxConnection(repositoryId);
		BoxItem item = null;
		if (docId != null && docId.equals("/")) { // Get the root folder
			item = BoxFolder.getRootFolder(connection);
		} else if (docId != null) {
			// Determine if the item is a File or a Folder
			StringTokenizer docIdTok = new StringTokenizer(docId, ",");
			String type = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
			String boxId = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
			// The docId contains the version ID if it is a BoxFile, which you can use to
			// retrieve information about a specific version. The commented line below
			// demonstrates how to get the version ID from the doc ID string.
			//String versionId = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
			
			if (type != null && type.equalsIgnoreCase("weblink")) {
				item = new BoxWebLink(connection, boxId);
			} else if (type != null && type.equalsIgnoreCase("folder")) {
				item = new BoxFolder(connection, boxId);
			} else if (type != null) {
				item = new BoxFile(connection, boxId);
			}
		}
		
		// Retrieve the item.
		if (item != null) {
			BoxItem.Info info = item.getInfo();
			jsonResponse.put("documentName", info.getName());
		}
		
		callbacks.getLogger().logExit(SamplePluginService.class, methodName, request);
	}
}
