/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.sample.edsds.apis;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginAPI;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 *
 */
public class UpdateObjectTypeAPI extends PluginAPI {

	/**
	 * Returns the unique identifier for this API.
	 * 
	 * @return A <code>String</code> that is used to identify the API.
	 */
	@Override
	public String getId() {
		return "UpdateObjectTypeAPI";
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
	 *            An object array containing the input arguments to the API. The particular structure of these object is
	 *            defined by the plug-in API writer. The classes of the objects used as arguments should be J2SE classes
	 *            or instances of com.ibm.ecm.json as any plug-in specific classes will be loaded by different
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
		PluginLogger logger = null;
		if (callbacks != null) {
			logger = callbacks.getLogger();
			logger.logEntry(this, methodName, request);
		}

		if (arguments == null || arguments.length == 0 || arguments[0] == null || !(arguments[0] instanceof JSONObject)) {
			throw new IllegalArgumentException("The arguments are invalid.");
		}

		JSONObject argumentsJson = (JSONObject) arguments[0];
		if (logger != null) {
			logger.logDebug(this, methodName, request, "Received JSON: " + argumentsJson);
		}

		/* The JSON is structured as follows: 
			{
				"repositoryId":"<target repository>",
				"objectTypeName": "<object type name>"
				"objectId" : "<if an existing instance, the GUID, PID, etc>",
				"requestMode" : "<indicates context that info is being requested>",
				"externalDataIdentifier" : "<opaque identifier meaningful to service">,
				"properties":
				[
					{
						"symbolicName" : "<symbolic_name>", 
						"value" : <The current value>,
					}
					// More properties ...
				],
				"clientContext":
				{
					"userid":"<user id>",
					"locale":"<browser locale>",
					"desktop": "<desktop id>"
				}
			}
		 *
		 * The requestMode property can have one of the following values:
		 *    "initialNewObject" - when a new object is being created (when add doc, create folder, checkin dialogs first appear)
		 *    "initialExistingObject" - when an existing object is being edited (when edit properties first appears)
		 *    "inProgressChanges" - when an object is being modified (for dependent choice lists)
		 *    "finalNewObject" - before the object is persisted (when action is performed on add doc, create folder, checkin)
		 *    "finalExistingObject" - before the existing object is persisted (when save action is performed on edit properties)
		 *    
		 * The clientContext object property can contain the following properties:   
		 *    "action" - "addItem", "checkin", "editProperties", "multiEditProperties", "viewEditProperties", "workflow", or custom action name
		 *    "build" - "icn203.555" etc.
		 *    "clientIdentity" - "navigatorWeb", "navigatorMobile", "navigatorOffice", or custom client name
		 *    "desktop" - Desktop id string (not the display name)
		 *    "entryTemplateId" - Entry template document Id
		 *    "entryTemplateItemId" - Entry template ITEMID (CM)
		 *    "entryTemplateName" - Entry template name
		 *    "entryTemplateVsId" - Entry template version series id (P8)
		 *    "locale" - client locale
		 *    "objectStoreId" - P8 object store Id associated with the action (P8)
		 *    "userid" - Id of user executing the action
		 */

		String objectTypeName = getJsonStringProperty(argumentsJson, "objectTypeName", request, logger);
		String requestMode = getJsonStringProperty(argumentsJson, "requestMode", request, logger);
		JSONArray requestProperties = getJsonArrayProperty(argumentsJson, "properties", request, logger);
		JSONObject clientContext = getJsonObjectProperty(argumentsJson, "clientContext", request, logger);

		// retrieve the current property data
		JSONArray propertyData = getPropertyData(objectTypeName, logger, request);

		/* The JSON being returned is structured as follows:  
		{
			"externalDataIdentifier" : "<opaque identifier meaningful to service>",
			"properties":
			[
				{
					"symbolicName" : "<symbolic_name>",
					"value" : <potential new value>,
					"customValidationError" : "Description of an invalid reason",
					"customInvalidItems" : [0,3,4,8], // invalid multi-value items
					"displayMode" : "<readonly/readwrite>",
					"required" : <true or false>,
					"hidden" : <true or false>,
					"maxValue" : <overridden max value>,
					"minValue" : <overridden min value>,
					"maxLength" : <underlying max>,
					"format": <regular expression validating the format>,
					"formatDescription": <human readable description of the format>,
					"choiceList" :
					{
						"displayName" : "<display_name>",
						"choices" :
						[
							{
								"displayName" : "<name>"
								"active": <true or false>
								"value" : <value>
							},
							// More choices ...
						]
					}  // Or the special values:
					   //
					   //	Value			Description
					   //	---------		-----------------------------
					   //	"default"		Use class defined choice list (if any). 
					   //	null			Removes the currently assigned choice list.
					   //
					   // When no choice list is used, Navigator will create a choice list from the list of valid values, if valid values are defined.
					"hasDependentProperties" : <true or false>,
				},
				// More properties ...
			]
		}
		 */
		
		JSONObject jsonResponse = new JSONObject();
		jsonResponse.put("properties", getResponseProperties(requestMode, requestProperties, propertyData));

		if (argumentsJson.containsKey("externalDataIdentifier")) {
			String identifier = (String) argumentsJson.get("externalDataIdentifier");
			if (identifier != null && !identifier.isEmpty()) {
				jsonResponse.put("externalDataIdentifier", identifier);
			}
		}

		if (logger != null) {
			logger.logExit(this, methodName, request, "Returning: " + jsonResponse.toString());
		}
		return jsonResponse;
	}

