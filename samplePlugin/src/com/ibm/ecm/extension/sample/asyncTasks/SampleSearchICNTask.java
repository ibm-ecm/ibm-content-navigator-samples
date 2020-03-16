/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.asyncTasks;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;


import com.filenet.api.util.UserContext;
import com.ibm.ecm.task.Constants;
import com.ibm.ecm.task.TaskLogger;
import com.ibm.ecm.task.commonj.work.BaseTask;
import com.ibm.ecm.task.commonj.work.Utils;
import com.ibm.ecm.task.entities.Task;
import com.ibm.json.java.JSONObject;

public class SampleSearchICNTask extends BaseTask {

	public SampleSearchICNTask(Task task, File logDirectory) throws IOException {
		super(task, logDirectory);
	}

	public void performTask() {
		try {
			TaskLogger.fine(SampleSearchICNTask.class.toString(), "performTask", "Starting sample ICN task.");
			
			addAuditRecord("SampleSearchICNTask Add",
					"SampleICNTask Action", "SampleICNTask Status",
					"Started by Administrator");
			
			//grabbing information from the task info
			JSONObject taskInfo = JSONObject.parse(task.getTaskInfo());
			JSONObject specificTaskRequest = (JSONObject) taskInfo.get("specificTaskRequest");
	
			//performs login
			TaskLogger.fine(SampleSearchICNTask.class.toString(), "performTask", "Attempting to login into ICN.");
	        Map<String,Object> params = new LinkedHashMap<String, Object>();
	        params.put("desktop", "default");
	        params.put("repositoryId", (String)specificTaskRequest.get("repositoryId"));
	        params.put("userid", "p8admin");
	        params.put("password", "p8admin");
	        Map<String, Object> results = connect("http://localhost/navigator/jaxrs/p8/logon", params, null);

	        JSONObject jsonResponse = (JSONObject)results.get("jsonResponse");
	        String securityToken = (String)jsonResponse.get("security_token");
	        String jsessionID = (String)results.get("jsessionID");
	        
		    //performs search
	        params = new LinkedHashMap<String, Object>();
	        params.put("desktop", "default");
	        params.put("repositoryId", (String)specificTaskRequest.get("repositoryId"));
	        params.put("security_token", securityToken);
	        params.put("criterias", (String)specificTaskRequest.get("criterias"));
	        params.put("json_post", (String)specificTaskRequest.get("searchJsonPost"));
	        results = connect("http://localhost/navigator/jaxrs/p8/search", params, jsessionID);
	        jsonResponse = (JSONObject)results.get("jsonResponse");

			if(this.taskExecutionRecord != null && this.task.getTaskMode() == Constants.TASK_RECURRING){
				this.taskExecutionRecord.setTaskExecutionInfo(jsonResponse.serialize());
				this.updateTaskExecutionRecord();
			}
			else
				taskInfo.put("results", jsonResponse.serialize());

			this.task.setTaskInfo(taskInfo.serialize());
			this.updateTask();
			
			addAuditRecord("SampleSearchICNTask End",
					"SampleICNTask Action", "SampleICNTask Status",
					"Task finished.");
		}
		catch(Exception exp){
			this.addError(new Long(0), Utils.captureStackTrace(exp));
			setTaskStatus(Constants.TASK_STATUS_FAILED);
		}
		finally {
			if(UserContext.get().getSubject() != null)
				UserContext.get().popSubject();
		}
		
	}
	
	public Map<String, Object> connect(String urlString, Map<String, Object> params, String jsessionID) throws Exception {
		URL url = new URL(urlString);

        //perform connection with post data
        StringBuilder postData = new StringBuilder();
        for (Map.Entry<String,Object> param : params.entrySet()) {
            if (postData.length() != 0) postData.append('&');
            postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
            postData.append('=');
            postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
        }
        byte[] postDataBytes = postData.toString().getBytes("UTF-8");

        //send login request
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        conn.setRequestMethod("POST");
        if(jsessionID != null)
        	conn.setRequestProperty("Cookie", jsessionID);
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
        conn.setDoOutput(true);
        conn.getOutputStream().write(postDataBytes);
        
        jsessionID = null;
        Map<String, List<String>> headers = conn.getHeaderFields();
        for(String header: headers.keySet()){
        	if(header != null && header.equals("Set-Cookie"))
        		jsessionID = conn.getHeaderField(header);
        }

        //obtain the security token
        String responseString = IOUtils.toString(conn.getInputStream(), "UTF-8");
        
        //erase bad character from response
        responseString = responseString.substring(4, responseString.length());
	    JSONObject jsonResponse = JSONObject.parse(responseString);
	    conn.disconnect();
	    
	    Map<String, Object> results = new HashMap<String, Object>();
	    results.put("jsessionID", jsessionID);
	    results.put("jsonResponse", jsonResponse);
	    return results;
	}
}
