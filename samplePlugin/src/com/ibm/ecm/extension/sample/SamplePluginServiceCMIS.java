/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import org.apache.chemistry.opencmis.client.api.Document;

import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

/**
 * This class contains CMIS specific logic for the sample plugin service. It demonstrates using the
 * PluginServiceCallbacks object to get connection information and invoke the CMIS API's.
 */
public class SamplePluginServiceCMIS {

	public static void writeCMItemProperties(HttpServletRequest request, JSONResponse jsonResponse, PluginServiceCallbacks callbacks, String repositoryId, String docId) throws Exception {
		Document document = callbacks.getCMISDocument(repositoryId, docId);
		String documentName = document.getName();
		int propertyCount = document.getProperties().size();
		jsonResponse.put("documentName", documentName);
		jsonResponse.put("propertyCount", propertyCount);
	}

}
