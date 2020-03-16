/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginMenuItem;

/**
 * This class defines a default menu for SamplePluginToolbarMenuType2 custom menu type.
 */
public class SamplePluginToolbarMenu2 extends PluginMenu {

	@Override
	public String getId() {
		return "DefaultSamplePluginToolbarMenuType2";
	}

	@Override
	public String getName(Locale locale) {
		return "Default menu for DefaultSamplePluginToolbarMenuType2";
	}

	@Override
	public String getMenuType() {
		return "SamplePluginToolbarMenuType2";
	}

	@Override
	public PluginMenuItem[] getMenuItems(Locale locale) {
		return new PluginMenuItem[] { new PluginMenuItem("SamplePluginAction"), new PluginMenuItem("SamplePluginCheckInAction"), new PluginMenuItem("Help") };
	}

	@Override
	public String getDescription(Locale locale) {
		return null;
	}
}
