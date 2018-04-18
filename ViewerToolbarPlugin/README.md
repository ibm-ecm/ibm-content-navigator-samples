This plugin demonstrates how to add custom buttons to the viewer's toobars.


## Get the plugin
* Clone the repository: git clone https://github.com/ibm-ecm/ibm-content-navigator-samples.git


## Build the plugin

Run Ant Build using ibm-content-navigator-samples/ViewerToolbarPlugin/build.xml


ViewerToolbarPlugin.jar is generated under ibm-content-navigator-samples/ViewerToolbarPlugin

## Install the plugin
1. Login IBM Content Navigator and open the Admin desktop
2. Go to Plug-Ins in Admin desktop
3. New Plug-in. Input the full path of ViewerToolbarPlugin.jar in the "JAR file path" and click "Load" button.
4. Configure the buttons and click Save.  
- The path for the images can be within the plugin (eg. plugin/ViewerToolbarPlugin/getResource/images/SampleStamp.png), or  within the navigator web application folder (eg. ecm/widget/resources/images/ibmLogoDark.png).

![configuration](/ViewerToolbarPlugin/configuration.png)


## This plugin contains two examples for adding custom buttons
1. A custom button on the top toolbar of viewer.
-  The parameters for the button are set in filter() function of [ViewOneActionResponseFilter.java](/ViewerToolbarPlugin/src/com/ibm/ecm/extension/viewerToolbar/services/ViewOneActionResponseFilter.java)
-  The button execution and state evaluation functions are in [ViewerToolbarPlugin.js](/ViewerToolbarPlugin/src/com/ibm/ecm/extension/viewerToolbar/WebContent/ViewerToolbarPlugin.js)
2. A custom button on the left toolbar of viewer, to add an image stamp.
-  The parameters for the button are set in filter() function of [ViewOneBootstrapResponseFilter.java](/ViewerToolbarPlugin/src/com/ibm/ecm/extension/viewerToolbar/services/ViewOneBootstrapResponseFilter.java)

![image for examples](/ViewerToolbarPlugin/examples.png)

## Additional reference
1. barbutton parameter of viewer  
https://www.ibm.com/support/knowledgecenter/SSTPHR_5.0.3/com.ibm.viewone.configuring/dvopr113.htm
2. Image stamp settings of viewer  
http://www-01.ibm.com/support/docview.wss?uid=swg27043272
3. Javadoc for [JSONViewoneBootstrapResponse](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.3/com.ibm.javaeuc.doc/com/ibm/ecm/json/JSONViewoneBootstrapResponse.html)
