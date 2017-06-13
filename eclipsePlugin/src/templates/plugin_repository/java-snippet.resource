	/**
	 * Specifies one or more custom repositories that are provided by this plug-in.
	 * 
	 * @return An array of plug-in repository types objects.
	 */
	public PluginRepositoryType[] getRepositoryTypes() {
	    if (pluginRepositoryTypes.length == 0) {
			pluginRepositoryTypes = new PluginRepositoryType[] {${ConstructorCalls}};
		}
		return pluginRepositoryTypes;
	}
