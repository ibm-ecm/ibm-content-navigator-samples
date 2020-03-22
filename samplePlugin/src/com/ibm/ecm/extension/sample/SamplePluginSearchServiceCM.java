/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.jaxrs.util.MessageResources;
import com.ibm.ecm.json.JSONResultSetColumn;
import com.ibm.ecm.json.JSONResultSetResponse;
import com.ibm.ecm.json.JSONResultSetRow;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.mm.sdk.common.DKConstant;
import com.ibm.mm.sdk.common.DKConstantICM;
import com.ibm.mm.sdk.common.DKDDO;
import com.ibm.mm.sdk.common.DKLobICM;
import com.ibm.mm.sdk.common.DKNVPair;
import com.ibm.mm.sdk.common.DKPidICM;
import com.ibm.mm.sdk.common.DKRetrieveOptionsICM;
import com.ibm.mm.sdk.common.dkResultSetCursor;
import com.ibm.mm.sdk.server.DKDatastoreICM;

/**
 * This class contains CM specific logic for the sample plugin search service. It demonstrates running a search using
 * the CM8 APIs and populating a JSONResultSetResponse object, which is used to populate the ecm.model.ResultSet
 * JavaScript model class. This class provides the structure and rows for the ecm.widget.listView.ContentList DOJO
 * widget.
 */
public class SamplePluginSearchServiceCM {

	/**
	 * Runs the CM XPath query provided by the user.
	 * 
	 * @param datastore
	 *            Handle to the CM8 DKDatastoreICM connection object.
	 * @param query
	 *            The XPath query
	 * @param callbacks
	 *            The PluginServiceCallbacks object
	 * @param jsonResultSet
	 *            The JSONResultSetResponse object to populate with the structure and results of the search
	 * @param clientLocale
	 *            The locale of the client
	 * @throws Exception
	 */
	public static void executeCMSearch(String repositoryId, String query, PluginServiceCallbacks callbacks, JSONResultSetResponse jsonResultSet, Locale clientLocale) throws Exception {

		DKDatastoreICM datastore = callbacks.getCMDatastore(repositoryId);

		buildCMResultStructure(jsonResultSet, callbacks.getMessageResources(), clientLocale);

		// Set the search options to retrieve the required information
		DKRetrieveOptionsICM dkRetrieveOptions = DKRetrieveOptionsICM.createInstance(datastore);
		// Get the current version.
		dkRetrieveOptions.functionVersionLatest(true);
		// Retrieve base attributes
		dkRetrieveOptions.baseAttributes(true);
		// Retrieve the ACL name
		dkRetrieveOptions.basePropertyAclName(true);
		// Do not retrieve resource content
		dkRetrieveOptions.resourceContent(false);
		// Get the properties associated with check out details
		dkRetrieveOptions.basePropertyCheckedOutDetails(true);
		// Retrieve the parts list
		dkRetrieveOptions.partsList(true);
		// Retrieve the parts attributes
		dkRetrieveOptions.partsAttributes(true);
		if (callbacks.CMApiAndServerVersionAtOrNewer(datastore, 8, 4, 2, 2)) {
			// ... but only retrieve the *core* parts attributes
			dkRetrieveOptions.behaviorPartsAttributesCoreOnly(true);
		}

		DKNVPair options[] = new DKNVPair[] { new DKNVPair(DKConstant.DK_CM_PARM_MAX_RESULTS, "350"), new DKNVPair(DKConstant.DK_CM_PARM_RETRIEVE, dkRetrieveOptions), new DKNVPair(DKConstant.DK_CM_PARM_END, null) };

		dkResultSetCursor cursor = datastore.execute(query, DKConstant.DK_CM_XQPE_QL_TYPE, options);
		List<DKDDO> searchResults = new ArrayList<DKDDO>();
		DKDDO ddo;
		while ((ddo = cursor.fetchNext()) != null) { // Get the next ddo
			searchResults.add(ddo);
		}
		cursor.close();
		cursor.destroy();

		// Retrieve the privilege masks for the items.
		HashMap<DKDDO, Long> privMasks = callbacks.getCMPrivilegeMasks(repositoryId, searchResults);

		// Add items to resultset
		for (DKDDO item : searchResults) {
			DKPidICM pidICM = (DKPidICM) item.getPidObject();
			String itemTypeName = getCMItemTypeName(item);

			String mimeType = "unknown/unknown";

			// Get the mimetype. For this sample we will only retrieve mimetypes from resource items. If the content is a document
			// you should obtain the mimetype from the parts list.
			if (ddo instanceof DKLobICM) {
				mimeType = ((DKLobICM) ddo).getMimeType();
			}

			// Add Checked out user information (if any)
			short propId = item.propertyId(DKConstantICM.DK_ICM_PROPERTY_CHECKEDOUTUSERID);
			String checkedOutUser = null;
			if (propId > 0) {
				checkedOutUser = (String) item.getProperty(propId);
			}

			boolean isCheckedOut = false;
			if (checkedOutUser != null && checkedOutUser.length() > 0)
				isCheckedOut = true;

			long privileges = (privMasks != null) ? privMasks.get(item) : 0L;
			JSONResultSetRow row = new JSONResultSetRow(itemTypeName, pidICM.toString(), getCMItemName(item, callbacks.getMessageResources(), clientLocale), mimeType, privileges);

			// Add checked out user information (if any)
			row.addAttribute("locked", isCheckedOut, JSONResultSetRow.TYPE_BOOLEAN, null, (new Boolean(isCheckedOut)).toString());
			row.addAttribute("lockedUser", checkedOutUser, JSONResultSetRow.TYPE_STRING, null, checkedOutUser);

			// Add the attributes
			row.addAttribute("ITEMID", pidICM.getIdString(), JSONResultSetRow.TYPE_STRING, null, pidICM.getIdString());
			row.addAttribute("itemType", itemTypeName, JSONResultSetRow.TYPE_STRING, null, itemTypeName);

			// Add modified timestamp
			propId = item.propertyId(DKConstantICM.DK_ICM_PROPERTY_LASTCHANGEDTS);
			if (propId != 0) {
				row.addAttribute("lastModified", ((Timestamp) item.getProperty(propId)).toString(), JSONResultSetRow.TYPE_TIMESTAMP, null, item.getProperty(propId).toString());
			}

			// Add modified user
			propId = item.propertyId(DKConstantICM.DK_ICM_PROPERTY_LASTCHANGEDUSERID);
			if (propId != 0)
				row.addAttribute("modifiedBy", item.getProperty(propId), JSONResultSetRow.TYPE_STRING, null, item.getProperty(propId).toString());

			jsonResultSet.addRow(row);
		}
	}

