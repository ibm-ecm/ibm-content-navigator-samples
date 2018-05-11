This plugin is a sample demostrate how to develop ICN Plugin UI using React.
User can customize ICN UI using React after read this sample.



## Get the plugin
* Clone the repo: git clone https://github.ibm.com/ECM-Nexus/icn-plugins.git


## Build the plugin

1. Make sure the NPM and ANT are installed.
2. cd icn-plugins/ReactUserColumnSettingsPlugin
3. Open build.xml. Search for "npmPath" at line 5. Update your NPM path in the value if the path is not default NPM path on your environment.
4. ant -f build.xml 

ReactUserColumnSettingsPlugin.jar is generated under icn-plugins/ReactUserColumnSettingsPlugin

## Install the plugin
1. Login IBM Content Navigator and open the Admin desktop
2. Goto Plug-Ins in Admin desktop
3. New Plug-in. Input the ReactUserColumnSettingsPlugin.jar full path in the "JAR file path" and click "Load" button.
4. There should be an action named "Displayed Column Preferences(React)".  Save.


## Configure ICN menu using the plugin.
1. Goto Menus in Admin desktop.
2. Find and select the "Default banner user session context menu". (Search "banner" by filter)
3. Click Copy button on toolbar.
4. Give the copied menu a name like "React User Column Setting Menu".  Add actions with "Displayed Column Preferences(React)" from available list to selected menus. Save.
5. Goto Desktops in Admin desktop.Edit your desktop.
6. Goto "Menus" tab and find the "Banner user session context menu"
7. Select "React User Column Setting Menu" from the drop down list.  Save

Refresh browser. You will see the "Displayed Column Preferences(React)" menu when you click on username on banner.
