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

import java.lang.reflect.InvocationTargetException;
import java.net.URI;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExecutableExtension;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.ui.IEditorDescriptor;
import org.eclipse.ui.INewWizard;
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.actions.WorkspaceModifyOperation;
import org.eclipse.ui.dialogs.WizardNewProjectCreationPage;
import org.eclipse.ui.part.FileEditorInput;

import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ICNProjectNewWizard extends Wizard implements INewWizard, IExecutableExtension {

	private ICNProjectCreator creator;
	private IConfigurationElement config;
	private WizardNewProjectCreationPage projCreationWizardPage;
	private IProject project;
	private ICNProjectNewWizardPage projInfoWizardPage;
	private IWorkbench workbench;

	@Override
	public void addPages() {
		projCreationWizardPage = new WizardNewProjectCreationPage(
				Messages.ICNProjectNewWizard_WinzardPage_Title_PlufginProject);
		projCreationWizardPage.setDescription(Messages.ICNProjectNewWizard_WizardPage_Descr);
		projCreationWizardPage.setTitle(Messages.ICNProjectNewWizard_WizardPage_Title_PluginProject);
		addPage(projCreationWizardPage);

		projInfoWizardPage = new ICNProjectNewWizardPage(
				Messages.ICNProjectNewWizard_WizardPage_Title_PluginClassLibDependency);
		addPage(projInfoWizardPage);
	}

	@Override
	public boolean canFinish() {
		if (this.getContainer().getCurrentPage() == projCreationWizardPage) {
			return false;
		}
		return projInfoWizardPage.isPageComplete();
	}

	@Override
	public void init(IWorkbench workbench, IStructuredSelection selection) {
		this.workbench = workbench;
	}

	@Override
	public boolean performFinish() {
		if (project != null) {
			return true;
		}

		final IProject projectHandle = projCreationWizardPage.getProjectHandle();
		URI projectURI = (!projCreationWizardPage.useDefaults()) ? projCreationWizardPage.getLocationURI() : null;
		IWorkspace workspace = ResourcesPlugin.getWorkspace();

		final IProjectDescription desc = workspace.newProjectDescription(projectHandle.getName());
		desc.setLocationURI(projectURI);

		TemplateService templateService = new TemplateService(projectHandle);
		projInfoWizardPage.setProjectName(projectHandle.getName());
		creator = new ICNProjectCreator(templateService, projInfoWizardPage, true);
		try {
			WorkspaceModifyOperation op = new WorkspaceModifyOperation() {
				protected void execute(IProgressMonitor monitor) throws CoreException {
					creator.createProject(desc, projectHandle, monitor);
				}
			};
			getContainer().run(true, true, op);

			project = projectHandle;
			if (project == null) {
				return false;
			} else {
				// Perspective switch
				Utils.updatePerspective(config);
				Utils.selectAndReveal(project, workbench.getActiveWorkbenchWindow());

				IWorkspaceRoot workspaceRoot = workspace.getRoot();
				Path srcPath = new Path(project.getName() + "/src/" + projInfoWizardPage.getPluginPackageName()); //$NON-NLS-1$

				// Now we can create our Java project
				IJavaProject javaProject = JavaCore.create(project);
				IFolder sourceFolder = project.getFolder("src"); //$NON-NLS-1$
				IPackageFragment sourcePackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
						projInfoWizardPage.getPluginPackageName());

				System.out.println("***" + sourcePackage.getPath()); //$NON-NLS-1$
				final IFolder sourcePackageFolder = workspaceRoot.getFolder(sourcePackage.getPath());

				IFile file = sourcePackageFolder.getFile(new Path(projInfoWizardPage.getPluginClassName() + ".java")); //$NON-NLS-1$
				IEditorDescriptor editorDescr = PlatformUI.getWorkbench().getEditorRegistry()
						.getDefaultEditor(file.getName());
				try {
					PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage()
							.openEditor(new FileEditorInput(file), editorDescr.getId());
				} catch (PartInitException e) {
					e.printStackTrace();
				}
				return true;
			}
		} catch (InterruptedException e) {
			MessageDialog.openError(getShell(), Messages.ICNProjectNewWizard_MSGDLG_Title_Error,
					e.getLocalizedMessage());
			return false;
		} catch (InvocationTargetException e) {
			Throwable realException = e.getTargetException();
			MessageDialog.openError(getShell(), Messages.ICNProjectNewWizard_MSGDLG_Title_Error,
					realException.getLocalizedMessage());
			return false;
		}
	}

	@Override
	public void setInitializationData(IConfigurationElement config, String propertyName, Object data)
			throws CoreException {
		this.config = config;
	}

}
