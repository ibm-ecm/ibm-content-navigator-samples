# Custom Event plug-in

This plug-in demonstrates how to create custom events in P8 repositories for specific actions.

If a P8 repository is configured for auditing, events may be recorded for historical changes and operations on documents. For example, the Get Content events are created when the content of a document is retrieved. There are multiple actions in ICN that can involve document retrieval, such as views and downloads. Using Get Content events is unable to distinguish between the actions. This plug-in can be used to audit the actions. It includes examples to create custom view events for view actions, and to create custom download events for download actions. You may follow the installation and configuration instructions in this guide. Then when the documents are viewed or downloaded, the custom events are recorded. You may view the document history in ICN to see the custom events.

[RaiseEventService.java](/CustomEventPlugin/src/com/ibm/ecm/extension/customEvent/RaiseEventService.java) is the plug-in service that creates custom events for associated actions.

[CustomEventPlugin.js](/CustomEventPlugin/src/com/ibm/ecm/extension/customEvent/WebContent/CustomEventPlugin.js) has functions that connect to the view and download actions. When an action is performed, the plug-in service "RaiseEventService" is invoked.

[Constants.java](/CustomEventPlugin/src/com/ibm/ecm/extension/customEvent/Constants.java) defines the event and action mapping, and can be customized for other events and actions.

## Prerequisites

* IBM Content Navigator 3.0.9 or above


## Get the plug-in
* Clone the repository: git clone https://github.com/ibm-ecm/ibm-content-navigator-samples.git


## Build the plug-in

Run Ant Build using ibm-content-navigator-samples/CustomEventPlugin/build.xml


CustomEventPlugin.jar is generated under ibm-content-navigator-samples/CustomEventPlugin

## Install the plug-in
1. Log in to IBM Content Navigator and open the Admin desktop
2. Go to Plug-Ins in Admin desktop
3. New Plug-in. Input the full path of CustomEventPlugin.jar in the "JAR file path" and click "Load" button.
4. Click Save.  


## Configure the custom events
The following example shows how to configure the custom events to audit document class.
1. Log in to ACCE.

2. Create the custom events.
- Go to ACCE -> Object Store -> Data Design -> Classes -> Other Classes -> Event -> Object Change Event -> Custom Event.
- Open Custom Event. Click Actions -> New Class, input the names and description. Then click Next -> Finish. Create "ICN View Event" and "ICN Download Event" as below.

![ICN View Event](/CustomEventPlugin/ICN%20View%20Event.png)

![ICN Download Event](/CustomEventPlugin/ICN%20Download%20Event.png)

3. Create the audit definition for the document class.
- Open the document class. On tab "Audit Definitions", click New. 
- Input the fields to create Audit Definitions for "ICN View Event" and "ICN Download Event" like below. Check "Apply to subclasses" if need to audit all subclasses.

![Audit Definition-View](/CustomEventPlugin/Audit%20Definition-View.png)

![Audit Definition-Download](/CustomEventPlugin/Audit%20Definition-Download.png)

- Click OK. Then click Save.


## Customizing the plug-in
The following example shows how to customize the plug-in if other custom events are created or other actions are audited.
1. Map the action id to the custom event id in [Constants.java](/src/com/ibm/ecm/extension/customEvent/Constants.java).

```
    put("action_id", "event_id");
```
2. Add functions in [CustomEventPlugin.js](/CustomEventPlugin/src/com/ibm/ecm/extension/customEvent/WebContent/CustomEventPlugin.js) to invoke plug-in service "RaiseEventService" when specific actions are performed.


## Additional reference
1. [Configuring audit history](https://www.ibm.com/docs/en/content-navigator/3.0.x?topic=repository-configuring-audit-history)

2. [Using CPE Auditing](https://www.ibm.com/support/knowledgecenter/SSNW2F_5.5.0/com.ibm.p8.ce.dev.ce.doc/audit_concepts.htm)
