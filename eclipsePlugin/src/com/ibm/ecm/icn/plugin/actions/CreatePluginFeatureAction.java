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
import java.io.File;
import java.io.FileInputStream;
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
import com.ibm.ecm.icn.plugin.dialogs.PluginFeatureDialog;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class CreatePluginFeatureAction extends PluginBaseActionDelegate {

	@Override
	protected PluginBasicDialog getDialog() {
		PluginBasicDialog dialog = new PluginFeatureDialog(PlatformUI.getWorkbench().getActiveWorkbenchWindow()
				.getShell(), getResource(), Messages.CreatePluginFeatureAction_DLG_Title,
				Messages.CreatePluginFeatureAction_DLG_Short_Direction);
		return dialog;
	}

	@Override
	protected void process(PluginBasicDialog xdialog) throws CoreException {
		final Display display = PlatformUI.getWorkbench().getDisplay();
		final PluginFeatureDialog dialog = (PluginFeatureDialog) xdialog;

		try {
			if (display.isDisposed()) {
				return;
			}
			IWorkspace workspace = ResourcesPlugin.getWorkspace();
			IWorkspaceRoot workspaceRoot = workspace.getRoot();

			// Create a feature Java package
			IPackageFragment packageFrag = getJavaProject().getPackageFragmentRoot(getSourceFolder())
					.createPackageFragment(dialog.getJavaPackage(), true, null);

			// Create feature Java file
			Map<String, String> map = new HashMap<String, String>();
			map.put("PackageName", dialog.getJavaPackage()); //$NON-NLS-1$
			map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
			map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
			String cssclass = dialog.getCSSName();
			if (dialog.getCSSName() == null || dialog.getCSSName().length() == 0) {
				cssclass = getPluginClassName() + "LaunchIcon"; //$NON-NLS-1$
			}
			map.put("CSSName", cssclass); //$NON-NLS-1$
			map.put("SVGFile", dialog.getSVGFile());
			String fileContents = getTemplateService().getContentAfterReplacingVariables(
					"/templates/plugin_feature/java-template.resource", map); //$NON-NLS-1$
			final IFolder packageFolder = workspaceRoot.getFolder(packageFrag.getPath());
			getTemplateService().saveFileContentsToFolder(packageFolder, new Path(dialog.getClassName() + ".java"), //$NON-NLS-1$
					new ByteArrayInputStream(fileContents.getBytes()), null);

			// Create feature java script file
			IPackageFragment dojoPackage = getJavaProject().getPackageFragmentRoot(getSourceFolder())
					.getPackageFragment(getTemplateService().getFullyQualifiedDojoPackage());
			final IFolder dojoPackageFolder = workspaceRoot.getFolder(dojoPackage.getPath());
			map.put("PackageName", getPluginPackageName()); //$NON-NLS-1$
			map.put("ClassName", dialog.getClassName()); //$NON-NLS-1$
			map.put("DojoModuleName", getDojoModuleName()); //$NON-NLS-1$
			fileContents = getTemplateService().getContentAfterReplacingVariables(
					"/templates/plugin_feature/js-template.resource", map); //$NON-NLS-1$
			getTemplateService().saveFileContentsToFolder(dojoPackageFolder, new Path(dialog.getClassName() + ".js"), //$NON-NLS-1$
					new ByteArrayInputStream(fileContents.getBytes()), null);

			// Create a feature HTML file
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
					"/templates/plugin_feature/html-template.resource", map); //$NON-NLS-1$
			getTemplateService().saveFileContentsToFolder(dojoTemplatePackageFolder,
					new Path(dialog.getClassName() + ".html"), new ByteArrayInputStream(fileContents.getBytes()), null); //$NON-NLS-1$
			
			// Add configuration pane JS
			fileContents = getTemplateService().getContentAfterReplacingVariables(
					"/templates/plugin_feature/FeatureConfigurationPane-template.js", map); //$NON-NLS-1$
			getTemplateService().saveFileContentsToFolder(dojoPackageFolder, new Path("FeatureConfigurationPane.js"), //$NON-NLS-1$
					new ByteArrayInputStream(fileContents.getBytes()), null);

			// Add configuration pane HTML
			getTemplateService().saveFileContentsToFolder(dojoTemplatePackageFolder, new Path("FeatureConfigurationPane.html"), //$NON-NLS-1$
					"/templates/plugin_feature/FeatureConfigurationPane-template.html", null); //$NON-NLS-1$

			if (dialog.getImageFile() != null) {
				// Copy image file
				IPackageFragment imagePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder())
						.getPackageFragment(getTemplateService().getFullyQualifiedImagesPackage());
				if (imagePackage == null || !imagePackage.exists()) {
					imagePackage = getJavaProject().getPackageFragmentRoot(getSourceFolder()).createPackageFragment(
							getTemplateService().getFullyQualifiedImagesPackage(), true, null);
				}

				final IFolder imagePackageFolder = workspaceRoot.getFolder(imagePackage.getPath());
				FileInputStream imageFileIS = new FileInputStream(dialog.getImageFile());
				File afile = new File(dialog.getImageFile());
				getTemplateService().saveFileContentsToFolder(imagePackageFolder, new Path(afile.getName()),
						imageFileIS, null);

				// Modify Plugin CSS file
				IPackageFragment webContentPackage = getJavaProject().getPackageFragmentRoot(getSourceFolder())
						.getPackageFragment(getTemplateService().getFullyQualifiedWebContentPackage());
				final IFolder webContentPackageFolder = workspaceRoot.getFolder(webContentPackage.getPath());
				IFile cssFile = webContentPackageFolder.getFile(new Path(getPluginClassName() + ".css")); //$NON-NLS-1$
				String cssContents = ""; //$NON-NLS-1$
				if (cssFile.exists()) {
					// get existing CSS file content
					cssContents = Utils.InputStream2String(cssFile.getContents());
				} else {
					// read in from template
					map.put("PluginPackageName", getPluginPackageName()); //$NON-NLS-1$
					map.put("PluginClassName", getPluginClassName()); //$NON-NLS-1$
					cssContents = getTemplateService().getContentAfterReplacingVariables(
							"/templates/base/css-template.resource", map); //$NON-NLS-1$
				}
				String cssSnippet = ""; //$NON-NLS-1$
				map.put("FeatureClassName", cssclass); //$NON-NLS-1$
				map.put("ImageFilePath", afile.getName()); //$NON-NLS-1$
				if (dialog.getSVGFile().isEmpty())
					map.put("BackgroundPosition", "");
				else
					map.put("BackgroundPosition", "background-position: -16px -16px;");
				cssSnippet = getTemplateService().getContentAfterReplacingVariables(
						"/templates/plugin_feature/css-snippet.resource", map); //$NON-NLS-1$
				cssContents = cssContents + Utils.newline + cssSnippet;
				getTemplateService().saveFileContentsToFolder(webContentPackageFolder,
						new Path(getPluginClassName() + ".css"), //$NON-NLS-1$
						new ByteArrayInputStream(cssContents.getBytes()), null);
			}
			if (display.isDisposed()) {
				return;
			}

			display.syncExec(new Runnable() {
				public void run() {
					try {
						String constCalls = getTemplateService().getPersistentProperty(getResource().getProject(),
								TemplateService.Top_features_QN);
						if (constCalls != null) {
							constCalls = constCalls + ", new " + dialog.getJavaPackage() + "." + dialog.getClassName() //$NON-NLS-1$ //$NON-NLS-2$
									+ "()"; //$NON-NLS-1$
						} else {
							constCalls = "new " + dialog.getJavaPackage() + "." + dialog.getClassName() + "()"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
						}
						updatePluginJavaClass("getFeatures", "/templates/plugin_feature/java-snippet.resource", //$NON-NLS-1$ //$NON-NLS-2$
								constCalls);

						getTemplateService().setPersistentProperty(getProject(), TemplateService.Top_features_QN,
								constCalls);

						IFile file = dojoTemplatePackageFolder.getFile(new Path(dialog.getClassName() + ".html")); //$NON-NLS-1$
						openDefaultEditorForFile(file);

						file = dojoPackageFolder.getFile(new Path(dialog.getClassName() + ".js")); //$NON-NLS-1$
						openDefaultEditorForFile(file);

						file = packageFolder.getFile(new Path(dialog.getClassName() + ".java")); //$NON-NLS-1$
						openDefaultEditorForFile(file);
					} catch (Exception ex) {
						ex.printStackTrace();
					}
				}

			});
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}

}