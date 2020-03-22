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
import com.ibm.ecm.json.JSONResultSetResponse;

public class SampleRepositoryGetContentItems {

	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);

		String docid = request.getParameter("docid"); // id of first document
		JSONResultSetResponse jsonResponse = new JSONResultSetResponse();
		if (docid.equals("/")) {
			ContentItem rootItem = connection.getRootItem();
			jsonResponse = SampleRepositoryUtils.buildResultSetResponse(callbacks, connection, new ContentItem[] {rootItem});
		} else  {
			String[] docids = request.getParameterValues("docid");
			ContentItem[] contentItems = new ContentItem[docids.length];
			for (int i = 0; i < docids.length; i++) {
				contentItems[i] = connection.getContentItem(docids[i]);
			}
			jsonResponse = SampleRepositoryUtils.buildResultSetResponse(callbacks, connection, contentItems);
		}
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
	
}
