/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

public class SamplePluginCustomCMWFAction extends PluginAction {

	@Override
	public String getId() {
		return "SamplePluginCustomWFAction";
	}

	@Override
	public String getName(Locale locale) {
		return "Custom Workflow Action";
	}

	@Override
	public String getIcon() {
		return "SamplePluginAction.gif";
	}

	@Override
	public String getPrivilege() {
		return "";
	}

	@Override
	public boolean isMultiDoc() {
		return false;
	}

	@Override
	public String getActionFunction() {
		return "samplePluginCustomWFAction";
	}

	@Override
	public String getServerTypes() {
		return "cm";
	}
}
