/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2018 All Rights Reserved.
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

package com.ibm.ecm.extension.viewerToolbar.services;

import javax.servlet.http.HttpServletRequest;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONObject;

public class ViewOneActionResponseFilter extends PluginResponseFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/v1/viewoneAction" };
	}

	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		PluginLogger logger = callbacks.getLogger();
		
		// load plugin configuration
		String configString = callbacks.loadConfiguration();
		
		if ( configString != null ) {
			try {
			    JSONObject jsonConfig = (JSONObject)JSON.parse(configString);					
				String html = (String) jsonResponse.get("responseHTML");
				
				// Refer to https://www.ibm.com/support/knowledgecenter/SSTPHR_5.0.8/com.ibm.viewone.configuring/dvopr113.htm for the parameter
											
				// indicates if custom buttons are added after the existing buttons on top toolbar
				boolean append = (Boolean) jsonConfig.get("appendToToolbar");
				
				// position of the buttons
				String position;

				// index of previous button
				int lastIndex;
				
				if (append) {
					// follow the existing buttons. See https://www.ibm.com/support/pages/ibm%C2%AE-daeja%E2%84%A2-viewone-virtual-version-501-release-notes
					position = "bar1AfterButton";
					
					if (html.indexOf("<param name=\"bar1afterButton") != -1) {
						// currently the last button on the top toolbar is bar1afterButton4 if Merge and Split is enabled on desktop
						lastIndex = 4;						
					} else {
						lastIndex = 0;
					}
				} else {
					// insert into the top toolbar
					position = "bar1Button";
					lastIndex = 0;	
				}
				
				int index = html.indexOf("<param name=");
				if (index != -1) {					
					// custom button 1
					String executionScript = "viewerToolbarPluginTopButton1Handler()";
					String evalScript = "viewerToolbarPluginTopButton1Eval()";					
					String topButtonTooltip = (String)jsonConfig.get("topButton1Tooltip");
					String topButtonImageEnabled = "../../../../" + (String)jsonConfig.get("topButton1ImageEnabled");
					String topButtonImageDisabled = "../../../../" + (String)jsonConfig.get("topButton1ImageDisabled");
					String value = executionScript + ", " + topButtonTooltip + ", " + topButtonImageEnabled + ", " + topButtonImageDisabled + ", true, " + evalScript;
					String param1 = "<param name=\"" + position + (lastIndex+1) + "\" value=\"" + value + "\"/>";					
					
					// custom button 2
					String viewerId = (String)request.getParameter("viewerId");
					executionScript = viewerId + "_viewerToolbarPluginDeleteItem()";
					evalScript = viewerId + "_viewerToolbarPluginEvalDeleteItem()";
					topButtonTooltip = (String)jsonConfig.get("topButton2Tooltip");
					topButtonImageEnabled = "../../../../" + (String)jsonConfig.get("topButton2ImageEnabled");
					topButtonImageDisabled = "../../../../" + (String)jsonConfig.get("topButton2ImageDisabled");
					value = executionScript + ", " + topButtonTooltip + ", " + topButtonImageEnabled + ", " + topButtonImageDisabled + ", true, " + evalScript;
					String param2 = "<param name=\"" + position + (lastIndex+2) + "\" value=\"" + value + "\"/>";
					
					html = html.substring(0, index) + param2 + "\r\n" + param1 + "\r\n" + html.substring(index);					
					jsonResponse.put("responseHTML", html);			
				}
			    
			} catch (Exception exc) {
				logger.logError(this, "filter", exc);
			}
		}
		
	}

}
