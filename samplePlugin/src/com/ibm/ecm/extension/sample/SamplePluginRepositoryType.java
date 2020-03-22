/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginRepositoryConnection;
import com.ibm.ecm.extension.PluginRepositoryType;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryLogoff;
import com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryLogon;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;

public class SamplePluginRepositoryType extends PluginRepositoryType {
	
	public static String REPOSITORY_TYPE_ID = "sampleRepoType";
		
	private static final Map<String, String> sampleRepositoryActionMap = new HashMap<String, String>() {
		private static final long serialVersionUID = 7212659949366854547L;

		{
			put("findUsers", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryFindUsers");
			put("findGroups", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryFindGroups");
			put("logon", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryLogon");
			put("logoff", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryLogoff");
			put("getPrivileges", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryGetPrivileges");
			put("changePassword", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryChangePassword");
			put("getContentItems", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryGetContentItems");
			put("openFolder", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryOpenFolder");
			put("openItem", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryOpenItem");
			put("getContentClasses", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryGetContentClasses");
			put("openContentClass", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryOpenContentClass");
			put("getSearchTemplates", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryGetSearchTemplates");
			put("openSearchTemplate", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryOpenSearchTemplate");
			put("search", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositorySearch");
			put("getDocument", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryGetDocument");
			put("editAttributes", "com.ibm.ecm.extension.sample.repositoryType.SampleRepositoryEditAttributes");
		}
	};
	
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, String action, HttpServletRequest request, HttpServletResponse response) throws Exception {
		if (sampleRepositoryActionMap.containsKey(action)) {
			callbacks.getLogger().logDebug(this, "performAction", "Executing \"" + action + "\"...");
			Object obj = Class.forName(sampleRepositoryActionMap.get(action)).newInstance();
			Method m = obj.getClass().getMethod("performAction", PluginServiceCallbacks.class, RepositoryConfig.class, HttpServletRequest.class, HttpServletResponse.class);
			m.invoke(obj, callbacks, repositoryConfig, request, response);
		} else {
			callbacks.getLogger().logError(this, "performAction", "Plugin does not support the repository action \"" + action + "\".");
			// return JSON with an error as well for the client
			JSONResponse jsonResponse = new JSONResponse();
			jsonResponse.addErrorMessage(new JSONMessage(2002, "SamplePlugin does not support the action", "The repository action \""+action+"\" is not supported.", null, null, null));
			response.getWriter().write(jsonResponse.serialize());
		}
	}

	@Override
	public String getId() {
		return REPOSITORY_TYPE_ID;
	}

	@Override
	public String getName(Locale locale) {
		return "Sample Repository Type";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "samplePluginDojo.SampleRepositoryGeneralConfigurationPane";
	}
	
	@Override
	public String getConnectedConfigurationDijitClass() {
		return "samplePluginDojo.SampleRepositoryConfigurationParametersPane";
	}
	
	/**
	 * @since 3.0.6
	 */
	@Override
	public String [][] getExtendedConfigDijitClasses(Locale locale) {
		return new String[][] {{"Tab1", "samplePluginDojo.SampleRepositoryExtendedConfigPane1"},
			{"Tab2", "samplePluginDojo.SampleRepositoryExtendedConfigPane2"},
			{"Tab3", "samplePluginDojo.SampleRepositoryExtendedConfigPane3"}};
	}

	@Override
	public PluginRepositoryConnection logon(PluginServiceCallbacks callbacks, HttpServletRequest request, String userid, String password,
			RepositoryConfig repositoryConfig) throws Exception {
		PluginRepositoryConnection connection = SampleRepositoryLogon.class.newInstance().logon(callbacks, request, userid, password, repositoryConfig);
		return connection;
	}

	@Override
	public void logoff(PluginServiceCallbacks callbacks, HttpSession session,
			PluginRepositoryConnection connection) throws Exception {
		SampleRepositoryLogoff.class.newInstance().logoff(callbacks, session, connection);
	}

	@Override
	public String getRepositoryModelClass() {
		return "samplePluginDojo.SampleRepositoryModel";
	}

	public String getIconClass() {
		return "repositoryIcon";
	}
}
