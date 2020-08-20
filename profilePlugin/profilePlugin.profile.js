/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
// See http://dojotoolkit.org/reference-guide/build/index.html#build-index
var profile = {
	basePath: "temp/dojo",

	releaseDir: "dojo/../release",
	action: "release",
	layerOptimize: "comments",
	optimize: "comments",
	stripConsole: "warn",
	localeList: "ar,ca,cs,da,de,el,en,en-ca,en-gb,es,fi,fr,fr-ca,he,hr,hu,it,iw,ja,ko,nb,nb-no,nl,nn,no,pl,pt,pt-br,ru,ro,sk,sl,sv,th,tr,zh,zh-cn,zh-tw",


	packages: [
		{
			name: "dojo",
			location: "./dojo"
		},
		{
			name: "dijit",
			location: "./dijit"
		},
		{
			name: "dojox",
			location: "./dojox"
		},
		{
			name: "gridx",
			location: "./gridx"
		},
		{
			name: "idx",
			location: "./idx"
		},
		{
			name: "ecm",
			location: "./ecm"
		},
		{
			name: "pvr",
			location: "./pvr"
		},
		{
			name: "pvd",
			location: "./pvd"
		},
		{
			name: "profilePlugin",
			location: "./profilePlugin"
		}
	],

	layers: {
		"profilePlugin/ProfilePlugin": {
			include: [
				"profilePlugin/ProfilePlugin"
			],
			exclude: [
				"dojo/dojo",
				"dijit/dijit",
				"ecm/ecm"
			]
		}
	}

};
