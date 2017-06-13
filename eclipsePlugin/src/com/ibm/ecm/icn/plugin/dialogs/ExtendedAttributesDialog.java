package com.ibm.ecm.icn.plugin.dialogs;

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

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.forms.FormDialog;
import org.eclipse.ui.forms.IManagedForm;
import org.eclipse.ui.forms.events.ExpansionAdapter;
import org.eclipse.ui.forms.events.ExpansionEvent;
import org.eclipse.ui.forms.widgets.ExpandableComposite;
import org.eclipse.ui.forms.widgets.FormToolkit;
import org.eclipse.ui.forms.widgets.ScrolledForm;

import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ExtendedAttributesDialog extends FormDialog {
	IProject proj;

	public ExtendedAttributesDialog(Shell shell, IProject project) {
		super(shell);
		proj = project;
	}

	@Override
	public boolean isHelpAvailable() {
		return false;
	}

	@Override
	protected void createFormContent(IManagedForm managedForm) {
		try {
			final ScrolledForm form = managedForm.getForm();
			final FormToolkit toolkit = managedForm.getToolkit();
			GridLayout layout = new GridLayout(2, false);
			form.getBody().setLayout(layout);

			ExpandableComposite ec = toolkit.createExpandableComposite(form.getBody(), ExpandableComposite.TREE_NODE
					| ExpandableComposite.CLIENT_INDENT | ExpandableComposite.EXPANDED);
			ec.setText("Basic Information"); //$NON-NLS-1$

			Composite sectionClient = toolkit.createComposite(ec);
			sectionClient.setLayout(new GridLayout(2, false));

			ec.setClient(sectionClient);
			GridData gridData = new GridData();
			gridData.widthHint = 500;
			gridData.horizontalSpan = 2;
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			ec.setLayoutData(gridData);
			ec.addExpansionListener(new ExpansionAdapter() {
				public void expansionStateChanged(ExpansionEvent e) {
					form.reflow(true);
				}
			});

			Label label = toolkit.createLabel(sectionClient, "Top_name_QN: "); //$NON-NLS-1$
			Text text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_name_QN)); //$NON-NLS-1$

			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_package_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_package_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_class_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_class_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_version_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_version_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			//

			ec = toolkit.createExpandableComposite(form.getBody(), ExpandableComposite.TREE_NODE
					| ExpandableComposite.CLIENT_INDENT | ExpandableComposite.EXPANDED);
			ec.setText("Package Information"); //$NON-NLS-1$

			sectionClient = toolkit.createComposite(ec);
			sectionClient.setLayout(new GridLayout(1, true));

			ec.setClient(sectionClient);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.horizontalSpan = 2;
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			ec.setLayoutData(gridData);
			ec.addExpansionListener(new ExpansionAdapter() {
				public void expansionStateChanged(ExpansionEvent e) {
					form.reflow(true);
				}
			});

			label = toolkit.createLabel(sectionClient, "Top_package_webcontent_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_package_webcontent_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_package_images_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_package_images_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_package_dojo_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_package_dojo_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_package_dojotemplates_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_package_dojotemplates_QN)); //$NON-NLS-1$
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			text.setLayoutData(gridData);

			//

			ec = toolkit.createExpandableComposite(form.getBody(), ExpandableComposite.TREE_NODE
					| ExpandableComposite.CLIENT_INDENT);
			ec.setText("Add-on Extensions Information"); //$NON-NLS-1$

			sectionClient = toolkit.createComposite(ec);
			sectionClient.setLayout(new GridLayout(1, false));

			ec.setClient(sectionClient);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			ec.setLayoutData(gridData);
			ec.addExpansionListener(new ExpansionAdapter() {
				public void expansionStateChanged(ExpansionEvent e) {
					form.reflow(true);
				}
			});

			label = toolkit.createLabel(sectionClient, "Top_features_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_features_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);

			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.horizontalAlignment = SWT.FILL;
			gridData.grabExcessHorizontalSpace = true;
			gridData.heightHint = 40;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_layouts_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_layouts_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_menus_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_menus_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_menutypes_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_menutypes_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_actions_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_actions_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_openActions_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_openActions_QN), SWT.MULTI | SWT.BORDER //$NON-NLS-1$
							| SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_viewers_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_viewers_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_reqFilters_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_reqFilters_QN), SWT.MULTI | SWT.BORDER //$NON-NLS-1$
							| SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.heightHint = 40;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_respFilters_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient,
					"" + proj.getPersistentProperty(TemplateService.Top_respFilters_QN), SWT.MULTI | SWT.BORDER //$NON-NLS-1$
							| SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.widthHint = 500;
			gridData.grabExcessHorizontalSpace = true;
			gridData.horizontalAlignment = SWT.FILL;
			gridData.heightHint = 40;
			text.setLayoutData(gridData);

			label = toolkit.createLabel(sectionClient, "Top_services_QN: "); //$NON-NLS-1$
			text = toolkit.createText(sectionClient, "" + proj.getPersistentProperty(TemplateService.Top_services_QN), //$NON-NLS-1$
					SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
			gridData = new GridData();
			gridData.horizontalAlignment = SWT.FILL;
			gridData.widthHint = 500;
			gridData.grabExcessHorizontalSpace = true;
			gridData.heightHint = 40;
			text.setLayoutData(gridData);
			
		} catch (CoreException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}

}
