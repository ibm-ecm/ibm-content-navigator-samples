/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.event.annotations.TopicAnnotation;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

/**
 * This service is invoked by SamplePluginAction. It will invoke the OD, P8, CM or CMIS API's to obtain system-related
 * details about a document and return those details in JSON.
 */
public class SamplePluginService extends PluginService {

	@Override
	public String getId() {
		return "samplePluginService";
	}

	@Override
	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";

		callbacks.getLogger().logEntry(this, methodName, request);

		// Get the parameters.  (Note, you might want to add additional error handling for missing parameters.)
		String serverType = request.getParameter("serverType");
		String serverName = request.getParameter("server");
		String folderName = request.getParameter("folder");
		int ndocs = Integer.parseInt(request.getParameter("ndocs"));

		callbacks.getLogger().logDebug(this, methodName, request, "server type: " + serverType + ", server: " + serverName + ", folder: " + folderName);

		try {
			Date date = callbacks.getLogger().logPerf(this, methodName, request);

			JSONResponse jsonResponse = new JSONResponse();
			for (int i = 0; i < ndocs; i++) {
				String docId = request.getParameter("docId" + i);

				callbacks.getLogger().logInfo(this, methodName, request, "docId: " + docId);
				if (serverType.equals("od")) {
					SamplePluginServiceOD.writeODHitProperties(request, jsonResponse, callbacks, serverName, folderName, docId);
				} else if (serverType.equals("p8")) {
					SamplePluginServiceP8.writeP8DocumentProperties(request, jsonResponse, callbacks, serverName, docId);
				} else if (serverType.equals("cm")) {
					SamplePluginServiceCM.writeCMItemProperties(request, jsonResponse, callbacks, serverName, docId);
				} else if (serverType.equals("cmis")) {
					SamplePluginServiceCMIS.writeCMItemProperties(request, jsonResponse, callbacks, serverName, docId);
				} else if (serverType.equals("box")) {
					SamplePluginServiceBox.writeBoxItemProperties(request, jsonResponse, callbacks, serverName, docId);
				}
			}
			
			// Write results to response
			PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "samplePluginService");
			callbacks.getLogger().logPerf(this, methodName, request, date);

			callbacks.sendMessage(jsonResponse, new TopicAnnotation("SamplePlugin:samplePluginService"));
		} catch (Exception e) {
			// provide error information
			callbacks.getLogger().logError(this, methodName, request, e);
		}
		callbacks.getLogger().logExit(this, methodName, request);
	}

}
