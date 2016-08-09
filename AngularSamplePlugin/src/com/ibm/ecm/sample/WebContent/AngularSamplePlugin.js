/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016 All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */
 
require(["dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/aspect",
         "ecm/model/Desktop"], 
function(declare, lang, aspect, Desktop) {
	
	/**
	 * Loads a JavaScript file
	 *
	 * @param filename Relative path to the JavaScript file to load.
	 * @param onLoadFunc Optional function to run when the JavaScript file is loaded.
	 */
	function loadJSfile(filename, onLoadFunc) {
    	var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
		if (onLoadFunc)
			fileref.onload = onLoadFunc;
    	document.getElementsByTagName("head")[0].appendChild(fileref)
	}

	/**
	 * Create a connection to the desktop loaded event to load all the required
	 * JavaScript files for the Angular 2 app.
	 */
	var handle = aspect.after(Desktop, "onDesktopLoaded", function() {
	    loadJSfile("/navigator/plugin/AngularSamplePlugin/getResource/node_modules/zone.js/dist/zone.js");
	    loadJSfile("/navigator/plugin/AngularSamplePlugin/getResource/node_modules/reflect-metadata/Reflect.js");
	    loadJSfile("/navigator/plugin/AngularSamplePlugin/getResource/node_modules/systemjs/dist/system.src.js", function() {
			loadJSfile("/navigator/plugin/AngularSamplePlugin/getResource/icn.systemjs.config.js");
		});
	    handle.remove();
	});
});
