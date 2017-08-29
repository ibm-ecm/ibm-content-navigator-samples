# Eclipse Plug-in for IBM Content Navigator development

The Eclipse Plug-in allows for the creation of new projects utilizing the Eclipse IDE. Using this extension within your environment avoids project setup errors and makes it easy to get started with ICN customization and plug-in development.

For more information on IBM Content Navigator development, see the IBM Redbook publication:

[Customizing and Extending IBM Content Navigator](http://www.redbooks.ibm.com/Redbooks.nsf/RedpieceAbstracts/sg248055.html?Open).

Use these instructions to help you get the plug-in up and running in Eclipse. It can be used as a guideline if users run into issues with future updates of Eclipse/RAD.

### Installing the plug-in

1. Download Eclipse plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/eclipsePlugin).

2. Import eclipsePlugin project into the instance of Eclipse you are using.

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

   **Note:**

   you may get this error message in Eclipse Console: 
   
   *failed to create task or type pde.exportPlugins Cause: The name is undefined.*

   The reason is that the ant script is running in a different JVM than the eclipse workspace.

   Fix: In Ant build configuration, goto the JRE tab and change to use the same JRE as the workspace. this issue will be    resolved.

6. In destination path,please unzip icnplugins.zip file,and get the com.ibm.ecm.icn.plugin.jar file 


7. Copy com.ibm.ecm.icn.plugin.jar file into Eclipse dropins folder and restart Eclipse

### For Eclipse Oxygen

The buildTools.xml will cause a cycle error. You can just export the project as eclipse plugin. Check on "Allow for binary cycles in target platform", and check OFF "Use class files compiled in the workspace". The execution environments may need to be changed to java 1.8. Then copy the plugin jar file to eclipse dropins folder.
