package  ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginLayout;

/**
 * Provides an abstract class that is extended to define a layout that is provided by a plug-in. The layout is the main widget for the
 * desktop and defines the overall arrangement of widgets in the desktop. The particular layout that is used for a desktop
 * is selected in the IBM Content Navigator administration tool.
 */
public class ${ClassName} extends PluginLayout {

	/**
	 * Returns an identifier that is used to describe this layout.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must contain only alphanumeric characters.
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the layout.
	 */
	public  String getId() {
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive label for this layout that is displayed in the IBM Content Navigator administration tool.
	 * 
	 * @return A short description of the layout.
	 */
	public  String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Returns a Boolean value that indicates whether features are configurable for this layout.
	 * 
	 * @return A value of <code>true</code> if the layout supports configuring features for the desktop. 
	 * 		By default, this method returns <code>true</code>.
	 */
	public boolean areFeaturesConfigurable() {
		return true;
	}

	/**
	 * Returns the name of the widget class that implements this layout.
	 *
	 * @return A widget class name.
	 */
	public  String getLayoutClass() {
		return "${DojoModuleName}.${ClassName}";
	}

}

