/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2021
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.customEvent;

import java.util.Iterator;
import java.util.StringTokenizer;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filenet.api.admin.AuditDefinition;
import com.filenet.api.admin.DocumentClassDefinition;
import com.filenet.api.admin.EventClassDefinition;
import com.filenet.api.collection.AuditDefinitionList;
import com.filenet.api.constants.RefreshMode;
import com.filenet.api.core.Document;
import com.filenet.api.core.Factory;
import com.filenet.api.core.ObjectStore;
import com.filenet.api.events.CustomEvent;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;

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
public class RaiseEventService extends PluginService {

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
		return "RaiseEventService";
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
		String methodName = "execute";
		callbacks.getLogger().logEntry(this, methodName, request);

		String actionId = request.getParameter(Constants.ACTION_ID);	
		String repositoryId = request.getParameter(Constants.REPOSITORY_ID);
		String[] docIds = (String[])request.getParameterValues(Constants.DOCIDS);		
		JSONResponse jsonResponse = new JSONResponse();

		synchronized (callbacks.getSynchObject(repositoryId, Constants.SERVER_TYPE_P8)) 
		{
			try 
			{
				// get the event id for the action
				String eventId = Constants.actionEventMap.get(actionId);
				if (eventId != null) {
					// get object store context
					Subject subject = callbacks.getP8Subject(repositoryId);
					UserContext.get().pushSubject(subject);
					ObjectStore os = callbacks.getP8ObjectStore(repositoryId);

					for (String docId : docIds) {
						// a P8 docId in Content Navigator is actually three id's separated by commas.
						StringTokenizer docIdTok = new StringTokenizer(docId, ",");
						String classID = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
						String objectStoreID = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);
						String objectID = (docIdTok.hasMoreTokens() ? docIdTok.nextToken() : null);

						// retrieve the document
						Document document = Factory.Document.fetchInstance(os, objectID, null);		

						// get audit definitions of this class	
						DocumentClassDefinition dcd = Factory.DocumentClassDefinition.fetchInstance(os, document.get_ClassDescription().get_Id(), null);
						AuditDefinitionList adl = dcd.get_AuditDefinitions();
						Iterator it = adl.iterator();
						boolean audited = false;
						while (it.hasNext()) {
							AuditDefinition ad = (AuditDefinition) it.next();
							EventClassDefinition ecd = ad.get_EventClass();
							// check if the document class is audited for the custom event
							if (ecd.get_SymbolicName().equals(eventId)) {
								audited = true; 
							}
						}
						
						if (audited) {
							// create the custom event object
							CustomEvent custEvent = Factory.CustomEvent.createInstance(os, eventId);
							custEvent.set_EventStatus(0); // indicates that the action is successful
							document.raiseEvent(custEvent);
							document.save(RefreshMode.NO_REFRESH);			
							
							callbacks.getLogger().logInfo(this, methodName, request, "created events " + eventId + " from action " + actionId + " for document " + docId);
						} else {
							callbacks.getLogger().logInfo(this, methodName, request, "document class " + document.get_ClassDescription().get_Name() + " is not audited for event " + eventId);
						}
					}							
				}
				
				jsonResponse.put("success", true);
			} catch (Exception e) {
				// provide error information
				callbacks.getLogger().logError(this, methodName, request, e);				
				jsonResponse.addErrorMessage(new JSONMessage(0, "Error ocurred when creating custom event", null, null, null, null));
			}
		}
				
		callbacks.getLogger().logExit(this, methodName, request);
		
		// Send Response back to client
		PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, this.getId());
	}
}
