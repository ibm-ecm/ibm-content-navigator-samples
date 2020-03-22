/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.Locale;

import com.ibm.ecm.extension.PluginAsyncTaskType;

/**
 * Provides an abstract class that is extended to define an asynchronous task type provided by the plug-in. Asynchronous
 * tasks are long running processes or services that will be used with the ECM Task Manager. Customers can create custom
 * asynchronous tasks by following the developer's guide of the ECM Task Manager. Customers can then specify the various
 * UIs and configurations that will be displayed in the IBM Content Navigator task pane for this particular type of
 * task.
 */

public class SamplePluginSearchAsyncTaskType extends PluginAsyncTaskType {

	/**
	 * Returns the full canonical class name for this asynchronous task. This class name should match custom class you
	 * have created for the ECM Task Manager.
	 * 
	 * @return A full canonical class name (including packages) for this asynchronous task
	 */
	public String getClassHandlerName(){
		return "com.ibm.ecm.extension.sample.asyncTasks.SampleSearchICNTask";
	}

	/**
	 * Returns a descriptive label for this task that is displayed in the IBM Content Navigator task pane.
	 * 
	 * @return A short description for the menu.
	 */
	public String getName(Locale locale){
		return "Sample Search Plugin ICN Task";
	}

	/**
	 * Returns the name of a Dojo <code>dijit</code> class that provides the creation dialog interface widget for this
	 * asynchronous task. The widget must extend the <code>ecm.widget.taskManager.BaseTaskCreationDialog</code> widget.
	 * An instance of the widget is created and displayed in the IBM Content Navigator task pane when the user selects
	 * to create this type of asynchronous task.
	 * <p>
	 * Refer to the documentation on {@link ecm.widget.taskManager.BaseTaskCreationDialog BaseTaskCreationDialog} for
	 * more information on what is required.
	 * </p>
	 */
	public String getTaskCreationDialogDijitClass() {
		return "samplePluginDojo/asyncTasks/ICNSampleSearchTaskDialog";
	}
	
	/**
	 * Returns the name of a Dojo <code>dijit</code> class that provides the information interface widget for this
	 * asynchronous task. The widget must extend the <code>ecm.widget.taskManager.TaskInformationPane</code> widget. An
	 * instance of the widget is created and displayed in the IBM Content Navigator task pane when the user selects to
	 * view this type of asynchronous task.
	 * <p>
	 * Refer to the documentation on {@link ecm.widget.taskManager.BaseTaskInformationPane BaseTaskInformationPane} for
	 * more information on what is required.
	 * </p>
	 */
	public String getTaskInformationDijitClass() {
		return "samplePluginDojo/asyncTasks/ICNSampleSearchTaskInformationPane";
	}

	/**
	 * Returns the name of the icon style class that will represent this asynchronous task type.
	 * 
	 * @return The name of the icon style class.
	 */
	public String getIconClass() {
		return "ftSearchTemplate";
	}
}
