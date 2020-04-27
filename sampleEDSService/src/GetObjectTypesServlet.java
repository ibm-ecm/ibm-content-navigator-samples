/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2012, 2013  All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.json.java.JSONArray;

/**
 * This sample servlet performs the Get Object Types EDS service.
 * The list of supported object types is simply looked up in the ObjectTypes.json file.
 * <p>
 * The request has the following structure:
 * <pre>
 * GET /types?repositoryId=&lt;repositoryId>
 * </pre>
 * The response is in JSON and has the following structure:
 * <pre>
 * [
 * {"symbolicName" : &lt;object type>},
 * // more object types
 * ]
 * </pre>
 */
public class GetObjectTypesServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String repositoryId = req.getParameter("repositoryId");
		System.out.println("sampleEDService.GetObjectTypesServlet: repositoryId="+repositoryId);
		// Note: This sample is not using the repositoryId parameter, and is simply returning the same list of object types regardless of repository.
		// The objectType of a Box metadata template is its ID, which is composed of the template key and template scope (aka enterprise ID),
		// e.g., "myTemplate,enterise_123456". If you wish to use the same property data for a template that is replicated in multiple enterprises,
		// simply parse the ID on the comma and use the first part (i.e., myTemplate) as the symbolicName in the ObjectTypes.json file.
		InputStream objectTypesStream = this.getClass().getResourceAsStream("ObjectTypes.json");
		JSONArray jsonResponse = JSONArray.parse(objectTypesStream);
		PrintWriter writer = resp.getWriter();
		jsonResponse.serialize(writer);
	}

}
