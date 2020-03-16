/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginDocumentContent;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;

/**
 * This serice is used by SamplePluginImageViewer to retrieve the content of image documents for display.
 */
public class SamplePluginGetContentService extends PluginService {

	public static final String REPOSITORY_ID = "repositoryId";
	public static final String REPOSITORY_TYPE = "repositoryType";
	public static final String DOCUMENT_ID = "docid";
	public static final String ALT_OUTPUT = "alt_output";
	public static final String P8_VSID = "vsId";
	public static final String P8_VERSION = "version";
	public static final String OD_FOLDER_NAME = "template_name";
	public static final String CM_BOOKMARKS = "cmBookmarks";
	public static final String CM_ANNOTATION_POSITION = "cmAnnotationPosition";
	public static final String PART_NUMBER = "part_number";
	public static final String OD_SEGMENT_NUM = "odSegmentNumber";
	public static final String OD_ASCII_TRANSFORM = "odConvertToAscii";

	public String getId() {
		return "samplePluginGetContentService";
	}

	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter(REPOSITORY_ID);
		String repositoryType = request.getParameter(REPOSITORY_TYPE);

		Object synchObject = callbacks.getSynchObject(repositoryId, repositoryType);
		if (synchObject != null) {
			synchronized (synchObject) {
				executeS(callbacks, request, response, repositoryId, repositoryType);
			}
		} else {
			executeS(callbacks, request, response, repositoryId, repositoryType);
		}
	}

	private void executeS(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response, String repositoryId, String repositoryType) throws Exception {
		String documentId = request.getParameter(DOCUMENT_ID);
		int partNum = toInt(request.getParameter(PART_NUMBER), PART_NUMBER, 0);
		String p8VsId = request.getParameter(P8_VSID);
		String p8Version = request.getParameter(P8_VERSION);
		String odFolderName = request.getParameter(OD_FOLDER_NAME);
		int odSegmentNum = toInt(request.getParameter(OD_SEGMENT_NUM), OD_SEGMENT_NUM, 0);
		boolean odAsciiTransform = toBoolean(request.getParameter(OD_ASCII_TRANSFORM), false);
		String altOutput = request.getParameter(ALT_OUTPUT);

		if (altOutput != null && altOutput.equalsIgnoreCase("native")) {
			PluginDocumentContent content = callbacks.retrieveDocumentContent(repositoryId, repositoryType, documentId, partNum, p8VsId, p8Version, odFolderName, odSegmentNum, odAsciiTransform);
			if (content != null) {
				response.setContentType(content.getContentType());
				InputStream is = content.getInputStream();
				OutputStream os = response.getOutputStream();
				transferData(is, os);
				os.flush();
				os.close();
			}
		} else {
			JSONResponse jsonResponse = new JSONResponse();
			try {
				PluginDocumentContent content = callbacks.retrieveDocumentContent(repositoryId, repositoryType, documentId, partNum, p8VsId, p8Version, odFolderName, odSegmentNum, odAsciiTransform);
				int testByte = -1;

				if (content != null) {
					InputStream is = content.getInputStream();
					testByte = is.read();
				}

				if (testByte >= 0) { // Yes, there is content.
					StringBuffer imageUrl = new StringBuffer();
					imageUrl.append(request.getContextPath() + request.getServletPath() + request.getPathInfo());
					imageUrl.append("?").append(DOCUMENT_ID).append("=").append(URLEncoder.encode(documentId, "UTF-8"));
					imageUrl.append("&").append(REPOSITORY_ID).append("=").append(URLEncoder.encode(repositoryId, "UTF-8"));
					imageUrl.append("&").append(REPOSITORY_TYPE).append("=").append(repositoryType);
					imageUrl.append("&").append(PART_NUMBER).append("=").append(String.valueOf(partNum));
					imageUrl.append("&").append(OD_SEGMENT_NUM).append("=").append(String.valueOf(odSegmentNum));
					imageUrl.append("&").append(OD_ASCII_TRANSFORM).append("=").append(String.valueOf(odAsciiTransform));
					appendConditional(imageUrl, "&", P8_VSID, p8VsId, true);
					appendConditional(imageUrl, "&", P8_VERSION, p8Version, false);
					appendConditional(imageUrl, "&", OD_FOLDER_NAME, odFolderName, true);
					imageUrl.append("&").append(ALT_OUTPUT).append("=native");
					jsonResponse.put("imageUrl", imageUrl.toString());
				} else {
					String message = (content != null ? "The content of the document could not be read." : "The document could not be retrieved.");
					JSONMessage jsonMsg = new JSONMessage(0, message, null, null, null, null);
					jsonResponse.addErrorMessage(jsonMsg);
				}
			} catch (Exception exc) {
				JSONMessage message = new JSONMessage(0, "The document could not be retrieved.  Details have been written to the server error log.", null, null, null, null);
				jsonResponse.addErrorMessage(message);
				exc.printStackTrace();
			}

			PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "samplePluginGetContentService");
		}
	}

	private void appendConditional(StringBuffer imageUrl, String separator, String key, String value, boolean urlEncode) throws UnsupportedEncodingException {
		if (value != null) {
			imageUrl.append(separator).append(key).append("=");
			if (urlEncode) {
				imageUrl.append(URLEncoder.encode(value, "UTF8"));
			} else {
				imageUrl.append(value);
			}
		}
	}

	private void transferData(InputStream is, OutputStream os) throws IOException {
		byte buf[] = new byte[4096];
		int nRead = is.read(buf);
		while (nRead >= 0) {
			if (nRead > 0) {
				os.write(buf, 0, nRead);
			}
			nRead = is.read(buf);
		}
	}

	private byte[] retrieveImageBytes(PluginServiceCallbacks callbacks, PluginDocumentContent content) throws Exception {
		byte[] imageBytes = null;

		if (content != null) {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			InputStream is = content.getInputStream();

			transferData(is, baos);
			imageBytes = baos.toByteArray();
		}

		return imageBytes;
	}

	private int toInt(String value, String paramName, int defaultValue) {
		int returnValue = defaultValue;
		if (value != null) {
			try {
				returnValue = Integer.parseInt(value);
			} catch (NumberFormatException nfe) {
				System.err.println(paramName + " value " + value + " is invalid.");
			}
		}

		return returnValue;
	}

	private boolean toBoolean(String value, boolean defaultValue) {
		boolean returnValue = defaultValue;
		if (value != null) {
			returnValue = Boolean.valueOf(value);
		}

		return returnValue;
	}
}
