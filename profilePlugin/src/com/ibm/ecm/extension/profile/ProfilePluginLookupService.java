/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.profile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filenet.api.core.Connection;
import com.filenet.api.core.Factory;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.exception.ExceptionCode;
import com.filenet.api.security.User;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.ecm.serviceability.Logger;

public class ProfilePluginLookupService extends PluginService {

	public String getId() {
		return "profilePluginLookupService";
	}

	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		Logger.logEntry(this, methodName, request);
		JSONResponse result = new JSONResponse();

		try {
			String repositoryId = request.getParameter("repositoryId");
			if(repositoryId == null) {
				repositoryId = "ECM";
			}

			String shortName = request.getParameter("shortname");
			Logger.logDebug( this, methodName, request, "Validating the specified short name: '" + shortName + "'");
			if (shortName == null || shortName.trim().isEmpty() || shortName.trim().equals("0")) {
				throw new IllegalArgumentException("The specified short name, '" + shortName + "' is invalid.");
			}

			Connection conn = callbacks.getP8Connection(repositoryId);
			if (conn == null) {
				throw new RuntimeException("Cannot get a P8 connection using the specified repository: " + repositoryId);
			}

			User user = null;
					
			try {
				Logger.logDebug( this, methodName, request, "looking up the name '" + shortName + "' using repository '" + repositoryId + "' and connection: " + conn);
				user = Factory.User.fetchInstance(conn, shortName, null);
			} catch (EngineRuntimeException ere) {
				if (ExceptionCode.E_OBJECT_NOT_FOUND.equals(ere.getExceptionCode())) {
					throw new IllegalArgumentException("The specified short name, '" + shortName + "' was not found.");
				} else {
					throw ere;
				}
			} finally {
				UserContext.get().popSubject();
			}

			String email = user.get_Email();
			String displayName = user.get_DisplayName();
			// fetch shortName again due to cases where passed in short name is a display name
			shortName = user.get_ShortName();

			Logger.logDebug(this, methodName, request, "Returned - shortName: '" + shortName + "' display name: '" + displayName + "' email: '" + email + "'");

			result.put("shortname", shortName);
			result.put("displayName", displayName);
			result.put("email",	email);
			result.put("repositoryId", repositoryId);

			PluginResponseUtil.writeJSONResponse(request, response, result, callbacks, getId());
    	}
    	catch(Exception ex)
    	{
			if (!(ex instanceof IllegalArgumentException)) {
				Logger.logError(this, methodName, request, ex);
			}
    	    
			PluginResponseUtil.writeJSONResponse(request, response, handleErrorResponse(ex), callbacks, getId());
		}
		
		Logger.logExit(this, methodName, request);
	}

	protected final JSONResponse handleErrorResponse(Exception ex)
    {
		JSONResponse errorResponse = new JSONResponse();
		
        Throwable cause = ex.getCause();
        String causeMessage = cause == null ? "n/a" : cause.toString();
		JSONMessage errorMessage = new JSONMessage(1000, ex.getMessage(), causeMessage, null, null, null);
		errorResponse.addErrorMessage(errorMessage);

		return errorResponse;
    }
}
