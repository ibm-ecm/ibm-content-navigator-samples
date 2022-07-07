/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.tasks;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

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
import com.filenet.api.util.UserContext;
import com.ibm.ecm.task.TaskLogger;
import com.ibm.ecm.task.commonj.work.BaseTask;
import com.ibm.ecm.task.entities.Task;
import com.ibm.ecm.icntasks.p8.*;
import com.ibm.ecm.icntasks.util.TaskUtils;
import com.docusign.esign.client.ApiClient;
import com.docusign.esign.client.ApiException;
import com.docusign.esign.client.auth.OAuth;
import com.ibm.icn.extension.docusign.service.Constants;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;
import com.ibm.icn.extension.docusign.util.P8ConnectionUtil;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

import javax.security.auth.Subject;
import javax.servlet.http.HttpSession;

public class CheckInSignedDocument extends BaseTask {

    static private String CLASS_NAME = "CheckInSignedDocument";

    private String docusignUserID;
    private String docusignAccountID;
    private String docusignIntegratorKey;
    private String docusignPrivateKey;
    private String targetRepositoryId;
    private String adminUserName;
    private String adminPassword;
    private boolean autoCheckIn;
    private String ltpaToken;

    private ObjectStore objectStore;

    public CheckInSignedDocument(Task task, File logDirectory)
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
        ltpaToken = TaskUtils.getSubjectLTPAToken();
        TaskLogger.fine(CLASS_NAME, functionName, "Enter Copy Box File to Case task.");

        try {
            //grabbing information from the task info
            JSONObject taskInfo = JSONObject.parse(task.getTaskInfo());
            addAuditRecord("CheckInSignedDocument TaskInfo", "Triggered by Docusign Autocheckin task", "Start auto checkin of document to P8", taskInfo.toString());

            // get & set task parameters
            getTaskParameters(taskInfo);
            objectStore = P8ConnectionUtil.getTargetOS(adminUserName, adminPassword, targetRepositoryId);
            TaskLogger.fine(CLASS_NAME, functionName, "Object Store selected: " + objectStore.get_Name());

            /*----------------------------------
             *  get envelope status changes
             *----------------------------------*/
            SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
            Date curDate = new Date();
            String from_date = fmt.format(curDate);

            //DocuSign credentials
            String oAuthBasePath = "account-d.docusign.com";
            String basePath = "https://demo.docusign.net/restapi";
            List<String> scopes = new ArrayList<String>();
            scopes.add("signature");
            scopes.add("impersonation");
            OAuth.OAuthToken oAuthToken;

            File privateKeyFile = new File(docusignPrivateKey);
            FileInputStream fin = null;
            byte privateKeyFileContent[] = null;
            try {
                fin = new FileInputStream(privateKeyFile);
                privateKeyFileContent = new byte[(int)privateKeyFile.length()];
                fin.read(privateKeyFileContent);

            } catch (IOException e) {
                throw new Exception("The specified file in file path: '" + docusignPrivateKey + "' was not found.");
            }
            finally {
                if(fin != null){
                    fin.close();
                }
            }

            //get token with APIClient
            ApiClient apiClient = new ApiClient();
            apiClient.setBasePath(basePath);
            apiClient.setOAuthBasePath(oAuthBasePath);

            try {
                oAuthToken = apiClient.requestJWTUserToken(docusignIntegratorKey, docusignUserID, scopes, privateKeyFileContent,3600);
                apiClient.setAccessToken(oAuthToken.getAccessToken(), oAuthToken.getExpiresIn());

                String token = oAuthToken.getAccessToken();
                if (token != null)
                {
                    URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignAccountID + "/envelopes?from_date=" + from_date + "&status=completed");
                    System.out.println("========= url = " + url.toString());
                    JSONObject envelopesReturned = DocuSignUtil.executeGetUrl(url, token);

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

                            checkInSignedDocument(envId,token);
                        }
                    }

                    TaskLogger.fine(CLASS_NAME, functionName, "Returning from performTask method");
                    return;
                }
                else
                {
                    // send fail response response back to client
                    throw new RuntimeException("token is null");
                }

            } catch (ApiException e) {
                //todo: what is fine.
                TaskLogger.severe(CLASS_NAME, functionName, "There was a failure in retrieving token", e);
                throw new Exception("Failed to create APIClient");
            }
        }
        catch (MalformedURLException e) {
            // TODO Auto-generated catch block
            TaskLogger.severe(CLASS_NAME, functionName, "There was a malformed url", e);
            addError(e);
        } catch (ProtocolException e) {
            // TODO Auto-generated catch block
            TaskLogger.severe(CLASS_NAME, functionName, "There was a failure in retrieving token", e);
            addError(e);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            TaskLogger.severe(CLASS_NAME, functionName, "There was a failure in retrieving token", e);
            addError(e);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            TaskLogger.severe(CLASS_NAME, functionName, "There was a failure in retrieving token", e);
            addError(e);
        }
    }


    /*
     * Find the document matching the envelopeid and check-in
     * the signed copy as a new major version to P8
     */
    private void checkInSignedDocument(String envelopeId, String token) throws Exception
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
                if (autoCheckIn)
                {
                    InputStream is = downloadContentFromDocusign(docEnvelopeId, token);

                    if (is != null)
                        checkInDocument(objectStore, doc, is);
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
    private void checkInDocument(ObjectStore os, Document doc, InputStream is) throws Exception
    {
        final String functionName = "checkInDocument";
        TaskLogger.fine(CLASS_NAME, functionName, "Entering method: " + functionName);
        Subject subject = TaskUtils.getSubjectForWAS(ltpaToken);

        if (is != null)
        {
            try
            {
                UserContext.get().pushSubject(subject);
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
            } finally {
                UserContext.get().popSubject();
            }
        }

        TaskLogger.fine(CLASS_NAME, functionName, "Exiting method: " + functionName);
    }


    /*
     * Retrieve document content (as input stream) for an envelope Id from DocuSign system.
     */
    private InputStream downloadContentFromDocusign(String envId, String token)
    {
        final String functionName = "downloadContentFromDocusign";
        TaskLogger.fine(CLASS_NAME, functionName, "Entering method: " + functionName);

        InputStream signedDocument = null;

        try
        {
            URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignAccountID + "/envelopes/" + envId + "/documents/1");

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("Authorization", "Bearer " + token);

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }

            signedDocument = conn.getInputStream();
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
        docusignUserID =  (String) specificTaskRequestJson.get("docusignUserID");
        docusignAccountID =  (String) specificTaskRequestJson.get("docusignAccountID");
        docusignIntegratorKey =  (String) specificTaskRequestJson.get("docusignIntegratorKey");
        docusignPrivateKey =  (String) specificTaskRequestJson.get("docusignPrivateKey");
        adminUserName = (String) specificTaskRequestJson.get("adminUserName");
        adminPassword = (String) specificTaskRequestJson.get("adminPassword");

        //p8Folder = (String) specificTaskRequestJson.get("docusignP8Folder");
        String isAutoCheckIn = (String) specificTaskRequestJson.get("docusignAutocheckInFlag");
        autoCheckIn = Boolean.parseBoolean(isAutoCheckIn);

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