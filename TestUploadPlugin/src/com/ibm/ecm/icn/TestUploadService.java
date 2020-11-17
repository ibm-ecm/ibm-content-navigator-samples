package com.ibm.ecm.icn;

import java.io.Writer;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.jaxrs.upload.FormFile;

/**
 * Provides an abstract class that is extended to create a class implementing
 * each service provided by the plug-in. Services are actions, similar to
 * servlets or Struts actions, that perform operations on the IBM Content
 * Navigator server. A service can access content server application programming
 * interfaces (APIs) and Java EE APIs.
 * <p>
 * Services are invoked from the JavaScript functions that are defined for the
 * plug-in by using the <code>ecm.model.Request.invokePluginService</code>
 * function.
 * </p>
 * Follow best practices for servlets when implementing an IBM Content Navigator
 * plug-in service. In particular, always assume multi-threaded use and do not
 * keep unshared information in instance variables.
 */
public class TestUploadService extends PluginService {

	/**
	 * Returns the unique identifier for this service.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must
	 * contain only alphanumeric characters.
	 * </p>
	 * 
	 * @return A <code>String</code> that is used to identify the service.
	 */
	public String getId() {
		return "TestUploadService";
	}

	/**
	 * Returns the name of the IBM Content Navigator service that this service
	 * overrides. If this service does not override an IBM Content Navigator
	 * service, this method returns <code>null</code>.
	 * 
	 * @returns The name of the service.
	 */
	public String getOverriddenService() {
		return null;
	}

	/**
	 * Performs the action of this service.
	 * 
	 * @param callbacks
	 *            An instance of the <code>PluginServiceCallbacks</code> class
	 *            that contains several functions that can be used by the
	 *            service. These functions provide access to the plug-in
	 *            configuration and content server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> object that provides the
	 *            request. The service can access the invocation parameters from
	 *            the request.
	 * @param response
	 *            The <code>HttpServletResponse</code> object that is generated
	 *            by the service. The service can get the output stream and
	 *            write the response. The response must be in JSON format.
	 * @throws Exception
	 *             For exceptions that occur when the service is running. If the
	 *             logging level is high enough to log errors, information about
	 *             the exception is logged by IBM Content Navigator.
	 */
	public void execute(PluginServiceCallbacks callbacks,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Enumeration attributeNames = request.getAttributeNames();
		while( attributeNames.hasMoreElements() ) {
			String attributeName = (String)attributeNames.nextElement();
			if(request.getAttribute( attributeName )==null )
				System.out.println( attributeName + ":"  + "null" );
			else{
				System.out.println( attributeName + ":"  + request.getAttribute( attributeName ).toString() );
			}
		}
		Object formObject = request.getAttribute("com.ibm.ecm.struts.actions.FileUploadActionForm");
		com.ibm.ecm.struts.actions.FileUploadActionForm form = (com.ibm.ecm.struts.actions.FileUploadActionForm)formObject; 
		FormFile formFile = (FormFile)form.getMultipartRequestHandler().getFileElements().get("file");
		System.out.println( formFile.getFileName() );
		
		response.setContentType("text/plain"); // must be text/plain for firebug
		response.setCharacterEncoding("UTF-8");
		
			Writer writer = response.getWriter();
			writer.write("{\"result\":\"ok\"}");
			writer.flush();
			writer.close();
		
	}
}
