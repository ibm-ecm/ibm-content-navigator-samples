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

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.font.FontRenderContext;
import java.awt.font.TextAttribute;
import java.awt.font.TextLayout;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.Vector;

import com.ibm.ecm.servicability.ViewerLogger;

/**
 * An annotation engine that understands IBM Daeja ViewOne annotations.
 */
public class CMBViewOneAnnotationEngine extends CMBAnnotationEngine {

	/**
	 * Represents a loaded annotation set in the engine.
	 */
	private class CMAnnotationSet {
		InputStream is;
		int annotationPosition;
	}

	protected static final String V1_ANNOTATION_FORMAT = "application/vnd.ibm.v1";

	private final String DEFAULT_COLOR = "255, 255, 0, 130";
	private final String DEFAULT_COLOR_WHITE_TRANSPARENT = "255,255,255,130";
	private final int DEFAULT_PAGE_WIDTH = 1700;
	private final int DEFAULT_PAGE_HEIGHT = 2200;
	private final String DEFAULT_PAGESIZE = DEFAULT_PAGE_WIDTH + ", " + DEFAULT_PAGE_HEIGHT;
	private final static int V1_DPI = 200;

	private CMBAnnotationEngineCallbacks callbacks;
	private Properties properties;
	private int cmdpi; // this is based on annotation position that was set by document mimetype dpi
	private double xFactor;
	private double yFactor;
	boolean allowEdit;
	boolean useCMZorder; //CM annotation order rule is opposite of Daeja, use this parameter to choose use CM rule or Daeja rule to save/load annotation. True to use CM rule, false to use Daeja rule. Default value is false. 
	boolean isV1JonsMimetypeAvailable; //If application/vnd.ibm.v1 is defined in repository.
	boolean useWhiteDefaultColor = false; // If use White as default fill color. CM is using white, Daeja is using yellow. 
	private CMBViewOnePageData pageData;

	private static final Set<String> annotationTypes = Collections.unmodifiableSet( //redaction and polygen should not support by MOD:CA format
	        new HashSet<String>(Arrays.asList("[ARROW]", "[CUSTOM]", "[FREEHAND]", "[HIGHLIGHT]", "[LINE]", "[NOTE]", "[OVAL]", "[RECTANGLE]", "[STAMP]", "[TEXT]")));

