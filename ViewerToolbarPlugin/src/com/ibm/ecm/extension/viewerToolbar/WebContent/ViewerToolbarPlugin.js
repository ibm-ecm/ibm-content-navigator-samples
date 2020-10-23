require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/aspect",
         "ecm/model/Action",
         "ecm/model/Desktop",
         "ecm/widget/virtualViewer/ViewoneHTMLViewer",
         "viewerToolbarPlugin/MessagesDialog",
], 
	function(declare, lang, aspect, Action, Desktop, ViewoneHTMLViewer, MessagesDialog) {
			
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
				
		// add functions for custom button 2 on the top toolbar. Attach to ViewoneHTMLViewer to get the viewer instance.
		aspect.after(ViewoneHTMLViewer.prototype, "_attachViewerEvent", function() {
			// event handler
			window[this.viewerId + "_viewerToolbarPluginDeleteItem"] = lang.hitch(this, "_viewerToolbarPluginDeleteItem");
			
			// evaluate the button state
			window[this.viewerId + "_viewerToolbarPluginEvalDeleteItem"] = lang.hitch(this, "_viewerToolbarPluginEvalDeleteItem");	
		});

		// calls the default delete action and then close the viewer
		ViewoneHTMLViewer.prototype._viewerToolbarPluginDeleteItem = function() {
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
		
		// enable/disable the delete button per privilege
		ViewoneHTMLViewer.prototype._viewerToolbarPluginEvalDeleteItem = function() {
			var action = new Action({
				id: "DeleteItem",
				privilegeName: "privDelete"
			});
			var enabled = action.canPerformAction(this._item.repository, [this._item]);
			if (enabled) 
				return 5;
			else
				return 3;
		};

});

