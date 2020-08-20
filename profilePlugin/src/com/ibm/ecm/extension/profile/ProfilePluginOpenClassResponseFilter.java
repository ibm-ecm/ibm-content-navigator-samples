/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.profile;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This filter modifies the search results json to add a custom property formatter.  Custom property formatters can be used to provide an alternate HTML for
 * the property values in the content list.  The custom property formatter for this is in com.ibm.ecm.extension.profile.WebContent.profilePlugin.EmailPropertyFormatter.js   
 */
public class ProfilePluginOpenClassResponseFilter extends PluginResponseFilter {
	
	public String[] getFilteredServices() {
		return new String[] {"/p8/openContentClass", "/cm/openContentClass", "/cmis/openContentClass"};
	}
	
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		JSONArray properties = (JSONArray) jsonResponse.get("criterias");

		for (int i = 0; i < properties.size(); i++) {
			JSONObject jsonPropDef = (JSONObject) properties.get(i);
			String name = (String) jsonPropDef.get("name");
			
			if (name != null && ProfilePlugin.profileSupportedFieldList.contains(name)) { // to match a P8, CM and CMIS properties
				jsonPropDef.put("propertyFormatter", "profilePlugin/PropertyGridFormatter");
			}
		}
	}
}
