	
	/**
	 * Provides a list of actions that this plug-in adds to the main toolbar of
	 * the web client.
	 * 
	 * @return An array of
	 *         <code>{@link com.ibm.ecm.extension.PluginAction PluginAction}</code>
	 *         objects. The plug-in should return the same set of objects on
	 *         every call.
	 */
	public PluginAction[] getActions() {
		if (pluginActions.length == 0) {
			pluginActions = new PluginAction[] {${ConstructorCalls}};
		}
		return pluginActions;
	}