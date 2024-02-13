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

import static org.junit.Assert.assertEquals;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.StringReader;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import org.junit.Test;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import com.ibm.mm.sdk.common.*;
import com.ibm.mm.beans.CMBObject;
import com.ibm.mm.viewer.annotation.CMBAnnotationServices;
import com.ibm.mm.viewer.annotation.CMBAnnotationEngineCallbacks;

@RunWith(MockitoJUnitRunner.class)
public class CMBViewOneAnnotationEngineTest {
	@Mock 
	private CMBObject annotation;
	@Mock
	private DKMimeTypeMgmtICM mimeTypeMgmt;
	@Mock
	DKMimeTypeDefICM mimeTypeDef;
	@Mock
	private CMBAnnotationServices annotationServices;
	@Mock
	private Properties engineProperties;
	String v1Mimetype = "application/vnd.ibm.v1";
	String cmMimetype = "application/vnd.ibm.modcap";
	private int annotationPosition = 1400;
	private String pagesize= "1700,1200";
	private String pageResolution = "96,96";
	CMBViewOneAnnotationEngine viewOneEngine;
	@Mock
	CMBAnnotationEngineCallbacks callback;
	
	String modifyV1String = "[TEXT]\r\n" + 
			"X = 1541\r\n" + 
			"Y = 585\r\n" + 
			"FONTTYPE = Dialog\r\n" + 
			"FONTHEIGHT = 56\r\n" + 
			"BORDER = 0\r\n" + 
			"TEXT = test<N>test2<N>test3\r\n" + 
			"PAGE = 1\r\n" + 
			"PAGEURL = http://localhost:9080/navigator/jaxrs/cm/getDocument?docid=102%203%20ICM6%20snout124%20View_Version_neverCreate59%2026%20A1001001A21B25C25214E0046818%20A21B25C25214E004681%2014%201212&template_name=View_Version_neverCreate&repositoryId=snout1&security_token=-1712652514678869556\r\n" + 
			"COLOR = 255, 0, 0\r\n" + 
			"TRANSPARENT = 0\r\n" + 
			"LABEL = Text\r\n" + 
			"PAGESIZE = 1700,1200\r\n" + 
			"EDIT = 1\r\n" + 
			"CREATEDATE = 18 Aug 2021, 24:47:19, UTC-7\r\n" + 
			"MODIFIEDDATE = 18 Aug 2021, 24:47:42, UTC-7\r\n" + 
			"CREATEDID = suser\r\n" + 
			"MODIFIEDID = suser";
	String sampleAnnotationSet = "[{\"type\":\"[TEXT]\",\"properties\":{\"CUSTOMPROPERTY\":\"CM8:ACED00057372002E636F6D2E69626D2E6D6D2E7669657765722E616E6E6F746174696F6E2E434D424E6F7465416E6E6F746174696F6E00000000000000010300045A0008776F7264577261704C0019616E6E6F746174696F6E50726F7065727469657350616E656C7400314C636F6D2F69626D2F6D6D2F7669657765722F616E6E6F746174696F6E2F434D4250726F7065727469657350616E656C3B4C0009636F6D705461626C657400154C6A6176612F7574696C2F486173687461626C653B4C00086E6F7465466F6E7474000F4C6A6176612F6177742F466F6E743B7872002E636F6D2E69626D2E6D6D2E7669657765722E616E6E6F746174696F6E2E434D4250616765416E6E6F746174696F6E000000000000000103000F5A0007636F72727570745A000C696E766572746564486F727A5A000C696E766572746564566572745A0016697356697369626C655768696C654472616767696E6749000C6E426F72646572576964746849000A706167654E756D6265725A00137065726D616E656E746C79526F746174696E675A000F726F7461746557697468496D6167655A000B7472616E73706172656E74490004747970654C000D616E6E6F746174696F6E53657474002F4C636F6D2F69626D2F6D6D2F7669657765722F616E6E6F746174696F6E2F434D42416E6E6F746174696F6E5365743B4C000B626F72646572436F6C6F727400104C6A6176612F6177742F436F6C6F723B4C000864726177526563747400144C6A6176612F6177742F52656374616E676C653B4C000966696C6C436F6C6F7271007E00064C000668616E646C657400124C6A6176612F6C616E672F4F626A6563743B78707741000000050000000100000001000000000000000000000000000000FF000000FF000000FF00000000000000FF000002E400000119000000AF0000006C000000000078740012746573740D0A74657374320D0A74657374337372000D6A6176612E6177742E466F6E74C5A135E6CCDE5673030006490019666F6E7453657269616C697A65644461746156657273696F6E460009706F696E7453697A6549000473697A654900057374796C654C0014665265717565737465644174747269627574657371007E00024C00046E616D657400124C6A6176612F6C616E672F537472696E673B78700000000141D000000000001A00000000707400064469616C6F67787701007870\",\"TEXT\":\"test<N>test2<N>test3\",\"WIDTH\":\"364\",\"PAGE\":\"1\",\"FILLCOLOR\":\"255,255,0\",\"HEIGHT\":\"225\",\"FONTHEIGHT\":\"56\",\"COLOR\":\"0,0,0\",\"FONTTYPE\":\"Dialog\",\"X\":\"1541\",\"Y\":\"585\",\"TRANSPARENT\":\"0\",\"PAGESIZE\":\"1700,1200\"}}]";
	String cmAnnotationString = "[Annotation:Text ,page:1 ,text:test\r\n" + 
			"test2\r\n" + 
			"test3 ,font:java.awt.Font[family=Dialog,name=Dialog,style=bold,size=26] ,drawRect:java.awt.Rectangle[x=739,y=280,width=0,height=0] ,fillColor:java.awt.Color[r=255,g=255,b=0] ,borderColor:java.awt.Color[r=255,g=0,b=0]]";
	String v1AnnotationString = "[TEXT]\r\n" + 
			"X = 1541\r\n" + 
			"Y = 585\r\n" + 
			"TEXT = test<N>test2<N>test3\r\n" + 
			"WIDTH = 364\r\n" + 
			"HEIGHT = 225\r\n" + 
			"PAGE = 1\r\n" + 
			"PAGESIZE = 1700,1200\r\n" + 
			"COLOR = 0,0,0\r\n" + 
			"FILLCOLOR = 255,255,0\r\n" + 
			"TRANSPARENT = 0\r\n" + 
			"FONTTYPE = Dialog\r\n" + 
			"FONTHEIGHT = 56\r\n" + 
			"CUSTOMPROPERTY = CM8:ACED00057372002E636F6D2E69626D2E6D6D2E7669657765722E616E6E6F746174696F6E2E434D424E6F7465416E6E6F746174696F6E00000000000000010300045A0008776F7264577261704C0019616E6E6F746174696F6E50726F7065727469657350616E656C7400314C636F6D2F69626D2F6D6D2F7669657765722F616E6E6F746174696F6E2F434D4250726F7065727469657350616E656C3B4C0009636F6D705461626C657400154C6A6176612F7574696C2F486173687461626C653B4C00086E6F7465466F6E7474000F4C6A6176612F6177742F466F6E743B7872002E636F6D2E69626D2E6D6D2E7669657765722E616E6E6F746174696F6E2E434D4250616765416E6E6F746174696F6E000000000000000103000F5A0007636F72727570745A000C696E766572746564486F727A5A000C696E766572746564566572745A0016697356697369626C655768696C654472616767696E6749000C6E426F72646572576964746849000A706167654E756D6265725A00137065726D616E656E746C79526F746174696E675A000F726F7461746557697468496D6167655A000B7472616E73706172656E74490004747970654C000D616E6E6F746174696F6E53657474002F4C636F6D2F69626D2F6D6D2F7669657765722F616E6E6F746174696F6E2F434D42416E6E6F746174696F6E5365743B4C000B626F72646572436F6C6F727400104C6A6176612F6177742F436F6C6F723B4C000864726177526563747400144C6A6176612F6177742F52656374616E676C653B4C000966696C6C436F6C6F7271007E00064C000668616E646C657400124C6A6176612F6C616E672F4F626A6563743B78707741000000050000000100000001000000000000000000000000000000FF000000FF000000FF00000000000000FF000002E400000119000000AF0000006C000000000078740012746573740D0A74657374320D0A74657374337372000D6A6176612E6177742E466F6E74C5A135E6CCDE5673030006490019666F6E7453657269616C697A65644461746156657273696F6E460009706F696E7453697A6549000473697A654900057374796C654C0014665265717565737465644174747269627574657371007E00024C00046E616D657400124C6A6176612F6C616E672F537472696E673B78700000000141D000000000001A00000000707400064469616C6F67787701007870";
	String emptyV1String= "[DOCUMENT]\\r\\nID =\\r\\nSYSTEMTYPE = 0\\r\\nLIBNAME =\\r\\n";
	private static final Set<String> iniTypes = Collections.unmodifiableSet( //
	        new HashSet<String>(Arrays.asList("[ARROW]", "[CUSTOM]", "[FREEHAND]", "[HIGHLIGHTPOLYGON]", "[HIGHLIGHT]", "[LINE]", "[NOTE]", "[OPENPOLYGON]", "[OVAL]", "[POLYGON]", "[RECTANGLE]", "[REDACTPOLYGON]", "[REDACT]", "[STAMP]", "[TEXT]")));

