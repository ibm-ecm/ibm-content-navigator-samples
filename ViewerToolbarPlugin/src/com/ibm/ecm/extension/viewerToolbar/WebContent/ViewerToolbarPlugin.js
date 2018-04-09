require(["dojo/_base/declare",
         "dojo/_base/lang",
         "viewerToolbarPlugin/MessagesDialog",
], 
	function(declare, lang, MessagesDialog) {
			
		var messagesDialog = null;

		/* execute the Viewer Toolbar Plugin Action */
		lang.setObject("viewerToolbarPluginAction", function () {
			if (!messagesDialog)
				messagesDialog = new MessagesDialog();

			messagesDialog.addMessage("The viewer toolbar plugin action has been invoked."); 
		});

		/* evaluate the button state for the Viewer Toolbar Plugin Action */
		lang.setObject("viewerToolbarPluginActionEval", function () {
			// refer to https://www.ibm.com/support/knowledgecenter/SSTPHR_5.0.3/com.ibm.viewone.configuring/dvopr113.htm
			return 5;
		});

});

