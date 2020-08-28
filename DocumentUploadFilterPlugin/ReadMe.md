# Document Upload Filter plug-in

This plugin is used to specify document MIME types that can be uploaded, using ICN Add-Item dialogue. Hence, restrict MIME types that are not specified.
In the Admin Configuration Pane, you can enter allowed MIME types, using the format **fileType/extension**. For example, a CSV and PDF document will be defined as text/csv and application/pdf respectively.


### Prerequisites

* IBM Content Navigator 3.0.7
* J2EE library

### Installing the plug-in

1. If you would like to build this plug-in, proceed with step 2; otherwise, you can download the [documentUploadFilterPlugin.jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/DocumentUploadFilterPlugin/documentUploadFilterPlugin.jar) file and skip to step 6.
2. Download the DocumentUploadFilter plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/DocumentUploadFilterPlugin).
3. Create a **lib** directory under the DocumentUploadFilter.
4. Copy all the dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
    * **navigatorAPI.jar** provided with IBM Content Navigator
    * **j2ee.jar** included with the application server
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\DocumentUploadFilterPlugin
    C:\DocumentUploadFilterPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.installingeuc.doc/eucco012.htm)
7. Set the desired **allowed MIME types** and save the plug-in.
8. Reload IBM Content Navigator.