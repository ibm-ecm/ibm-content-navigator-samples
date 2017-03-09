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

		JSONObject structure = (JSONObject) jsonResponse.get("columns");
		JSONArray cells = (JSONArray) structure.get("cells");
		if (cells.get(0) instanceof JSONArray) 
		{
			cells = (JSONArray) cells.get(0);
		}
		
		// change it for any desktop
		JSONResultSetResponse jsonResultSetResponse = (JSONResultSetResponse) jsonResponse;
		JSONResultSetColumn multi = jsonResultSetResponse.getColumn(0);
		multi.put("decorator", "docuSign.util.DetailsViewDecorator.docuSignPluginStatusDecorator");
		
		// remove Signature Status column from the result set
		for (int i = 0; i < cells.size(); i++)
		{
			JSONObject column = (JSONObject) cells.get(i);
			String columnName = (String) column.get("field");
			
			if (columnName != null && columnName.equals("DSSignatureStatus"))
				cells.remove(i);
		}
	}
}