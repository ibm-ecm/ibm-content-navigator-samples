/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2012, 2020  All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This sample  servlet implements the Update Object Type EDS service.  It looks for json files
 * of the same name as the object type, with an extension of _PropertyData.json.  It then uses the information
 * in that JSON file, along with the values of properties passed into the servlet, to construct a response JSON
 * that defines or overrides property values, choice lists, and metadata.
 */
public class UpdateObjectTypeServlet extends HttpServlet {
	
	/*
	 * This is how the JSON coming in is structured. 

		POST /type/<object type name>
		
		{
			"repositoryId":"<target repository>",
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
	 * The requestMode has values:
	 *  initialNewObject -- when a new object is being created (when add doc, create folder, checkin dialogs first appear)
	 *  initialExistingObject -- when an existing object is being edited (when edit properties first appears)
	 *  inProgressChanges -- when an object is being modified (for dependent choice lists)
	 *  finalNewObject -- before the object is persisted (when action is performed on add doc, create folder, checkin)
	 *  finalExistingObject -- before the existing object is persisted (when save action is performed on edit properties)
	 */

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String objectType = request.getPathInfo().substring(1);
		
		// Get the request json
		InputStream requestInputStream = request.getInputStream();
		JSONObject jsonRequest = JSONObject.parse(requestInputStream);
		String requestMode = jsonRequest.get("requestMode").toString();
		JSONArray requestProperties = (JSONArray)jsonRequest.get("properties");
		JSONArray responseProperties = new JSONArray();
		JSONArray propertyData = getPropertyData(objectType, request.getLocale());
		JSONObject clientContext = (JSONObject)jsonRequest.get("clientContext");

		String objectId = (String)jsonRequest.get("objectId");
		
		System.out.println("sampleEDService.UpdateObjectTypeServlet: objectType="+objectType+" objectId=" + objectId + " requestMode="+requestMode);
		
		// "action" - "addItem", "checkin", "editProperties", "multiEditProperties", "viewEditProperties", "workflow", or custom action name
		// "build" - "icn203.555" etc.
		// "clientIdentity" - "navigatorWeb", "navigatorMobile", "navigatorOffice", or custom client name
		// "desktop" - Desktop id string (not the display name)
		// "entryTemplateId" - Entry template document Id
		// "entryTemplateItemId" - Entry template ITEMID (CM)
		// "entryTemplateName" - Entry template name
		// "entryTemplateVsId" - Entry template version series id (P8)
		// "locale" - client locale
		// "objectStoreId" - P8 object store Id associated with the action (P8)
		// "userid" - Id of user executing the action
		System.out.println("sampleEDService.UpdateObjectTypeServlet: clientContext="+clientContext);
		
		System.out.println("sampleEDService.UpdateObjectTypeServlet: Cookie="+request.getHeader("Cookie"));
		try {
		
			// This looks for the word "error" as the value of any field. If it is found, an error message (i.e., "Example of an error from EDS.")
			// is returned and displayed to the user.
			for (int j = 0; j < requestProperties.size(); j++) {
				JSONObject requestProperty = (JSONObject)requestProperties.get(j);
				String  value = String.valueOf(requestProperty.get("value"));
				if (value.equals("error")) {
					sendErrorResponse(response, "EDS error details for logging.", "Example of an error from EDS.");
					return;
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
			
			// Send the response json
			JSONObject jsonResponse = new JSONObject();
			jsonResponse.put("properties", responseProperties);
			
			// Comment out for better performance when there are large choice lists.
			System.out.println("  "+jsonResponse.serialize());
			
			PrintWriter writer = response.getWriter();
			jsonResponse.serialize(writer);
	
		} catch (Exception e) {
			sendErrorResponse(response, e.getMessage());
		}
	}
	
	/**
	 * Sends a JSON error response.
	 * 
	 * @param response HTTP servlet response
	 * @param errorMessage error message to be logged by the EDS plug-in (not displayed to the user)
	 * @param userMessage error message to be displayed to the user
	 * @throws IOException if an error occurs
	 */
	private void sendErrorResponse(HttpServletResponse response, String errorMessage, String userMessage) throws IOException {
		response.setStatus(500);
		JSONObject jsonResponse = new JSONObject();
		jsonResponse.put("errorMessage", errorMessage);
		jsonResponse.put("userMessage", userMessage);
		System.out.println("  " + jsonResponse.serialize());
		PrintWriter writer = response.getWriter();
		jsonResponse.serialize(writer);
	}
	
	/**
	 * Sends a JSON error response.
	 * 
	 * @param response HTTP servlet response
	 * @param errorMessage error message to be logged by the EDS plug-in (not displayed to the user)
	 * @throws IOException if an error occurs
	 */
	private void sendErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {
		sendErrorResponse(response, errorMessage, null);
	}
	
	private JSONArray  getPropertyData(String objectType, Locale locale) throws IOException {
		// Load the file resource containing the property data for the given object type; first look for a locale specific version
		// (files with names containing special characters like 'ü' may fail to be retrieved, in such cases, replace the characters
		// with '_' or other safe character in both the file resource and the objectType value used to construct the file name bellow)
		// Note for Box users: The objectType of a Box metadata template is its ID, which is composed of the template key and template scope (aka enterprise ID),
		// e.g., "myTemplate,enterise_123456". If you wish to use the same property data for a template that is replicated in multiple enterprises,
		// simply parse the ID on the comma and use the first part (i.e., myTemplate) to retrieve the property data.
		InputStream propertyDataStream = this.getClass().getResourceAsStream(objectType.replace(' ', '_')+"_PropertyData_"+locale.toString()+".json");
		if (propertyDataStream == null) {
			// Look for a locale independent version of the property data
			propertyDataStream = this.getClass().getResourceAsStream(objectType.replace(' ', '_')+"_PropertyData.json");
		}
		JSONArray jsonPropertyData = JSONArray.parse(propertyDataStream);
		return jsonPropertyData;
	}

}

/*
 * Here is how the JSON being returned is structured:
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
