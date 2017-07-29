# Search Page Size plug-in

This sample plug-in demonstrates how to customize the number of items per page returned by a search. It levereges the `onSearchTemplatePrepared` extension point of the `ecm.widget.search.SearchBuilder` and `ecm.widget.search.SearchForm` widget to set the configured page size on the search template before it runs.

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 2.0.3.3 or later
* J2EE library
* [Apache Ant](http://ant.apache.org/)

### Installing the plug-in

1. Download the Search Page Size plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/SearchPageSizePlugin).
2. Create a **lib** directory under the SearchPageSizePlugin folder.
3. Copy the following libraries to the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).  
	* **navigatorAPI.jar** provided with IBM Content Navigator
	* **j2ee.jar** included with the application server
4. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\SearchPageSizePlugin
    C:\NavLayoutRefreshPlugin> ant
    ```
5. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.installingeuc.doc/eucco012.htm)
6. Set the desired **Search page size** and save the plug-in.
7. Reload IBM Content Navigator to use the new page size.

## Additional references

* [Number of rows retrieved in an IBM Content Navigator (ICN) search](http://www-01.ibm.com/support/docview.wss?uid=swg21985852)
* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)
