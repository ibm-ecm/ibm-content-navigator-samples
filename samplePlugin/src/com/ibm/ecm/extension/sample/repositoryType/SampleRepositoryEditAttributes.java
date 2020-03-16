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
import com.ibm.ecm.json.JSONEditAttributesRequest;
import com.ibm.ecm.json.JSONItemAttributesResponse;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONRequest;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * Implements edit attributes service.  Note that the attributes of the item are only changed in-memory and not out to the JSON file.  They will not persist on a server restart.
 */
public class SampleRepositoryEditAttributes {

	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONRequest jsonRequest = callbacks.readJSONRequest(request, response, JSONEditAttributesRequest.class);
		if (jsonRequest != null) {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);

		String docid = request.getParameter("docid"); // id of the document
		ContentItem contentItem;
		if (docid.equals("/")) {
			contentItem = connection.getRootItem();
		} else  {
			contentItem = connection.getContentItem(docid);
		}
		
		// Set the modified attribute values
		JSONArray jsonPost = JSONArray.parse(request.getParameter("json_post"));
		JSONObject firstItem = (JSONObject)jsonPost.get(0);  // only 1 item's attributes although json format allows for multiple
		JSONArray jsonAttributes = (JSONArray)firstItem.get("criterias");
		for (Object attribute : jsonAttributes) {
			JSONObject jsonAttribute = (JSONObject)attribute;
			contentItem.setAttribute((String)jsonAttribute.get("name"), jsonAttribute.get("value"));
		}
		
		// Return the updated attributes (this is used to update the UI)
		JSONResultSetResponse jsonResponse = SampleRepositoryUtils.buildResultSetResponse(callbacks, connection, new ContentItem[] {contentItem});
		
		jsonResponse.addInfoMessage(new JSONMessage(0, "Document "+contentItem.getName()+" successfully edited.", null, null, null, null));
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
	
		
	}
}
