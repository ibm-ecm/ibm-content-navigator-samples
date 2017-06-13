package com.ibm.ecm.icn.plugin;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IProjectDescription;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.IPackageFragment;
import org.eclipse.jdt.core.IPackageFragmentRoot;
import org.eclipse.jdt.core.ISourceRange;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.ITypeHierarchy;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.ToolFactory;
import org.eclipse.jdt.core.formatter.CodeFormatter;
import org.eclipse.jface.dialogs.ErrorDialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.MessageDialogWithToggle;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.osgi.util.NLS;
import org.eclipse.swt.graphics.ImageData;
import org.eclipse.swt.widgets.Display;
import org.eclipse.text.edits.TextEdit;
import org.eclipse.ui.IPerspectiveDescriptor;
import org.eclipse.ui.IPerspectiveRegistry;
import org.eclipse.ui.IPluginContribution;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.IWorkbenchPartReference;
import org.eclipse.ui.IWorkbenchPreferenceConstants;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.WorkbenchException;
import org.eclipse.ui.activities.IActivityManager;
import org.eclipse.ui.activities.IIdentifier;
import org.eclipse.ui.activities.IWorkbenchActivitySupport;
import org.eclipse.ui.activities.WorkbenchActivityHelper;
import org.eclipse.ui.ide.IDE;
import org.eclipse.ui.internal.IPreferenceConstants;
import org.eclipse.ui.internal.WorkbenchPlugin;
import org.eclipse.ui.internal.ide.IDEInternalPreferences;
import org.eclipse.ui.internal.ide.IDEWorkbenchPlugin;
import org.eclipse.ui.internal.registry.PerspectiveDescriptor;
import org.eclipse.ui.internal.util.PrefUtil;
import org.eclipse.ui.part.ISetSelectionTarget;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.EntityResolver;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.ibm.ecm.icn.plugin.icn.config.ICNActionType;
import com.ibm.ecm.icn.plugin.natures.ICNProjectNature;
import com.ibm.ecm.icn.plugin.templates.TemplateService;

public class Utils {

	static List<String> mimeList;
	public static final String newline = System.getProperty("line.separator"); //$NON-NLS-1$
	private static final String PREFERRED_PERSPECTIVES = "preferredPerspectives"; //$NON-NLS-1$

	private static final String WINDOW_PROBLEMS_TITLE = ""; //$NON-NLS-1$

	public static boolean isOldTarget() {
		// return TargetPlatformHelper.getTargetVersion() < 3.1;
		return false;
	}

	public static final Display getDisplay() {
		Display display = Display.getCurrent();
		if (display == null)
			display = Display.getDefault();
		return display;
	}

	public static final IProject[] getUnconvertedProjects() throws CoreException {
		ArrayList unconverted = new ArrayList();
		IWorkspace workspace = ResourcesPlugin.getWorkspace();
		IWorkspaceRoot workspaceRoot = workspace.getRoot();

		IProject[] projects = workspaceRoot.getProjects();
		for (int i = 0; i < projects.length; i++) {
			if (projects[i].isOpen() && projects[i].hasNature(JavaCore.NATURE_ID)
					&& !projects[i].hasNature(ICNProjectNature.NATURE_ID)) {
				unconverted.add(projects[i]);
			}
		}
		return (IProject[]) unconverted.toArray(new IProject[unconverted.size()]);
	}

	public static void addMethod(ICompilationUnit unit, String methodName, String contents) throws JavaModelException {
		if (!unit.isWorkingCopy()) {
			unit = unit.getWorkingCopy(null);
		}
		IType primaryType = unit.findPrimaryType();
		if (primaryType != null) {
			// IType[] allTypes = unit.getAllTypes();
			// for (IType type : allTypes) {
			IMethod[] methods = primaryType.getMethods();
			primaryType.createMethod(contents, null, true, null);
			unit.commitWorkingCopy(true, null);
			return;
		} else {
			throw new RuntimeException(Messages.Utils_EXP_Type_Not_Found);
		}
		// }

	}

