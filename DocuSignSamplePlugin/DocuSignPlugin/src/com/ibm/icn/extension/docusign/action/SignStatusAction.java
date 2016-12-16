/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016  All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

package com.ibm.icn.extension.docusign.action;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;

public class SignStatusAction extends PluginAction {

	private final static String CONST_ACTION_ID = "docuSign.action.SignStatusAction";
	private final static String CONST_MODEL_CLASS = "docuSign.action.SignStatusAction";
	private final static String CONST_FUNC_NAME = "performAction";
	private final static String CONST_SVR_TYPE = "p8";
	
	@Override
	public String getId() {
		return CONST_ACTION_ID;
	}

	@Override
	public String getName(Locale locale) {
		return "Get Sign Status";
	}

	@Override
	public String getIcon() {
		return "";
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
		return CONST_FUNC_NAME;
	}

	@Override
	public String getServerTypes() {
		return CONST_SVR_TYPE;
	}

	@Override
	public String getActionModelClass() {
		return CONST_MODEL_CLASS;
	}

}
