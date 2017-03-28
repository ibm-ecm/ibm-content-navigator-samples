/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import com.ibm.icn.extension.docusign.service.DocuSignConfiguration;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class DocuSignUtil {
	
	/*
	 * Create X-DocuSign-Authentication authentication header from DocuSignConfiguration object
	 */
	public static String getDocusignCredentialHeader(DocuSignConfiguration docusignParams) 
	{
		String creds = "{\"Username\":\"" +  docusignParams.getDocuSignUserName() + 
				"\",\"Password\":\"" +  docusignParams.getDocuSignPassword() + 
				"\",\"IntegratorKey\":\"" + docusignParams.getDocuSignIntegratorKey() + 
			"\"}";
		
		return creds;	
	}
	
	/*
	 * Create X-DocuSign-Authentication authentication header from docusign user, password and integration key
	 */
	public static String getDocusignCredentialHeader(String user, String password, String key) 
	{
		String creds = "{\"Username\":\"" +  user + 
				"\",\"Password\":\"" +  password + 
				"\",\"IntegratorKey\":\"" + key + 
			"\"}";
		
		return creds;	
	}

	/*
	 * Get DocuSign Login Account Id that will be used in subsequent REST calls 
	 */
	public static String getAccountId(String creds) throws IOException 
	{
		String accountId = null;
		
		try
		{
			URL url = new URL("https://demo.docusign.net/restapi/v2/login_information?login_settings=none");

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("X-DocuSign-Authentication", creds);
			
			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				// ignore throwing an exception
				//throw new RuntimeException("Failed to get dousign account id: HTTP error code : " + conn.getResponseCode());
				accountId = null;
			}
			
			// Get the REST API response
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			String restResponse_temp = "";
			while ((line = br.readLine()) != null) {
				restResponse_temp = restResponse_temp.concat(line);
			}
			
			JSONObject tempJson = JSONObject.parse(restResponse_temp);
			JSONArray loginAccounts = (JSONArray) tempJson.get("loginAccounts");
			JSONObject userAccount = (JSONObject) loginAccounts.get(0);
			
			accountId = (String) userAccount.get("accountId");
		}
		catch (Exception ex)
		{
			// ignore throwing an exception
			accountId = null;
		}
		
		return accountId;
	}

	/*
	 * Execute Get REST Api call. 
	 * 
	 * Takes Url to execute and OAuth token
	 * Returns result response as Json  
	 */
	public static JSONObject executeGetUrl(URL url, String token) throws IOException 
	{
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setRequestMethod("GET");
		conn.setDoOutput(true);
		conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded"); 
		conn.setRequestProperty("Authorization", "Bearer " + token);

		if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
			throw new RuntimeException("Get request Failed - HTTP error code: "
					+ conn.getResponseCode());
		}
		
		// get the REST api response
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		String restResponse_temp = "";
		while ((line = br.readLine()) != null) {
			restResponse_temp = restResponse_temp.concat(line);
		}
		
        // close buffered readers
        br.close();
        
        // disconnect the HttpURLConnections
		conn.disconnect();
		
		return JSONObject.parse(restResponse_temp);
	}
	
	/*
	 * Execute Post REST Api call. 
	 * 
	 * Takes Url to execute, OAuth token and Json payload
	 * Returns result response as Json
	 */
	public static JSONObject executePostUrl(URL url, String token, JSONObject payload) throws IOException 
	{
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Authorization", "Bearer " + token);
		
		OutputStream os = conn.getOutputStream();
		os.write(payload.toString().getBytes());
		os.flush();
		
		JSONObject result;
		if (conn.getResponseCode() == HttpURLConnection.HTTP_CREATED) {
			result = (JSONObject) JSON.parse(conn.getInputStream());
		}
		else {
			throw new RuntimeException("Post request Failed - HTTP error code: "
					+ conn.getResponseCode());
		}
		
		conn.disconnect();	
		
		return result;
	}
}