# EDSDataSourceSamplePlugin

The external data service (EDS) data source sample plugin implements several PluginAPI methods that uses various data from internal files. It demonstrates how to implement a custom EDS data source plugin.  For example, this sample includes implementation of the following EDS capabilities:
* Simple validation using regular expressions
* Choice lists
* Dependent choice lists
* Workflow-specific choice lists

### Prerequisites

* IBM Content Navigator
* J2EE library
* [Apache Ant](http://ant.apache.org/)

### Installation
The EDSDataSourceSamplePlugin.jar can be built by following these steps:

1. Download the EDSDataSourceSamplePlugin source from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/EDSDataSourceSamplePlugin).
2. Create a **lib** directory under the **EDSDataSourceSamplePlugin** directory.
3. Add the navigatorAPI.jar and j2ee.jar files to the **lib** directory.
4. Build the JAR file by running Apache Ant.

    ```
    > cd EDSDataSourceSamplePlugin
    > ant
    ```

## Additional references

Please refer to the following links for additional information:
* [External Data Service](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucap001.htm)
* [Sample External Data Service](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucap005.htm)