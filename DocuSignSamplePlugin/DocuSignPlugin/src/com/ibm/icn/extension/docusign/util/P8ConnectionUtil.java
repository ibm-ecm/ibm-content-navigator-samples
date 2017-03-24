/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.util;

import java.util.Iterator;

import com.filenet.api.collection.ReferentialContainmentRelationshipSet;
import com.filenet.api.constants.PropertyNames;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Document;
import com.filenet.api.core.Domain;
import com.filenet.api.core.Factory;
import com.filenet.api.core.Folder;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.core.ReferentialContainmentRelationship;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.exception.ExceptionCode;
import com.filenet.api.property.FilterElement;
import com.filenet.api.property.PropertyFilter;
import com.ibm.ecm.configuration.Config;
import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.icntasks.p8.P8TaskUtils;
import com.ibm.ecm.icntasks.util.MockHttpServletRequest;
import com.ibm.ecm.icntasks.util.ServerInfo;
import com.ibm.ecm.icntasks.util.TaskUtils;
import com.ibm.ecm.task.ContextParams;
import com.ibm.ecm.task.TaskLogger;
import com.ibm.icn.extension.docusign.service.Constants;

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
	
	
	/*
	 * Get folder used for staging documents sent to DocuSign 
	 */
	static public Folder getP8StagingFolder(ObjectStore os)
	{
		System.out.println(">>> Entering getP8StagingFolder");
		Folder folder = null;
	    try
	    {
	        folder = Factory.Folder.createInstance(os, null);
	        folder.set_Parent(os.get_RootFolder());
	        folder.set_FolderName(Constants.DOCUSIGN_STAGING_FOLDER);
	        folder.save(RefreshMode.NO_REFRESH);
	    }
	    catch(EngineRuntimeException ex)
	    {
	    	ExceptionCode code = ex.getExceptionCode();
	    	if (code != ExceptionCode.E_NOT_UNIQUE)
	    	{
	    		throw ex;
	    	}
	    	folder = Factory.Folder.getInstance(os, null, "/" + Constants.DOCUSIGN_STAGING_FOLDER);
	    }
	    
		System.out.println(">>> Exiting getP8StagingFolder");
		return folder;
	}
	
	/*
	 * Unfile the document from staging folder
	 */
	@SuppressWarnings("rawtypes")
	static public void unfileDocument(ObjectStore os, Document doc) 
	{
		System.out.println(">>> Entering unfileDocument");
		
		PropertyFilter pf = new PropertyFilter();	  
	    pf.addIncludeProperty(new FilterElement(null, null, null,PropertyNames.PATH_NAME , null));
	    pf.addIncludeProperty(new FilterElement(null, null, null,PropertyNames.ID , null));
	    Folder stagingFolder = Factory.Folder.fetchInstance(os, "/" + Constants.DOCUSIGN_STAGING_FOLDER, pf);
		
		ReferentialContainmentRelationshipSet rcrs = doc.get_Containers();
		Iterator iter = rcrs.iterator();

		while (iter.hasNext() )
		{
			System.out.println("---------Inside while loop");
		   ReferentialContainmentRelationship rcr1 = (ReferentialContainmentRelationship) iter.next();
		   Folder folder = (Folder) rcr1.get_Tail();
		   System.out.println("folder.get_Id() = " + folder.get_Id());
		   System.out.println("parent.get_Id() = " + stagingFolder.get_Id());
		   if (folder.get_Id().equals(stagingFolder.get_Id()))
		   {
			   System.out.println("Folder ID matched");
		      rcr1.delete();
		      rcr1.save(RefreshMode.REFRESH);
		      break;
		   }
		}
		
		System.out.println("<<< Exiting unfileDocument");
	}	
	
}