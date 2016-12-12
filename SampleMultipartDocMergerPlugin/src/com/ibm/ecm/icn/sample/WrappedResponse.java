package com.ibm.ecm.icn.sample;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginServletResponseWrapper;

//this wrapper will not write anything into response.
public class WrappedResponse extends PluginServletResponseWrapper {

	private ByteArrayOutputStream buffer = null; 
	private ServletOutputStream out = null; 
	
	public WrappedResponse(HttpServletResponse response)  throws IOException {
		super(response);
		buffer = new ByteArrayOutputStream(); 
		out = new WrappedOutputStream(buffer); 
	}
	
	@Override 
	public ServletOutputStream getOutputStream() throws IOException { 
		return out; 
	} 
	
	@Override
	public void setHeader(String name, String value){
		
	}
	
	private class WrappedOutputStream extends ServletOutputStream { 
		private ByteArrayOutputStream bos = null; 

		public WrappedOutputStream(ByteArrayOutputStream stream) throws IOException { 
		bos = stream; 
		} 

		//don't write anything into the response anymore.
		@Override 
		public void write(int b) throws IOException { 
			 
		} 
		
		@Override 
		public void write(byte[] b) throws IOException { 
			 
		} 
	} 
} 
