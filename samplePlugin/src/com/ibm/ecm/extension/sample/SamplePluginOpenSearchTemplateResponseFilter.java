/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This sample filter modifies the open search template JSON to demonstrate the following capabilities:
 * <ol>
 * <li>To remove "Like" operators from properties that have a choice list (applied to all classes).</li>
 * <li>To add a custom property editor. Custom property editors can be used to provide an alternate widget
 * for defining values of property criteria in the search builder and run-time. The custom property editor
 * for this sample is in com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyEditor.js.</li>
 * </ol>
 * To prevent the changes from always happening, the logic will only take effect if the desktop's ID is "sample".
 * It also only effects the following classes, unless otherwise noted above:
 * <ol>
 * <li>P8 - Document</li>
 * <li>CM8 - NOINDEX</li>
 * </ol>
 */
public class SamplePluginOpenSearchTemplateResponseFilter extends PluginResponseFilter {

	public String[] getFilteredServices() {
		return new String[] { "/p8/openSearchTemplate", "/cm/openSearchTemplate" };
	}

	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		String desktopId = request.getParameter("desktop");
		if (desktopId != null && desktopId.equals("sample")) {
			JSONArray criteria = (JSONArray) jsonResponse.get("criterias");
			for (int i = 0; i < criteria.size(); i++) {
				// Remove "Like" operators from properties that have a choice list, unless they use a long column because they can only be queried with LIKE
				JSONObject jsonCriterion = (JSONObject) criteria.get(i);
				if (jsonCriterion.get("choiceList") != null && (jsonCriterion.get("usesLongColumn") == null || !((Boolean) jsonCriterion.get("usesLongColumn")))) {
					JSONArray jsonAvailableOperators = (JSONArray) jsonCriterion.get("availableOperators");
					if (jsonAvailableOperators != null && !jsonAvailableOperators.isEmpty()) {
						Iterator iterator = jsonAvailableOperators.iterator();
						while (iterator.hasNext()) {
							String operator = (String) iterator.next();
							if (operator.equals("STARTSWITH") || operator.equals("ENDSWITH") || operator.equals("LIKE") || operator.equals("NOTLIKE")) {
								iterator.remove();
							}
						}
					}
				}
			}
			
			String templateName = (String) jsonResponse.get("template_name");
			if (templateName != null && (templateName.equalsIgnoreCase("Document") || templateName.equalsIgnoreCase("NOINDEX"))) {
				for (int i = 0; i < criteria.size(); i++) {
					JSONObject jsonCriterion = (JSONObject) criteria.get(i);
					String name = (String) jsonCriterion.get("name");
					if (name != null && (name.equalsIgnoreCase("DocumentTitle") || name.equalsIgnoreCase("USER_ID"))) {
						jsonCriterion.put("propertyEditor", "samplePluginDojo/SamplePropertyEditor");
					}
				}
			}
		}
	}

}