	/**
	 * 
	 * @param jsonObject
	 * @param propertyName
	 * @param request
	 * @param logger
	 * @return
	 */
	private String getJsonStringProperty(JSONObject jsonObject, String propertyName, HttpServletRequest request, PluginLogger logger) {
		String methodName = "getJsonStringProperty";
		String propertyString = null;
		if (jsonObject.containsKey(propertyName)) {
			propertyString = (String) jsonObject.get(propertyName);
		}

		if (propertyString == null || propertyString.isEmpty()) {
			throw new IllegalArgumentException("The " + propertyName + " value is null or empty.");
		}

		if (logger != null) {
			logger.logDebug(this, methodName, request, propertyName + " = " + propertyString);
		}
		return propertyString;
	}

	/**
	 * 
	 * @param jsonObject
	 * @param propertyName
	 * @param request
	 * @param logger
	 * @return
	 */
	private JSONArray getJsonArrayProperty(JSONObject jsonObject, String propertyName, HttpServletRequest request, PluginLogger logger) {
		String methodName = "getJsonArrayProperty";
		JSONArray arrayProperty = null;
		if (jsonObject.containsKey(propertyName)) {
			arrayProperty = (JSONArray) jsonObject.get(propertyName);
		}

		if (arrayProperty == null) {
			throw new IllegalArgumentException("The " + propertyName + " value is null.");
		}

		if (logger != null) {
			logger.logDebug(this, methodName, request, propertyName + " = " + arrayProperty.toString());
		}
		return arrayProperty;
	}

	/**
	 * 
	 * @param jsonObject
	 * @param propertyName
	 * @param request
	 * @param logger
	 * @return
	 */
	private JSONObject getJsonObjectProperty(JSONObject jsonObject, String propertyName, HttpServletRequest request, PluginLogger logger) {
		String methodName = "getJsonArrayProperty";
		JSONObject objectProperty = null;
		if (jsonObject.containsKey(propertyName)) {
			objectProperty = (JSONObject) jsonObject.get(propertyName);
		}

		if (objectProperty == null) {
			throw new IllegalArgumentException("The " + propertyName + " value is null.");
		}

		if (logger != null) {
			logger.logDebug(this, methodName, request, propertyName + " = " + objectProperty.toString());
		}
		return objectProperty;
	}

	/**
	 * 
	 * @param objectTypeName
	 * @param logger
	 * @param request
	 * @return
	 * @throws IOException
	 */
	private JSONArray getPropertyData(String objectTypeName, PluginLogger logger, HttpServletRequest request) throws IOException {
		String methodName = "getPropertyData";
		if (logger != null) {
			logger.logEntry(this, methodName, "objectTypeName = " + objectTypeName);
		}
		
		// Load the file resource containing the property data for the given object type; first look for a locale specific version
		// (files with names containing special characters like 'ü' may fail to be retrieved, in such cases, replace the characters
		// with '_' or other safe character in both the file resource and the objectType value used to construct the file name bellow)
		// Note for Box users: The objectType of a Box metadata template is its ID, which is composed of the template key and template scope (aka enterprise ID),
		// e.g., "myTemplate,enterise_123456". If you wish to use the same property data for a template that is replicated in multiple enterprises,
		// simply parse the ID on the comma and use the first part (i.e., myTemplate) to retrieve the property data.
		String resourceName = "com/ibm/ecm/sample/edsds/data/" + objectTypeName.replace(' ', '_') + "_PropertyData";
		
		ClassLoader classLoader = this.getClass().getClassLoader();
		Locale locale = (request != null ? request.getLocale() : null);
		
		InputStream propertyDataStream = null;
		if (locale != null) {
			String fullResourceName = resourceName + "_" + locale.toString() + ".json";
			if (logger != null) {
				logger.logDebug(this, methodName, request, "Attempting to load resource: " + fullResourceName);
			}
			propertyDataStream = classLoader.getResourceAsStream(fullResourceName);
		}
		
		if (propertyDataStream == null) {
			String fullResourceName = resourceName + ".json";
			// Look for a locale independent version of the property data
			if (logger != null) {
				logger.logDebug(this, methodName, request, "Attempting to load resource: " + fullResourceName);
			}
			propertyDataStream = classLoader.getResourceAsStream(fullResourceName);
		}

		if (propertyDataStream == null) {
			throw new RuntimeException("Unable to load the property data file.");
		}

		JSONArray jsonPropertyData = JSONArray.parse(propertyDataStream);
		if (logger != null) {
			logger.logExit(this, methodName, "propertyData = " + (jsonPropertyData != null ? jsonPropertyData.toString() : null));
		}
		return jsonPropertyData;
	}

