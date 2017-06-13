
    /**
     * Specifies custom features that are provided by this plug-in. Features are
     * the major user interface sections, which appear as icons on the left side
     * of the user interface in the default layout. Examples of features include
     * Search, Favorites, and Teamspaces.
     * 
     * @return An array of custom plug-in feature objects.
     */
    public PluginFeature[] getFeatures() {
    	if (pluginFeatures.length == 0) {
			pluginFeatures = new PluginFeature[] {${ConstructorCalls}};
		}
		return pluginFeatures;
    }

