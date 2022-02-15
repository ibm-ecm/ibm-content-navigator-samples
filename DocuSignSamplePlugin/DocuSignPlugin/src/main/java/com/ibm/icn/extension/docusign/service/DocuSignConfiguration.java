/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.IOException;

import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/*****************************************************************************************************************
 * This class stores the DocuSign credentials required to connect to DocuSign systems.
 * The credentials required to authenticate to a DocuSign system are 
 * integrator key (application id or client id)
 * account #
 ******************************************************************************************************************/
public class DocuSignConfiguration 
{
	private String docusignIntegratorKey; //
	private String docusignAccountID;

	/*
	 * Parse the plug-in configuration string into a JSON and set required DocuSign authentication values.
	 */
	public void setConfiguration(String configStr)
	{
		try {
			JSONObject configJson = (JSONObject) JSON.parse(configStr);
			JSONArray configJsonArray = (JSONArray) configJson.get("configuration");
			
			JSONObject integratorKeyJson = (JSONObject) configJsonArray.get(2);
			docusignIntegratorKey = (String) integratorKeyJson.get("value");
			
			JSONObject accountIDJson = (JSONObject) configJsonArray.get(2);
			docusignAccountID = (String) accountIDJson.get("value");
		} catch (NullPointerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}

	
	/*
	 *  Get docusign integrator key aka cilent id or application id
	 */
	public String getDocuSignIntegratorKey()
	{
		return this.docusignIntegratorKey;
	}

	/*
	 *  Get docusign integrator key aka accountID
	 */
	public String getDocusignAccountID()
	{
		return this.docusignAccountID;
	}
}
