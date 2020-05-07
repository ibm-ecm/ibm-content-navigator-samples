# SampleEDSService

The sample external data service (EDS) implements a service that uses various data from an external source. For example, this sample includes the implementations of the following EDS capabilities:
Simple validation using regular expressions
Choice lists
Dependent choice lists
Workflow-specific choice lists

### Prerequisites

* IBM Content Navigator
* J2EE library
* [Apache Ant](http://ant.apache.org/)

### Installation

1. Download the SampleEDSService from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/SampleEDSService).
2. Create a **lib** directory under the SampleEDSService.
3. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included).
4. Build the WAR file by running Apache Ant.

    ```
    C:\> cd C:\SampleEDSService
    C:\SampleEDSService> ant
    ```

## Additional references

Please refer to the following links for additional information.
* [External Data Service](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucdv001.htm)
* [Sample External Data Service](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucap005.htm)