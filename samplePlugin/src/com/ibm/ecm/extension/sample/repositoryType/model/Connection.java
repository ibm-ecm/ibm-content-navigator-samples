/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType.model;

import java.io.InputStream;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Hashtable;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginRepositoryConnection;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * Represents a connection to the repository. Contains methods that will return
 * content classes and content items from the sample repository (a JSON file).
 * <p>
 * This file contains data for the sample repository, representing all of the
 * items in the repository There are additional files representing the contents
 * of the repository in this same directory
 * 
 * The structure of this file is fairly simple. There are these lists of
 * objects:
 * <ul>
 * <li>users -- a list of users enabled to the repository
 * <li>groups -- a list of groups enabled to the repository
 * <li>attributeDefinitions -- definitions of attributes that can appear on
 * content classes
 * <li>contentClasses -- represent the object classes of the repository
 * <li>contentItems -- represent the actual objects in the repository
 * </ul>
 * 
 * Note: This repository is obviously not designed to be usable in the real
 * world, but it does help to demonstrate the key information that you will need
 * to obtain from your real-world repository.
 */
public class Connection extends PluginRepositoryConnection {

	private JSONObject repositoryJSON;
	private Hashtable<String, AttributeDefinition> attributeDefinitions;
	private Hashtable<String, ContentClass> contentClasses;

	public Connection(String type, String userId, RepositoryConfig repositoryConfig) throws Exception {
		super(type, userId, userId);
		InputStream inStream = null;
		try {
			// Load the repository JSON
			// TODO add repositoryconfig for plugins
			// File jsonFile = new File(repositoryConfig.getServerName());
			// inStream = new FileInputStream(jsonFile);
			inStream = this.getClass().getClassLoader().getResourceAsStream("com/ibm/ecm/extension/sample/repositoryType/data/sampleRepository.json");
			repositoryJSON = JSONObject.parse(inStream);

			// Cache the attribute definitions
			attributeDefinitions = new Hashtable<String, AttributeDefinition>();
			JSONArray attributeDefinitionsJSON = (JSONArray) repositoryJSON.get("attributeDefinitions");
			for (int i = 0; i < attributeDefinitionsJSON.size(); i++) {
				JSONObject attributeDefinitionJSON = (JSONObject) attributeDefinitionsJSON.get(i);
				String attributeDefinitionId = (String) attributeDefinitionJSON.get("id");
				AttributeDefinition attributeDefinition = new AttributeDefinition(this, attributeDefinitionJSON);
				attributeDefinitions.put(attributeDefinitionId, attributeDefinition);
			}

			// Cache the content classes
			contentClasses = new Hashtable<String, ContentClass>();
			JSONArray contentClassesJSON = (JSONArray) repositoryJSON.get("contentClasses");
			for (int i = 0; i < contentClassesJSON.size(); i++) {
				JSONObject contentClassJSON = (JSONObject) contentClassesJSON.get(i);
				String contentClassId = (String) contentClassJSON.get("id");
				ContentClass contentClass = new ContentClass(this, contentClassJSON);
				contentClasses.put(contentClassId, contentClass);
			}

		} finally {
			if (inStream != null) {
				inStream.close();
			}
		}
	}

	public JSONObject getRepositoryJSON() {
		return repositoryJSON;
	}
	
	public ContentClass[] getContentClasses() {
		ContentClass[] contentClassArray = new ContentClass[contentClasses.size()];
		Collection<ContentClass> contentClassCollection = contentClasses.values();
		contentClassArray = contentClassCollection.toArray(contentClassArray);
		return contentClassArray;
	}

	public AttributeDefinition getAttributeDefinition(String attributeDefinitionId) {
		if (attributeDefinitions.containsKey(attributeDefinitionId)) {
			return attributeDefinitions.get(attributeDefinitionId);
		}
		throw new RuntimeException("Attribute definition not found with id " + attributeDefinitionId
				+ ".  There is likely an error in the format of the repository JSON.");
	}

	public ContentClass getContentClass(String contentClassId) {
		if (contentClasses.containsKey(contentClassId)) {
			return contentClasses.get(contentClassId);
		}
		throw new RuntimeException("Content class not found with id " + contentClassId
				+ ".  There is likely an error in the format of the repository JSON.");
	}

	public ContentItem getRootItem() throws Exception {
		JSONArray contentItemsJSON = (JSONArray) repositoryJSON.get("contentItems");
		// By convention, the first item is the root
		JSONObject contentItemJSON = (JSONObject) contentItemsJSON.get(0);
		return new ContentItem(this, contentItemJSON);
	}

	public ContentItem getContentItem(String contentItemId) throws Exception {
		JSONArray contentItemsJSON = (JSONArray) repositoryJSON.get("contentItems");
		// Scan the list looking for the first item with the id
		for (int i = 0; i < contentItemsJSON.size(); i++) {
			JSONObject contentItemJSON = (JSONObject) contentItemsJSON.get(i);
			if (contentItemId.equals(contentItemJSON.get("id"))) {
				return new ContentItem(this, contentItemJSON);
			}
		}
		throw new Exception("Content item not found with id: " + contentItemId);
	}

	@Override
	/**
	 * This method isn't needed by the sample, but is implemented to demonstrate how JSON might be specified that will appear
	 * on the ecm.model.Respository.onConnected event when repositories are logged in / connected.
	 */
	public JSONObject getOnConnectedJSON() {
		JSONObject testJSONObject = new JSONObject();
		testJSONObject.put("samplePluginField",  "samplePluginValue");
		return testJSONObject;
	}

}
