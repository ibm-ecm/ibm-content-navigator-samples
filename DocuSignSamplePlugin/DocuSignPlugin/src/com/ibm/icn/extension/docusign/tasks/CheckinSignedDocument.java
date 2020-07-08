/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.tasks;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import com.filenet.api.collection.ContentElementList;
import com.filenet.api.collection.DocumentSet;
import com.filenet.api.constants.AutoClassify;
import com.filenet.api.constants.CheckinType;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.constants.ReservationType;
import com.filenet.api.core.ContentTransfer;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;
import com.ibm.ecm.task.TaskLogger;
import com.ibm.ecm.task.commonj.work.BaseTask;
import com.ibm.ecm.task.entities.Task;
import com.ibm.icn.extension.docusign.service.Constants;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;
import com.ibm.icn.extension.docusign.util.P8ConnectionUtil;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class CheckinSignedDocument extends BaseTask {

	static private String CLASS_NAME = "CheckinSignedDocument";

	private String docusignUserName;
	private String docusignPassword;
	private String docusignIntegratorKey;
	private String targetRepositoryId;
	private boolean autoCheckin;
	
	private ObjectStore objectStore;
	private String creds;
	private String docusignUserId;
	
	public CheckinSignedDocument(Task task, File logDirectory)
			throws IOException {
		super(task, logDirectory);
	}

	/*
	 * Actual method that retrieves document for a given envelope id from DocuSign system.
	 * The retrieved document stream is checked-in as major version in P8.
	 * This method is invoked asynchronously based on the task schedule created in Navigator
	 */
	@Override
	public void performTask(){
		final String functionName = "performTask";
		TaskLogger.fine(CLASS_NAME, functionName, "Enter Copy Box File to Case task.");

		try {
			//grabbing information from the task info
			JSONObject taskInfo = JSONObject.parse(task.getTaskInfo());
			addAuditRecord("CheckinSignedDocument TaskInfo", "Triggered by Docusign autocheckin task", "Start auto checkin of document to P8", taskInfo.toString());
			
			// get task parameters
			getTaskParameters(taskInfo);
			objectStore = P8ConnectionUtil.getTargetOS(targetRepositoryId);
			
			TaskLogger.fine(CLASS_NAME, functionName, "Object Store selected: " + objectStore.get_Name());
			
			/*----------------------------------
			 *  get envelope status changes
			 *----------------------------------*/
			SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
			Date curDate = new Date();
			String from_date = fmt.format(curDate);
			
			creds = "{\"Username\":\"" +  docusignUserName + 
								"\",\"Password\":\"" + docusignPassword + 
								"\",\"IntegratorKey\":\"" + docusignIntegratorKey + 
							"\"}";
			
			docusignUserId = getUserId(docusignUserName, docusignPassword, docusignIntegratorKey);
			
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/envelopes?from_date=" + from_date + "&status=completed");
			
			System.out.println("========= url = " + url.toString());
			
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("X-DocuSign-Authentication", creds);
			
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			String restResponse = "";
			while ((line = br.readLine()) != null) {
				restResponse = restResponse.concat(line);
			}
			
			TaskLogger.fine(CLASS_NAME, functionName, "Envelopes with completed signatures: " + restResponse);
			
			JSONObject envelopesReturned = JSONObject.parse(restResponse);
			int envelopesCount = Integer.parseInt((String) envelopesReturned.get("resultSetSize"));
			JSONArray envelopes = (JSONArray) envelopesReturned.get("envelopes");
			
			if (envelopesCount == 0)
			{
				TaskLogger.fine(CLASS_NAME, functionName, "No envelopes with 'completed' status");
				return;
			}
			
			for (int i = 0; i < envelopes.size(); i++)
			{
				JSONObject envelope = (JSONObject) envelopes.get(i);
				String env_status = (String) envelope.get("status");
				
				if (env_status.equals("completed"))
				{
					String envId = (String) envelope.get("envelopeId");
					
					checkinSignedDocument(envId);
				}
			}
			
			TaskLogger.fine(CLASS_NAME, functionName, "Returning from performTask method");
			return;
		}
		catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			addError(e);
		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			addError(e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			addError(e);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			addError(e);
		}
	}
	

	/*
	 * Find the document matching the envelopeid and check-in
	 * the signed copy as a new major version to P8
	 */	
	private void checkinSignedDocument(String envelopeId) throws Exception 
	{
		Document doc = null;

		Folder stagingFolder = Factory.Folder.fetchInstance(objectStore, "/" + Constants.DOCUSIGN_STAGING_FOLDER, null);
		DocumentSet docSet = stagingFolder.get_ContainedDocuments();
		
		Iterator<?> documents = docSet.iterator();
		while (documents.hasNext())
		{
			doc = (Document) documents.next();
			String docEnvelopeId = getDocumentEnvelopeId(doc);
			if (docEnvelopeId == null)
				continue;
			int docSignStatus = getDocumentSignStatus(doc);
			
			if (docEnvelopeId.equals(envelopeId) &&
					docSignStatus != Constants.SIGNATURE_STATUS.CHECKEDIN.getValue())
			{
				if (autoCheckin)
				{
					InputStream is = downloadContentFromDocusign(docEnvelopeId, creds);
					
					if (is != null)
						checkinDocument(objectStore, doc, is);			
				}
				else
				{
					doc.getProperties().putValue("DSSignatureStatus", Constants.SIGNATURE_STATUS.COMPLETED.getValue());
					doc.save(RefreshMode.NO_REFRESH);
				}
			}	
		}
	}

	
	/*
	 * Check-in the document as major version in P8.
	 */
	@SuppressWarnings("unchecked")
	private void checkinDocument(ObjectStore os, Document doc, InputStream is) throws Exception 
	{
		final String functionName = "checkinDocument";
		TaskLogger.fine(CLASS_NAME, functionName, "Entering method: " + functionName);
		
		if (is != null)
		{
			try
			{		
				Id vsId = doc.get_VersionSeries().get_Id();	
				doc.checkout(ReservationType.EXCLUSIVE, vsId, doc.getClassName(), doc.getProperties());
				doc.save(RefreshMode.REFRESH);
				
				Document reservation = (Document) doc.get_Reservation();
				
				ContentElementList elements = doc.get_ContentElements();
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
				
				reservation.getProperties().putValue("DSSignatureStatus", Constants.SIGNATURE_STATUS.CHECKEDIN.getValue());
				
				reservation.save(RefreshMode.NO_REFRESH);
				
				// unfile the document from staging folder as auto check-in is successful
				P8ConnectionUtil.unfileDocument(os, reservation);

			}
			catch (ClassCastException e)
			{
				e.printStackTrace();
			}
			catch (IndexOutOfBoundsException e)
			{
				e.printStackTrace();
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
		}
		
		TaskLogger.fine(CLASS_NAME, functionName, "Exiting method: " + functionName);
	}


	/*
	 * Retrieve document content (as input stream) for an envelope Id from DocuSign system.
	 */
	private InputStream downloadContentFromDocusign(String envId, String creds) 
	{
		final String functionName = "downloadContentFromDocusign";
		TaskLogger.fine(CLASS_NAME, functionName, "Entering method: " + functionName);
		
		InputStream signedDocument = null;
		
		try 
		{
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignUserId + "/envelopes/" + envId + "/documents/1");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("X-DocuSign-Authentication", creds);
			
			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}
			
			signedDocument = (InputStream) conn.getContent();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		TaskLogger.fine(CLASS_NAME, functionName, "Exiting method: " + functionName);
		return signedDocument;
	}

	/*
	 * Get task parameters for a Navigator Task provided at task configuration.
	 */
	private void getTaskParameters(JSONObject taskInfo) 
	{
		final String functionName = "getTaskParameters";
		
		TaskLogger.fine(CLASS_NAME, functionName, "Entering method: " + functionName);
		
		JSONObject specificTaskRequestJson = (JSONObject) taskInfo.get("specificTaskRequest");
		
		targetRepositoryId =  (String) specificTaskRequestJson.get("targetRepositoryId");
		docusignUserName =  (String) specificTaskRequestJson.get("docusignUserName");
		docusignPassword =  (String) specificTaskRequestJson.get("docusignPassword");
		docusignIntegratorKey =  (String) specificTaskRequestJson.get("docusignIntegratorKey");
		//p8Folder = (String) specificTaskRequestJson.get("docusignP8Folder");
		String isAutoCheckin = (String) specificTaskRequestJson.get("docusignAutocheckinFlag");
		autoCheckin = Boolean.parseBoolean(isAutoCheckin);
		
		TaskLogger.fine(CLASS_NAME, functionName, "Exiting method: " + functionName);
	}
	

	/*
	 * Get the document signature status property value.
	 */
	private int getDocumentSignStatus(Document doc) 
	{		
		return doc.getProperties().getInteger32Value(Constants.DOCUMENT_SIGNATURE_STATUS);
	}
	

	/*
	 * Get the document signature status property value.
	 */
	private String getDocumentEnvelopeId(Document doc) 
	{
		return doc.getProperties().getStringValue(Constants.ENVELOPE_ID);
	}
	
	
	/*
	 * Get the docusign account Id that is required in the DocuSign Rest API calls.
	 * 
	 * Takes user, password and client_id
	 * Returns user id string as response  
	 */
	private String getUserId(String user, String password, String docusignIntegratorKey) throws IOException 
	{
		// create X-DocuSign-Authentication header string
		String creds = DocuSignUtil.getDocusignCredentialHeader(user, password, docusignIntegratorKey);
		
		return DocuSignUtil.getAccountId(creds);
	}
}