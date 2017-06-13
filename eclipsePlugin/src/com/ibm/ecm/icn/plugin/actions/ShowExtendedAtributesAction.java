package com.ibm.ecm.icn.plugin.actions;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.PlatformUI;

import com.ibm.ecm.icn.plugin.dialogs.ExtendedAttributesDialog;

public class ShowExtendedAtributesAction implements IObjectActionDelegate {

	private ISelection fSelection;

	@Override
	public void run(IAction action) {
		try {
			IProject proj = getSelectedProject((IStructuredSelection) fSelection);
			if (proj != null) {
				ExtendedAttributesDialog dlg = new ExtendedAttributesDialog(PlatformUI.getWorkbench()
						.getActiveWorkbenchWindow().getShell(), proj);
				dlg.create();
				dlg.open();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void selectionChanged(IAction action, ISelection selection) {
		fSelection = selection;
	}

	@Override
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
		// TODO Auto-generated method stub

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
