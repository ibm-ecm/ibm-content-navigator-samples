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
 * This class defines a default menu for the menu type defined by SamplePluginCustomMenuType.
 * <p>
 * Note: When creating a custom menu type, a menu of the name "Default" appended by the id of the custom menu type is
 * required.
 */
public class SamplePluginToolbarMenu extends PluginMenu {

	@Override
	public String getId() {
		return "DefaultSamplePluginToolbarMenuType";
	}

	@Override
	public String getName(Locale locale) {
		return "Default menu for DefaultSamplePluginToolbarMenuType";
	}

	@Override
	public String getMenuType() {
		return "SamplePluginToolbarMenuType";
	}

	@Override
	public PluginMenuItem[] getMenuItems(Locale locale) {
		return new PluginMenuItem[] { new PluginMenuItem("Help"), new PluginMenuItem("About"), new PluginMenuItem("Separator"), new PluginMenuItem("SamplePluginAction") };
	}

	@Override
	public String getDescription(Locale locale) {
		return "Help, About, and SamplePluginAction actions";
	}
}
