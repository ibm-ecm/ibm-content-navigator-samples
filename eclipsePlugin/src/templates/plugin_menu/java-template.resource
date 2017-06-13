package ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginMenuItem;

/**
 * Provides an abstract class that is extended to define a menu in a plug-in.
 */
public class ${ClassName} extends PluginMenu {

	/**
	 * Returns an identifier that is used to describe this menu.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the
	 *         menu.
	 */
	public String getId() {
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive label for this menu that is displayed in the IBM
	 * Content Navigator administration tool.
	 * 
	 * @return A <code>String</code> containing the short description of the
	 *         menu.
	 */
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Returns a description for this menu that is displayed in the IBM Content
	 * Navigator administration tool.
	 * 
	 * @return A <code>String</code> that provides a short description of the
	 *         menu.
	 */
	public String getDescription(Locale locale) {
		return "";
	}

	/**
	 * Returns the identifier for the menu type that is used for this menu.
	 * 
	 * @return A <code>String</code> containing the identifier of the menu type.
	 */
	public String getMenuType() {
		return "${MenuTypeID}";
	}

	/**
	 * Returns an array of <code>PluginMenuItem</code> objects for all the
	 * actions in this menu. Supports one level of a cascading menu, which means
	 * that a menu item in a top-level menu can have one submenu.
	 * 
	 * @return An array of <code>PluginMenuItem</code> objects.
	 */
	public PluginMenuItem[] getMenuItems() {
		return new PluginMenuItem[] {};
	}
}