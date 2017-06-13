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
import org.eclipse.swt.events.SelectionListener;
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

public class SupportedServerTypesDialog extends PluginBasicDialog {

	private ILabelProvider labelProvider;
	private IStructuredContentProvider contentProvider;
	private Text txtSearchText;
	private CheckboxTableViewer listViewer;
	private Button selectMimes;
	private Button supportAll;
	private boolean supportAllFlag;
	private Button supportAllContentTypes;
	private boolean supportAllContentTypesFlag;
	private Button supportCM;
	private boolean supportCMFlag;
	private Button supportCMIS;
	private boolean supportCMISFlag;
	private Button supportOD;
	private boolean supportODFlag;
	private Button supportP8;
	private boolean supportP8Flag;
	private Text textContentTypes;
	private String contentTypes;

	public SupportedServerTypesDialog(Shell parentShell, IResource selectedResource, String title, String message,
			String helpText) {
		super(parentShell, selectedResource, title, message, helpText);
	}

	protected void adMoreUIElements(final Composite container) {
		GridData gd = new GridData();
		gd.horizontalSpan = 2;
		gd.grabExcessHorizontalSpace = true;
		gd.horizontalAlignment = GridData.FILL;

		Group grp = new Group(container, SWT.NONE);
		grp.setText(Messages.SupportedServerTypesDialog_Group_Text_SupportedContentTypes);
		grp.setLayoutData(gd);
		grp.setLayout(new GridLayout(1, false));

		supportAllContentTypes = new Button(grp, SWT.CHECK);
		supportAllContentTypes.setText(Messages.SupportedServerTypesDialog_Button_Text_SupportAllContentTypes);
		supportAllContentTypes.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (supportAllContentTypes.getSelection()) {
					textContentTypes.setEnabled(false);
					selectMimes.setEnabled(false);
					listViewer.getTable().setEnabled(false);
					contentTypes = null;
				} else {
					textContentTypes.setEnabled(true);
					selectMimes.setEnabled(true);
					listViewer.getTable().setEnabled(true);
					contentTypes = textContentTypes.getText();
				}
				supportAllContentTypesFlag = supportAllContentTypes.getSelection();
				saveInput();
			}
		});
		supportAllContentTypes.setSelection(true);
		supportAllContentTypesFlag = true;

		GridData gd2 = new GridData();
		gd2.horizontalSpan = 2;
		gd2.grabExcessHorizontalSpace = true;
		gd2.horizontalAlignment = GridData.FILL;
		supportAllContentTypes.setLayoutData(gd2);

		Label lbl = new Label(grp, SWT.NONE);
		lbl.setText(Messages.SupportedServerTypesDialog_Label_Text_EnterMIMEs);

		GridData gd1 = new GridData();
		gd1.grabExcessHorizontalSpace = true;
		gd1.horizontalAlignment = GridData.FILL;
		gd1.heightHint = 40;

		textContentTypes = new Text(grp, SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
		textContentTypes.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				contentTypes = textContentTypes.getText();
				saveInput();
			}
		});
		textContentTypes.setLayoutData(gd1);
		textContentTypes.setEnabled(false);

		//
		listViewer = CheckboxTableViewer.newCheckList(grp, SWT.BORDER);
		GridData data = new GridData(GridData.FILL_BOTH);
		data.heightHint = 60;
		data.widthHint = 300;
		listViewer.getTable().setLayoutData(data);

		listViewer.setLabelProvider(labelProvider = new LabelProvider());
		listViewer.setContentProvider(contentProvider = new ArrayContentProvider());
		listViewer.setInput(Utils.getMIMEList());

		Composite buttonControl = new Composite(grp, SWT.RIGHT_TO_LEFT);
		buttonControl.setLayout(new RowLayout());
		gd1 = new GridData();
		gd1.grabExcessHorizontalSpace = true;
		gd1.horizontalAlignment = GridData.FILL;
		buttonControl.setLayoutData(gd1);

		selectMimes = new Button(buttonControl, SWT.PUSH);
		selectMimes.setText(Messages.SupportedServerTypesDialog_Button_Text_AppendSlected);
		SelectionListener listener = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] children = contentProvider.getElements(Utils.getMIMEList());
				if (children != null) {
					ArrayList<String> list = new ArrayList<String>();
					for (int i = 0; i < children.length; ++i) {
						Object element = children[i];
						if (listViewer.getChecked(element)) {
							list.add((String) element);
						}
					}
					if (list.size() > 0) {
						String existingStr = textContentTypes.getText();
						if (existingStr == null || existingStr.length() == 0) {
							existingStr = ""; //$NON-NLS-1$
						} else {
							if (!existingStr.endsWith(",")) { //$NON-NLS-1$
								existingStr = existingStr + ","; //$NON-NLS-1$
							}
						}
						textContentTypes.setText(existingStr + Utils.join(list.toArray(new String[list.size()]), ",")); //$NON-NLS-1$
						contentTypes = textContentTypes.getText();
						saveInput();
					}
				}
			}
		};
		selectMimes.addSelectionListener(listener);

		txtSearchText = new Text(buttonControl, SWT.BORDER | SWT.LEFT_TO_RIGHT);
		txtSearchText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				String text = txtSearchText.getText();
				if (text != null && text.length() > 0) {
					List<String> subList = Utils.getMIMEListContains(text);
					listViewer.setInput(subList);
				} else {
					listViewer.setInput(Utils.getMIMEList());
				}
			}
		});
		txtSearchText.setLayoutData(new RowData(120, SWT.DEFAULT));

		Label lblSearchText = new Label(buttonControl, SWT.NONE);
		lblSearchText.setText(Messages.SupportedServerTypesDialog_Label_Text_Contains);

		listViewer.getTable().setEnabled(false);
		selectMimes.setEnabled(false);

		//
		gd = new GridData();
		gd.horizontalSpan = 2;
		gd.grabExcessHorizontalSpace = true;
		gd.grabExcessVerticalSpace = true;
		gd.verticalAlignment = GridData.FILL;
		gd.horizontalAlignment = GridData.FILL;

		Group grp2 = new Group(container, SWT.NONE);
		grp2.setText(Messages.SupportedServerTypesDialog_Group_Text_SupportedRepositoryTypes);
		grp2.setLayoutData(gd);
		grp2.setLayout(new GridLayout(1, false));

		supportAll = new Button(grp2, SWT.CHECK);
		supportAll.setText(Messages.SupportedServerTypesDialog_Button_Text_SupportAllREepos);
		supportAll.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (supportAll.getSelection()) {
					supportP8.setEnabled(false);
					supportCM.setEnabled(false);
					supportOD.setEnabled(false);
					supportCMIS.setEnabled(false);
				} else {
					supportP8.setEnabled(true);
					supportCM.setEnabled(true);
					supportOD.setEnabled(true);
					supportCMIS.setEnabled(true);

					supportP8Flag = supportP8.getSelection();
					supportCMFlag = supportCM.getSelection();
					supportODFlag = supportOD.getSelection();
					supportCMISFlag = supportCMIS.getSelection();
				}
				supportAllFlag = supportAll.getSelection();
				saveInput();
			}
		});
		supportAll.setSelection(true);
		supportAllFlag = true;

		Group grp3 = new Group(grp2, SWT.NONE);
		grp3.setText(Messages.SupportedServerTypesDialog_Group_Text_SpecificRepos);
		grp3.setLayoutData(gd);
		grp3.setLayout(new GridLayout(1, false));

		supportP8 = new Button(grp3, SWT.CHECK);
		supportP8.setText(Messages.SupportedServerTypesDialog_Button_Text_P8);
		supportP8.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				supportP8Flag = supportP8.getSelection();
				saveInput();
			}
		});
		supportCM = new Button(grp3, SWT.CHECK);
		supportCM.setText(Messages.SupportedServerTypesDialog_Button_Text_CM);
		supportCM.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				supportCMFlag = supportCM.getSelection();
				saveInput();
			}
		});

		supportOD = new Button(grp3, SWT.CHECK);
		supportOD.setText(Messages.SupportedServerTypesDialog_Button_Text_CMOD);
		supportOD.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				supportODFlag = supportOD.getSelection();
				saveInput();
			}
		});
		supportCMIS = new Button(grp3, SWT.CHECK);
		supportCMIS.setText(Messages.SupportedServerTypesDialog_Button_Text_CMIS);
		supportCMIS.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				supportCMISFlag = supportCMIS.getSelection();
				saveInput();
			}
		});

		supportP8.setEnabled(false);
		supportCM.setEnabled(false);
		supportOD.setEnabled(false);
		supportCMIS.setEnabled(false);
	}

	public boolean doesSupportAllRepositories() {
		return supportAllFlag;
	}

	protected boolean saveInput() {
		setErrorMessage(null);
		boolean ok = super.saveInput();
		if (!supportAllContentTypesFlag && (contentTypes == null || contentTypes.length() == 0)) {
			setErrorMessage(Messages.SupportedServerTypesDialog_MISSING_INFO);
			if (getButton(IDialogConstants.OK_ID) != null) {
				getButton(IDialogConstants.OK_ID).setEnabled(false);
			}
			return false;
		}
		if (!supportAllFlag && !supportP8Flag && !supportCMFlag && !supportCMISFlag && !supportODFlag) {
			setErrorMessage(Messages.SupportedServerTypesDialog_MISSING_INFO);
			if (getButton(IDialogConstants.OK_ID) != null) {
				getButton(IDialogConstants.OK_ID).setEnabled(false);
			}
			return false;
		}
		return ok;
	}

	public String supportedContentTypes() {
		if (supportAllContentTypesFlag) {
			return null;
		} else {
			return contentTypes;
		}
	}

	public String supportedRepositories() {
		String ret = ""; //$NON-NLS-1$
		if (supportP8Flag) {
			ret = "\"p8\""; //$NON-NLS-1$
		}
		if (supportCMFlag) {
			if (ret.length() > 0) {
				ret = ret + ",\"cm\""; //$NON-NLS-1$
			} else {
				ret = "\"cm\""; //$NON-NLS-1$
			}
		}
		if (supportCMISFlag) {
			if (ret.length() > 0) {
				ret = ret + ",\"cmis\""; //$NON-NLS-1$
			} else {
				ret = "\"cmis\""; //$NON-NLS-1$
			}
		}
		if (supportODFlag) {
			if (ret.length() > 0) {
				ret = ret + ",\"od\""; //$NON-NLS-1$
			} else {
				ret = "\"od\""; //$NON-NLS-1$
			}
		}
		return ret;
	}

}
