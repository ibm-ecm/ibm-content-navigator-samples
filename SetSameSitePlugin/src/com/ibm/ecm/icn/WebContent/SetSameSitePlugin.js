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
		}
});
