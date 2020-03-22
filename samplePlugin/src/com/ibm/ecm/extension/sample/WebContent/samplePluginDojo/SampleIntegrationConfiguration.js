/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"samplePluginDojo/SampleStringPropertyController",
	"dojo/i18n!pvr/nls/common"
], function(declare, SampleStringPropertyController, resources) {

	// Define a new sample string property controller to be used on string property data types
	return {
		types: {
			"string": {
				label: "Sample String",
				controllerClass: SampleStringPropertyController
			}
		}
	};

});
