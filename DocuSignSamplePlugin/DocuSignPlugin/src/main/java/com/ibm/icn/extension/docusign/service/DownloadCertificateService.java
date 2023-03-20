package com.ibm.icn.extension.docusign.service;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.channels.WritableByteChannel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.filenet.api.util.Id;
import com.ibm.ecm.extension.PluginDocumentContent;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.serviceability.Logger;
import com.ibm.icn.extension.docusign.util.DocuSignUtil;
import com.ibm.json.java.JSONObject;

public class DownloadCertificateService extends PluginService {
	String certificateUri;
	static final boolean useNio = Boolean.valueOf(System.getProperty("com.ibm.ecm.struts.actions.p8.useNio", "true"));
	static final boolean useBufferedIo = Boolean.valueOf(System.getProperty("com.ibm.ecm.struts.actions.p8.useBufferedIo", "false"));
	
	@Override
	public String getId() {
		return "DownloadCertificateService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);
		certificateUri = (String) request.getParameter("certificateUri");
		callbacks.getLogger().logDebug(this, methodName, request, "Request Parameter: certificateUri = " + certificateUri);
		HttpSession session = request.getSession();

		if (session != null &&
				session.getAttribute(Constants.OAUTH_TOKEN) != null &&
				session.getAttribute(Constants.DOCUSIGN_ACCOUNTID) != null)
		{
			String token = (String) session.getAttribute(Constants.OAUTH_TOKEN);
			String docusignAccountId = (String) session.getAttribute(Constants.DOCUSIGN_ACCOUNTID);
			
			URL url = new URL("https://demo.docusign.net/restapi/v2/accounts/" + docusignAccountId + certificateUri);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("GET");
			conn.setDoOutput(true);
			conn.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded"); 
			conn.setRequestProperty("Authorization", "Bearer " + token);
			if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
				throw new RuntimeException("Get request Failed - HTTP error code: "
						+ conn.getResponseCode());
			}
			
			response.setContentLength(conn.getContentLength());
			response.setContentType("blob");
			response.setHeader("Content-Disposition", "attachment;filename=Certificate.pdf");
			writeContent(conn.getInputStream(), response.getOutputStream());
	        // disconnect the HttpURLConnections
			conn.disconnect();
		}
				
		callbacks.getLogger().logExit(this, methodName, request);
	}
	
	void writeContent(InputStream inStream, OutputStream outStream) throws IOException {
		String methodName = "writeContent";
		try {
			if (inStream != null) {
				byte[] buf = new byte[4096];
				int len = inStream.read(buf);
				while (len != -1) {
					outStream.write(buf, 0, len);
					len = inStream.read(buf);
				}
				outStream.flush();
			}
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				inStream.close();
			} catch (IOException e) {

			}
			try {
				outStream.close();
			} catch (IOException e) {

			}
		}
	}
}
