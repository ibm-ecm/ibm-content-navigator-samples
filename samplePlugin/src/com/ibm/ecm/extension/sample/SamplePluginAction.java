/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

/**
 * Defines a custom action to displays some properties of a selected document or folder. This action is implemented
 * using the samplePluginAction function within the SamplePlugin.js JavaScript.
 */
public class SamplePluginAction extends PluginAction {

	@Override
	public String getId() {
		return "SamplePluginAction";
	}

	@Override
	public String getActionFunction() {
		return "samplePluginAction";
	}

	@Override
	public String getIcon() {
		return "SamplePluginAction.gif";
	}

	@Override
	public String getName(Locale locale) {
		return "A sample action";
	}

	@Override
	public String getPrivilege() {
		return "privViewDoc"; // enabled when viewing is enabled
	}

	@Override
	public String getServerTypes() {
		return "od,p8,cm,cmis,box";
	}

	@Override
	public boolean isMultiDoc() {
		return false;
	}

	@Override
	public boolean isGlobal() {
		return true;
	}

}
