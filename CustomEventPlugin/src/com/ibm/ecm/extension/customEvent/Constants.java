/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.customEvent;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Constants {
	public static final String ACTION_ID = "actionId";
	public static final String REPOSITORY_ID = "repositoryId";
	public static final String DOCIDS = "docIds";
	public static final String SERVER_TYPE_P8 = "p8";
	
	public static final Map<String, String> actionEventMap = Collections.unmodifiableMap(new HashMap<String, String>() {
		private static final long serialVersionUID = 1L;
		{
			// view
			put("View", "ICNViewEvent");
			put("MergeSplit", "ICNViewEvent");
			put("Preview", "ICNViewEvent");
			
			// download
			put("Download", "ICNDownloadEvent");
			put("DownloadAll", "ICNDownloadEvent");
			put("DownloadAsOriginal", "ICNDownloadEvent");
			put("DownloadAsPdf", "ICNDownloadEvent");
			put("DownloadAllAsPdf", "ICNDownloadEvent");
			put("AsperaDownload", "ICNDownloadEvent");
			
		}
	});
}
