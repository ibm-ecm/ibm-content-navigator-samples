/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.PrintWriter;
import java.net.URL;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;

/**
 * This service is invoked by SamplePluginAction. It will invoke the OD, P8, CM or CMIS API's to obtain system-related
 * details about a document and return those details in JSON.
 */
public class SignStatusService extends PluginService {
	
	String serverType;
	String repositoryId;
	String docId;
	String envelopeId;
	Document p8DocumentObj;
	
	@Override
	public String getId() {
		return "SignStatusService";
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
		
		if (serverType.equalsIgnoreCase("p8")) {
			synchronized (callbacks.getSynchObject(repositoryId, serverType)) {
				try {
					Subject subject = callbacks.getP8Subject(repositoryId);
					UserContext.get().pushSubject(subject);
					
					ObjectStore objectStore = callbacks.getP8ObjectStore(repositoryId);
					
					Id tempDocId = new Id(docId);
					
					p8DocumentObj = Factory.Document.fetchInstance(objectStore, tempDocId, null);
					envelopeId = p8DocumentObj.getProperties().getStringValue(Constants.ENVELOPE_ID);
					
					/*//Document p8DocumentObj = Factory.Document.getInstance(objectStore, "Document", tempDocId);
					Id vsId = p8DocumentObj.get_VersionSeries().get_Id();					
					p8DocumentObj.checkout(ReservationType.EXCLUSIVE, vsId, p8DocumentObj.getClassName(), p8DocumentObj.getProperties());
					p8DocumentObj.save(RefreshMode.REFRESH);*/
				}
				catch (Exception e) {
					// provide error information
					callbacks.getLogger().logError(this, methodName, request, e);
				}
			}
		}
		
		String jsonResponse = null;
		JSONObject tempJson = null;
		JSONObject recipientsJson = null;
		HttpSession session = request.getSession();

		if (session != null && 
				session.getAttribute("oAuthToken") != null &&
					session.getAttribute("docusignUserId") != null)
		{
			String token = (String) session.getAttribute("oAuthToken");
			String docusignUserId = (String) session.getAttribute("docusignUserId");
			
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/envelopes/" + envelopeId);
			tempJson = DocuSignUtil.executeGetUrl(url, token);
			
			URL recipientsUrl =  new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/envelopes/" + envelopeId + "/recipients");
			recipientsJson = DocuSignUtil.executeGetUrl(recipientsUrl, token);

			JSONArray signers = (JSONArray) recipientsJson.get("signers");
			
			String signersNames = "";
			String signersEmails = "";
			for (int i = 0; i < signers.size(); i++)
			{
				JSONObject signer = (JSONObject) signers.get(i);
				String signerName = (String) signer.get("name");
				String signerEmail = (String) signer.get("email");
				
				if (i == 0) {
					signersNames = signerName;
					signersEmails = signerEmail;
				}
				else {
					signersNames = signersNames + ", " + signerName;
					signersEmails = signersEmails + ", " + signerEmail;
				}			
			}
			
			tempJson.put("signerName", signersNames);
			tempJson.put("signerEmail", signersEmails);
			tempJson.put("envelopeId", envelopeId);
			tempJson.put("returncode", "0");
			
			jsonResponse = tempJson.toString();
			
			// update sign status, if any, when retrieving the document status from DocuSign system
			int docSignStatus = p8DocumentObj.getProperties().getInteger32Value(Constants.DOCUMENT_SIGNATURE_STATUS);
			int currentSignStatus = getSignatureStatus(tempJson);
			if (docSignStatus != currentSignStatus)
			{
				p8DocumentObj.getProperties().putValue(Constants.DOCUMENT_SIGNATURE_STATUS, currentSignStatus);
				p8DocumentObj.save(RefreshMode.NO_REFRESH);
			}
		}
		else
		{
			jsonResponse = "{\"returncode\": \"-1\", \"errorMessage\": \"Session is null\"}";
			//throw new IllegalStateException("Session object is null!");
		}
		
		// Send Response back to client
		PrintWriter responseWriter = response.getWriter();
        response.setContentType("text/plain");
        responseWriter.print(jsonResponse);
        responseWriter.flush();
        responseWriter.close();
		
		callbacks.getLogger().logExit(this, methodName, request);
	}

	/*
	 * Get integer value for DocuSign signature string status
	 */
	private int getSignatureStatus(JSONObject tempJson) 
	{
		int retValue;
		String status = (String) tempJson.get(Constants.STATUS);
		
		if (status.equals("sent"))
			retValue = Constants.SIGNATURE_STATUS.SENT.getValue();
		else if (status.equals("completed"))
			retValue =  Constants.SIGNATURE_STATUS.COMPLETED.getValue();
		else
			retValue = Constants.SIGNATURE_STATUS.NONE.getValue();
		
		return retValue;
	}	
}