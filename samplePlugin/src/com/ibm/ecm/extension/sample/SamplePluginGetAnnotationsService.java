/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Iterator;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.filenet.api.collection.AnnotationSet;
import com.filenet.api.collection.ContentElementList;
import com.filenet.api.core.Annotation;
import com.filenet.api.core.ContentElement;
import com.filenet.api.core.Document;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.jaxrs.util.MessageResources;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.edms.od.ODNote;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;
import com.ibm.mm.sdk.common.DKLobICM;
import com.ibm.mm.sdk.common.dkXDO;

public class SamplePluginGetAnnotationsService extends PluginService {

	public static final String REPOSITORY_ID = "repositoryId";
	public static final String REPOSITORY_TYPE = "repositoryType";
	public static final String DOCUMENT_ID = "docid";
	public static final String ALT_OUTPUT = "alt_output";
	public static final String P8_VSID = "vsId";
	public static final String P8_VERSION = "version";
	public static final String OD_FOLDER_NAME = "template_name";
	public static final String CM_BOOKMARKS = "cmBookmarks";
	public static final String CM_ANNOTATION_POSITION = "cmAnnotationPosition";

	public String getId() {
		return "samplePluginGetAnnotationsService";
	}

	public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String repositoryId = request.getParameter(REPOSITORY_ID);
		String repositoryType = request.getParameter(REPOSITORY_TYPE);

