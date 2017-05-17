/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.filter;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResultSetColumn;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.icn.extension.docusign.service.Constants;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class DocuSignPluginResponseFilter extends PluginResponseFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/p8/search", "/cm/search", "/cmis/search",
				"/p8/openFolder", "/cm/openFolder", "/cmis/openFolder" };
	}

	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks,
			HttpServletRequest request, JSONObject jsonResponse) throws Exception 
	{
		
		// change it for any desktop
		JSONResultSetResponse jsonResultSetResponse = (JSONResultSetResponse) jsonResponse;
		for (int i = 0; i < jsonResultSetResponse.getColumnCount(); i++) {
			JSONResultSetColumn column = jsonResultSetResponse.getColumn(i);

			String columnName = (String) column.get("field");

			/*
			 * if (columnName != null && columnName.equals("{NAME}") ) {// we
			 * should push status before name indexOfNameColumn = i; }
			 */
			if (columnName != null && columnName.equals("DSSignatureStatus")) {
				column.put("width", "16px");
				column.put("sortable", false);
				column.put("nosort", true);
				column.put("name", "");
				column.put("decorator", "docuSign.util.DetailsViewDecorator.docuSignPluginStatusDecorator");
			}
		}
	}
}