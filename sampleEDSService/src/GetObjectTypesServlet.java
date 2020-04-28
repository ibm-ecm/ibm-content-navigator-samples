/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
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
