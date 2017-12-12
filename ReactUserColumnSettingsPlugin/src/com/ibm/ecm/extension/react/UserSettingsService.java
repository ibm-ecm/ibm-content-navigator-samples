package com.ibm.ecm.extension.react;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONObject;

/**
 * Provides an abstract class that is extended to create a class implementing
 * each service provided by the plug-in. Services are actions, similar to
 * servlets or Struts actions, that perform operations on the IBM Content
 * Navigator server. A service can access content server application programming
 * interfaces (APIs) and Java EE APIs.
 * <p>
 * Services are invoked from the JavaScript functions that are defined for the
 * plug-in by using the <code>ecm.model.Request.invokePluginService</code>
 * function.
 * </p>
 * Follow best practices for servlets when implementing an IBM Content Navigator
 * plug-in service. In particular, always assume multi-threaded use and do not
 * keep unshared information in instance variables.
 */
public class UserSettingsService extends PluginService {

	/**
	 * Returns the unique identifier for this service.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * </p>
	 * 
	 * @return A <code>String</code> that is used to identify the service.
	 */
	public String getId() {
		return "UserSettingsServiceReact";
	}

	/**
	 * Performs the action of this service.
	 * 
	 * @param callbacks
	 *            An instance of the <code>PluginServiceCallbacks</code> class
	 *            that contains several functions that can be used by the
	 *            service. These functions provide access to the plug-in
	 *            configuration and content server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> object that provides the
	 *            request. The service can access the invocation parameters from
	 *            the request.
	 * @param response
	 *            The <code>HttpServletResponse</code> object that is generated
	 *            by the service. The service can get the output stream and
	 *            write the response. The response must be in JSON format.
	 * @throws Exception
	 *             For exceptions that occur when the service is running. If the
	 *             logging level is high enough to log errors, information about
	 *             the exception is logged by IBM Content Navigator.
	 */
	public void execute(PluginServiceCallbacks callbacks,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// Log execution
		PluginLogger logger = callbacks.getLogger();
		logger.logEntry(this, "execute");
		JSONResponse jsonResponse = new JSONResponse();
		
		// Check to make sure the request includes necessary parameters.  Then read the the request action to either save new user settings for columns displayed or retrieve saved settings.
		try {
			if (validateServiceRequest(callbacks, request, jsonResponse)) {
				// Parameter sent from the client in the request
				String userSettingsAction = request.getParameter("userSettingsAction");
				String userSettingsKey = request.getParameter("userSettingsKey");
				
				if (userSettingsAction.equalsIgnoreCase("save")) {
					// Settings data sent along with the request from the client.
					String userSettings = request.getParameter("userSettings");
					
					Util.updateRepoUserSavedSettings(callbacks, userSettingsKey, userSettings);
					
					jsonResponse.put("success", true);
				} else if (userSettingsAction.equalsIgnoreCase("load")) {
					// Gets Null Pointer Exception if settings have not been previously saved so retrieve keys
					String[] keys = callbacks.getUserConfigurationKeys();
					String[] userSettingsData = null;
					// If the key exists, get the value.
					if (keys != null && keys.length > 0) {
						for (int i = 0; i < keys.length; i++) {
							if (keys[i].equals(userSettingsKey)) {
								// Retrieve the saved settings from the user configuration.
								userSettingsData = callbacks.loadUserConfiguration(new String[] {userSettingsKey});
								break;
							}
						}
					}
					
					// Make sure there's data, then put the data in the response that will be sent back to the client.
					if (userSettingsData != null) {
						jsonResponse.put("userSettings", JSONObject.parse(userSettingsData[0])); // Convert text representing JSON into JSON form
					}
				}
			}
		} catch (Exception e) {
			logger.logError(this, "execute", e);
			jsonResponse.addErrorMessage(new JSONMessage(20000, "Error ocurred while Plugin Service - UserSettingsService attempted to process a request.", null, null, null, null));
	
		} finally {
			logger.logExit(this,  "execute");
			// Send the response to the client.
			PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "UserSettingsService");
		}

	}
	
	/**
	 * Validate that the request coming in from the client includes all parameters and can be handled by this service.
	 * @param callbacks
	 * @param request
	 * @param jsonResponse
	 * @return true if the request has all required parameters, false otherwise.
	 */
	private boolean validateServiceRequest(PluginServiceCallbacks callbacks, HttpServletRequest request, JSONResponse jsonResponse) {
		PluginLogger logger = callbacks.getLogger();
		logger.logEntry(this, "validateServiceRequest");
		
		// The request from the client must include a parameter, "userSettingsAction", whose value will indicate the service to execute.
		if (request.getParameter("userSettingsAction") == null) {
			jsonResponse.addErrorMessage(new JSONMessage(20001, "Missing required parameter \"userSettingsAction\"", null, null, null, null));
			logger.logError(this, "validateServiceRequest", "Missing required parameter \"userSettingsAction\"");
			logger.logExit(this, "validateServiceRequest", "Request is missing required parameters to service the request.");
			return false;
		}
		
		logger.logExit(this,  "validateServiceRequest", "Request contains the required parameters to service the request.");
		return true;
	}
}
