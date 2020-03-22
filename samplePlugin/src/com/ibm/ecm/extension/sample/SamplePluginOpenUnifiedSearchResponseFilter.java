/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This sample filter modifies the open unified search JSON to demonstrate how to add a custom property editor.
 * Custom property editors can be used to provide an alternate widget for defining values of property criteria
 * in the cross-repository search builder and run-time. The custom property editor for this sample is in
 * com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyEditor.js.
 * <br><br>
 * To prevent the changes from always happening, the logic will only take effect if the desktop's ID is "sample".
 * It also only effects the following classes:
 * <ol>
 * <li>P8 - Document</li>
 * <li>CM8 - NOINDEX</li>
 * </ol>
 */
public class SamplePluginOpenUnifiedSearchResponseFilter extends PluginResponseFilter {

	public String[] getFilteredServices() {
		return new String[] { "/p8/openUnifiedSearch", "/cm/openUnifiedSearch" };
	}

	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		String desktopId = request.getParameter("desktop");
		if (desktopId != null && desktopId.equals("sample")) {
			Set<String> repositorySet = new HashSet<String>();
			JSONArray repositories = (JSONArray) jsonResponse.get("repositories");
			for (int i = 0; i < repositories.size(); i++) {
				JSONObject jsonRepository = (JSONObject) repositories.get(i);
				JSONArray classes = (JSONArray) jsonRepository.get("classes");
				for (int j = 0; j < classes.size(); j++) {
					String className = (String) classes.get(j);
					if (className != null && (className.equalsIgnoreCase("Document") || className.equalsIgnoreCase("NOINDEX"))) {
						String repository = (String) jsonRepository.get("repository");
						repositorySet.add(repository);
						break;
					}
				}
			}
		
			if (!repositorySet.isEmpty()) {
				JSONArray mappings = (JSONArray) jsonResponse.get("mappings");
				for (int i = 0; i < mappings.size(); i++) {
					JSONObject jsonMapping = (JSONObject) mappings.get(i);
					JSONArray properties = (JSONArray) jsonMapping.get("properties");
					for (int j = 0; j < properties.size(); j++) {
						JSONObject jsonProperty = (JSONObject) properties.get(j);
						String repository = (String) jsonProperty.get("repository");
						String property = (String) jsonProperty.get("property");
						if (repositorySet.contains(repository) && property != null && (property.equalsIgnoreCase("DocumentTitle") || property.equalsIgnoreCase("USER_ID"))) {
							JSONObject jsonAttributeDefinition = (JSONObject) jsonProperty.get("attributeDefinition");
							jsonAttributeDefinition.put("propertyEditor", "samplePluginDojo/SamplePropertyEditor");
						}
					}
				}
			}
		}
	}

}
