/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample.asyncTasks;

import java.io.File;
import java.io.IOException;

import com.filenet.api.util.UserContext;
import com.ibm.ecm.task.Constants;
import com.ibm.ecm.task.TaskLogger;
import com.ibm.ecm.task.commonj.work.BaseTask;
import com.ibm.ecm.task.commonj.work.Utils;
import com.ibm.ecm.task.entities.Task;
import com.ibm.json.java.JSONObject;

public class SampleICNTask extends BaseTask {

	public SampleICNTask(Task task, File logDirectory) throws IOException {
		super(task, logDirectory);
	}

	public void performTask() {
		try {
			TaskLogger.fine(SampleICNTask.class.toString(), "performTask", "Starting sample ICN task.");
			
			for(int i = 0; i < 10; i ++){
				addAuditRecord("SampleICNTask Add",
						"SampleICNTask Action", "SampleICNTask Status",
						"Started by Administrator" + i);
			}
			
			//grabbing information from the task info
			JSONObject taskInfo = JSONObject.parse(task.getTaskInfo());
			JSONObject results = new JSONObject();
			results.put("results", "This task completed successfully!");

			saveTaskInfo(results, taskInfo);
			
			for(int i = 0; i < 10; i ++){
				addAuditRecord("SampleICNTask End",
					"SampleICNTask Action", "SampleICNTask Status",
					"Task finished." + i);
			}
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
	
	public void saveTaskInfo(JSONObject results, JSONObject taskInfo) throws Exception {
		//Saves results for this task on the task's completion.  Developers should be overriding this method to provide implementation for their own task.
		//For an execution record, the result will be saved to the execution's records info.
		String resultsString = results.serialize();

		if(this.taskExecutionRecord != null && (this.task.getTaskMode() == Constants.TASK_RECURRING || this.task.getTaskMode() == Constants.TASK_CALENDAR_ACTION)){
			this.taskExecutionRecord.setTaskExecutionInfo(results.serialize());
			this.updateTaskExecutionRecord();
		}
		else
			taskInfo.put("results", resultsString);

		this.task.setTaskInfo(taskInfo.serialize());

		this.updateTask();
	}
	
	/**
	 * Retrieves the p8 entity id from the doc id string inside of Nexus.  Usually the docId is a combination of className, objectStoreId, itemId.  
	 * Document,{431087A1-82E2-4D34-967D-05DC65F135F8},{3EF43278-18B5-4762-B387-53CD9D9E25FD}
	 * @param docIdString
	 * @return
	 */
	public static String getIdFromDocIdString(String docIdString){

		if(docIdString != null){
			String[] splitFolderId = docIdString.split(",");
			if(splitFolderId.length >= 3)
				return splitFolderId[2];
		}

		return null;
	}
}
