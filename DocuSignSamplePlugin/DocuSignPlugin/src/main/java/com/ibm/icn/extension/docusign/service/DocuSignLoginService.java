/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.docusign.esign.client.ApiClient;
import com.docusign.esign.client.ApiException;
import com.docusign.esign.client.auth.OAuth;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.icn.extension.docusign.util.ResourceRequestUtil;

public class DocuSignLoginService extends PluginService {
	
	/*****************************************************************************************************************
	 * Navigator Plug-in service to perform login to DocuSign system
	 * 		Checks if a user is already logged in to DocuSign
	 * 		If user is not logged in, then login api is called. The access token is stored in the session 
	 ******************************************************************************************************************/
	@Override
	public String getId() {
		return "DocuSignLoginService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) 
			throws Exception 
	{
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		List<String> scopes = new ArrayList<String>();
		scopes.add("signature");
		scopes.add("impersonation");

		//collectData from Config file
		String configStr = callbacks.loadConfiguration();
		JSONObject configJson = (JSONObject) JSON.parse(configStr);
		JSONObject configurations = (JSONObject) configJson.get("configuration");
		String docusignUserID = (String) configurations.get("userID");
		String docusignIntegratorKey = (String) configurations.get("integratorKey");
		String docusignAccountID = (String) configurations.get("accountID");
		String docusignRsaPrivateKey = (String) configurations.get("rsaKey");
		String oAuthBasePath = "account-d.docusign.com";
		String basePath = "https://demo.docusign.net/restapi";

		OAuth.OAuthToken oAuthToken;

		File privateKeyFile = new File(docusignRsaPrivateKey);
		FileInputStream fin = null;
		byte privateKeyFileContent[] = null;
		try {
			fin = new FileInputStream(privateKeyFile);
			privateKeyFileContent = new byte[(int)privateKeyFile.length()];
			fin.read(privateKeyFileContent);

		} catch (IOException e) {
			callbacks.getLogger().logError(this, methodName, request, e);
			throw new IOException("The specified file in file path: '" + docusignRsaPrivateKey + "' was not found.");
		}
		finally {
			if(fin != null){
				fin.close();
			}
		}

		ApiClient apiClient = new ApiClient();
		apiClient.setBasePath(basePath);
		apiClient.setOAuthBasePath(oAuthBasePath);
		try {
			oAuthToken = apiClient.requestJWTUserToken(docusignIntegratorKey, docusignUserID, scopes, privateKeyFileContent,3600);
			apiClient.setAccessToken(oAuthToken.getAccessToken(), oAuthToken.getExpiresIn());

			PrintWriter responseWriter = response.getWriter();

			String token = oAuthToken.getAccessToken();

			String jsonResponse = null;
			if (token != null)
			{
				HttpSession session = request.getSession();
				session.setAttribute(Constants.OAUTH_TOKEN, token);
				session.setAttribute(Constants.DOCUSIGN_ACCOUNTID, docusignAccountID);

				// send success response esponse to client
				jsonResponse = "{\"returncode\": \"0\", \"status\": \"success\"}";
			}
			else
			{
				// send fail response response back to client
				jsonResponse = "{\"returncode\": \"-1\", \"errorMessage\": \"OAuth2 authentication failed\"}";
			}

			response.setContentType("text/plain");

			responseWriter.print(jsonResponse);
			responseWriter.flush();
			responseWriter.close();

			callbacks.getLogger().logExit(this, methodName, request);

		} catch (ApiException e) {
			callbacks.getLogger().logError(this, methodName, request, e);
			throw new ApiException();

		} catch (IOException e) {
			callbacks.getLogger().logError(this, methodName, request, e);
			throw new IOException();
		}
	}
}