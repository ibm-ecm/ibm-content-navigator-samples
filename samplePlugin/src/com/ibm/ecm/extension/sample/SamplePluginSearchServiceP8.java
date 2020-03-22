/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import org.apache.commons.codec.binary.Base64;

import com.filenet.api.collection.CmThumbnailSet;
import com.filenet.api.collection.IndependentObjectSet;
import com.filenet.api.collection.PageIterator;
import com.filenet.api.constants.PropertyNames;
import com.filenet.api.core.CmThumbnail;
import com.filenet.api.core.Document;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.property.PropertyFilter;
import com.filenet.api.query.SearchSQL;
import com.filenet.api.query.SearchScope;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.jaxrs.util.MessageResources;
import com.ibm.ecm.json.JSONResultSetColumn;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.ecm.json.JSONResultSetRow;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This class contains P8 specific logic for the sample plugin search service. It demonstrates running a search using
 * the P8 APIs and populating a JSONResultSetResponse object, which is used to populate the ecm.model.ResultSet
 * JavaScript model class. This class provides the structure and rows for the ecm.widget.listView.ContentList DOJO
 * widget.
 */
public class SamplePluginSearchServiceP8 {

	/**
	 * Runs the P8 search SQL
	 * 
	 * @param objectStore
	 *            Handle to the ObjectStore
	 * @param query
	 *            The query to run
	 * @param callbacks
	 *            The PluginServiceCallbacks object
	 * @param jsonResultSet
	 *            JSONResultSetResponse to build up the grid structure and rows.
	 * @param clientLocale
	 *            The locale of the client
	 */
	@SuppressWarnings("rawtypes")
	public static void executeP8Search(String repositoryId, String query, PluginServiceCallbacks callbacks, JSONResultSetResponse jsonResultSet, Locale clientLocale) throws Exception {
		ObjectStore objectStore = callbacks.getP8ObjectStore(repositoryId);

		buildP8ResultStructure(jsonResultSet, callbacks.getMessageResources(), clientLocale);

		SearchSQL searchSQL = new SearchSQL(query);
		SearchScope searchScope = new SearchScope(objectStore);

		// Use callbacks.getP8FolderResultsPropertyFilter() for folder results.
		PropertyFilter filter = callbacks.getP8DocumentResultsPropertyFilter();

		// Retrieve the first pageSize results.
		int pageSize = 100;
		List<Object> searchResults = new ArrayList<Object>(pageSize);
		IndependentObjectSet resultsObjectSet = searchScope.fetchObjects(searchSQL, pageSize, filter, true);
		PageIterator pageIterator = resultsObjectSet.pageIterator();
		if (pageIterator.nextPage()) {
			for (Object obj : pageIterator.getCurrentPage()) {
				searchResults.add(obj);
			}
		}

		// Retrieve the privilege masks for the search results.
		HashMap<Object, Long> privMasks = callbacks.getP8PrivilegeMasks(repositoryId, searchResults);

		for (Object searchResult : searchResults) {
			Document doc = (Document) searchResult;
			/*
			 *  IDs use the form:
			 *  <object class name>,<object store ID>,<object ID>
			 */
			StringBuffer sbId = new StringBuffer();
			sbId.append(doc.getClassName()).append(",").append(objectStore.get_Id().toString()).append(",").append(doc.get_Id().toString());

			long privileges = (privMasks != null) ? privMasks.get(doc) : 0L;

			JSONResultSetRow row = new JSONResultSetRow(sbId.toString(), doc.get_Name(), doc.get_MimeType(), privileges);

			// Add locked user information (if any)
			row.addAttribute("locked", doc.isLocked(), JSONResultSetRow.TYPE_BOOLEAN, null, (new Boolean(doc.isLocked())).toString());
			row.addAttribute("lockedUser", doc.get_LockOwner(), JSONResultSetRow.TYPE_STRING, null, doc.get_LockOwner());
			row.addAttribute("currentVersion", doc.get_IsCurrentVersion(), JSONResultSetRow.TYPE_BOOLEAN, null, (new Boolean(doc.get_IsCurrentVersion())).toString());

			// Add the attributes
			row.addAttribute("ID", doc.get_Id().toString(), JSONResultSetRow.TYPE_STRING, null, doc.get_Id().toString());
			row.addAttribute("className", doc.getClassName(), JSONResultSetRow.TYPE_STRING, null, doc.getClassName());
			row.addAttribute("ModifiedBy", doc.get_LastModifier(), JSONResultSetRow.TYPE_STRING, null, doc.get_LastModifier());
			row.addAttribute("LastModified", doc.get_DateLastModified().toString(), JSONResultSetRow.TYPE_TIMESTAMP, null, doc.get_DateLastModified().toString());
			row.addAttribute("Version", doc.get_MajorVersionNumber() + "." + doc.get_MinorVersionNumber(), JSONResultSetRow.TYPE_STRING, null, doc.get_MajorVersionNumber() + "." + doc.get_MinorVersionNumber());

			if (doc.getProperties().isPropertyPresent(PropertyNames.CM_THUMBNAILS)) {
				CmThumbnailSet thumbnails = doc.get_CmThumbnails();
				if (thumbnails != null && !thumbnails.isEmpty()) {
					Iterator iter = thumbnails.iterator();
					while (iter.hasNext()) {
						CmThumbnail thumbnailObj = (CmThumbnail) iter.next();
						byte[] thumbnail = thumbnailObj.get_Image();

						if (thumbnail != null && thumbnail.length > 0) {
							JSONObject thumbnailJson = new JSONObject();
							thumbnailJson.put("mimeType", thumbnailObj.get_MimeType());
							thumbnailJson.put("image", "data:" + thumbnailObj.get_MimeType() + ";base64," + Base64.encodeBase64String(thumbnail));
							row.addAttribute("thumbnail", thumbnailJson, JSONResultSetRow.TYPE_OBJECT, null, "");
						}
					}
				}
				thumbnails = null;
			}
			
			jsonResultSet.addRow(row);
		}
	}

