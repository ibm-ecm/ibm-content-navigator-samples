/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.profile; 

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginService;

public class ProfilePlugin extends Plugin { 

	private PluginService[] pluginServices = new PluginService[] {
		new ProfilePluginService(),
        new ProfilePluginLookupService()
	};
	
	private PluginResponseFilter[] pluginResponseFilters = new PluginResponseFilter[] {
		new ProfilePluginResultsResponseFilter(),
		new ProfilePluginTeamspaceListResponseFilter(),
		new ProfilePluginOpenClassResponseFilter()
	};
	
	public static List<String> profileSupportedFieldList = new ArrayList<String>() {
		private static final long serialVersionUID = 2339464134992988445L;
		{
			add("modifiedBy");
			add("createdBy");
			add("createdByShortName");
			add("LastModifier");
			add("Creator");
			add("cmis:lastModifiedBy");
			add("cmis:createdBy");
			add("requestorShortName");
		}
	};
	
    public String getId() {
        return "ProfilePlugin";
    }

	public String getName(Locale locale) {
		return "IBM Sametime and Connections plug-in";
	}

    public String getScript() {
    	return "ProfilePlugin.js.jgz";
    }

	public String getDebugScript() {
		return "ProfilePlugin.js";
	}
    
	public String getConfigurationDijitClass() {
		return "profilePlugin.ConfigurationPane";
	}
    
	public String getDojoModule() {
		return "profilePlugin";
	}

    public String getVersion() {
        return "2.0.3";
    }
	
	public String getCSSFileName() {
		return "ProfilePlugin.css.jgz";
	}

	public String getDebugCSSFileName() {
		return "ProfilePlugin.css";
	}
	
    public PluginService[] getServices() {
        return pluginServices;
    }
	
	public PluginResponseFilter[] getResponseFilters() {
		return pluginResponseFilters;
	}
	
	public static void main(String[] args) {
		System.out.println(ProfilePlugin.profileSupportedFieldList.contains("LastModifier"));
	}
}
