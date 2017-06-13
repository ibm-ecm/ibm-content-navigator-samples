package ${PackageName};

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginAPI;
import com.ibm.ecm.extension.PluginServiceCallbacks;

/**
 * Provides an abstract class that is extended to create a class implementing an API provided by the plug-in. A plug-in
 * API can be invoked from other plug-ins, allowing one plug-in to provide services that another plug-in service can
 * use. A plug-in API is similar to a plug-in service, receiving an instance of PluginServiceCallbacks and the original
 * HttpServletRequest object, allowing access to any session state and underlying APIs. </p> Follow best practices for
 * servlets when implementing a plug-in API. In particular, always assume multi-threaded use and do not keep unshared
 * information in instance variables.
 */
public class ${ClassName} extends PluginAPI {

	public String getId() {
		return "${ClassName}";
	}

	/**
	 * Performs the action of this API.
	 * 
	 * @param callbacks
	 *            An instance of the <code>PluginServiceCallbacks</code> class that contains several functions that can
	 *            be used by the plug-in API. These functions provide access to the plug-in configuration and content
	 *            server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> from the current request being processed. The service can access
	 *            the invocation parameters from the request as well as session state.
	 * @param arguments
	 *            An object array containing the input arguments to the API. The particular structure of these object is
	 *            defined by the plug-in API writer. The classes of the objects used as arguments should be J2SE classes
	 *            or instances of com.ibm.ecm.json as any plug-in specific classes will be loaded by different
	 *            classloaders causing class cast exceptions when attempting to pass instances from one plug-in to
	 *            another.
	 * @returns An object containing the response the API. This object can be of any structure and is defined by the
	 *          plug-in API writer. The class of the object should be a J2SE class or instance of com.ibm.ecm.json as
	 *          any plug-in specific classes will be loaded by different classloaders causing class cast exceptions when
	 *          attempting to use the object by the invoker.
	 * @throws Exception
	 *             For exceptions that occur when the API is running. If the logging level is high enough to log errors,
	 *             information about the exception is logged by IBM Content Navigator.
	 */
	public Object execute(PluginServiceCallbacks callbacks, HttpServletRequest request, Object[] arguments) throws Exception {
		return null;
	}
}