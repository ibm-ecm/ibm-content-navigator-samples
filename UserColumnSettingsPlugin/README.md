This plugin demonstrates how to configure columns in Browse view.


## Get the plugin
* Clone the repository: git clone https://github.com/ibm-ecm/ibm-content-navigator-samples.git


## Build the plugin
1. Download the dojo source zip from http://download.dojotoolkit.org/ .
- For example, download http://download.dojotoolkit.org/release-1.10.4/dojo-release-1.10.4-src.zip for IBM Content Navigator 3.0.4.
2. Revise the build script [build.xml](/UserColumnSettingsPlugin/build.xml).
- Set the value of property "dojo_src_zip" to the path of the dojo source zip.
- Set the value of property "icn_path" to the path of the folder where IBM Content Navigator is installed. For example, "C:\Program Files\IBM\ECMClient\configure\explodedformat\navigator".
3. (Optional) Revise the profile [UserColumnSettings.profile.js](/UserColumnSettingsPlugin/UserColumnSettings.profile.js), if there are custom JS modules.
- Add your classes under UserColumnSettings like below.
```
	layers: {
		"userColumnSettingsDojo/UserColumnSettings": {
			include: [
				"userColumnSettingsDojo/UserColumnSettings",
				"userColumnSettingsDojo/CustomDialog"
			]
```
4. (Optional) Revise the [UserColumnSettings.css](/UserColumnSettingsPlugin/src/com/ibm/ecm/extension/WebContent/UserColumnSettings.css) file to include your CSS files.
```
    @import url("./CustomDialog.css");
    @import url("./CustomWidget.css");         
```
5. Run Ant Build using [build.xml](/UserColumnSettingsPlugin/build.xml).
- UserColumnSettingsPlugin.jar is generated under ibm-content-navigator-samples/UserColumnSettingsPlugin

## Install the plugin
1. Login IBM Content Navigator and open the Admin desktop
2. Go to Plug-Ins in Admin desktop
3. New Plug-in. Input the full path of UserColumnSettingsPlugin.jar in the "JAR file path" and click "Load" button.
4. Click Save.  

## Enable the custom action
1. Login IBM Content Navigator and open the Admin desktop
2. Go to Menus in Admin desktop
3. Select the menu "Default Content List toolbar" and click Copy.
4. Input Name and ID for your new menu, and move "Displayed Column Preferences" action from left to right.
5. Click Save.  

![new menu](/UserColumnSettingsPlugin/menu.png)

6. Go to Desktops in Admin desktop
7. Select the desktop where you want to configure the columns in the Browse view, and click Edit.
8. Go to Menus tab of the desktop, select the newly created menu for "Content List toolbar" and click Save.

![configure desktop](/UserColumnSettingsPlugin/desktop.png)

## Configure the columns display
The following example shows how to display an additional column for the Class name.
1. Login the desktop and go to Browse view.

![action on toolbar](/UserColumnSettingsPlugin/toolbar.png)

2. Click "Displayed Column Preferences" button on toolbar.

![preferences](/UserColumnSettingsPlugin/preferences.png)

3. Select a repository from the repository drop down list.
4. Un-check "Use the default Browse view settings" option.
5. Move "Class Name" from left to right, and click OK.
6. Go to a sub-folder in the repository. You will see the newly added Class column.

![new columns display](/UserColumnSettingsPlugin/columns.png)
