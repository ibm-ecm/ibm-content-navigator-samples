/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2020 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES:
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */
package com.ibm.ecm.sample.edsds;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAPI;
import com.ibm.ecm.sample.edsds.apis.GetObjectTypesAPI;
import com.ibm.ecm.sample.edsds.apis.UpdateObjectTypeAPI;

/**
 *
 */
public class EDSDataSourceSamplePlugin extends Plugin {

	private PluginAPI[] apiClasses;
	
	
	/**
	 * Provides an identifier for the plug-in.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in path names and
	 * URLs so it must contain only alphanumeric characters.
	 * </p>
	 */
	@Override
	public String getId() {
		return "EDSDataSourceSamplePlugin";
	}

	/**
	 * Provides a descriptive name for this plug-in. The name identifies the
	 * plug-in in the IBM Content Navigator administration tool
	 * 
	 * @parm locale The locale currently in use. The name should be returned in
	 *       the language for this locale if it is translated.
	 */
	@Override
	public String getName(Locale locale) {
		return "EDS Data Source";
	}

	/**
	 * Provides a version indicator for this plug-in. The version information is
	 * displayed in the administration tool to help the administrator validate
	 * the version of the plug-in that is being used. The plug-in writer needs
	 * to update this indicator when redistributing a modified version of the
	 * plug-in.
	 * 
	 * @return A <code>String</code> representation of the version indicator for
	 *         the plug-in.
	 */
	@Override
	public String getVersion() {
		return "3.0.12";
	}

	/**
	 * Returns the name of a Dojo module or widget that is contained in the resources for this plug-in. IBM Content
	 * Navigator performs the necessary <code>dojo.registerModulePath</code> mapping to allow modules or widgets with
	 * mapped path names to be loaded by using the <code>dojo.require</code> method. A specified module can be the
	 * directory or package name for a set of Dojo modules or widgets.
	 */
	public String getDojoModule() {
		return "edsdsDojo";
	}

	/**
	 * Returns the name of a Dojo <code>dijit</code> class that provides a configuration interface widget for this
	 * plug-in. The widget must extend the <code>ecm.widget.admin.PluginConfigurationPane</code> widget. An instance of
	 * the widget is created and displayed in the IBM Content Navigator administration tool for configuration that is
	 * specific to the plug-in.
	 * <p>
	 * Refer to the documentation on ecm.widget.admin.PluginConfigurationPane for more
	 * information on what is required for a plug-in configuration user interface.
	 * </p>
	 */
    @Override
	public String getConfigurationDijitClass() {
	    return "edsdsDojo.ConfigurationPane";
	}

	/**
	 * Provides a list of APIs defined by the plug-in.
	 * 
	 * @return An array of plug-in API objects
	 */
	@Override
	public PluginAPI[] getPluginAPIs() {
		if (apiClasses == null) {
			apiClasses = new PluginAPI[] {
					new GetObjectTypesAPI(), 
					new UpdateObjectTypeAPI()
			};
		}
		return apiClasses;
	}

}