	/**
	 * Builds the details and magazine structure for CM8. This method will use a set of predefined columns and fields
	 * that always exist on every CM8 item.
	 * 
	 * @param jsonResultSet
	 *            The JSONResultSetResponse object to populate with the structure
	 * @param messageResources
	 *            The resource bundle to retrieve default column names
	 * @param clientLocale
	 *            The locale of the client
	 */
	private static void buildCMResultStructure(JSONResultSetResponse jsonResultSet, MessageResources resources, Locale clientLocale) {
		String[] states = new String[1];
		states[0] = JSONResultSetColumn.STATE_LOCKED;

		// Details view
		jsonResultSet.addColumn(new JSONResultSetColumn("&nbsp;", "multiStateIcon", false, states, resources.getMessage(clientLocale, "search.results.header.itemStateIcons")));
		jsonResultSet.addColumn(new JSONResultSetColumn("&nbsp;", "17px", "mimeTypeIcon", null, false, resources.getMessage(clientLocale, "search.results.header.mimeTypeIcon")));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.id"), "200px", "ITEMID", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn("Item Type", "150px", "itemType", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.lastModifiedByUser"), "150px", "modifiedBy", null, false));
		jsonResultSet.addColumn(new JSONResultSetColumn(resources.getMessage(clientLocale, "search.results.header.lastModifiedTimestamp"), "150px", "lastModified", null, false));

		// Magazine view
		jsonResultSet.addMagazineColumn(new JSONResultSetColumn("thumbnail", "60px", "thumbnail", null, null));

		JSONArray fieldsToDisplay = new JSONArray();
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("field", "itemType");
		jsonObj.put("displayName", "Item Type");
		fieldsToDisplay.add(jsonObj);

		jsonObj = new JSONObject();
		jsonObj.put("field", "modifiedBy");
		jsonObj.put("displayName", resources.getMessage(clientLocale, "search.results.header.lastModifiedByUser"));
		fieldsToDisplay.add(jsonObj);

		jsonObj = new JSONObject();
		jsonObj.put("field", "lastModified");
		jsonObj.put("displayName", resources.getMessage(clientLocale, "search.results.header.lastModifiedTimestamp"));
		fieldsToDisplay.add(jsonObj);

		jsonResultSet.addMagazineColumn(new JSONResultSetColumn("content", "100%", "content", fieldsToDisplay, null));
	}

	/**
	 * Retrieves the CM8 Item Type associated with the given item.
	 * 
	 * @param ddo
	 *            The DKDDO item
	 * @return Returns the CM8 Item Type name
	 */
	private static String getCMItemTypeName(DKDDO ddo) {
		String entName = ddo.getObjectType();
		int idx = ddo.getObjectType().indexOf(";"); // find the first ";" in this string
		if (idx > 0) {
			entName = ddo.getObjectType().substring(0, idx);
		}
		return entName;
	}

	/**
	 * Retrieves the name of the given CM8 item.
	 * 
	 * @param ddo
	 *            The DKDDO object to retrieve the name
	 * @param messageResources
	 *            The resource bundle to retrieve root folder and system folder names
	 * @param clientLocale
	 *            The locale of the client
	 * @return Returns the String name of the item
	 */
	private static String getCMItemName(DKDDO ddo, MessageResources messageResources, Locale clientLocale) throws Exception {
		String cmNameAttribute = DKConstantICM.DK_ICM_NAME_ATTR;
		String nameValue = "";

		// If the standard name attribute ICM$NAME exists, use it
		short dataId = ddo.dataId(DKConstant.DK_CM_NAMESPACE_ATTR, cmNameAttribute);
		if (dataId > 0) {
			nameValue = (String) ddo.getData(dataId);
		}

		if (nameValue.equals("ICMROOTFOLDER")) {
			nameValue = messageResources.getMessage(clientLocale, "folder.root.name");
		} else if (nameValue.equals("ICMSYSDEFAULTFOLDER")) {
			nameValue = messageResources.getMessage(clientLocale, "folder.sysdefault.name");
		}

		if (nameValue == "")
			nameValue = ddo.getPidObject().getIdString();

		return nameValue;
	}
}
