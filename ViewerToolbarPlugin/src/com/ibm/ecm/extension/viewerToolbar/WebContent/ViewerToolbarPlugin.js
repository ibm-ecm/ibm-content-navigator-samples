require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/aspect",
         "ecm/model/Desktop",
         "ecm/widget/virtualViewer/ViewoneHTMLViewer",
         "viewerToolbarPlugin/MessagesDialog",
], 
	function(declare, lang, aspect, Desktop, ViewoneHTMLViewer, MessagesDialog) {
			
		var messagesDialog = null;

		// add event handler for custom button 1 on the top toolbar
		lang.setObject("viewerToolbarPluginTopButton1Handler", function () {
			if (!messagesDialog)
				messagesDialog = new MessagesDialog();

			messagesDialog.addMessage("Button 1 is clicked"); 
		});

		// evaluate the state of custom button 1 on the top toolbar
		lang.setObject("viewerToolbarPluginTopButton1Eval", function () {
			// refer to https://www.ibm.com/support/knowledgecenter/SSTPHR_5.0.8/com.ibm.viewone.configuring/dvopr113.htm
			return 5;
		});
		
		// evaluate the state of custom button 2 on the top toolbar 
		lang.setObject("viewerToolbarPluginTopButton2Eval", function () {
			// refer to https://www.ibm.com/support/knowledgecenter/SSTPHR_5.0.8/com.ibm.viewone.configuring/dvopr113.htm
			return 5;
		});
		
		// add event handler for custom button 2 on the top toolbar 
		aspect.after(ViewoneHTMLViewer.prototype, "_attachViewerEvent", function() {	
			// add the handler to ViewoneHTMLViewer to get the viewer instance
			window[this.viewerId + "_deleteItem"] = lang.hitch(this, "_deleteItem");		
		});

		// calls the default delete action and then close the viewer
		ViewoneHTMLViewer.prototype._deleteItem = function() {
			console.log("viewerId: " + this.viewerId);
			console.log("docid: " + this._item.id);
			Desktop.getActionsHandler().actionDeleteItem(this._item.repository, [this._item], lang.hitch(this, function() {
				var tab = this.contentViewerPane.contentViewerTab;
				if (tab != null) { // viewer is opened in a child window
					// close the viewer tab
					tab.tabContainer._actionViewerTabClose(this._item, tab);						
				} else { // viewer is in ICN window
					// close the viewer dialog
					var contentDialog = ecm.content.ContentDialog.singleton();
					if (contentDialog != null)
						contentDialog.onClose();					
				} 
			}, true));
		};

});

