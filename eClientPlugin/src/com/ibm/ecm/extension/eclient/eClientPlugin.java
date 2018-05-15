package com.ibm.ecm.extension.eclient;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.util.MessageUtil;

public class eClientPlugin extends Plugin {

	@Override
	public String getId() {
		return "eClientPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return MessageUtil.getMessage(locale, "plugins.ecPlugin.name");
	}

	@Override
	public String getVersion() {
		return"2.0.3";
	}
	
	@Override
	public String getConfigurationDijitClass() {
		return "ecPlugin.ConfigurationPane";
	}
	
    public String getDojoModule() {
    	return "ecPlugin";
    }

}
