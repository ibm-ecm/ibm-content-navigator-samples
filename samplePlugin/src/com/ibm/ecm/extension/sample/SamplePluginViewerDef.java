/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginViewerDef;

/**
 * This class defines the sample viewer service as a viewer. The launch URL pattern describes how to invoke the viewer,
 * providing the parameters to the viewer service in order for that service to retrieve and format the document for
 * viewing.
 */
public class SamplePluginViewerDef extends PluginViewerDef {

	@Override
	public String getId() {
		return "SamplePluginViewer";
	}

	@Override
	public String getName(Locale locale) {
		return "SamplePluginViewer";
	}

	@Override
	public String getLaunchUrlPattern() {
		return "servicesUrl+'/plugin.do?plugin=SamplePlugin&action=samplePluginViewerService&docUrl='+encodeURIComponent(docUrl)+'&contentType='+mimeType+'&targetContentType=application/pdf&serverType='+serverType+privs";
	}

	@Override
	public String[] getSupportedContentTypes() {
		return new String[] { "application/rss+xml" };
	}

	@Override
	public String[] getSupportedServerTypes() {
		return new String[] { "cm", "p8", "od", "cmis" };
	}

}
