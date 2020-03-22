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
 * This class defines the default menu for the SamplPluginContextMenuMenuType.
 * <p>
 * Note: When creating a custom menu type, a menu of the name "Default" appended by the id of the custom menu type is
 * required.
 */
public class SamplePluginContextMenuMenu extends PluginMenu {

	@Override
	public String getId() {
		return "DefaultSamplePluginContextMenuMenuType";
	}

	@Override
	public String getName(Locale locale) {
		return "Default menu for SamplePluginContextMenuMenuType";
	}

	@Override
	public String getMenuType() {
		return "SamplePluginContextMenuMenuType";
	}

	@Override
	public PluginMenuItem[] getMenuItems(Locale locale) {
		String[] cascading1ActionIds = new String[] { "Properties", "Separator", "Help", "About" };
		String[] moreActionsActionIds = new String[] { "Preview", "OpenFolder" };
		return new PluginMenuItem[] { new PluginMenuItem("SamplePluginAction"), new PluginMenuItem("Separator"), new PluginMenuItem("Cascading Label1", cascading1ActionIds), new PluginMenuItem("DefaultMoreActions", moreActionsActionIds) };
	}

	@Override
	public String getDescription(Locale locale) {
		return "Default sample plugin context menu menu description";
	}

}
