
	
	/**
	 * Provides a list of one or more custom APIs that are provided by this plug-in.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginAPI PluginAPI}</code>
	 *         objects.
	 */
	public PluginAPI[] getPluginAPIs() {
		if (pluginAPIs.length == 0) {
			pluginAPIs = new PluginAPI[] {${ConstructorCalls}};
		}
		return pluginAPIs;
	}
	