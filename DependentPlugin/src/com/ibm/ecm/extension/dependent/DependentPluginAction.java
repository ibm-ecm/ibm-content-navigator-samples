/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.dependent;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

/**
 * Defines a custom action to displays some properties of a selected document or folder. This action is implemented
 * using the DependentPluginAction function within the DependentPlugin.js JavaScript.
 */
public class DependentPluginAction extends PluginAction {

	@Override
	public String getId() {
		return "DependentPluginAction";
	}

	@Override
	public String getActionFunction() {
		return "DependentPluginAction";
	}

	@Override
	public String getIcon() {
		return "DependentPluginAction.gif";
	}

	@Override
	public String getName(Locale locale) {
		return "Dependent Action";
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