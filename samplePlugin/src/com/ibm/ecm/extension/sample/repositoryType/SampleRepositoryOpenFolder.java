/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;
import com.ibm.ecm.extension.sample.repositoryType.model.ContentItem;
import com.ibm.ecm.json.JSONResultSetResponse;

public class SampleRepositoryOpenFolder {

	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection) callbacks.getPluginRepositoryConnection(repositoryId);

		String docid = request.getParameter("docid"); // id of folder
		boolean foldersOnly = false;
		if ("folderSearch".equals(request.getParameter("filter_type"))) { 
			foldersOnly = true;   // only nested folders should be returned
		}

		JSONResultSetResponse jsonResponse = new JSONResultSetResponse();

		ContentItem folder;
		if (docid.equals("/")) {
			folder = connection.getRootItem();
		} else {
			folder = connection.getContentItem(docid);
		}
		String[] contentItemIds = folder.getContentIds();
		ArrayList<ContentItem> contentItemList = new ArrayList<ContentItem>();
		for (int i = 0; i < contentItemIds.length; i++) {
			ContentItem contentItem = connection.getContentItem(contentItemIds[i]);
			if (!foldersOnly || contentItem.isFolder()) {
				contentItemList.add(contentItem);
			}
		}
		jsonResponse = SampleRepositoryUtils.buildResultSetResponse(callbacks, connection, contentItemList);
		callbacks.writeJSONResponse(jsonResponse,  response);
	}

}
