require(["dojo/_base/declare",
         "dojo/_base/lang",
  		 "dojo/cookie"], 
function(declare, lang, dojoCookie) {
	   console.info( "sameSitePlugin" );		
	   ecm.util.Common.setCookie = function( name, value, props){
			if(document && document.URL && document.URL.startsWith("https") ){
				//ssl, need to add sameSite and secure
				if( !props ){
					props = {};
				}
				if( !props.SameSite ){
					props.SameSite = "Lax"; //None, Lax, Strict
				}
				if( !props.Secure ){
					props.Secure = true; //if Secure
				}
			}
			dojoCookie(name, value, props);
		};
		
		console.info("plugin");
		
		var ori_finishApplyEntryTemplate=ecm.widget.dialog.AddContentItemDialog.prototype._finishApplyEntryTemplate;
		ecm.widget.dialog.AddContentItemDialog.prototype._finishApplyEntryTemplate = function(renderProperties){
			lang.hitch(this, ori_finishApplyEntryTemplate,renderProperties );
			this.addContentItemGeneralPane.addContentSourceTypeChoices();
		}
		
		ecm.widget.AddContentItemGeneralPane.prototype.contentSourceTypeChoices = [
			{
				value: "Document",
				label: ecm.messages.add_document_localfile_label
			},
			{
				value: "Item",
				label: ecm.messages.add_document_metadata_label
			},
			{
				value: "ExternalURL",
				label: ecm.messages.add_document_external_label
			},
			{
				value: "test1",
				label: "test1"
			}
		];
});