	public static final void saveExtendedAttributesForICNProject(TemplateService templateService, IProject proj,
			String packageName, String className, String version, String pluginName) {
		templateService.setPersistentProperty(proj, TemplateService.Top_package_QN, packageName);
		templateService.setPersistentProperty(proj, TemplateService.Top_class_QN, className);
		templateService.setPersistentProperty(proj, TemplateService.Top_name_QN, pluginName);
		templateService.setPersistentProperty(proj, TemplateService.Top_version_QN, version);
	}

	public static final void setFullyQuailifiedMainPackages(TemplateService templateService, IProject proj,
			String webContentPkg, String dojoPkg, String dojoTemplatesPkg, String imagesPkg) {
		templateService.setPersistentProperty(proj, TemplateService.Top_package_dojo_QN, dojoPkg);
		templateService.setPersistentProperty(proj, TemplateService.Top_package_dojotemplates_QN, dojoTemplatesPkg);
		templateService.setPersistentProperty(proj, TemplateService.Top_package_images_QN, imagesPkg);
		templateService.setPersistentProperty(proj, TemplateService.Top_package_webcontent_QN, webContentPkg);
	}

	public static final String makeConstCalls(String commaSeparatedString) {
		String str = ""; //$NON-NLS-1$
		String[] items = commaSeparatedString.split(","); //$NON-NLS-1$
		if (items.length > 0) {
			str = "new " + items[0] + "()"; //$NON-NLS-1$ //$NON-NLS-2$
			for (int i = 1; i < items.length; ++i) {
				str = str + "," + "new " + items[i] + "()"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
			}
		}
		return str;
	}

	public static final String getCommaSeparatedList(List<IType> types) {
		String returnVal = ""; //$NON-NLS-1$
		if (types.size() > 0) {
			returnVal = types.get(0).getFullyQualifiedName();
			for (int i = 1; i < types.size(); ++i) {
				returnVal = returnVal + "," + types.get(i).getFullyQualifiedName(); //$NON-NLS-1$
			}
		}
		return returnVal;
	}

	public final static void addNatureToProject(IProject proj, String natureId, IProgressMonitor monitor)
			throws CoreException {
		IProjectDescription description = proj.getDescription();
		String[] prevNatures = description.getNatureIds();
		String[] newNatures = new String[prevNatures.length + 1];
		System.arraycopy(prevNatures, 0, newNatures, 0, prevNatures.length);
		newNatures[prevNatures.length] = natureId;
		description.setNatureIds(newNatures);
		proj.setDescription(description, monitor);
	}

	public final static List<IType> getSubclassesFor(IProject projectToConvert, String baseClass) {
		try {
			IJavaElement jelem = (IJavaElement) projectToConvert.getAdapter(IJavaElement.class);
			if (jelem == null) {
				return null;
			} else {
				IJavaProject jp = jelem.getJavaProject();

				IType pluginType = jp.findType(baseClass);
				if (pluginType != null) {
					ArrayList<IType> pluginClasses = new ArrayList<IType>();

					ITypeHierarchy tH = pluginType.newTypeHierarchy(jp, null);
					IType[] types = tH.getAllSubtypes(pluginType);
					for (int i = 0; i < types.length; i++) {
						if (types[i].isClass() && !pluginClasses.contains(types[i])) {
							pluginClasses.add(types[i]);
						}
					}

					IType[] fIT = (IType[]) pluginClasses.toArray(new IType[pluginClasses.size()]);
					for (IType tp : fIT) {
						System.out.println("Type ==> " + tp); //$NON-NLS-1$
					}
					return pluginClasses;
				} else {
					return null;
				}
			}
		} catch (JavaModelException ex) {
			return null;
		}
	}

	private static void addPerspectiveAndDescendants(List perspectiveIds, String id) {
		IPerspectiveRegistry registry = PlatformUI.getWorkbench().getPerspectiveRegistry();
		IPerspectiveDescriptor[] perspectives = registry.getPerspectives();
		for (int i = 0; i < perspectives.length; i++) {
			PerspectiveDescriptor descriptor = ((PerspectiveDescriptor) perspectives[i]);
			if (descriptor.getOriginalId().equals(id)) {
				perspectiveIds.add(descriptor.getId());
			}
		}
	}

