/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.util;

import com.filenet.api.core.Domain;

import com.filenet.api.core.ObjectStore;
import com.ibm.ecm.configuration.Config;
import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.icntasks.p8.P8TaskUtils;
import com.ibm.ecm.icntasks.util.MockHttpServletRequest;
import com.ibm.ecm.icntasks.util.ServerInfo;
import com.ibm.ecm.icntasks.util.TaskUtils;
import com.ibm.ecm.task.ContextParams;
import com.ibm.ecm.task.TaskLogger;

/*
 * Util class provides functions to retrieve Task Manager connection, login and get target object store info.
 */
public class P8ConnectionUtil {

	static public ObjectStore getTargetOS(String tosId) throws Exception {

		ObjectStore targetOS = null;
		
		try {
			MockHttpServletRequest request = new MockHttpServletRequest();
			
			ContextParams cp = ContextParams.getShardInstance();
			TaskLogger.fine("P8ConnectionUtil", "getTargetOSRef", "cp.getDatabaseSchemaName() = " + cp.getDatabaseSchemaName());
			TaskLogger.fine("P8ConnectionUtil", "getTargetOSRef", "cp.getDatabaseJDBCJNDI() = " + cp.getDatabaseJDBCJNDI());
			Config.initialize(null, null, cp.getDatabaseSchemaName(), cp.getDatabaseJDBCJNDI(), null);
			
			request.addParameter("repositoryId", tosId);
			RepositoryConfig sourceRepositoryConfig = Config.getRepositoryConfig(request);

			String targetP8ServerName = sourceRepositoryConfig.getServerName();
			TaskLogger.fine("P8ConnectionUtil", "getTargetOSRef", "P8 server uri: " + targetP8ServerName);
			
			// get target OS and admin id/pwd
			String targetOSName = sourceRepositoryConfig.getObjectStore();			
			String adminUser = cp.getAdminUser();
			String adminPassword = TaskUtils.getDecryptedPassword(cp.getAdminPassword(), null);
			
			if ((adminUser == null) || (adminPassword == null))
				TaskLogger.warning("P8ConnectionUtil", "getTargetOS", "UserId and Password are null");
			
			ServerInfo serverInfo = P8TaskUtils.fetchP8Domain(targetP8ServerName, adminUser, adminPassword);
			Domain domain = serverInfo.getDomain();
			
			// Fetch object store
			targetOS = P8TaskUtils.fetchObjectStoreInstance(domain, targetOSName);
		}
		catch (Exception ex) {
			TaskLogger.severe("P8ConnectionUtil", "getTargetOSRef", "Failed to get TOS repo info", ex);
			throw ex;
		}

		return targetOS;
	}
}