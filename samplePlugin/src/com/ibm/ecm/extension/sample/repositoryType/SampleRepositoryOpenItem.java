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
import com.ibm.ecm.extension.sample.repositoryType.model.ContentItem;
import com.ibm.ecm.json.JSONItemAttributesResponse;

public class SampleRepositoryOpenItem {

	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);

		String docid = request.getParameter("docid"); // id of the document
		ContentItem contentItem;
		if (docid.equals("/")) {
			contentItem = connection.getRootItem();
		} else  {
			contentItem = connection.getContentItem(docid);
		}
		JSONItemAttributesResponse jsonResponse = new JSONItemAttributesResponse();
		
		// Add the attribute values
		String[] attributeIds = contentItem.getAttributeIds();
		for (int i = 0; i < contentItem.getAttributeCount(); i++) {
			String attributeId = attributeIds[i];
			jsonResponse.addAttribute(attributeId, contentItem.getAttributeValue(attributeId));
		}
		
		// Add some system properties as well
		jsonResponse.addSystemProperty("id",contentItem.getId());
		
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
	
}
