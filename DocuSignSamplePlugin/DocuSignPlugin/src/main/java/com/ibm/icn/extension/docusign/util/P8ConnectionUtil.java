/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.util;

import java.util.Iterator;

import com.filenet.api.collection.AccessPermissionList;
import com.filenet.api.collection.ReferentialContainmentRelationshipSet;
import com.filenet.api.constants.AccessRight;
import com.filenet.api.constants.AccessType;
import com.filenet.api.constants.PropertyNames;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.*;
import com.filenet.api.exception.EngineRuntimeException;
import com.filenet.api.exception.ExceptionCode;
import com.filenet.api.property.FilterElement;
import com.filenet.api.property.PropertyFilter;
import com.filenet.api.security.AccessPermission;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.configuration.Config;
import com.ibm.ecm.configuration.RepositoryConfig;
import com.ibm.ecm.icntasks.util.MockHttpServletRequest;
import com.ibm.ecm.task.ContextParams;
import com.ibm.ecm.task.TaskLogger;
import com.ibm.icn.extension.docusign.service.Constants;

import javax.security.auth.Subject;

/*
 * Util class provides functions to retrieve Task Manager connection, login and get target object store info.
 */
public class P8ConnectionUtil {

	static public ObjectStore getTargetOS(String adminUserName, String adminPassword, String tosId) throws Exception {

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
			
			if ((adminUserName == null) || (adminPassword == null))
				TaskLogger.warning("P8ConnectionUtil", "getTargetOS", "UserId and Password are null");

			Domain domain = null;
			String stanza = "Navigator";
			UserContext userCtx = new UserContext();

			try {
				Connection conn = com.filenet.api.core.Factory.Connection.getConnection(targetP8ServerName);
				TaskLogger.fine("P8FilenetUtils", "fetchP8Domain", "Fetched domain stanza ='" + stanza);
				Subject jaceSubject = UserContext.createSubject(conn, adminUserName, adminPassword, stanza);
				userCtx = UserContext.get();
				userCtx.pushSubject(jaceSubject);
				PropertyFilter domainFilter = new PropertyFilter();
				domainFilter.addIncludeProperty(new FilterElement((Integer)null, (Long)null, (Boolean)null, "Name", (Integer)null));
				domainFilter.setMaxRecursion(1);
				domain = com.filenet.api.core.Factory.Domain.fetchInstance(conn, (String)null, domainFilter);

				// Fetch object store
				targetOS = fetchObjectStoreInstance(domain, targetOSName);
				TaskLogger.fine("P8FilenetUtils", "fetchP8Domain", "Fetched domain '" + domain.get_Name() + "' successfully.");
			} catch (Exception var9) {
				throw var9;
			} finally {
				userCtx.popSubject();
			}
		}
		catch (Exception ex) {
			TaskLogger.severe("P8ConnectionUtil", "getTargetOSRef", "Failed to get TOS repo info", ex);
			throw ex;
		}

		return targetOS;
	}

	public static ObjectStore fetchObjectStoreInstance(Domain domain, String objStoreName) {
		PropertyFilter filter = new PropertyFilter();
		filter.addIncludeProperty(0, (Long)null, (Boolean)null, "RootClassDefinitions", (Integer)null);
		filter.addIncludeProperty(0, (Long)null, (Boolean)null, "DisplayName", (Integer)null);
		filter.addIncludeProperty(0, (Long)null, (Boolean)null, "Id", (Integer)null);
		filter.addIncludeProperty(0, (Long)null, (Boolean)null, "Name", (Integer)null);
		filter.addIncludeProperty(0, (Long)null, (Boolean)null, "SymbolicName", (Integer)null);
		ObjectStore objStore = com.filenet.api.core.Factory.ObjectStore.fetchInstance(domain, objStoreName, filter);
		TaskLogger.fine("P8FilenetUtils", "fetchObjectStoreInstance", "Fetched object store '" + objStore.get_DisplayName() + "' successfully.");
		return objStore;
	}
	
	
	/*
	 * Get folder used for staging documents sent to DocuSign 
	 */
	static public Folder getP8StagingFolder(ObjectStore os)
	{
		Folder folder = null;
	    try
	    {   
	        folder = Factory.Folder.createInstance(os, null);
	        folder.set_Parent(os.get_RootFolder());
	        folder.set_FolderName(Constants.DOCUSIGN_STAGING_FOLDER);
	        folder.getProperties().putValue("IsHiddenContainer", true);
	        
	        // access permissions for authenticated users
            AccessPermissionList apl = Factory.AccessPermission.createList();
            AccessPermission ap = Factory.AccessPermission.createInstance();
			ap.set_AccessType(AccessType.ALLOW);
			int docusignFolderPermission = AccessRight.READ_ACL_AS_INT | AccessRight.CHANGE_STATE_AS_INT 
			           | AccessRight.CREATE_INSTANCE_AS_INT | AccessRight.VIEW_CONTENT_AS_INT 
			           | AccessRight.MINOR_VERSION_AS_INT | AccessRight.UNLINK_AS_INT 
			           | AccessRight.LINK_AS_INT | AccessRight.MAJOR_VERSION_AS_INT 
			           | AccessRight.WRITE_AS_INT | AccessRight.READ_AS_INT;
			
			ap.set_AccessMask(docusignFolderPermission);				
			ap.set_GranteeName("#AUTHENTICATED-USERS");
			ap.set_InheritableDepth(1);
			
			apl.add(ap);
            folder.set_Permissions(apl);
            
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
	    
		return folder;
	}
	
	/*
	 * Unfile the document from staging folder
	 */
	@SuppressWarnings("rawtypes")
	static public void unfileDocument(ObjectStore os, Document doc) 
	{
		
		PropertyFilter pf = new PropertyFilter();	  
	    pf.addIncludeProperty(new FilterElement(null, null, null,PropertyNames.PATH_NAME , null));
	    pf.addIncludeProperty(new FilterElement(null, null, null,PropertyNames.ID , null));
	    Folder stagingFolder = Factory.Folder.fetchInstance(os, "/" + Constants.DOCUSIGN_STAGING_FOLDER, pf);
		
		ReferentialContainmentRelationshipSet rcrs = doc.get_Containers();
		Iterator iter = rcrs.iterator();

		while (iter.hasNext() )
		{
		   ReferentialContainmentRelationship rcr1 = (ReferentialContainmentRelationship) iter.next();
		   Folder folder = (Folder) rcr1.get_Tail();

		   if (folder.get_Id().equals(stagingFolder.get_Id()))
		   {
		      rcr1.delete();
		      rcr1.save(RefreshMode.REFRESH);
		      break;
		   }
		}
		
	}
}