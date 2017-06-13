package com.ibm.ecm.icn.plugin.dialogs;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IResource;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.viewers.ArrayContentProvider;
import org.eclipse.jface.viewers.CheckboxTableViewer;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.IStructuredContentProvider;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.layout.RowData;
import org.eclipse.swt.layout.RowLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.icn.config.ICNActions;

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

public class PluginFilterDialog extends PluginBasicDialog {

	private IStructuredContentProvider contentProvider;
	private String[] filterService;
	private ILabelProvider labelProvider;
	private CheckboxTableViewer listViewer;
	private Text txtFilterService;
	private Text txtSearchText;

	public PluginFilterDialog(Shell parentShell, IResource selectedResource, String title, String message,
			String commentText) {
		super(parentShell, selectedResource, title, message, commentText);
	}

	protected void adMoreUIElements(final Composite container) {
		GridData gd = new GridData();
		gd.grabExcessHorizontalSpace = true;
		gd.horizontalSpan = 2;
		gd.horizontalAlignment = GridData.FILL;

		Group grp = new Group(container, SWT.NONE);
		grp.setText(""); //$NON-NLS-1$
		grp.setLayoutData(gd);
		grp.setLayout(new GridLayout(1, false));

		Label lbl = new Label(grp, SWT.NONE);
		lbl.setText(Messages.PluginFilterDialog_Label_FilterService);

		txtFilterService = new Text(grp, SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
		txtFilterService.setText(""); //$NON-NLS-1$
		gd = new GridData();
		gd.grabExcessHorizontalSpace = true;
		gd.grabExcessVerticalSpace = true;
		gd.horizontalAlignment = GridData.FILL;
		gd.heightHint = 40;
		txtFilterService.setLayoutData(gd);
		txtFilterService.setEditable(false);

		// Type ahead stuff
		listViewer = CheckboxTableViewer.newCheckList(grp, SWT.BORDER);
		GridData data = new GridData(GridData.FILL_BOTH);
		data.heightHint = 60;
		data.widthHint = 300;
		listViewer.getTable().setLayoutData(data);

		listViewer.setLabelProvider(labelProvider = new LabelProvider());
		listViewer.setContentProvider(contentProvider = new ArrayContentProvider());
		listViewer.setInput(ICNActions.getInstance().getActions());

		Composite buttonControl = new Composite(grp, SWT.RIGHT_TO_LEFT);
		buttonControl.setLayout(new RowLayout());
		GridData gd1 = new GridData();
		gd1.grabExcessHorizontalSpace = true;
		gd1.horizontalAlignment = GridData.FILL;
		buttonControl.setLayoutData(gd1);

		Button btnSelect = new Button(buttonControl, SWT.PUSH);
		btnSelect.setText(Messages.SupportedServerTypesDialog_Button_Text_AppendSlected);
		btnSelect.addSelectionListener(new SelectionAdapter() {

			public void widgetSelected(SelectionEvent e) {
				Object[] children = contentProvider.getElements(ICNActions.getInstance().getActions());
				if (children != null) {
					ArrayList<String> list = new ArrayList<String>();
					for (int i = 0; i < children.length; ++i) {
						Object element = children[i];
						if (listViewer.getChecked(element)) {
							list.add((String) element);
						}
					}
					if (list.size() > 0) {
						String existingStr = txtFilterService.getText();
						if (existingStr == null || existingStr.length() == 0) {
							existingStr = ""; //$NON-NLS-1$
						} else {
							if (!existingStr.endsWith(",")) { //$NON-NLS-1$
								existingStr = existingStr + ","; //$NON-NLS-1$
							}
						}
						txtFilterService.setText(existingStr + Utils.join(list.toArray(new String[list.size()]), ",")); //$NON-NLS-1$
						filterService = txtFilterService.getText().split(","); //$NON-NLS-1$
						saveInput();
					}
				}
			}
		});

		txtSearchText = new Text(buttonControl, SWT.BORDER | SWT.LEFT_TO_RIGHT);
		txtSearchText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				String text = txtSearchText.getText();
				if (text != null && text.length() > 0) {
					List<String> subList = ICNActions.getInstance().getActionsContains(text);
					listViewer.setInput(subList);
				} else {
					listViewer.setInput(ICNActions.getInstance().getActions());
				}
			}
		});
		txtSearchText.setLayoutData(new RowData(120, SWT.DEFAULT));

		Label lblSearchText = new Label(buttonControl, SWT.NONE);
		lblSearchText.setText(Messages.SupportedServerTypesDialog_Label_Text_Contains);
		// End of Type ahead stuff

	}

	public String[] getFilterService() {
		return filterService;
	}

	protected boolean saveInput() {
		setErrorMessage(null);
		boolean ok = super.saveInput();
		if (ok) {
			if (filterService == null || filterService.length == 0) {
				setErrorMessage(Messages.PluginFilterDialog_MISSING_INFO);
				if (getButton(IDialogConstants.OK_ID) != null) {
					getButton(IDialogConstants.OK_ID).setEnabled(false);
				}
				return false;
			} else {
				if (getButton(IDialogConstants.OK_ID) != null) {
					getButton(IDialogConstants.OK_ID).setEnabled(true);
				}
				return true;
			}
		}
		return ok;
	}

}
