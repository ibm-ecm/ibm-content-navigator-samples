/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016  All Rights Reserved.
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

package com.ibm.ecm.icn;

import java.util.Locale;
import java.util.ResourceBundle;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginFeature;
import com.ibm.ecm.extension.PluginLayout;
import com.ibm.ecm.extension.PluginResponseFilter;

/**
 * Provides the main class of the Navigation Layout Refresh plug-in. This sample
 * demonstrates how to define a custom layout for IBM Content Navigator and apply
 * the desktop's theme on the layout.
 */
public class NavLayoutRefreshPlugin extends Plugin {

	private PluginFeature[] pluginFeatures = new PluginFeature[0];
	private PluginResponseFilter[] pluginResponseFilters = new PluginResponseFilter[0];
	private PluginLayout[] pluginLayouts = new PluginLayout[0];

	/**
	 * Provides an identifier for the plug-in.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in path names and
	 * URLs so it must contain only alphanumeric characters.
	 * </p>
	 */
	public String getId() {
		return "NavLayoutRefreshPlugin";
	}

	/**
	 * Provides a descriptive name for this plug-in. The name identifies the
	 * plug-in in the IBM Content Navigator administration tool
	 * 
	 * @parm locale The locale currently in use. The name should be returned in
	 *       the language for this locale if it is translated.
	 */
	public String getName(Locale locale) {
		ResourceBundle resource = ResourceBundle.getBundle("com.ibm.ecm.icn.nls.ServicesMessages", locale);
		return resource.getString("plugin.name");
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
		return "3.0";
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
		return "NavLayoutRefreshPlugin.js";
	}

	/**
	 * Returns the name of a debug version of the JavaScript file provided by
	 * getScript(). The default implementation invokes getScript().
	 * 
	 * @since 2.0.2
	 */
	public String getDebugScript() {
		return "NavLayoutRefreshPlugin.js";
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
		return "navLayoutRefreshPluginDojo";
	}

	/**
	 * Returns the name of a CSS file that contains styles for this plug-in. IBM
	 * Content Navigator generates the necessary style tag to pull in this file
	 * when IBM Content Navigator loads the plug-in.
	 */
	public String getCSSFileName() {
		return "NavLayoutRefreshPlugin.css";
	}

	/**
	 * Returns a debug version of the CSS file returned by getCSSFileName. The
	 * default implementation invokes getCSSFileName.
	 * 
	 * @since 2.0.2
	 * @return
	 */
	public String getDebugCSSFileName() {
		return "NavLayoutRefreshPlugin.css";
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
		return "navLayoutRefreshPluginDojo.ConfigurationPane";
	}

	/**
     * Specifies custom features that are provided by this plug-in. Features are
     * the major user interface sections, which appear as icons on the left side
     * of the user interface in the default layout. Examples of features include
     * Search, Favorites, and Teamspaces.
     * 
     * @return An array of custom plug-in feature objects.
     */
    public com.ibm.ecm.extension.PluginFeature[] getFeatures() {
    	if (pluginFeatures.length == 0) {
			pluginFeatures = new PluginFeature[] { new HomePane() };
		}
		return pluginFeatures;
    }

	/**
	 * Provides a list of filters that are run after a requested service. This
	 * list of filters can be used to modify the response that is returned.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginResponseFilter PluginResponseFilter}</code>
	 *         objects.
	 */
	public com.ibm.ecm.extension.PluginResponseFilter[] getResponseFilters() {
		if (pluginResponseFilters.length == 0) {
			pluginResponseFilters = new PluginResponseFilter[] { new NavLayoutRefreshPluginResponseFilter() };
		}
		return pluginResponseFilters;
	}

	/**
	 * Specifies one or more custom layouts that are provided by this plug-in.
	 * Custom layouts can display the features and other user interface
	 * components of IBM Content Navigator in a different arrangement. The IBM
	 * Content Navigator administration tool is used to select the layout to use
	 * for a desktop.
	 * 
	 * @return An array of plug-in layout objects.
	 */
	public com.ibm.ecm.extension.PluginLayout[] getLayouts() {
	    if (pluginLayouts.length == 0) {
			pluginLayouts = new PluginLayout[] { new NavLayout() };
		}
		return pluginLayouts;
	}
}