/**
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2017
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign;

import java.net.URLClassLoader;
import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginAsyncTaskType;
import com.ibm.icn.extension.docusign.tasks.AutocheckinTaskRegistration;

public class DocuSignPlugin extends Plugin {
	
	private PluginService [] serviceArray = null;
	private PluginAction [] actionArray = null;
	
//	public DocuSignPlugin()
//	{
//		super();
//	}

	@Override
	public String getId() {
		return "DocuSignPlugin";
	}
	
	@Override
	public String getCopyright() {
		/* Note: The copyright is not translated, so do not put into properties
		 * files that will be translated. */
		String copyright = "Licensed Materials - Property of IBM Corp. (5725-U01) "
				+ "(C) Copyright 2016 IBM Corporation. IBM and the IBM logo are "
				+ "trademarks of IBM Corporation, registered in many jurisdictions "
				+ "worldwide.  Java and all Java-based trademarks and logos are "
				+ "trademarks or registered trademarks of Oracle and/or its "
				+ "affiliates. Built on Eclipse is a trademark of Eclipse Foundation,"
				+ "Inc. Other product and service names might be trademarks of IBM "
				+ "or other companies. This Program is licensed under the terms of "
				+ "the license agreement accompanying the Program. This license "
				+ "agreement may be either located in a Program directory folder or "
				+ "library identified as \"License\" or \"Non_IBM_License\", if "
				+ "applicable, or provided as a printed license agreement. Please "
				+ "read this agreement carefully before using the Program. By using "
				+ "the Program, you agree to these terms.";
		return copyright;
	}

	@Override
	public String getName(Locale locale) {
		return "IBM Content Navigator DocuSign Sample Plugin";
	}

	@Override
	public String getVersion() {
		return "1.0.0.0";
	}
	
	private PluginAction[] getCachedActions() {

		if(actionArray == null)
		{
			actionArray = new com.ibm.ecm.extension.PluginAction[] {
					new com.ibm.icn.extension.docusign.action.SignSubmitAction(),
					new com.ibm.icn.extension.docusign.action.SignStatusAction()
			};
		}
		return actionArray;
	}

	@Override
	public PluginAction[] getActions() {
		return this.getCachedActions();
	}
	
	@Override
	public PluginResponseFilter[] getResponseFilters() {
		return  new PluginResponseFilter[] { new com.ibm.icn.extension.docusign.filter.DocuSignPluginResponseFilter()};
	}

	// @Override
	// public String getDojoModule() {
	// return "customWidget";
	// }

	@Override
	public String getDebugScript() {
		return "DocuSignPlugin.js";
	}
	
	@Override
	public String getScript() {
		return "DocuSignPlugin.js";
	}
	
	public String getDojoModule() {
		return "docuSign";
	}
	
	public String getConfigurationDijitClass() {
		return "docuSign.ConfigurationPane";
	}
	
	public PluginAsyncTaskType[] getAsyncTaskTypes() 
	{
		return new PluginAsyncTaskType[] {
				new AutocheckinTaskRegistration()
		};
	}
		
	private com.ibm.ecm.extension.PluginService[] getCachedServices() {
	
		if (serviceArray == null)
		{			
			PluginService signService = null;
			PluginService statusService = null;
			PluginService updateService = null;
			PluginService configurationService = null;
			PluginService getTemplatesService = null;
			PluginService loginService = null;
			
			try {
				URLClassLoader customClassLoader = com.ibm.icn.extension.docusign.util.ClassLoaderUtil
						.getCustomClassLoader(this.getClass());

				signService = (PluginService) customClassLoader
						.loadClass(
								"com.ibm.icn.extension.docusign.service.SignRequestService")
								.newInstance();
				statusService = (PluginService) customClassLoader
						.loadClass(
								"com.ibm.icn.extension.docusign.service.SignStatusService")
								.newInstance();
				updateService = (PluginService) customClassLoader
						.loadClass(
								"com.ibm.icn.extension.docusign.service.UpdateSignedDocumentService")
								.newInstance();
				configurationService = (PluginService) customClassLoader
						.loadClass(
								"com.ibm.icn.extension.docusign.service.GetConfigurationService")
								.newInstance();
				getTemplatesService = (PluginService) customClassLoader
						.loadClass(
								"com.ibm.icn.extension.docusign.service.GetTemplatesService")
								.newInstance();
				loginService = (PluginService) customClassLoader
						.loadClass(
								"com.ibm.icn.extension.docusign.service.DocuSignLoginService")
								.newInstance();
				
				serviceArray = new com.ibm.ecm.extension.PluginService[] {
						signService, statusService, updateService, configurationService, getTemplatesService, loginService};

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return serviceArray;

	}
	
	public com.ibm.ecm.extension.PluginService[] getServices() {		
		return this.getCachedServices();
	}
	
	public PluginMenu[] getMenus() {
		return new PluginMenu[] { new com.ibm.icn.extension.docusign.menu.DocuSignItemContextMenu()};
	}
}
