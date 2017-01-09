# Navigation Layout Refresh plug-in

This sample plug-in demonstrates how to define a custom layout for IBM Content Navigator and apply the desktop's theme to the layout.
The layout consists of a horizontal navigation bar with a drop-down menu for selecting feature panes and tabs for accessing secondary feature panes.
For example, selecting Home in the features menu gives you access to the Favorites and My Checkouts tabs.

![navlayoutrefreshplugin](https://cloud.githubusercontent.com/assets/19176545/21283581/a3e056c4-c3b9-11e6-9c66-daeda42d0c25.jpg "Navigation Layout Refresh plug-in")

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 3.0 or later
* J2EE library
* [Apache Commons Lang 2.6](https://commons.apache.org/proper/commons-lang/)
* [Apache Commons Configuration 1.7](https://commons.apache.org/proper/commons-configuration/)
* [Apache Ant](http://ant.apache.org/)

### Installing the plug-in

1. Download the Navigation Layout Refresh plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/NavLayoutRefreshPlugin).
2. Create a **lib** directory under the NavLayoutRefreshPlugin folder.
3. Copy the following libraries to the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).  
	* **navigatorAPI.jar** provided with IBM Content Navigator
	* **j2ee.jar** included with the application server
	* **commons-lang-2.6.jar**
	* **commons-configuration-1.7.jar**
4. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\NavLayoutRefreshPlugin
    C:\NavLayoutRefreshPlugin> ant
    ```
5. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.installingeuc.doc/eucco012.htm)
6. Create a desktop in IBM Content Navigator that uses the layout and features provided by the plug-in by doing the following procedure:
	1. In the **Layout** tab, select the **Navigation Layout** feature.
	2. Clear the default **Home** feature from the list of **Displayed features**.
	3. Select the **Home** feature provided by the plug-in and move it to the top of the list of **Displayed features**.
	4. Select the **Home** feature as the **Default feature**.
7. Open IBM Content Navigator using the desktop you just created.

    ```
    http://localhost/navigator/?desktop=<desktop_id>
    ```

## Additional references

* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)
