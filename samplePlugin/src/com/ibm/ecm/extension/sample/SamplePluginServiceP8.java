/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.StringTokenizer;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;

import com.filenet.api.core.Document;
import com.filenet.api.core.Domain;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

/**
 * This class contains P8 specific logic for the sample plugin service. It demonstrates using the PluginServiceCallbacks
 * object to get connection information and invoke the P8 API's.
 */
public class SamplePluginServiceP8 {

	public static void writeP8DocumentProperties(HttpServletRequest request, JSONResponse jsonResponse, PluginServiceCallbacks callbacks, String repositoryId, String docId) throws Exception {
		synchronized(callbacks.getSynchObject(repositoryId, "p8")) {
			Subject subject = callbacks.getP8Subject(repositoryId);
			UserContext.get().pushSubject(subject);
			try {
				Domain domain = callbacks.getP8Domain(repositoryId);
				// A P8 docId in Content Navigator is actually three id's separated by commas.
				StringTokenizer docIdTok = new StringTokenizer(docId, ",");
				String classID = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
				String objectStoreID = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
				String objectID = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
				// Retrieve the document
				ObjectStore os = Factory.ObjectStore.fetchInstance(domain, new Id(objectStoreID), null);
				Document document = Factory.Document.fetchInstance(os, objectID, null);
				// Return some interesting system properties
				String documentName = document.get_Name();
				String className = document.getClassName();
				String storageArea = document.get_StorageArea().get_DisplayName();
				String storagePolicy = document.get_StoragePolicy().get_DisplayName();
		
				jsonResponse.put("documentName", documentName);
				jsonResponse.put("className", className);
				jsonResponse.put("storageLocation", storageArea);
				jsonResponse.put("storagePolicy", storagePolicy);
			} finally {
				UserContext.get().popSubject();
			}
		}
	}

}
