/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;

public class ResourceRequestUtil {

	public static String getRequestBody(HttpServletRequest request) throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
		StringBuffer buf = new StringBuffer();
		char[] data = new char[8196];
		int amtRead = 0;
		amtRead = reader.read(data, 0, 8196);
		while (amtRead != -1) {
			buf.append(data, 0, amtRead);
			amtRead = reader.read(data, 0, 8196);
		}
		String s = buf.toString().trim();
		return s;
	}
}