		Object synchObject = callbacks.getSynchObject(repositoryId, repositoryType);
		if (synchObject != null) {
			synchronized (synchObject) {
				executeS(callbacks, request, response, repositoryId, repositoryType);
			}
		} else {
			executeS(callbacks, request, response, repositoryId, repositoryType);
		}
	}

	private void executeS(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response, String repositoryId, String repositoryType) throws Exception {
		String documentId = request.getParameter(DOCUMENT_ID);
		String p8VsId = request.getParameter(P8_VSID);
		String p8Version = request.getParameter(P8_VERSION);
		String odFolderName = request.getParameter(OD_FOLDER_NAME);
		String sBookmarks = request.getParameter(CM_BOOKMARKS);
		String altOutput = request.getParameter(ALT_OUTPUT);

		boolean cmBookmarks = (sBookmarks != null ? Boolean.valueOf(sBookmarks) : false);

		JSONObject annotationsJSON = null;
		if (altOutput != null && altOutput.equals("native")) {
			NativeAnnotations nativeAnnotations = new NativeAnnotations(request, callbacks, callbacks.getMessageResources());

			try {
				if (repositoryType.equals("p8")) {
					Document document = callbacks.getP8Document(repositoryId, documentId, p8VsId, p8Version);

					AnnotationSet annotations = callbacks.getP8Annotations(document, repositoryId, //
					        new String[] { "Id", "Name", "MimeType", "DateCreated", "Owner", "ContentElements", "ElementSequenceNumber", "ContentType" });
					nativeAnnotations.setP8Annotations(annotations, repositoryId);

				} else if (repositoryType.equals("cm")) {

					if (cmBookmarks) {
						dkXDO bookmarks = callbacks.getCMBookmarksXDO(repositoryId, documentId);
						nativeAnnotations.setCMAnnotations(bookmarks);
					} else {
						dkXDO annotations = callbacks.getCMAnnotationsXDO(repositoryId, documentId);
						nativeAnnotations.setCMAnnotations(annotations);
					}

				} else if (repositoryType.equals("od")) {

					Vector hitAndNotes[] = callbacks.getODNotes(repositoryId, documentId, odFolderName);
					nativeAnnotations.setODNotes(hitAndNotes[1]);

				}
			} catch (Exception exc) {
				exc.printStackTrace();
			}

			annotationsJSON = nativeAnnotations.toJSONObject();
		} else {
			annotationsJSON = callbacks.retrieveJSONAnnotations(repositoryId, repositoryType, documentId, p8VsId, p8Version, odFolderName, cmBookmarks, null);
		}

		JSONResponse jsonResponse = new JSONResponse();
		if (annotationsJSON.get("annotations") != null) {			
			jsonResponse.put("annotations", annotationsJSON.get("annotations"));			
		}
		
		PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "SamplePluginGetAnnotationsService");
	}

	private static class NativeAnnotations {

		AnnotationSet p8Annotations = null;
		String p8RepositoryId;
		dkXDO cmAnnotations = null;
		Vector odNotes = null;
		PluginServiceCallbacks callbacks;

		NativeAnnotations(HttpServletRequest request, PluginServiceCallbacks callbacks, MessageResources resources) {
			this.callbacks = callbacks;
		}

		public void setP8Annotations(AnnotationSet annotations, String repositoryId) {
			this.p8Annotations = annotations;
			this.p8RepositoryId = repositoryId;
		}

		public void setCMAnnotations(dkXDO annotations) {
			this.cmAnnotations = annotations;
		}

		public void setODNotes(Vector notes) {
			this.odNotes = notes;
		}

		public JSONObject toJSONObject() {
			JSONObject jsonObject = new JSONObject();

			if (p8Annotations != null) {
				try {
					JSONArray jsonArray = new JSONArray();
					UserContext uc = UserContext.get();
					uc.pushSubject(callbacks.getP8Subject(p8RepositoryId));

					for (Iterator<Annotation> i = p8Annotations.iterator(); i.hasNext();) {
						Annotation annotation = i.next();
						JSONObject jsonAnnotation = new JSONObject();
						jsonAnnotation.put("id", annotation.get_Id().toString());
						jsonAnnotation.put("name", annotation.get_Name());
						jsonAnnotation.put("className", annotation.getClassName());
						jsonAnnotation.put("mimeType", annotation.get_MimeType());
						jsonAnnotation.put("owner", annotation.get_Owner());
						jsonAnnotation.put("dateCreated", annotation.get_DateCreated().toString());

						ContentElementList contentElements = annotation.get_ContentElements();
						JSONArray elementArray = new JSONArray();
						for (Iterator<ContentElement> cei = contentElements.iterator(); cei.hasNext();) {
							ContentElement element = cei.next();
							JSONObject jsonElement = new JSONObject();
							jsonElement.put("elementSequenceNumber", element.get_ElementSequenceNumber().toString());
							jsonElement.put("contentType", element.get_ContentType());
							elementArray.add(jsonElement);
						}
						jsonAnnotation.put("contentElements", elementArray);
						jsonArray.add(jsonAnnotation);
					}

					uc.popSubject();

					jsonObject.put("p8Annotations", jsonArray);
				} catch (Throwable t) {
					jsonObject.put("p8Annotations", t.getMessage());
				}
			}

			if (cmAnnotations != null) {
				try {
					JSONObject jsonAnnotation = new JSONObject();
					jsonAnnotation.put("partType", cmAnnotations.getPidObject().getObjectType());
					jsonAnnotation.put("objectType", cmAnnotations.getObjectType());

					try {
						if (cmAnnotations instanceof DKLobICM) {
							jsonAnnotation.put("size", String.valueOf(((DKLobICM) cmAnnotations).getSize()));
						}
					} catch (Exception exc) {
						jsonAnnotation.put("size", exc.getMessage());
					}

					try {
						jsonAnnotation.put("mimeType", cmAnnotations.getMimeType());
					} catch (Exception exc) {
						jsonAnnotation.put("mimeType", exc.getMessage());
					}

					jsonObject.put("cmAnnotations", jsonAnnotation);
				} catch (Throwable t) {
					jsonObject.put("cmAnnotations", t.getMessage());
				}
			}

			if (odNotes != null) {
				try {
					JSONArray jsonArray = new JSONArray();
					for (Iterator<ODNote> i = odNotes.iterator(); i.hasNext();) {
						JSONObject jsonNote = new JSONObject();
						ODNote note = i.next();
						jsonNote.put("dateTime", note.getDateTime());
						jsonNote.put("userId", note.getUserId());
						jsonArray.add(jsonNote);
					}

					jsonObject.put("odNotes", jsonArray);
				} catch (Throwable t) {
					jsonObject.put("odNotes", t.getMessage());
				}
			}

			return jsonObject;
		}
	}
}
