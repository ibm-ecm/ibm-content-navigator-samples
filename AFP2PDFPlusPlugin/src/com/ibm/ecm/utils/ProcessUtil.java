package com.ibm.ecm.utils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginServiceCallbacks;

public class ProcessUtil {

	private Properties prop;
	private PluginServiceCallbacks callback;
	private HttpServletRequest request;
	
	public ProcessUtil(PluginServiceCallbacks callbacks, HttpServletRequest request){
		this.callback = callbacks;
		this.request = request;
		
	}

	public void loadproperties(String propsfilepath) throws Exception {

		FileInputStream fis = new FileInputStream(propsfilepath);
		this.prop = new Properties();
		this.prop.load(fis);
		fis.close();

	}

	public void startAFP2PDFService() throws Exception {

		String methodName = "startAFP2PDFService";
		
		String start_process_command = this.prop.getProperty("afp2pdfplus_install_path")+"/StartAFP2PDFServer.sh";

		this.callback.getLogger().logDebug(this, methodName, this.request, "begin running the command.");			
		
		this.callback.getLogger().logDebug(this, methodName, this.request, "afp2pdf plus service start sh file path:"+start_process_command);			
		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.command("/bin/sh", "-c","cd " + this.prop.getProperty("afp2pdfplus_install_path") + ";pwd;./StopAFP2PDFServer.sh;nohup ./StartAFP2PDFServer.sh &");
		
		try {
			Process process = processBuilder.start();
			if(this.callback.getLogger().getLogLevel() == 4) {
				BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
				String line;
				while ((line = reader.readLine()) != null) {
					this.callback.getLogger().logDebug(this, methodName, this.request, line);
				}
			}
			
		} catch (IOException e) {
			this.callback.getLogger().logDebug(this, methodName, this.request, e.toString());
		} catch (Exception e) {
			this.callback.getLogger().logDebug(this, methodName, this.request, e.toString());
		}

		this.callback.getLogger().logDebug(this, methodName, this.request, "finish running the command.");

	}

	public boolean isAFP2PDFServiceStarted() {

		String methodName = "isAFP2PDFServiceStarted";
		String check_command = "ps -ef";
		String afp2pdfplus_service_identifier = this.prop.getProperty("afp2pdfplus_service_identifier");

		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.command("bash", "-c", check_command);

		try {

			Process process = processBuilder.start();
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

			String line;
			while ((line = reader.readLine()) != null) {
				this.callback.getLogger().logDebug(this, methodName, this.request, line);
				if (line.contains(afp2pdfplus_service_identifier)) {
					return true;
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.callback.getLogger().logDebug(this, methodName, this.request, "AFP2PDFPlus process is not found.");

		return false;
	}



}
