/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([ "dojo/_base/declare", 
         "dojo/_base/lang",
         "dojo/i18n!profilePlugin/nls/messages" ], 
function(declare, lang, messages) {
	/**
	 * @name profilePlugin.messages .
	 * @description A global instance of the messages for the Profile Plugin.
	 */
	var profilePlugin = lang.getObject("profilePlugin", true);
	profilePlugin.messages = messages;
	return profilePlugin.messages;
});
