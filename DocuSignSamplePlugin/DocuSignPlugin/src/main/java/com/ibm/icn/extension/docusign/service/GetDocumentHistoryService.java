package com.ibm.icn.extension.docusign.service;

import java.io.PrintWriter;
import java.net.URL;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;
import com.ibm.json.java.JSONObject;

public class GetDocumentHistoryService extends PluginService {
	
	String serverType;
	String repositoryId;
	String docId;
	String envelopeId;
	Document p8DocumentObj;
	
	@Override
	public String getId() {
		return "GetDocumentHistoryService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		
		// Get parameters from UI
		serverType = (String) request.getParameter("serverType");
		repositoryId = request.getParameter("repositoryId");
		docId = request.getParameter("docId");
		
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: serverType = " + ((serverType != null) ? serverType : ""));
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: repositoryId = " + ((repositoryId != null) ? repositoryId : ""));
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: docid = " + ((docId != null) ? docId : ""));
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: envelopeId = " + ((envelopeId != null) ? envelopeId : ""));
		String jsonResponse = "{\"returncode\": \"-1\", \"errorMessage\": \"Session is null\"}";
		if (serverType.equalsIgnoreCase("p8")) {
			synchronized (callbacks.getSynchObject(repositoryId, serverType)) {
				Boolean subjectAdded = false;
				try {
					Subject subject = callbacks.getP8Subject(repositoryId);
					UserContext.get().pushSubject(subject);
					subjectAdded = true;
					
					ObjectStore objectStore = callbacks.getP8ObjectStore(repositoryId);
					
					Id tempDocId = new Id(docId);
					
					p8DocumentObj = Factory.Document.fetchInstance(objectStore, tempDocId, null);
					envelopeId = p8DocumentObj.getProperties().getStringValue(Constants.ENVELOPE_ID);
					
					JSONObject tempJson = null;
					JSONObject auditEventsJson = null;
					HttpSession session = request.getSession();

					if (session != null &&
							session.getAttribute(Constants.OAUTH_TOKEN) != null &&
							session.getAttribute(Constants.DOCUSIGN_ACCOUNTID) != null)
					{
						String token = (String) session.getAttribute(Constants.OAUTH_TOKEN);
						String docusignAccountId = (String) session.getAttribute(Constants.DOCUSIGN_ACCOUNTID);
						
						URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignAccountId + "/envelopes/" + envelopeId);
						tempJson = DocuSignUtil.executeGetUrl(url, token);
						
						URL auditEventsUrl =  new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignAccountId + "/envelopes/" + envelopeId + "/audit_events");
						auditEventsJson = DocuSignUtil.executeGetUrl(auditEventsUrl, token);

						tempJson.put("auditEvents", auditEventsJson.toString());
						tempJson.put("envelopeId", envelopeId);
						tempJson.put("returncode", "0");
						
						jsonResponse = tempJson.toString();
						
					}
				}
				catch (Exception e) {
					// provide error information
					callbacks.getLogger().logError(this, methodName, request, e);
				} finally {
					if (subjectAdded)
						UserContext.get().popSubject();
				}
			}
		}
		
		// Send Response back to client
		PrintWriter responseWriter = response.getWriter();
		response.setContentType("text/plain");
		responseWriter.print(jsonResponse);
		responseWriter.flush();
		responseWriter.close();
		
		callbacks.getLogger().logExit(this, methodName, request);
	}

}