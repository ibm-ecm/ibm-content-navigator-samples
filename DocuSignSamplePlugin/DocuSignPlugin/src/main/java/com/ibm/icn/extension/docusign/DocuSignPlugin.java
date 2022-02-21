/**
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2016
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign;

import java.net.URLClassLoader;
import java.util.Locale;

import com.ibm.icn.extension.*;
import com.ibm.icn.extension.docusign.tasks.AutocheckinTaskRegistration;
import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.ecm.extension.PluginMenu;

import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginAsyncTaskType;

public class DocuSignPlugin extends Plugin {

    private PluginService [] serviceArray = null;
    private PluginAction [] actionArray = null;
    private PluginRequestFilter[] requestFilters;

    @Override
    public String getId() {
        return "DocuSignPlugin";
    }

    @Override
    public String getCSSFileName() {
        return "DocuSignPlugin.css";
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
                    new com.ibm.icn.extension.docusign.action.SignStatusAction(),
                    new com.ibm.icn.extension.docusign.action.CheckinAction()
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
        return  new PluginResponseFilter[] {
                new com.ibm.icn.extension.docusign.filter.DocuSignPluginResponseFilter(),
                new com.ibm.icn.extension.docusign.filter.DocuSignPluginDocumentPropertiesFilter()
        };
    }

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
        if(serviceArray == null)
        {
            serviceArray = new com.ibm.ecm.extension.PluginService[] {
                    new com.ibm.icn.extension.docusign.service.SignRequestService(),
                    new com.ibm.icn.extension.docusign.service.SignStatusService(),
                    new com.ibm.icn.extension.docusign.service.UpdateSignedDocumentService(),
                    new com.ibm.icn.extension.docusign.service.GetConfigurationService(),
                    new com.ibm.icn.extension.docusign.service.GetTemplatesService(),
                    new com.ibm.icn.extension.docusign.service.DocuSignLoginService()
            };
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