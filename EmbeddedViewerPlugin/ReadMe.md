# EmbeddedViewerPlugin

A simple ICN plug-in that implements a thin wrapper around the ICN Content Viewer widget. The plug-in allows the content viewer to be loaded as a stand-alone ICN feature, suitable for presentation in a custom application. A basic JavaScript function is provided for opening one or more documents in this ContentViewer widget.

## Prerequisites

* IBM Content Navigator
* [Apache Ant](http://ant.apache.org/)

## Installation
A EmbeddedViewerPlugin JAR file is available for use in the root directory. It can also be built by following these steps:

1. Download the EmbeddedViewerPlugin from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/EmbeddedViewerPlugin).
2. Create a **lib** directory under the EmbeddedViewerPlugin.
3. Add the navigatorAPI.jar to the **lib** directory, and update the **classpath** in the build.xml to point to the **lib** directory.
4. Build the JAR file by running Apache Ant.

    ```
    C:\> cd C:\EmbeddedViewerPlugin
    C:\EmbeddedViewerPlugin> ant
    ```

## Additional references

* [EmbeddedViewer Plugin Part I](https://www.ibm.com/support/pages/node/1280704?lang=en)
* [EmbeddedViewer Plugin Part II](https://www.ibm.com/support/pages/node/1280698?lang=en)
* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)
