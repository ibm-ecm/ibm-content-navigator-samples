package com.ibm.ecm.icn.plugin.dialogs;

import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IResource;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.IMessageProvider;
import org.eclipse.jface.dialogs.TitleAreaDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StyleRange;
import org.eclipse.swt.custom.StyledText;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

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

public class PluginBasicDialog extends TitleAreaDialog {

	private String className;
	private StyledText comments;
	private String commentText;
	private Composite container;
	private String javaPackage;

	private ModifyListener listener = new ModifyListener() {
		/** {@inheritDoc} */
		public void modifyText(ModifyEvent e) {
			saveInput();
		}
	};

	private String message;
	private IResource selectedResource;
	private String title;
	private Text txtClassName;
	private Text txtJavaPackage;

	public PluginBasicDialog(Shell parentShell, IResource selectedResource, String title, String message,
			String commentText) {
		super(parentShell);
		this.selectedResource = selectedResource;
		this.title = title;
		this.message = message;
		this.commentText = commentText;
	}

	protected void adMoreUIElements(Composite container) {
		// nothing
	}

	protected boolean checkExtraInputs() {
		return true;
	}

	public boolean close() {
		return super.close();
	}

	protected void createButtonsForButtonBar(Composite parent) {
		Button btn = createButton(parent, IDialogConstants.OK_ID, IDialogConstants.OK_LABEL, true);
		btn.setEnabled(false);
		createButton(parent, IDialogConstants.CANCEL_ID, IDialogConstants.CANCEL_LABEL, false);
	}

	private void createClassName(Composite container) {
		Label lbtLastName = new Label(container, SWT.NONE);
		lbtLastName.setText(Messages.PluginBasicDialog_Label_Title_ClassName);

		GridData classNameGD = new GridData();
		classNameGD.grabExcessHorizontalSpace = true;
		classNameGD.horizontalAlignment = GridData.FILL;
		txtClassName = new Text(container, SWT.BORDER);
		txtClassName.setLayoutData(classNameGD);
		txtClassName.addModifyListener(listener);
	}

	private void createCommentArea(Composite container) {
		GridData gd = new GridData();
		gd.grabExcessHorizontalSpace = true;
		gd.horizontalAlignment = GridData.FILL;
		gd.horizontalSpan = 2;
		gd.verticalAlignment = GridData.FILL;
		// gd.grabExcessVerticalSpace = true;
		gd.heightHint = 80;
		gd.widthHint = 240;

		comments = new StyledText(container, SWT.FLAT | SWT.WRAP);
		comments.setLayoutData(gd);
		comments.setEditable(false);
		comments.setEnabled(false);
		// Color listBackground = display.getSystemColor(SWT.COLOR_LIST_BACKGROUND);
		comments.setBackground(container.getBackground());
		setComments(commentText);

	}

	protected Control createContents(Composite parent) {
		Control contents = super.createContents(parent);
		setTitle(title);
		setMessage(message, IMessageProvider.INFORMATION);
		return contents;
	}

	@Override
	protected Control createDialogArea(Composite parent) {
		Composite area = (Composite) super.createDialogArea(parent);
		container = new Composite(area, SWT.NONE);
		container.setLayoutData(new GridData(GridData.FILL_BOTH));
		GridLayout layout = new GridLayout(2, false);
		container.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		container.setLayout(layout);

		createCommentArea(container);
		createJavaPackage(container);
		createClassName(container);
		adMoreUIElements(container);

		return area;
	}

	private void createJavaPackage(Composite container) {
		Label lbtFirstName = new Label(container, SWT.NONE);
		lbtFirstName.setText(Messages.PluginBasicDialog_Label_Ttitle_JavaPackage);

		GridData javaPackageGD = new GridData();
		javaPackageGD.grabExcessHorizontalSpace = true;
		javaPackageGD.horizontalAlignment = GridData.FILL;

		txtJavaPackage = new Text(container, SWT.BORDER);
		txtJavaPackage.addModifyListener(listener);
		txtJavaPackage.setLayoutData(javaPackageGD);
		if (selectedResource != null) {
			IFolder folder = (IFolder) selectedResource;
			String cleanedPackage = folder.getProjectRelativePath().toString().substring(3);
			if (cleanedPackage.startsWith("/")) { //$NON-NLS-1$
				cleanedPackage = cleanedPackage.substring(1);
			}
			cleanedPackage = cleanedPackage.replaceAll("/", "."); //$NON-NLS-1$ //$NON-NLS-2$
			txtJavaPackage.setText(cleanedPackage);
			txtJavaPackage.setSelection(0, cleanedPackage.length());
		}
	}

	public String getClassName() {
		return className;
	}

	public String getJavaPackage() {
		return javaPackage;
	}

	@Override
	public boolean isHelpAvailable() {
		return false;
	}

	@Override
	protected boolean isResizable() {
		return true;
	}

	@Override
	protected void okPressed() {
		if (saveInput()) {
			super.okPressed();
		}
	}

	protected boolean saveInput() {
		setErrorMessage(null);
		if (txtJavaPackage != null)
			javaPackage = txtJavaPackage.getText();
		if (txtClassName != null)
			className = txtClassName.getText();

		if ((javaPackage == null || javaPackage.length() == 0) || (className == null || className.length() == 0)) {
			setErrorMessage(Messages.PluginBasicDialog_MISSING_INFO);
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

	public void setComments(String comments) {
		this.comments.setText(comments);

		StyleRange styleRange = new StyleRange();
		styleRange.start = 0;
		styleRange.length = comments.length();
		styleRange.fontStyle = SWT.BOLD;
		styleRange.foreground = container.getDisplay().getSystemColor(SWT.COLOR_DARK_GRAY);
		styleRange.background = container.getBackground();
		this.comments.setStyleRange(styleRange);
	}

}
