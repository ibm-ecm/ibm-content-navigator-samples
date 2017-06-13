package com.ibm.ecm.icn.plugin.wizards;

public interface ICNProjectInfoProvider {

	String getProjectName();

	void setProjectName(String projectName);

	String getPluginClassName();

	String getLibraryPath();

	String getPluginPackageName();

	String getPluginName();

	String getPluginVersion();

}