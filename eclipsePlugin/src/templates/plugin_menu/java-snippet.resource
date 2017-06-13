
	/**
	 * Provides a list of menus defined by the plug-in.
	 * 
	 * @return An array of plug-in menu objects.
	 */
	public PluginMenu[] getMenus() {
		if (pluginMenus.length == 0) {
			pluginMenus = new PluginMenu[] {${ConstructorCalls}};
		}
		return pluginMenus;
	}