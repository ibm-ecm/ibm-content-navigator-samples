package com.ibm.ecm.icn.plugin.projconverter;

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

import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jface.dialogs.ErrorDialog;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.wizard.Wizard;
import org.eclipse.ui.IEditorDescriptor;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.actions.WorkspaceModifyOperation;
import org.eclipse.ui.part.FileEditorInput;

import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.templates.TemplateService;
import com.ibm.ecm.icn.plugin.wizards.ICNProjectCreator;
import com.ibm.ecm.icn.plugin.wizards.ICNProjectNewWizardPage;

public class ConvertProjectToICNProjectWizard extends Wizard {

	private boolean hasNavigatorAPI;
	private boolean hasPluginClass;
	private ConvertProjectToICNProjectWizardPage3 projConverterPage;
	private ICNProjectNewWizardPage projInfoWizardPage;
	private String pluginClassName;
	private String pluginPackageName;
	private IProject selectedProject;

	public ConvertProjectToICNProjectWizard(IProject selected) {
		setWindowTitle(Messages.ConvertProjectToICNProjectWizard_Title);
		setNeedsProgressMonitor(true);
		this.selectedProject = selected;

		List<IType> pluginClasses = Utils.getSubclassesFor(selectedProject, "com.ibm.ecm.extension.Plugin"); //$NON-NLS-1$
		if (pluginClasses == null) {
			hasPluginClass = false;
			hasNavigatorAPI = false;
		} else if (pluginClasses.size() == 1) {
			hasPluginClass = true;
			hasNavigatorAPI = true;
			String fqn = pluginClasses.get(0).getFullyQualifiedName();
			int indexOfLastDot = fqn.lastIndexOf("."); //$NON-NLS-1$
			pluginPackageName = fqn.substring(0, indexOfLastDot);
			pluginClassName = fqn.substring(indexOfLastDot + 1);
		}
	}

	public void addPages() {
		// addPage(new ConvertProjectToICNProjectWizardPage1(this, "convertPage", selectedProject));
		if (hasNavigatorAPI && hasPluginClass) {
			projConverterPage = new ConvertProjectToICNProjectWizardPage3(this, "convertPage", selectedProject); //$NON-NLS-1$
			addPage(projConverterPage);
		} else {

			projInfoWizardPage = new ICNProjectNewWizardPage(
					Messages.ICNProjectNewWizard_WizardPage_Title_PluginClassLibDependency);
			addPage(projInfoWizardPage);
		}
	}

	protected String getPluginClassName() {
		return pluginClassName;
	}

	protected String getPluginPackageName() {
		return pluginPackageName;
	}

	protected IProject getSelectedProject() {
		return selectedProject;
	}

	protected boolean hasNavigatorAPI() {
		return hasNavigatorAPI;
	}

	protected boolean hasPluginClass() {
		return hasPluginClass;
	}

	public boolean performFinish() {
		if (projConverterPage != null) {
			WorkspaceModifyOperation op = new WorkspaceModifyOperation() {
				protected void execute(IProgressMonitor monitor) throws CoreException {
					// try {
					projConverterPage.finish();
					// } catch (Exception e) {
					// e.printStackTrace();
					// throw new CoreException(new Status(IStatus.ERROR, Activator.PLUGIN_ID, IStatus.OK,
					// "project conversion", e));
					// }
				}
			};
			try {
				getContainer().run(false, true, op);
				return true;
			} catch (InvocationTargetException e1) {
				Throwable tr = e1.getCause();
				if (tr instanceof CoreException) {
					CoreException ce = (CoreException) tr;
					StringWriter sw = new StringWriter();
					ce.printStackTrace(new PrintWriter(sw));
					String stacktrace = sw.toString();
					ErrorDialog.openError(getShell(), Messages.ConvertProjectToICNProjectWizard_Error_Title,
							ce.getLocalizedMessage(), ce.getStatus());
				} else {
					MessageDialog.openError(getShell(), Messages.ICNProjectNewWizard_MSGDLG_Title_Error,
							e1.getLocalizedMessage());
				}
				return false;
			} catch (InterruptedException e1) {
				MessageDialog.openError(getShell(), Messages.ICNProjectNewWizard_MSGDLG_Title_Error,
						e1.getLocalizedMessage());
				return false;
			}

		} else if (projInfoWizardPage != null) {
			final IWorkspace workspace = ResourcesPlugin.getWorkspace();
			TemplateService templateService = new TemplateService(selectedProject);
			projInfoWizardPage.setProjectName(selectedProject.getName());
			final ICNProjectCreator creator = new ICNProjectCreator(templateService, projInfoWizardPage, false);
			try {
				WorkspaceModifyOperation op = new WorkspaceModifyOperation() {
					protected void execute(IProgressMonitor monitor) throws CoreException {

						try {
							creator.createProject(selectedProject.getDescription(), selectedProject, monitor);

						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				};
				getContainer().run(false, true, op);

				IWorkspaceRoot workspaceRoot = workspace.getRoot();

				// Now we can create our Java project
				IJavaProject javaProject = JavaCore.create(selectedProject);
				IFolder sourceFolder = selectedProject.getFolder("src"); //$NON-NLS-1$
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

			} catch (Exception e) {
				e.printStackTrace();
				MessageDialog.openError(getShell(), Messages.ICNProjectNewWizard_MSGDLG_Title_Error,
						e.getLocalizedMessage());
				return true;
			}
		}
		return false;
	}

}
