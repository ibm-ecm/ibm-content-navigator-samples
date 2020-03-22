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
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;

public class SampleRepositoryChangePassword {
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		Connection connection = (Connection)callbacks.getPluginRepositoryConnection(repositoryId);
		String userid = request.getParameter("userid");
		String password = request.getParameter("password");
		String newPassword = request.getParameter("new_password");
		
		// In this sample nothing is done for change password.  In a real repository type, you should perform actions needed to change
		// the password on the server.
		
		JSONResponse jsonResponse = new JSONResponse();
		jsonResponse.addInfoMessage(new JSONMessage(0, "Password for "+userid+" successfully changed.", null, null, null, null));
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
}
