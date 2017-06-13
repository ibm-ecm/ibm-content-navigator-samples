# Build up Eclipse Plug-in for IBM Content Navigator development

The Eclipse Plug-in eases the creation of new projects for ICN Plug-ins. Using this extension within your development environment avoids project setup errors and makes it easy to get started with ICN development.

 For more information on IBM Content Navigator development, see IBM Redbooks publication:

     [Customizing and Extending IBM Content Navigator](http://www.redbooks.ibm.com/Redbooks.nsf/RedpieceAbstracts/sg248055.html)

Use these instructions to help you get the plug-in up and running in Eclipse. It can be used as a guideline if users run into issues with future updates of Eclipse/RAD.

### Installing the plug-in

1. Download Eclipse plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/eclipsePlugin).

2. Import eclipsePlugin project into Eclipse you are using.

3. Update versions info in META-INF/MANIFEST.MF following jar files in Plug-in Dependencies folder

For example, update bundle-version number for Eclipse Neon in MANIFEST.MF
    ```
 org.eclipse.core.resources;bundle-version="3.11.0",
 org.eclipse.jdt.core;bundle-version="3.12.0",
 org.eclipse.jdt.launching;bundle-version="3.8.100",
 org.eclipse.ui.ide;bundle-version="3.12.0",
 org.eclipse.wst.jsdt.core;bundle-version="2.0.0",
 org.eclipse.text;bundle-version="3.6.0",
 org.eclipse.core.expressions;bundle-version="3.5.100",
 org.eclipse.ui.forms;bundle-version="3.7.0"

    ```
4. Update buildTools.xml, change destination="/Users/username/git/"  to valid folder path

5. Run buildTools.xml as Ant Build

Note:
you may get this message in eclipse Console: failed to create task or type pde.exportPlugins Cause: The name is undefined.
it appears that the ant script is running in a different JVM than the eclipse workspace. The workspace context is what makes pde.exportPlugins available.
In Ant build configuration, goto the JRE tab and hange to use the same JRE as the workspace will solve this issue.

6. In destination path,please unzip icnplugins.zip file,and get the com.ibm.ecm.icn.plugin.jar file 


7. Copy com.ibm.ecm.icn.plugin.jar file to dropins folder and restart Eclipse
