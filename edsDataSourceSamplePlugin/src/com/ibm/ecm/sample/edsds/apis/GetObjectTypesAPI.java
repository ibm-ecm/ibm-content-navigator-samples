/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.sample.edsds.apis;

import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginAPI;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 *
 */
public class GetObjectTypesAPI extends PluginAPI {

	/**
	 * Returns the unique identifier for this API.
	 * 
	 * @return A <code>String</code> that is used to identify the API.
	 */
	@Override
	public String getId() {
		return "GetObjectTypesAPI";
	}

	/**
	 * Performs the action of this API.
	 * 
	 * @param callbacks
	 *            An instance of the <code>PluginServiceCallbacks</code> class that contains several functions that can
	 *            be used by the plug-in API. These functions provide access to the plug-in configuration and content
	 *            server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> from the current request being processed. The service can access
	 *            the invocation parameters from the request as well as session state.
	 * @param arguments
	 *            An object array containing the input arguments to the API. The particular structure of these objects are
	 *            defined by the plug-in API writer. The classes of the objects used as arguments should be J2SE classes
	 *            or instances of com.ibm.json.java as any plug-in specific classes will be loaded by different
	 *            classloaders causing class cast exceptions when attempting to pass instances from one plug-in to
	 *            another.
	 * @return An object containing the response the API. This object can be of any structure and is defined by the
	 *          plug-in API writer. The class of the object should be a J2SE class or instance of com.ibm.ecm.json as
	 *          any plug-in specific classes will be loaded by different classloaders causing class cast exceptions when
	 *          attempting to use the object by the invoker.
	 * @throws Exception
	 *             For exceptions that occur when the API is running. If the logging level is high enough to log errors,
	 *             information about the exception is logged by IBM Content Navigator.
	 */
	@Override
	public Object execute(PluginServiceCallbacks callbacks, HttpServletRequest request, Object[] arguments) throws Exception {
		String methodName = "execute";
		PluginLogger logger = callbacks.getLogger();
		logger.logEntry(this, methodName, request);

		if (arguments == null || arguments.length == 0 || arguments[0] == null || !(arguments[0] instanceof JSONObject)) {
			throw new IllegalArgumentException("The arguments are invalid.");
		}

		String repositoryId = null;
		JSONObject argumentsJson = (JSONObject) arguments[0];
		if (argumentsJson.containsKey("repositoryId")) {
			repositoryId = (String) argumentsJson.get("repositoryId");
		}

		if (repositoryId == null || repositoryId.isEmpty()) {
			throw new IllegalArgumentException("The repositoryId value is null or empty.");
		}

		logger.logDebug(this, methodName, request, "repositoryId = " + repositoryId);
		
		String param1String = null;
		String configuration = callbacks.loadConfiguration();
		if (configuration != null && !configuration.isEmpty()) {
			JSONObject jsonConfiguration = JSONObject.parse(configuration);
			if (jsonConfiguration.containsKey("param1Field")) {
				param1String = (String) jsonConfiguration.get("param1Field");
			}
		}
		
		// Note: This sample is not using the repositoryId parameter. It is simply returning the same list of object types regardless of repository.
		// The objectType of a Box metadata template is its ID, which is composed of the template key and template scope (aka enterprise ID),
		// e.g., "myTemplate,enterise_123456". If you wish to use the same property data for a template that is replicated in multiple enterprises,
		// simply parse the ID on the comma and use the first part (i.e., myTemplate) as the symbolicName in the ObjectTypes.json file.
		String fullResourceName = "com/ibm/ecm/sample/edsds/data/ObjectTypes.json";
		logger.logDebug(this, methodName, request, "Attempting to load resource: " + fullResourceName);
		
		InputStream objectTypesStream = this.getClass().getClassLoader().getResourceAsStream(fullResourceName);
		if (objectTypesStream == null) {
			throw new RuntimeException("Unable to load the data file.");
		}
		
		JSONArray jsonResponse = JSONArray.parse(objectTypesStream);
		logger.logExit(this, methodName, request, "Returning: " + (jsonResponse != null ? jsonResponse.toString() : "null"));
		return jsonResponse;
	}

}
