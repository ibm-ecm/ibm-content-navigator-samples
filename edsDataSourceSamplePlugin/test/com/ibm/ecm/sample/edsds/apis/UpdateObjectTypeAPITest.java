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

class UpdateObjectTypeAPITest {

	@Test
	void testGetId() {
		UpdateObjectTypeAPI testClass = new UpdateObjectTypeAPI();
		String expected = "UpdateObjectTypeAPI";
		org.junit.jupiter.api.Assertions.assertTrue(expected.equals(testClass.getId()));
	}

	@Test
	void testExecutePluginServiceCallbacksHttpServletRequestObjectArray() {
		UpdateObjectTypeAPI testClass = new UpdateObjectTypeAPI();

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
				fail("Unexpected exception type - " + ex.toString());
			}
		}

		argumentsJson.put("repositoryId", "default");
		argumentsJson.put("objectTypeName", "worknode_edsstep_choicelist");
		argumentsJson.put("objectId", "12345");
		argumentsJson.put("requestMode", "inProgressChanges");
		argumentsJson.put("properties", new JSONArray());
		argumentsJson.put("clientContext", new JSONObject());

		try {
			Object response = testClass.execute(null, null, arguments);
			if (response == null || !(response instanceof JSONObject)) {
				fail("Response is null or unexpected type.");
			}

			JSONObject jsonResponse = (JSONObject) response;
			if (jsonResponse.isEmpty()) {
				fail("JSON Response is empty.");
			}
		} catch (Exception ex) {
			fail("Unexpected exception - " + ex.toString());
		}
	}

}
