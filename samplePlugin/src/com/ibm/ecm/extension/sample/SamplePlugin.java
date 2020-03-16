/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Hashtable;
import java.util.Locale;
import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.*;

/**
 * Main class for the sample plug-in. This sample demonstrates many of the
 * extension points possible through an IBM Content Navigator plug-in. The
 * sample contains:
 * <ul>
 * <li>Five custom actions.
 * <ol>
 * <li>SamplePluginAction -- simple action, invokes SamplePluginService and
 * displays the returned JSON.
 * <li>SamplePluginFilteredAction -- a more complex action, Showing how to
 * subclass ecm.model.Action for filtering when the action is enabled.
 * <li>SamplePluginCheckInAction -- an action demonstrating a custom checkin.
 * <li>SamplePluginFileUploadAction -- an action demonstrating how to upload a
 * file.
 * <li>SamplePluginCustomCMWFAction -- an custom action for CM workflow.
 * </ol>
 * These custom actions need to be configured onto menus and toolbars using
 * administration in order to be used.
 * <li>A custom JavaScript snippet, "SamplePlugin.js", and custom CSS,
 * "SamplePlugin.css". These are downloaded and run as part of the desktop load.
 * <li>A set of services to support custom actions, viewers and feature:
 * <ol>
 * <li>SamplePluginService -- called by SamplePluginAction, returns some
 * properties of the selected item.
 * <li>SamplePluginViewerService -- called by SamplePluginViewer to format an
 * RSS feed.
 * <li>SamplePluginGetAnnotationService -- used by the SamplePluginImageViewer
 * <li>SamplePluginGetContentService -- used by the SamplePluginImageViewer
 * <li>SamplePluginFileUploadService -- used by SamplePluginFileUploadAction
 * <li>SamplePluginSearchService -- used by SamplePluginFeature
 * </ol>
 * <li>Two custom sample viewers:
 * <ol>
 * <li>SamplePluginViewer -- a simple viewer performing mid-tier conversion of
 * RSS documents
 * <li>SamplePluginImageViewer -- a more advanced viewer of images and
 * annotations.
 * </ol>
 * <li>Two response filters:
 * <ol>
 * <li>SamplePluginResponseFilter -- shows how to modify search results to add
 * custom cell formatters and new columns
 * <li>SamplePluginOpenClassResponseFilter -- shows how to modify open class to
 * add custom property formatters and editors
 * </ol>
 * <li>Three custom menu types. These menu types are not used by any widgets in
 * the sample.
 * <li>Three custom menus of the typed defined by the custom menu types.
 * <li>SamplePluginFeature -- a custom feature, embedding a search interface for
 * entering arbitrary queries.
 * <li>SamplePluginLayout -- a custom layout (which replaces the entire user
 * interface).
 * <li>SamplePluginODAuthenticationService -- a custom OD authentication service
 * for supporting SSO on IBM Content Manager OnDemand.
 * </ul>
 * Some of the extensions defined by this plug-in will only take effect when
 * using a desktop with the id of "sample", It is recommended that you create a
 * desktop with id of "sample" to see these extensions, and also configure any
 * sample actions and feature to this sample desktop to avoid accidentally
 * introducing sample extensions into other desktops.
 */
public class SamplePlugin extends Plugin {
	private final SamplePluginEventHandler eventHandler;

	public SamplePlugin() {
		eventHandler = new SamplePluginEventHandler();
	}

	@Override
	public PluginAction[] getActions() {
		return new PluginAction[] { new SamplePluginAction(), new SamplePluginFilteredAction(),
				new SamplePluginCheckInAction(), new SamplePluginFileUploadAction(), new SamplePluginCustomCMWFAction() };
	}

	@Override
	public String getId() {
		return "SamplePlugin";
	}

	@Override
	public String getName(Locale locale) {
		return "Sample Plug-in";
	}

	@Override
	public String getScript() {
		return "SamplePlugin.js.jgz";
	}

	@Override
	public String getDebugScript() {
		return "SamplePlugin.js";
	}

	@Override
	public PluginService[] getServices() {
		return new PluginService[] { new SamplePluginService(), new SamplePluginViewerService(),
				new SamplePluginGetAnnotationsService(), new SamplePluginGetContentService(),
				new SamplePluginFileUploadService(), new SamplePluginSearchService() };
	}

	@Override
	public String getVersion() {
		return "3.0.7.1";
	}

	@Override
	public String getCopyright() {
		return "Sample copyright message";
	}

	@Override
	public String getDojoModule() {
		return "samplePluginDojo";
	}
	
