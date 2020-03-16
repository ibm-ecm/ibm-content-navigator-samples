package com.ibm.ecm.extension.sample;

import javax.servlet.http.HttpServletRequest;

import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

import com.ibm.ecm.event.annotations.*;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONResponse;

public class SamplePluginEventHandler {
	public void updatePluginConfiguration(@Observes @DataKey("plugin") @Rotated String message, final HttpServletRequest request, final PluginServiceCallbacks callbacks) {
		try {
			callbacks.saveConfiguration(encryptSecrets(callbacks.loadConfiguration(), request, callbacks));
		} catch (Exception e) {
			callbacks.getLogger().logError(this, "updatePluginConfiguration", request, "failed to update the configuration", e);
		}
	}

	String encryptSecrets(final String configuration, final HttpServletRequest request, final PluginServiceCallbacks callbacks) {
		try {
			JSONObject config = (JSONObject) JSON.parse(configuration);
			JSONObject secretField = secretField(config);
			String secret = (String) secretField.get("value");
			if (secret != null && !secret.isEmpty()) {
				secretField.put("value", callbacks.encrypt(callbacks.decrypt(secret)));
			}

			return config.toString();
		} catch (Exception e) {
			callbacks.getLogger().logError(this, "encryptSecrets", request, "failed to encrypt secrets", e);

			return configuration;
		}
	}

	private JSONObject secretField(JSONObject configuration) {
		return (JSONObject) ((JSONArray) configuration.get("configuration")).stream().filter(p -> ((JSONObject) p).get("name").equals("secretField")).findAny().orElse(null);
	}

	public void handleTopicMessage(@Observes @Topic("SamplePlugin:samplePluginService") JSONResponse message, final HttpServletRequest request, final PluginServiceCallbacks callbacks) {
		callbacks.getLogger().logDebug(this, "handleTopicMessage", request, "received topic message: " + message);
	}

	public void handleTopicMessageAsync(@ObservesAsync @Topic("SamplePlugin:samplePluginService") JSONResponse message) {
		System.out.println("SamplePluginEventHandler received topic message: " + message);
	}
}
