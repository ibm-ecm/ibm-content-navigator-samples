This plugin is a sample demostrate how to auto start afp2pdf plus service when ICN application initialized in container.

## Get the plugin
* Clone the repo: git clone https://github.com/ibm-ecm/ibm-content-navigator-samples.git


## Build the plugin

1. Make sure the ANT is installed.
2. cd icn-plugins/AFP2PDFPlusPlugin
3. ant -f build.xml 

AFP2PDFPlusPlugin.jar is generated under icn-plugins/AFP2PDFPlusPlugin

## Install the plugin
1. Copy the AFP2PDFPlusPlugin.jar and icnafp2pdfplusplugin.properties to /opt/ibm/plugins
2. Change the value of afp2pdfplus_install_path in icnafp2pdfplusplugin.properties if install path is not /opt/ibm/plugins/afp2pdftransform
3. Login IBM Content Navigator and open the Admin desktop
4. Goto Plug-Ins in Admin desktop
5. New Plug-in. Input the AFP2PDFPlusPlugin.jar full path in the "JAR file path" and click "Load" button.
6. Save.
	
## Using the plugin.

When ICN application restart and initialized, afp2pdf plus service is auto start.

## Notes:

this plugin only supports Content Manager Ondemand



