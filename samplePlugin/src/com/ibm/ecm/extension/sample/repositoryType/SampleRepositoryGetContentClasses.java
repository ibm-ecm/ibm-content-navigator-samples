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
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;
import com.ibm.ecm.extension.sample.repositoryType.model.ContentClass;
import com.ibm.ecm.json.JSONContentClassesResponse;
import com.ibm.ecm.json.JSONPrivilegesResponse;

public class SampleRepositoryGetContentClasses {
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONContentClassesResponse jsonResponse = new JSONContentClassesResponse();
		
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);
		
		ContentClass[] contentClasses = connection.getContentClasses();
		for (ContentClass contentClass : contentClasses) {
			jsonResponse.addContentClassDefinition(contentClass.getId(), contentClass.getName(), null, false);
		}
		
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
}
