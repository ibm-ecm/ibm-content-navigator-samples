/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.filenet.api.collection.ContentElementList;
import com.filenet.api.constants.AutoClassify;
import com.filenet.api.constants.CheckinType;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.constants.ReservationType;
import com.filenet.api.core.ContentTransfer;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Document;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.icn.extension.docusign.util.P8ConnectionUtil;

/*****************************************************************************************************************
 * Navigator Plug-in service to check-in the signed copy of the document. The signed content is retrieved 
 * from DocuSign systems and update the doc in P8 repositories as a major version.
 *  
 ******************************************************************************************************************/
public class UpdateSignedDocumentService extends PluginService {
	
	@Override
	public String getId() {
		return "UpdateSignedDocumentService";
	}

	@SuppressWarnings("unchecked")
	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		
		// Get parameters from UI
		String serverType = (String) request.getParameter("serverType");
		String repositoryId = request.getParameter("repositoryId");
		String docId = request.getParameter("docId");
		String envelopeId = request.getParameter("envelopeId");
		
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: docid = " + ((docId != null) ? docId : ""));
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: envelopeId = " + ((envelopeId != null) ? envelopeId : ""));
		
		// Call DocuSign REST Api
		String jsonResponse = "{\"returncode\": \"0\", \"id\": \"" + docId + "\", \"status\": \"success\"}";
		InputStream is = null;
		HttpSession session = request.getSession();
		boolean loginNeeded = false;
		
		if (session != null && 
				session.getAttribute(Constants.OAUTH_TOKEN) != null &&
					session.getAttribute(Constants.DOCUSIGN_USERID) != null)
		{
			String token = (String) session.getAttribute(Constants.OAUTH_TOKEN);
			String docusignUserId = (String) session.getAttribute(Constants.DOCUSIGN_USERID);
			
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/envelopes/" + envelopeId + "/documents/1");

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded"); 
			conn.setRequestProperty("Authorization", "Bearer " + token);

			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				InputStream error = conn.getErrorStream();
				StringBuilder sb=new StringBuilder();
				BufferedReader br = new BufferedReader(new InputStreamReader(error));
				String read;

				while((read=br.readLine()) != null) {
				    //System.out.println(read);
				    sb.append(read);   
				}

				br.close();
			
//				System.out.println(sb);
				throw new RuntimeException("Get request Failed - HTTP error code: "
						+ conn.getResponseCode() + " " + sb);
			}
			
			is = conn.getInputStream();
		}
		else
		{
			loginNeeded = true;
			jsonResponse = "{\"returncode\": \"-1\", \"errorMessage\": \"Session is null\"}";
			//throw new IllegalStateException("Session object is null!");
		}
		
		if (!loginNeeded){
			if (serverType.equalsIgnoreCase("p8")) {
				synchronized (callbacks.getSynchObject(repositoryId, serverType)) {
					try {
						Subject subject = callbacks.getP8Subject(repositoryId);
						UserContext.get().pushSubject(subject);
						
						ObjectStore objectStore = callbacks.getP8ObjectStore(repositoryId);
						Id tempDocId = new Id(docId);
						
						Document p8DocumentObj = Factory.Document.fetchInstance(objectStore, tempDocId, null);
						p8DocumentObj.checkout(ReservationType.EXCLUSIVE, null, null, p8DocumentObj.getProperties());
						p8DocumentObj.save(RefreshMode.REFRESH);
						
						Document reservation = (Document) p8DocumentObj.get_Reservation();
						
						if (is != null)
						{
							try
							{
								ContentElementList elements = p8DocumentObj.get_ContentElements();
								ContentTransfer prevElement = (ContentTransfer) elements.get(0);
	
								ContentElementList list = Factory.ContentElement.createList();
								ContentTransfer element = Factory.ContentTransfer.createInstance();
								element.set_ContentType("application/pdf");
								element.set_RetrievalName(prevElement.get_RetrievalName());
								element.setCaptureSource(is);
								list.add(element);
								
								reservation.set_ContentElements(list);
								// set mime type to PDF as DocuSign always returns signed document in PDF format
								reservation.set_MimeType("application/pdf");
								reservation.checkin(AutoClassify.DO_NOT_AUTO_CLASSIFY, CheckinType.MAJOR_VERSION);
								
								reservation.getProperties().putValue(Constants.DOCUMENT_SIGNATURE_STATUS, Constants.SIGNATURE_STATUS.CHECKEDIN.getValue());
								reservation.save(RefreshMode.NO_REFRESH);
								
								// unfile the document from staging folder as auto check-in is successful
								P8ConnectionUtil.unfileDocument(objectStore, reservation);
							}
							catch (Exception e)
							{
								callbacks.getLogger().logError(this, methodName, request, e);
							}
						}
					} catch (Exception e) {
						// provide error information
						callbacks.getLogger().logError(this, methodName, request, e);
					}
				}
			} else {
				callbacks.getLogger().logError(this, methodName, request, "Only P8 datastore types are supported at this time.");
			}
		}
		
		// send response to client
		PrintWriter responseWriter = response.getWriter();
		response.setContentType("text/plain");

		responseWriter.print(jsonResponse);
		responseWriter.flush();
		responseWriter.close();
		
		callbacks.getLogger().logExit(this, methodName, request);
	}
}
