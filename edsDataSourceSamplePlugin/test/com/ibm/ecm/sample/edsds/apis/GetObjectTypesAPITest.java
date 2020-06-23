/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.sample.edsds.apis;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;

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
 */
@RunWith(MockitoJUnitRunner.class)
public class GetObjectTypesAPITest {

	private static final String API_ID = "GetObjectTypesAPI";

	private PluginAPI getObjectTypesApi;
	private PluginServiceCallbacks callbacks;

	@Mock
	private HttpServletRequest request;


	/**
	 * Set up
	 * 
	 * @throws Exception
	 */
	@Before
	public void setUp() throws Exception {
		EDSDataSourceSamplePlugin plugin = new EDSDataSourceSamplePlugin();
		PluginAPI[] pluginApis = plugin.getPluginAPIs();

		assertNotNull(pluginApis);
		assertEquals(2, pluginApis.length);

		for (PluginAPI pluginApi : pluginApis) {
			if (API_ID.equals(pluginApi.getId())) {
				getObjectTypesApi = pluginApi;
				break;
			}
		}

		assertNotNull(getObjectTypesApi);
		callbacks = new PluginServiceCallbacks(request, plugin);
		PluginLogger logger = callbacks.getLogger();
		logger.setLogLevel(PluginLogger.LOG_DEBUG);
	}

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.GetObjectTypesAPI#getId()}.
	 */
	@Test
	public void testGetId() {
		assertEquals(API_ID, getObjectTypesApi.getId());
	}

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.GetObjectTypesAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test(expected = IllegalArgumentException.class)
	public void testExecutePluginServiceNullArguments() throws Exception {
		getObjectTypesApi.execute(callbacks, request, null);
		fail("Null arguments parameter should throw exception");
	}	

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.GetObjectTypesAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test(expected = IllegalArgumentException.class)
	public void testExecutePluginServiceEmptyArguments() throws Exception {
		JSONObject argumentsJson = new JSONObject();
		Object[] arguments = new Object[] { argumentsJson };

		getObjectTypesApi.execute(callbacks, request, arguments);
		fail("Empty arguments parameter should throw exception");
	}	

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.GetObjectTypesAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test
	public void testExecutePluginServiceWithArguments() throws Exception {
		JSONObject argumentsJson = new JSONObject();
		argumentsJson.put("repositoryId", "default");
		Object[] arguments = new Object[] { argumentsJson };

		Object response = getObjectTypesApi.execute(callbacks, request, arguments);
		if (response == null || !(response instanceof JSONArray)) {
			fail("Response is null or unexpected type.");
		}

		JSONArray responseArray = (JSONArray) response;
		if (responseArray.isEmpty()) {
			fail("Response array is empty.");
		}
	}

}
