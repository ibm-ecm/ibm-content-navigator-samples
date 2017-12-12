package com.ibm.ecm.extension.react;

import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginRequestUtil;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArtifact;
import com.ibm.json.java.JSONObject;

/**
 * Provides an abstract class that is extended to create a filter for requests to a particular service. The filter is provided with the 
 * request parameters before being examined by the service. The filter can change the parameters or reject the request.
 */
public class ColumnsDisplayedRequestFilter extends PluginRequestFilter {

	/**
	 * Returns the names of the services that are extended by this filter.
	 * 
	 * @return A <code>String</code> array that contains the names of the services.
	 */
	public String[] getFilteredServices() {
		return new String[] { "/p8/openFolder" };
	}
	

	/**
	 * Filters a request that is submitted to a service.
	 * 
	 * @param callbacks
	 *            An instance of <code>PluginServiceCallbacks</code> that contains several functions that can be used by the
	 *            service. These functions provide access to plug-in configuration and content server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> object that provides the request. The service can access the invocation parameters from the
	 *            request. <strong>Note:</strong> The request object can be passed to a response filter to allow a plug-in to communicate 
	 *            information between a request and response filter.
	 * @param jsonRequest
	 *            A <code>JSONArtifact</code> that provides the request in JSON format. If the request does not include a <code>JSON Artifact</code>  
	 *            object, this parameter returns <code>null</code>.
	 * @return A <code>JSONObject</code> object. If this object is not <code>null</code>, the service is skipped and the
	 *            JSON object is used as the response.
	 */
	public JSONObject filter(PluginServiceCallbacks callbacks, HttpServletRequest request, JSONArtifact jsonRequest) throws Exception {
		String repositoryId = request.getParameter("repositoryId");
		String folderId = request.getParameter("docid"); 
		String teamspaceId = request.getParameter("workspaceId");
		String filterType = request.getParameter("filter_type");
		String userSettingsKey = "UserColumnSettings" + repositoryId;
		JSONObject usersSettings = Util.getUsersSavedColumns(callbacks, userSettingsKey);
		
		if ((teamspaceId == null || teamspaceId.isEmpty()) && (filterType == null || filterType.isEmpty()) && usersSettings != null && (!Util.isRootFolder(callbacks, repositoryId, folderId))) {
			String propertyList = createPropertiesList(usersSettings);
			if (propertyList != "" && propertyList != null) {
				PluginRequestUtil.setRequestParameter(request, "documentProperties", propertyList);
			}
		}
		
		return null;
	}
	
	private String createPropertiesList(JSONObject savedPropertiesList) {
		String result = "";
		
		if (savedPropertiesList != null) {
			Set<?> keys = savedPropertiesList.keySet();
			Iterator<?> itr = keys.iterator();
			while (itr.hasNext()) {
				String property = (String) itr.next();
				if (property.equals("{CLASS}")) {
					continue;
				}
				if (!itr.hasNext()) {
					result += property;
				} else {
					result += property + ",";
				}
			}
		}
		
		return result;
	}
}