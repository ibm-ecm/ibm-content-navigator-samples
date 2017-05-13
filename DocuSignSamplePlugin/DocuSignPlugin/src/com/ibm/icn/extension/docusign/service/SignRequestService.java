/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;

import com.filenet.api.constants.AutoUniqueName;
import com.filenet.api.constants.DefineSecurityParentage;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.core.ReferentialContainmentRelationship;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.icn.extension.docusign.service.Constants;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;
import com.ibm.icn.extension.docusign.util.P8ConnectionUtil;
import com.ibm.icn.extension.docusign.util.ResourceRequestUtil;


public class SignRequestService extends PluginService {
	
	/*****************************************************************************************************************
	 * Navigator Plug-in service to send a document for DocuSign signature
	 * 		Recieves Document Id, To & Cc list, Subject, Email content from the Send Request dialog
	 * 		Calls DocuSign REST APIs to create an envelope for the sign request
	 * 		Returns the envelope Id that is created for the request 
	 ******************************************************************************************************************/
	@Override
	public String getId() {
		return "SignRequestService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) 
			throws Exception 
	{
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		
		// Get p8 document id and other repository details
		String serverType = (String) request.getParameter("serverType");
		String repositoryId = request.getParameter("repositoryId");
		String docId = request.getParameter("docId");
		ObjectStore objectStore = null;
		
		// Get values for DocuSign signature specified in sign request dialog
		String requestBody = ResourceRequestUtil.getRequestBody(request);			
		JSONObject requestBodyJson = (JSONObject) JSON.parse(requestBody);
		
		JSONArray signersInputArray = new JSONArray();		
		JSONArray copiersInputArray = new JSONArray();		
		String emailSubject = (String) requestBodyJson.get("subject");	// passed as Subject
		String emailMessage = (String) requestBodyJson.get("message");	// passed as email content
		String templateId = (String) requestBodyJson.get("templateId");	// template selected from drop-down
		signersInputArray = (JSONArray) requestBodyJson.get("to");		// passed as To-list of sign request dialog
		copiersInputArray = (JSONArray) requestBodyJson.get("cc");		// passed as Cc-list
		
		JSONResultSetResponse jsonResults = new JSONResultSetResponse();
		jsonResults.setPageSize(50);
		
		com.filenet.api.core.Document p8DocumentObj = null;
		String mimeType = null;
		
		Id vsId = null;
		byte[] fileBytes = null;
		
		// This sample assumes the repository type is P8.
		if (serverType.equalsIgnoreCase("p8")) {
			synchronized (callbacks.getSynchObject(repositoryId, serverType)) 
			{
				try 
				{
					// get object store context
					Subject subject = callbacks.getP8Subject(repositoryId);
					UserContext.get().pushSubject(subject);
					objectStore = callbacks.getP8ObjectStore(repositoryId);
					
					// retrieve the p8 document content
					Id tempDocId = new Id(docId);
					p8DocumentObj = Factory.Document.fetchInstance(objectStore, tempDocId, null);
					vsId = p8DocumentObj.get_VersionSeries().get_Id();					
					mimeType = p8DocumentObj.get_MimeType();

					fileBytes = GetDocumentContent.getContentBytes(callbacks, repositoryId, docId, vsId);
				} 
				catch (Exception e) 
				{
					// provide error information
					callbacks.getLogger().logError(this, methodName, request, e);
				}
			}
		} else 
		{
			callbacks.getLogger().logError(this, methodName, request, "Only P8 datastore types are supported at this time.");
		}
		
		// create Json objects required for payload
		JSONObject payloadJson = new JSONObject();		
		JSONArray compositeTemplates = new JSONArray();
		JSONObject compositeTemplate = new JSONObject();
		JSONArray inlineTemplates = new JSONArray();
		
		// create in-line template for recipients
		JSONObject inlineTemplateForRecipients = new JSONObject();
		JSONObject recipients = new JSONObject();
		JSONArray signers = new JSONArray();
		JSONArray carbonCopies = new JSONArray();
		
		for (int i = 0; i < signersInputArray.size(); i++)
		{
			JSONObject signerJson = new JSONObject();
			signerJson.put(Constants.EMAIL, signersInputArray.get(i));
			signerJson.put(Constants.NAME, signersInputArray.get(i));
			signerJson.put(Constants.ROLE_NAME, "Signer" + (i + 1));
			signerJson.put(Constants.RECIPIENT_ID, i+1);
			
			signers.add(signerJson);
		}
		
		for (int i = 0; i < copiersInputArray.size(); i++)
		{
			JSONObject signerJson = new JSONObject();
			signerJson.put(Constants.EMAIL, copiersInputArray.get(i));
			signerJson.put(Constants.NAME, copiersInputArray.get(i));
			signerJson.put(Constants.RECIPIENT_ID, signersInputArray.size() + i + 1);
			
			carbonCopies.add(signerJson);
		}
		
		recipients.put(Constants.SIGNERS, signers);
		recipients.put(Constants.CARBON_COPIES, carbonCopies);
		inlineTemplateForRecipients.put(Constants.SEQUENCE, "3");
		inlineTemplateForRecipients.put(Constants.RECIPIENTS, recipients);
		
        // create in-line template for document
        JSONObject inlineTemplateForDocument = new JSONObject();
        JSONArray documents = new JSONArray();
        String base64Doc = DatatypeConverter.printBase64Binary(fileBytes);

        JSONObject document = new JSONObject();
        document.put(Constants.DOCUMENTS_BASE64, base64Doc);

        // add the document id of the document from the template
        String documentId = getDocumentIdFromTemplate(request, templateId);

        document.put(Constants.DOCUMENT_ID, documentId);
        document.put(Constants.NAME, p8DocumentObj.getProperties().getStringValue("DocumentTitle"));
		
        // Check if the incoming doc extension is .docx
        // default extension supports pdf documents
        if (mimeType.equals(Constants.DOCX_EXTENSION))
        {
        	document.put(Constants.FILE_EXTENSION, "docx");
        }
        documents.add(document);

        inlineTemplateForDocument.put(Constants.SEQUENCE, "1");
        inlineTemplateForDocument.put(Constants.DOCUMENTS, documents);
        inlineTemplates.add(inlineTemplateForRecipients);
        inlineTemplates.add(inlineTemplateForDocument);
		
		// create server template
		JSONArray serverTemplates = new JSONArray();
		JSONObject serverTemplate = new JSONObject();
		serverTemplate.put(Constants.SEQUENCE, "2");
		serverTemplate.put(Constants.TEMPLATE_ID, templateId);
		serverTemplates.add(serverTemplate);

		compositeTemplate.put(Constants.COMPOSITE_TEMPLATE_ID, "1");
		compositeTemplate.put(Constants.INLINE_TEMPLATES, inlineTemplates);
		compositeTemplate.put(Constants.SERVER_TEMPLATES, serverTemplates);
		compositeTemplates.add(compositeTemplate);
		
		payloadJson.put(Constants.STATUS, "sent");
		payloadJson.put(Constants.EMAIL_SUB, emailSubject);
		payloadJson.put(Constants.EMAIL_MSG, emailMessage);
		payloadJson.put(Constants.COMPOSITE_TEMPLATES, compositeTemplates);
		
		callbacks.getLogger().logDebug(this, methodName, request, "json payload sent = " + payloadJson.toString());
		System.out.println("==========");
		System.out.println("~~~~~~~ mimeType = " + mimeType);
		System.out.println(payloadJson.toString());
		System.out.println("==========");
		String jsonResponse = null;
		HttpSession session = request.getSession();
		JSONObject resultJson = null;
		
		if (session != null && 
				session.getAttribute("oAuthToken") != null &&
					session.getAttribute("docusignUserId") != null)
		{
			String token = (String) session.getAttribute("oAuthToken");
			String docusignUserId = (String) session.getAttribute("docusignUserId");
			
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/envelopes");
			System.out.println("---- url executed : " + url.toString());
			resultJson = DocuSignUtil.executePostUrl(url, token, payloadJson);
			
			// update document document meta-data with envelope Id
			// and, set the sign status to 'sent'
			String envelopeId;
			envelopeId = (String) resultJson.get("envelopeId");
			p8DocumentObj.getProperties().putValue(Constants.DOCUMENT_SIGNATURE_STATUS, Constants.SIGNATURE_STATUS.SENT.getValue());
			p8DocumentObj.getProperties().putValue(Constants.ENVELOPE_ID, envelopeId);
			p8DocumentObj.save(RefreshMode.NO_REFRESH);	

			// create a document reference for document in staging folder to 
			// scope searching of documents sent to DocuSign for signatures 
			Folder stagingFolder = P8ConnectionUtil.getP8StagingFolder(objectStore);
		    
			ReferentialContainmentRelationship rcr = stagingFolder.file(p8DocumentObj,
			        AutoUniqueName.AUTO_UNIQUE, p8DocumentObj.getProperties().getStringValue("DocumentTitle"),
			        DefineSecurityParentage.DO_NOT_DEFINE_SECURITY_PARENTAGE);
			rcr.save(RefreshMode.NO_REFRESH);
			
			// send Response back to client
			jsonResponse = "{\"returncode\": \"0\", \"envelopeId\": \"" + envelopeId + "\", \"status\": 2}";	// sent has integer value 2
		}
		else
		{
			jsonResponse = "{\"returncode\": \"-1\", \"errorMessage\": \"Session is null\"}";
		}
		
		PrintWriter responseWriter = response.getWriter();
		response.setContentType("text/plain");
		responseWriter.print(jsonResponse);
		responseWriter.flush();
		responseWriter.close();
        
		callbacks.getLogger().logExit(this, methodName, request);
	}
	
    private String getDocumentIdFromTemplate(HttpServletRequest request, String templateId) throws IOException
    {
            String documentId = null;
            JSONObject documentsJson = null;

            HttpSession session = request.getSession();
            if (session != null &&
                            session.getAttribute("oAuthToken") != null &&
                                    session.getAttribute("docusignUserId") != null)
            {
                    String token = (String) session.getAttribute("oAuthToken");
                    String docusignUserId = (String) session.getAttribute("docusignUserId");

                    URL templateDocumentUrl =  new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/templates/" + templateId + "/documents");
                    documentsJson = DocuSignUtil.executeGetUrl(templateDocumentUrl, token);

                    JSONArray documents = (JSONArray) documentsJson.get("templateDocuments");
                    JSONObject docJson = (JSONObject) documents.get(0);
                    documentId = (String) docJson.get("documentId");
            }
            else
            {
                    return null;
            }

            return documentId;
    }

}