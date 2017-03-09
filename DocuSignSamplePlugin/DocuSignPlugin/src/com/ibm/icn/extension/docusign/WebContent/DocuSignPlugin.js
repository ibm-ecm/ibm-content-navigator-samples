/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//uncomment following block if you want to debug ICM plugin way
/*
var docuSignContextRoot = "/DocuSignWidgets";

var paths = {
		//"ecm":docuSignContextRoot + "/ecm",
		"docuSign":docuSignContextRoot + "/docuSign"
	};		
require({paths:paths});
*/

console.log("DocuSign Plugin Scope: start to require files");

require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/aspect",
		 "ecm/model/Request",
		 "ecm/widget/ItemPropertiesPane",
		 "ecm/widget/dialog/EditPropertiesDialog",
		 "docuSign/ConfigurationPane",
		 "docuSign/TaskCreationPane",
		 "docuSign/TaskCreationDialog",
		 "docuSign/action/SignSubmitAction",
		 "docuSign/action/SignStatusAction",
		 "docuSign/util/DetailsViewDecorator"
], function(declare, lang, aspect, Request, ItemPropertiesPane, EditPropertiesDialog, ConfigurationPane, TaskCreationPane, TaskCreationDialog) {
			
	console.log("DocuSign Plugin Scope: files loaded");
	
	aspect.after(EditPropertiesDialog, "show", function() {
		alert("Inside rendering the Edit Properties View");
	});
});

console.log("DocuSign Plugin Scope: end to require files");
