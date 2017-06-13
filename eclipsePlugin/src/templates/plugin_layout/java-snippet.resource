	/**
	 * Specifies one or more custom layouts that are provided by this plug-in.
	 * Custom layouts can display the features and other user interface
	 * components of IBM Content Navigator in a different arrangement. The IBM
	 * Content Navigator administration tool is used to select the layout to use
	 * for a desktop.
	 * 
	 * @return An array of plug-in layout objects.
	 */
	public PluginLayout[] getLayouts() {
	    if (pluginLayouts.length == 0) {
			pluginLayouts = new PluginLayout[] {${ConstructorCalls}};
		}
		return pluginLayouts;
	}
