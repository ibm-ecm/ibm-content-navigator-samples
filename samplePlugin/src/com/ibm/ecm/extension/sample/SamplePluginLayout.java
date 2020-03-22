/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginLayout;

public class SamplePluginLayout extends PluginLayout {

	@Override
	public String getId() {
		return "sampleLayout";
	}

	@Override
	public String getName(Locale locale) {
		return "Sample Layout";
	}

	@Override
	public String getLayoutClass() {
		return "samplePluginDojo.SampleLayout";
	}

}
