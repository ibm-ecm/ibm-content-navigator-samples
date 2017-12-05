package com.ibm.ecm.extension;

import java.util.Locale;

import com.ibm.json.java.JSONObject;

public class ReactSendAllAsAttachmentAction extends PluginAction {

	@Override
	public String getActionFunction() {
		return "reactSendEmailAllAsAttachment";
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
		return "reactSendEmailAllAsAttachment";
	}

	@Override
	public String getName(Locale arg0) {
		return "React - All Parts as a Compressed File";
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
		return "reactEmailDialogPlugin/ReactSendAsAttachmentAction";
	}
}
