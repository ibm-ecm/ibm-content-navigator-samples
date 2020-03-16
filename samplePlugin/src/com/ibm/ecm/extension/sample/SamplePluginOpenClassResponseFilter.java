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
 * This sample filter modifies the open content class JSON to demonstrate the following capabilities:
 * <ol>
 * <li>To remove "Like" operators from properties that have a choice list (applied to all classes).</li>
 * <li>To add a custom property formatter. Custom property formatters can be used to provide an alternate widget for the
 * property values in the property display grid. The custom property formatter for this sample is in
 * com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyFormatter.js</li>
 * <li>To add a custom property editor. Custom property editors can be used to provide an alternate widget for the
 * editable properties shown in the add/edit properties dialog. The custom property editor for this sample is in
 * com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyEditor.js</li>
 * </ol>
 * To prevent the results changes from always happening, the logic will only take effect if the desktop's ID is
 * "sample". It also only effects the following classes, unless otherwise noted above:
 * <ol>
 * <li>P8 - Document</li>
 * <li>CM8 - NOINDEX</li>
 * </ol>
 */
public class SamplePluginOpenClassResponseFilter extends PluginResponseFilter {

	public String[] getFilteredServices() {
		return new String[] { "/p8/openContentClass", "/cm/openContentClass" };
	}

	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		String desktopId = request.getParameter("desktop");
		String templateName = request.getParameter("template_name");
		if (desktopId != null && desktopId.equals("sample")) {
			JSONArray properties = (JSONArray) jsonResponse.get("criterias");
			for (int i = 0; i < properties.size(); i++) {
				// Remove "Like" operators from properties that have a choice list, unless they use a long column because they can only be queried with LIKE
				JSONObject jsonPropDef = (JSONObject) properties.get(i);
				if (jsonPropDef.get("choiceList") != null && (jsonPropDef.get("usesLongColumn") == null || !((Boolean) jsonPropDef.get("usesLongColumn")))) {
					JSONArray jsonAvailableOperators = (JSONArray) jsonPropDef.get("availableOperators");
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
			
			if (templateName.equalsIgnoreCase("Document") || templateName.equalsIgnoreCase("NOINDEX")) {
				for (int i = 0; i < properties.size(); i++) {
					JSONObject jsonPropDef = (JSONObject) properties.get(i);
					String name = (String) jsonPropDef.get("name");
					if (name != null && (name.equals("DocumentTitle") || (name.equals("USER_ID")))) { // only updates document title entries
						jsonPropDef.put("propertyEditor", "samplePluginDojo/SamplePropertyEditor");
					}
					if (name != null && (name.equals("modifiedBy") || name.equals("createdBy") || name.equals("LastModifier") || name.equals("Creator") || name.equals("USER_ID"))) {
						jsonPropDef.put("propertyFormatter", "samplePluginDojo/SamplePropertyFormatter");
					}
				}
			}
		}
	}

}
