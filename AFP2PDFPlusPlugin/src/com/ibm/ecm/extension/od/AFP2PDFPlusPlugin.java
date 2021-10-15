package com.ibm.ecm.extension.od;

import java.util.Locale;


import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.utils.ProcessUtil;


import javax.servlet.http.HttpServletRequest;


public class AFP2PDFPlusPlugin extends Plugin{
	
	  public void applicationInit(HttpServletRequest request, PluginServiceCallbacks callbacks)
	    throws Exception
	  {
		  String methodName = "applicationInit";
		  callbacks.getLogger().logDebug(this, methodName, request, "AFP2PDFPlusPlugin applicationInit.");
		  String defaultpropfilepath = "/opt/ibm/plugins/icnafp2pdfplusplugin.properties";
		  ProcessUtil processutil = new ProcessUtil(callbacks, request);
		  processutil.loadproperties(defaultpropfilepath);
		  if(!processutil.isAFP2PDFServiceStarted()) {
			 
			  callbacks.getLogger().logDebug(this, methodName, request, "AFP2PDFPlus service is not started yet,try to start... ");
			  processutil.startAFP2PDFService();
			  
		  }
		  
	  }

	  public String getId()
	  {
	    return "AFP2PDFPlusPlugin";
	  }

	  public String getName(Locale locale)
	  {
	    return "Autostart AFP2PDFPlus service in container";
	  }

	  public String getVersion()
	  {
	    return "3.0.9";
	  }

	  public String getCopyright()
	  {
	    return "Sample copyright message";
	  }

}
