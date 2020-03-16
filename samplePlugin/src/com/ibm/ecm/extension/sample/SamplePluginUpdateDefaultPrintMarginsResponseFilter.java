/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONObject;

/**
 * 
 * This sample filter modifies the default print margins
 *
 */
public class SamplePluginUpdateDefaultPrintMarginsResponseFilter extends PluginResponseFilter {

	// JSON element names for corresponding print margin values
	private static final String JSON_KEY_DEFAULT_TOP_MARGIN = "topMargin";
	private static final String JSON_KEY_DEFAULT_BOTTOM_MARGIN = "bottomMargin";
	private static final String JSON_KEY_DEFAULT_LEFT_MARGIN = "leftMargin";
	private static final String JSON_KEY_DEFAULT_RIGHT_MARGIN = "rightMargin";	
	
	public String[] getFilteredServices() {
		return new String[] { "/getDefaultPrintMargins" };
	}

	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		// replace desired print maring values below
		// for example, to change default top margin from 1 to 0.4, change "jsonResponse.put(JSON_KEY_DEFAULT_TOP_MARGIN, "1");" to
		// "jsonResponse.put(JSON_KEY_DEFAULT_TOP_MARGIN, "0.4");"
		jsonResponse.put(JSON_KEY_DEFAULT_TOP_MARGIN, "1");
		jsonResponse.put(JSON_KEY_DEFAULT_BOTTOM_MARGIN, "1");
		jsonResponse.put(JSON_KEY_DEFAULT_LEFT_MARGIN, "1");
		jsonResponse.put(JSON_KEY_DEFAULT_RIGHT_MARGIN, "1");
	}	
	
}
