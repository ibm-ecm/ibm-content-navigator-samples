package com.ibm.ecm.icn.sample;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.beans.cm.CMItem;
import com.ibm.ecm.beans.cm.CMObject;
import com.ibm.ecm.extension.PluginRequestUtil;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.PluginServletResponseWrapper;
import com.ibm.ecm.util.Util;
import com.ibm.json.java.JSONArtifact;
import com.ibm.json.java.JSONObject;
import com.ibm.mm.sdk.common.DKConstant;
import com.ibm.mm.sdk.common.DKConstantICM;
import com.ibm.mm.sdk.common.DKDDO;
import com.ibm.mm.sdk.common.DKLobICM;
import com.ibm.mm.sdk.common.DKNVPair;
import com.ibm.mm.sdk.common.DKParts;
import com.ibm.mm.sdk.common.DKRetrieveOptionsICM;
import com.ibm.mm.sdk.common.DKSequentialIterator;
import com.ibm.mm.sdk.server.DKDatastoreExtICM;
import com.ibm.mm.sdk.server.DKDatastoreICM;
import com.lowagie.text.Document;
import com.lowagie.text.Image;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfWriter;

/**
 * Provides an abstract class that is extended to create a filter for responses
 * from a particular service. The response from the service is provided to the
 * filter in JSON format before it is returned to the web browser. The filter
 * can then modify that response, and the modified response is returned to the
 * web browser.
 */
public class SampleMultipartDocMergeResponseFilter extends PluginResponseFilter {

	private boolean ifPrintNativeDebugInfoBySystemout = false;
	private boolean ignoreOnePartDocument = true;
	
	/**
	 * Returns an array of the services that are extended by this filter.
	 * 
	 * @return A <code>String</code> array of names of the services. These are
	 *         the servlet paths or Struts action names.
	 */
	public String[] getFilteredServices() {
		return new String[] { "/cm/getDocument" };
	}

