package com.ibm.ecm.extension.dependent;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.event.annotations.*;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

public class DependentPluginEventHandler {

	public void handleTopicMessage(@Observes @Topic("SamplePlugin:samplePluginService") JSONResponse message, final HttpServletRequest request, final PluginServiceCallbacks callbacks) {
		callbacks.getLogger().logDebug(this, "handleTopicMessage", request, "received topic message from Dependent Plugin: " + message);
	}

	public void handleTopicMessageAsync(@ObservesAsync @Topic("SamplePlugin:samplePluginService") JSONResponse message) {
		System.out.println("DependentPluginEventHandler received topic message: " + message);
	}
}
