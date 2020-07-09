/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.ecm.extension.embeddedViewerPlugin;

import java.util.Locale;

import com.ibm.ecm.extension.PluginFeature;

public class ContentViewerFeature extends PluginFeature {

	public String getId() {
		return "embeddedContentViewer";
	}

	public String getName(Locale locale) {
		return "ICN Content Viewer";
	}

	public String getDescription(Locale locale) {
		return "A deployment of ecm.widget.viewer.ContentViewer as a feature, for embedding in external applications";
	}

	public String getIconUrl() {
		return "searchLaunchIcon";
	}

	public String getFeatureIconTooltipText(Locale locale) {
		return null;
	}

	public String getPopupWindowTooltipText(Locale locale) {
		return null;
	}

	public String getContentClass() {
		return "embeddedContentViewerDojo.ContentViewerFrame";
	}

	public String getPopupWindowClass() {
		return null;
	}

	public boolean isPreLoad() {
		return false;
	}
}
