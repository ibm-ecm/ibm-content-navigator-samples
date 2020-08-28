/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2020  All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 * DISCLAIMER OF WARRANTIES :
 *
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 *
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

package com.ibm.ecm.extension.documentUploadFilter;

import javax.servlet.http.HttpServletRequest;
import java.util.ResourceBundle;
import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginRequestUtil;
import com.ibm.json.java.JSONObject;
import com.ibm.json.java.JSONArtifact;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * Provides a filter for responses from the "getDesktop" service.
 */
public class DocumentUploadFilterPluginRequestFilter extends PluginRequestFilter {
	/**
	 * Returns an array of the services that are extended by this filter.
	 *
	 * @return A <code>String</code> array of names of the services.
	 */
	@Override
	public String[] getFilteredServices() {
		return new String[]{"/p8/addItem", "/cm/addItem", "/cmis/addItem", "/od/addItem", "/box/addItem"};
	}

	@Override
	public JSONObject filter(PluginServiceCallbacks callbacks, HttpServletRequest request, JSONArtifact jsonRequest) throws Exception {
		ResourceBundle centralizedMessages = ResourceBundle.getBundle("com.ibm.ecm.extension.documentUploadFilter.nls.Messages");
		String methodName = "filter";
		PluginLogger logger = callbacks.getLogger();
		String repositoryId = request.getParameter("repositoryId");
		String configStr = callbacks.loadConfiguration(); //contains allowed MIME types as an object {allowedTypes:[values]}
		JSONObject configObj = JSONObject.parse(configStr);
		JSONArray allowedTypes = (JSONArray)configObj.get("allowedTypes");
		boolean validationErrors = true;

		try {
			String mimeType = request.getParameter("mimetype");

			for (int i = 0; i < allowedTypes.size(); i++) {
				String s = (String)allowedTypes.get(i);
				if (s.equals(mimeType)) {
					validationErrors = false;
					break;
				}
			}

			if(validationErrors) {
				JSONObject jsonResponse = new JSONObject();
				JSONObject errorMessage = new JSONObject();

				errorMessage.put("text", centralizedMessages.getString("error.Text.summary").concat(": ").concat(mimeType));
				errorMessage.put("explanation", centralizedMessages.getString("error.Text.explanation"));

				JSONArray jsonErrors = new JSONArray();

				jsonResponse.put("errors", jsonErrors);
				jsonErrors.add(errorMessage);
				logger.logDebug(this, methodName, request, "Validation error: " + jsonResponse);
				return jsonResponse;
			}
		} catch (Exception e) {
			logger.logError(this, methodName, request, "Exception: " + e);
		}
		return null;
	}
}