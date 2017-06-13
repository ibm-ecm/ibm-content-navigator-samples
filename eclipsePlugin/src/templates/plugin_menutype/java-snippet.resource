
	/**
	 * Provides a list of new menu types defined by the plug-in.
	 * 
	 * @return An array of new menu type objects.
	 */
	public PluginMenuType[] getMenuTypes() {
		if (pluginMenuTypes.length == 0) {
			pluginMenuTypes = new PluginMenuType[] {${ConstructorCalls}};
		}
		return pluginMenuTypes;
	}