/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/_base/declare",
        "dojo/_base/lang",
        "ecm/model/Request",
         "samplePluginDojo/MessagesDialog"
], function(declare, lang, Request,SampleMessageDialog) {
    var messagesDialog = null;
    /**
     * Implementation of the DependentPluginAction function referenced in DependentPluginAction.java. This action invokes the SamplePluginService, and displays the JSON that is returned
     * from the service. It uses the Message Dialog widget created by SamplePlugin
     */
    lang.setObject("DependentPluginAction", function (repository, items) {
        if (!messagesDialog)
            messagesDialog = new SampleMessageDialog();

        messagesDialog.addMessage("The dependent plugin action has been invoked.  "+items.length+" items selected."); 
        messagesDialog.addMessage("Invoking the sample plugin's service from dependent plugin..");

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
        
        // this is asynchronous request. Using asynch is preferred although slightly more complicated to code
        Request.invokePluginService("SamplePlugin", "samplePluginService",
        {
            requestParams: serviceParams,
            requestCompleteCallback: function(response) {
                messagesDialog.addMessage("Service request invoke from dependent plugin, returning:\n" + dojo.toJson(response, true, "  "));
            }
        }
    );
    });
    
});
