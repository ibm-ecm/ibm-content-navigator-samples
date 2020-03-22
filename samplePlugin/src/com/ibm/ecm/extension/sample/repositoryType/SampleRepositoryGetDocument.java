/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType;

import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;
import com.ibm.ecm.extension.sample.repositoryType.model.ContentItem;

/**
 * Retrieves the content of a document.
 */
public class SampleRepositoryGetDocument {

	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);

		String docid = request.getParameter("docid"); // id of the document
		ContentItem contentItem = connection.getContentItem(docid);
		response.setHeader("Content-Disposition", "attachment; filename=\""+contentItem.getContentFilename()+"\"");
		response.setContentType(contentItem.getContentType());
		response.setContentLength((int)contentItem.getContentLength());  // note: 2gig limit
		InputStream contentStream = contentItem.getContentStream();
		OutputStream responseStream = response.getOutputStream();
		try {
			byte[] buffer = new byte[4096];
			int len = contentStream.read(buffer);
			while (len != -1) {
				responseStream.write(buffer, 0, len);
				len = contentStream.read(buffer);
			}
		} finally {
			contentStream.close();
		}

	}
}
