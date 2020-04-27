/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.dependent;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class DependentPlugin extends Plugin {

	@Override
	public String getId() {
		return "DependentPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return "Dependent Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.7.3";
	}

	@Override
	public String getScript() {
		return "DependentPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "DependentPluginDojo";
	}

	@Override
	public PluginAction[] getActions() {
		return new PluginAction[] { new DependentPluginAction() };
	}

	@Override
	public Class<?>[] getEventHandlers() {
		return new Class[]{DependentPluginEventHandler.class};
	}
}