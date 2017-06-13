
	
	/**
	 * Provides a list of filters that are run before a requested service. This
	 * method can be used to modify the request or block the request.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginRequestFilter PluginRequestFilter}</code>
	 *         objects.
	 */
	public PluginRequestFilter[] getRequestFilters() {
		if (pluginRequestFilters.length == 0) {
			pluginRequestFilters = new PluginRequestFilter[] {${ConstructorCalls}};
		}
		return pluginRequestFilters;
	}
	