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

import com.ibm.ecm.extension.PluginFeature;


/**
 * A class that defines the Home feature provided by the Navigation Layout Refresh plug-in.
 * This feature serves as the parent pane for the Favorites and My Checkouts secondary features.
 * The relationship between the Home feature pane and secondary feature panes is established in
 * the <code>com.ibm.ecm.icn.NavLaoutRefreshPluginResponseFilter</code> plug-in response filter.
 */
public class HomePane extends PluginFeature {

	/**
	 * Returns an identifier that is used to describe this feature.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * </p>
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the
	 *         feature.
	 */
	public String getId() {
		return "NavLayoutRefreshPluginHomePane";
	}

	/**
	 * Returns a descriptive label for this feature that is displayed in the IBM
	 * Content Navigator administration tool.
	 * 
	 * @return A short description for the menu.
	 */
	public String getName(Locale locale) {
		ResourceBundle resource = ResourceBundle.getBundle("com.ibm.ecm.icn.nls.ServicesMessages", locale);
		return resource.getString("feature.home.name");
	}

	/**
	 * Returns descriptive text for this feature that is displayed in the IBM
	 * Content Navigator administration tool.
	 * 
	 * @return A short description for the feature.
	 */
	public String getDescription(Locale locale) {
		ResourceBundle resource = ResourceBundle.getBundle("com.ibm.ecm.icn.nls.ServicesMessages", locale);
		return resource.getString("feature.home.description");
	}

	/**
	 * Returns a CSS class representing the image to use as the icon displayed for this feature. This icon typically
	 * appears on the left side of the desktop.
	 * <p>
	 * An icon file is a 32x32 pixel transparent image, for example, a transparent GIF image or PNG image or is defined
	 * as an SVG file. The icon file must be included in the <code><i>pluginPackage</i>/WebContent</code> subdirectory
	 * of the JAR file for the plug-in that contains this action.
	 * </p>
	 * 
	 * @return A CSS style class name for the image.
	 */
	public String getIconUrl() {
		return "favoritesLaunchIcon";
	}

	/**
	 * Returns the path to an SVG file specified as the image to use for the feature icon. An SVG file is used when you
	 * want to style the feature icon according to custom themes applied to desktops. The SVG file must adhere to rules
	 * outlined in the IBM Content Navigator documentation.
	 * 
	 * @return The path to the SVG file used to render the image.
	 */
	public String getSvgFilePath() {
		return null;
	}

	/**
	 * Returns a <code>String</code> to use as help context for this feature.
	 * 
	 * @return A <code>String</code> to use as the help text for this feature.
	 */
	public String getHelpContext() {
		return null;
	}

	/**
	 * Returns a <code>String</code> to use as tooltip text on the icon for this
	 * feature.
	 * 
	 * @param locale
	 *            The current locale for the user.
	 * @return A <code>String</code> to use as tooltip text on the feature icon.
	 */
	public String getFeatureIconTooltipText(Locale locale) {
		return "";
	}

	/**
	 * Returns a <code>String</code> to use as tooltip text on the popup or
	 * flyout window icon that is used for this feature.
	 * 
	 * @param locale
	 *            The current locale for the user.
	 * @return A <code>String</code> to use as tooltip text.
	 */
	public String getPopupWindowTooltipText(Locale locale) {
		return "";
	}

	/**
	 * Returns the name of a widget to implement the pane that provides the
	 * primary interface for this feature.
	 * 
	 * @return A <code>String</code> name of the dijit.
	 */
	public String getContentClass() {
		return "navLayoutRefreshPluginDojo.FavoritesPane";
	}

	/**
	 * Returns a Boolean value that indicates whether this feature is a
	 * separator. A separator is a special case where the feature is not a true
	 * feature but represents a separator to appear between features in the
	 * interface.
	 * 
	 * @return A value of <code>true</code> if this feature is a separator. By
	 *         default, this method returns <code>false</code>.
	 */
	public boolean isSeparator() {
		return false;
	}

	/**
	 * Returns the name of the widget that implements a popup window, also known
	 * as the flyout, for this feature.
	 * 
	 * @return A <code>String</code> name of the widget that implements the
	 *         flyout for the feature.
	 */
	public String getPopupWindowClass() {
		return "";
	}

	/**
	 * Returns true if the feature should be preloaded by the application layout
	 * and false if it should be lazy-loaded.
	 * 
	 * @return A boolean indicating if the feature should be preloaded.
	 */
	public boolean isPreLoad() {
		return false;
	}
	
	/**
	 * Returns the name of a Dojo <code>dijit</code> class that provides a configuration interface widget for this
	 * feature. The widget must extend the <code>ecm.widget.admin.PluginConfigurationPane</code> widget. An instance of
	 * the widget is created and displayed under each desktop's layout tab in the IBM Content Navigator administration
	 * tool for configuration specific to this feature.
	 * <p>
	 * Refer to the documentation on {@link ecm.widget.admin.PluginConfigurationPane PluginConfigurationPane} for more
	 * information on what is required for a feature configuration user interface.
	 * </p>
	 */
	public String getConfigurationDijitClass() {
		return "navLayoutRefreshPluginDojo.FeatureConfigurationPane";
	}
}
