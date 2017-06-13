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

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.custom.BusyIndicator;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IEditorDescriptor;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.actions.ActionDelegate;
import org.eclipse.ui.part.FileEditorInput;

import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.dialogs.PluginBasicDialog;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public abstract class PluginBaseActionDelegate extends ActionDelegate implements IObjectActionDelegate {

	private IJavaProject javaProject;
	private IProject project;
	private IResource resource;
	private IFolder sourceFolder;
	private TemplateService templateService;

	protected abstract PluginBasicDialog getDialog();

	protected String getDojoModuleName() {
		return templateService.getDojoModuleName();
	}

	protected String getDojoModuleTemplatesName() {
		return templateService.getDojoModuleTemplatesName();
	}

	protected IJavaProject getJavaProject() {
		return javaProject;
	}

	protected String getPluginClassName() {
		return templateService.getPluginClassName();
	}

	protected String getPluginName() {
		return templateService.getPluginName();
	}

	protected String getPluginPackageName() {
		return templateService.getPluginPackageName();
	}

	protected String getPluginVersion() {
		return templateService.getPluginVersion();
	}

	protected IProject getProject() {
		return project;
	}

	protected IResource getResource() {
		return resource;
	}

	protected IFolder getSourceFolder() {
		return sourceFolder;
	}

	protected TemplateService getTemplateService() {
		return templateService;
	}

	public void openDefaultEditorForFile(IFile file) throws PartInitException {
		IEditorDescriptor desc = PlatformUI.getWorkbench().getEditorRegistry().getDefaultEditor(file.getName());
		PlatformUI.getWorkbench().getActiveWorkbenchWindow().getActivePage()
				.openEditor(new FileEditorInput(file), desc.getId());
	}

	protected abstract void process(PluginBasicDialog dialog) throws CoreException;

	protected void processWitBusyIndicator(final PluginBasicDialog dialog) throws CoreException {
		final Display display = PlatformUI.getWorkbench().getDisplay();
		final Shell shell = PlatformUI.getWorkbench().getActiveWorkbenchWindow().getShell();

		Runnable longJob = new Runnable() {
			volatile boolean done = false;

			public void run() {
				Thread thread = new Thread(new Runnable() {
					public void run() {
						try {
							if (display.isDisposed()) {
								return;
							}
							process(dialog);
						} catch (Exception ex) {
							StringWriter sw = new StringWriter();
							ex.printStackTrace(new PrintWriter(sw));
							MessageDialog.openError(shell, Messages.PluginBaseActionDelegate_Title_Error, sw.toString());
						} finally {
							done = true;
							display.wake();
						}
					}
				});
				thread.start();
				while (!done && !shell.isDisposed()) {
					if (!display.readAndDispatch())
						display.sleep();
				}
			}
		};
		BusyIndicator.showWhile(display, longJob);
	}

	public void run(IAction action) {
		project = resource.getProject();

		// Call subclass...
		PluginBasicDialog dialog = getDialog();

		dialog.create();
		if (dialog.open() == Window.OK) {
			if (resource != null) {
				templateService = new TemplateService(resource.getProject());

				try {
					javaProject = JavaCore.create(resource.getProject());
					sourceFolder = resource.getProject().getFolder("src"); //$NON-NLS-1$

					// Call process routine...
					processWitBusyIndicator(dialog);

				} catch (CoreException e) {
					StringWriter sw = new StringWriter();
					e.printStackTrace(new PrintWriter(sw));
					String stackTrace = sw.toString();
					MessageDialog.openError(PlatformUI.getWorkbench().getActiveWorkbenchWindow().getShell(),
							Messages.PluginBaseActionDelegate_Title_Error, stackTrace);
				}
			}
		}
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {
		resource = (IResource) ((StructuredSelection) selection).getFirstElement();
	}

	@Override
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
	}

	protected void updatePluginJavaClass(String methodName, String javaSnippetTemplatePath, String constCalls)
			throws CoreException, JavaModelException {
		String javaSnippet = ""; //$NON-NLS-1$
		Map<String, String> map = new HashMap<String, String>();
		map.put("ConstructorCalls", constCalls); //$NON-NLS-1$
		javaSnippet = getTemplateService().getContentAfterReplacingVariables(javaSnippetTemplatePath, map);

		System.out.println("getPluginPackageName()++>" + getPluginPackageName()); //$NON-NLS-1$
		System.out.println("getPluginClassName()++>" + getPluginClassName()); //$NON-NLS-1$
		System.out.println("methodName++>" + methodName); //$NON-NLS-1$
		System.out.println("javaSnippet++" + javaSnippet); //$NON-NLS-1$

		ICompilationUnit unit = Utils.getPluginClass(getJavaProject(), getPluginPackageName(), getPluginClassName());
		Utils.removeMethod(unit, methodName);
		Utils.addMethod(unit, methodName, javaSnippet);
		// Utils.formatUnitSourceCode(unit, null);
	}

}