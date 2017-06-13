	
	/**
	 * Provides a list of services that are provided by this plug-in. The
	 * services run on the web server, and can be called by the web browser
	 * logic component of the plug-in.
	 * 
	 * @return An array of {@link com.ibm.ecm.extension.PluginService
	 *         PluginService} objects. The plug-in should return the same set of
	 *         objects on every call. If there are no services defined by the
	 *         plug-in, the call should return an empty array.
	 */
	public PluginService[] getServices() {
		if (pluginServices.length == 0) {
			pluginServices = new PluginService[] {${ConstructorCalls}};
		}
		return pluginServices;
	}