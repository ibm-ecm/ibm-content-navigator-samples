/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.edms.od.ODFolder;
import com.ibm.edms.od.ODHit;
import com.ibm.edms.od.ODServer;

/**
 * This class contains OD specific logic for the sample plugin service. It demonstrates using the PluginServiceCallbacks
 * object to get connection information and invoke the ODWEK API's.
 */
public class SamplePluginServiceOD {

	public static void writeODHitProperties(HttpServletRequest request, JSONResponse jsonResponse, PluginServiceCallbacks callbacks, String repositoryId, String folderName, String docId) throws Exception {
		synchronized(callbacks.getSynchObject(repositoryId, "od")) {
			ODServer server = callbacks.getODServer(repositoryId);
			ODFolder folder = null;
			try {
				folder = server.openFolder(folderName);
				ODHit hit = folder.recreateHit(docId);
				String applicationName = hit.getProperties().getApplicationName();
				String applicationGroupName = hit.getProperties().getApplicationGroupName();
				String documentName = hit.getDocumentName();
				long documentLength = hit.getProperties().getLength();
				jsonResponse.put("documentName", documentName);
				jsonResponse.put("applicationName", applicationName);
				jsonResponse.put("applicationGroupName", applicationGroupName);
				jsonResponse.put("documentLength", documentLength);
			} finally {
				// Note: It is important to close the folder in all situations or memory leaks will occur.
				if (folder != null) {
					folder.close();
				}
			}
		}
	}

}
