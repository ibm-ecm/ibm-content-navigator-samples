package ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginAction;
import com.ibm.json.java.JSONObject;

/**
 * Provides an abstract class that is extended to define a client-side action
 * that is provided by a plug-in. The actions that are defined by subclasses of
 * this class appear on the IBM Content Navigator toolbar and on the context
 * menus within the content list.
 */
public class ${ClassName} extends PluginAction {

	/**
	 * Returns an alphanumeric identifier that is used to describe this action.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * </p>
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the
	 *         action.
	 */
	public String getId() {
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive label for this action that is displayed on pop-up
	 * menus and as hover help for the icon on the toolbar.
	 * 
	 * @param locale
	 *            The current locale for the user.
	 * @return A short description of the action.
	 */
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Returns the name of the icon that is displayed on the toolbar for this action.
	 * <p>
	 * An icon file is a 23x23 pixel transparent image, for example, a transparent GIF image or PNG image. The icon file
	 * must be included in the <code><i>pluginPackage</i>/WebContent</code> subdirectory of the JAR file for the plug-in
	 * that contains this action.
	 * </p>
	 * 
	 * @return The name of the icon file.
	 * @deprecated Since 2.0.3. Plugins should provide an icon cascading style sheet class and override getIconClass to
	 *             specify images for buttons and menu items.
	 */
	public String getIcon() {
		return "";
	}
	
	/**
	 * Returns the name of the icon style class applied to the toolbar button or menu item for this action.
	 * 
	 * @return The name of the icon style class.
	 */
	public String getIconClass() {
		return "";
	}

	/**
	 * Returns a <code>String</code> that contains the list of privilege names
	 * that the user must have on the selected documents for this action to be
	 * enabled.
	 * 
	 * @return A list of one or more comma-separated privilege names. An empty
	 *         string indicates that no privileges are required for this action
	 *         to be enabled.
	 */
	public String getPrivilege() {
		return "";
	}

	/**
	 * Returns a Boolean value that indicates whether this action is enabled
	 * when multiple documents are selected.
	 * 
	 * @return A value of <code>true</code> if the action is enabled when
	 *         multiple documents are selected.
	 */
	public boolean isMultiDoc() {
		return false;
	}

	/**
	 * Returns a Boolean value that indicates whether this action is global.
	 * Global actions appear on the toolbar at the top of the application
	 * interface and do not require that documents are selected. This method can
	 * be overridden by subclasses.
	 * 
	 * @return A value of <code>true</code> if the action should be global. By
	 *         default, this function returns <code>false</code>.
	 */
	public boolean isGlobal() {
		return false;
	}

	/**
	 * Provides the name of the JavaScript function that is invoked for this
	 * action.
	 * <p>
	 * This parameters to this function include:
	 * <table border="1">
	 * <col width="25%"/> <col width="75%"/>
	 * <tr>
	 * <th>Parameter</th>
	 * <th>Description</th>
	 * </tr>
	 * <tr>
	 * <td><code>repository</code></td>
	 * <td>An instance of <code>ecm.model.Respository</code>.</td>
	 * </tr>
	 * <tr>
	 * <td><code>items</code></td>
	 * <td>An array of <code>ecm.model.Item</code> objects.</td>
	 * </tr>
	 * <tr>
	 * <td><code>callback</code></td>
	 * <td>A function to be invoked by the action when the action completes.</td>
	 * </tr>
	 * <tr>
	 * <td><code>teamspace</code></td>
	 * <td>An instance of <code>ecm.model.Teamspace</code> if the action is
	 * related to a particular teamspace.</td>
	 * </tr>
	 * <tr>
	 * <td><code>resultSet</code></td>
	 * <td>An instance of <code>ecm.model.ResultSet</code> if the action is
	 * related to a particular result set.</td>
	 * </tr>
	 * <tr>
	 * <td><code>parameterMap</code></td>
	 * <td>Other parameters to the action.</td>
	 * </tr>
	 * </table>
	 * 
	 * @return The name of a JavaScript function that is contained in one of the
	 *         script files with the plug-in.
	 */
	public String getActionFunction() {
		return "${ActionFunctionName}";
	}

	/**
	 * Returns the server types that this action is valid on.
	 * 
	 * @return A <code>String</code> that contains one or more of the following
	 *         values separated by commas:
	 *         <table border="1">
	 *         <tr>
	 *         <th>Server Type</th>
	 *         <th>Description</th>
	 *         </tr>
	 *         <tr>
	 *         <td><code>p8</code></td>
	 *         <td>IBM FileNet P8</td>
	 *         </tr>
	 *         <tr>
	 *         <td><code>cm</code></td>
	 *         <td>IBM Content Manager</td>
	 *         </tr>
	 *         <tr>
	 *         <td><code>od</code></td>
	 *         <td>IBM Content Manager OnDemand</td>
	 *         </tr>
	 *         </table>
	 */
	public String getServerTypes() {
		return "";
	}

	/**
	 * Returns the menu types that this action is appropriate.
	 * 
	 * @since 2.0.2
	 * @return an array of menu type identifiers, either built-in menu types or
	 *         plug-in defined. If the action is appropriate for all menu types,
	 *         a zero length array can be returned. The default implementation
	 *         returns a zero length array.
	 */
	public String[] getMenuTypes() {
		return new String[0];
	}

	/**
	 * Returns additional JSON that will appear on the ecm.model.Action
	 * JavaScript object for this action. This can be used to provide custom
	 * configuration information for the action as needed by plug-in provided
	 * JavaScript for the action.
	 * 
	 * @since 2.0.2
	 * @return an instance of JSONObject containing properties that will be
	 *         mixed into the ecm.model.Action object. The default
	 *         implementation returns an empty JSONObject.
	 */
	public JSONObject getAdditionalConfiguration(Locale locale) {
		return new JSONObject();
	}

	/**
	 * Provides the name of the <code>ecm.model.Action</code> subclass to use
	 * when this plug-in action is invoked. The <code>ecm.model.Action</code>
	 * subclass provides custom code for enabling or disabling the action. If an
	 * <code>ecm.model.Action</code> subclass is not specified, then the default
	 * <code>ecm.model.Action</code> class is used.
	 * 
	 * @return The name of an instance of <code>ecm.model.Action</code> to use
	 *         for this action.
	 */
	public String getActionModelClass() {
		return "";
	}
}