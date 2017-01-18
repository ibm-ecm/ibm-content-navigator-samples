/**
 * Licensed Materials - Property of IBM (C) Copyright IBM Corp. 2016 US Government Users Restricted Rights - Use,
 * duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.icn.extension.docusign.util;

import java.io.File;
import java.net.URL;
import java.net.URLClassLoader;
import java.security.CodeSource;
import java.util.ArrayList;
import java.util.HashMap;

import com.ibm.ecm.extension.utils.ChildFirstURLClassLoader;

public class ClassLoaderUtil {
	
	private static HashMap<String,ChildFirstURLClassLoader> classLoaderMap = new HashMap<String,ChildFirstURLClassLoader>();

	public static URLClassLoader getCustomClassLoader(Class sourceClass) throws Exception {
		
		if(classLoaderMap.get(sourceClass.getName()) != null)
			return classLoaderMap.get(sourceClass.getName());

		CodeSource cs = sourceClass.getProtectionDomain().getCodeSource();
		ArrayList<URL> urlList = new ArrayList<URL>();

		String fileLocation = cs.getLocation().getFile();
		urlList.add(cs.getLocation());

		if (fileLocation.endsWith(".jar") || fileLocation.endsWith(".zip")) {
			// i.e if the plugin is loaded from jar or zip file

			// getting name of file.
			//System.out.println(fileLocation);
			String fileName = fileLocation.substring(
					fileLocation.lastIndexOf("/")+1,
					fileLocation.lastIndexOf("."));
			fileLocation = fileLocation.substring(0,
					fileLocation.lastIndexOf("/") + 1)
					+ fileName + "_libs" + "/";
		//	System.out.println(fileLocation);
		}

		File sourceLocation = new File(fileLocation);
		File[] filesList = sourceLocation.listFiles();

		if (filesList != null)
			for (int i = 0; i < filesList.length; ++i) {
				if (filesList[i].getAbsolutePath().endsWith(".jar")
						|| filesList[i].getAbsolutePath().endsWith(".zip")) {
					try {
						urlList.add(new URL(cs.getLocation().getProtocol()
								+ "://" + fileLocation + filesList[i].getName()));
					} catch (Exception e) {
						// TODO Auto-generated catch block
						System.out.println("Incorrect Path "
								+ e.getLocalizedMessage());
					}
				}
			}

		URL[] urlArray = new URL[urlList.size()];
		for (int i = 0; i < urlList.size(); ++i) {
			urlArray[i] = urlList.get(i);
		}
		
		classLoaderMap.put(sourceClass.getName(), new ChildFirstURLClassLoader(urlArray,
				sourceClass.getClassLoader()));
		
		return classLoaderMap.get(sourceClass.getName());

	}
}
