/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2012, 2013 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

package com.ibm.ecm.extension.viewerToolbar;

import java.util.Locale;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.viewerToolbar.services.*;

public class ViewerToolbarPlugin extends Plugin {

	@Override
	public String getId() {
		return "ViewerToolbarPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return "Viewer Toolbar Plug-in";
	}

	@Override
	public String getScript() {
		return "ViewerToolbarPlugin.js";
	}

	@Override
	public String getDebugScript() {
		return "ViewerToolbarPlugin.js";
	}

	@Override
	public String getVersion() {
		return "1.0.0";
	}

	@Override
	public String getCopyright() {
		return "Viewer Toolbar Plugin copyright message";
	}

	@Override
	public String getDojoModule() {
		return "viewerToolbarPlugin";
	}
	
	/**
	 * Returns the name of a CSS file that contains styles for this plug-in. IBM
	 * Content Navigator generates the necessary style tag to pull in this file
	 * when IBM Content Navigator loads the plug-in.
	 */
	public String getCSSFileName() {
		return "ViewerToolbarPlugin.css";
	}
	
	/**
	 * Returns the name of a Dojo <code>dijit</code> class that provides a
	 * configuration interface widget for this plug-in. The widget must extend
	 * the <code>ecm.widget.admin.PluginConfigurationPane</code> widget. An
	 * instance of the widget is created and displayed in the IBM Content
	 * Navigator administration tool for configuration that is specific to the
	 * plug-in.
	 * <p>
	 * Refer to the documentation on
	 * {@link ecm.widget.admin.PluginConfigurationPane PluginConfigurationPane}
	 * for more information on what is required for a plug-in configuration user
	 * interface.
	 * </p>
	 */
	public String getConfigurationDijitClass() {
		return "viewerToolbarPlugin.ConfigurationPane";
	}
	
	@Override
	public PluginResponseFilter[] getResponseFilters() {
		return new PluginResponseFilter[] { new ViewOneActionResponseFilter(), new ViewOneBootstrapResponseFilter() };
	}

}
