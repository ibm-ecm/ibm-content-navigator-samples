/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType.model;

import java.io.InputStream;

import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class ContentItem {
	
	private Connection connection;
	private JSONObject contentItemJSON;

	public ContentItem(Connection connection, JSONObject contentItemJSON) {
		this.connection = connection;
		this.contentItemJSON = contentItemJSON;
	}
	
	public String getContentClassId() {
		return (String)contentItemJSON.get("contentClassId");
	}
	
	public ContentClass getContentClass() {
		return connection.getContentClass(getContentClassId());
	}
	
	public String getId() {
		return (String)contentItemJSON.get("id");
	}
	
	public String getName() {
		// By convention we'll use the first defined attribute as the name
		AttributeDefinition nameAttributeDef = getContentClass().getAttributeDefinitions()[0];
		return getAttributeValue(nameAttributeDef.getId()).toString();
	}
	
	public int getAttributeCount() {
		JSONObject attributes = (JSONObject)contentItemJSON.get("attributes");
		return attributes.size();
	}
	
	public String[] getAttributeIds() {
		JSONObject attributes = (JSONObject)contentItemJSON.get("attributes");
		String[] attributeIds = new String[attributes.size()];
		attributes.keySet().toArray(attributeIds);
		return attributeIds;
	}
	
	public Object getAttributeValue(String attributeId) {
		JSONObject attributes = (JSONObject)contentItemJSON.get("attributes");
		return attributes.get(attributeId);
	}
	
	public void setAttribute(String attributeId, Object value) {
		// Note:  This is not a permanent change to the json file, just temporary to the in-memory copy
		JSONObject attributes = (JSONObject)contentItemJSON.get("attributes");
		attributes.put(attributeId, value);
	}
	
	/**
	 * If the item is a folder, this returns folder contents.
	 * @return
	 */
	public String[] getContentIds() {
		JSONArray contentItemIdsJSON = (JSONArray)contentItemJSON.get("contentItemIds");
		if (contentItemIdsJSON == null) {
			return new String[0];
		}
		String[] contentItemIds = new String[contentItemIdsJSON.size()];
		contentItemIdsJSON.toArray(contentItemIds);
		return contentItemIds;
	}

	public boolean isFolder() {
		return getContentClass().isFolderClass();
	}
	
	public boolean isDocument() {
		return getContentClass().isDocumentClass();
	}
	
	public String getContentType() {
		if (isFolder()) {
			return "folder";
		}
		return (String)contentItemJSON.get("contentType");
	}
	
	public String getContentFilename() {
		String filename = (String)contentItemJSON.get("contentFile");
		return filename;
	}
	
	public long getContentLength() throws Exception {
		String filename = (String)contentItemJSON.get("contentFile");
		InputStream stream = this.getClass().getResourceAsStream("../data/"+filename);
		long length = stream.available();
		stream.close();
		return length;
	}
	
	public InputStream getContentStream() throws Exception {
		String filename = (String)contentItemJSON.get("contentFile");
		InputStream stream = this.getClass().getResourceAsStream("../data/"+filename);
		return stream;
	}

}
