/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.emailLookup;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class EmailLookupPlugin extends Plugin {

	public static String PLUGIN_ID = "EmailLookupPlugin";

	@Override
	public String getId() {
		return PLUGIN_ID;
	}

	@Override
	public String getName(Locale locale) {
		return "Email Lookup Plugin";
	}

	@Override
	public String getVersion() {
		return "1.0";
	}

	@Override
	public String getScript() {
		return "emailLookupPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "emailLookupPluginDojo";
	}

	@Override
	public PluginService[] getServices() {
		return new PluginService[] { new EmailLookupPluginService() };
	}

}