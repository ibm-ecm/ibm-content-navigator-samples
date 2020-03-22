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
import com.ibm.ecm.extension.sample.repositoryType.model.AttributeDefinition;
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;
import com.ibm.ecm.extension.sample.repositoryType.model.ContentClass;
import com.ibm.ecm.json.JSONClassDefinitionResponse;

public class SampleRepositoryOpenContentClass {

	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);

		String contentClassId = request.getParameter("template_name"); // id of the content class
		ContentClass contentClass = connection.getContentClass(contentClassId);
		JSONClassDefinitionResponse jsonResponse = new JSONClassDefinitionResponse();
		AttributeDefinition[] attributeDefinitions = contentClass.getAttributeDefinitions();
		for (int i = 0; i < attributeDefinitions.length; i++) {
			AttributeDefinition ad = attributeDefinitions[i];
			jsonResponse.addAttributeDefinition(ad.getId(), ad.getName(), ad.getType(), false, false, ad.isSystem(), null, null, null, 0);
		}
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
	
}
