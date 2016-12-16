/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016  All Rights Reserved.
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

package  com.ibm.ecm.icn;

import java.util.Locale;
import java.util.ResourceBundle;

import com.ibm.ecm.extension.PluginLayout;

/**
 * A class that defines the layout provided by the Navigation Layout Refresh plug-in.
 * The layout consists of a horizontal navigation bar with a drop-down menu for selecting
 * feature panes and tabs for accessing secondary feature panes. For example, selecting
 * Home in the features menu gives you access to the Favorites and My Checkouts tabs.
 */
public  class NavLayout extends PluginLayout {

	/**
	 * Returns an identifier that is used to describe this layout.
	 * <p>
	 * <strong>Important:</strong> This identifier is used in URLs so it must contain only alphanumeric characters.
	 * 
	 * @return An alphanumeric <code>String</code> that is used to identify the layout.
	 */
	public  String getId() {
		return "NavLayout";
	}

	/**
	 * Returns a descriptive label for this layout that is displayed in the IBM Content Navigator administration tool.
	 * 
	 * @return A short description of the layout.
	 */
	public  String getName(Locale locale) {
		ResourceBundle resource = ResourceBundle.getBundle("com.ibm.ecm.icn.nls.ServicesMessages", locale);
		return resource.getString("plugin.layout");
	}

	/**
	 * Returns a Boolean value that indicates whether features are configurable for this layout.
	 * 
	 * @return A value of <code>true</code> if the layout supports configuring features for the desktop. 
	 * 		By default, this method returns <code>true</code>.
	 */
	public boolean areFeaturesConfigurable() {
		return true;
	}

	/**
	 * Returns the name of the widget class that implements this layout.
	 *
	 * @return A widget class name.
	 */
	public  String getLayoutClass() {
		return "navLayoutRefreshPluginDojo.NavLayout";
	}

}