	@Before
	public void setUp() throws Exception {
		annotationServices = new CMBAnnotationServices();
		Properties engineProperties = annotationServices.getEngineProperties();
		engineProperties.put("ANNOTATION_ENGINE_pagesize", pagesize);
		engineProperties.put("ANNOTATION_ENGINES", "2");
		engineProperties.put("ANNOTATION_ENGINE2_CLASSNAME", "com.ibm.mm.viewer.annotation.CMBViewOneAnnotationEngine");
		engineProperties.put("ANNOTATION_ENGINE2_allowEdit", "true");
		engineProperties.setProperty("canEditAnnotation","true");
		//put the CM page resolution into annotation engine
		engineProperties.setProperty("ANNOTATION_ENGINE_pageresolution", pageResolution);
		annotationServices.setEngineProperties(engineProperties);
		viewOneEngine = new CMBViewOneAnnotationEngine();
		viewOneEngine.initialize(callback,engineProperties);
	}
	
	@Test
	public void shouldSaveViewOneAnnotations() throws DKException, Exception {
		//No conversion needed if v1Mimetype exist in cm mime type definition
		String sb = v1AnnotationString;
		JSONObject annotationSet = new JSONObject();
		JSONArray annotations = new JSONArray();

		annotationSet.put("annotations", annotations);
		String annotationData = sb;
		if (annotationData != null) {
			try {
				BufferedReader br = new BufferedReader(new StringReader(annotationData));
				String line;
				//  Loop over all lines from the file.

				JSONObject annoJson = null;
				JSONObject annoPropsJson = null;

				while ((line = br.readLine()) != null) {

					if (line.length() > 0) {
						line = line.trim();
						if (line.startsWith("[") && line.endsWith("]")) {
							annoPropsJson = null;
							if (iniTypes.contains(line.trim())) {
								annoJson = new JSONObject();
								annoJson.put("type", line.trim());
								annoPropsJson = new JSONObject();
								annoJson.put("properties", annoPropsJson);
								annotations.put(annoJson);
							}
						} else if (line.contains("=")) {
							if (!CMBViewOneAnnotationUtil.saveProperty(annoPropsJson, line)) {
								System.out.println("key/value was not saved: " + line);
							}
						}
					}
				}
			} catch (Exception e) {
				System.out.println(e);
			}
		}
		CMBObject annotation = new CMBObject(annotationSet.toString().getBytes("UTF-8"), v1Mimetype);
		assertEquals(sampleAnnotationSet, annotations.toString());
		
	}

