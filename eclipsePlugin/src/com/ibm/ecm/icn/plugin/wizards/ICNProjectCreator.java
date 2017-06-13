package com.ibm.ecm.icn.plugin.wizards;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.launching.IVMInstall;
import org.eclipse.jdt.launching.JavaRuntime;
import org.eclipse.jdt.launching.LibraryLocation;
import org.eclipse.wst.jsdt.core.JavaScriptCore;

import com.ibm.ecm.icn.plugin.Utils;
import com.ibm.ecm.icn.plugin.natures.ICNProjectNature;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class ICNProjectCreator {

	private ICNProjectInfoProvider infoProvider;
	private IPackageFragment dojoPackage;
	private IPackageFragment dojoTemplatesPackage;
	private IPackageFragment imagePackage;
	private IJavaProject javaProject;
	private IPackageFragment sourcePackage;
	private TemplateService templateService;
	private IPackageFragment webContentPackage;
	boolean newProjectFlag;

	public ICNProjectCreator(TemplateService templateService, ICNProjectInfoProvider infoProvider,
			boolean newProjectFlag) {
		super();
		this.templateService = templateService;
		this.infoProvider = infoProvider;
		this.newProjectFlag = newProjectFlag;
	}

	public final void createProject(IProjectDescription description, IProject proj, IProgressMonitor monitor)
			throws CoreException, OperationCanceledException {
		try {
			monitor.beginTask("", 2000); //$NON-NLS-1$

			// Set up as a Java project, create source codes, packages and configure class path, etc...
			setupJavaProject(description, proj, monitor);

			IWorkspace workspace = ResourcesPlugin.getWorkspace();
			IWorkspaceRoot workspaceRoot = workspace.getRoot();

			// Copy java script and css to the web content directory
			IFolder webContentFolder = templateService.getFolderFromWorkspace(webContentPackage.getPath());
			templateService.saveFileContentsToFolder(webContentFolder, new Path(infoProvider.getPluginClassName()
					+ ".css"), "/templates/base/css-template.resource", monitor); //$NON-NLS-1$ //$NON-NLS-2$

			Map<String, String> map = new HashMap<String, String>();
			String fileContents = templateService.getContentAfterReplacingVariables(
					"/templates/base/js-template.resource", map); //$NON-NLS-1$
			templateService.saveFileContentsToFolder(webContentFolder, new Path(infoProvider.getPluginClassName()
					+ ".js"), new ByteArrayInputStream(fileContents.getBytes()), monitor); //$NON-NLS-1$

			// Add build.xml file
			String newlibraryPath = infoProvider.getLibraryPath().replaceAll("\\\\", "/"); //$NON-NLS-1$ //$NON-NLS-2$
			map = new HashMap<String, String>();
			map.put("ProjectName", infoProvider.getProjectName()); //$NON-NLS-1$
			map.put("navigatorAPI.jar", newlibraryPath); //$NON-NLS-1$
			map.put("PackageName", infoProvider.getPluginPackageName()); //$NON-NLS-1$
			map.put("ClassName", infoProvider.getPluginClassName()); //$NON-NLS-1$

			fileContents = templateService.getContentAfterReplacingVariables("/templates/base/build.xml", map); //$NON-NLS-1$
			IFile file = proj.getFile("build.xml"); //$NON-NLS-1$
			templateService.saveFileContentsToFile(file, new ByteArrayInputStream(fileContents.getBytes()), monitor);

			// Add Manifest file
			IFolder mfFolder = templateService.createFolderUnderProject(new Path("META-INF")); //$NON-NLS-1$
			map = new HashMap<String, String>();
			map.put("PackageName", infoProvider.getPluginPackageName()); //$NON-NLS-1$
			map.put("ClassName", infoProvider.getPluginClassName()); //$NON-NLS-1$
			fileContents = templateService.getContentAfterReplacingVariables("/templates/base/MANIFEST.MF", map); //$NON-NLS-1$
			templateService.saveFileContentsToFolder(mfFolder, new Path("MANIFEST.MF"), new ByteArrayInputStream( //$NON-NLS-1$
					fileContents.getBytes()), monitor);

			// Add configuration pane JS
			IFolder dojoPackageFolder = workspaceRoot.getFolder(dojoPackage.getPath());
			map = new HashMap<String, String>();
			map.put("PackageName", infoProvider.getPluginPackageName()); //$NON-NLS-1$
			map.put("ClassName", infoProvider.getPluginClassName()); //$NON-NLS-1$
			fileContents = templateService.getContentAfterReplacingVariables(
					"/templates/base/ConfigurationPane-template.js", map); //$NON-NLS-1$
			templateService.saveFileContentsToFolder(dojoPackageFolder, new Path("ConfigurationPane.js"), //$NON-NLS-1$
					new ByteArrayInputStream(fileContents.getBytes()), monitor);

			// Add configuration pane HTML
			IFolder dojoTemplatePackageFolder = workspaceRoot.getFolder(dojoTemplatesPackage.getPath());
			templateService.saveFileContentsToFolder(dojoTemplatePackageFolder, new Path("ConfigurationPane.html"), //$NON-NLS-1$
					"/templates/base/ConfigurationPane-template.html", monitor); //$NON-NLS-1$

		} catch (Exception ioe) {
			ioe.printStackTrace();
			IStatus status = new Status(IStatus.ERROR, "NewFileWizard", IStatus.OK, ioe.getLocalizedMessage(), null); //$NON-NLS-1$
			throw new CoreException(status);
		} finally {
			monitor.done();
		}
	}

	private final String generatePluginSourceClass() throws CoreException {
		Map<String, String> map = new HashMap<String, String>();
		map.put("PluginPackageName", templateService.getPluginPackageName()); //$NON-NLS-1$
		map.put("PluginClassName", templateService.getPluginClassName()); //$NON-NLS-1$
		map.put("PluginName", templateService.getPluginName()); //$NON-NLS-1$
		map.put("PluginVersion", templateService.getPluginVersion()); //$NON-NLS-1$
		map.put("DojoModuleName", templateService.getDojoModuleName()); //$NON-NLS-1$
		map.put("DojoModuleTemplatesName", templateService.getDojoModuleTemplatesName()); //$NON-NLS-1$

		String fileContents = templateService.getContentAfterReplacingVariables(
				"/templates/base/java-template.resource", map); //$NON-NLS-1$
		return fileContents;
	}

	private final void setupJavaProject(IProjectDescription description, IProject proj, IProgressMonitor monitor)
			throws CoreException {

		if (newProjectFlag) {
			proj.create(new SubProgressMonitor(monitor, 1000));
			if (monitor.isCanceled()) {
				throw new OperationCanceledException();
			}
		}

		proj.open(new SubProgressMonitor(monitor, 1000));

		// Because we need a java project, we have to set the Java nature to the created project:
		description.setNatureIds(new String[] { JavaCore.NATURE_ID, JavaScriptCore.NATURE_ID,
				ICNProjectNature.NATURE_ID });
		proj.setDescription(description, null);

		// Now we can create our Java project
		javaProject = JavaCore.create(proj);

		// Set up Library folder by copying j2ee.jar
		IFolder folder = templateService.createFolderUnderProject(new Path("lib")); //$NON-NLS-1$

		templateService.saveFileContentsToFolder(folder, new Path("j2ee.jar"), "/templates/base/j2ee.jar", monitor); //$NON-NLS-1$ //$NON-NLS-2$

		// However, it's not enough if we want to add Java source code to
		// the project. We have to set the Java build path:
		// (1) We first specify the output location of the compiler (the bin folder):
		IFolder binFolder = proj.getFolder("bin"); //$NON-NLS-1$
		if (newProjectFlag) {
			binFolder.create(false, true, null);
			javaProject.setOutputLocation(binFolder.getFullPath(), null);

			// (2) Define the class path entries. Class path entries define the roots of package fragments. Note that
			// you might have to include the necessary plugin "org.eclipse.jdt.launching".
			List<IClasspathEntry> entries = new ArrayList<IClasspathEntry>();
			IVMInstall vmInstall = JavaRuntime.getDefaultVMInstall();
			LibraryLocation[] locations = JavaRuntime.getLibraryLocations(vmInstall);
			for (LibraryLocation element : locations) {
				entries.add(JavaCore.newLibraryEntry(element.getSystemLibraryPath(), null, null));
			}
			javaProject.setRawClasspath(entries.toArray(new IClasspathEntry[entries.size()]), null);
		}

		// (3) We have not yet the source folder created: add source folder
		IFolder sourceFolder = proj.getFolder("src"); //$NON-NLS-1$
		if (newProjectFlag) {
			sourceFolder.create(false, true, null);
		}

		// (4) Now the created source folder should be added to the class entries of the project, otherwise
		// compilation will fail:
		IPackageFragmentRoot root = javaProject.getPackageFragmentRoot(sourceFolder);
		IClasspathEntry[] oldEntries = javaProject.getRawClasspath();
		int num = 3;
		if (!newProjectFlag) {
			num = 2;
		}
		IClasspathEntry[] newEntries = new IClasspathEntry[oldEntries.length + num];
		System.arraycopy(oldEntries, 0, newEntries, 0, oldEntries.length);
		if (newProjectFlag) {
			newEntries[oldEntries.length] = JavaCore.newSourceEntry(root.getPath());
		}
		IFile jeeFile = proj.getFile("lib" + File.separator + "j2ee.jar"); //$NON-NLS-1$ //$NON-NLS-2$
		if (newProjectFlag) {
			newEntries[oldEntries.length + 1] = JavaCore.newLibraryEntry(jeeFile.getFullPath(), null, null);
		} else {
			newEntries[oldEntries.length] = JavaCore.newLibraryEntry(jeeFile.getFullPath(), null, null);

		}

		IPath fullPath = new Path(infoProvider.getLibraryPath());
		if (newProjectFlag) {
			newEntries[oldEntries.length + 2] = JavaCore.newLibraryEntry(fullPath, null, null);
		} else {
			newEntries[oldEntries.length + 1] = JavaCore.newLibraryEntry(fullPath, null, null);
		}
		javaProject.setRawClasspath(newEntries, null);

		// Save plugin info as extended resource attributes
		Utils.saveExtendedAttributesForICNProject(templateService, proj, infoProvider.getPluginPackageName(),
				infoProvider.getPluginClassName(), infoProvider.getPluginVersion(), infoProvider.getPluginName());

		String className = templateService.getPersistentProperty(proj, TemplateService.Top_class_QN);
		String modifiedClassName = Utils.asLowerCaseFirstChar(className);

		String webContentPkg = infoProvider.getPluginPackageName() + ".WebContent"; //$NON-NLS-1$
		String dojoPkg = infoProvider.getPluginPackageName() + ".WebContent." + modifiedClassName + "Dojo"; //$NON-NLS-1$ //$NON-NLS-2$
		String dojoTemplatesPkg = infoProvider.getPluginPackageName() + ".WebContent." //$NON-NLS-1$
				+ modifiedClassName + "Dojo.templates"; //$NON-NLS-1$
		String imagesPkg = infoProvider.getPluginPackageName() + ".WebContent.images"; //$NON-NLS-1$

		Utils.setFullyQuailifiedMainPackages(templateService, proj, webContentPkg, dojoPkg, dojoTemplatesPkg, imagesPkg);

		// Create class and packages
		sourcePackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(
				infoProvider.getPluginPackageName(), true, null);
		sourcePackage.createCompilationUnit(infoProvider.getPluginClassName() + ".java", generatePluginSourceClass(), //$NON-NLS-1$
				true, null);

		webContentPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(webContentPkg, true,
				null);
		imagePackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(imagesPkg, true, null);
		dojoPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(dojoPkg, true, null);
		dojoTemplatesPackage = javaProject.getPackageFragmentRoot(sourceFolder).createPackageFragment(dojoTemplatesPkg,
				true, null);

	}

}
