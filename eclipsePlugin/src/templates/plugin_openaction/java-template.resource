package ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginOpenAction;

/**
 * Defines an action, which will override default action for a MIME type or MIME
 * class. By default, when a user double-clicks a document in the browse list
 * view, or executes the Open action, a document viewer is launched. An
 * implementation of this Plugin class will map an alternative action to perform
 * instead.
 * 
 * @since 2.0.2
 */
public class ${ClassName} extends PluginOpenAction {

	/**
	 * Returns an identifier that is used to describe this open action.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the
	 *         viewer.
	 */
	public String getId() {
		return "${ClassName}";
	}

	/**
	 * Returns a descriptive label for this open action that is displayed in the
	 * IBM Content Navigator administration tool.
	 * 
	 * @return A <code>String</code> that contains a short description of the
	 *         open action.
	 */
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Provides the name of the JavaScript function that is invoked for this
	 * open action.
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
	 * </table>
	 * 
	 * @since 2.0.2
	 * @return The name of a JavaScript function that is contained in one of the
	 *         script files with the plug-in.
	 */
	public String getOpenActionFunction() {
		return "${OpenActionFunctionName}";
	}

	/**
	 * @since 2.0.2
	 * @return A <code>String</code> array of the MIME content types supported
	 *         by the open action, or <code>null</code> for all types.
	 */
	public String[] getContentTypes() {
		return ${SupportedContentTypes};
	}

	/**
	 * Returns the server types that this action is valid on.
	 * 
	 * @since 2.0.2
	 * @return A <code>String</code> array that contains one or more of the
	 *         following values:
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
	 *         <tr>
	 *         <td><code>null</code></td>
	 *         <td>For all server types</td>
	 *         </tr>
	 *         </table>
	 */
	public String[] getServerTypes() {
		return ${SupportedServerTypes};
	}
}