	@Test
	public void shouldLoadMigratedCMAnnotations() throws Exception {
		//convert cm annotation to V1 annotation when load annotation
		InputStream is = this.getClass().getResourceAsStream("/testPAno.t_l");
		
		CMBAnnotationSet cmAS = annotationServices.loadAnnotationSet(is, cmMimetype, 672, 1, 0);
		CMBAnnotationSet v1AS = annotationServices.loadAnnotationSet(null, v1Mimetype, 672, 1, 0);
		for (int i = 0; i < cmAS.getAnnotationCount(); i++) {
			CMBPageAnnotation a = cmAS.getAnnotationAt(i);
			v1AS.addAnnotation(a);
		}
		ByteArrayOutputStream annoStream = new ByteArrayOutputStream();
		try {
			v1AS.write(annoStream);
			annoStream.close();
		}catch(Exception e) {
			System.out.print(e);
		}

		annotationServices.dropAnnotationSet(cmAS);
		annotationServices.dropAnnotationSet(v1AS);
		annotationServices.terminate();
		assertEquals(v1AnnotationString.trim(), annoStream.toString().trim());
	}

	@Test
	public void shouldSaveMigrateCMAnnotations() throws DKException, Exception {
		//convert v1 annotation to cm annotation
		String sb = modifyV1String;
		byte[] annobytes = sb.getBytes("UTF-8");
		// Create an empty annotation set for CM annotation set
		CMBAnnotationSet cmAS = annotationServices.loadAnnotationSet(new ByteArrayInputStream(new byte[0]), cmMimetype, annotationPosition, 1, 0);
		CMBAnnotationSet v1AS = annotationServices.loadAnnotationSet(new ByteArrayInputStream(annobytes), v1Mimetype, 1390, 1, 0);
		for (int i = 0; i < v1AS.getAnnotationCount(); i++) {
			CMBPageAnnotation a = v1AS.getAnnotationAt(i);
			cmAS.addAnnotation(a);
		}
		
		// Serialize the CMBAnnotationSet into CM annotation format
		ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
		cmAS.write(byteOutputStream);
		byteOutputStream.close();
		assertEquals(cmAnnotationString, cmAS.getAnnotationAt(0).toString());
		annotationServices.dropAnnotationSet(v1AS);
		annotationServices.dropAnnotationSet(cmAS);
		annotationServices.terminate();
		CMBObject annotation = new CMBObject(byteOutputStream.toByteArray(), "application/vnd.ibm.modcap");
	}
	
