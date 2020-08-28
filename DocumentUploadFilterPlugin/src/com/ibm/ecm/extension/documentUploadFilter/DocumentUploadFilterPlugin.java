/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.documentUploadFilter;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class DocumentUploadFilterPlugin extends Plugin {

	@Override
	public String getId() {
		return "DocumentUploadFilterPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return "Document Upload Filter Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.9";
	}

	@Override
	public String getDojoModule() {
		return "documentUploadFilterPluginDojo";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "documentUploadFilterPluginDojo.ConfigurationPane";
	}

	@Override
	public PluginRequestFilter[] getRequestFilters() {
		return new PluginRequestFilter[] { new DocumentUploadFilterPluginRequestFilter() };
	}

}