require(["dojo/_base/declare",
         "dojo/_base/lang",
         "ecm/model/Request"], 
function(declare, lang, Request) {		
	/**
	 * Use this function to add any global JavaScript methods your plug-in requires.
	 */
	
	lang.setObject("testUploadAction", function(repository, items, callback, teamspace, resultSet, parameterMap) {
		console.info( "into TestUploadAction" );
		
		var formParams = {};
		var chunk = new Blob(['hello world'],{type:'text/plain'});
        
        formParams.file = chunk;
        formParams.fileSize = chunk.length;
        formParams.partFileName = "TestFile.name";
        
        var request = Request.postFormToPluginService("TestUploadPlugin", "TestUploadService", formParams, {
        	requestParams: {
        		repositoryId: "zhjie"
        	},
			requestCompleteCallback: lang.hitch(this, function(response) {
				console.info( response );
			})
        });
        console.info( "exit TestUploadAction" );
	});
});
