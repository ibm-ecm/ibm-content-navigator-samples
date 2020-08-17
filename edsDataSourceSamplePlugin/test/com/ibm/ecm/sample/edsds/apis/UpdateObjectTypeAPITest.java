/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.sample.edsds.apis;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.when;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.ibm.ecm.extension.PluginAPI;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.sample.edsds.EDSDataSourceSamplePlugin;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * 
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class UpdateObjectTypeAPITest {

	private static final String API_ID = "UpdateObjectTypeAPI";

	private PluginAPI updateObjectTypeApi;
	private PluginServiceCallbacks callbacks;

	@Mock
	private HttpServletRequest request;


	/**
	 * Perform set up
	 * 
	 * @throws Exception
	 */
	@Before
	public void setUp() throws Exception {
		when(request.getLocale()).thenReturn(new Locale("pt", "BR"));

		EDSDataSourceSamplePlugin plugin = new EDSDataSourceSamplePlugin();
		PluginAPI[] pluginApis = plugin.getPluginAPIs();

		assertNotNull(pluginApis);
		assertEquals(2, pluginApis.length);

		for (PluginAPI pluginApi : pluginApis) {
			if (API_ID.equals(pluginApi.getId())) {
				updateObjectTypeApi = pluginApi;
				break;
			}
		}

		assertNotNull(updateObjectTypeApi);
		callbacks = new PluginServiceCallbacks(request, plugin);
		PluginLogger logger = callbacks.getLogger();
		logger.setLogLevel(PluginLogger.LOG_DEBUG);
	}

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.UpdateObjectTypeAPI#getId()}.
	 */
	@Test
	public void testGetId() {
		assertEquals(API_ID, updateObjectTypeApi.getId());
	}

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.UpdateObjectTypeAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test(expected = IllegalArgumentException.class)
	public void testExecutePluginServiceNullArguments() throws Exception {
		updateObjectTypeApi.execute(callbacks, request, null);
		fail("Null arguments parameter should throw exception");
	}	

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.UpdateObjectTypeAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test(expected = IllegalArgumentException.class)
	public void testExecutePluginServiceEmptyArguments() throws Exception {
		JSONObject argumentsJson = new JSONObject();
		Object[] arguments = new Object[] { argumentsJson };

		updateObjectTypeApi.execute(callbacks, request, arguments);
		fail("Empty arguments parameter should throw exception");
	}	

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.UpdateObjectTypeAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test
	public void testExecutePluginServiceWithArguments() throws Exception {
		JSONObject argumentsJson = new JSONObject();
		argumentsJson.put("repositoryId", "default");
		argumentsJson.put("objectTypeName", "Book");
		argumentsJson.put("objectId", "12345");
		argumentsJson.put("requestMode", "inProgressChanges");
		argumentsJson.put("properties", new JSONArray());
		argumentsJson.put("clientContext", new JSONObject());
		Object[] arguments = new Object[] { argumentsJson };

		Object response = updateObjectTypeApi.execute(callbacks, request, arguments);
		if (response == null || !(response instanceof JSONObject)) {
			fail("Response is null or unexpected type.");
		}

		JSONObject jsonResponse = (JSONObject) response;
		if (jsonResponse.isEmpty()) {
			fail("JSON Response is empty.");
		}
	}

}
