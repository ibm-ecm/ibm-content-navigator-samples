/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

// This action is provided for demonstrating actions that can be filtered based on an item's class or
// mimetype, or any other criteria. Use getActionModelClass() to specify a class where isEnabled() is
// implemented to check the item class, mime type, etc.
public class SamplePluginFilteredAction extends PluginAction {

	@Override
	public String getId() {
		return "SamplePluginFilteredAction";
	}

	@Override
	public String getActionFunction() {
		return "samplePluginFilteredAction";
	}

	@Override
	public String getIcon() {
		return "SamplePluginAction.gif";
	}

	@Override
	public String getName(Locale locale) {
		return "Only For Text Docs";
	}

	@Override
	public String getPrivilege() {
		return "";
	}

	@Override
	public String getServerTypes() {
		return "od,p8,cm";
	}

	@Override
	public boolean isMultiDoc() {
		return false;
	}

	@Override
	public boolean isGlobal() {
		return false;
	}

	// override this to provide your own Action class, use it to provide your own implementation for isEnabled()
	// isVisible(), etc.
	@Override
	public String getActionModelClass() {
		return "samplePluginDojo/CustomAction";
	}

}
