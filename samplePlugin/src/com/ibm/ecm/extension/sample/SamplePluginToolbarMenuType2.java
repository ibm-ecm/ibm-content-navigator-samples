/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginMenuType;

/**
 * This class defines a second custom menu type.
 * <p>
 * Note: that there is no toolbar or menu in the SamplePlugin that uses this custom menu type. It is simply here to
 * demonstrate how to define a menu type.
 */
public class SamplePluginToolbarMenuType2 extends PluginMenuType {

	@Override
	public String getId() {
		return "SamplePluginToolbarMenuType2";
	}

	@Override
	public String getName(Locale locale) {
		return "Sample Plugin Toolbar Menu Type 2";
	}

	@Override
	public boolean isToolbar() {
		return true;
	}

	@Override
	public String getTooltip(Locale locale) {
		return null;
	}
}
