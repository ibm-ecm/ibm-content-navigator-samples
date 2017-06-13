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
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Text;

import com.ibm.ecm.icn.plugin.Activator;
import com.ibm.ecm.icn.plugin.Messages;
import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.natures.ICNProjectNature;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ConvertProjectToICNProjectWizardPage extends WizardPage implements Listener {

	private ConvertProjectToICNProjectWizard wizard;
	private IPackageFragment dojoPackage;
	private IPackageFragment dojoTemplatesPackage;
	private IPackageFragment imagePackage;
	private String pathNavigatorAPI_Jar;
	private Text pluginActions;
	private Text pluginClass;
	private Text pluginFeatures;
	private Text pluginLayouts;
	private Text pluginMenus;
	private Text pluginMenuTypes;
	private Text pluginOpenActions;
	private Text pluginRequestFilters;
	private Text pluginRsponseFilters;
	private Text pluginServices;
	private Text pluginViewDef;
	private Text pluginRepositoryTypes;
	private Text pluginAPIs;
	private IProject projectToConvert;
	private IPackageFragment sourcePackage;
	private TemplateService templateService;
	private IPackageFragment webContentPackage;

	public ConvertProjectToICNProjectWizardPage(ConvertProjectToICNProjectWizard convertProjectToICNProjectWizard,
			String pageName, IProject project) {
		super(pageName);
		setTitle(Messages.ConvertProjectToICNProjectWizardPage_Title);
		setDescription(Messages.ConvertProjectToICNProjectWizardPage_Description);
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
		Composite composite = new Composite(parent, SWT.NONE);
		GridLayout gl = new GridLayout(2, false);
		composite.setLayout(gl);

		// Main UI
		Group grpTestSession = new Group(composite, SWT.NONE);
		grpTestSession.setText(Messages.ConvertProjectToICNProjectWizardPage_Group_title_Existing_Info);
		GridLayout gridLayout = new GridLayout(2, false);
		grpTestSession.setLayout(gridLayout);

		GridData gridData = new GridData();
		gridData.horizontalSpan = 2;
		gridData.horizontalAlignment = SWT.FILL;
		gridData.grabExcessHorizontalSpace = true;
		grpTestSession.setLayoutData(gridData);

		List<IType> subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.Plugin"); //$NON-NLS-1$
		pluginClass = createTextFieldInfo(grpTestSession,
				Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Plugin_Class, subclasses,
				TemplateService.Top_class_QN);

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginFeature"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			pluginFeatures = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Features, subclasses,
					TemplateService.Top_features_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginService"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {
			pluginServices = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Services, subclasses,
					TemplateService.Top_services_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginRequestFilter"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginRequestFilters = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_ReqFilter, subclasses,
					TemplateService.Top_reqFilters_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginResponseFilter"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginRsponseFilters = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Resp_Filters, subclasses,
					TemplateService.Top_respFilters_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginAction"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginActions = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Action, subclasses,
					TemplateService.Top_actions_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginOpenAction"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginOpenActions = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_OpenAction, subclasses,
					TemplateService.Top_openActions_QN);
		}
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginLayout"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginLayouts = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Layouts, subclasses,
					TemplateService.Top_layouts_QN);

		}
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginMenu"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginMenus = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Menu, subclasses,
					TemplateService.Top_menus_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginMenuType"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginMenuTypes = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_MenuType, subclasses,
					TemplateService.Top_menutypes_QN);
		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginViewerDef"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginViewDef = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_View_Def, subclasses,
					TemplateService.Top_viewers_QN);
		}
		
		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginRepositoryType"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginRepositoryTypes = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_Repository_Type, subclasses,
					TemplateService.Top_repositories_QN);

		}

		subclasses = Utils.getSubclassesFor(projectToConvert, "com.ibm.ecm.extension.PluginAPI"); //$NON-NLS-1$
		if (subclasses != null && subclasses.size() > 0) {

			pluginAPIs = createTextFieldInfo(grpTestSession,
					Messages.ConvertProjectToICNProjectWizardPage_Text_Title_API, subclasses,
					TemplateService.Top_apis_QN);

		}
		
		// End of main UI

		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_package_QN,
				wizard.getPluginPackageName());
		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_class_QN,
				wizard.getPluginClassName());
		templateService.setPersistentProperty(projectToConvert, TemplateService.Top_name_QN,
				wizard.getPluginClassName());

		setControl(composite);
	}

	private final Text createTextFieldInfo(Group grpTestSession, String label, List<IType> types, QualifiedName qn) {
		//
		Label lbl = new Label(grpTestSession, SWT.LEAD);
		lbl.setText(label);
		// create text field for test session name
		Text text = new Text(grpTestSession, SWT.MULTI | SWT.BORDER | SWT.WRAP | SWT.V_SCROLL);
		// classText.addModifyListener(new FileFieldListener());
		// layout text field for test session name
		GridData gridData = new GridData();
		gridData.horizontalAlignment = SWT.FILL;
		// gridData.grabExcessHorizontalSpace = true;
		gridData.widthHint = 360;
		gridData.heightHint = 40;
		text.setLayoutData(gridData);

		String content = ""; //$NON-NLS-1$
		if (types != null && types.size() > 0) {
			content = Utils.getCommaSeparatedList(types);
		}

		templateService.setPersistentProperty(projectToConvert, qn, Utils.makeConstCalls(content));

		text.setText(content);
		text.setEditable(false);
		return text;
	}

	public boolean finish() {
		try {
			// Update the nature
			Utils.addNatureToProject(projectToConvert, ICNProjectNature.NATURE_ID, null);

			// Save some basic extended attributes such as the package name of the main plugin, the plugin class name,
			// etc..
			templateService.setPersistentProperty(projectToConvert, TemplateService.Top_package_QN,
					wizard.getPluginPackageName());
			templateService.setPersistentProperty(projectToConvert, TemplateService.Top_class_QN,
					wizard.getPluginClassName());
			templateService.setPersistentProperty(projectToConvert, TemplateService.Top_name_QN,
					wizard.getPluginClassName());

			// Get Java project
			IJavaProject javaProject = JavaCore.create(projectToConvert);

			// Check all folders or packages
			IFolder sourceFolder = projectToConvert.getFolder("src"); //$NON-NLS-1$
			String packageName = wizard.getPluginPackageName();

			webContentPackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
					packageName + ".WebContent"); //$NON-NLS-1$
			if (webContentPackage == null || !webContentPackage.exists()) {
				webContentPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
						packageName + ".WebContent", true, null); //$NON-NLS-1$
			}

			imagePackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
					packageName + ".WebContent.images"); //$NON-NLS-1$
			if (imagePackage == null || !imagePackage.exists()) {
				imagePackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
						packageName + ".WebContent.images", true, null); //$NON-NLS-1$
			}

			dojoPackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
					packageName + ".WebContent." + templateService.getDojoModuleName()); //$NON-NLS-1$
			if (dojoPackage == null || !dojoPackage.exists()) {
				try {
					dojoPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
							packageName + ".WebContent." + templateService.getDojoModuleName(), true, null); //$NON-NLS-1$
				} catch (CoreException ce) {
					// Java Model Exception: Core Exception [code 275] A resource exists with a different case:
					// '/afpViewerPlugin4/src/com/ibm/ecm/extension/afpViewer/WebContent/afpViewerPluginDojo'.
					if (ce.getStatus().getCode() == 275) {
						System.out.println(ce.getLocalizedMessage());
					}
				}
			}

			dojoTemplatesPackage = javaProject.getPackageFragmentRoot(sourceFolder).getPackageFragment(
					packageName + ".WebContent." + templateService.getDojoModuleTemplatesName()); //$NON-NLS-1$
			if (dojoTemplatesPackage == null || !dojoTemplatesPackage.exists()) {
				dojoTemplatesPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
						packageName + ".WebContent." + templateService.getDojoModuleTemplatesName(), true, null); //$NON-NLS-1$
			}

			// Library class paths
			loadClasspathEntries(projectToConvert, null);

			// Build xml
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
				templateService.saveFileContentsToFile(buildFile, new ByteArrayInputStream(fileContents.getBytes()),
						null);
			}

			// Add Manifest file
			IFolder mfFolder = projectToConvert.getFolder(new Path("META-INF")); //$NON-NLS-1$
			if (!mfFolder.exists()) {
				mfFolder = templateService.createFolderUnderProject(new Path("META-INF")); //$NON-NLS-1$
				Map<String, String> map = new HashMap<String, String>();
				map.put("PackageName", wizard.getPluginPackageName()); //$NON-NLS-1$
				map.put("ClassName", wizard.getPluginClassName()); //$NON-NLS-1$
				String fileContents = templateService.getContentAfterReplacingVariables(
						"/templates/base/MANIFEST.MF", map); //$NON-NLS-1$
				templateService.saveFileContentsToFolder(mfFolder, new Path("MANIFEST.MF"), new ByteArrayInputStream( //$NON-NLS-1$
						fileContents.getBytes()), null);
			}

			IFolder libDir = projectToConvert.getFolder(new Path("lib")); //$NON-NLS-1$
			if (!libDir.exists()) {
				// Set up Library folder by copying j2ee.jar
				libDir = templateService.createFolderUnderProject(new Path("lib")); //$NON-NLS-1$
				templateService
						.saveFileContentsToFolder(libDir, new Path("j2ee.jar"), "/templates/base/j2ee.jar", null); //$NON-NLS-1$ //$NON-NLS-2$
			}

			// Copy java script and css to the web content directory
			IFolder webContentFolder = templateService.getFolderFromWorkspace(webContentPackage.getPath());
			IFile file = webContentFolder.getFile(new Path(wizard.getPluginClassName() + ".css")); //$NON-NLS-1$
			if (!file.exists()) {
				templateService.saveFileContentsToFolder(webContentFolder, new Path(wizard.getPluginClassName()
						+ ".css"), "/templates/base/css-template.resource", null); //$NON-NLS-1$ //$NON-NLS-2$
			}
			file = webContentFolder.getFile(new Path(wizard.getPluginClassName() + ".js")); //$NON-NLS-1$
			if (!file.exists()) {
				Map<String, String> map = new HashMap<String, String>();
				String fileContents = templateService.getContentAfterReplacingVariables(
						"/templates/base/js-template.resource", map); //$NON-NLS-1$
				templateService
						.saveFileContentsToFolder(
								webContentFolder,
								new Path(wizard.getPluginClassName() + ".js"), new ByteArrayInputStream(fileContents.getBytes()), null); //$NON-NLS-1$
			}

			// Add configuration pane JS
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
			IFolder dojoTemplatePackageFolder = templateService.getFolderFromWorkspace(dojoTemplatesPackage.getPath());
			file = dojoTemplatePackageFolder.getFile(new Path("ConfigurationPane.html")); //$NON-NLS-1$
			if (!file.exists()) {
				templateService.saveFileContentsToFolder(dojoTemplatePackageFolder, new Path("ConfigurationPane.html"), //$NON-NLS-1$
						"/templates/base/ConfigurationPane-template.html", null); //$NON-NLS-1$
			}

		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
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
		return true;
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
