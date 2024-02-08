/*
  Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2019,2024 All Rights Reserved.

  US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
  IBM Corp.

  DISCLAIMER OF WARRANTIES :

  Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
  copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.

  THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
  EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
  MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
  ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
  COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
  FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
  DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
  BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

package com.ibm.mm.viewer.annotation;

import java.awt.Font;
import java.awt.font.TextAttribute;
import java.util.Map;

import org.json.JSONObject;

public class CMBViewOneAnnotationUtil {
	
	public static boolean saveProperty(JSONObject annoJson, String line) {
		int epos = line.indexOf("=");
		String key = null;
		String value = null;

		if (epos >= 0) {
			key = line.substring(0, epos - 1);
		}

		if (epos + 1 < line.length()) {
			value = line.substring(epos + 1);
		} else {
			value = "";
		}

		boolean keyValueFound = (annoJson != null && key != null && value != null);
		if (keyValueFound) {
			annoJson.put(key.trim(), value.trim());
		}

		return keyValueFound;
	}
	
	public static Font getStrikethroughFont(Font font, boolean strikethrough) {
		if (strikethrough) {
			Map attributes = font.getAttributes();
			attributes.put(TextAttribute.STRIKETHROUGH, TextAttribute.STRIKETHROUGH_ON);
			return new Font(attributes); 				
		}
		return font;
	}
}
