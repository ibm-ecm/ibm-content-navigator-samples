package ${PackageName};

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.extension.PluginRepositoryConnection;
import com.ibm.ecm.extension.PluginRepositoryType;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;

/**
 * Provides an abstract class that is extended to create a class defining a custom repository type provided by the
 * plug-in. Additional PluginService classes are implemented to provide the different services of the repository type.
 * <p>
 * For enterprise content servers providing Content Management Interoperability Services (CMIS), the CMIS repository
 * type can be used to access the server. A plug-in provided repository type can be used to extend IBM Content Navigator
 * to support access other data sources not traditionally considered enterprise content servers.
 * <p>
 * Note that additional configuration is needed by the Content Navigator administrator to define the actual repository
 * of the plug-in provided repository type and add it to a desktop.
 */
public class ${ClassName} extends PluginRepositoryType {
		
	private static final Map<String, String> ${ClassName}ActionMap = new HashMap<String, String>() {
		private static final long serialVersionUID = 7212659949366854547L;

		{
		}
	};
	
	public void performAction(PluginServiceCallbacks callbacks, RepositoryConfig repositoryConfig, String action, HttpServletRequest request, HttpServletResponse response) throws Exception {
		if (${ClassName}ActionMap.containsKey(action)) {
			callbacks.getLogger().logDebug(this, "performAction", "Executing \"" + action + "\"...");
			Object obj = Class.forName(${ClassName}ActionMap.get(action)).newInstance();
			Method m = obj.getClass().getMethod("performAction", PluginServiceCallbacks.class, RepositoryConfig.class, HttpServletRequest.class, HttpServletResponse.class);
			m.invoke(obj, callbacks, repositoryConfig, request, response);
		} else {
			callbacks.getLogger().logError(this, "performAction", "${PluginClassName} does not support the repository action \"" + action + "\".");
			// return JSON with an error as well for the client
			JSONResponse jsonResponse = new JSONResponse();
			jsonResponse.addErrorMessage(new JSONMessage(20005, "${PluginClassName} does not support the action", "The repository action \""+action+"\" is not supported.", null, null, null));
			response.getWriter().write(jsonResponse.serialize());
		}
	}

	@Override
	public String getId() {
		return "${ClassName}";
	}

	@Override
	public String getName(Locale locale) {
		return "${ClassName}";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "${DojoModuleName}.${ClassName}GeneralConfigurationPane";
	}
	
	public String getConnectedConfigurationDijitClass() {
		return "${DojoModuleName}.${ClassName}ConfigurationParametersPane";
	}

	@Override
	public PluginRepositoryConnection logon(PluginServiceCallbacks callbacks, HttpServletRequest request, String userid, String password, RepositoryConfig repositoryConfig) throws Exception {
		return null;
	}

	@Override
	public void logoff(PluginServiceCallbacks callbacks, HttpSession session, PluginRepositoryConnection connection) throws Exception {
	}

	@Override
	public String getRepositoryModelClass() {
		return "";
	}

	public String getIconClass() {
		return "";
	}
}