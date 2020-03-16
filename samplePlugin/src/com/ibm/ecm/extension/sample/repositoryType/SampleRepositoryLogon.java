/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginRepositoryConnection;
import com.ibm.ecm.extension.PluginRepositoryLogonException;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.sample.SamplePluginRepositoryType;
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class SampleRepositoryLogon {
	
	@SuppressWarnings("unchecked")
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String loginRepoId = request.getParameter("repositoryId");
		String serverName = request.getParameter("serverName");
		String userid = request.getParameter("userid");
		String password = request.getParameter("password");
		JSONResponse jsonResponse = new JSONResponse();
		
		if (repositoryConfig.isEmpty() && serverName != null){
			repositoryConfig.setServerName(serverName);
		}
		
		PluginRepositoryConnection connection = logon(callbacks, request, userid, password, repositoryConfig);
		if (connection != null) {
			Map<String, PluginRepositoryConnection> pluginRepositoryConnectionList = (Map<String, PluginRepositoryConnection>) (request.getSession((true)).getAttribute("plugin_repositories"));
			if (pluginRepositoryConnectionList == null) {
				pluginRepositoryConnectionList = new HashMap<String, PluginRepositoryConnection>();
				request.getSession(true).setAttribute("plugin_repositories", pluginRepositoryConnectionList);
			}
			pluginRepositoryConnectionList.put(loginRepoId, connection);
			JSONArray servers = new JSONArray();
			jsonResponse.put("servers",  servers);
			JSONObject server = new JSONObject();
			server.put("connected",  true);
			server.put("id",  loginRepoId);
			server.putAll(connection.getOnConnectedJSON());
			servers.add(server);
		}
		callbacks.writeJSONResponse(jsonResponse,  response);
	}
	
	public PluginRepositoryConnection logon(PluginServiceCallbacks callbacks, HttpServletRequest request, String userid, String password, RepositoryConfig repositoryConfig) throws PluginRepositoryLogonException {
		// Only accept a single user, called "user" and a password called "password".
		if ("user".equals(userid) && "password".equals(password)) {
			try {
				Connection connection = new Connection(SamplePluginRepositoryType.REPOSITORY_TYPE_ID, userid, repositoryConfig);
				return connection;
			} catch (Exception e) {
				throw new PluginRepositoryLogonException(e);
			}
		} else {
			throw new PluginRepositoryLogonException(PluginRepositoryLogonException.LOGON_FAILURE_BAD_USERID_OR_PASSWORD);
		}
	}
	
}
