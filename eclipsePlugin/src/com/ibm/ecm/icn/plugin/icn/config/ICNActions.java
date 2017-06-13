package com.ibm.ecm.icn.plugin.icn.config;

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

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ICNActions {
	static ICNActions instance = new ICNActions();

	public static ICNActions getInstance() {
		return instance;
	}

	private List<ICNActionType> actions;

	private ICNActions() {
		long startTime = System.currentTimeMillis();
		InputStream input = TemplateService.class.getResourceAsStream("/templates/base/action-mapping.xml"); //$NON-NLS-1$
		actions = Utils.getActionMappings(input);
		long stopTime = System.currentTimeMillis();
		double secs = (double) (stopTime - startTime) / 1000.0;
		System.out.println("loading " + secs + " seconds"); //$NON-NLS-1$ //$NON-NLS-2$
	}

	public List<String> getActions() {
		List<String> list = new ArrayList<String>();
		for (ICNActionType action : actions) {
			list.add(action.actionPath);
		}
		return list;
	}

	public List<String> getActionsContains(String text) {
		List<String> list = new ArrayList<String>();
		for (ICNActionType action : actions) {
			if (action.actionPath.contains(text)) {
				list.add(action.actionPath);
			}
		}
		return list;
	}

	public List<String> getActionsAfterFilters(boolean includeP8, boolean includeCM, boolean includeCMIS,
			boolean includeOD, boolean includeOther, boolean includeAdmin, boolean includeSync) {
		List<String> list = new ArrayList<String>();
		for (ICNActionType action : actions) {
			if (includeP8) {
				if (action.actionPath.startsWith("/p8/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
			if (includeCM) {
				if (action.actionPath.startsWith("/cm/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
			if (includeCMIS) {
				if (action.actionPath.startsWith("/cmis/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
			if (includeOD) {
				if (action.actionPath.startsWith("/od/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
			if (includeAdmin) {
				if (action.actionPath.startsWith("/admin/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
			if (includeSync) {
				if (action.actionPath.startsWith("/sync/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
			if (includeOther) {
				if (!action.actionPath.startsWith("/p8/") && !action.actionPath.startsWith("/cm/") //$NON-NLS-1$ //$NON-NLS-2$
						&& !action.actionPath.startsWith("/od/") && !action.actionPath.startsWith("/cmis/") //$NON-NLS-1$ //$NON-NLS-2$
						&& !action.actionPath.startsWith("/admin/") && !action.actionPath.startsWith("/sync/")) { //$NON-NLS-1$
					list.add(action.actionPath);
					continue;
				}
			}
		}
		return list;
	}

	public String[] getAllActionPaths() {
		String[] returnValue = new String[actions.size()];
		int i = 0;
		for (ICNActionType action : actions) {
			returnValue[i++] = action.actionPath;
		}
		return returnValue;
	}

	public String[] getAllActionPathsStartsWith(String prefix) {
		List<String> list = new ArrayList<String>();
		for (ICNActionType action : actions) {
			if (action.actionPath.startsWith(prefix)) {
				list.add(action.actionPath);
			}
		}
		return list.toArray(new String[list.size()]);
	}

	public String[] getAllActionTypes() {
		String[] returnValue = new String[actions.size()];
		int i = 0;
		for (ICNActionType action : actions) {
			returnValue[i++] = action.actionType;
		}
		return returnValue;
	}

	public String[] getAllActionTypesStartsWith(String prefix) {
		List<String> list = new ArrayList<String>();
		for (ICNActionType action : actions) {
			if (action.actionType.startsWith(prefix)) {
				list.add(action.actionType);
			}
		}
		return list.toArray(new String[list.size()]);
	}

}