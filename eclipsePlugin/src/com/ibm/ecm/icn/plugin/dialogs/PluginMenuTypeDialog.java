package com.ibm.ecm.icn.plugin.dialogs;

import org.eclipse.core.resources.IResource;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Shell;

import com.ibm.ecm.icn.plugin.Messages;

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

public class PluginMenuTypeDialog extends PluginBasicDialog {

	private Button useToolBar;
	private boolean useToolbarFlag;

	public boolean isUseToolbarFlag() {
		return useToolbarFlag;
	}

	public PluginMenuTypeDialog(Shell parentShell, IResource selectedResource, String title, String message) {
		super(parentShell, selectedResource, title, message, Messages.PluginMenuTypeDialog_DLG_Comment);
	}

	protected void adMoreUIElements(final Composite container) {
		GridData gd = new GridData();
		gd.horizontalSpan = 2;
		useToolBar = new Button(container, SWT.CHECK);
		useToolBar.setText(Messages.PluginMenuTypeDialog_Button_ToolBar);
		useToolBar.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {

				saveInput();
			}
		});
		useToolBar.setLayoutData(gd);
	}

	protected boolean saveInput() {
		setErrorMessage(null);
		boolean ok = super.saveInput();
		if (useToolBar != null) {
			useToolbarFlag = useToolBar.getSelection();
		} else {
			useToolbarFlag = false;
		}
		return ok;
	}

}
