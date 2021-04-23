# Email Lookup plug-in

This plug-in provides a custom input field with email lookup capabilities that is used to add emails to the To, CC, and BCC lists in the Email Dialog. As a user types in the input field, a list of matching email addresses is displayed in a drop-down.

### Prerequisites

* IBM Content Navigator 3.0.7 or above
* J2EE library

### Installing the plug-in

1. If you would like to build this plug-in, proceed with step 2; otherwise, you can download the [emailLookupPlugin.jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/CustomEmailPlugin/emailLookupPlugin.jar) file and skip to step 6.
2. Download the Email Lookup plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/EmailLookupPlugin).
3. Create a **lib** directory under the EmailLookupPlugin.
4. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
    * **navigatorAPI.jar** provided with IBM Content Navigator
    * **j2ee.jar** included with the application server
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\EmailLookupPlugin
    C:\EmailLookupPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.8/com.ibm.installingeuc.doc/eucco012.htm)
7. Reload IBM Content Navigator to use the register the changes.