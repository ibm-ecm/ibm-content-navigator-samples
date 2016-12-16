/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;
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
		
		String requestBody = ResourceRequestUtil.getRequestBody(request);			
		JSONObject requestBodyJson = (JSONObject) JSON.parse(requestBody);
		String user = (String) requestBodyJson.get("user");
		String password = (String) requestBodyJson.get("password");
		
		String configStr = callbacks.loadConfiguration();
		JSONObject configJson = (JSONObject) JSON.parse(configStr);
		JSONArray configurations = (JSONArray) configJson.get("configuration");
		JSONObject integratorKeyJson = (JSONObject) configurations.get(0);
		String docusignIntegratorKey = (String) integratorKeyJson.get("value");
		
		PrintWriter responseWriter = response.getWriter();
		
		String token = getToken(user, password, docusignIntegratorKey);
		String userid = getUserId(user, password, docusignIntegratorKey);
		
		String jsonResponse = null;
		if (token != null || userid != null)
		{
			HttpSession session = request.getSession();
			session.setAttribute(Constants.OAUTH_TOKEN, token);
			session.setAttribute(Constants.DOCUSIGN_USERID, userid);
			
			// send success response esponse to client
			jsonResponse = "{\"returncode\": \"0\", \"oAuthToken\": \"" + token + "\", \"docusignUserId\": \"" + userid + "\", \"status\": \"success\"}";
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
	}

	/*
	 * Get OAuth2 token 
	 * 
	 * Takes user, password and client_id
	 * Returns OAuth2 token string as response  
	 */
	private String getToken(String user, String password, String integratorKey) throws Exception
	{
		String oauthToken = null;
		try
		{
			URL url = new URL("https://demo.docusign.net/restapi/v2/oauth2/token");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			String params = "grant_type=password";
			params += "&";
			params += "scope=api";
			params += "&";
			params += "username=" + URLEncoder.encode(user, "UTF-8");
			params += "&";
			params += "password=" + URLEncoder.encode(password, "UTF-8");
			params += "&";
			params += "client_id=" + URLEncoder.encode(integratorKey, "UTF-8");
			
			System.out.println("++++ params = " + params);
			byte[] postData = params.getBytes();
			int    postDataLen = postData.length;
			
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
			conn.setRequestProperty("Content-Length", Integer.toString(postDataLen));

			OutputStream os = conn.getOutputStream();
			os.write(postData);

			os.flush();

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			String restResponse = "";
			while ((line = br.readLine()) != null) {
				restResponse = restResponse.concat(line);
			}
			
			br.close();
			
			JSONObject resp = (JSONObject) JSON.parse(restResponse);
			oauthToken = (String) resp.get("access_token");
		}
		catch (Exception ex)
		{
			// ignore throwing exception. return a null for oauth2 token
		}
		
		return oauthToken;
	}

	/*
	 * Get DocuSign user id 
	 * 
	 * Takes user, password and client_id
	 * Returns user id string as response  
	 */
	private String getUserId(String user, String password, String docusignIntegratorKey) throws IOException 
	{
		// create X-DocuSign-Authentication header string
		String creds = DocuSignUtil.getDocusignCredentialHeader(user, password, docusignIntegratorKey);
		
		return DocuSignUtil.getAccountId(creds);
	}
}