	@Test
	public void shouldLoadEmptyCMAnnotations() throws DKException, Exception {
		//load a annotation file without annotation.
		InputStream is = this.getClass().getResourceAsStream("/empty.t_l");
		
		CMBAnnotationSet cmAS = annotationServices.loadAnnotationSet(is, cmMimetype, 672, 1, 0);
		CMBAnnotationSet v1AS = annotationServices.loadAnnotationSet(null, v1Mimetype, 672, 1, 0);
		for (int i = 0; i < cmAS.getAnnotationCount(); i++) {
			CMBPageAnnotation a = cmAS.getAnnotationAt(i);
			v1AS.addAnnotation(a);
		}
		ByteArrayOutputStream annoStream = new ByteArrayOutputStream();
		try {
			v1AS.write(annoStream);
			annoStream.close();
		}catch(Exception e) {
			System.out.print(e);
		}

		annotationServices.dropAnnotationSet(cmAS);
		annotationServices.dropAnnotationSet(v1AS);
		annotationServices.terminate();
		assertEquals(annoStream.size(),0);
	}
	
	@Test
	public void shouldSaveEmptyCMAnnotations() throws DKException, Exception {
		String sb = emptyV1String;
		byte[] annobytes = sb.getBytes("UTF-8");
		// Create an empty annotation set for CM annotation set
		CMBAnnotationSet cmAS = annotationServices.loadAnnotationSet(new ByteArrayInputStream(new byte[0]), cmMimetype, annotationPosition, 1, 0);
		CMBAnnotationSet v1AS = annotationServices.loadAnnotationSet(new ByteArrayInputStream(annobytes), v1Mimetype, 1390, 1, 0);
		for (int i = 0; i < v1AS.getAnnotationCount(); i++) {
			CMBPageAnnotation a = v1AS.getAnnotationAt(i);
			cmAS.addAnnotation(a);
		}
		
		// Serialize the CMBAnnotationSet into CM annotation format
		ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
		cmAS.write(byteOutputStream);
		byteOutputStream.close();
		byte[] annotationBytes = byteOutputStream.toByteArray();
		if (annotationBytes.length == 0) {
			// In the case of a zero-length annotation part, the resource manager may throw errors
			// if the part is subsequently updated within a short period of time, due to the asynchronous
			// delete process of the resource manager not having time to clean up.  To avoid this,
			// use an annotation part that has only "header" information but no actual annotations,
			// to keep the part non-zero in length.
			annotationBytes = new byte[] { (byte) 0x00, (byte) 0x21, (byte) 0xd3, (byte) 0xa8, (byte) 0xa8, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0xff, (byte) 0x00, (byte) 0x00, (byte) 0x06, (byte) 0x01, (byte) 0x03, (byte) 0xd4, (byte) 0x03, (byte) 0x52, (byte) 0x05, (byte) 0x18, (byte) 0x01, (byte) 0x0c, (byte) 0x00, (byte) 0x04, (byte) 0x65, (byte) 0x69, (byte) 0x01, (byte) 0x00, (byte) 0x08, (byte) 0xd3, (byte) 0xa9, (byte) 0xa8, (byte) 0x00, (byte) 0x00, (byte) 0x00 };
		}
		assertEquals(0, cmAS.getAnnotationCount());
		annotationServices.dropAnnotationSet(v1AS);
		annotationServices.dropAnnotationSet(cmAS);
		annotationServices.terminate();
		CMBObject annotation = new CMBObject(annotationBytes, "application/vnd.ibm.modcap");
	}
	
}
