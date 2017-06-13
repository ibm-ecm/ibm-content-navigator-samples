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
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class CreatePluginRepositoryTypeAction extends PluginBaseActionDelegate {

	@Override
	protected PluginBasicDialog getDialog() {
		PluginBasicDialog dialog = new PluginBasicDialog(PlatformUI.getWorkbench().getActiveWorkbenchWindow()
				.getShell(), getResource(), Messages.CreatePluginRepositoryAction_DLG_Title,
				Messages.CreatePluginRepositoryAction_DLG_Short_Direction, Messages.CreatePluginRepositoryAction_DLG_Comment);
		return dialog;
	}

	@Override
	protected void process(final PluginBasicDialog dialog) throws CoreException {
		final Display display = PlatformUI.getWorkbench().getDisplay();

		IPackageFragment packageFrag = getJavaProject().getPackageFragmentRoot(getSourceFolder())
				.createPackageFragment(dialog.getJavaPackage(), true, null);
		Map<String, String> map = new HashMap<String, String>();
		map.put("PackageName", dialog.getJavaPackage()); //$NON-NLS-1$
		map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		map.put("PluginClassName", getPluginClassName());
		String fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_repository/java-template.resource", map); //$NON-NLS-1$

		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceRoot workspaceRoot = workspace.getRoot();

		final IFolder packageFolder = workspaceRoot.getFolder(packageFrag.getPath());
		getTemplateService().saveFileContentsToFolder(packageFolder, new Path(dialog.getClassName() + ".java"), //$NON-NLS-1$
				new ByteArrayInputStream(fileContents.getBytes()), null);

		// Create general configuration java script file
		IPackageFragment dojoPackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).getPackageFragment(
				getTemplateService().getFullyQualifiedDojoPackage());
		final IFolder dojoPackageFolder = workspaceRoot.getFolder(dojoPackage.getPath());
		map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
		map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_repository/general-config-template.js", map); //$NON-NLS-1$
		getTemplateService().saveFileContentsToFolder(dojoPackageFolder, new Path(dialog.getClassName() + "GeneralConfigurationPane.js"), //$NON-NLS-1$
				new ByteArrayInputStream(fileContents.getBytes()), null);

		// Create a HTML file
		IPackageFragment dojoTemplatePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder())
				.getPackageFragment(getTemplateService().getFullyQualifiedDojoTemplatesPackage());
		if (dojoTemplatePackage == null || !dojoTemplatePackage.exists()) {
			dojoTemplatePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).createPackageFragment(
					getTemplateService().getFullyQualifiedDojoTemplatesPackage(), true, null);
		}
		final IFolder dojoTemplatePackageFolder = workspaceRoot.getFolder(dojoTemplatePackage.getPath());
		map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
		map.put("ClassName", getPluginClassName()); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_repository/html-template.resource", map); //$NON-NLS-1$
		getTemplateService().saveFileContentsToFolder(dojoTemplatePackageFolder,
				new Path(dialog.getClassName() + "GeneralConfigurationPane.html"), new ByteArrayInputStream(fileContents.getBytes()), null); //$NON-NLS-1$
		if (display.isDisposed()) {
			return;
		}
		
		// Create repository configuration java script file
		dojoPackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).getPackageFragment(
				getTemplateService().getFullyQualifiedDojoPackage());
		map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
		map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_repository/repository-config-template.js", map); //$NON-NLS-1$
		getTemplateService().saveFileContentsToFolder(dojoPackageFolder, new Path(dialog.getClassName() + "ConfigurationParametersPane.js"), //$NON-NLS-1$
				new ByteArrayInputStream(fileContents.getBytes()), null);

		// Create a HTML file
		dojoTemplatePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder())
				.getPackageFragment(getTemplateService().getFullyQualifiedDojoTemplatesPackage());
		if (dojoTemplatePackage == null || !dojoTemplatePackage.exists()) {
			dojoTemplatePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).createPackageFragment(
					getTemplateService().getFullyQualifiedDojoTemplatesPackage(), true, null);
		}
		map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
		map.put("ClassName", getPluginClassName()); //$NON-NLS-1$
		map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
		fileContents = getTemplateService().getContentAfterReplacingVariables(
				"/templates/plugin_repository/html-template.resource", map); //$NON-NLS-1$
		getTemplateService().saveFileContentsToFolder(dojoTemplatePackageFolder,
				new Path(dialog.getClassName() + "ConfigurationParametersPane.html"), new ByteArrayInputStream(fileContents.getBytes()), null); //$NON-NLS-1$
		if (display.isDisposed()) {
			return;
		}

		display.syncExec(new Runnable() {
			public void run() {
				try {
					String constCalls = getTemplateService().getPersistentProperty(getResource().getProject(),
							TemplateService.Top_repositories_QN);
					if (constCalls != null) {
						constCalls = constCalls + ", new " + dialog.getJavaPackage() + "." + dialog.getClassName() //$NON-NLS-1$ //$NON-NLS-2$
								+ "()"; //$NON-NLS-1$
					} else {
						constCalls = "new " + dialog.getJavaPackage() + "." + dialog.getClassName() + "()"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
					}

					updatePluginJavaClass("getRepositoryTypes", "/templates/plugin_repository/java-snippet.resource", constCalls); //$NON-NLS-1$ //$NON-NLS-2$

					getTemplateService().setPersistentProperty(getProject(), TemplateService.Top_repositories_QN, constCalls);
					IFile file = dojoPackageFolder.getFile(new Path(dialog.getClassName() + "GeneralConfigurationPane.js")); //$NON-NLS-1$
					openDefaultEditorForFile(file);

					file = dojoPackageFolder.getFile(new Path(dialog.getClassName() + "ConfigurationParametersPane.js")); //$NON-NLS-1$
					openDefaultEditorForFile(file);
					
					file = packageFolder.getFile(new Path(dialog.getClassName() + ".java")); //$NON-NLS-1$
					openDefaultEditorForFile(file);
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}

		});
	}
}