	/**
	 * Allows a request filter to wrap the incoming response object.
	 * 
	 * @param callbacks
	 *            An instance of <code>PluginServiceCallbacks</code> that contains several functions that can be used by
	 *            the service. These functions provide access to plug-in configuration and content server APIs.
	 * @param request
	 *            The <code>HttpServletRequest</code> object that provides the request. The service can access the
	 *            invocation parameters from the request. <strong>Note:</strong> The request object can be passed to a
	 *            response filter to allow a plug-in to communicate information between a request and response filter.
	 * @param response
	 *            The <code>HttpServletResponse</code> object that provides the response. The service can set headers
	 *            and/or wrap this response in an instance of PluginServletResponseWrapper
	 * @param jsonRequest
	 *            A <code>JSONArtifact</code> that provides the request in JSON format. If the request does not include
	 *            a <code>JSON Artifact</code> object, this parameter returns <code>null</code>.
	 * @return An instance of <code>PluginServletResponseWrapper</code>, that wraps the passed in response object, can
	 *         be returned. Return null if the response is not to be wrapped.
	 * 
	 */
	public PluginServletResponseWrapper wrapResponse(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response, JSONArtifact jsonRequest) throws Exception {
		
		String methodName = "filter";
		String docid = request.getParameter( "docid" );
		String repositoryId = request.getParameter("repositoryId");
		String newDocid = null;
		
		DKDatastoreICM dsICM = callbacks.getCMDatastore(repositoryId);
		
		DKRetrieveOptionsICM retrieveOptions = DKRetrieveOptionsICM.createInstance(dsICM);
		retrieveOptions.partsList(true);
		retrieveOptions.partsAttributes(true);
		retrieveOptions.baseAttributes(true);
		
		// retrieve a CMItem
		CMItem cmItem = callbacks.getCMDocument(repositoryId, docid, retrieveOptions);
		//int contentCount = cmItem.getContentCount();
		int contentCount = cmItem.getContentCount();
		this.printNativeDebugInfo(callbacks, this, methodName, "contentCount = " + contentCount);

		if (contentCount <= 1 && !ignoreOnePartDocument) {
			// If there is only one part, then just return (No need to merge the multipart)
			return null;
		} else {
			synchronized (dsICM) {
				DKDDO updateCmDocumentDDO = cmItem.getDDO(); 
				updateCmDocumentDDO.retrieve();
				this.printNativeDebugInfo(callbacks, this, methodName,"doc id: " + updateCmDocumentDDO.getPidObject().toString());
				
				String fileName = request.getParameter("parm_part_filename") + "_allparts.pdf";
				fileName = fileName.replaceAll("[\\/:*?\"<>|,]", "-"); // Replace characters
				fileName = fileName.replace('\\', '-');
				
				File tempFile;
				
				Document document = null;
				PdfWriter pdfWr = null;
				OutputStream outStream = null;
				InputStream cmInputStream = null;
				InputStream pdfInputStream = null;
				//may need to change to a dedicate path
				File pdfFile = new File( fileName );
				
				try {
					//download parts:
					for (int i = 0; i < contentCount; i++) {
						CMObject part = cmItem.getContent(i);
						// Use item name
						String partFileName = part.getOriginalFileName();
						//String fileNameExt = "." + MimeTypeUtil.getExtFromMimeType(part.getMimeType());
						//may need to handle if there is no originalFileName situation in real env.
						//Then get the doc name, and plus the fileNameExt.
						//If there is no ext can be found, add a fix ext according to real data.
						
						cmInputStream = part.getDataStream();
						tempFile = File.createTempFile("pdfTransfer", partFileName);
						outStream = new FileOutputStream( tempFile );
						if (cmInputStream != null) {
							byte[] buf = new byte[4096];
							int len = cmInputStream.read(buf);
							while (len != -1) {
								outStream.write(buf, 0, len);
								len = cmInputStream.read(buf);
							}
							
							outStream.flush();
							outStream.close();
							cmInputStream.close();
							this.printNativeDebugInfo(callbacks, this, methodName, "Dowload part "+ i + ": " + tempFile.getAbsolutePath() );
							//saving finished.
							
							float width = 0;
							float height = 0;
							
							//loading image into memory
							ByteArrayOutputStream baos = new ByteArrayOutputStream(2048*3);
							InputStream is = new FileInputStream(tempFile);
							for(int length;(length=is.read())!=-1;)
								baos.write(length);
							baos.flush();
							is.close();
							Image image = Image.getInstance(baos.toByteArray());
							
							//get width and height from the first file
							if( i==0 ){
								width = image.width();
								height = image.height();
							}
							
							//generate pdf document for the first time.
							if( document == null ){
								document = new Document(new Rectangle(width,height));
								pdfWr = PdfWriter.getInstance(document, new FileOutputStream(pdfFile));
								document.open();
								this.printNativeDebugInfo(callbacks, this, methodName, "Temp PDF file created:" + pdfFile.getAbsolutePath());
							}
							
							image.setAbsolutePosition(0.0f, 0.0f);
							document.add(image);
							document.newPage();
							baos.close();
							this.printNativeDebugInfo(callbacks, this, methodName, "File added into pdf:" + tempFile.getAbsolutePath());
							
						}
						
						tempFile.delete();
						this.printNativeDebugInfo(callbacks, this, methodName, "temp image file deleted.");
					}
					
					document.close();
					pdfWr.close();
					
					//start to write to response
					this.printNativeDebugInfo(callbacks, this, methodName, "Write pdf file into response.");
					int bufferSize = 32 * 1024;
					OutputStream writeOs = response.getOutputStream();
					pdfInputStream = new FileInputStream(pdfFile);
					try{
						response.setContentLength((int)pdfFile.length());
						response.setContentType("application/pdf");
						response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
						
						byte[] buffer = new byte[bufferSize];
						int length = 0;
						do {
							length = pdfInputStream.read(buffer);
							if (length > 0) {
								writeOs.write(buffer, 0, length);
							}
						} while (length >= 0);
						writeOs.flush();
					} finally {
						// Closes all streams in the chain.
						if (writeOs != null)
							writeOs.close();
					}
					
					
				} catch (Exception ex) {
					ex.printStackTrace();
				} finally {
					try{
						pdfInputStream.close();
						pdfFile.delete();
						this.printNativeDebugInfo(callbacks, this, methodName, "local pdf file deleted.");
					}catch( Exception e ){
						
					}
				}
			}
		}
		//return a wrapped response
		return new WrappedResponse(response);
	}

	private void printNativeDebugInfo( PluginServiceCallbacks callbacks,  Object loggingObject, String methodName, String info ){
		if( ifPrintNativeDebugInfoBySystemout )
		{
			System.out.println(info);
		}else{
			callbacks.getLogger().logDebug(loggingObject, methodName,"checked-in the updated document");
		}
	}

	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception{
		
	}
	
}
