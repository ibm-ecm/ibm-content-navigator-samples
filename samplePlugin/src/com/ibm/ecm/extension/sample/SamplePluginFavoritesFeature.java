/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginFeature;

public class SamplePluginFavoritesFeature extends PluginFeature {

	@Override
	public String getId() {
		return "sampleFavoritesFeature";
	}

	@Override
	public String getName(Locale locale) {
		return "Sample Favorites Feature";
	}

	@Override
	public String getDescription(Locale locale) {
		return "This is a sample favorites feature extension, provided by the sample plugin";
	}

	@Override
	public String getIconUrl() {
		return "favoritesLaunchIcon";
	}

	@Override
	public String getFeatureIconTooltipText(Locale locale) {
		return null;
	}

	@Override
	public String getPopupWindowTooltipText(Locale locale) {
		return null;
	}

	@Override
	public String getContentClass() {
		return "samplePluginDojo.SampleFavoritesPane";
	}

	@Override
	public String getPopupWindowClass() {
		return null;
	}

	@Override
	public boolean isPreLoad() {
		return false;
	}

	@Override
	public String getHelpContext() {
		return "/sample.project.help.context/";
	}
}
