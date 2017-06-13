package com.ibm.ecm.icn.plugin.dialogs;

import org.eclipse.core.resources.IResource;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.ImageData;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.FileDialog;
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

public class PluginFeatureDialog extends PluginBasicDialog {

	private Button btnImage;
	private Label lblIconName;
	private String CSSName;
	private String imageFile;
	private Text textCSSName;
	private Button useImage;
	private boolean useImageFlag;
	private String SVGFile;

	public PluginFeatureDialog(Shell parentShell, IResource selectedResource, String title, String message) {
		super(parentShell, selectedResource, title, message, Messages.PluginFeatureDialog_DLG_Comment);
	}

	protected void adMoreUIElements(final Composite container) {

		SVGFile = "";
		Label lbtFirstName = new Label(container, SWT.NONE);
		lbtFirstName.setText(Messages.PluginFeatureDialog_Label_IconStyleClass);

		GridData javaPackageGD = new GridData();
		javaPackageGD.grabExcessHorizontalSpace = true;
		javaPackageGD.horizontalAlignment = GridData.FILL;

		textCSSName = new Text(container, SWT.BORDER);
		textCSSName.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				CSSName = textCSSName.getText();
				saveInput();
			}
		});
		textCSSName.setLayoutData(javaPackageGD);

		GridData gd = new GridData();
		gd.horizontalSpan = 2;

		useImage = new Button(container, SWT.CHECK);
		useImage.setText(Messages.PluginFeatureDialog_Button_Use_Feature_Image);
		useImage.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (useImageFlag = useImage.getSelection()) {
					btnImage.setEnabled(true);
					lblIconName.setEnabled(true);
				} else {
					btnImage.setEnabled(false);
					lblIconName.setEnabled(false);
				}
				saveInput();
			}
		});
		useImage.setLayoutData(gd);
		
		gd = new GridData();
		gd.horizontalSpan = 2;
		lblIconName = new Label(container, SWT.NONE);
		lblIconName.setText(Messages.PluginFeatureDialog_Button_Select_Feature_Image_Path);
		lblIconName.setEnabled(false);
		lblIconName.setLayoutData(gd);

		Label lblFeature = new Label(container, SWT.NONE);
		lblFeature.setText(Messages.PluginFeatureDialog_Label_Feature_Image);
		
		btnImage = new Button(container, SWT.FLAT);
		btnImage.setText(Messages.PluginFeatureDialog_Button_Select_Feature_Image);

		gd = new GridData();
		gd.horizontalSpan = 1;
		gd.heightHint = 50;
		gd.grabExcessHorizontalSpace = true;
		gd.grabExcessVerticalSpace = true;
		gd.verticalAlignment = GridData.CENTER;

		btnImage.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Shell shell = container.getShell();
				FileDialog fileDialog = new FileDialog(shell);
				fileDialog.setText(Messages.PluginFeatureDialog_FileDLG_Select_Image_File);
				fileDialog.setFilterExtensions(new String[] { "*.png", "*.gif", "*.jpg", "*.svg" }); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
				fileDialog.setFilterNames(new String[] { "ImageFiles(*.svg)" }); //$NON-NLS-1$
				// Open Dialog and save result of selection
				String selected = fileDialog.open();
				String fileExt = fileDialog.getFileName().substring(fileDialog.getFileName().indexOf(".") + 1);
				if (selected != null && !fileExt.contains("svg")) {
					ImageData imageData = new ImageData(selected);
					imageFile = selected;
					btnImage.setText(""); //$NON-NLS-1$
					btnImage.setImage(new Image(shell.getDisplay(), imageData));
				} else {
					imageFile = selected;
					SVGFile = "WebContent/images/" + fileDialog.getFileName();
				}
				lblIconName.setText(fileDialog.getFileName());
				saveInput();
			}
		});
		btnImage.setLayoutData(gd);
		btnImage.setEnabled(false);
		// setComments();
	}

	public String getCSSName() {
		return CSSName;
	}
	
	public String getSVGFile() {
		return SVGFile;
	}

	public String getImageFile() {
		if (useImageFlag) {
			return imageFile;
		} else {
			return null;
		}
	}

	protected boolean saveInput() {
		setErrorMessage(null);
		boolean ok = super.saveInput();
		if (ok) {
			if (useImageFlag) {
				if (imageFile == null || imageFile.length() == 0) {
					setErrorMessage(Messages.PluginFeatureDialog_ERR_Message_Missing_Information);
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
			} else {
				if (CSSName == null || CSSName.length() == 0) {
					setErrorMessage(Messages.PluginFeatureDialog_ERR_Message_Missing_Information);
					if (getButton(IDialogConstants.OK_ID) != null) {
						getButton(IDialogConstants.OK_ID).setEnabled(false);
					}
					return false;
				}
			}
		}
		return ok;
	}

}
