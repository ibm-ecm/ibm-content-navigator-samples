/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

public class SamplePluginFileUploadAction extends PluginAction {

	@Override
	public String getId() {
		return "SamplePluginFileUploadAction";
	}

	@Override
	public String getName(Locale locale) {
		return "Replace Content";
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
		return "samplePluginFileUploadAction";
	}

	@Override
	public String getServerTypes() {
		return "cm";
	}

	@Override
	public String getActionModelClass() {
		return "samplePluginDojo/FileUploadCustomAction";
	}

}
