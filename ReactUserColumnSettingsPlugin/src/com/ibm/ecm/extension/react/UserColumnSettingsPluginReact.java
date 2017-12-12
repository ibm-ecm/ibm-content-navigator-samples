package com.ibm.ecm.extension.react;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginMenuType;
import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginService;

/**
 * Provides the main class of an IBM Content Navigator plug-in. The abstract
 * methods provide the name and version of the plug-in, and identify the
 * components such as actions, services, and scripts that are included in the
 * plug-in. The name of the <code>Plugin</code> subclass is specified in the
 * plug-in JAR file by using the following property in the manifest:
 * 
 * <pre>
 *     Plugin-Class: <i>pluginClassName</i>
 * </pre>
 * 
 * The location of the plug-in JAR file is specified in the IBM Content
 * Navigator <code>AppConfig.xml</code> file. An administrator can edit this
 * file by adding the plug-in to the IBM Content Navigator configuration by
 * using the IBM Content Navigator administration tool.
 * <p>
 */
public class UserColumnSettingsPluginReact extends Plugin {

	private PluginAction[] pluginActions = new PluginAction[0];
	private PluginRequestFilter[] pluginRequestFilters = new PluginRequestFilter[0];
	private PluginResponseFilter[] pluginResponseFilters = new PluginResponseFilter[0];
	private PluginService[] pluginServices = new PluginService[0];
	private PluginMenuType[] pluginMenuTypes = new PluginMenuType[0];
	private PluginMenu[] pluginMenus = new PluginMenu[0];


	/**
	 * Provides an identifier for the plug-in.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in path names and
	 * URLs so it must contain only alphanumeric characters.
	 * </p>
	 */
	public String getId() {
		return "UserColumnSettingsPluginReact";
	}

	/**
	 * Provides a descriptive name for this plug-in. The name identifies the
	 * plug-in in the IBM Content Navigator administration tool
	 * 
	 * @parm locale The locale currently in use. The name should be returned in
	 *       the language for this locale if it is translated.
	 */
	public String getName(Locale locale) {
		return "User Column Settings(React)";
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
		return "3.0.3";
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
		return "";
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
		return "UserColumnSettingsReact.js";
	}

	/**
	 * Returns the name of a debug version of the JavaScript file provided by
	 * getScript(). The default implementation invokes getScript().
	 * 
	 * @since 2.0.2
	 */
	public String getDebugScript() {
		return "UserColumnSettingsReact.js";
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
		return "userColumnSettings";
	}

	/**
	 * Returns the name of a CSS file that contains styles for this plug-in. IBM
	 * Content Navigator generates the necessary style tag to pull in this file
	 * when IBM Content Navigator loads the plug-in.
	 */
	public String getCSSFileName() {
		return "UserColumnSettingsReact.css";
	}

	/**
	 * Returns a debug version of the CSS file returned by getCSSFileName. The
	 * default implementation invokes getCSSFileName.
	 * 
	 * @since 2.0.2
	 * @return
	 */
	public String getDebugCSSFileName() {
		return "UserColumnSettingsReact.css";
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
		return "userColumnSettings.ConfigurationPane";
	}

	/**
	 * Provides a list of filters that are run before a requested service. This
	 * method can be used to modify the request or block the request.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginRequestFilter PluginRequestFilter}</code>
	 *         objects.
	 */
	public PluginRequestFilter[] getRequestFilters() {
		if (pluginRequestFilters.length == 0) {
			pluginRequestFilters = new PluginRequestFilter[] {new com.ibm.ecm.extension.react.ColumnsDisplayedRequestFilter()};
		}
		return pluginRequestFilters;
	}

	/**
	 * Provides a list of filters that are run after a requested service. This
	 * list of filters can be used to modify the response that is returned.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginResponseFilter PluginResponseFilter}</code>
	 *         objects.
	 */
	public PluginResponseFilter[] getResponseFilters() {
		if (pluginResponseFilters.length == 0) {
			pluginResponseFilters = new PluginResponseFilter[] {new com.ibm.ecm.extension.react.ColumnsDisplayedResponseFilter()};
		}
		return pluginResponseFilters;
	}

	/**
	 * Provides a list of new menu types defined by the plug-in.
	 * 
	 * @return An array of new menu type objects.
	 */
	public PluginMenuType[] getMenuTypes() {
		return pluginMenuTypes;
	}

	/**
	 * Provides a list of menus defined by the plug-in.
	 * 
	 * @return An array of plug-in menu objects.
	 */
	public PluginMenu[] getMenus() {
		return pluginMenus;
	}

	/**
	 * Provides a list of actions that this plug-in adds to the main toolbar of
	 * the web client.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginAction PluginAction}</code>
	 *         objects. The plug-in should return the same set of objects on
	 *         every call.
	 */
	public PluginAction[] getActions() {
		if (pluginActions.length == 0) {
			pluginActions = new PluginAction[] {new com.ibm.ecm.extension.react.DisplayedColumnPreferences()};
		}
		return pluginActions;
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
			pluginServices = new PluginService[] {new com.ibm.ecm.extension.react.UserSettingsService()};
		}
		return pluginServices;
	}
}
