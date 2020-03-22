/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"samplePluginDojo/SampleTextBoxEditor",
	"pvr/widget/editors/formatters/TextFormatter",
	"dojo/i18n!pvr/nls/common"
], function(declare, SampleTextBoxEditor, TextFormatter, resources) {

	// Define a new sample text box editor control that can be used for editing string 
	// properties. It will be added to the list of controls available in the property 
	// layout designer for single value string properties.
	return {
		editors: {
			editorConfigs: {
				"sampleTextBox": {
					label: "Sample Text Box",
					editorClass: SampleTextBoxEditor,
					formatterClass: TextFormatter,
					localizedSettings: [
						"hint"
					],
					defaultFieldWidth: "300px",
				}
			},
			mappings: {
				types: {
					"string": {
						single: {
							editorConfigs: [
								"textBox",
								"textArea",
								"sampleTextBox"
							],
							defaultEditorConfig: "textBox"
						}
					}
				}
			}
		}
	};

});
