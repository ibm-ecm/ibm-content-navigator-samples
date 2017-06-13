	
	/**
	 * Provides a list of filters that are run after a requested service. This
	 * list of filters can be used to modify the response that is returned.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginResponseFilter PluginResponseFilter}</code>
	 *         objects.
	 */
	public PluginResponseFilter[] getResponseFilters() {
		if (pluginResponseFilters.length == 0) {
			pluginResponseFilters = new PluginResponseFilter[] {${ConstructorCalls}};
		}
		return pluginResponseFilters;
	}