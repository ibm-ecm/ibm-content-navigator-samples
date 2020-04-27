# Dependent plug-in

This plugin is created for the purpose of testing ICN's ability to load multiple plugins with dependent ones (i.e plugin uses elements of other plugins)


### Prerequisites

* IBM Content Navigator 3.0.7 iFix 1 or later
* J2EE library
* [Sample Plugin Jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/SamplePlugin). Download and ant-build the jar

### Installing the plug-in

1. Download the Dependent plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/DependentPlugin).
2. Create a **lib** directory under the SamplePlugin.
3. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
4. Edit the icn web path in build.properties, and also reference the path to the downloaded Dojo ToolKit.
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\DependentPlugin
    C:\DependentPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.installingeuc.doc/eucco012.htm)
