/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.profile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.serviceability.Logger;

public class ProfilePluginService extends PluginService {

	public String getId() {
		return "profilePluginService";
	}

	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String methodName = "execute";
		Logger.logEntry(this, methodName, request);
		
		try {
			String configurations = callbacks.loadConfiguration();
			
			if (configurations == null || configurations.length() == 0) {
				Logger.logError(this, methodName, request, "No configuration is found. You need to specify at least url of Connections profile service");
				response.getOutputStream().write("".getBytes(request.getCharacterEncoding()));
				response.getOutputStream().flush();
			} else {
				Logger.logInfo(this, methodName, request, "Configurations=" + configurations);
				response.getOutputStream().write(configurations.getBytes(request.getCharacterEncoding()));
				response.getOutputStream().flush();
			}
		} catch (Exception ex) {
			Logger.logError( this, methodName, request, ex);
		}
		
		Logger.logExit(this, methodName, request);
	}
}
