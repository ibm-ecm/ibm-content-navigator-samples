package com.ibm.ecm.icn.plugin.actions;

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

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.PlatformUI;

import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.dialogs.PluginBasicDialog;
import com.ibm.ecm.icn.plugin.dialogs.PluginMenuDialog;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class CreatePluginMenuAction extends PluginBaseActionDelegate {

	@Override
	protected PluginBasicDialog getDialog() {
		PluginMenuDialog dialog = new PluginMenuDialog(PlatformUI.getWorkbench().getActiveWorkbenchWindow().getShell(),
				getResource(), Messages.CreatePluginMenuAction_DLG_Title,
				Messages.CreatePluginMenuAction_DLG_Short_Direction);
		return dialog;
	}

	@Override
	protected void process(final PluginBasicDialog xdialog) throws CoreException {
		final Display display = PlatformUI.getWorkbench().getDisplay();
		final PluginMenuDialog dialog = (PluginMenuDialog) xdialog;

		IPackageFragment packageFrag = getJavaProject().getPackageFragmentRoot(getSourceFolder())
				.createPackageFragment(dialog.getJavaPackage(), true, null);
		Map<String, String> map = new HashMap<String, String>();
		map.put("PackageName", dialog.getJavaPackage()); //$NON-NLS-1$
		map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
		map.put("MenuTypeID", dialog.getMenuTypeID()); //$NON-NLS-1$
		String fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_menu/java-template.resource", map); //$NON-NLS-1$

		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceRoot workspaceRoot = workspace.getRoot();

		final IFolder packageFolder = workspaceRoot.getFolder(packageFrag.getPath());
		getTemplateService().saveFileContentsToFolder(packageFolder, new Path(dialog.getClassName() + ".java"), //$NON-NLS-1$
				new ByteArrayInputStream(fileContents.getBytes()), null);

		if (display.isDisposed()) {
			return;
		}

		display.syncExec(new Runnable() {
			public void run() {
				try {
					String constCalls = getTemplateService().getPersistentProperty(getResource().getProject(),
							TemplateService.Top_menus_QN);
					if (constCalls != null) {
						constCalls = constCalls + ", new " + dialog.getJavaPackage() + "." + dialog.getClassName() //$NON-NLS-1$ //$NON-NLS-2$
								+ "()"; //$NON-NLS-1$
					} else {
						constCalls = "new " + dialog.getJavaPackage() + "." + dialog.getClassName() + "()"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
					}

					updatePluginJavaClass("getMenus", "/templates/plugin_menu/java-snippet.resource", constCalls); //$NON-NLS-1$ //$NON-NLS-2$

					getTemplateService().setPersistentProperty(getProject(), TemplateService.Top_menus_QN, constCalls);
					IFile file = packageFolder.getFile(new Path(dialog.getClassName() + ".java")); //$NON-NLS-1$
					openDefaultEditorForFile(file);
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		});
	}

}
