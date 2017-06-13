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
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.ExpandBar;
import org.eclipse.swt.widgets.ExpandItem;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Text;

import com.ibm.ecm.icn.plugin.Activator;
import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.natures.ICNProjectNature;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ConvertProjectToICNProjectWizardPage3 extends WizardPage implements Listener {

	private Button btnGenerateBuildXML;
	private Button btnGenerateConfigurationTemplates;
	private Button btnGenerateManifest;
	private Button btnGenerateWebContents;
	private IPackageFragment dojoPackage;
	private String dojoPackageQN;
	private IPackageFragment dojoTemplatesPackage;
	private boolean generateBuildXML;
	private boolean generateConfigurationTemplates;
	private boolean generateManifest;
	private boolean generateWebContents;
	private Image orginalImage;
	private String pathNavigatorAPI_Jar;
	private IProject projectToConvert;
	private TemplateService templateService;
	private Text txtDojoPackage;
	private Text txtWebContentPackage;
	private IPackageFragment webContentPackage;
	private String webContentPackageQN;
	private ConvertProjectToICNProjectWizard wizard;

	public ConvertProjectToICNProjectWizardPage3(ConvertProjectToICNProjectWizard convertProjectToICNProjectWizard,
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
	public void createControl(Composite parent) {
		parent.setLayout(new FillLayout());

		Composite composite = new Composite(parent, SWT.NONE);
		GridLayout layout = new GridLayout(1, true);
		composite.setLayout(layout);

		createDiscoveredPluginClassInfo(composite);
		createDiscoveredExtensionsInfo(composite);

		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_package_QN,
				wizard.getPluginPackageName());
		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_class_QN,
				wizard.getPluginClassName());
		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_name_QN,
				wizard.getPluginClassName());

		setControl(composite);
	}

	private final void createDiscoveredExtensionsInfo(Composite parent) {
		Group group = new Group(parent, SWT.NONE);
		group.setText(Messages.ConvertProjectToICNProjectWizardPage3_Group_Title_Extensions);
		FillLayout fl = new FillLayout();
		fl.marginHeight = fl.marginWidth = 10;
		group.setLayout(fl);
		GridData gridData = new GridData();
		gridData.grabExcessHorizontalSpace = true;
		gridData.grabExcessVerticalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		gridData.verticalAlignment = GridData.FILL;
		gridData.widthHint = 400;
		gridData.heightHint = 140;
		group.setLayoutData(gridData);

		ExpandBar bar = new ExpandBar(group, SWT.V_SCROLL | SWT.BORDER);
		gridData = new GridData();
		gridData.grabExcessHorizontalSpace = true;
		gridData.grabExcessVerticalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		gridData.verticalAlignment = GridData.FILL;
		gridData.widthHint = 400;
		gridData.heightHint = 120;
		bar.setLayoutData(gridData);

		Image image = parent.getDisplay().getSystemImage(SWT.ICON_INFORMATION);

		List<IType> subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginFeature"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Features,
					subclasses, TemplateService.Top_features_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginService"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Services,
					subclasses, TemplateService.Top_services_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginRequestFilter"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_ReqFilters,
					subclasses, TemplateService.Top_reqFilters_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginResponseFilter"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_RespFilters,
					subclasses, TemplateService.Top_respFilters_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginAction"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Action,
					subclasses, TemplateService.Top_actions_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginOpenAction"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_OpenAction,
					subclasses, TemplateService.Top_openActions_QN);
		}
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginLayout"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Layouts,
					subclasses, TemplateService.Top_layouts_QN);

		}
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginMenu"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_Menus, subclasses,
					TemplateService.Top_menus_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginMenuType"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_MenuTypes,
					subclasses, TemplateService.Top_menutypes_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginViewerDef"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			createTextFieldInfo(image, bar, Messages.ConvertProjectToICNProjectWizardPage2_CTF_Title_ViewDef,
					subclasses, TemplateService.Top_viewers_QN);
		}
		bar.setSpacing(8);
	}

	private final void createDiscoveredPluginClassInfo(Composite parent) {
		List<IType> pluginclass = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.Plugin"); //$NON-NLS-1$

		Group group = new Group(parent, SWT.NONE);
		group.setText(Messages.ConvertProjectToICNProjectWizardPage3_Group_Title_Plugin);
		group.setLayout(new GridLayout(2, false));
		GridData gridData = new GridData();
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		gridData.widthHint = 400;
		group.setLayoutData(gridData);

		Label label = new Label(group, SWT.NONE);
		label.setText(Messages.ConvertProjectToICNProjectWizardPage3_Label_Text_PluginClass);

		Text text = new Text(group, SWT.NONE);
		gridData = new GridData();
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		text.setLayoutData(gridData);
		text.setEditable(false);
		// text.setEnabled(false);
		text.setText(pluginclass.get(0).getFullyQualifiedName());
		text.setForeground(text.getDisplay().getSystemColor(SWT.COLOR_BLUE));

		Label separator = new Label(group, SWT.SEPARATOR | SWT.HORIZONTAL);
		gridData = new GridData();
		gridData.horizontalAlignment = GridData.FILL;
		gridData.horizontalSpan = 2;
		gridData.grabExcessHorizontalSpace = true;
		gridData.heightHint = 4;
		separator.setLayoutData(gridData);
		separator.setVisible(false);

		Group group1 = new Group(group, SWT.NONE);
		group1.setText(Messages.ConvertProjectToICNProjectWizardPage3_Group_Title_WebContentDojo);
		group1.setLayout(new GridLayout(1, true));
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		group1.setLayoutData(gridData);

		separator = new Label(group1, SWT.SEPARATOR | SWT.HORIZONTAL);
		gridData = new GridData();
		gridData.horizontalAlignment = GridData.FILL;
		gridData.horizontalSpan = 2;
		gridData.grabExcessHorizontalSpace = true;
		gridData.heightHint = 4;
		separator.setLayoutData(gridData);
		separator.setVisible(false);

		label = new Label(group1, SWT.NONE | SWT.WRAP);
		label.setText(Messages.ConvertProjectToICNProjectWizardPage3_Label_Text_Notes1
				+ Messages.ConvertProjectToICNProjectWizardPage3_Label_Text_Notes2);
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		label.setLayoutData(gridData);

		separator = new Label(group1, SWT.SEPARATOR | SWT.HORIZONTAL);
		gridData = new GridData();
		gridData.horizontalAlignment = GridData.FILL;
		gridData.horizontalSpan = 2;
		gridData.grabExcessHorizontalSpace = true;
		gridData.heightHint = 4;
		separator.setLayoutData(gridData);
		separator.setVisible(false);

		label = new Label(group1, SWT.NONE);
		label.setText(Messages.ConvertProjectToICNProjectWizardPage3_Label_Text_WebContent);

		txtWebContentPackage = new Text(group1, SWT.BORDER);
		gridData = new GridData();
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		txtWebContentPackage.setLayoutData(gridData);
		txtWebContentPackage.setText(wizard.getPluginPackageName() + ".WebContent"); //$NON-NLS-1$
		txtWebContentPackage.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				webContentPackageQN = txtWebContentPackage.getText();
			}
		});

		label = new Label(group1, SWT.NONE);
		label.setText(Messages.ConvertProjectToICNProjectWizardPage3_Label_Text_Dojo);

		txtDojoPackage = new Text(group1, SWT.BORDER);
		gridData = new GridData();
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		txtDojoPackage.setLayoutData(gridData);
		txtDojoPackage.setText(wizard.getPluginPackageName() + ".WebContent." //$NON-NLS-1$
				+ Utils.asLowerCaseFirstChar(wizard.getPluginClassName()) + "Dojo"); //$NON-NLS-1$
		txtDojoPackage.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				dojoPackageQN = txtDojoPackage.getText();
			}
		});

		webContentPackageQN = txtWebContentPackage.getText();
		dojoPackageQN = txtDojoPackage.getText();

		Group group2 = new Group(group, SWT.NONE);
		group2.setText(Messages.ConvertProjectToICNProjectWizardPage3_Label_Text_GenerationOptions);
		group2.setLayout(new GridLayout(1, true));
		gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.grabExcessHorizontalSpace = true;
		gridData.horizontalAlignment = GridData.FILL;
		group2.setLayoutData(gridData);

		btnGenerateBuildXML = new Button(group2, SWT.CHECK);
		btnGenerateBuildXML.setText(Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateBuildFile);
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateBuildXML.setLayoutData(gridData);
		btnGenerateBuildXML.setSelection(false);
		generateBuildXML = false;
		btnGenerateBuildXML.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateBuildXML = btnGenerateBuildXML.getSelection();
			}

			@Override
			public void widgetSelected(SelectionEvent e) {
				generateBuildXML = btnGenerateBuildXML.getSelection();
			}
		});

		btnGenerateManifest = new Button(group2, SWT.CHECK);
		btnGenerateManifest.setText(Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateManifest);

		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateManifest.setLayoutData(gridData);
		btnGenerateManifest.setSelection(false);
		generateManifest = false;
		btnGenerateManifest.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateManifest = btnGenerateManifest.getSelection();
			}

			@Override
			public void widgetSelected(SelectionEvent e) {
				generateManifest = btnGenerateManifest.getSelection();
			}
		});

		btnGenerateWebContents = new Button(group2, SWT.CHECK);
		btnGenerateWebContents
				.setText(Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateWebContent);
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateWebContents.setLayoutData(gridData);
		btnGenerateWebContents.setSelection(false);
		generateWebContents = false;
		btnGenerateWebContents.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateWebContents = btnGenerateWebContents.getSelection();
			}

			@Override
			public void widgetSelected(SelectionEvent e) {
				generateWebContents = btnGenerateWebContents.getSelection();
			}
		});

		btnGenerateConfigurationTemplates = new Button(group2, SWT.CHECK);
		btnGenerateConfigurationTemplates
				.setText(Messages.ConvertProjectToICNProjectWizardPage2_Check_Button_Text_GenerateConfig);
		gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		btnGenerateConfigurationTemplates.setLayoutData(gridData);
		btnGenerateConfigurationTemplates.setSelection(false);
		generateConfigurationTemplates = false;
		btnGenerateConfigurationTemplates.addSelectionListener(new SelectionListener() {
			@Override
			public void widgetDefaultSelected(SelectionEvent e) {
				generateConfigurationTemplates = btnGenerateConfigurationTemplates.getSelection();
			}

			@Override
			public void widgetSelected(SelectionEvent e) {
				generateConfigurationTemplates = btnGenerateConfigurationTemplates.getSelection();
			}
		});

	}

	private final void createTextFieldInfo(Image image, ExpandBar bar, String title, List<IType> subclasses,
			QualifiedName qn) {
		Composite composite = new Composite(bar, SWT.NONE);
		GridLayout layout = new GridLayout();
		layout.marginLeft = layout.marginTop = layout.marginRight = layout.marginBottom = 10;
		layout.verticalSpacing = 2;
		composite.setLayout(layout);

		if (subclasses != null && subclasses.size() > 0) {
			for (IType type : subclasses) {
				Label label = new Label(composite, SWT.NONE);
				label.setText(type.getFullyQualifiedName());
			}
			String content = Utils.getCommaSeparatedList(subclasses);
			System.out.println("Saving to qn=" + qn + ",  content=" + content); //$NON-NLS-1$ //$NON-NLS-2$
			templateService.setPersistentProperty(projectToConvert, qn, Utils.makeConstCalls(content));
		}

		ExpandItem item0 = new ExpandItem(bar, SWT.NONE, 0);
		item0.setText(title+" ["+subclasses.size()+"]");
		item0.setHeight(composite.computeSize(SWT.DEFAULT, SWT.DEFAULT).y);
		item0.setControl(composite);
		item0.setImage(image);
	}

	@Override
	public void dispose() {
		super.dispose();
		if (orginalImage != null) {
			orginalImage.dispose();
		}
	}

	public boolean finish() throws CoreException {
		try {
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
			} else {
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
		if (txtDojoPackage != null) {
			txtDojoPackage.setFocus();
			txtDojoPackage.setSelection(0, txtDojoPackage.getText().length());
		}
	}

}
