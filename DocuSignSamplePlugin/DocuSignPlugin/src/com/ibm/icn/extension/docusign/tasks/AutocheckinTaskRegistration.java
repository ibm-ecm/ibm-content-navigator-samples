/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.tasks;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAsyncTaskType;

/*
 * Class to register Navigator Task for auto check-in of signed documents  
 */
public class AutocheckinTaskRegistration extends PluginAsyncTaskType {

	@Override
	public String getClassHandlerName() {
		return "com.ibm.icn.extension.docusign.tasks.CheckinSignedDocument";
	}

	@Override
	public String getName(Locale arg0) {
		return "Auto Check-in of Signed Document";
	}
	
	public String getTaskCreationDialogDijitClass() 
	{
		return "docuSign/TaskCreationDialog"; 
	}
	
	@Override
	public boolean canCreate() {
		return true;
	}

	@Override
	public String getIconClass() {
		return "ftWordProcessing";
	}	
}