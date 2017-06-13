package ${PackageName};

import java.util.Locale;

import com.ibm.ecm.extension.PluginViewerDef;

/**
 * Provides an abstract class that is extended to define a viewer provided by
 * the plug-in. The viewer can be used in viewer mappings to identify the types
 * of documents for which the viewer should be invoked. Viewers are launched
 * within their own iframes or web browser windows, based on a URL that is built
 * by IBM Content Navigator by using a template that is defined in this class.
 */
public class ${ClassName} extends PluginViewerDef {

	/**
	 * Returns an identifier that is used to describe this viewer.
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
	 * Returns a descriptive label for this viewer that is displayed in the IBM
	 * Content Navigator administration tool.
	 * 
	 * @return A <code>String</code> that contains a short description of the
	 *         viewer.
	 */
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	/**
	 * Returns an array of MIME content types that are supported by the viewer.
	 * 
	 * @return A <code>String</code> array of the MIME content types supported
	 *         by the viewer, or <code>null</code> for all types.
	 */
	public String[] getSupportedContentTypes() {
		return ${SupportedContentTypes};
	}

	/**
	 * Returns a list of the server types on which this action is valid.
	 * 
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
	 *         <td><code>cmis</code></td>
	 *         <td>Content Management Interoperability Services</td>
	 *         </tr>
	 *         <tr>
	 *         <td><code>null</code></td>
	 *         <td>For all server types</td>
	 *         </tr>
	 *         </table>
	 */
	public String[] getSupportedServerTypes() {
		return ${SupportedServerTypes};
	}

	/**
	 * Returns a Boolean value that indicates whether the viewer is to be
	 * launched in its own web browser window or can be launched in the common
	 * viewer window.
	 * 
	 * @return A value of <code>true</code> to launch the viewer in its own web
	 *         browser window.
	 */
	public boolean isLaunchInSeparateWindow() {
		return false;
	}

	/**
	 * Provides a URL template that is used to launch this viewer. See the
	 * documentation on <code>ecm.model.Viewer</code> for details on what
	 * variables can be used within this pattern. This method returns a template
	 * that contains the variables. The template is used by the
	 * <code>ecm.model.Viewer</code> class at run time to build a URL for
	 * invoking the viewer.
	 * 
	 * @return A <code>String</code> that contains a URL template that is used
	 *         to launch the viewer.
	 */
	public String getLaunchUrlPattern() {
		return "";
	}

	/**
	 * Provide a subclass of ecm.widgets.viewer
	 * 
	 * @return The full name and path of the DOJO widget representing this viewer definition.
	 */
	public String getViewerClass() {
		return "${DojoModuleName}.${ViewerClassName}";
	}
	
	/**
	 * Specify whether the viewer is suitable for use to support the Preview action
	 * 
	 * @return A value of <code>true</code> to indicate the viewer can be used for Preview.
	 * @since 2.0.3
	 */
	public boolean isPreviewViewer() {
		return false;
	}
}