/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType.model;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class ContentClass {

	private Connection connection;
	private JSONObject contentClassJSON;
	private String[] attributeDefinitionIds;
	private AttributeDefinition[] attributeDefinitions;

	public ContentClass(Connection connection, JSONObject contentClassJSON) {
		this.connection = connection;
		this.contentClassJSON = contentClassJSON;
	}
	
	public String getId() {
		return (String)contentClassJSON.get("id");
	}

	public String getName() {
		return (String)contentClassJSON.get("name");
	}

	public String[] getAttributeDefinitionIds() {
		if (attributeDefinitionIds == null) {
			JSONArray attributeDefinitionIdsJSON = (JSONArray) contentClassJSON.get("attributeDefinitionIds");
			attributeDefinitionIds = new String[attributeDefinitionIdsJSON.size()];
			attributeDefinitionIdsJSON.toArray(attributeDefinitionIds);
		}
		return attributeDefinitionIds;
	}

	public AttributeDefinition[] getAttributeDefinitions() {
		if (attributeDefinitions == null) {
			String[] attributeDefinitionIds = getAttributeDefinitionIds();
			attributeDefinitions = new AttributeDefinition[attributeDefinitionIds.length];
			for (int i = 0; i < attributeDefinitionIds.length; i++) {
				attributeDefinitions[i] = connection.getAttributeDefinition(attributeDefinitionIds[i]);
			}
		}
		return attributeDefinitions;
	}
	
	public boolean isFolderClass() {
		return contentClassJSON.containsKey("semanticType") && contentClassJSON.get("semanticType").equals("folder");
	}

	public boolean isDocumentClass() {
		return contentClassJSON.containsKey("semanticType") && contentClassJSON.get("semanticType").equals("document");
	}

}
