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

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.QualifiedName;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.jface.resource.JFaceResources;
import org.eclipse.jface.wizard.WizardPage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.forms.FormColors;
import org.eclipse.ui.forms.events.ExpansionAdapter;
import org.eclipse.ui.forms.events.ExpansionEvent;
import org.eclipse.ui.forms.events.HyperlinkAdapter;
import org.eclipse.ui.forms.events.HyperlinkEvent;
import org.eclipse.ui.forms.widgets.ExpandableComposite;
import org.eclipse.ui.forms.widgets.FormText;
import org.eclipse.ui.forms.widgets.FormToolkit;
import org.eclipse.ui.forms.widgets.ScrolledForm;
import org.eclipse.ui.forms.widgets.Section;

import com.ibm.ecm.icn.plugin.Activator;
import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.natures.ICNProjectNature;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ConvertProjectToICNProjectWizardPage2 extends WizardPage implements Listener {

	// private Button btnUseDefaultPackages;
	private Button btnGenerateBuildXML;
	private Button btnGenerateConfigurationTemplates;
	private Button btnGenerateManifest;
	private Button btnGenerateWebContents;

	private IPackageFragment dojoPackage;
	private IPackageFragment dojoTemplatesPackage;
	private ScrolledForm form;
	private IPackageFragment imagePackage;
	private String pathNavigatorAPI_Jar;
	private IProject projectToConvert;
	private IPackageFragment sourcePackage;
	private TemplateService templateService;
	private FormToolkit toolkit;
	private Text txtDojoPackage;
	private Text txtWebContentPackage;
	private IPackageFragment webContentPackage;
	private ConvertProjectToICNProjectWizard wizard;
	// private boolean useDefaultPackages;
	private boolean generateBuildXML;
	private boolean generateConfigurationTemplates;
	private boolean generateManifest;
	private boolean generateWebContents;
	private String dojoPackageQN;
	private String webContentPackageQN;
	Image orginalImage;

	public ConvertProjectToICNProjectWizardPage2(ConvertProjectToICNProjectWizard convertProjectToICNProjectWizard,
			String pageName, IProject project) {
		super(pageName);
		setTitle(Messages.ConvertProjectToICNProjectWizardPage2_Title_Part_Convert + project.getName()
				+ Messages.ConvertProjectToICNProjectWizardPage2_Title_Part2_Convert);
		setDescription(Messages.ConvertProjectToICNProjectWizardPage2_Description);
		this.wizard = convertProjectToICNProjectWizard;
		this.projectToConvert = project;
		templateService = new TemplateService(projectToConvert);
	}

	@Override
	public boolean canFlipToNextPage() {
		return false;
	}

	@Override
	public void dispose() {
		// TODO Auto-generated method stub
		super.dispose();
		if (orginalImage != null) {
			orginalImage.dispose();
		}
	}

	@Override
	public void createControl(Composite parent) {
		GridLayout layout = null;

		parent.setLayout(new FillLayout());
		// parent.setLayout(layout=new GridLayout(1,false));
		// layout.marginBottom=layout.marginHeight=layout.marginLeft=layout.marginTop=0;

		// Main UI
		toolkit = new FormToolkit(parent.getDisplay());
		form = toolkit.createScrolledForm(parent);
		form.setText(Messages.ConvertProjectToICNProjectWizardPage2_Title_Project + projectToConvert.getName()
				+ Messages.ConvertProjectToICNProjectWizardPage2_Title_Information);
		ImageDescriptor imageDescriptor = Activator.getImageDescriptor("icons/icnIcon.png"); //$NON-NLS-1$
		orginalImage = imageDescriptor.createImage();
		form.setImage(orginalImage);

		layout = new GridLayout(2, false);

		form.getBody().setLayout(layout);

		Composite separator = toolkit.createCompositeSeparator(form.getBody());
		GridData gridData = new GridData();
		gridData.heightHint = 2;
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		separator.setLayoutData(gridData);

		StringBuffer buf = new StringBuffer();
		List<IType> subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.Plugin"); //$NON-NLS-1$
		if (subclasses.size() == 1) {
			buf.append("<form>"); //$NON-NLS-1$
			buf.append(Messages.ConvertProjectToICNProjectWizardPage2_Form_Text_1);
			buf.append("</form>"); //$NON-NLS-1$
		} else {
			buf.append("<form>"); //$NON-NLS-1$
			buf.append(Messages.ConvertProjectToICNProjectWizardPage2_Form_Text_2);
			buf.append("</form>"); //$NON-NLS-1$
		}

		FormText rtext = toolkit.createFormText(form.getBody(), true);
		rtext.setWhitespaceNormalized(true);
		rtext.setColor("header", toolkit.getColors().getColor(FormColors.TITLE)); //$NON-NLS-1$
		rtext.setFont("header", JFaceResources.getHeaderFont()); //$NON-NLS-1$
		rtext.setFont("code", JFaceResources.getTextFont()); //$NON-NLS-1$
		rtext.setText(buf.toString(), true, false);
		rtext.addHyperlinkListener(new HyperlinkAdapter() {
			public void linkActivated(HyperlinkEvent e) {
				System.out.println("href=>" + e.getHref()); //$NON-NLS-1$
			}
		});
		rtext.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_INFO_BACKGROUND));

		gridData = new GridData();
		gridData.widthHint = 500;
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		rtext.setLayoutData(gridData);

		separator = toolkit.createCompositeSeparator(form.getBody());
		gridData = new GridData();
		gridData.heightHint = 2;
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		separator.setLayoutData(gridData);

		ExpandableComposite ec = toolkit.createExpandableComposite(form.getBody(), ExpandableComposite.TREE_NODE
				| ExpandableComposite.CLIENT_INDENT | ExpandableComposite.EXPANDED);
		ec.setText(Messages.ConvertProjectToICNProjectWizardPage2_SectionTitle_GenerationOptions);
		Composite sectionClient = toolkit.createComposite(ec);
		sectionClient.setLayout(new GridLayout(2, false));

		btnGenerateBuildXML = toolkit.createButton(sectionClient,
				Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateBuildFile, SWT.CHECK);
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateBuildXML.setLayoutData(gridData);
		btnGenerateBuildXML.setSelection(false);
		generateBuildXML = false;
		btnGenerateBuildXML.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetSelected(SelectionEvent e) {
				generateBuildXML = btnGenerateBuildXML.getSelection();
			}

			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateBuildXML = btnGenerateBuildXML.getSelection();
			}
		});

		btnGenerateManifest = toolkit.createButton(sectionClient,
				Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateManifest, SWT.CHECK);
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateManifest.setLayoutData(gridData);
		btnGenerateManifest.setSelection(false);
		generateManifest = false;
		btnGenerateManifest.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetSelected(SelectionEvent e) {
				generateManifest = btnGenerateManifest.getSelection();
			}

			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateManifest = btnGenerateManifest.getSelection();
			}
		});

		btnGenerateWebContents = toolkit.createButton(sectionClient,
				Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateWebContent, SWT.CHECK);
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateWebContents.setLayoutData(gridData);
		btnGenerateWebContents.setSelection(false);
		generateWebContents = false;
		btnGenerateWebContents.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetSelected(SelectionEvent e) {
				generateWebContents = btnGenerateWebContents.getSelection();
			}

			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateWebContents = btnGenerateWebContents.getSelection();
			}
		});

		btnGenerateConfigurationTemplates = toolkit.createButton(sectionClient,
				Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateConfig, SWT.CHECK);
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateConfigurationTemplates.setLayoutData(gridData);
		btnGenerateConfigurationTemplates.setSelection(false);
		generateConfigurationTemplates = false;
		btnGenerateConfigurationTemplates.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetSelected(SelectionEvent e) {
				generateConfigurationTemplates = btnGenerateConfigurationTemplates.getSelection();
			}

			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateConfigurationTemplates = btnGenerateConfigurationTemplates.getSelection();
			}
		});

		// btnUseDefaultPackages = toolkit.createButton(sectionClient, "Generate default packages", SWT.CHECK);
		Label label = toolkit.createLabel(sectionClient,
				Messages.ConvertProjectToICNProjectWizardPage2_Label_PackagesNames);
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		label.setLayoutData(gridData);

		label = toolkit.createLabel(sectionClient,
				Messages.ConvertProjectToICNProjectWizardPage2_Label_WebContentPackage);
		txtWebContentPackage = toolkit.createText(sectionClient, ""); //$NON-NLS-1$
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		txtWebContentPackage.setLayoutData(gridData);
		txtWebContentPackage.setText(wizard.getPluginPackageName() + ".WebContent"); //$NON-NLS-1$
		txtWebContentPackage.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				webContentPackageQN = txtWebContentPackage.getText();
			}
		});

		label = toolkit.createLabel(sectionClient, Messages.ConvertProjectToICNProjectWizardPage2_Label_DojoPackage);
		txtDojoPackage = toolkit.createText(sectionClient, ""); //$NON-NLS-1$
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		txtDojoPackage.setLayoutData(gridData);
		txtDojoPackage.setText(wizard.getPluginPackageName() + ".WebContent." //$NON-NLS-1$
				+ Utils.asLowerCaseFirstChar(wizard.getPluginClassName()) + "Dojo"); //$NON-NLS-1$
		txtDojoPackage.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				dojoPackageQN = txtDojoPackage.getText();
			}
		});

		// txtWebContentPackage.setEditable(false);
		// txtWebContentPackage.setEnabled(false);
		// txtDojoPackage.setEditable(false);
		// txtDojoPackage.setEnabled(false);

		webContentPackageQN = txtWebContentPackage.getText();
		dojoPackageQN = txtDojoPackage.getText();

		ec.setClient(sectionClient);
		gridData = new GridData();
		gridData.widthHint = 500;
		// gridData.heightHint=500;
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		ec.setLayoutData(gridData);
		ec.addExpansionListener(new ExpansionAdapter() {
			public void expansionStateChanged(ExpansionEvent e) {
				form.reflow(true);
			}
		});

		// toolkit.createLabel(form.getBody(), "Plugin Class: ");
		//Label text = toolkit.createLabel(form.getBody(), ""); //$NON-NLS-1$

		// List<IType> subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.Plugin");
		// pluginClass = createTextFieldInfo(form.getBody(), "Plugin Class:", subclasses, TemplateService.Top_class_QN);
		// text.setText(subclasses.get(0).getFullyQualifiedName());
		// gridData = new GridData();
		// gridData.horizontalAlignment = SWT.FILL;
		// gridData.grabExcessHorizontalSpace = true;
		// text.setLayoutData(gridData);

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginFeature"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Features,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_Features,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_Features, subclasses,
					TemplateService.Top_features_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginService"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Services,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_Services,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_Services, subclasses,
					TemplateService.Top_services_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginRequestFilter"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_ReqFilters,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_ReqFilters,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_ReqFilters, subclasses,
					TemplateService.Top_reqFilters_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginResponseFilter"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_RespFilters,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_RespFilters,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_RespFilters, subclasses,
					TemplateService.Top_respFilters_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginAction"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Action,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_Action,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_Action, subclasses,
					TemplateService.Top_actions_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginOpenAction"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_OpenAction,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_OpenAction,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_OpenAction, subclasses,
					TemplateService.Top_openActions_QN);
		}
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginLayout"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Layouts,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_Layouts,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_Layouts, subclasses,
					TemplateService.Top_layouts_QN);

		}
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginMenu"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Menus,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_Menus,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_Menus, subclasses,
					TemplateService.Top_menus_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginMenuType"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_MenuTypes,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_MenuTypes,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_MenuTypes, subclasses,
					TemplateService.Top_menutypes_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginViewerDef"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(form.getBody(), Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_ViewDef,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Descr_ViewDef,
					Messages.ConvertProjectToICNProjectWizardPage2_CTF_Prompt_ViewDef, subclasses,
					TemplateService.Top_viewers_QN);
		}

		// End of main UI

		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_package_QN,
				wizard.getPluginPackageName());
		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_class_QN,
				wizard.getPluginClassName());
		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_name_QN,
				wizard.getPluginClassName());

		toolkit.paintBordersFor(form.getBody());
		setControl(form.getBody());
	}

	private final void createTextFieldInfo(Composite composite, String sectionLabel, String sectionDescr, String label,
			List<IType> types, QualifiedName qn) {
		createTextFieldInfo(composite, sectionLabel, sectionDescr, label, types, qn, false);
	}

	private final void createTextFieldInfo(Composite composite, String sectionLabel, String sectionDescr, String label,
			List<IType> types, QualifiedName qn, boolean sectionExpand) {
		int sectionStyle;
		if (sectionExpand) {
			sectionStyle = Section.DESCRIPTION | Section.TWISTIE | Section.TITLE_BAR | Section.EXPANDED
					| Section.CLIENT_INDENT;
		} else {
			sectionStyle = Section.DESCRIPTION | Section.TWISTIE | Section.TITLE_BAR | Section.CLIENT_INDENT;
		}
		Section section = toolkit.createSection(form.getBody(), sectionStyle);
		GridData gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		section.setLayoutData(gridData);

		section.addExpansionListener(new ExpansionAdapter() {
			public void expansionStateChanged(ExpansionEvent e) {
				form.reflow(true);
			}
		});

		section.setText(sectionDescr);
		section.setDescription(Messages.ConvertProjectToICNProjectWizardPage2_Section_Descr_We_Found + types.size()
				+ Messages.ConvertProjectToICNProjectWizardPage2_Section_Descr_Space + sectionLabel
				+ Messages.ConvertProjectToICNProjectWizardPage2_Section_Descr_Subclasses);
		Composite sectionClient = toolkit.createComposite(section);
		sectionClient.setLayout(new GridLayout());

		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		sectionClient.setLayoutData(gridData);

		/*
		 * StringBuffer buf = new StringBuffer(); //buf.append("<p>List of "+label+"</p><ul>"); buf.append("<ul>"); if
		 * (types != null && types.size() > 0) { for (IType type : types) {
		 * buf.append("<li>"+type.getFullyQualifiedName()+"</li>"); } } buf.append("</ul>"); FormText rtext =
		 * toolkit.createFormText(sectionClient, true); rtext.setWhitespaceNormalized(true);
		 * 
		 * 
		 * // classText.addModifyListener(new FileFieldListener()); // layout text field for test session name gridData
		 * = new GridData(); gridData.horizontalAlignment = SWT.FILL;
		 * 
		 * // gridData.widthHint = 360; // gridData.heightHint = 40; rtext.setLayoutData(gridData);
		 * rtext.setFont("header", JFaceResources.getHeaderFont()); //$NON-NLS-1$ rtext.setFont("code",
		 * JFaceResources.getTextFont()); //$NON-NLS-1$ rtext.setText(buf.toString(), true, false);
		 */
		Table table = toolkit.createTable(sectionClient, SWT.BORDER | SWT.V_SCROLL | SWT.H_SCROLL);
		if (types != null && types.size() > 0) {
			for (IType type : types) {
				TableItem item = new TableItem(table, 0);
				item.setText(type.getFullyQualifiedName());
			}
		}
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		table.setLayoutData(gridData);

		String content = ""; //$NON-NLS-1$
		if (types != null && types.size() > 0) {
			content = Utils.getCommaSeparatedList(types);
		}
		section.setClient(sectionClient);

		templateService.setPersistentProperty(projectToConvert, qn, Utils.makeConstCalls(content));
	}

	public boolean finish() throws CoreException {
		try {
			// Update the nature - Do this at the end
			// Utils.addNatureToProject(projectToConvert, ICNProjectNature.NATURE_ID, null);

			// Save some basic extended attributes such as the package name of the main plugin, the plugin class name,
			// etc..
			templateService.setPersistentProperty(projectToConvert, TemplateService.Top_package_QN,
					wizard.getPluginPackageName());
			templateService.setPersistentProperty(projectToConvert, TemplateService.Top_class_QN,
					wizard.getPluginClassName());
			templateService.setPersistentProperty(projectToConvert, TemplateService.Top_name_QN,
					wizard.getPluginClassName());

			Utils.setFullyQuailifiedMainPackages(templateService, projectToConvert, webContentPackageQN, dojoPackageQN,
					dojoPackageQN + ".templates", webContentPackageQN + ".images"); //$NON-NLS-1$ //$NON-NLS-2$

			// Get Java project
			IJavaProject javaProject = JavaCore.create(projectToConvert);

			// Check all folders or packages
			IFolder sourceFolder = projectToConvert.getFolder("src"); //$NON-NLS-1$
			String packageName = wizard.getPluginPackageName();

			webContentPackage = javaProject.getPackageFragmentRoot(sourceFolder)
					.getPackageFragment(webContentPackageQN);
			if (webContentPackage == null || !webContentPackage.exists()) {
				webContentPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
						webContentPackageQN, true, null);
			}

			// imagePackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
			//		webContentPackageQN + "images"); //$NON-NLS-1$
			// if (imagePackage == null || !imagePackage.exists()) {
			// imagePackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
			//		webContentPackageQN + ".images", true, null); //$NON-NLS-1$
			// }

			dojoPackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(dojoPackageQN);
			if (dojoPackage == null || !dojoPackage.exists()) {
				try {
					dojoPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(dojoPackageQN,
							true, null);
				} catch (CoreException ce) {
					// Java Model Exception: Core Exception [code 275] A resource exists with a different case:
					// '/afpViewerPlugin4/src/com/ibm/ecm/extension/afpViewer/WebContent/afpViewerPluginDojo'.
					if (ce.getStatus().getCode() == 275) {
						System.out.println(ce.getLocalizedMessage());
					}
					throw ce;
				}
			}
			if (generateConfigurationTemplates) {
				dojoTemplatesPackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
						dojoPackageQN + ".templates"); //$NON-NLS-1$
				if (dojoTemplatesPackage == null || !dojoTemplatesPackage.exists()) {
					dojoTemplatesPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
							dojoPackageQN + ".templates", true, null); //$NON-NLS-1$
				}
			}

			// Library class paths
			loadClasspathEntries(projectToConvert, null);

			// Build xml
			if (generateBuildXML) {
				IFile buildFile = projectToConvert.getFile("build.xml"); //$NON-NLS-1$
				if (!buildFile.exists()) {
					String newlibraryPath = pathNavigatorAPI_Jar.replaceAll("\\\\", "/"); //$NON-NLS-1$ //$NON-NLS-2$
					Map<String, String> map = new HashMap<String, String>();
					map.put("ProjectName", projectToConvert.getName()); //$NON-NLS-1$
					map.put("navigatorAPI.jar", newlibraryPath); //$NON-NLS-1$
					map.put("PackageName", wizard.getPluginPackageName()); //$NON-NLS-1$
					map.put("ClassName", wizard.getPluginClassName()); //$NON-NLS-1$

					String fileContents = templateService.getContentAfterReplacingVariables(
							"/templates/base/build.xml", map); //$NON-NLS-1$
					templateService.saveFileContentsToFile(buildFile,
							new ByteArrayInputStream(fileContents.getBytes()), null);
				}
			}

			if (generateManifest) {
				// Add Manifest file
				IFolder mfFolder = projectToConvert.getFolder(new Path("META-INF")); //$NON-NLS-1$
				if (!mfFolder.exists()) {
					mfFolder = templateService.createFolderUnderProject(new Path("META-INF")); //$NON-NLS-1$
					Map<String, String> map = new HashMap<String, String>();
					map.put("PackageName", wizard.getPluginPackageName()); //$NON-NLS-1$
					map.put("ClassName", wizard.getPluginClassName()); //$NON-NLS-1$
					String fileContents = templateService.getContentAfterReplacingVariables(
							"/templates/base/MANIFEST.MF", map); //$NON-NLS-1$
					templateService.saveFileContentsToFolder(mfFolder,
							new Path("MANIFEST.MF"), new ByteArrayInputStream( //$NON-NLS-1$
									fileContents.getBytes()), null);
				}
			}

			IFolder libDir = projectToConvert.getFolder(new Path("lib")); //$NON-NLS-1$
			if (!libDir.exists()) {
				// Set up Library folder by copying j2ee.jar
				libDir = templateService.createFolderUnderProject(new Path("lib")); //$NON-NLS-1$
				templateService
						.saveFileContentsToFolder(libDir, new Path("j2ee.jar"), "/templates/base/j2ee.jar", null); //$NON-NLS-1$ //$NON-NLS-2$
			}
			IFile file = null;
			if (generateWebContents) {
				// Copy java script and css to the web content directory
				IFolder webContentFolder = templateService.getFolderFromWorkspace(webContentPackage.getPath());
				file = webContentFolder.getFile(new Path(wizard.getPluginClassName() + ".css")); //$NON-NLS-1$
				if (!file.exists()) {
					templateService.saveFileContentsToFolder(webContentFolder, new Path(wizard.getPluginClassName()
							+ ".css"), "/templates/base/css-template.resource", null); //$NON-NLS-1$ //$NON-NLS-2$
				}
				file = webContentFolder.getFile(new Path(wizard.getPluginClassName() + ".js")); //$NON-NLS-1$
				if (!file.exists()) {
					Map<String, String> map = new HashMap<String, String>();
					String fileContents = templateService.getContentAfterReplacingVariables(
							"/templates/base/js-template.resource", map); //$NON-NLS-1$
					templateService.saveFileContentsToFolder(webContentFolder, new Path(wizard.getPluginClassName()
							+ ".js"), new ByteArrayInputStream(fileContents.getBytes()), null); //$NON-NLS-1$
				}
			}

			// Add configuration pane JS
			if (generateConfigurationTemplates) {
				IFolder dojoPackageFolder = templateService.getFolderFromWorkspace(dojoPackage.getPath());
				file = dojoPackageFolder.getFile(new Path("ConfigurationPane.js")); //$NON-NLS-1$
				if (!file.exists()) {
					Map<String, String> map = new HashMap<String, String>();
					map.put("PackageName", wizard.getPluginPackageName()); //$NON-NLS-1$
					map.put("ClassName", wizard.getPluginClassName()); //$NON-NLS-1$
					String fileContents = templateService.getContentAfterReplacingVariables(
							"/templates/base/ConfigurationPane-template.js", map); //$NON-NLS-1$
					templateService.saveFileContentsToFolder(dojoPackageFolder, new Path("ConfigurationPane.js"), //$NON-NLS-1$
							new ByteArrayInputStream(fileContents.getBytes()), null);
				}

				// Add configuration pane HTML
				IFolder dojoTemplatePackageFolder = templateService.getFolderFromWorkspace(dojoTemplatesPackage
						.getPath());
				file = dojoTemplatePackageFolder.getFile(new Path("ConfigurationPane.html")); //$NON-NLS-1$
				if (!file.exists()) {
					templateService.saveFileContentsToFolder(dojoTemplatePackageFolder, new Path(
							"ConfigurationPane.html"), //$NON-NLS-1$
							"/templates/base/ConfigurationPane-template.html", null); //$NON-NLS-1$
				}
			}

			// Update the nature
			Utils.addNatureToProject(projectToConvert, ICNProjectNature.NATURE_ID, null);

		} catch (CoreException e) {
			throw e;
		}
		return true;
	}

	private String getRelativePath(IClasspathEntry cpe, IProject project) {
		IPath path = project.getFile(cpe.getPath()).getProjectRelativePath();
		return path.removeFirstSegments(1).toString();
	}

	@Override
	public void handleEvent(Event event) {
		setPageComplete(isPageComplete());
		getWizard().getContainer().updateButtons();
	}

	@Override
	public boolean isPageComplete() {
		if ((dojoPackageQN != null && dojoPackageQN.length() > 0)
				&& (webContentPackageQN != null && webContentPackageQN.length() > 0)) {
			return true;
		} else {
			return false;
		}
	}

	private void loadClasspathEntries(IProject project, IProgressMonitor monitor) {
		IJavaProject javaProject = JavaCore.create(project);
		IClasspathEntry[] currentClassPath = new IClasspathEntry[0];
		ArrayList sources = new ArrayList();
		ArrayList libraries = new ArrayList();
		try {
			currentClassPath = javaProject.getRawClasspath();

		} catch (JavaModelException e) {
		}
		for (int i = 0; i < currentClassPath.length; i++) {
			int contentType = currentClassPath[i].getEntryKind();
			if (contentType == IClasspathEntry.CPE_SOURCE) {
				String relativePath = getRelativePath(currentClassPath[i], project);
				if (relativePath.equals("")) { //$NON-NLS-1$
					sources.add("."); //$NON-NLS-1$
				} else {
					sources.add(relativePath + "/"); //$NON-NLS-1$
				}
				System.out.println("IClasspathEntry.CPE_SOURCE relativePath=" + relativePath); //$NON-NLS-1$
			} else if (contentType == IClasspathEntry.CPE_LIBRARY) {
				String path = getRelativePath(currentClassPath[i], project);
				if (path.length() > 0)
					libraries.add(path);
				else
					libraries.add("."); //$NON-NLS-1$
				System.out.println("IClasspathEntry.CPE_LIBRARY path=" + path); //$NON-NLS-1$

				if (path.contains("navigatorAPI.jar")) { //$NON-NLS-1$
					pathNavigatorAPI_Jar = currentClassPath[i].getPath().toFile().getAbsolutePath();
					System.out.println("pathNavigatorAPI_Jar==>" + pathNavigatorAPI_Jar); //$NON-NLS-1$
					Activator.getDefault().getPreferenceStore().setValue("libpath", pathNavigatorAPI_Jar); //$NON-NLS-1$
				}
			}
		}
		String[] fSrcEntries = (String[]) sources.toArray(new String[sources.size()]);
		String[] fLibEntries = (String[]) libraries.toArray(new String[libraries.size()]);

		IClasspathEntry[] classPath = new IClasspathEntry[currentClassPath.length + 1];
		System.arraycopy(currentClassPath, 0, classPath, 0, currentClassPath.length);

		// Add j2ee jar in anyway
		IFile jeeFile = project.getFile("lib" + File.separator + "j2ee.jar"); //$NON-NLS-1$ //$NON-NLS-2$
		classPath[classPath.length - 1] = JavaCore.newLibraryEntry(jeeFile.getFullPath(), null, null);
		try {
			javaProject.setRawClasspath(classPath, monitor);
		} catch (JavaModelException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void setVisible(boolean visible) {
		super.setVisible(visible);
	}

}