	/**
	 * @since 3.0.6
	 */
	@Override
	public String[] getCSSFileNames() {
		return new String[] {"SamplePlugin.css.jgz"};
	}
	
	/**
	 * @since 3.0.6
	 */
	@Override
	public String [] getDebugCSSFileNames() {
		return new String [] {"SamplePlugin.css"};
	}

	@Override
	public String getConfigurationDijitClass() {
		return "samplePluginDojo.ConfigurationPane";
	}

	@Override
	public PluginViewerDef[] getViewers() {
		return new PluginViewerDef[] { new SamplePluginViewerDef(), new SamplePluginImageViewerDef() };
	}

	@Override
	public PluginRequestFilter[] getRequestFilters() {
		return  new PluginRequestFilter[] { new SamplePluginRequestFilter() };
	}
	@Override
	public PluginResponseFilter[] getResponseFilters() {
		return new PluginResponseFilter[] { new SamplePluginResponseFilter(), new SamplePluginOpenClassResponseFilter(), new SamplePluginOpenSearchTemplateResponseFilter(), new SamplePluginOpenUnifiedSearchResponseFilter(), new SamplePluginUpdateDefaultPrintMarginsResponseFilter() };
	}

	@Override
	public PluginMenuType[] getMenuTypes() {
		return new PluginMenuType[] { new SamplePluginContextMenuMenuType(), new SamplePluginToolbarMenuType(),
				new SamplePluginToolbarMenuType2() };
	}

	@Override
	public PluginMenu[] getMenus() {
		return new PluginMenu[] { new SamplePluginContextMenuMenu(), new SamplePluginToolbarMenu(),
				new SamplePluginToolbarMenu2(), };
	}

	@Override
	public PluginFeature[] getFeatures() {
		return new PluginFeature[] { new SamplePluginFeature(), new SamplePluginFavoritesFeature() };
	}

	@Override
	public PluginLayout[] getLayouts() {
		return new PluginLayout[] { new SamplePluginLayout() };
	}

	public PluginODAuthenticationService getODAuthenticationService() {
		return new SamplePluginODAuthenticationService();
	}

	@Override
	public PluginRepositoryType[] getRepositoryTypes() {
		return new PluginRepositoryType[] { new SamplePluginRepositoryType() };
	}

	@Override
	public PluginAsyncTaskType[] getAsyncTaskTypes() {
		return new PluginAsyncTaskType[] { 
				new SamplePluginAsyncTaskType(),
				new SamplePluginSearchAsyncTaskType()
		};
	}

	/**
	 * applicationAdd is called when the plugin is added, it can call saveConfiguration method and saveUserConfiguration method.
	 * applicationAdd method call saveConfiguration method to add plugin configuration.
	 * applicationAdd method call saveUserConfiguration method to add user plugin configuration.
	 */
	@Override
	public void applicationAdd(HttpServletRequest request, PluginServiceCallbacks callbacks) throws Exception {
		//Save plugin configuration
		Hashtable<String, String> configs = new Hashtable<>();
		configs.put("URL_CONFIG", "http://www.ibm.com");
		callbacks.saveConfiguration(configs);
		//Save user configuration
		Hashtable<String, String> userConfigs = new Hashtable<>();
		userConfigs.put("USER_SETTING_1", "UserSetting1");
		callbacks.saveUserConfiguration(userConfigs);
	}

	/**
	 * applicationRemove is called when the plugin is  removed, it can call deleteUserConfigurations method and deleteConfigurations method.
	 * applicationAdd method call saveConfiguration method to add plugin configuration.
	 * applicationAdd method call saveUserConfiguration method to add user plugin configuration.
	 */
	@Override
	public void applicationRemove(HttpServletRequest request, PluginServiceCallbacks callbacks) throws Exception {
		callbacks.deleteUserConfigurations();  
		callbacks.deleteConfigurations();
	}

	/**
	 * Provides a list of event handler classes defined by the plug-in.
	 *
	 * @return An array of event handler classes.
	 * @since 3.0.7.1
	 */
	@Override
	public Class<?>[] getEventHandlers() {
		return new Class[]{SamplePluginEventHandler.class};
	}

	/**
	 * Provides an option for the plug-in to update the configuration before saving.
	 *
	 * @param configuration The configuration to be saved
	 * @return the updated configuration
	 * @since 3.0.7.1
	 */
	@Override
	public String configurationSaving(HttpServletRequest request, PluginServiceCallbacks callbacks, String configuration) {
		return eventHandler.encryptSecrets(configuration, request, callbacks);
	}
}