	/**
	 * Builds the details and magazine structure for P8. This method will use a set of predefined columns and fields
	 * that always exist on every P8 object.
	 * 
	 * @param jsonResultSet
	 *            The JSONResultSetResponse object to populate with the structure
	 * @param messageResources
	 *            The resource bundle to retrieve default column names
	 * @param clientLocale
	 *            The locale of the client
	 */
	private static void buildP8ResultStructure(JSONResultSetResponse jsonResultSet, MessageResources resources, Locale clientLocale) {
		String[] states = new String[1];
		states[0] = JSONResultSetColumn.STATE_LOCKED;

		jsonResultSet.addColumn(new JSONResultSetColumn("&nbsp;", "multiStateIcon", false, states, resources.getMessage(clientLocale, "search.results.header.itemStateIcons")));
		jsonResultSet.addColumn(new JSONResultSetColumn("&nbsp;", "17px", "mimeTypeIcon", null, false, resources.getMessage(clientLocale, "search.results.header.mimeTypeIcon")));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.id"), "200px", "ID", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn("Class Name", "125px", "className", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.lastModifiedByUser"), "125px", "ModifiedBy", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.lastModifiedTimestamp"), "175px", "LastModified", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.version"), "50px", "Version", null, false));

		// Magazine view
		jsonResultSet.addMagazineColumn(new JSONResultSetColumn("thumbnail", "60px", "thumbnail", null, null));

		JSONArray fieldsToDisplay = new JSONArray();
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("field", "className");
		jsonObj.put("displayName", "Class");
		fieldsToDisplay.add(jsonObj);

		jsonObj = new JSONObject();
		jsonObj.put("field", "ModifiedBy");
		jsonObj.put("displayName", resources.getMessage(clientLocale, "search.results.header.lastModifiedByUser"));
		fieldsToDisplay.add(jsonObj);

		jsonObj = new JSONObject();
		jsonObj.put("field", "LastModified");
		jsonObj.put("displayName", resources.getMessage(clientLocale, "search.results.header.lastModifiedTimestamp"));
		fieldsToDisplay.add(jsonObj);

		jsonObj = new JSONObject();
		jsonObj.put("field", "Version");
		jsonObj.put("displayName", resources.getMessage(clientLocale, "search.results.header.lastModifiedTimestamp"));
		fieldsToDisplay.add(jsonObj);
		
		JSONArray extraFieldsToDisplay = new JSONArray();
		jsonObj = new JSONObject();
		jsonObj.put("field", "CmThumbnails");
		jsonObj.put("displayName", "Thumbnails");
		jsonObj.put("decorator", "MagazineViewDecorator.contentCellDecoratorCmThumbnails");
		extraFieldsToDisplay.add(jsonObj);

		jsonResultSet.addMagazineColumn(new JSONResultSetColumn("content", "100%", "content", fieldsToDisplay, extraFieldsToDisplay));
	}
}