	/**
	 * 
	 * @param requestMode
	 * @param requestProperties
	 * @param propertyData
	 * @return
	 * @throws Exception
	 */
	private JSONArray getResponseProperties(String requestMode, JSONArray requestProperties, JSONArray propertyData) throws Exception {
		JSONArray responseProperties = new JSONArray();

		// This looks for the word "error" as the value of any field.  If it is found, a general error is raised.  
		for (int j = 0; j < requestProperties.size(); j++) {
			JSONObject requestProperty = (JSONObject)requestProperties.get(j);
			String  value = String.valueOf(requestProperty.get("value"));
			if (value.equals("error")) {
				throw new Exception("Example of an error from EDS.");
			}
		}

		// First, for initial object calls, fill in overrides of initial values
		if (requestMode.equals("initialNewObject")) {
			for (int i = 0; i < propertyData.size(); i++) {
				JSONObject overrideProperty = (JSONObject)propertyData.get(i);
				String overridePropertyName = overrideProperty.get("symbolicName").toString();
				if (overrideProperty.containsKey("initialValue")) {
					for (int j = 0; j < requestProperties.size(); j++) {
						JSONObject requestProperty = (JSONObject)requestProperties.get(j);
						String requestPropertyName = requestProperty.get("symbolicName").toString();
						if (overridePropertyName.equals(requestPropertyName)) {
							Object initialValue = overrideProperty.get("initialValue");
							requestProperty.put("value", initialValue);
						}
					}
				}
			}
		}

		// For both initial and in-progress calls, process the property data to add in choice lists and modified metadata
		for (int i = 0; i < propertyData.size(); i++) {
			JSONObject overrideProperty = (JSONObject)propertyData.get(i);
			String overridePropertyName = overrideProperty.get("symbolicName").toString();
			if (requestMode.equals("initialNewObject") || requestMode.equals("initialExistingObject") || requestMode.equals("inProgressChanges")) { 
				if (overrideProperty.containsKey("dependentOn")) {
					// perform dependent overrides (such as dependent choice lists) for inProgressChanges calls only
					// although they can be processed for initial calls, it will influence searches (narrowing the search choices)
					if (requestMode.equals("inProgressChanges")) {
						// Treat null and "" as the same - no value.
						// The old common properties pane passes "" for no value, the new ET property layout passes null,
						// and initial empty values from the class definition will be null. 
						String dependentOn = overrideProperty.get("dependentOn").toString();
						Object dependentValue = overrideProperty.get("dependentValue");
						String dependentValueStr = (dependentValue != null) ? dependentValue.toString() : "";
						for (int j = 0; j < requestProperties.size(); j++) {
							JSONObject requestProperty = (JSONObject)requestProperties.get(j);
							String requestPropertyName = requestProperty.get("symbolicName").toString();
							if (requestPropertyName.equals(dependentOn)) {
								Object value = requestProperty.get("value");
								String valueStr = (value != null) ? value.toString() : "";
								if (dependentValueStr.equals(valueStr)) {
									responseProperties.add(overrideProperty);
								}
							}
						}
					}
				} else {
					// Apply the initial value, if any, during an initial object call only
					if (requestMode.equals("initialNewObject") && overrideProperty.containsKey("initialValue"))
						overrideProperty.put("value", overrideProperty.get("initialValue"));

					// Add the property override
					responseProperties.add(overrideProperty);
				}
			}

			// For final calls, perform custom validations and property overrides
			if (requestMode.equals("finalNewObject") || requestMode.equals("finalExistingObject")) {
				if (overrideProperty.containsKey("validateAs")) {
					// perform custom validation
					String validationType = overrideProperty.get("validateAs").toString();

					if (validationType.equals("NoThrees")) {
						// a sample validation that simply restricts the field from having a 3 anywhere
						String symbolicName = overrideProperty.get("symbolicName").toString();
						for (int j = 0; j < requestProperties.size(); j++) {
							JSONObject requestProperty = (JSONObject)requestProperties.get(j);
							String requestPropertySymbolicName = requestProperty.get("symbolicName").toString();
							if (requestPropertySymbolicName.contains("[")) { // child component index.. ignore
								requestPropertySymbolicName = requestPropertySymbolicName.substring(0,requestPropertySymbolicName.indexOf("["));
							}
							if (symbolicName.equals(requestPropertySymbolicName)) {
								String error = null;
								Object propertyValue = requestProperty.get("value");
								if (propertyValue instanceof String) {
									String requestValue = (String) propertyValue;
									if (requestValue.contains("3") || requestValue.toLowerCase().contains("three") || requestValue.toLowerCase().contains("third")) {
										error = "This string field cannot contain any threes";
									}
								} else if (propertyValue instanceof Long) {
									Long requestValue = (Long) propertyValue;
									if (requestValue == 3 || requestValue == 33 || requestValue == 333) {
										error = "This integer field cannot contain only threes";
									}
								} else if (propertyValue instanceof Double) {
									Double requestValue = (Double) propertyValue;
									if (requestValue == 3.3 || requestValue == 33.33 || requestValue == 333.333) {
										error = "This float field cannot contain only threes";
									}
								}
								if (error != null) {
									JSONObject returnProperty = (JSONObject)overrideProperty.clone();
									returnProperty.put("customValidationError", error);
									returnProperty.put("symbolicName", requestProperty.get("symbolicName"));
									responseProperties.add(returnProperty);
								}
							}
						}
					} else if (validationType.equals("Required")) {
						// a sample validation that simply requires a value
						String symbolicName = overrideProperty.get("symbolicName").toString();
						for (int j = 0; j < requestProperties.size(); j++) {
							JSONObject requestProperty = (JSONObject)requestProperties.get(j);
							String requestPropertySymbolicName = requestProperty.get("symbolicName").toString();
							if (requestPropertySymbolicName.contains("[")) { // child component index.. ignore
								requestPropertySymbolicName = requestPropertySymbolicName.substring(0,requestPropertySymbolicName.indexOf("["));
							}
							if (symbolicName.equals(requestPropertySymbolicName)) {
								String error = null;
								Object propertyValue = requestProperty.get("value");
								if (propertyValue == null) {
									error = "This field requires a value";
								} else if (propertyValue instanceof String && ((String) propertyValue).isEmpty()) {
									error = "This field requires a value";
								} else if (propertyValue instanceof JSONArray) {
									JSONArray jsonArray = (JSONArray) propertyValue;
									// Treat these as empty: [ ], [ null ], [ "" ]
									if (jsonArray.isEmpty()) {
										error = "This field requires a value";
									} else if (jsonArray.size() == 1) {
										Object value = jsonArray.get(0);
										if (value == null || value.toString().isEmpty()) {
											error = "This field requires a value";
										}
									}
								}
								if (error != null) {
									JSONObject returnProperty = (JSONObject)overrideProperty.clone();
									returnProperty.put("customValidationError", error);
									returnProperty.put("symbolicName", requestProperty.get("symbolicName"));
									responseProperties.add(returnProperty);
								}
							}
						}
					}
				} else if (overrideProperty.containsKey("newObjectValueOverride") && requestMode.equals("finalNewObject")) {
					// This is an example of an override for a property when creating a new object.
					// The user will see this value after the object is created instead of any value entered for the property.
					JSONObject returnProperty = new JSONObject();
					returnProperty.put("symbolicName", overrideProperty.get("symbolicName"));
					returnProperty.put("value", overrideProperty.get("newObjectValueOverride"));
					responseProperties.add(returnProperty);
				} else if (overrideProperty.containsKey("existingObjectValueOverride") && requestMode.equals("finalExistingObject")) {
					// This is an example of an override for a property when editing an existing object.
					// The user will see this value but it will be saved instead of any value entered for the property.
					JSONObject returnProperty = new JSONObject();
					returnProperty.put("symbolicName", overrideProperty.get("symbolicName"));
					returnProperty.put("value", overrideProperty.get("existingObjectValueOverride"));
					responseProperties.add(returnProperty);
				} else if (overrideProperty.containsKey("timestamp")) {
					String timestampVal = overrideProperty.get("timestamp").toString();
					if (timestampVal != null && timestampVal.equalsIgnoreCase("true")) {
						// This is another example of a custom property override.   This
						// custom property override will fill in a property with the current time.
						JSONObject returnProperty = new JSONObject();
						returnProperty.put("symbolicName", overrideProperty.get("symbolicName"));
						returnProperty.put("value", (new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")).format(new Date(System.currentTimeMillis())));
						responseProperties.add(returnProperty);
					}
				}
			}
		}
		return responseProperties;
	}

}
