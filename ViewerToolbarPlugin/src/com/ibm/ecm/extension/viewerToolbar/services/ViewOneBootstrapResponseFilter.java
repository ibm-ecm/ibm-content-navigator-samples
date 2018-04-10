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

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONViewoneBootstrapResponse;
import com.ibm.json.java.JSON;
import com.ibm.json.java.JSONObject;

public class ViewOneBootstrapResponseFilter extends PluginResponseFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/p8/getViewoneBootstrap", "/cm/getViewoneBootstrap" };
	}

	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		if ( jsonResponse instanceof JSONViewoneBootstrapResponse  ) {
			PluginLogger logger = callbacks.getLogger();

			logParameters(request, callbacks, logger);
			
			// load plugin configuration
			String configString = callbacks.loadConfiguration();
			
			if ( configString != null ) {
				try {
				    JSONObject jsonConfig = (JSONObject)JSON.parse(configString);	
					String stampButtonLabel = (String)jsonConfig.get("stampButtonLabel");
					String stampImage = (String)jsonConfig.get("stampImage");
					
					// The javadoc for JSONViewoneBootstrapResponse can be found here:
					// https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.3/com.ibm.javaeuc.doc/com/ibm/ecm/json/JSONViewoneBootstrapResponse.html
					// See http://www-01.ibm.com/support/docview.wss?uid=swg27043272 for more information
					JSONViewoneBootstrapResponse jvbr = (JSONViewoneBootstrapResponse)jsonResponse;
					
					// add a custom button for stamp feature
			    		jvbr.setViewOneParameter("annotationStamp1", "image:" + stampButtonLabel + "?path=" + stampImage);
			    		jvbr.setViewOneParameter("annotationStampProperties1", "<Menu=" + stampButtonLabel + ">");
			    		jvbr.setViewOneParameter("imageStampResourceContext", "/navigator/${originalStampURL.query.path}");
				    
				} catch (Exception exc) {
					logger.logError(this, "filter", exc);
				}
			}
			
		}		
	}

	private void logParameters(HttpServletRequest request, PluginServiceCallbacks callbacks, PluginLogger logger) {
		// Log all of the parameters sent to the bootstrap service, and the current logged in user ID.
		// This call is just here to show what is available as contextual information.
		
		String methodName = "logParameters";
		String docUrl = request.getParameter("docUrl");
		String repositoryId = request.getParameter("repositoryId");
		String previewP = request.getParameter("preview");
		String viewer = request.getParameter("viewer");
		
		boolean preview = previewP != null ? Boolean.valueOf(previewP) : false;
		viewer = viewer != null ? viewer : "pro";
		
		Map<String,String> docUrlMap = getDocUrlMap(docUrl);
		
		logger.logDebug(this, methodName, "Repository ID: " + repositoryId);
		logger.logDebug(this, methodName, "Preview Mode: " + preview);
		logger.logDebug(this, methodName, "Viewer Type: " + viewer);
		logger.logDebug(this, methodName, "Document URL: " + docUrl);

		for ( String key : docUrlMap.keySet() ) {
			logger.logDebug(this, methodName, "Document URL Parameter " + key + ": " + docUrlMap.get(key));
		}
		
		String userId = callbacks.getUserId();
		logger.logDebug(this, methodName, "Desktop user: " + userId);
	}
	
	private Map<String,String> getDocUrlMap(String docUrl) {
		Map<String,String> docUrlMap = new HashMap<String,String>();
		
		if ( docUrl != null ) {
			try {
				String query = null;
				int beginQuery = docUrl.indexOf("?");
				if ( beginQuery >= 0 ) {
					query = docUrl.substring(beginQuery+1);
				}
			
			    if ( query != null && query.length() > 0 ) {
			        String queryParts[] = query.split("&");

			        for ( int p=0; p<queryParts.length; p++ ) {
			    	    String keyValue[] = queryParts[p].split("=");
			    	    if ( keyValue.length > 1 ) {
						    docUrlMap.put(keyValue[0],  URLDecoder.decode(keyValue[1], "UTF-8"));
			    	    }
			        }
			    }
		    } catch (UnsupportedEncodingException e) {
			    e.printStackTrace();
			}
		}
		
		return docUrlMap;
	}
}
