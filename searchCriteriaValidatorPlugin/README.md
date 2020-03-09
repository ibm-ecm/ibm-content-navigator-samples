# Search Criteria Validator plug-in

This sample plug-in demonstrates how to restrict date search operators to 'Equals', 'Between', and 'Is Empty', to prevent open-ended searches that may return a large number of results. Also, when building or running a saved search, it validates the search criteria to ensure that the range is within the configured threshold (e.g. within 31 days), and that wildcards (*) aren't used with Like operator variants. It intercepts the "_search" method of the "ecm.widget.search.BasicSearchDefinition" and "ecm.widget.search.SearchTab" widgets to determine whether the search is allowed to execute or not based on the set criteria. 

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 3.0 or later
* J2EE library
* [Apache Ant](http://ant.apache.org/)

### Installing the plug-in

1. Download the Search Criteria Validator  plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/SearchCriteriaValidatorPlugin).
2. Create a **lib** directory under the SearchCriteriaValidatorPlugin folder.
3. Copy the following libraries to the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).  
	* **navigatorAPI.jar** provided with IBM Content Navigator
	* **j2ee.jar** included with the application server
4. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\SearchCriteriaValidatorPlugin
    C:\SearchCriteriaValidatorPlugin> ant
    ```
5. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.installingeuc.doc/eucco012.htm)
6. Set the desired **Search page size** and save the plug-in.
7. Reload IBM Content Navigator to use the new page size.

## Additional references

* [Number of rows retrieved in an IBM Content Navigator (ICN) search](http://www-01.ibm.com/support/docview.wss?uid=swg21985852)
* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://develop)