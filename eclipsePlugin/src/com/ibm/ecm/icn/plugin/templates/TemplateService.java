package com.ibm.ecm.icn.plugin.templates;

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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.Map;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.QualifiedName;
import org.eclipse.core.runtime.Status;

import com.ibm.ecm.icn.plugin.Messages;

public class TemplateService {

	public final static String newline = System.getProperty("line.separator"); //$NON-NLS-1$

	public static QualifiedName Top_class_QN = new QualifiedName("className", "topClass"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_features_QN = new QualifiedName("features", "topFeatures"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_layouts_QN = new QualifiedName("layouts", "topLayouts"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_menus_QN = new QualifiedName("menus", "topMenus"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_menutypes_QN = new QualifiedName("menuTypes", "topMenutypes"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_actions_QN = new QualifiedName("actions", "topActions"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_openActions_QN = new QualifiedName("openActions", "topOpenActions"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_repositories_QN = new QualifiedName("repositories", "topRepositories"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_apis_QN = new QualifiedName("apis", "topApis"); //$NON-NLS-1$ //$NON-NLS-2$
	
	public static QualifiedName Top_reqFilters_QN = new QualifiedName("reqFilters", "topReqFilters"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_respFilters_QN = new QualifiedName("respFilters", "topRespFilters"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_services_QN = new QualifiedName("services", "topServices"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_viewers_QN = new QualifiedName("viewers", "topViewers"); //$NON-NLS-1$ //$NON-NLS-2$

	public static QualifiedName Top_name_QN = new QualifiedName("name", "topName"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_package_QN = new QualifiedName("package", "topPackage"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_version_QN = new QualifiedName("version", "topVersion"); //$NON-NLS-1$ //$NON-NLS-2$

	public static QualifiedName Top_package_webcontent_QN = new QualifiedName("webcontent", "webcontentPkg"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_package_dojo_QN = new QualifiedName("dojo", "dojoPkg"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_package_dojotemplates_QN = new QualifiedName("dojotemplates", "dojotemplatesPkg"); //$NON-NLS-1$ //$NON-NLS-2$
	public static QualifiedName Top_package_images_QN = new QualifiedName("images", "imagesPkg"); //$NON-NLS-1$ //$NON-NLS-2$

	private IProject project;
	private IWorkspace workspace;
	private IWorkspaceRoot workspaceRoot;

	public TemplateService(IProject project) {
		workspace = ResourcesPlugin.getWorkspace();
		workspaceRoot = workspace.getRoot();
		this.project = project;
	}

	public void copyResource(IPath source, IPath destination) {

	}

	public IFolder createFolderUnderProject(IPath path) throws CoreException {
		IFolder libFolder = project.getFolder(path);
		libFolder.create(false, true, null);
		return libFolder;
	}

	public IFolder createFolderUnderWorkspace(IPath fullPath) throws CoreException {
		IFolder libFolder = workspaceRoot.getFolder(fullPath);
		libFolder.create(false, true, null);
		return libFolder;
	}

	public String getContentAfterReplacingVariables(IFile sourceFile, Map<String, String> variableMappings)
			throws CoreException {
		String line = null;
		StringBuffer sb = new StringBuffer();
		boolean noMapping = (variableMappings == null ? true : false);
		try {
			InputStream input = sourceFile.getContents();
			BufferedReader reader = new BufferedReader(new InputStreamReader(input));
			try {
				while ((line = reader.readLine()) != null) {
					if (!noMapping) {
						Iterator<Map.Entry<String, String>> it = variableMappings.entrySet().iterator();
						while (it.hasNext()) {
							Map.Entry<String, String> pairs = (Map.Entry<String, String>) it.next();
							line = line.replaceAll("\\$\\{" + pairs.getKey() + "\\}", pairs.getValue()); //$NON-NLS-1$ //$NON-NLS-2$
						}
					}
					sb.append(line);
					sb.append(newline);
				}
				return sb.toString();
			} finally {
				reader.close();
			}
		} catch (IOException ioe) {
			IStatus status = new Status(IStatus.ERROR, "getContentAfterReplacingVariables", IStatus.OK, //$NON-NLS-1$
					ioe.getLocalizedMessage(), null);
			throw new CoreException(status);
		}
	}

	public String getContentAfterReplacingVariables(String projectRelPath, Map<String, String> variableMappings)
			throws CoreException {
		String line = null;
		StringBuffer sb = new StringBuffer();
		boolean noMapping = (variableMappings == null ? true : false);
		try {
			InputStream input = TemplateService.class.getResourceAsStream(projectRelPath);
			BufferedReader reader = new BufferedReader(new InputStreamReader(input));
			try {
				while ((line = reader.readLine()) != null) {
					if (!noMapping) {
						Iterator<Map.Entry<String, String>> it = variableMappings.entrySet().iterator();
						while (it.hasNext()) {
							Map.Entry<String, String> pairs = (Map.Entry<String, String>) it.next();
							line = line.replaceAll("\\$\\{" + pairs.getKey() + "\\}", pairs.getValue()); //$NON-NLS-1$ //$NON-NLS-2$
						}
					}
					sb.append(line);
					sb.append(newline);
				}
				return sb.toString();
			} finally {
				reader.close();
			}
		} catch (IOException ioe) {
			IStatus status = new Status(IStatus.ERROR, "getContentAfterReplacingVariables", IStatus.OK, //$NON-NLS-1$
					ioe.getLocalizedMessage(), null);
			throw new CoreException(status);
		}
	}

	public String getDojoModuleName() {
		String fq = getPersistentProperty(project, TemplateService.Top_package_dojo_QN);
		int fqLastIndex = fq.lastIndexOf("."); //$NON-NLS-1$
		return fq.substring(fqLastIndex + 1);
	}

	public String getDojoModuleTemplatesName() {
		String className = getPersistentProperty(project, TemplateService.Top_class_QN);
		return getDojoModuleName() + ".templates"; //$NON-NLS-1$
	}

	public IFile getFileFromWorkspace(IPath fullPath) {
		return workspaceRoot.getFile(fullPath);
	}

	public IFolder getFolderFromWorkspace(IPath fullPath) {
		return workspaceRoot.getFolder(fullPath);
	}

	public String getPersistentProperty(IResource res, QualifiedName qn) {
		try {
			return res.getPersistentProperty(qn);
		} catch (CoreException e) {
			return ""; //$NON-NLS-1$
		}
	}

	public String getPluginClassName() {
		return getPersistentProperty(project, TemplateService.Top_class_QN);
	}

	public String getPluginName() {
		return getPersistentProperty(project, TemplateService.Top_name_QN);
	}

	public String getPluginPackageName() {
		return getPersistentProperty(project.getProject(), TemplateService.Top_package_QN);
	}

	public String getPluginVersion() {
		return getPersistentProperty(project, TemplateService.Top_version_QN);
	}

	public String getFullyQualifiedDojoPackage() {
		return getPersistentProperty(project.getProject(), TemplateService.Top_package_dojo_QN);
	}

	public String getFullyQualifiedDojoTemplatesPackage() {
		return getPersistentProperty(project.getProject(), TemplateService.Top_package_dojotemplates_QN);
	}

	public String getFullyQualifiedImagesPackage() {
		return getPersistentProperty(project.getProject(), TemplateService.Top_package_images_QN);
	}

	public String getFullyQualifiedWebContentPackage() {
		return getPersistentProperty(project.getProject(), TemplateService.Top_package_webcontent_QN);
	}

	public void saveFileContentsToFile(IFile destinationFile, InputStream stream, IProgressMonitor monitor)
			throws CoreException {
		if (destinationFile.exists()) {
			destinationFile.setContents(stream, true, true, monitor);
		} else {
			destinationFile.create(stream, true, monitor);
		}
	}

	public void saveFileContentsToFolder(IFolder folder, IPath folderRelPath, InputStream stream,
			IProgressMonitor monitor) throws CoreException {
		IFile file = folder.getFile(folderRelPath);
		if (file.exists()) {
			file.setContents(stream, true, true, monitor);
		} else {
			file.create(stream, true, monitor);
		}
	}

	public void saveFileContentsToFolder(IFolder folder, IPath targetFilePath, IPath projectRelPath,
			IProgressMonitor monitor) throws CoreException {
		IFile file = project.getFile(projectRelPath);
		if (!file.exists()) {
			throw new RuntimeException(Messages.TemplateService_ERR_SomethingWrong);
		}
		saveFileContentsToFolder(folder, targetFilePath, file.getContents(), monitor);
	}

	public void saveFileContentsToFolder(IFolder folder, IPath targetFilePath, String projectRelPath,
			IProgressMonitor monitor) throws CoreException {
		InputStream stream = TemplateService.class.getResourceAsStream(projectRelPath);
		saveFileContentsToFolder(folder, targetFilePath, stream, monitor);
	}

	public void setPersistentProperty(IResource res, QualifiedName qn, String value) {
		try {
			res.setPersistentProperty(qn, value);
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}

}
