
	/**
	 * Provides a list of open actions that this plug-in provides for supported
	 * items.
	 * 
	 * @since 2.0.2
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginOpenAction PluginOpenAction}</code>
	 *         objects. The plug-in should return the same set of objects on
	 *         every call.
	 */
	public PluginOpenAction[] getOpenActions() {
		if (pluginOpenActions.length == 0) {
			pluginOpenActions = new PluginOpenAction[] {${ConstructorCalls}};
		}
		return pluginOpenActions;
	}