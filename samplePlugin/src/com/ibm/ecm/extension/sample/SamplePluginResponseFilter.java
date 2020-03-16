/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResultSetColumn;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.ecm.json.JSONResultSetRow;
import com.ibm.json.java.JSONObject;

/**
 * This sample filter modifies the search results JSON to demonstrate two capabilities:
 * <ol>
 * <li>To add a custom property formatter. Custom property formatters can be used to provide an alternate HTML for the
 * property values in the content list. The custom property formatter for this sample is in
 * com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyFormatter.js
 * <li>To modify the results to add a custom column. The column added is titled "Sample" and is filled with sequentially
 * increasing integer values.
 * </ol>
 * To prevent the results changes from always happening, the logic will only take effect
 * if the desktop's id is "sample".
 */
public class SamplePluginResponseFilter extends PluginResponseFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/p8/search", "/cm/search", "/cmis/search", "/p8/openFolder", "/cm/openFolder", "/cmis/openFolder" };
	}

	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		String desktopId = request.getParameter("desktop");
		if (desktopId != null && desktopId.equals("sample")) {
			JSONResultSetResponse jsonResultSetResponse = (JSONResultSetResponse) jsonResponse;
			for (int i = 0; i < jsonResultSetResponse.getColumnCount(); i++) {
				JSONResultSetColumn column = jsonResultSetResponse.getColumn(i);
				String columnName = (String) column.get("field");

				if (columnName != null && (columnName.equals("modifiedBy") || columnName.equals("createdBy") || columnName.equals("LastModifier") || columnName.equals("Creator") || columnName.equals("cmis:lastModifiedBy") || columnName.equals("cmis:createdBy"))) { // to match a P8, CM and CMIS properties
					column.put("decorator", "samplePluginEmailDecorator");
				}
			}
			
			JSONResultSetColumn  customColumn=null;
			if(request.getParameter("SampleColumWidth")!=null){
				customColumn = new JSONResultSetColumn("Sample", request.getParameter("SampleColumWidth"), "SampleColumn", null, true);
			}else{
				customColumn = new JSONResultSetColumn("Sample", "50px", "SampleColumn", null, true);
			}

			jsonResultSetResponse.addColumn(customColumn);
			for (int i = 0; i < jsonResultSetResponse.getRowCount(); i++) {
				JSONResultSetRow row = jsonResultSetResponse.getRow(i);
				row.addAttribute("SampleColumn", i, JSONResultSetRow.TYPE_INTEGER, null, null);
			}
		}
		
	}

}