	boolean renderStickyNoteAsTextAnnotation;// Render CM8 Sticky Note as Daeja ViewOne Text annotation
	
	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#addAnnotation(java.lang.Object, com.ibm.mm.viewer.annotation.CMBPageAnnotation, int)
	 */
	public void addAnnotation(Object hAnnotationSet, CMBPageAnnotation newPageAnnotation, int page) throws CMBAnnotationEngineException {
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#canLoadAnnotationFormat(java.lang.String)
	 */
	public boolean canLoadAnnotationFormat(String format) {
		if (format.equals(V1_ANNOTATION_FORMAT)) {
			return true;
		} else {
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#canSaveAnnotationFormat(java.lang.String, java.lang.String)
	 */
	public boolean canSaveAnnotationFormat(String srcFormat, String destFormat) {
		if (srcFormat.equals(V1_ANNOTATION_FORMAT) & destFormat.equals(V1_ANNOTATION_FORMAT)) {
			return true;
		} else {
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#dropAnnotationSet(java.lang.Object)
	 */
	public void dropAnnotationSet(Object hAnnotationSet) {
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#getAnnotations(java.lang.Object)
	 */
	public CMBPageAnnotation[] getAnnotations(Object hAnnotationSet) throws CMBAnnotationEngineException {
		CMAnnotationSet annoSet = (CMAnnotationSet) hAnnotationSet;
		return toCMAnnotations(annoSet.is, annoSet.annotationPosition);
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#getPrivilege(java.lang.Object, int)
	 */
	public boolean getPrivilege(Object hAnnotationSet, int privilegeID) throws CMBAnnotationEngineException {
		// TODO complete 
		return true;
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#getSupportedAnnotations()
	 */
	public Class[] getSupportedAnnotations() {
		return new Class[] { CMBArrowAnnotation.class, CMBCircleAnnotation.class, CMBHighlightAnnotation.class, CMBLineAnnotation.class, CMBNoteAnnotation.class, CMBPenAnnotation.class, CMBRectAnnotation.class, CMBStampAnnotation.class, CMBTextAnnotation.class };
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#initialize(com.ibm.mm.viewer.annotation.CMBAnnotationEngineCallbacks, java.util.Properties)
	 */
	public void initialize(CMBAnnotationEngineCallbacks callbacks, Properties properties) {
		this.callbacks = callbacks;
		this.properties = properties;

		allowEdit = Boolean.valueOf(properties.getProperty("allowEdit", "false")).booleanValue();
		isV1JonsMimetypeAvailable = Boolean.valueOf(properties.getProperty("isV1JonsMimetypeAvailable", "false")).booleanValue();
		renderStickyNoteAsTextAnnotation = Boolean.valueOf(properties.getProperty("renderStickyNoteAsTextAnnotation", "true")).booleanValue();
		useCMZorder = Boolean.valueOf(properties.getProperty("useCMZorder", "false")).booleanValue();
		useWhiteDefaultColor = Boolean.valueOf(properties.getProperty("useWhiteDefaultColor", "false")).booleanValue();
		pageData = new CMBViewOnePageData(properties.getProperty("pagesize"), properties.getProperty("pageresolution"), DEFAULT_PAGE_WIDTH, DEFAULT_PAGE_HEIGHT, cmdpi);

		ViewerLogger.logEntry(this, "initialize", "allowEdit: " + allowEdit);
		ViewerLogger.logEntry(this, "initialize", "isV1JonsMimetypeAvailable: " + isV1JonsMimetypeAvailable);
		ViewerLogger.logEntry(this, "initialize", "renderStickyNoteAsTextAnnotation: " + renderStickyNoteAsTextAnnotation);
		ViewerLogger.logEntry(this, "initialize", "useCMZorder: " + useCMZorder);
		ViewerLogger.logEntry(this, "initialize", "useWhiteDefaultColor: " + useWhiteDefaultColor);
		ViewerLogger.logEntry(this, "initialize", "pageData: " + pageData);
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#loadAnnotationSet(java.io.InputStream, java.lang.String, int, int, int)
	 */
	public Object loadAnnotationSet(InputStream annotationStream, String format, int annotationPosition, int numOfParts, int partNumber) throws CMBAnnotationEngineException {
		CMAnnotationSet annoSet = new CMAnnotationSet();
		annoSet.is = annotationStream;
		annoSet.annotationPosition = annotationPosition;

		if (annotationPosition == 1390)
			cmdpi = 96;
		else
			cmdpi = annotationPosition / 7;

		return annoSet;
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#removeAnnotation(java.lang.Object, com.ibm.mm.viewer.annotation.CMBPageAnnotation)
	 */
	public void removeAnnotation(Object hAnnotationSet, CMBPageAnnotation newPageAnnotation) throws CMBAnnotationEngineException {
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#removeAnnotationSet(java.lang.Object)
	 */
	public void removeAnnotationSet(Object hAnnotationSet) throws CMBAnnotationEngineException {
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#reorderAnnotation(java.lang.Object, com.ibm.mm.viewer.annotation.CMBPageAnnotation, int)
	 */
	public void reorderAnnotation(Object hAnnotationSet, CMBPageAnnotation pageAnnotation, int location) throws CMBAnnotationEngineException {
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#saveAnnotationSet(java.lang.Object, com.ibm.mm.viewer.annotation.CMBPageAnnotation[])
	 */
	public void saveAnnotationSet(Object hAnnotationSet, CMBPageAnnotation[] pageAnnotations) throws CMBAnnotationEngineException {
		String methodName = "saveAnnotationSet";
		ViewerLogger.logEntry(this, methodName);

		// Note: removeAnnotationPart callback is not invoked when there are no annotations.
		//       Instead, the decision to remove the annotation part is left to the server.
		//       This allows the annotations updating to work across different types of servers (CM and non-CM).

		// Convert to View One
		ViewerLogger.logInfo(this, methodName, "Converting " + pageAnnotations.length + " annotations to View One");
		String v1String = "";
		for (int i = 0; i < pageAnnotations.length; i++) {
			String a = this.toViewOne(pageAnnotations[i]);
			v1String += a;
		}

		ViewerLogger.logInfo(this, methodName, "Annotations in View One: " + v1String);

		// Invoke callbacks to write to server
		byte[] annotationData = v1String.getBytes(Charset.forName("UTF-8"));

		ViewerLogger.logInfo(this, methodName, "Invoking updateAnnotationPart callback");
		callbacks.updateAnnotationPart(hAnnotationSet, annotationData, 0);

		ViewerLogger.logExit(this, methodName);
	}

	private String annotationTypeAsString(CMBPageAnnotation a) {
		int type = a.getType();

		if (type == CMBAnnotationConstants.ANN_UNKNOWN) {
			return "unknown";
		} else if (type == CMBAnnotationConstants.ANN_ARROW) {
			return "[ARROW]";
		} else if (type == CMBAnnotationConstants.ANN_CIRCLE) {
			return "[OVAL]";
		} else if (type == CMBAnnotationConstants.ANN_HIGHLIGHT) {
			return "[HIGHLIGHT]";
		} else if (type == CMBAnnotationConstants.ANN_LINE) {
			return "[LINE]";
		} else if (type == CMBAnnotationConstants.ANN_NOTE) {
			return "[NOTE]";
		} else if (type == CMBAnnotationConstants.ANN_PEN) {
			return "[FREEHAND]";
		} else if (type == CMBAnnotationConstants.ANN_RECT) {
			return "[RECTANGLE]";
		} else if (type == CMBAnnotationConstants.ANN_STAMP) {
			return "[STAMP]";
		} else if (type == CMBAnnotationConstants.ANN_TEXT) {
			return "[TEXT]";
		} else if (type == CMBAnnotationConstants.ANN_MASK) {
			return "[MASK]";
		} else {
			return "[CUSTOM]" + Integer.toString(type);
		}
	}

	/**
	 * This is used to parse the View One data in the inputstream to create CMBPageAnnotations.
	 * 
	 * @param is
	 * @param annotationPosition
	 * @return
	 * @throws CMBAnnotationEngineException
	 */
	private CMBPageAnnotation[] toCMAnnotations(InputStream is, int annotationPosition) throws CMBAnnotationEngineException {
		String methodName = "toCMAnnotations";
		ViewerLogger.logEntry(this, methodName);
		if (is == null) {
			return new CMBPageAnnotation[0]; // no annotations
		}

		ArrayList<SimpleEntry> annotations = new ArrayList();
		CMBPageAnnotation[] annotationArray = null;

		try {
			ByteArrayOutputStream contentStream = new ByteArrayOutputStream();
			writeStreamToStream(is, contentStream);

			byte byteData[] = contentStream.toByteArray();
			String s = new String(byteData);
			BufferedReader br = new BufferedReader(new StringReader(s));

			String line;
			//  Loop over all lines from the file.

			CMBPageAnnotation annotation = null;
			
			Properties p = null;
			SimpleEntry<CMBPageAnnotation, Properties> e = null;
			int linenumber = 0;
			while ((line = br.readLine()) != null) {
				ViewerLogger.logDebug(this, methodName, "line : " + linenumber++ + " " + line);
				if (line.length() == 0)
					continue;
				if((line.startsWith("[") && line.endsWith("]"))){
					if (annotationTypes.contains(line.trim())) {
						if (line.equals("[ARROW]")) {
							annotation = new CMBArrowAnnotation();
						} else if (line.equals("[OVAL]")) {
							annotation = new CMBCircleAnnotation();
						} else if (line.equals("[HIGHLIGHT]")) {
							annotation = new CMBHighlightAnnotation();
						} else if (line.equals("[LINE]")) {
							annotation = new CMBLineAnnotation();
						} else if (line.equals("[NOTE]")) {
							annotation = new CMBNoteAnnotation();
						} else if (line.equals("[FREEHAND]")) {
							annotation = new CMBPenAnnotation();
						} else if (line.equals("[RECTANGLE]")) {
							annotation = new CMBRectAnnotation();
						} else if (line.equals("[STAMP]")) {
							// V1 stamp annotation is actually just a text annotation
							annotation = new CMBStampAnnotation();
						} else if (line.equals("[TEXT]")) {
							annotation = new CMBTextAnnotation();
						}
						p = new Properties();
						e = new SimpleEntry<CMBPageAnnotation, Properties>(annotation, p);
						annotations.add(e);
					} else{
						//don't save not recognized node 
						ViewerLogger.logDebug(this, methodName, "Annotation section not recognized: " + line);
						annotation = null;
					}
				} else {
					// get all properties for annotation
					String[] pair = line.split("=");
					if (pair.length >= 2 && annotation!=null)
						p.put(pair[0].trim(), line.substring(line.indexOf('=')+1).trim());
					else
						ViewerLogger.logDebug(this, methodName, "key/value was not saved: " + line);
					
					//Convert text annotation to note annotation if text box is resizable. 
					if(pair[0].trim().equals("WIDTH") && annotation instanceof CMBTextAnnotation){
						annotations.remove(e);
						annotation = new CMBNoteAnnotation();
						e = new SimpleEntry<CMBPageAnnotation, Properties>(annotation, p);
						annotations.add(e);
					}
				}

			}

			ViewerLogger.logDebug(this, methodName, "annotation size: " + annotations.size());

			annotationArray = new CMBPageAnnotation[annotations.size()];
			for (int i = 0; i < annotations.size(); i++) {
				annotation = (CMBPageAnnotation) annotations.get(i).getKey();
				p = (Properties) annotations.get(i).getValue();
				
				//If use CM rule to save annotation, we have to revert the annotation order.
				int annotIndex = useCMZorder ? (annotations.size() - i - 1) : i; 
				
				String createdate = PAnnotationUtilities.getStringProperty("CREATEDATE", p, "");
				String modifieddate = PAnnotationUtilities.getStringProperty("MODIFIEDDATE", p, "");
				boolean notModified = createdate.equalsIgnoreCase(modifieddate);

				String customproperty = PAnnotationUtilities.getStringProperty("CUSTOMPROPERTY", p, "");
				ViewerLogger.logDebug(this, methodName, "CUSTOMPROPERTY: " + customproperty);
				if (!customproperty.isEmpty() && customproperty.startsWith("CM8:")) {
					customproperty = customproperty.substring(4);
				}
				if (customproperty != null && customproperty.length() > 1 && notModified) {
					CMBPageAnnotation pa = PAnnotationUtilities.fromString(customproperty);
					ViewerLogger.logDebug(this, methodName, "CUSTOMPROPERTY: " + pa.toString());
					annotationArray[annotIndex] = pa;

					// When a persisted annotation is moved to a different page (merge & split), the serialized annotation 
					// contains the original page. Update the page value to be the current location of the annotation.
					int page = PAnnotationUtilities.getIntegerProperty("PAGE", p, 1);
					if (page != pa.getPageNumber()) {
						pa.setPageNumber(page);
					}
					//Set font to correct font family if font family is dialog and font name is another.
					if(pa.getFont() != null){
						String fonttype = PAnnotationUtilities.getStringProperty("FONTTYPE", p, "Arial");
						int fontheight = pa.getFont().getSize();
						Font font = PAnnotationUtilities.getValidDefaultFont(fonttype, "bold", fontheight);

						// set strike through
						boolean strikethrough = PAnnotationUtilities.getIntegerProperty("STRIKETHROUGH", p, 0) == 1? true : false;
						font = CMBViewOneAnnotationUtil.getStrikethroughFont(font, strikethrough);
						
						pa.setFont(font);
					}
				} else {
					annotationArray[annotIndex] = annotation;
					
					int page = PAnnotationUtilities.getIntegerProperty("PAGE", p, 1);
					annotation.setPageNumber(page);

					// page size on an annotations from View One does not always match CM doc page size 
					String v1pagesize = PAnnotationUtilities.getStringProperty("PAGESIZE", p, DEFAULT_PAGESIZE);
					String[] v1ps = v1pagesize.split(",");
					int v1pw = new Integer(v1ps[0].trim()).intValue();
					int v1ph = new Integer(v1ps[1].trim()).intValue();
					ViewerLogger.logInfo(this, methodName, "pagesize from v1 annotation: " + v1pw + "," + v1ph);

					int pageIndex = page - 1;
					int pw = pageData.width(pageIndex);
					int ph = pageData.height(pageIndex);
					ViewerLogger.logInfo(this, methodName, "pagesize engine property: " + pw + "," + ph);

					xFactor = yFactor = 1.0;
					if (pw != v1pw)
						xFactor = (double) pw / (double) v1pw;
					if (ph != v1ph)
						yFactor = (double) ph / (double) v1ph;

					ViewerLogger.logInfo(this, methodName, "x,y factor: " + xFactor + "," + yFactor);
					
					//set annotation transparent
					int transparent = PAnnotationUtilities.getIntegerProperty("TRANSPARENT", p, 0);
					annotation.setTransparent(transparent == 1);
					
					//set border color
					String colorstring = PAnnotationUtilities.getStringProperty("COLOR", p, DEFAULT_COLOR);
					String[] rgb = colorstring.split(",");
					int r = new Integer(rgb[0].trim()).intValue();
					int g = new Integer(rgb[1].trim()).intValue();
					int b = new Integer(rgb[2].trim()).intValue();
					int a = 130;
					Color bordercolor = new Color(r, g, b);
					annotation.setBorderColor(bordercolor);

					// TODO: add a set of annotation classes that can process the conversion below per type
					if (annotation instanceof CMBArrowAnnotation) {
						annotation = convertArrowToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBCircleAnnotation) {
						annotation = convertCircleToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBHighlightAnnotation) {
						annotation = convertHighlightToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBLineAnnotation) {
						annotation = convertLineToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBNoteAnnotation) {
						annotation = convertNoteToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBPenAnnotation) {
						annotation = convertPenToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBRectAnnotation) {
						annotation = convertRectToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBStampAnnotation) {
						annotation = convertStampToCM(annotation, p, pageIndex);
					} else if (annotation instanceof CMBTextAnnotation) {
						annotation = convertTextToCM(annotation, p, pageIndex);
					}
				}
			}

		} catch (IOException e) {
		}
		ViewerLogger.logDebug(this, methodName, "Completed parsing of annotations.  " + annotations.size() + " annotation objects generated.");
		return annotationArray;
	}
	
	/**
	 * Converts one CM annotation to String in View One Format. This is used to save the annotation set.
	 */
	private String toViewOne(CMBPageAnnotation annotation) {
		String result = null;

		int pageIndex = annotation.getPageNumber() - 1;
		// TODO: add a set of annotation classes that can process the conversion below per type
		if (annotation.getType() == CMBAnnotationConstants.ANN_ARROW) {
			result = convertArrowToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_CIRCLE) {
			result = convertCircleToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_HIGHLIGHT) {
			result = convertHighlightToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_LINE) {
			result = convertLineToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_NOTE) {
			result = convertNoteToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_PEN) {
			result = convertPenToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_RECT) {
			result = convertRectToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_STAMP) {
			result = convertStampToViewOne(annotation, pageIndex);
		} else if (annotation.getType() == CMBAnnotationConstants.ANN_TEXT) {
			result = convertTextToViewOne(annotation, pageIndex);
		}

		return result;
	}
	
	/**
	 * Converts properties of arrow annotation. 
	 */
	private CMBPageAnnotation convertArrowToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x1 = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X1", p, 0), pageIndex );
		int y1 = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y1", p, 0), pageIndex);
		int x2 = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X2", p, 0), pageIndex);
		int y2 = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y2", p, 0), pageIndex);
		
		//Arrow header size
		int w = PAnnotationUtilities.getIntegerProperty("ARROWHEADSIZE", p, 0);
		//Arrow line size
		int linew = adjustXToCM(PAnnotationUtilities.getIntegerProperty("LINEWIDTH", p, 0), pageIndex);
		annotation.setBorderWidth(linew);
		((CMBArrowAnnotation) annotation).setBeginPoint(new Point(x1,y1));
		((CMBArrowAnnotation) annotation).setEndPoint(new Point(x2,y2));
		
		int semiTransparent = PAnnotationUtilities.getIntegerProperty("SEMITRANSPARENT", p, 0);
		annotation.setTransparent(semiTransparent==1);

		annotation.setDrawRect(x1, y1, x2 - x1, y2 - y1);
		return annotation;
	}
	
	/**
	 * Converts arrow annotation to String in View One Format.
	 */
	private String convertArrowToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X1, Y1, X2, Y2, PAGE, LINEWIDTH, COLOR, PAGESIZE, SEMITRANSPARENT, EDIT
		// ignored ARROWHEADSIZE, PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE		
		CMBArrowAnnotation a = (CMBArrowAnnotation) annotation;
		String result = annotationTypeAsString(a) + System.getProperty("line.separator");
		//Get arrow horizontal direction
		if (a.getInvertHorizontal()) {
			result += "X2 = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
			result += "X1 = " + new Integer(adjustToV1(a.getDrawRect().x + a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		} else {
			result += "X1 = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
			result += "X2 = " + new Integer(adjustToV1(a.getDrawRect().x + a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		}
		//Get arrow vertical direction
		if (a.getInvertVertical()) {
			result += "Y2 = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
			result += "Y1 = " + new Integer(adjustYToV1(a.getDrawRect().y + a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		} else {
			result += "Y1 = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
			result += "Y2 = " + new Integer(adjustYToV1(a.getDrawRect().y + a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		}
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " + pageData.pageSizeToString(pageIndex) + System.getProperty("line.separator");
		result += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		if(a.getTransparent())
			result += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
		else
			result += "SEMITRANSPARENT = 0" + System.getProperty("line.separator");
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of circle annotation. 
	 */
	private CMBPageAnnotation convertCircleToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X", p, 0), pageIndex);
		int y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y", p, 0), pageIndex);
		int w = adjustXToCM(PAnnotationUtilities.getIntegerProperty("WIDTH", p, 0), pageIndex);
		int h = adjustYToCM(PAnnotationUtilities.getIntegerProperty("HEIGHT", p, 0), pageIndex);

		int linew = adjustXToCM(PAnnotationUtilities.getIntegerProperty("LINEWIDTH", p, 0), pageIndex);
		annotation.setBorderWidth(linew);
		
		String colorstring = "";
		if(useWhiteDefaultColor)
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR_WHITE_TRANSPARENT);
		else
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();

		Color fillcolor = new Color(r, g, b);
		annotation.setFillColor(fillcolor);
		if (rgb.length == 4)
			annotation.setTransparent(true);

		annotation.setDrawRect(x - w, y - h, w * 2, h * 2);
		return annotation;
	}
	
	/**
	 * Converts circle annotation to String in View One Format.
	 */
	private String convertCircleToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X, Y, WIDTH, HEIGHT, PAGE, LINEWIDTH, COLOR, FILLCOLOR, PAGESIZE, SEMITRANSPARENT, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE
		CMBCircleAnnotation a = (CMBCircleAnnotation) annotation;
		int centerX = adjustToV1(a.getDrawRect().x + a.getDrawRect().width / 2, pageIndex);
		int centerY = adjustYToV1(a.getDrawRect().y + a.getDrawRect().height / 2, pageIndex);
		int w = adjustToV1(a.getDrawRect().width / 2, pageIndex);
		int h = adjustYToV1(a.getDrawRect().height / 2, pageIndex);

		String result = annotationTypeAsString(a) + System.getProperty("line.separator");
		result += "X = " + new Integer(centerX) + System.getProperty("line.separator");
		result += "Y = " + new Integer(centerY) + System.getProperty("line.separator");
		result += "WIDTH = " + new Integer(w) + System.getProperty("line.separator");
		result += "HEIGHT = " + new Integer(h) + System.getProperty("line.separator");
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " + pageData.pageSizeToString(pageIndex) + System.getProperty("line.separator");
		result += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		c = a.getFillColor();
		result += setTranparancy(a.getTransparent(),c);
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of highlight annotation. 
	 */
	private CMBPageAnnotation convertHighlightToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X", p, 0), pageIndex);
		int y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y", p, 0), pageIndex);
		int w = adjustXToCM(PAnnotationUtilities.getIntegerProperty("WIDTH", p, 0), pageIndex);
		int h = adjustYToCM(PAnnotationUtilities.getIntegerProperty("HEIGHT", p, 0), pageIndex);

		int linew = adjustXToCM(PAnnotationUtilities.getIntegerProperty("LINEWIDTH", p, 0), pageIndex);
		annotation.setBorderWidth(linew);

		String colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();
		int a = 130;
		Color fillcolor = new Color(r, g, b, a);
		annotation.setFillColor(fillcolor);

		annotation.setDrawRect(x, y, w, h);
		return annotation;
	}
	
	/**
	 * Converts highlight annotation to String in View One Format.
	 */
	private String convertHighlightToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X, Y, WIDTH, HEIGHT, PAGE, LINEWIDTH, COLOR, FILLCOLOR, SEMITRANSPARENT, PAGESIZE, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE	
		CMBHighlightAnnotation a = (CMBHighlightAnnotation) annotation;
		String result = annotationTypeAsString(a) + System.getProperty("line.separator");
		result += "X = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
		result += "Y = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
		result += "WIDTH = " + new Integer(adjustToV1(a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		result += "HEIGHT = " + new Integer(adjustYToV1(a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " +  pageData.pageSizeToString(pageIndex)+ System.getProperty("line.separator");
		result += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		Color c = a.getFillColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		result += "FILLCOLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if(a.getTransparent())
			result += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
		else
			result += "SEMITRANSPARENT = 0" + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of line annotation. 
	 */
	private CMBPageAnnotation convertLineToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x1 = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X1", p, 0), pageIndex);
		int y1 = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y1", p, 0), pageIndex);
		int x2 = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X2", p, 0), pageIndex);
		int y2 = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y2", p, 0), pageIndex);
		
		((CMBLineAnnotation) annotation).setBeginPoint(new Point(x1,y1));
		((CMBLineAnnotation) annotation).setEndPoint(new Point(x2,y2));
		
		int linew = adjustXToCM(PAnnotationUtilities.getIntegerProperty("LINEWIDTH", p, 0), pageIndex);
		annotation.setBorderWidth(linew);

		String colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();
		Color fillcolor = new Color(r, g, b);
		annotation.setFillColor(fillcolor);

		annotation.setDrawRect(x1, y1, x2 - x1, y2 - y1);
		int semiTransparent = PAnnotationUtilities.getIntegerProperty("SEMITRANSPARENT", p, 0);
		annotation.setTransparent(semiTransparent==1);
		return annotation;
	}
	
	/**
	 * Converts line annotation to String in View One Format.
	 */
	private String convertLineToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X1, Y1, X2, Y2, PAGE, LINEWIDTH, COLOR, SEMITRANSPARENT, PAGESIZE, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE		
		CMBLineAnnotation a = (CMBLineAnnotation) annotation;
		String result = annotationTypeAsString(a) + System.getProperty("line.separator");
		if(a.getInvertHorizontal()){
			result += "X2 = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
			result += "X1 = " + new Integer(adjustToV1(a.getDrawRect().x + a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		}
		else{
			result += "X1 = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
			result += "X2 = " + new Integer(adjustToV1(a.getDrawRect().x + a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		}
		if(a.getInvertVertical()){
			result += "Y2 = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
			result += "Y1 = " + new Integer(adjustYToV1(a.getDrawRect().y + a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		}
		else{
			result += "Y1 = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
			result += "Y2 = " + new Integer(adjustYToV1(a.getDrawRect().y + a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		}
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " + pageData.pageSizeToString(pageIndex) + System.getProperty("line.separator");
		result += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		if(a.getTransparent())
			result += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
		else
			result += "SEMITRANSPARENT = 0" + System.getProperty("line.separator");
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of note annotation. 
	 */
	private CMBPageAnnotation convertNoteToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X", p, 0), pageIndex);
		int y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y", p, 0), pageIndex);
		int w = adjustXToCM(PAnnotationUtilities.getIntegerProperty("WIDTH", p, 0), pageIndex);
		int h = adjustYToCM(PAnnotationUtilities.getIntegerProperty("HEIGHT", p, 0), pageIndex);
		String colorstring = "";
		if(useWhiteDefaultColor)
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR_WHITE_TRANSPARENT);
		else
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();
		Color fillcolor = new Color(r, g, b);
		annotation.setFillColor(fillcolor);
		colorstring = PAnnotationUtilities.getStringProperty("COLOR", p, DEFAULT_COLOR);
		rgb = colorstring.split(",");
		r = new Integer(rgb[0].trim()).intValue();
		g = new Integer(rgb[1].trim()).intValue();
		Color bordercolor = new Color(r, g, b);
		if(fillcolor.equals(bordercolor))
			annotation.setBorderColor(Color.black);

		String fonttype = PAnnotationUtilities.getStringProperty("FONTTYPE", p, "Arial");
		int fontheight = PAnnotationUtilities.getIntegerProperty("FONTHEIGHT", p, 20);
		Font font = PAnnotationUtilities.getValidDefaultFont(fonttype, "bold", fontheight);
		
		// set strike through
		boolean strikethrough = PAnnotationUtilities.getIntegerProperty("STRIKETHROUGH", p, 0) == 1? true : false;
		font = CMBViewOneAnnotationUtil.getStrikethroughFont(font, strikethrough);
		
		annotation.setFont(font);
		
		String text = PAnnotationUtilities.getStringProperty("TEXT", p, "text");
		// replace all <N> with new line character
		((CMBNoteAnnotation) annotation).setText(text.replaceAll("<N>", System.getProperty("line.separator")));

		annotation.setDrawRect(x, y, w, h);
		return annotation;
	}
	
	/**
	 * Converts note annotation to String in View One Format.
	 */
	private String convertNoteToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X, Y, WIDTH, HEIGHT, TEXT, PAGE, LINEWIDTH, COLOR, FILLCOLOR, FONTTYPE, FONTHEIGHT, TRANSPARENT, PAGESIZE, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE		
		CMBNoteAnnotation a = (CMBNoteAnnotation) annotation;
		String result  = "";
		//if renderStickyNoteAsTextAnnotation and isV1JonsMimetypeAvailable are true, we convert stickynote annotation to text annotation to allow text box resizable.
		if(!renderStickyNoteAsTextAnnotation && isV1JonsMimetypeAvailable){
			result = annotationTypeAsString(a) + System.getProperty("line.separator");
			result += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		}else{
			result = "[TEXT]" + System.getProperty("line.separator");
		}
		
		result += "X = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
		result += "Y = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
		result += "TEXT = " + ToV1LineBreak(a.getText()) + System.getProperty("line.separator");
		result += "WIDTH = " + new Integer(adjustToV1(a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		result += "HEIGHT = " + new Integer(adjustYToV1(a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " +  pageData.pageSizeToString(pageIndex)+ System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		c = a.getFillColor();
		result += "FILLCOLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		boolean bWhiteBackGround = a.getTransparent();
		if(useWhiteDefaultColor)
			bWhiteBackGround = (c.getRed()==255 && c.getGreen()==255 && c.getBlue()==255);
		else
			bWhiteBackGround = (c.getRed()==255 && c.getGreen()==255 && c.getBlue()==0);
		result += setTransparancy(a.getTransparent(), a.getBorderWidth(), bWhiteBackGround);
		result += "FONTTYPE = " + a.getFont().getName() + System.getProperty("line.separator");
		result += "FONTHEIGHT = " + new Integer(adjustFontHeight(a.getFont().getSize(), pageIndex)) + System.getProperty("line.separator");
		
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of pen annotation. 
	 */
	private CMBPageAnnotation convertPenToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		String colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();
		Color fillcolor = new Color(r, g, b);
		annotation.setFillColor(fillcolor);

		int linew = adjustXToCM(PAnnotationUtilities.getIntegerProperty("LINEWIDTH", p, 0), pageIndex);
		annotation.setBorderWidth(linew);
		
		int semiTransparent = PAnnotationUtilities.getIntegerProperty("SEMITRANSPARENT", p, 0);
		annotation.setTransparent(semiTransparent==1);
		// get pen strokes
		boolean done = false;
		int pt = 1;
		Point startPt = new Point();
		Point endPt = new Point();
		Vector<CMBPenStroke> strokes = new Vector<CMBPenStroke>();

		startPt.x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X1", p, 0), pageIndex);
		startPt.y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y1", p, 0), pageIndex);
		while (!done) {
			pt++;
			if ((p.containsKey("X" + pt)) && (p.containsKey("Y" + pt))) {
				endPt.x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X" + pt, p, 0), pageIndex);
				endPt.y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y" + pt, p, 0), pageIndex);

				CMBPenStroke stroke = new CMBPenStroke(startPt, endPt);
				strokes.add(stroke);
				startPt.x = endPt.x;
				startPt.y = endPt.y;
			} else
				done = true;
		}

		((CMBPenAnnotation) annotation).setPenStrokes(strokes);
		return annotation;
	}
	
	/**
	 * Converts pen annotation to String in View One Format.
	 */
	private String convertPenToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X, Y, PAGE, LINEWIDTH, COLOR, SEMITRANSPARENT, PAGESIZE, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE	
		String start = "";
		String points = "";
		
		CMBPenAnnotation a = (CMBPenAnnotation) annotation;
		start = annotationTypeAsString(a) + System.getProperty("line.separator");
		start += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		start += "PAGESIZE = " +  pageData.pageSizeToString(pageIndex)+ System.getProperty("line.separator");

		Color c = a.getBorderColor();
		start += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		start += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		start += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			start += "EDIT = 0" + System.getProperty("line.separator");
		
		String result = start;
		
		Vector strokes = a.getPenStrokes();
		CMBPenStroke stroke;
		int endX = 0;
		int endY = 0;
		int startIndex = 0;
		for (int penIndex = 0; penIndex < strokes.size(); penIndex++) {
			stroke = (CMBPenStroke) strokes.elementAt(penIndex);
			if(penIndex != startIndex && (stroke.from.x!=endX||stroke.from.y!=endY)){
				points += "X" + (penIndex - startIndex + 1) + " = " + new Integer(adjustToV1(endX, pageIndex)) + System.getProperty("line.separator");
				points += "Y" + (penIndex - startIndex + 1) + " = " + new Integer(adjustYToV1(endY, pageIndex)) + System.getProperty("line.separator");
				if(penIndex - startIndex + 1 == 2){
					points += "X" + (penIndex - startIndex + 2) + " = " + new Integer(adjustToV1(endX, pageIndex)) + System.getProperty("line.separator");
					points += "Y" + (penIndex - startIndex + 2) + " = " + new Integer(adjustYToV1(endY, pageIndex)) + System.getProperty("line.separator");
				}
				result += points;
				result += start;
				startIndex = penIndex;
				points = "";
			}
			points += "X" + (penIndex - startIndex + 1) + " = " + new Integer(adjustToV1(stroke.from.x, pageIndex)) + System.getProperty("line.separator");
			points += "Y" + (penIndex - startIndex + 1) + " = " + new Integer(adjustYToV1(stroke.from.y, pageIndex)) + System.getProperty("line.separator");
			endX = stroke.to.x;
			endY = stroke.to.y;
		}
		points += "X" + (strokes.size() - startIndex + 1) + " = " + new Integer(adjustToV1(endX, pageIndex)) + System.getProperty("line.separator");
		points += "Y" + (strokes.size() - startIndex + 1) + " = " + new Integer(adjustYToV1(endY, pageIndex)) + System.getProperty("line.separator");
		if(strokes.size() - startIndex + 1 == 2){
			points += "X" + (strokes.size() - startIndex + 2) + " = " + new Integer(adjustToV1(endX, pageIndex)) + System.getProperty("line.separator");
			points += "Y" + (strokes.size() - startIndex + 2) + " = " + new Integer(adjustYToV1(endY, pageIndex)) + System.getProperty("line.separator");
		}
		result += points;
		if(a.getTransparent())
			result += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
		else
			result += "SEMITRANSPARENT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of rectangle annotation. 
	 */
	private CMBPageAnnotation convertRectToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X", p, 0), pageIndex);
		int y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y", p, 0), pageIndex);
		int w = adjustXToCM(PAnnotationUtilities.getIntegerProperty("WIDTH", p, 0), pageIndex);
		int h = adjustYToCM(PAnnotationUtilities.getIntegerProperty("HEIGHT", p, 0), pageIndex);

		int linew = adjustXToCM(PAnnotationUtilities.getIntegerProperty("LINEWIDTH", p, 0), pageIndex);
		annotation.setBorderWidth(linew);
		String colorstring = "";
		if(useWhiteDefaultColor)
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR_WHITE_TRANSPARENT);
		else
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();

		Color fillcolor = new Color(r, g, b);
		annotation.setFillColor(fillcolor);
		if (rgb.length == 4)
			annotation.setTransparent(true);

		annotation.setDrawRect(x, y, w, h);
		return annotation;
	}
	
	/**
	 * Converts rectangle annotation to String in View One Format.
	 */
	private String convertRectToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X, Y, WIDTH, HEIGHT, PAGE, LINEWIDTH, COLOR, FILLCOLOR, TRANSPARENT, PAGESIZE, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE		
		CMBRectAnnotation a = (CMBRectAnnotation) annotation;
		String result = annotationTypeAsString(a) + System.getProperty("line.separator");
		result += "X = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
		result += "Y = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
		result += "WIDTH = " + new Integer(adjustToV1(a.getDrawRect().width, pageIndex)) + System.getProperty("line.separator");
		result += "HEIGHT = " + new Integer(adjustYToV1(a.getDrawRect().height, pageIndex)) + System.getProperty("line.separator");
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " +  pageData.pageSizeToString(pageIndex)+ System.getProperty("line.separator");
		result += "LINEWIDTH = " + new Integer(adjustToV1(a.getBorderWidth(), pageIndex)) + System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		c = a.getFillColor();
		result += setTranparancy(a.getTransparent(),c);
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of stamp annotation. 
	 */
	private CMBPageAnnotation convertStampToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X", p, 0), pageIndex);
		int y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y", p, 0), pageIndex);
		
		int w = adjustXToCM(PAnnotationUtilities.getIntegerProperty("WIDTH", p, 0), pageIndex);
		int h = adjustYToCM(PAnnotationUtilities.getIntegerProperty("HEIGHT", p, 0), pageIndex);
		
		String fonttype = PAnnotationUtilities.getStringProperty("FONTTYPE", p, "Arial");
		int fontheight = PAnnotationUtilities.getIntegerProperty("FONTHEIGHT", p, 10);
		Font font = PAnnotationUtilities.getValidDefaultFont(fonttype, "bold", fontheight);
		
		// set strike through
		boolean strikethrough = PAnnotationUtilities.getIntegerProperty("STRIKETHROUGH", p, 0) == 1? true : false;
		font = CMBViewOneAnnotationUtil.getStrikethroughFont(font, strikethrough);
		
		annotation.setFont(font);

		String text = PAnnotationUtilities.getStringProperty("TEXT", p, "text");
		// replace all <N> with new line character
		((CMBStampAnnotation) annotation).setStampText(text.replaceAll("<N>", System.getProperty("line.separator")));
		int semiTransparent = PAnnotationUtilities.getIntegerProperty("SEMITRANSPARENT", p, 0);
		annotation.setTransparent(semiTransparent==1||annotation.getTransparent());
		annotation.setDrawRect(x, y, w, h);
		return annotation;
	}
	
	/**
	 * Converts stamp annotation to String in View One Format.
	 */
	private String convertStampToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		CMBStampAnnotation a = (CMBStampAnnotation) annotation;
		// supported X, Y, FONTTYPE, FONTHEIGHT, SEIMITRANSPARENT, BORDER, TEXT, COLOR, TEXTALIGNMENT, TRANSPARENT, PAGESIZE, EDIT
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE	

		// TODO: set image stamps to STAMP annotation; text stamp will continue to be TEXT annotation
		String result = "[TEXT]" + System.getProperty("line.separator");
		result += "X = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
		result += "Y = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " +  pageData.pageSizeToString(pageIndex)+ System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		
		c = a.getFillColor();
		result += "FILLCOLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		boolean bWhiteBackGround = a.getTransparent();
		if(useWhiteDefaultColor)
			bWhiteBackGround = (c.getRed()==255 && c.getGreen()==255 && c.getBlue()==255);
		else
			bWhiteBackGround = (c.getRed()==255 && c.getGreen()==255 && c.getBlue()==0);
		result += setTransparancy(a.getTransparent(), a.getBorderWidth(), bWhiteBackGround);
		
		if (a.isImageStamp())
			result += "TEXT = X" + System.getProperty("line.separator");
		else
			result += "TEXT = " + ToV1LineBreak(a.getStampText()) + System.getProperty("line.separator");
		Map attributes = a.getFont().getAttributes();
		Iterator entries = attributes.entrySet().iterator(); 
		while (entries.hasNext()) { 
		  Map.Entry entry = (Map.Entry) entries.next(); 
		  TextAttribute key = (TextAttribute)entry.getKey(); 
		  if(key.equals(TextAttribute.STRIKETHROUGH) && (Boolean)entry.getValue()){
				result += "STRIKETHROUGH = 1" + System.getProperty("line.separator");
		  }
		}
		result += "FONTTYPE = " + a.getFont().getName() + System.getProperty("line.separator");
		result += "FONTHEIGHT = " + new Integer(adjustFontHeight(a.getFont().getSize(), pageIndex)) + System.getProperty("line.separator");
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");

		result += "TEXTALIGNMENT = CENTRE" + System.getProperty("line.separator");
		
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts properties of text annotation. 
	 */
	private CMBPageAnnotation convertTextToCM(CMBPageAnnotation annotation, Properties p, int pageIndex) {
		int x = adjustXToCM(PAnnotationUtilities.getIntegerProperty("X", p, 0), pageIndex);
		int y = adjustYToCM(PAnnotationUtilities.getIntegerProperty("Y", p, 0), pageIndex);

		String fonttype = PAnnotationUtilities.getStringProperty("FONTTYPE", p, "Arial");
		int fontheight = adjustFontSize(PAnnotationUtilities.getIntegerProperty("FONTHEIGHT", p, 10), pageIndex);
		Font font = PAnnotationUtilities.getValidDefaultFont(fonttype, "bold", fontheight);
		
		// set strike through
		boolean strikethrough = PAnnotationUtilities.getIntegerProperty("STRIKETHROUGH", p, 0) == 1? true : false;
		font = CMBViewOneAnnotationUtil.getStrikethroughFont(font, strikethrough);
		
		annotation.setFont(font);

		int border = PAnnotationUtilities.getIntegerProperty("BORDER", p, 10);
		annotation.setBorderWidth(border);

		String text = PAnnotationUtilities.getStringProperty("TEXT", p, "text");
		// replace all <N> with new line character						
		((CMBTextAnnotation) annotation).setTextLine(text.replaceAll("<N>", System.getProperty("line.separator")));

		int w = adjustXToCM(PAnnotationUtilities.getIntegerProperty("WIDTH", p, 0), pageIndex);
		int h = adjustYToCM(PAnnotationUtilities.getIntegerProperty("HEIGHT", p, 0), pageIndex);
		
		String colorstring = "";
		if(useWhiteDefaultColor)
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR_WHITE_TRANSPARENT);
		else
			colorstring = PAnnotationUtilities.getStringProperty("FILLCOLOR", p, DEFAULT_COLOR);
		String[] rgb = colorstring.split(",");
		int r = new Integer(rgb[0].trim()).intValue();
		int g = new Integer(rgb[1].trim()).intValue();
		int b = new Integer(rgb[2].trim()).intValue();
		Color fillcolor = new Color(r, g, b);
		annotation.setFillColor(fillcolor);
		int semiTransparent = PAnnotationUtilities.getIntegerProperty("SEMITRANSPARENT", p, 0);
		annotation.setTransparent(semiTransparent==1||annotation.getTransparent());
		annotation.setDrawRect(x, y, w, h);
		return annotation;
	}
	
	/**
	 * Converts text annotation to String in View One Format.
	 */
	private String convertTextToViewOne(CMBPageAnnotation annotation, int pageIndex) {
		// supported X, Y, FONTTYPE, FONTHEIGHT, SEIMITRANSPARENT, BORDER, TEXT, COLOR, TRANSPARENT, PAGESIZE, EDIT, STRIKETHROUGH
		// ignored PAGEURL, LABEL, CREATEDATE, MODIFIEDDATE		
		CMBTextAnnotation a = (CMBTextAnnotation) annotation;
		String result = annotationTypeAsString(a) + System.getProperty("line.separator");
		result += "X = " + new Integer(adjustToV1(a.getDrawRect().x, pageIndex)) + System.getProperty("line.separator");
		result += "Y = " + new Integer(adjustYToV1(a.getDrawRect().y, pageIndex)) + System.getProperty("line.separator");
		result += "PAGE = " + a.getPageNumber() + System.getProperty("line.separator");
		result += "PAGESIZE = " +  pageData.pageSizeToString(pageIndex)+ System.getProperty("line.separator");
		Color c = a.getBorderColor();
		result += "COLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		c = a.getFillColor();
		result += "FILLCOLOR = " + c.getRed() + "," + c.getGreen() + "," + c.getBlue() + System.getProperty("line.separator");
		boolean bWhiteBackGround = a.getTransparent();
		if(useWhiteDefaultColor)
			bWhiteBackGround = (c.getRed()==255 && c.getGreen()==255 && c.getBlue()==255);
		else
			bWhiteBackGround = (c.getRed()==255 && c.getGreen()==255 && c.getBlue()==0);
		result += setTransparancy(a.getTransparent(), 0, bWhiteBackGround);
		
		result += "TEXT = " + ToV1LineBreak(a.getTextLine()) + System.getProperty("line.separator");
		result += "FONTTYPE = " + a.getFont().getName() + System.getProperty("line.separator");
		result += "FONTHEIGHT = " + new Integer(adjustFontHeight(a.getFont().getSize(), pageIndex)) + System.getProperty("line.separator");
		Map attributes = a.getFont().getAttributes();
		Iterator entries = attributes.entrySet().iterator(); 
		while (entries.hasNext()) { 
		  Map.Entry entry = (Map.Entry) entries.next(); 
		  TextAttribute key = (TextAttribute)entry.getKey(); 
		  if(key.equals(TextAttribute.STRIKETHROUGH) && (Boolean)entry.getValue()){
				result += "STRIKETHROUGH = 1" + System.getProperty("line.separator");
		  }
		}
		
		result += "CUSTOMPROPERTY = CM8:" + PAnnotationUtilities.toString(a) + System.getProperty("line.separator");
		if (!allowEdit)
			result += "EDIT = 0" + System.getProperty("line.separator");
		return result;
	}
	
	/**
	 * Converts line break to String in View One Format.
	 */
	private String ToV1LineBreak(String text){
		return text.replaceAll(System.getProperty("line.separator"), "<N>").replaceAll("\\n", "<N>").replaceAll("\\r", "<N>");
	}

	/**
	 * Set the transparency of text annotation/note annotation/stamp annotation fill color.
	 */
	private String setTransparancy(boolean transparent, int borderWidth, boolean bWhiteBackGround){
		String ret = "";
		
		if(!transparent){
			ret += "TRANSPARENT = 0" + System.getProperty("line.separator");
		}else if(borderWidth!=0||!bWhiteBackGround){
			ret += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
			ret += "TRANSPARENT = 0" + System.getProperty("line.separator");
		}else{
			ret += "TRANSPARENT = 1" + System.getProperty("line.separator");
		}
		
		return ret;
	}
	
	/**
	 * Set the transparency of circle annotation/rectangle annotation fill color.
	 */
	private String setTranparancy(boolean transparent,Color fillColor){
		String ret = "";
		boolean ifFillColor = transparent;
		if(useWhiteDefaultColor)
			ifFillColor = (fillColor.getRed()==255 && fillColor.getGreen()==255 && fillColor.getBlue()==255);
		else
			ifFillColor = (fillColor.getRed()==255 && fillColor.getGreen()==255 && fillColor.getBlue()==0);
		if(!transparent){
			ret += "TRANSPARENT = 0" + System.getProperty("line.separator");
			ret += "FILLCOLOR = " + fillColor.getRed() + "," + fillColor.getGreen() + "," + fillColor.getBlue() + System.getProperty("line.separator");
		}else if(!ifFillColor){
			ret += "TRANSPARENT = 1" + System.getProperty("line.separator");
			ret += "FILLCOLOR = " + fillColor.getRed() + "," + fillColor.getGreen() + "," + fillColor.getBlue() + System.getProperty("line.separator");
			ret += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
		}
		else{
			ret += "TRANSPARENT = 1" + System.getProperty("line.separator");
			ret += "SEMITRANSPARENT = 1" + System.getProperty("line.separator");
		}
		
		return ret;
	}
	
	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#terminate()
	 */
	public void terminate() {
		// nothing to do
	}

	/* (non-Javadoc)
	 * @see com.ibm.mm.viewer.annotation.CMBAnnotationEngine#updateAnnotation(java.lang.Object, com.ibm.mm.viewer.annotation.CMBPageAnnotation, int)
	 */
	public void updateAnnotation(Object hAnnotationSet, CMBPageAnnotation pageAnnotation, int index) throws CMBAnnotationEngineException {
	}

	static void writeStreamToStream(InputStream inStream, OutputStream outStream) throws IOException {
		byte[] buf = new byte[1024];
		int len = 0;
		do {
			len = inStream.read(buf);
			if (len > 0) {
				outStream.write(buf, 0, len);
			}
		} while (len >= 0);
	}
	
	/**
	 * This is used to convert the Daeja x to CM x.
	 * 
	 * @param x  The x value of annotation in Daeja
	 * @param pageIndex The page number of the annotation
	 * @return The x value of annotation in CM
	 * 
	 * xFactor pagesize different in x
	 * cmXdpi current page xdpi in CM
	 * V1_DPI dpi in Daeja
	 */
	int adjustXToCM(int x, int pageIndex) {
		int cmXdpi = pageData.xResolution(pageIndex);
		if(cmXdpi > 0)
			return (int) (x * (xFactor * cmXdpi / V1_DPI));
		else
			return (int) (x * (xFactor * cmdpi / V1_DPI));
	}
	
	/**
	 * This is used to convert the Daeja y to CM y.
	 * 
	 * @param y  The y value of annotation in Daeja
	 * @param pageIndex The page number of the annotation
	 * @return The y value of annotation in CM
	 * 
	 * yFactor pagesize different in y
	 * cmYdpi current page ydpi in CM
	 * V1_DPI dpi in Daeja
	 */
	int adjustYToCM(int y, int pageIndex) {
		int cmYdpi = pageData.yResolution(pageIndex);
		if(cmYdpi > 0)
			return (int) (y * (yFactor * cmYdpi / V1_DPI));
		else
			return (int) (y * (yFactor * cmdpi / V1_DPI));
	}
	
	/**
	 * This is used to convert the CM x to Daeja x.
	 * 
	 * @param x  The x value of annotation in CM
	 * @param pageIndex The page number of the annotation
	 * @return The x value of annotation in Daeja
	 * 
	 * cmXdpi current page xdpi in CM
	 * V1_DPI dpi in Daeja
	 */
	int adjustToV1(int x, int pageIndex) {
		int cmXdpi = pageData.xResolution(pageIndex);
		if(cmXdpi > 0)
			return x * V1_DPI/ cmXdpi;
		else
			return x * V1_DPI / cmdpi;
	}
	
	/**
	 * This is used to convert the CM y to Daeja y.
	 * 
	 * @param y  The y value of annotation in CM
	 * @param pageIndex The page number of the annotation
	 * @return The y value of annotation in Daeja
	 * 
	 * cmYdpi current page ydpi in CM
	 * V1_DPI dpi in Daeja
	 */
	int adjustYToV1(int y, int pageIndex) {
		int cmYdpi = pageData.yResolution(pageIndex);
		if(cmYdpi > 0)
			return y * V1_DPI/ cmYdpi;
		else 
			return y * V1_DPI / cmdpi;
	}
	
	/**
	 * This is used to convert the font size from Daeja to CM.
	 * 
	 * @param size  The font size value of annotation in Daeja
	 * @param pageIndex The page number of the annotation
	 * @return The font height of annotation in CM
	 * 
	 * cmYdpi current page ydpi in CM
	 * V1_DPI dpi in Daeja
	 */
	int adjustFontHeight(int size, int pageIndex) {
		int cmYdpi = pageData.yResolution(pageIndex);
		if(cmdpi==cmYdpi){
			return Math.round((float)(size*((float)V1_DPI/cmdpi)*104.0/100.0));
		}
		else if(cmYdpi > 0){
			if(cmYdpi>cmdpi)
				return (int) Math.round((float)(size *104.0/100.0 *cmYdpi/cmdpi)*(2.0*(float)V1_DPI/(cmYdpi+cmdpi)));
			else
				return (int) Math.round((float)(size *104.0/100.0 *cmdpi/cmYdpi)*(2.0*(float)V1_DPI/(cmYdpi+cmdpi)));
		}
		else 
			return (int) Math.round((float)(size * 104.0)/100.0*((float)V1_DPI/cmdpi));
	}
	
	/**
	 * This is used to convert the font size height from CM to Daeja.
	 * 
	 * @param height  The font height value of annotation in cm
	 * @param pageIndex The page number of the annotation
	 * @return The font size of annotation in Daeja
	 * 
	 * cmYdpi current page ydpi in CM
	 * V1_DPI dpi in Daeja
	 */
	int adjustFontSize(int height, int pageIndex) {
		double r = PageSizeRatio();
		int cmYdpi = pageData.yResolution(pageIndex);
		if(cmdpi==cmYdpi){
			return Math.round((float)(height*100.0*r*(cmdpi/ (float)V1_DPI)/104.0));
		}
		if(cmYdpi > 0){
			if(cmYdpi>cmdpi)
				return (int) Math.round((height*cmdpi/cmYdpi)*r*100.0/104.0*(2.0*(float)V1_DPI/(cmYdpi+cmdpi)));
			else
				return (int) Math.round((height*cmYdpi/cmdpi)*r*100.0/104.0*(2.0*(float)V1_DPI/(cmYdpi+cmdpi)));
		}
		else 
			return (int) Math.round(height*100.0/104.0*r*((float)V1_DPI/cmdpi));
	}
	
	double PageSizeRatio(){
		if(xFactor == 0 && yFactor == 0)
			return 1.0;
		else
			return (xFactor+yFactor)/2;
	}
}
