/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginViewerDef;

public class SamplePluginImageViewerDef extends PluginViewerDef {

	private static final String[] SUPPORTED_SERVER_TYPES = new String[] { "cm", "p8", "od", "cmis" };

	private static final String[] SUPPORTED_MIME_TYPES = new String[] { "image/bmp", "image/gif", "image/jpeg", "image/jpg", "image/pjpeg", "image/png", "image/x-png", };

	private static final String VIEWER_CLASS = "samplePluginDojo.SampleImageViewer";

	public String getId() {
		return "sampleViewer";
	}

	public String getLaunchUrlPattern() {
		// This is a frameless viewer, so no URL is required.
		return "";
	}

	public String getName(Locale arg0) {
		return "SampleImageViewer";
	}

	public String[] getSupportedContentTypes() {
		return SUPPORTED_MIME_TYPES;
	}

	public String[] getSupportedServerTypes() {
		return SUPPORTED_SERVER_TYPES;
	}

	public String getViewerClass() {
		return VIEWER_CLASS;
	}
}
