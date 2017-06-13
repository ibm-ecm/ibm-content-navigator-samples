
	/**
	 * Provides a list of viewers that are provided by this plug-in. The viewers
	 * become available in the viewer configuration area of the IBM Content
	 * Navigator administration tool. The viewers can be mapped to be used to
	 * view certain document types.
	 * <p>
	 * <strong>Note:</strong> Typically, a plug-in does not define multiple
	 * viewers. However, this method can be used to provide multiple
	 * configurations of the same viewer, such as a view-only version and an
	 * editing mode version of the same viewer.
	 * </p>
	 * 
	 * @return An array of {@link ecm.widget.admin.PluginViewerDef
	 *         PluginViewerDef} objects describing the viewers provided by the
	 *         plug-in.
	 */
	public PluginViewerDef[] getViewers() {
		if (pluginViewerDefs.length == 0) {
			pluginViewerDefs = new PluginViewerDef[] {${ConstructorCalls}};
		}
		return pluginViewerDefs;
	}