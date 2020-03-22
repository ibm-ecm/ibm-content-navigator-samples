/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginODAuthenticationService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONObject;

/**
 * This class defines an OD authentication service.
 */
public class SamplePluginODAuthenticationService extends PluginODAuthenticationService {

	public String getId() {
		return "samplePluginODAuthenticationService";
	}

	public byte[] execute(PluginServiceCallbacks callbacks, HttpServletRequest request) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);

		// This is just a sample to verify information is correctly passed to the Content Manager OnDemand server
		// when SSO is enabled. It is up to your custom authentication service and your Content Manager OnDemand
		// server exit to provide actual user validation.
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("repositoryId", callbacks.getRepositoryId());

		callbacks.getLogger().logExit(this, methodName, request);
		return jsonObj.toString().getBytes("UTF-8");
	}

}
