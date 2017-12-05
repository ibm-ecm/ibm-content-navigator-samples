package com.ibm.ecm.extension;

import java.util.Locale;

import com.ibm.json.java.JSONObject;

public class ReactSendAsLinkAction extends PluginAction {

	@Override
	public String getActionFunction() {
		return "reactSendEmailAsLink";
	}

	@Override
	public String getIcon() {
		return "";
	}
	public String getIconClass() {
		return "";
	}
	@Override
	public String getId() {
		return "reactSendEmailAsLink";
	}

	@Override
	public String getName(Locale arg0) {
		return "React - As a link";
	}

	@Override
	public String getPrivilege() {
		return "";
	}

	@Override
	public String getServerTypes() {
		return "";
	}

	@Override
	public boolean isMultiDoc() {
		return true;
	}
	
	public boolean isGlobal() {
		return true;
	}
	
	public String[] getMenuTypes() {
		return new String[0];
	}
	
	public JSONObject getAdditionalConfiguration(Locale locale) {
		return new JSONObject();
	}
	
	public String getActionModelClass() {
		return "";
	}
}
