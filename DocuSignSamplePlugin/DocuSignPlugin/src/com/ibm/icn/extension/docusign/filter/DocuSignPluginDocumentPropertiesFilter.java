package com.ibm.icn.extension.docusign.filter;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.icn.extension.docusign.service.Constants;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class DocuSignPluginDocumentPropertiesFilter extends
		PluginResponseFilter {

	@Override
	public String[] getFilteredServices() 
	{
		return new String[] { "/p8/openItem", "/cm/openItem", "/cm/openContentClass","/p8/openContentClass" };
	}
	
	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks,
			HttpServletRequest request, JSONObject jsonResponse) throws Exception 
	{
		// get all properties of selected document
		JSONArray jsonProperties = (JSONArray) jsonResponse.get("criterias");

		if (jsonProperties != null)
		{
			for (int i = 0; i < jsonProperties.size(); i++)
			{
				JSONObject jsonProperty = (JSONObject) jsonProperties.get(i);
				
				// delete signature status property from the response and thus hide it from Properties pane
				if (jsonProperty.get("name").toString().equals(Constants.DOCUMENT_SIGNATURE_STATUS))
				{
					jsonProperties.remove(i);
				}
			}
		}
	}
}