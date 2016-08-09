require(["dojo/_base/declare",
         "dojo/_base/lang",
         "userColumnSettingsDojo/ColumnSettingsDialog",
         "userColumnSettingsDojo/ConfigurationPane"], 
function(declare, lang, ColumnSettingsDialog) {		
	var columnSettingsDialog = null;
	
	lang.setObject("displayedColumnPreferences", function(repository, items, callback, teamspace, resultSet, parameterMap) {
		/*
		 * Opens a dialog that provides user settings for the columns they want displayed in Browse view.
		 */
		if (!columnSettingsDialog)
			columnSettingsDialog = new ColumnSettingsDialog();
		columnSettingsDialog.show();
		
	});
});
