This plugin demostrates how to add custom buttons to the viewer.


## Get the plugin
* Clone the repo: git clone https://github.com/ibm-ecm/ibm-content-navigator-samples.git


## Build the plugin

Run Ant Build using ibm-content-navigator-samples/ViewerToolbarPlugin/build.xml


ViewerToolbarPlugin.jar is generated under ibm-content-navigator-samples/ViewerToolbarPlugin

## Install the plugin
1. Login IBM Content Navigator and open the Admin desktop
2. Goto Plug-Ins in Admin desktop
3. New Plug-in. Input the full path of ViewerToolbarPlugin.jar in the "JAR file path" and click "Load" button.
4. Click Save.


## This plugin contains two examples to add custom buttons to viewer's toobars.
1. A custom button on the top toolbar of viewer.
-  The parameters for the button are set in filter() function of
   ibm-content-navigator-samples/ViewerToolbarPlugin/src/com/ibm/ecm/extension/viewerToolbar/services/ViewOneActionResponseFilter.java
-  The button execution and state evaluation functions are in
   ibm-content-navigator-samples/ViewerToolbarPlugin/src/com/ibm/ecm/extension/viewerToolbar/WebContent/ViewerToolbarPlugin.js
2. A custom button to add an image stamp on the left toolbar of viewer.
-  The parameters for the button are set in filter() function of
   ibm-content-navigator-samples/ViewerToolbarPlugin/src/com/ibm/ecm/extension/viewerToolbar/services/ViewOneBootstrapResponseFilter.java

