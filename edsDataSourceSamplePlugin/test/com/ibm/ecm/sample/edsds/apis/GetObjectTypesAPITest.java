/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.sample.edsds.apis;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 *
 */
class GetObjectTypesAPITest {

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.GetObjectTypesAPI#getId()}.
	 */
	@Test
	void testGetId() {
		GetObjectTypesAPI testClass = new GetObjectTypesAPI();
		String expected = "GetObjectTypesAPI";
		org.junit.jupiter.api.Assertions.assertTrue(expected.equals(testClass.getId()));
	}

	/**
	 * Test method for {@link com.ibm.ecm.sample.apis.GetObjectTypesAPI#execute(com.ibm.ecm.extension.PluginServiceCallbacks, javax.servlet.http.HttpServletRequest, java.lang.Object[])}.
	 */
	@Test
	void testExecutePluginServiceCallbacksHttpServletRequestObjectArray() {
		GetObjectTypesAPI testClass = new GetObjectTypesAPI();
		
		try {
			testClass.execute(null, null, null);
			fail("Null arguments parameter should throw exception");
		} catch (Exception ex) {
			if (!(ex instanceof IllegalArgumentException)) {
				fail("Unexpected exception type - " + ex.toString());
			}
		}

		JSONObject argumentsJson = new JSONObject();
		Object[] arguments = new Object[] { argumentsJson };
		
		try {
			testClass.execute(null, null, arguments);
			fail("Empty arguments should throw exception");
		} catch (Exception ex) {
			if (!(ex instanceof IllegalArgumentException)) {
				fail("Unexpected exception type - " + ex.getMessage());
			}
		}
		
		argumentsJson.put("repositoryId", "default");
		
		try {
			Object response = testClass.execute(null, null, arguments);
			if (response == null || !(response instanceof JSONArray)) {
				fail("Response is null or unexpected type.");
			}
			
			JSONArray responseArray = (JSONArray) response;
			if (responseArray.isEmpty()) {
				fail("Response array is empty.");
			}
		} catch (Exception ex) {
			fail("Unexpected exception - " + ex.getMessage());
		}
	}

}
