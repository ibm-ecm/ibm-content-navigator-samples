package ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginFeature;

/**
 * Provides an abstract class that is extended to define a feature provided by
 * the plug-in. Features are major functional areas that typically appear as
 * icons along the left side of the user interface. Features are configurable
 * for each desktop. Examples of features include Browse and Favorites.
 */
public class ${ClassName} extends PluginFeature {

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
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive label for this feature that is displayed in the IBM
	 * Content Navigator administration tool.
	 * 
	 * @return A short description for the menu.
	 */
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Returns descriptive text for this feature that is displayed in the IBM
	 * Content Navigator administration tool.
	 * 
	 * @return A short description for the feature.
	 */
	public String getDescription(Locale locale) {
		return "";
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
		return "${CSSName}";
	}

	/**
	 * Returns the path to an SVG file specified as the image to use for the feature icon. An SVG file is used when you
	 * want to style the feature icon according to custom themes applied to desktops. The SVG file must adhere to rules
	 * outlined in the IBM Content Navigator documentation.
	 * 
	 * @return The path to the SVG file used to render the image.
	 */
	public String getSvgFilePath() {
		return "${SVGFile}";
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
	 * @deprecated As of 2.0.3.3. Popup windows will be removed in a future release.
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
		return "${DojoModuleName}.${ClassName}";
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
	 * @deprecated As of 2.0.3.3. Popup windows will be removed in a future release.
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
		return "${DojoModuleName}.FeatureConfigurationPane";
	}
}