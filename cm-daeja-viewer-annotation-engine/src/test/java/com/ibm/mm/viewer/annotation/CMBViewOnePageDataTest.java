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

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CMBViewOnePageDataTest {
	private static final int DEFAULT_WIDTH = 150;
	private static final int DEFAULT_HEIGHT = 250;
	private static final int DEFAULT_RESOLUTION = 350;

	private CMBViewOnePageData pageData;

	@BeforeEach
	public void newPageData() {
		pageData = new CMBViewOnePageData("100,200; 300, 400", "500,600; 700, 800", DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_RESOLUTION);
	}

	@Test
	public void shouldParsePageData() {
		assertEquals(100, pageData.width(0));
		assertEquals(200, pageData.height(0));
		assertEquals(300, pageData.width(1));
		assertEquals(400, pageData.height(1));
		assertEquals(500, pageData.xResolution(0));
		assertEquals(600, pageData.yResolution(0));
		assertEquals(700, pageData.xResolution(1));
		assertEquals(800, pageData.yResolution(1));
	}

	@Test
	public void shouldGetStringPageData() {
		assertEquals("100" + CMBViewOnePageData.VALUE_SEPARATOR + "200", pageData.pageSizeToString(0));
		assertEquals("300" + CMBViewOnePageData.VALUE_SEPARATOR + "400", pageData.pageSizeToString(1));
		assertEquals("500" + CMBViewOnePageData.VALUE_SEPARATOR + "600", pageData.pageResolutionToString(0));
		assertEquals("700" + CMBViewOnePageData.VALUE_SEPARATOR + "800", pageData.pageResolutionToString(1));
	}

	@Test
	public void shouldGetDefaultValues() {
		assertEquals(DEFAULT_WIDTH, pageData.width(3));
		assertEquals(DEFAULT_HEIGHT, pageData.height(3));
		assertEquals(DEFAULT_RESOLUTION, pageData.xResolution(3));
		assertEquals(DEFAULT_RESOLUTION, pageData.yResolution(3));
		assertEquals(DEFAULT_WIDTH + CMBViewOnePageData.VALUE_SEPARATOR + DEFAULT_HEIGHT, pageData.pageSizeToString(3));
		assertEquals(DEFAULT_RESOLUTION + CMBViewOnePageData.VALUE_SEPARATOR + DEFAULT_RESOLUTION, pageData.pageResolutionToString(3));
	}

	@Test
	public void shouldAppendPageData() {
		StringBuilder builder = new StringBuilder();
		CMBViewOnePageData.appendPageData(builder, 100, 200);
		CMBViewOnePageData.appendPageData(builder, 300, 400);

		assertEquals("100" + CMBViewOnePageData.VALUE_SEPARATOR + "200" + CMBViewOnePageData.DATA_SEPARATOR + "300" + CMBViewOnePageData.VALUE_SEPARATOR + "400", builder.toString());

		CMBViewOnePageData data = new CMBViewOnePageData(builder.toString(), null, DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_RESOLUTION);

		assertEquals(100, data.width(0));
		assertEquals(200, data.height(0));
		assertEquals(300, data.width(1));
		assertEquals(400, data.height(1));
	}
}
