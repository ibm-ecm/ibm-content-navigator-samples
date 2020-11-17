# Test Upload plug-in for IBM Content Navigator

This sample plug-in demonstrates how to upload files by a plugin.

It is just a sample, so please try it and adjust code to make it suit your system.

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 3.0.7 or later
* J2EE library
* IBM Content Navigator icncore.jar file

### Installing the plug-in

1. Download the Test Upload plug-in for IBM Content Navigator.
2. Create a **lib** directory under the TestUploadPlugin folder.
3. Copy the following libraries to the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).  
	* **icncore.jar** provided with IBM Content Navigator, in exploadedFormat folder.
	* **j2ee.jar** included with the application server
4. Build the plug-in JAR file by running Apache Ant.

```
C:\> cd C:\TestUploadPlugin
C:\TestUploadPlugin> ant
```

5. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.installingeuc.doc/eucco012.htm)
7. Open IBM Content Navigator, configure the upload action to some menu and click it to test.


## Additional references

* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)