	public static String appendStringBefore(String pattern, String originalStr, String strToBeApended) {
		int lastIndex = originalStr.lastIndexOf(pattern);
		if (lastIndex >= 0) {
			String beforeString = originalStr.substring(0, lastIndex);
			String afterString = originalStr.substring(lastIndex + pattern.length());
			beforeString = beforeString + strToBeApended;
			beforeString = beforeString + pattern + afterString;
			return beforeString;
		}
		return originalStr;
	}

	public static final String asLowerCaseFirstChar(final String target) {
		if ((target == null) || (target.length() == 0)) {
			return target;
		}
		return Character.toLowerCase(target.charAt(0)) + (target.length() > 1 ? target.substring(1) : ""); //$NON-NLS-1$
	}

	private static boolean confirmPerspectiveSwitch(IWorkbenchWindow window, IPerspectiveDescriptor finalPersp) {
		IPreferenceStore store = IDEWorkbenchPlugin.getDefault().getPreferenceStore();
		String pspm = store.getString(IDEInternalPreferences.PROJECT_SWITCH_PERSP_MODE);
		if (!IDEInternalPreferences.PSPM_PROMPT.equals(pspm)) {
			// Return whether or not we should always switch
			return IDEInternalPreferences.PSPM_ALWAYS.equals(pspm);
		}
		String desc = finalPersp.getDescription();
		String message;
		if (desc == null || desc.length() == 0)
			message = NLS.bind("", finalPersp.getLabel()); //$NON-NLS-1$
		else
			message = NLS.bind("", //$NON-NLS-1$
					new String[] { finalPersp.getLabel(), desc });

		MessageDialogWithToggle dialog = MessageDialogWithToggle.openYesNoQuestion(window.getShell(), "", message, //$NON-NLS-1$
				null /* use the default message for the toggle */, false /* toggle is initially unchecked */, store,
				IDEInternalPreferences.PROJECT_SWITCH_PERSP_MODE);
		int result = dialog.getReturnCode();

		// If we are not going to prompt anymore propogate the choice.
		if (dialog.getToggleState()) {
			String preferenceValue;
			if (result == IDialogConstants.YES_ID) {
				// Doesn't matter if it is replace or new window
				// as we are going to use the open perspective setting
				preferenceValue = IWorkbenchPreferenceConstants.OPEN_PERSPECTIVE_REPLACE;
			} else {
				preferenceValue = IWorkbenchPreferenceConstants.NO_NEW_PERSPECTIVE;
			}

			// update PROJECT_OPEN_NEW_PERSPECTIVE to correspond
			PrefUtil.getAPIPreferenceStore().setValue(IDE.Preferences.PROJECT_OPEN_NEW_PERSPECTIVE, preferenceValue);
		}
		return result == IDialogConstants.YES_ID;
	}

	public static void formatUnitSourceCode(ICompilationUnit unit, IProgressMonitor monitor) throws JavaModelException {
		if (!unit.isWorkingCopy()) {
			// unit.becomeWorkingCopy(monitor);
			unit = unit.getWorkingCopy(monitor);
		}
		CodeFormatter formatter = ToolFactory.createCodeFormatter(null);
		ISourceRange range = unit.getSourceRange();
		TextEdit formatEdit = formatter.format(CodeFormatter.K_COMPILATION_UNIT, unit.getSource(), range.getOffset(),
				range.getLength(), 0, null);
		if (formatEdit != null && formatEdit.hasChildren()) {
			unit.applyTextEdit(formatEdit, monitor);
		} else {
			monitor.done();
		}
		unit.commitWorkingCopy(true, monitor);
	}

	public static String getListContentTypes(String contentTypes) {
		String clist = ""; //$NON-NLS-1$
		StringTokenizer stk = new StringTokenizer(contentTypes, ","); //$NON-NLS-1$
		clist = "\"" + stk.nextToken() + "\""; //$NON-NLS-1$ //$NON-NLS-2$
		while (stk.hasMoreTokens()) {
			clist = clist + "," + "\"" + stk.nextToken() + "\""; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		}
		return clist;
	}

