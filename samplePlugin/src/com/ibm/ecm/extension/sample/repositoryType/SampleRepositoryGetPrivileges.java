/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONPrivilegesResponse;

public class SampleRepositoryGetPrivileges {
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONPrivilegesResponse jsonResponse = new JSONPrivilegesResponse();
		
		// In this sample we'll use the defaults for privileges.   To change the defaults, use the methods on JSONPrivilegesResponse.
		
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
}
