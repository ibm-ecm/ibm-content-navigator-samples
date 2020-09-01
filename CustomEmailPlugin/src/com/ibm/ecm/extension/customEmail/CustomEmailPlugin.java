/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.customEmail;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class CustomEmailPlugin extends Plugin {

	public static String PLUGIN_ID = "CustomEmailPlugin";
	private PluginResponseFilter[] responseFilters = null;

	@Override
	public String getId() {
		return PLUGIN_ID;
	}

	@Override
	public String getName(Locale locale) {
		return "Custom Email Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.9";
	}

	@Override
	public String getScript() {
		return "CustomEmailPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "customEmailPluginDojo";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "customEmailPluginDojo.ConfigurationPane";
	}


	@Override
	public PluginResponseFilter[] getResponseFilters() {
		if (responseFilters == null) {
			responseFilters = new PluginResponseFilter[] { new CustomEmailPluginResponseFilter() };
		}
		return responseFilters;
	}

}