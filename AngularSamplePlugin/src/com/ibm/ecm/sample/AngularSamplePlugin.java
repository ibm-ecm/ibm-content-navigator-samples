/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
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
 
package com.ibm.ecm.sample;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginFeature;
import com.ibm.ecm.extension.PluginService;

/**
 * Provides the main class of the Angular Sample plug-in. This sample demonstrates
 * how to integrate a custom application written using Angular 2 TypeScript into a
 * feature pane in IBM Content Navigator.
 */
public class AngularSamplePlugin extends Plugin {

	private PluginService[] pluginServices = new PluginService[0];
	private PluginFeature[] pluginFeatures = new PluginFeature[0];

	/**
	 * Provides an identifier for the plug-in.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in path names and
	 * URLs so it must contain only alphanumeric characters.
	 * </p>
	 */
	public String getId() {
		return "AngularSamplePlugin";
	}

	/**
	 * Provides a descriptive name for this plug-in. The name identifies the
	 * plug-in in the IBM Content Navigator administration tool
	 * 
	 * @parm locale The locale currently in use. The name should be returned in
	 *       the language for this locale if it is translated.
	 */
	public String getName(Locale locale) {
		return "Angular 2 Sample Plugin";
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
	public String getVersion() {
		return "2.0.3";
	}

	/**
	 * Provides the copyright license for this plug-in. The information is
	 * displayed in the About dialog Plugins tab. The license is provided by the
	 * plugin creator. This is an optional method and may be removed from the plug-in
	 * if no copyright is specified.
	 * 
	 * @return A <code>String</code> representation of the license for the
	 *         plug-in.
	 * @since 2.0.2
	 */
	public String getCopyright() {
		return "Optionally add a Copyright statement here";
	}

	/**
	 * Returns the name of a JavaScript file provided by this plug-in. This file
	 * is downloaded to the web browser during the initialization of the web
	 * client, before login. A script can be used to perform customization that
	 * cannot be performed by other extension mechanisms, such as features or
	 * layouts. However, it is preferable to use these other extension
	 * mechanisms to provide more flexibility to the administrator when
	 * configuring desktops.
	 */
	public String getScript() {
		return "AngularSamplePlugin.js";
	}

	/**
	 * Returns the name of a debug version of the JavaScript file provided by
	 * getScript(). The default implementation invokes getScript().
	 * 
	 * @since 2.0.2
	 */
	public String getDebugScript() {
		return getScript();
	}

	/**
	 * Returns the name of a Dojo module or widget that is contained in the
	 * resources for this plug-in. IBM Content Navigator performs the necessary
	 * <code>dojo.registerModulePath</code> mapping to allow modules or widgets
	 * with mapped path names to be loaded by using the
	 * <code>dojo.require</code> method. A specified module can be the directory
	 * or package name for a set of Dojo modules or widgets.
	 */
	public String getDojoModule() {
		return "angularSamplePluginDojo";
	}

	/**
	 * Returns the name of a CSS file that contains styles for this plug-in. IBM
	 * Content Navigator generates the necessary style tag to pull in this file
	 * when IBM Content Navigator loads the plug-in.
	 */
	public String getCSSFileName() {
		return "AngularSamplePlugin.css";
	}

	/**
	 * Returns a debug version of the CSS file returned by getCSSFileName. The
	 * default implementation invokes getCSSFileName.
	 * 
	 * @since 2.0.2
	 * @return
	 */
	public String getDebugCSSFileName() {
		return getCSSFileName();
	}
		
	/**
	 * Returns the name of a Dojo <code>dijit</code> class that provides a
	 * configuration interface widget for this plug-in. The widget must extend
	 * the <code>ecm.widget.admin.PluginConfigurationPane</code> widget. An
	 * instance of the widget is created and displayed in the IBM Content
	 * Navigator administration tool for configuration that is specific to the
	 * plug-in.
	 * <p>
	 * Refer to the documentation on
	 * {@link ecm.widget.admin.PluginConfigurationPane PluginConfigurationPane}
	 * for more information on what is required for a plug-in configuration user
	 * interface.
	 * </p>
	 */
	public String getConfigurationDijitClass() {
		return "angularSamplePluginDojo.ConfigurationPane";
	}

	/**
	 * Provides a list of services that are provided by this plug-in. The
	 * services run on the web server, and can be called by the web browser
	 * logic component of the plug-in.
	 * 
	 * @return An array of {@link com.ibm.ecm.extension.PluginService
	 *         PluginService} objects. The plug-in should return the same set of
	 *         objects on every call. If there are no services defined by the
	 *         plug-in, the call should return an empty array.
	 */
	public PluginService[] getServices() {
		if (pluginServices.length == 0) {
			pluginServices = new PluginService[] { new NYTimesTopStoriesService() };
		}
		return pluginServices;
	}

	/**
     * Specifies custom features that are provided by this plug-in. Features are
     * the major user interface sections, which appear as icons on the left side
     * of the user interface in the default layout. Examples of features include
     * Search, Favorites, and Teamspaces.
     * 
     * @return An array of custom plug-in feature objects.
     */
    public PluginFeature[] getFeatures() {
    		if (pluginFeatures.length == 0) {
			pluginFeatures = new PluginFeature[] { new AngularTestFeature() };
		}
		return pluginFeatures;
    }
}