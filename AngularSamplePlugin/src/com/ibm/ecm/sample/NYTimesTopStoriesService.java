/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */
 
package com.ibm.ecm.sample;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * Provides a plug-in service for the Angular Sample plug-in. This service retrieves the
 * top stories from the New York Times. To enable this you must create an API Key for the 
 * New York Times "Top Stories V2" API. Go to the https://developer.nytimes.com and select 
 * the option to request an API Key. Fill out the required information and select 
 * "Top Stories V2" in the "API" drop down. Once you have the key you can add it to the
 * plug-in configuration for this sample.  
 */
public class NYTimesTopStoriesService extends PluginService {

	private String nyTimesAPIUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=";
	
	@Override
	public String getId() {
		return "NYTimesTopStoriesService";
	}

	@SuppressWarnings("unchecked")
	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		JSONResponse jsonResponse = new JSONResponse();
		
		try {
			JSONObject json = JSONObject.parse(callbacks.loadConfiguration());
			JSONArray configArray = (JSONArray)json.get("configuration");
			String apiKey = (String)((JSONObject)configArray.get(0)).get("value");
			URL url = new URL(nyTimesAPIUrl + apiKey);
			HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setDoOutput(false);
			conn.setDoInput(true);
			conn.setUseCaches(false);
			
			if (conn.getResponseCode() != 200) {
				String responseMessage = conn.getResponseMessage();
				JSONMessage jsonMessage = new JSONMessage(0, 
						responseMessage + " (" + conn.getResponseCode() + ")", 
						"This error will occur if the service is unable to communicate with the NY Times API.", 
						"", "Check the IBM Content Navigator logs for more details.", "");
				jsonResponse.addErrorMessage(jsonMessage);
			} else {
				// Buffer the result into a string
				BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = rd.readLine()) != null) {
					sb.append(line);
				}
				
				rd.close();
				conn.disconnect();
				
				JSONObject jsonObj = JSONObject.parse(sb.toString());
				jsonResponse.putAll(jsonObj);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
			JSONMessage jsonMessage = new JSONMessage(0, 
					e.getMessage(), 
					"This error will occur if the service is unable to communicate with the NY Times API.", 
					"", "Check the IBM Content Navigator logs for more details.", "");
			jsonResponse.addErrorMessage(jsonMessage);
		}
		
		// Write results to response
		PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "NYTimesTopStoriesService");
	}
}