/*
 * IBM Confidential
 * OCO Source Materials
 * 5724-R81, 5724-B19, 5724-J33
 * (c) Copyright IBM Corp. 2013
 * 
 * The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what
 * has been deposited with the U.S. Copyright Office.
 */

package com.ibm.ecm.extension.xt; 

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.util.MessageUtil;


public class XTPlugin extends Plugin { 	
	
	public static final String ID = "XTPlugin";

    public String getId() {
        return ID;
    }

    public String getName() {
    	return getName(Locale.getDefault());
    }

    public String getName(Locale locale) {
        return MessageUtil.getMessage(locale, "plugins.xtPlugin.name");
    }

    public String getVersion() {
        return "2.0.3";
    }
        
    public String getDojoModule() {
    	return "xtPlugin";
    }
    
//    public String getScript() {
//        return "xtPlugin.js";
//    }
    
	@Override
	public String getConfigurationDijitClass() {
		return "xtPlugin.ConfigurationPane";
	}

}
