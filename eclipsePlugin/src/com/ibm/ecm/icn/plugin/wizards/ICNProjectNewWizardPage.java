package com.ibm.ecm.icn.plugin.wizards;

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

import org.eclipse.jface.preference.FileFieldEditor;
import org.eclipse.jface.preference.StringButtonFieldEditor;
import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Text;

import com.ibm.ecm.icn.plugin.Activator;
import com.ibm.ecm.icn.plugin.Messages;

public class ICNProjectNewWizardPage extends WizardPage implements Listener, ICNProjectInfoProvider {

	private final class FileFieldListener implements ModifyListener {
		public void modifyText(ModifyEvent event) {
			setPageComplete(isPageComplete());
			if (libraryFieldEditor == null || pluginNameText == null || packageText == null || versionText == null) {
			} else {
				try {
					getWizard().getContainer().updateButtons();
				} catch (Exception ex) {
					// ignore
				}
			}
		}
	}

	private String className;
	private Text classText;
	private StringButtonFieldEditor libraryFieldEditor;
	private String libraryPath;
	private String packageName;
	private Text packageText;
	private String pluginName;
	private Text pluginNameText;
	String projectName;
	private String version;

	private Text versionText;

	public ICNProjectNewWizardPage(String pageName) {
		super(pageName);
		setTitle(Messages.ICNProjectNewWizardPage_WizardPage_Title);
		setDescription(Messages.ICNProjectNewWizardPage_WizardPage_Descr);
	}

	@Override
	public boolean canFlipToNextPage() {
		// TODO Auto-generated method stub
		return false;
	}

	private void cleanUpInputData() {
		if (packageName.endsWith(".")) { //$NON-NLS-1$
			packageName = packageName.substring(0, packageName.length());
		}
	}

	@Override
	public void createControl(Composite parent) {
		// create the composite to hold the widgets
		Composite composite = new Composite(parent, SWT.NONE);

		// create the desired layout for this wizard page
		GridLayout gl = new GridLayout();
		int ncol = 2;
		gl.numColumns = ncol;
		composite.setLayout(gl);

		Group grpTestSession = new Group(composite, SWT.NONE);
		grpTestSession.setText(Messages.ICNProjectNewWizardPage_Group_Ttile_ContentNavogatorPluginInfo);
		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		grpTestSession.setLayout(gridLayout);

		GridData gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		grpTestSession.setLayoutData(gridData);

		Label lblName = new Label(grpTestSession, SWT.LEAD);
		lblName.setText(Messages.ICNProjectNewWizardPage_Label_Text_DescriptiveName);
		// create text field for test session name
		pluginNameText = new Text(grpTestSession, SWT.SINGLE | SWT.BORDER);
		pluginNameText.addModifyListener(new FileFieldListener());
		// layout text field for test session name
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		pluginNameText.setLayoutData(gridData);

		Label lblTSName = new Label(grpTestSession, SWT.LEAD);
		lblTSName.setText(Messages.ICNProjectNewWizardPage_Label_Text_JavaPackage);
		// create text field for test session name
		packageText = new Text(grpTestSession, SWT.SINGLE | SWT.BORDER);
		packageText.addModifyListener(new FileFieldListener());
		// layout text field for test session name
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		packageText.setLayoutData(gridData);

		Label lblClassName = new Label(grpTestSession, SWT.LEAD);
		lblClassName.setText(Messages.ICNProjectNewWizardPage_Label_Text_ClassName);
		// create text field for test session name
		classText = new Text(grpTestSession, SWT.SINGLE | SWT.BORDER);
		classText.addModifyListener(new FileFieldListener());
		// layout text field for test session name
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		classText.setLayoutData(gridData);

		Label lblVersion = new Label(grpTestSession, SWT.LEAD);
		lblVersion.setText(Messages.ICNProjectNewWizardPage_Label_Text_Version);
		// create text field for test session name
		versionText = new Text(grpTestSession, SWT.SINGLE | SWT.BORDER);
		versionText.addModifyListener(new FileFieldListener());
		// layout text field for test session name
		gridData = new GridData();
		// gridData.horizontalAlignment = SWT.FILL;
		gridData.widthHint = 100;
		gridData.grabExcessHorizontalSpace = true;
		versionText.setLayoutData(gridData);
		versionText.setText("2.0.3"); //$NON-NLS-1$
		// versionText.setTextLimit(10);

		// create widget to select the file to import
		grpTestSession = new Group(composite, SWT.NONE);
		grpTestSession.setText(Messages.ICNProjectNewWizardPage_Group_Title_LocateNavigatorAPIJar);
		gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		grpTestSession.setLayout(gridLayout);

		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		grpTestSession.setLayoutData(gridData);

		Composite fileFieldComposite = new Composite(grpTestSession, SWT.NONE);
		fileFieldComposite.setLayout(new FillLayout());
		libraryFieldEditor = new FileFieldEditor("fileSelect", "", fileFieldComposite); //$NON-NLS-1$ //$NON-NLS-2$
		libraryFieldEditor.getTextControl(fileFieldComposite).clearSelection();
		libraryFieldEditor.getTextControl(fileFieldComposite).addModifyListener(new FileFieldListener());
		((FileFieldEditor) libraryFieldEditor).setFileExtensions(new String[] { "nav*.jar", "*.*" }); //$NON-NLS-1$ //$NON-NLS-2$
		String library = Activator.getDefault().getPreferenceStore().getString("libpath"); //$NON-NLS-1$
		if (library != null && library.length() > 0) {
			libraryFieldEditor.getTextControl(fileFieldComposite).setText(library);
		}
		// layout file widget
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		fileFieldComposite.setLayoutData(gridData);

		// set the composite as the control for this page
		setControl(composite);
	}

	public String getLibraryPath() {
		return libraryPath;
	}

	public String getPluginClassName() {
		return className;
	}

	public String getPluginName() {
		return pluginName;
	}

	public String getPluginPackageName() {
		cleanUpInputData();
		return packageName;
	}

	public String getPluginVersion() {
		return version;
	}

	public String getProjectName() {
		// TODO Auto-generated method stub
		return projectName;
	}

	public void handleEvent(Event event) {
		setPageComplete(isPageComplete());
		getWizard().getContainer().updateButtons();
	}

	public boolean isPageComplete() {
		// ICNProjectNewWizard wizard = (ICNProjectNewWizard) getWizard();
		if (libraryFieldEditor == null || pluginNameText == null || packageText == null || versionText == null) {
			return false;
		}

		libraryPath = libraryFieldEditor.getStringValue();
		if (libraryPath == null || libraryPath.length() == 0) {
			return false;
		}

		if (!libraryPath.endsWith("navigatorAPI.jar")) { //$NON-NLS-1$
			return false;
		}

		if (pluginNameText.getText().length() == 0) {
			return false;
		}
		pluginName = pluginNameText.getText();

		if (packageText.getText().length() == 0) {
			return false;
		}
		packageName = packageText.getText();

		if (classText.getText().length() == 0) {
			return false;
		}
		className = classText.getText();

		if (versionText.getText().length() == 0) {
			return false;
		}
		version = versionText.getText();

		Activator.getDefault().getPreferenceStore().setValue("libpath", libraryPath); //$NON-NLS-1$
		return true;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public void setVisible(boolean visible) {
		super.setVisible(visible);
		// Set the initial field focus
		if (visible) {
			pluginNameText.setFocus();
		}
	}

}
