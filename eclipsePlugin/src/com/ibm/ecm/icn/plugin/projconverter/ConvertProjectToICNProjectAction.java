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

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.wizard.WizardDialog;
import org.eclipse.swt.custom.BusyIndicator;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.natures.ICNProjectNature;

public class ConvertProjectToICNProjectAction implements IObjectActionDelegate {

	private ISelection fSelection;

	@Override
	public void run(IAction action) {
		try {
			if (fSelection instanceof IStructuredSelection) {
				IProject project = null;
				if (isProjectConvertable(project = getSelectedProject((IStructuredSelection) fSelection))) {

					ConvertProjectToICNProjectWizard wizard = new ConvertProjectToICNProjectWizard(project);

					final Display display = Utils.getDisplay();
					final WizardDialog dialog = new WizardDialog(display.getActiveShell(), wizard);
					BusyIndicator.showWhile(display, new Runnable() {
						public void run() {
							dialog.open();
						}
					});
				} else {
					MessageDialog.openInformation(Utils.getDisplay().getActiveShell(),
							Messages.ConvertProjectToICNProjectAction_DLG_Ttile_Information,
							Messages.ConvertProjectToICNProjectAction_DLG_Text_Err_Msg_Can_Not_Convert);
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {
		fSelection = selection;
		try {
			if (isProjectConvertable(getSelectedProject((IStructuredSelection) fSelection))) {
				action.setEnabled(true);
			} else {
				action.setEnabled(false);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
		// TODO Auto-generated method stub

	}

	private boolean isProjectConvertable(IProject project) {
		try {
			if (project == null) {
				return false;
			}
			if (project.isOpen() && project.hasNature(JavaCore.NATURE_ID)
					&& !project.hasNature(ICNProjectNature.NATURE_ID)) {

				if (project.hasNature("org.eclipse.wst.common.project.facet.core.nature")) { //$NON-NLS-1$
					IFile file = project.getFile(new Path("WebContent")); //$NON-NLS-1$
					if (file.exists()) {
						return false;
					} else if (project.hasNature("org.eclipse.wst.common.modulecore.ModuleCoreNature")) { //$NON-NLS-1$
						return false;
					}
				}
				return true;
			} else {
				return false;
			}
		} catch (Exception ex) {
			return false;
		}
	}

	private IProject getSelectedProject(IStructuredSelection fSelection) {
		if (fSelection == null) {
			return null;
		}
		Object[] elems = fSelection.toArray();
		if (elems == null) {
			return null;
		}
		List<IProject> initialSelection = new ArrayList<IProject>(elems.length);
		IProject project = null;
		for (int i = 0; i < elems.length; i++) {
			Object elem = elems[i];

			if (elem instanceof IFile) {
				IFile file = (IFile) elem;
				project = file.getProject();
			} else if (elem instanceof IProject) {
				project = (IProject) elem;
			} else if (elem instanceof IJavaProject) {
				project = ((IJavaProject) elem).getProject();
			}
			if (project != null) {
				// initialSelection.add(project);
				break;
			}
		}
		return project;

	}

}
