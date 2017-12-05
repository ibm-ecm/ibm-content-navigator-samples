package com.ibm.ecm.extension;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;


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
public class ReactEmailDialogPlugin extends Plugin {


	/**
	 * Provides an identifier for the plug-in.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in path names and
	 * URLs so it must contain only alphanumeric characters.
	 * </p>
	 */
	public String getId() {
		return "ReactEmailDialogPlugin";
	}

	/**
	 * Provides a descriptive name for this plug-in. The name identifies the
	 * plug-in in the IBM Content Navigator administration tool
	 * 
	 * @parm locale The locale currently in use. The name should be returned in
	 *       the language for this locale if it is translated.
	 */
	public String getName(Locale locale) {
		return "ReactEmailDialogPlugin";
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
		return "1.0.0";
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
		return "ReactEmailDialogPlugin.js";
	}

	public String getDebugScript() {
		return "ReactEmailDialogPlugin.js";
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
		return "reactEmailDialogPlugin";
	}

	/**
	 * Returns the name of a CSS file that contains styles for this plug-in. IBM
	 * Content Navigator generates the necessary style tag to pull in this file
	 * when IBM Content Navigator loads the plug-in.
	 */
	public String getCSSFileName() {
		return "ReactEmailDialogPlugin.css";
	}
	
	public PluginAction[] getActions() {
		return new PluginAction[] { new ReactSendAsLinkAction(),
									new ReactSendAsAttachmentAction(),
									new ReactSendAsPDFAction(),
									new ReactSendAllAsAttachmentAction(),
									new ReactSendAllAsPDFAction()};
	}


}
