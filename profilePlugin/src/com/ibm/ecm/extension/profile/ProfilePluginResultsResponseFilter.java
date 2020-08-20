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
public class ProfilePluginResultsResponseFilter extends PluginResponseFilter {

	public String[] getFilteredServices() {
		return new String[] {"/p8/search", "/cm/search", "/cmis/search", "/jaxrs/p8/openFolder", "/p8/openFolder", "/cm/openFolder", "/cmis/openFolder", "/cm/getFoldersFiledIn", "/cm/getDocumentVersions", "/p8/getFoldersFiledIn", "/p8/getDocumentVersions", "/getAsyncTasks", "/getAsyncTaskInstances", "/getAsyncTaskAudits"};
	}
	
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		JSONObject structure = (JSONObject) jsonResponse.get("columns");
		JSONArray cells = (JSONArray) structure.get("cells");
		if (cells.get(0) instanceof JSONArray) {
			cells = (JSONArray) cells.get(0);
		}

		int i = 0;
		for (i = 0; i < cells.size(); i++) {
			JSONObject column = (JSONObject) cells.get(i);
			String columnName = (String) column.get("field");

			if (columnName != null && ProfilePlugin.profileSupportedFieldList.contains(columnName)) { // to match a P8, CM and CMIS properties
				column.put("decorator", "businessHoverCardDecorator");
				column.put("widgetsInCell", true);
				column.put("setCellValue", "businessHoverCardCellValue");
				column.put("width", "8.0em");
			}
		}
		
		JSONArray magazineColumns = (JSONArray) jsonResponse.get("magazineColumns");
		for (i = 0; i < magazineColumns.size(); i++) {
			JSONObject column = (JSONObject) magazineColumns.get(i);
			String columnName = (String) column.get("field");
			
			if (columnName != null && columnName.equals("content")) {
				JSONArray fieldsToDisplay = (JSONArray)column.get("fieldsToDisplay");
				
				for (int j = 0; j < fieldsToDisplay.size(); j++) {
					JSONObject field = (JSONObject)fieldsToDisplay.get(j);
					String fieldName = (String) field.get("field");
					
					if (fieldName != null && (fieldName.equals("modifiedBy") || fieldName.equals("createdBy") || fieldName.equals("LastModifier") || fieldName.equals("Creator") || fieldName.equals("cmis:lastModifiedBy") || fieldName.equals("cmis:createdBy"))) { // to match a P8, CM and CMIS properties
						field.put("decorator", "businessHoverCardMagazineDecorator");
					}
				}
			}
		}
	}
}
