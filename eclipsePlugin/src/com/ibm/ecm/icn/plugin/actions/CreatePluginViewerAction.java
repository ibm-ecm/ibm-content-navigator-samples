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
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.dialogs.PluginBasicDialog;
import com.ibm.ecm.icn.plugin.dialogs.PluginViewerDialog;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class CreatePluginViewerAction extends PluginBaseActionDelegate {

	@Override
	protected PluginBasicDialog getDialog() {
		PluginViewerDialog dialog = new PluginViewerDialog(PlatformUI.getWorkbench().getActiveWorkbenchWindow()
				.getShell(), getResource(), Messages.CreatePluginViewerAction_DLG_Title,
				Messages.CreatePluginViewerAction_DLG_Short_Direction);
		return dialog;
	}

	@Override
	protected void process(final PluginBasicDialog xdialog) throws CoreException {
		final Display display = PlatformUI.getWorkbench().getDisplay();
		final PluginViewerDialog dialog = (PluginViewerDialog) xdialog;

		IPackageFragment packageFrag = getJavaProject().getPackageFragmentRoot(getSourceFolder())
				.createPackageFragment(dialog.getJavaPackage(), true, null);
		Map<String, String> map = new HashMap<String, String>();
		map.put("PackageName", dialog.getJavaPackage()); //$NON-NLS-1$
		map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
		map.put("ViewerClassName", Utils.asLowerCaseFirstChar(dialog.getClassName())); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		map.put("SupportedContentTypes", //$NON-NLS-1$
				dialog.supportedContentTypes() == null ? "null" : "new String[]{" //$NON-NLS-1$ //$NON-NLS-2$
						+ Utils.getListContentTypes(dialog.supportedContentTypes()) + "}"); //$NON-NLS-1$
		map.put("SupportedServerTypes", dialog.doesSupportAllRepositories() ? "null" : "new String[]{" + dialog.supportedRepositories() //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
								+ "}"); //$NON-NLS-1$

		String fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_viewer/java-template.resource", map); //$NON-NLS-1$

		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceRoot workspaceRoot = workspace.getRoot();

		final IFolder packageFolder = workspaceRoot.getFolder(packageFrag.getPath());
		getTemplateService().saveFileContentsToFolder(packageFolder, new Path(dialog.getClassName() + ".java"), //$NON-NLS-1$
				new ByteArrayInputStream(fileContents.getBytes()), null);

		// Create java script file
		IPackageFragment dojoPackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).getPackageFragment(
				getTemplateService().getFullyQualifiedDojoPackage()); //$NON-NLS-1$
		final IFolder dojoPackageFolder = workspaceRoot.getFolder(dojoPackage.getPath());
		map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
		map.put("ClassName", getPluginClassName()); //$NON-NLS-1$
		map.put("ViewerClassName", Utils.asLowerCaseFirstChar(dialog.getClassName())); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_viewer/js-template.resource", map); //$NON-NLS-1$
		getTemplateService().saveFileContentsToFolder(dojoPackageFolder, new Path(dialog.getClassName() + ".js"), //$NON-NLS-1$
				new ByteArrayInputStream(fileContents.getBytes()), null);

		// Create a HTML file
		IPackageFragment dojoTemplatePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder())
				.getPackageFragment(getTemplateService().getFullyQualifiedDojoTemplatesPackage()); //$NON-NLS-1$
		if (dojoTemplatePackage == null || !dojoTemplatePackage.exists()) {
			dojoTemplatePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).createPackageFragment(
					getTemplateService().getFullyQualifiedDojoTemplatesPackage(), true, null);
		}
		final IFolder dojoTemplatePackageFolder = workspaceRoot.getFolder(dojoTemplatePackage.getPath());
		map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
		map.put("ClassName", getPluginClassName()); //$NON-NLS-1$
		map.put("ViewerClassName", Utils.asLowerCaseFirstChar(dialog.getClassName())); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_viewer/html-template.resource", map); //$NON-NLS-1$
		getTemplateService().saveFileContentsToFolder(dojoTemplatePackageFolder,
				new Path(dialog.getClassName() + ".html"), new ByteArrayInputStream(fileContents.getBytes()), null); //$NON-NLS-1$

		display.syncExec(new Runnable() {
			public void run() {
				try {
					String constCalls = getTemplateService().getPersistentProperty(getResource().getProject(),
							TemplateService.Top_viewers_QN);
					if (constCalls != null) {
						constCalls = constCalls + ", new " + dialog.getJavaPackage() + "." + dialog.getClassName() //$NON-NLS-1$ //$NON-NLS-2$
								+ "()"; //$NON-NLS-1$
					} else {
						constCalls = "new " + dialog.getJavaPackage() + "." + dialog.getClassName() + "()"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
					}

					updatePluginJavaClass("getViewers", "/templates/plugin_viewer/java-snippet.resource", constCalls); //$NON-NLS-1$ //$NON-NLS-2$
					getTemplateService()
							.setPersistentProperty(getProject(), TemplateService.Top_viewers_QN, constCalls);

					IFile file = packageFolder.getFile(new Path(dialog.getClassName() + ".java")); //$NON-NLS-1$
					openDefaultEditorForFile(file);
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
		});
	}

}
