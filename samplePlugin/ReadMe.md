# Sample plug-in

This sample plug-in demonstrates how to add various extension points using a plug-in.

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 3.0.7 iFix 1 or later
* J2EE library
* [Apache Ant](http://ant.apache.org/)
* [Dojo ToolKit](https://dojotoolkit.org/download/)

### Additional Dependencies

* IBM FileNet Content Engine Java API
* IBM Content Manager Java API
* Box Java SDK
* ODWEK Java API
* OpenCMIS Client API
* Apache - Commons lang, Commons IO, Common Codec

### Installing the plug-in

1. Download the Sample plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/SamplePlugin).
2. Create a **lib** directory under the SamplePlugin.
3. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
4. Edit the icn web path in build.properties, and also reference the path to the downloaded Dojo ToolKit.
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\SamplePlugin
    C:\SamplePlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.installingeuc.doc/eucco012.htm)

## Additional references

* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)