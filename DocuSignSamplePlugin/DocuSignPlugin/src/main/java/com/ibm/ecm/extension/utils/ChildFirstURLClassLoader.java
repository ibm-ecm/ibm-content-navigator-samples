/**
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2014,2015
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.ibm.ecm.extension.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;

public class ChildFirstURLClassLoader extends URLClassLoader {

	private ClassLoader system;
	private ClassLoader parentClassLoader;

	public ChildFirstURLClassLoader(URL[] classpath, ClassLoader parent) {
		super(classpath, parent);
		system = getSystemClassLoader();
		parentClassLoader = parent;
	}

	@Override
	protected synchronized Class<?> loadClass(String name, boolean resolve)
			throws ClassNotFoundException {
		// First, check if the class has already been loaded
		Class<?> c = findLoadedClass(name);
		// Handling issue multiple threads spawned on instantiation of Case APIs
		if (c == null && (name.equals("com.ibm.casemgmt.intgimpl.messages.CaseMgmtCBELogger") || name.equals("com.ibm.icm.extension.contentCuration.curationCustomService.Constants"))) {
			if (parentClassLoader != null) {
				try {
					// checking parent loader to ensure load static classes,
					// etc.
					c = parentClassLoader.loadClass(name);
				} catch (ClassNotFoundException ignored) {
				}
			}
		}
		
		if (c == null) {
			if (system != null) {
				try {
					// checking system: jvm classes, endorsed, cmd classpath,
					// etc.
					c = system.loadClass(name);
				} catch (ClassNotFoundException ignored) {
				}
			}
			if (c == null) {
				try {
					// checking local
					c = findClass(name);
				} catch (ClassNotFoundException e) {
					// checking parent
					// This call to loadClass may eventually call findClass
					// again, in case the parent doesn't find anything.
					c = super.loadClass(name, resolve);
				}
			}
		}
		if (resolve) {
			resolveClass(c);
		}
		return c;
	}

	@Override
	public URL getResource(String name) {
		URL url = null;
		if (system != null) {
			url = system.getResource(name);
		}
		if (url == null) {
			url = findResource(name);
			if (url == null) {
				// This call to getResource may eventually call findResource
				// again, in case the parent doesn't find anything.
				url = super.getResource(name);
			}
		}
		return url;
	}

	@Override
	public Enumeration<URL> getResources(String name) throws IOException {
		/**
		 * Similar to super, but local resources are enumerated before parent
		 * resources
		 */
		Enumeration<URL> systemUrls = null;
		if (system != null) {
			systemUrls = system.getResources(name);
		}
		Enumeration<URL> localUrls = findResources(name);
		Enumeration<URL> parentUrls = null;
		if (getParent() != null) {
			parentUrls = getParent().getResources(name);
		}
		final List<URL> urls = new ArrayList<URL>();
		if (systemUrls != null) {
			while (systemUrls.hasMoreElements()) {
				urls.add(systemUrls.nextElement());
			}
		}
		if (localUrls != null) {
			while (localUrls.hasMoreElements()) {
				urls.add(localUrls.nextElement());
			}
		}
		if (parentUrls != null) {
			while (parentUrls.hasMoreElements()) {
				urls.add(parentUrls.nextElement());
			}
		}
		return new Enumeration<URL>() {
			Iterator<URL> iter = urls.iterator();

			public boolean hasMoreElements() {
				return iter.hasNext();
			}

			public URL nextElement() {
				return iter.next();
			}
		};
	}

	@Override
	public InputStream getResourceAsStream(String name) {
		URL url = getResource(name);
		try {
			return url != null ? url.openStream() : null;
		} catch (IOException e) {
		}
		return null;
	}

}
