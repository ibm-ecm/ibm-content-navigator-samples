# Profile plug-in

This sample profile plug-in demonstrates how to add user information pane from IBM sametime using a plug-in.

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 3.0.7 iFix 1 or later
* J2EE library
* [Apache Ant](http://ant.apache.org/)

### Additional Dependencies

* IBM FileNet Content Engine Java API

### Installing the plug-in
A profilePlugin JAR file is available for use in the samplePlugin's root directory. This can be used directly or built from scratch by following these steps:

1. Download the Profile plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/profilePlugin).
2. Create a **lib** directory under the profilePlugin.
3. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
4. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\profilePlugin
    C:\profilePlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.installingeuc.doc/eucco012.htm)

## Additional references

* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)