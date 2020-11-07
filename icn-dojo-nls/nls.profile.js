// See http://dojotoolkit.org/reference-guide/build/index.html#build-index
var profile = {
	basePath: "build/dojoBuild", // The path of the directory where Dojo Toolkit full source archive file is extracted to

	releaseDir: "dojo/../release",
	action: "release",
	layerOptimize: "comments",
	optimize: "comments",
	stripConsole: "warn",
	localeList: "sr,mn", // A comma-separated list of ISO language codes

	packages: [
		{
			name: "dojo",
			location: "./dojo"
		},
		{
			name: "ecm",
			location: "./ecm"
		},
	],

	layers: {
		"ecm/ecm": {
			include: [
				"ecm/ecm"
			]
		}
	}
};
