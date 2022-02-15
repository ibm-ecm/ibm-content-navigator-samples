/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import com.filenet.api.util.Id;
import com.ibm.ecm.extension.PluginDocumentContent;
import com.ibm.ecm.extension.PluginServiceCallbacks;

public class GetDocumentContent {

	public static byte[] getContentBytes(PluginServiceCallbacks callbacks, String repositoryId, String docId,
			 Id vsId) 
	{

		PluginDocumentContent docContent;
		byte[] contentInBytes = null;
		
		try {
			 docContent = callbacks.retrieveDocumentContent(repositoryId, "p8", docId, 0, vsId.toString(), "current", null, 0, false);
			 contentInBytes = getByteArray(docContent.getInputStream());;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return contentInBytes;
	}
	
	private static byte[] getByteArray(InputStream is)
	{
		ByteArrayOutputStream buff = new ByteArrayOutputStream();

		try {
			int readData;
			byte[] data = new byte[16384];

			while ((readData = is.read(data, 0, data.length)) != -1) {
			  buff.write(data, 0, readData);
			}

			buff.flush();
		} 
		catch (IOException e) 
		{
			// ignore
		}

		return buff.toByteArray();
	}
}