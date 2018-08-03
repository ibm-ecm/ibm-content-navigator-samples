require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/aspect",
         "ecm/widget/layout/CommonActionsHandler"], 
function(declare, lang,aspect,CommonActionsHandler) {		

	var loadCSS = function(cssFileUrl){
		if (dojo.isIE) {
			document.createStyleSheet(cssFileUrl);
		} else {
			var head = document.getElementsByTagName("head")[0];
			var link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = cssFileUrl;
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
	loadCSS("./plugin/ReactEmailDialogPlugin/getResource/reactEmailDialogPlugin/build/icn-react.min.css");

	//Load js files
	loadJS("plugin/ReactEmailDialogPlugin/getResource/reactEmailDialogPlugin/build/icn-react.min.js", function(){

		var _showEmailDialog = function(items, attachmentType,version) {
			if (window.icnReactService) {
				// remove it first
                window.icnReactService.sendMessage({
					message: 'remove_email_dialog',
					containerId: 'icn-emaildialog-container'
                });
				// render email dialog
				window.icnReactService.sendMessage({
					message: 'render_email_dialog', 
					attachments: items,
					attachmentType: attachmentType,
					attachmentVersion: version
				});
			}
		}
		//Send mail as link
		lang.setObject("reactSendEmailAsLink", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			var version = items[0]._getSearchVersion(resultSet, repository);
			version = version ? version : repository._isP8() ? "released" : null;
			_showEmailDialog(items, "link", version);
		});

		//Send mail as attachment
		lang.setObject("reactSendEmailAsAttachment", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			var version = items[0]._getSearchVersion(resultSet, repository);
			version = version ? version : repository._isP8() ? "released" : null;
			_showEmailDialog(items, "attachment",version);
		});

		//Send mail as PDF
		lang.setObject("reactSendEmailAsPDF", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			var version = items[0]._getSearchVersion(resultSet, repository);
			version = version ? version : repository._isP8() ? "released" : null;
			_showEmailDialog(items, "pdf",version);
		});

		//Send mail all as attachment
		lang.setObject("reactSendEmailAllAsAttachment", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			var version = items[0]._getSearchVersion(resultSet, repository);
			version = version ? version : repository._isP8() ? "released" : null;
			_showEmailDialog(items, "allParts",version);
		});

		//Send mail all as PDF
		lang.setObject("reactSendEmailAllAsPDF", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			var version = items[0]._getSearchVersion(resultSet, repository);
			version = version ? version : repository._isP8() ? "released" : null;
			_showEmailDialog(items, "allPartsPdf",version);
		});
	});

});
