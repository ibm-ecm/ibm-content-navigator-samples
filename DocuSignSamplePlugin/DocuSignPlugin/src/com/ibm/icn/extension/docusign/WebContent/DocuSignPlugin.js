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
		 "ecm/model/Request",
		 "ecm/widget/ItemPropertiesPane",
		 "docuSign/ConfigurationPane",
		 "docuSign/TaskCreationPane",
		 "docuSign/TaskCreationDialog",
		 "docuSign/action/SignSubmitAction",
		 "docuSign/action/SignStatusAction",
		 "docuSign/util/DetailsViewDecorator"
], function(declare, lang, Request, ItemPropertiesPane, ConfigurationPane, TaskCreationPane, TaskCreationDialog) {
			
	console.log("DocuSign Plugin Scope: files loaded");
});

console.log("DocuSign Plugin Scope: end to require files");
