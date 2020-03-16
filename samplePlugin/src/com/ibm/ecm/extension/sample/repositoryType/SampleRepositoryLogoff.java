/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginRepositoryConnection;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;

public class SampleRepositoryLogoff {
	
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);
		logoff(callbacks, request.getSession(false), connection);
	}

	public void logoff(PluginServiceCallbacks callbacks, HttpSession session, PluginRepositoryConnection connection) throws Exception {
		callbacks.getLogger().logInfo(this,  "logoff", "Logged off");
		// nothing to do for the sample
	}
}
