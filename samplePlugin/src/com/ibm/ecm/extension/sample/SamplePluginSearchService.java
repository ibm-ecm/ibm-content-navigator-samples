/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResultSetResponse;

/**
 * This class contains the common logic for the sample plugin search service. It demonstrates using the
 * PluginServiceCallbacks object to get connection information for P8 and CM8 connections, synchronizing access to those
 * repository objects, compressing and sending a JSONResultSetResponse or a JSON error.
 */
public class SamplePluginSearchService extends PluginService {

	public static final String REPOSITORY_ID = "repositoryId";
	public static final String REPOSITORY_TYPE = "repositoryType";
	public static final String QUERY = "query";

	public String getId() {
		return "samplePluginSearchService";
	}

	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);

		String repositoryId = request.getParameter(REPOSITORY_ID);
		String repositoryType = request.getParameter(REPOSITORY_TYPE);
		String query = request.getParameter(QUERY);

		JSONResultSetResponse jsonResults = new JSONResultSetResponse();
		jsonResults.setPageSize(350);

		try {
			if (repositoryType.equals("p8")) {
				Subject subject = callbacks.getP8Subject(repositoryId);
				UserContext.get().pushSubject(subject);
			}

			Object synchObject = callbacks.getSynchObject(repositoryId, repositoryType);
			if (synchObject != null) {
				synchronized (synchObject) {
					if (repositoryType.equals("cm")) {
						SamplePluginSearchServiceCM.executeCMSearch(repositoryId, query, callbacks, jsonResults, request.getLocale());
					} else if (repositoryType.equals("p8")) {
						SamplePluginSearchServiceP8.executeP8Search(repositoryId, query, callbacks, jsonResults, request.getLocale());
					}
				}
			} else {
				if (repositoryType.equals("cm")) {
					SamplePluginSearchServiceCM.executeCMSearch(repositoryId, query, callbacks, jsonResults, request.getLocale());
				} else if (repositoryType.equals("p8")) {
					SamplePluginSearchServiceP8.executeP8Search(repositoryId, query, callbacks, jsonResults, request.getLocale());
				}
			}

			// Write results to response
			PluginResponseUtil.writeJSONResponse(request, response, jsonResults, callbacks, "samplePluginSearchService");

		} catch (Exception e) {
			// provide error information
			callbacks.getLogger().logError(this, methodName, request, e);

			JSONMessage jsonMessage = new JSONMessage(0, e.getMessage(), "This error may occur if the search string is invalid.", "Ensure the search string is the correct syntax.", "Check the IBM Content Navigator logs for more details.", "");
			jsonResults.addErrorMessage(jsonMessage);
			PluginResponseUtil.writeJSONResponse(request, response, jsonResults, callbacks, "samplePluginSearchService");
		} finally {
			if (repositoryType.equals("p8")) {
				UserContext.get().popSubject();
			}

			callbacks.getLogger().logExit(this, methodName, request);
		}
	}
}
