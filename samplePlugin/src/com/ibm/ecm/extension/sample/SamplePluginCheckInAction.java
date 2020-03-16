/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

/**
 * Defines a custom action for checking in a document.
 */
public class SamplePluginCheckInAction extends PluginAction {

	@Override
	public String getId() {
		return "SamplePluginCheckInAction";
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
		return "Custom Checkin";
	}

	@Override
	public String getPrivilege() {
		return "privCheckInOutDoc,privEditDoc"; // enabled when checkin is enabled
	}

	@Override
	public String getServerTypes() {
		return "p8,cm";
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
