/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.repositoryType;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Hashtable;

import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.sample.repositoryType.model.AttributeDefinition;
import com.ibm.ecm.extension.sample.repositoryType.model.Connection;
import com.ibm.ecm.extension.sample.repositoryType.model.ContentClass;
import com.ibm.ecm.extension.sample.repositoryType.model.ContentItem;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResultSetColumn;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.ecm.json.JSONResultSetRow;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public final class SampleRepositoryUtils {

	/**
	 * Builds a result set response for a list of content items. The result set
	 * response is used on a variety of services.
	 */
	public static JSONResultSetResponse buildResultSetResponse(PluginServiceCallbacks callbacks, Connection connection,
			ArrayList<ContentItem> contentItemList) {
		ContentItem[] contentItems = new ContentItem[contentItemList.size()];
		contentItemList.toArray(contentItems);
		return buildResultSetResponse(callbacks, connection, contentItems);
	}

	/**
	 * Builds a result set response for a list of content items. The result set
	 * response is used on a variety of services.
	 */
	public static JSONResultSetResponse buildResultSetResponse(PluginServiceCallbacks callbacks, Connection connection,
			ContentItem[] contentItems) {
		JSONResultSetResponse resultSetResponse = new JSONResultSetResponse();
		try {

			// Iterate through all the items and determine the columns that are
			// needed to present all of the item attributes
			Hashtable<String, ContentClass> contentClasses = new Hashtable<String, ContentClass>();
			for (int i = 0; i < contentItems.length; i++) {
				ContentItem contentItem = contentItems[i];
				String contentClassId = contentItem.getContentClassId();
				if (!contentClasses.containsKey(contentClassId)) {
					contentClasses.put(contentClassId, connection.getContentClass(contentClassId));
				}
			}
			ArrayList<String> joinedAttributeDefIds = new ArrayList<String>();
			Enumeration<ContentClass> elements = contentClasses.elements();
			while (elements.hasMoreElements()) {
				ContentClass contentClass = elements.nextElement();
				String[] attributeStrings = contentClass.getAttributeDefinitionIds();
				for (int i = 0; i < attributeStrings.length; i++) {
					if (!joinedAttributeDefIds.contains(attributeStrings[i])) {
						joinedAttributeDefIds.add(attributeStrings[i]);
					}
				}
			}

			// Add the columns to the result response
			resultSetResponse.addColumn(new JSONResultSetColumn("&nbsp;", "multiStateIcon", false, new String[0]));
			resultSetResponse.addColumn(new JSONResultSetColumn("&nbsp;", "17px", "mimeTypeIcon", null, false));
			for (int i = 0; i < joinedAttributeDefIds.size(); i++) {
				String attributeDefinitionId = joinedAttributeDefIds.get(i);
				AttributeDefinition attributeDef = connection.getAttributeDefinition(attributeDefinitionId);
				if (!attributeDef.isSystem()) {
					JSONResultSetColumn resultSetColumn = new JSONResultSetColumn();
					resultSetColumn.setName(attributeDef.getName());
					resultSetColumn.setField(attributeDef.getId());
					resultSetColumn.setWidth(Integer.toString(Math.min(attributeDef.getMaxLength(), 10)) + "em");
					resultSetResponse.addColumn(resultSetColumn);
				}
			}

			// Add magazine columns for the magazine view. For the sample, just
			// a thumbnail and the first attribute of the class(es) is displayed. Usually
			// this would be configurable and likely provide important timestamps
			resultSetResponse.addMagazineColumn(new JSONResultSetColumn("thumbnail", "60px", "thumbnail", null, null));
			JSONArray fieldsToDisplay = new JSONArray();
			if (joinedAttributeDefIds.size() > 0) {
				String attributeDefinitionId = joinedAttributeDefIds.get(0);
				AttributeDefinition attributeDef = connection.getAttributeDefinition(attributeDefinitionId);
				JSONObject jsonObj = new JSONObject();
				jsonObj.put("field", attributeDef.getId());
				jsonObj.put("displayName", attributeDef.getName());
				fieldsToDisplay.add(jsonObj);
			}
			resultSetResponse.addMagazineColumn(new JSONResultSetColumn("content", "100%", "content", fieldsToDisplay,
					null));

			// Add the rows to the result response
			for (int i = 0; i < contentItems.length; i++) {
				ContentItem contentItem = contentItems[i];
				JSONResultSetRow resultSetRow = new JSONResultSetRow(contentItem.getContentClassId(), contentItem.getId(), contentItem.getName(),
						contentItem.getContentType(), JSONResultSetRow.PRIV_VIEWDOC | JSONResultSetRow.PRIV_EXPORT | JSONResultSetRow.PRIV_EMAILDOC | JSONResultSetRow.PRIV_PRINTDOC | JSONResultSetRow.PRIV_EDITPROPERTIES);
				resultSetRow.setName(contentItem.getName());
				String[] attributeIds = contentItem.getAttributeIds();
				for (int j = 0; j < attributeIds.length; j++) {
					String attributeId = attributeIds[j];
					Object attributeValue = contentItem.getAttributeValue(attributeId);
					resultSetRow.addAttribute(attributeId, attributeValue, null, null, null);
				}
				resultSetResponse.addRow(resultSetRow);
			}

		} catch (Exception e) {
			callbacks.getLogger().logError(SampleRepositoryUtils.class, "buildResultSetResponse", e);
			JSONMessage message = new JSONMessage(10000, "The content server is not available.",
					"The content server cannot return content items.", "",
					"See the server logs for more information on this error: " + e.getLocalizedMessage(), null);
			resultSetResponse.addErrorMessage(message);
		}
		return resultSetResponse;
	}

}
