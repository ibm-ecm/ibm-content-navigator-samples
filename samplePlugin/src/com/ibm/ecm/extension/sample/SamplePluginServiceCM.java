/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.mm.sdk.common.DKDDO;
import com.ibm.mm.sdk.common.DKRetrieveOptionsICM;
import com.ibm.mm.sdk.server.DKDatastoreICM;

/**
 * This class contains CM specific logic for the sample plugin service. It demonstrates using the PluginServiceCallbacks
 * object to get connection information and invoke the CM API's.
 */
public class SamplePluginServiceCM {

	public static void writeCMItemProperties(HttpServletRequest request, JSONResponse jsonResponse, PluginServiceCallbacks callbacks, String repositoryId, String docId) throws Exception {
		String methodName = "writeCMItemProperties";

		synchronized(callbacks.getSynchObject(repositoryId, "cm")) {
			callbacks.getLogger().logEntry(SamplePluginService.class, methodName, request, "docId: " + docId);
	
			DKDatastoreICM datastore = callbacks.getCMDatastore(repositoryId);
			DKRetrieveOptionsICM dkRetrieveOptions = DKRetrieveOptionsICM.createInstance(datastore);
			dkRetrieveOptions.baseAttributes(true);
			dkRetrieveOptions.childListOneLevel(true);
			DKDDO ddo = datastore.createDDOFromPID(docId);
			ddo.retrieve(dkRetrieveOptions.dkNVPair());
			int propertyCount = ddo.propertyCount();
			jsonResponse.put("propertyCount", propertyCount);
	
			callbacks.getLogger().logExit(SamplePluginService.class, methodName, request, "property count: " + propertyCount);
		}
	}
}
