/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.service;

public class Constants {
	
	public static final String OAUTH_TOKEN = "oAuthToken";
	public static final String DOCUSIGN_USERID = "docusignUserId";
	
	public static final String ENVELOPE_ID = "DSEnvelopeID";
	public static final String DOCUMENT_SIGNATURE_STATUS = "DSSignatureStatus";
	
	public static final String STATUS = "status";
	
	public static final String EMAIL_SUB = "emailSubject";
	public static final String EMAIL_MSG = "emailBlurb";
	
	public static final String COMPOSITE_TEMPLATES = "compositeTemplates";
	public static final String INLINE_TEMPLATES = "inlineTemplates";
	public static final String SERVER_TEMPLATES = "serverTemplates";
	public static final String COMPOSITE_TEMPLATE_ID = "compositeTemplateId";
	
	public static final String SEQUENCE = "sequence";
	public static final String TEMPLATE_ID = "templateId";
	
	public static final String RECIPIENTS = "recipients";
	public static final String SIGNERS = "signers";
	public static final String EMAIL = "email";
	public static final String NAME = "name";
	public static final String ROLE_NAME = "roleName";
	public static final String RECIPIENT_ID = "recipientId";
	public static final String CARBON_COPIES = "carbonCopies";
	
	public static final String DOCUMENTS = "documents";
	public static final String DOCUMENTS_BASE64 = "documentBase64";
	public static final String DOCUMENT_ID = "documentId";
	public static final String FILE_EXTENSION = "fileExtension";
	
	// add other mimeTypes to be supported for DocuSign signature requests
	// and set the FILE_EXTENSION for a document in the SignRequestService
	public static final String DOCX_EXTENSION = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
	
	public static final String DOCUSIGN_STAGING_FOLDER = "DocuSignFolder";
	public static enum SIGNATURE_STATUS {
		NONE {
			public String toString() {
				return "None";
			}
			public int getValue() {
				return 0;
			}
		},
		DRAFT {
			public String toString() {
				return "Draft";
			}
			public int getValue() {
				return 1;
			}
		},
		SENT {
			public String toString() {
				return "Sent";
			}
			public int getValue() {
				return 2;
			}
		},
		COMPLETED {
			public String toString() {
				return "Completed";
			}
			public int getValue() {
				return 3;
			}
		},
		CHECKEDIN {
			public String toString() {
				return "Checkedin";
			}
			public int getValue() {
				return 4;
			}
		},
		VOIDED {
			public String toString() {
				return "Voided";
			}
			public int getValue() {
				return 5;
			}
		};
		public abstract int getValue();
	};
	
}