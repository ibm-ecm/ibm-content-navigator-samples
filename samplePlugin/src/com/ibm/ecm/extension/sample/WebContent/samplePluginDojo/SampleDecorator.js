/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define(["dojo/_base/lang"], function(lang) {
	/**
	 * The cell decorator will make any value that contains an @ sign become an email link.
	 */
	lang.setObject("samplePluginEmailDecorator", function(data, rowId, rowIndex) {
		if (data && data.indexOf("@") > 0) {
			return "<a href=\"mailto:" + data + "\">" + data + "</a>";
		} else {
			return data;
		}
	});
});
