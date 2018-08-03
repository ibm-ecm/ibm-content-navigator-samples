require(["dojo/_base/declare",
         "dojo/_base/lang"], 
function(declare, lang) {		
	
	var loadCSS = function(cssFileUrl){
		if (dojo.isIE) {
			document.createStyleSheet(cssFileUrl);
		} else {
			var head = document.getElementsByTagName("head")[0];
			var link = document.createElement("link");
			link.setAttribute('rel', "stylesheet");
			link.setAttribute('type', "text/css");
			link.setAttribute('href', cssFileUrl);
			head.appendChild(link);
		}
	};

	var loadJS = function(src, callback){
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = callback;
        document.body.appendChild(script);
	};

	//Load css files
//	loadCSS("plugin/UserColumnSettingsPluginReact/Plugin/getResource/userColumnSettings/build/ReactUserColumnSettings.css");

	//Load js files
	loadJS("plugin/UserColumnSettingsPluginReact/getResource/userColumnSettings/build/icn-react.min.js", function(){

		lang.setObject("displayedColumnPreferencesReact", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			/*
			 * Opens a dialog that provides user settings for the columns they want displayed in Browse view.
			 */
			if (window.icnReactService) {
				// remove it first
				window.icnReactService.sendMessage({
					message: 'remove_user_column_settings_dialog',
					containerId: 'icn-user-columns-container'
				});
				// render email dialog
				window.icnReactService.sendMessage({
					message: 'render_user_column_settings_dialog',
					containerId: 'icn-user-columns-container'
				});
			}
			
		});
	});

});
