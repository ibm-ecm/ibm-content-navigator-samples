define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"ecm/widget/layout/_LaunchBarPane",
	"dojo/text!./templates/ReactMainPane.html"
],
function(declare, lang, _LaunchBarPane, template) {
	return declare("reactEmailDialogPlugin.ReactMainPane", [ _LaunchBarPane ], {
		templateString: template,
		widgetsInTemplate: true,

		
		startup: function(){
			//Load React components
//			require(["ecm/reactui/components/bundle"], function(){
//				console.log("React components is loaded");
//			});
			
		},
		
		loadContent: function() {
			this.logEntry("loadContent");
			//publish event to notify React widget refresh
//			if(ICNPluginEvent){
//				ICNPluginEvent.publish("ReactWidget.Refresh","");
//			}
//			if(messageService){
//				messageService.publish("ReactWidget.Refresh", {message: "refresh charts"});
//			}
			reactServiceForEmailDialog.sendMessage({
				message: 'render_test_ui',
				containerId: "FeatureRootPane"
			})
			this.logExit("loadContent");
		}
	});
});
