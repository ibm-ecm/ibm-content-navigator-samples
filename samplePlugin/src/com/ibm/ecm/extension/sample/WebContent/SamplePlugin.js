/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/_base/declare",
         "dojo/_base/lang",
		 "ecm/model/Request",
		 "ecm/model/EntryTemplate",
		 "ecm/widget/ItemPropertiesPane",
		 "samplePluginDojo/MessagesDialog",
		 "samplePluginDojo/PopupDialog",
		 "samplePluginDojo/SampleDecorator",
		 "samplePluginDojo/FileUploadPopupDialog",
		 "samplePluginDojo/SampleItemPropertiesPaneExtension",
		 "samplePluginDojo/ConfigurationPane",
		 "samplePluginDojo/CustomAction",
		 "samplePluginDojo/FeatureConfigurationPane",
		 "samplePluginDojo/FileUploadCustomAction",
		 "samplePluginDojo/SampleFavoritesPane",
		 "samplePluginDojo/SampleFeaturePane",
		 "samplePluginDojo/SampleLayout",
		 "samplePluginDojo/SamplePropertyEditor",
		 "samplePluginDojo/SamplePropertyFormatter",
		 "samplePluginDojo/SampleRepositoryConfigurationParametersPane",
		 "samplePluginDojo/SampleRepositoryGeneralConfigurationPane",
		 "samplePluginDojo/SampleRepositoryModel",
		 "samplePluginDojo/asyncTasks/ICNSampleSearchTaskDialog",
		 "samplePluginDojo/asyncTasks/ICNSampleSearchTaskInformationPane",
		 "samplePluginDojo/asyncTasks/ICNSampleSearchTaskResultsPane",
		 "samplePluginDojo/asyncTasks/ICNSampleTaskCreationDialog",
		 "samplePluginDojo/asyncTasks/ICNSampleTaskCreationPane",
		 "samplePluginDojo/SampleFavorite",
		 "samplePluginDojo/SampleFavoritesResultSet"
], 
	function(declare, lang, Request, EntryTemplate, ItemPropertiesPane, MessagesDialog, PopupDialog, SampleDecorator, FileUploadPopupDialog, SampleItemPropertiesPaneExtension) {
			
		var messagesDialog = null;
		var popupDialog = null;
		var fileUploadPopupDialog = null;
	
		/**
		 * Implementation of the SamplePluginAction.  This action invokes the SamplePluginService on the mid-tier and displays the JSON that is returned
		 * from the service.
		 */
		lang.setObject("samplePluginAction", function (repository, items) {
			if (!messagesDialog)
				messagesDialog = new MessagesDialog();

			messagesDialog.addMessage("The sample plugin action has been invoked.  "+items.length+" items selected."); 
			messagesDialog.addMessage("Invoking the sample plugin's service..");

			var serviceParams = new Object();
			serviceParams.server = items[0].repository.id;
			serviceParams.serverType = items[0].repository.type;
			if (items[0].resultSet && items[0].resultSet.searchTemplate) {
				serviceParams.folder = items[0].resultSet.searchTemplate.id;
			}
			serviceParams.ndocs = items.length;
			for (var i in items) {
				serviceParams["docId"+i] = items[i].id;
			}
			
			// this is asynchronous request.  Using asynch is preferred although slightly more complicated to code
			Request.invokePluginService("SamplePlugin", "samplePluginService",
				{
					requestParams: serviceParams,
					requestCompleteCallback: function(response) {	// success
						messagesDialog.addMessage("The sample plugin service completed, returning:\n" + dojo.toJson(response, true, "  "));
					}
				}
			);
		});

		/**
		 * Implementation of the SamplePluginFilteredAction.  This action simply invokes help.
		 */
		lang.setObject("samplePluginFilteredAction", function (repository, items) {
			if (!popupDialog)
				popupDialog = new PopupDialog();
			// open the help file in a popup window:
			popupDialog.show("help/help.htm");
		});
		
		/**
		 * Implementation of the SamplePluginFileUploadAction.
		 */
		lang.setObject("samplePluginFileUploadAction", function(repository, items) {
			if (!fileUploadPopupDialog)
				fileUploadPopupDialog = new FileUploadPopupDialog();
			fileUploadPopupDialog.show(repository,items);
		});
		
		/**
		 * Implementation of SamplePluginCustomCMWFAction.  The action simply displays the parameters in the JavaScript debugger console.
		 */
		lang.setObject("samplePluginCustomWFAction", function(repository, items, callback, teamspace, resultSet, parameterMap) {
			console.debug("***** inside sample custom workflow action; printing parameters...");
			console.debug(repository);
			console.debug(items[0]);
			console.debug(parameterMap.stepRoutingLayout);
			alert("Custom Workflow action");
		});
		
		// Register the custom item properties editor with the ItemPropertiesPane
		ItemPropertiesPane.addExtension(SampleItemPropertiesPaneExtension);
		
		// Register the custom model integration configuration with the Entry Template so the Property Layout designer will see it.
		EntryTemplate.registerModelIntegration("samplePluginDojo/SampleIntegrationConfiguration");

		// Register the custom property controls with the Entry Template so the Property Layout designer will see it.
		EntryTemplate.registerControlRegistry("samplePluginDojo/SampleControlRegistry");

});