	public static String getMethodSource(IJavaProject javaProject, String packageName, String className,
			String methodName) throws JavaModelException {
		IPackageFragment[] packages = javaProject.getPackageFragments();
		for (IPackageFragment mypackage : packages) {
			if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
				if (packageName.equals(mypackage.getElementName())) {
					for (ICompilationUnit unit : mypackage.getCompilationUnits()) {
						if (unit.getElementName().startsWith(className)) {
							IType[] allTypes = unit.getAllTypes();
							for (IType type : allTypes) {
								IMethod[] methods = type.getMethods();
								for (IMethod method : methods) {
									if (method.getElementName().equals(methodName)) {
										return method.getSource();
									}
								}
							}
						}
					}
				}
			}
		}
		return ""; //$NON-NLS-1$
	}

	public static List<String> getMIMEList() {
		if (mimeList == null) {
			mimeList = new ArrayList<String>();
			InputStream fis = null;
			BufferedReader br = null;
			try {
				fis = TemplateService.class.getResourceAsStream("/templates/base/mime.types"); //$NON-NLS-1$
				br = new BufferedReader(new InputStreamReader(fis, Charset.forName("UTF-8"))); //$NON-NLS-1$
				String line = null;
				while ((line = br.readLine()) != null) {
					if (line.startsWith("#")) { //$NON-NLS-1$
						continue;
					} else {
						String[] words = line.split("\t"); //$NON-NLS-1$
						mimeList.add(words[0]);
					}
				}
			} catch (Exception e) {

			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
					}
					br = null;
					fis = null;
				}
			}
		}
		return mimeList;
	}

	public static List<String> getMIMEListContains(String containText) {
		if (mimeList == null) {
			mimeList = new ArrayList<String>();
			InputStream fis = null;
			BufferedReader br = null;
			try {
				fis = TemplateService.class.getResourceAsStream("/templates/base/mime.types"); //$NON-NLS-1$
				br = new BufferedReader(new InputStreamReader(fis, Charset.forName("UTF-8"))); //$NON-NLS-1$
				String line = null;
				while ((line = br.readLine()) != null) {
					if (line.startsWith("#")) { //$NON-NLS-1$
						continue;
					} else {
						String[] words = line.split("\t"); //$NON-NLS-1$
						mimeList.add(words[0]);
					}
				}
			} catch (Exception e) {

			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
					}
					br = null;
					fis = null;
				}
			}
		}
		List<String> sublist = new ArrayList<String>();
		for (String str : mimeList) {
			if (str.contains(containText)) {
				sublist.add(str);
			}
		}
		return sublist;
	}

	public static ICompilationUnit getPluginClass(IJavaProject javaProject, String packageName, String className)
			throws JavaModelException {
		IPackageFragment[] packages = javaProject.getPackageFragments();
		for (IPackageFragment mypackage : packages) {
			if (mypackage.getKind() == IPackageFragmentRoot.K_SOURCE) {
				// match the package
				if (packageName.equals(mypackage.getElementName())) {
					for (ICompilationUnit unit : mypackage.getCompilationUnits()) {
						System.out.println("unit.getElementName().=>" + unit.getElementName() + ", className=" //$NON-NLS-1$ //$NON-NLS-2$
								+ className);
						String en = unit.getElementName().substring(0, unit.getElementName().lastIndexOf(".")); //$NON-NLS-1$
						if (en.equals(className)) {
							return unit;
						}
					}
				}
			}
		}
		return null;
	}

	public static List<ICNActionType> getActionMappings(InputStream istream) {
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

			dBuilder.setEntityResolver(new EntityResolver() {
				@Override
				public InputSource resolveEntity(String publicId, String systemId) throws SAXException, IOException {
					//System.out.println("publicId: " + publicId + ", systemId: " + systemId);
					return new InputSource(new StringReader(""));
				}
			});
			Document doc = dBuilder.parse(istream);
			List<ICNActionType> actions = new ArrayList<ICNActionType>();
			doc.getDocumentElement().normalize();

			System.out.println("Root element :" + doc.getDocumentElement().getNodeName()); //$NON-NLS-1$

			NodeList nList = doc.getElementsByTagName("action"); //$NON-NLS-1$
			for (int temp = 0; temp < nList.getLength(); temp++) {
				Node nNode = nList.item(temp);
				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) nNode;
					String pathString = eElement.getAttribute("path"); //$NON-NLS-1$
					String typeString = eElement.getAttribute("type"); //$NON-NLS-1$
					ICNActionType action = new ICNActionType(pathString, typeString);
					actions.add(action);
				}
			}
			return actions;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static String InputStream2String(InputStream is) {
		try {
			final int PKG_SIZE = 1024;
			byte[] data = new byte[PKG_SIZE];
			StringBuffer buffer = new StringBuffer(PKG_SIZE * 10);
			int size = is.read(data, 0, data.length);
			while (size > 0) {
				String str = new String(data, 0, size);
				buffer.append(str);
				size = is.read(data, 0, data.length);
			}
			return buffer.toString();
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {

		}
	}

	// join(String array,delimiter)
	public static String join(String r[], String d) {
		if (r.length == 0)
			return ""; //$NON-NLS-1$
		StringBuilder sb = new StringBuilder();
		int i;
		for (i = 0; i < r.length - 1; i++)
			sb.append(r[i] + d);
		return sb.toString() + r[i];
	}

	private static void openInNewWindow(IPerspectiveDescriptor desc) {
		try {
			PlatformUI.getWorkbench().openWorkbenchWindow(desc.getId(), ResourcesPlugin.getWorkspace().getRoot());
		} catch (WorkbenchException e) {
			IWorkbenchWindow window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
			if (window != null) {
				ErrorDialog.openError(window.getShell(), WINDOW_PROBLEMS_TITLE, e.getMessage(), e.getStatus());
			}
		}
	}

	public static void removeMethod(ICompilationUnit unit, String methodName) throws JavaModelException {
		if (!unit.isWorkingCopy()) {
			unit = unit.getWorkingCopy(null);
		}
		IType primaryType = unit.findPrimaryType();
		if (primaryType != null) {
			IMethod[] methods = primaryType.getMethods();
			for (IMethod method : methods) {
				if (method.getElementName().equals(methodName)) {
					if (method.exists()) {
						method.delete(true, null);
						unit.commitWorkingCopy(true, null);
					}
					return;
				}
			}
		} else {
			throw new RuntimeException(Messages.Utils_EXP_Type_Not_Found);
		}

	}

	private static void replaceCurrentPerspective(IPerspectiveDescriptor persp) {
		IWorkbenchWindow window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
		if (window == null) {
			return;
		}
		IWorkbenchPage page = window.getActivePage();
		if (page == null) {
			return;
		}
		page.setPerspective(persp);
	}

	public static ImageData resizeImage(ImageData data, int width) {
		// Retain the original width and height
		double oWidth = data.width;
		double oHeight = data.height;

		// Use the width as the scale so the end image is proportional
		// "width" is the newly desired width of the resulting image
		double yScale = width / oWidth;
		int newWidth = (int) (oWidth * yScale);
		int newHeight = (int) (oHeight * yScale);

		// Call the magic API to scale the image data
		ImageData nData = data.scaledTo(newWidth, newHeight);
		return nData;
	}

	public static void selectAndReveal(IResource resource, IWorkbenchWindow window) {
		// validate the input
		if (window == null || resource == null) {
			return;
		}
		IWorkbenchPage page = window.getActivePage();
		if (page == null) {
			return;
		}

		// get all the view and editor parts
		List parts = new ArrayList();
		IWorkbenchPartReference refs[] = page.getViewReferences();
		for (int i = 0; i < refs.length; i++) {
			IWorkbenchPart part = refs[i].getPart(false);
			if (part != null) {
				parts.add(part);
			}
		}
		refs = page.getEditorReferences();
		for (int i = 0; i < refs.length; i++) {
			if (refs[i].getPart(false) != null) {
				parts.add(refs[i].getPart(false));
			}
		}

		final ISelection selection = new StructuredSelection(resource);
		Iterator itr = parts.iterator();
		while (itr.hasNext()) {
			IWorkbenchPart part = (IWorkbenchPart) itr.next();

			// get the part's ISetSelectionTarget implementation
			ISetSelectionTarget target = null;
			if (part instanceof ISetSelectionTarget) {
				target = (ISetSelectionTarget) part;
			} else {
				target = (ISetSelectionTarget) part.getAdapter(ISetSelectionTarget.class);
			}

			if (target != null) {
				// select and reveal resource
				final ISetSelectionTarget finalTarget = target;
				window.getShell().getDisplay().asyncExec(new Runnable() {
					public void run() {
						finalTarget.selectReveal(selection);
					}
				});
			}
		}
	}

	public static void updatePerspective(IConfigurationElement configElement) {
		// Do not change perspective if the configuration element is
		// not specified.
		if (configElement == null) {
			return;
		}

		// Retrieve the new project open perspective preference setting
		String perspSetting = PrefUtil.getAPIPreferenceStore().getString(IDE.Preferences.PROJECT_OPEN_NEW_PERSPECTIVE);
		String promptSetting = IDEWorkbenchPlugin.getDefault().getPreferenceStore().getString(IDEInternalPreferences.PROJECT_SWITCH_PERSP_MODE);

		// Return if do not switch perspective setting and are not prompting
		if (!(promptSetting.equals(MessageDialogWithToggle.PROMPT))
				&& perspSetting.equals(IWorkbenchPreferenceConstants.NO_NEW_PERSPECTIVE)) {
			return;
		}

		// Read the requested perspective id to be opened.
		String finalPerspId = "org.eclipse.jdt.ui.JavaPerspective"; //$NON-NLS-1$
		if (finalPerspId == null) {
			return;
		}

		// Map perspective id to descriptor.
		IPerspectiveRegistry reg = PlatformUI.getWorkbench().getPerspectiveRegistry();

		// leave this code in - the perspective of a given project may map to
		// activities other than those that the wizard itself maps to.
		IPerspectiveDescriptor finalPersp = reg.findPerspectiveWithId(finalPerspId);
		if (finalPersp != null && finalPersp instanceof IPluginContribution) {
			IPluginContribution contribution = (IPluginContribution) finalPersp;
			if (contribution.getPluginId() != null) {
				IWorkbenchActivitySupport workbenchActivitySupport = PlatformUI.getWorkbench().getActivitySupport();
				IActivityManager activityManager = workbenchActivitySupport.getActivityManager();
				IIdentifier identifier = activityManager.getIdentifier(WorkbenchActivityHelper
						.createUnifiedId(contribution));
				Set idActivities = identifier.getActivityIds();

				if (!idActivities.isEmpty()) {
					Set enabledIds = new HashSet(activityManager.getEnabledActivityIds());

					if (enabledIds.addAll(idActivities)) {
						workbenchActivitySupport.setEnabledActivityIds(enabledIds);
					}
				}
			}
		} else {
			IDEWorkbenchPlugin.log("Unable to find persective " + finalPerspId //$NON-NLS-1$
					+ " in BasicNewProjectResourceWizard.updatePerspective"); //$NON-NLS-1$
			return;
		}

		// gather the preferred perspectives
		// always consider the final perspective (and those derived from it)
		// to be preferred
		ArrayList preferredPerspIds = new ArrayList();
		addPerspectiveAndDescendants(preferredPerspIds, finalPerspId);
		String preferred = configElement.getAttribute(PREFERRED_PERSPECTIVES);
		if (preferred != null) {
			StringTokenizer tok = new StringTokenizer(preferred, " \t\n\r\f,"); //$NON-NLS-1$
			while (tok.hasMoreTokens()) {
				addPerspectiveAndDescendants(preferredPerspIds, tok.nextToken());
			}
		}
		IWorkbenchWindow window = PlatformUI.getWorkbench().getActiveWorkbenchWindow();
		if (window != null) {
			IWorkbenchPage page = window.getActivePage();
			if (page != null) {
				IPerspectiveDescriptor currentPersp = page.getPerspective();
				// don't switch if the current perspective is a preferred
				// perspective
				if (currentPersp != null && preferredPerspIds.contains(currentPersp.getId())) {
					return;
				}
			}
			// prompt the user to switch
			if (!confirmPerspectiveSwitch(window, finalPersp)) {
				return;
			}
		}
		int workbenchPerspectiveSetting = WorkbenchPlugin.getDefault().getPreferenceStore()
				.getInt(IPreferenceConstants.OPEN_PERSP_MODE);
		// open perspective in new window setting
		if (workbenchPerspectiveSetting == IPreferenceConstants.OPM_NEW_WINDOW) {
			openInNewWindow(finalPersp);
			return;
		}
		// replace active perspective setting otherwise
		replaceCurrentPerspective(finalPersp);
	}

}
