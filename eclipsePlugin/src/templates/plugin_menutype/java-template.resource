package ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginMenuType;

/**
 * Provides an abstract class that is extended to define a custom menu type
 * provided by a plug-in.
 */
public class ${ClassName} extends PluginMenuType {

	/**
	 * Returns the identifier that is used to describe this menu type.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * </p>
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the
	 *         menu type.
	 */
	public String getId() {
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive label for this menu type that is displayed in the
	 * IBM Content Navigator administration tool.
	 * 
	 * @return A <code>String</code> that provides a short description of the
	 *         menu.
	 */
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive tooltip for this menu type that is displayed in the
	 * IBM Content Navigator administration tool.
	 * 
	 * @return A <code>String</code> that provides the tooltip for the menu
	 *         type.
	 */
	public String getTooltip(Locale locale) {
		return "";
	}

	/**
	 * Returns a Boolean value indicating whether the menu associated with this
	 * menu type is a toolbar. If the menu is not a toolbar, then it is a
	 * context menu.
	 * 
	 * @return A value of <code>true</code> if the menu is a toolbar. This
	 *         method returns a value of <code>false</code> if the menu is a
	 *         context menu.
	 */
	public boolean isToolbar() {
		return ${IsToolbar};
	}
}