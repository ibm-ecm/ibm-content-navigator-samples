/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.PrintWriter;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;

/*****************************************************************************************************************
 * Navigator Plug-in service to get the list of existing DocuSign templates for the user
 * 		Returns an array of templates. Each template is a Json object containing the template Id and template name. 
 ******************************************************************************************************************/
public class GetTemplatesService extends PluginService {
	
	@Override
	public String getId() {
		return "GetTemplatesService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		JSONObject resultJson = null;
		
		String jsonResponse = null;
		HttpSession session = request.getSession();
		
		if (session != null && 
				session.getAttribute(Constants.OAUTH_TOKEN) != null &&
					session.getAttribute(Constants.DOCUSIGN_USERID) != null)
		{
			System.out.println("Session is not null. oAuthToken exits!");
			String token = (String) session.getAttribute(Constants.OAUTH_TOKEN);
			String docusignUserId = (String) session.getAttribute(Constants.DOCUSIGN_USERID);
			
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/templates");
			resultJson = DocuSignUtil.executeGetUrl(url, token);
			
			JSONArray resultTemplates = (JSONArray) resultJson.get("envelopeTemplates");
			JSONArray outputTemplates = new JSONArray();
			
			for (int i = 0; i < resultTemplates.size(); i++)
			{
				JSONObject template = (JSONObject) resultTemplates.get(i);	
			
				JSONObject tmpJson = new JSONObject();
				tmpJson.put("templateId", template.get("templateId"));
				tmpJson.put("name", template.get("name"));
				
				outputTemplates.add(tmpJson);
			}
			
			JSONObject finalJson = new JSONObject();
			finalJson.put("templates", outputTemplates);
			finalJson.put("returncode", "0");
			
			// send success response response back to client
			jsonResponse = finalJson.toString();
		}
		else
		{
			// send fail response response back to client
			jsonResponse = "{\"returncode\": \"-1\", \"errorMessage\": \"Session is null\"}";
		}
		
		PrintWriter responseWriter = response.getWriter();
        response.setContentType("text/plain");
		responseWriter.print(jsonResponse);
        responseWriter.flush();
        responseWriter.close();	
        
		callbacks.getLogger().logExit(this, methodName, request);
	}
}