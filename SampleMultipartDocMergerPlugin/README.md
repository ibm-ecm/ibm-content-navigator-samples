# Multi Part Document Merge to PDF plug-in for IBM Content Manager

This sample plug-in demonstrates how to merge IBM Content Manager Multi Part Document (only for images) into one pdf file during download.

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 2.0.3.6 or later
* J2EE library
* IBM Content Manager SDK (in IBM Content Navigator lib path, cmbicmsdk81.jar)
* itext ((in IBM Content Navigator lib path, itext-13.2.jar))

### Installing the plug-in

1. Download the Multi Part Document Merge to PDF plug-in for IBM Content Manager from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/edit/master/SampleMultipartDocMergerPlugin).
2. Create a **lib** directory under the SampleMultipartDocMergerPlugin folder.
3. Copy the following libraries to the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).  
	* **navigatorAPI.jar** provided with IBM Content Navigator
	* **j2ee.jar** included with the application server
	* **cmbicmsdk81.jar** provided with IBM Content Navigator
	* **itext-13.2.jar** provided with IBM Content Navigator
4. Build the plug-in JAR file by running Apache Ant.

```
C:\> cd C:\SampleMultipartDocMergerPlugin
C:\SampleMultipartDocMergerPlugin> ant
```

5. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.installingeuc.doc/eucco012.htm)
7. Open IBM Content Navigator and download a multi part image document as original.


## Additional references

* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)
