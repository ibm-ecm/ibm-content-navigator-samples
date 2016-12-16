/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2016  All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */

package com.ibm.ecm.icn;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import com.ibm.ecm.configuration.ApplicationConfig;
import com.ibm.ecm.configuration.Config;
import com.ibm.ecm.configuration.ConfigInterface;
import com.ibm.ecm.configuration.DesktopConfig;
import com.ibm.ecm.configuration.ThemeConfig;
import com.ibm.ecm.extension.PluginFeature;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.serviceability.Logger;
import com.ibm.ecm.util.ColorUtil;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This filter updates the getDesktop service's response JSON to:
 * <ul>
 * <li>Add the Favorites and My Checkouts features as secondary panes of the Home feature.</li>
 * <li>Apply the desktop's theme on the layout provided by the plug-in.</li>
 * </ul>
 */
public class NavLayoutRefreshPluginResponseFilter extends PluginResponseFilter {

	@Override
	public String[] getFilteredServices() {
		return new String[] { "/getDesktop" };
	}

	@Override
	public void filter(String serverType, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
		String methodName = "filter";
		Logger.logEntry(this, methodName, request);
		
		// Add the Favorites and My Checkouts features as secondary panes of the Home feature
		JSONArray desktopFeatures = (JSONArray) jsonResponse.get("desktopFeatures");
		if (desktopFeatures != null) {
			ResourceBundle resource = ResourceBundle.getBundle("com.ibm.ecm.icn.nls.ServicesMessages", request.getLocale());
			for (int i = 0; i < desktopFeatures.size(); i++) {
				JSONObject jsonFeature = (JSONObject) desktopFeatures.get(i);
				if (jsonFeature != null) {
					String id = (String) jsonFeature.get("id");
					if (id != null && id.equals("NavLayoutRefreshPluginHomePane")) {
						// Found the Home feature, now add Favorites as a secondary feature
						JSONArray jsonSecondaryFeatures = new JSONArray();
						String name = resource.getString("feature.favorites.name");
						String tooltip = resource.getString("feature.favorites.tooltip");
						JSONObject jsonSecondaryFeature = getSecondaryFeatureObject(request, "favorites", name, tooltip, false, "", "");
						Logger.logDebug(this, methodName, request, "Adding new secondary feature for Favorites");
						jsonSecondaryFeatures.add(jsonSecondaryFeature);
						
						// Add My Checkouts if it's enabled on the Home feature configuration
						Boolean showMyCheckouts = false;
						String featureConfiguration = (String) jsonFeature.get("featureConfiguration");
						String configShowMyCheckouts = featureConfiguration.split(",")[0];
						if (configShowMyCheckouts != null) {
							String [] showMyCheckoutsSettings = configShowMyCheckouts.split(":");
							if (showMyCheckoutsSettings.length > 1) {
								String show = showMyCheckoutsSettings[1]; // boolean value from setting (in JSON format)
								if (show != null && show.equalsIgnoreCase("true")) {
									showMyCheckouts = true;
								}
							}
						}
						
						if (showMyCheckouts != null && showMyCheckouts) {
							name = resource.getString("feature.mycheckouts.name");
							tooltip = resource.getString("feature.mycheckouts.tooltip");
							jsonSecondaryFeature = getSecondaryFeatureObject(request, "mycheckouts", name, tooltip, false, "navLayoutRefreshPluginDojo.MyCheckoutsPane", "");
							Logger.logDebug(this, methodName, request, "Adding new secondary feature for My Checkouts");
							jsonSecondaryFeatures.add(jsonSecondaryFeature);
						}
						
						jsonFeature.put("secondaryPanes",  jsonSecondaryFeatures);
						break;
					}
				}
			}
		}

		// Apply the desktop's theme on the layout provided by the plug-in
		try {
			addThemeCSS(request, callbacks, jsonResponse);
		} catch (Exception e) {
			callbacks.getLogger().logDebug(this, methodName, request, "Failed to add theme CSS: " + e.getMessage());
		}
		
		Logger.logExit(this, methodName, request);
	}
	
	public JSONObject getSecondaryFeatureObject(HttpServletRequest request, String id, String name, String tooltip, boolean preLoad, String featureClass, String iconUrl, String plugin, boolean publicFeature) throws Exception {
		JSONObject jsonSecondaryFeature = new JSONObject();
		
		jsonSecondaryFeature.put("id", id);
		jsonSecondaryFeature.put("name", name);
		jsonSecondaryFeature.put("featureTooltip", tooltip);
		jsonSecondaryFeature.put("preLoad",  preLoad);
		jsonSecondaryFeature.put("featureClass",  featureClass);
		jsonSecondaryFeature.put("iconUrl",  iconUrl);
		if (plugin != null)
			jsonSecondaryFeature.put("plugin",  plugin);
		jsonSecondaryFeature.put("publicFeature",  publicFeature);

		return jsonSecondaryFeature;
	}

	public JSONObject getSecondaryFeatureObject(HttpServletRequest request, String id, String name, String tooltip, boolean preLoad, String featureClass, String iconUrl) throws Exception {
		return getSecondaryFeatureObject(request, id, name, tooltip, preLoad, featureClass, iconUrl, null, false);
	}
	
	private void addThemeCSS(HttpServletRequest request, PluginServiceCallbacks callbacks, JSONObject jsonResponse) throws Exception {
		String desktop = request.getParameter("desktop");
		if (desktop != null) {
			String appName = (String) request.getParameter("application");
			if (appName == null || appName.isEmpty())
				appName = Config.APPLICATION_NAME;
			
			// Get the desktop's theme configuration
			ConfigInterface configInterface = callbacks.getConfigInterface();
			DesktopConfig desktopConfig = configInterface.getDesktopConfig(appName, desktop);
			ThemeConfig themeConfig = null;
			String themeId = desktopConfig.getTheme();
			if (themeId != null && !themeId.isEmpty()) {
				ApplicationConfig appConfig = configInterface.getApplicationConfig(request);
				Collection<ThemeConfig> themes = appConfig.getThemesList();
				if (themes != null) {
					for (ThemeConfig theme : themes) {
						if (theme.getObjectId().equals(themeId)) {
							themeConfig = theme;
							break;
						}
					}
				}
			}

			JSONObject themeJson = (JSONObject) jsonResponse.get("theme");
			StringBuffer cssStr;
			if (themeJson != null) {
				cssStr = new StringBuffer((String) themeJson.get(ThemeConfig.CSS_STRING));
			} else {
				themeJson = new JSONObject();
				themeJson.put("name", "NavLayoutRefresh");
				jsonResponse.put("theme", themeJson);
				cssStr = new StringBuffer();
			}
			
			String themeSelector = "";
			String navigationIconColor = null;
			String navigationSelectedIconColor = null;
			if (themeConfig != null) {
				themeSelector = "." + themeId;
				
				// If the framework background color isn't the default, apply it on selected grid elements and the content list's refresh icon
				String frameworkBackgroundColor = themeConfig.getFrameworkBackgroundColor();
				if (!frameworkBackgroundColor.equals("default")) {
					Color color = Color.decode(frameworkBackgroundColor.replace("#", "0x"));
					String rgb = color.getRed() + "," + color.getGreen() + "," + color.getBlue();
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .gridxHeaderRow .gridxCell {color:").append(frameworkBackgroundColor).append(" !important;border-right-color:rgba(").append(rgb).append(",0.1) !important;}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .gridx .gridxHeaderRow,")
							.append(themeSelector).append(".navLayoutRefreshTheme .dojoxGrid .dojoxGridHeaderRow {border-color:rgba(").append(rgb).append(",0.5) transparent !important;}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .gridx .gridxRowSelected .gridxRowTable .gridxCell,")
							.append(themeSelector).append(".navLayoutRefreshTheme .gridx .gridxRowOver.gridxRowSelected .gridxRowTable .gridxCell,")
							.append(themeSelector).append(".navLayoutRefreshTheme .dojoxGrid .dojoxGridRowSelected .gridxRowTable .gridxCell,")
							.append(themeSelector).append(".navLayoutRefreshTheme .dojoxGrid .dojoxGridRowOver.dojoxGridRowSelected .gridxRowTable .gridxCell {border-bottom-color:").append(frameworkBackgroundColor).append(" !important;}");
					
					String svgContent = readSvgFile(this.getClass(), "WebContent/images/refresh.svg");
					svgContent = svgContent.replaceAll(".iconBaseColor\\{fill:.*;\\}", ".iconBaseColor{fill:" + frameworkBackgroundColor + ";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmContentList .refreshButtonIcon {background-image: url(\"data:image/svg+xml;base64,").append(DatatypeConverter.printBase64Binary(svgContent.getBytes("UTF-8"))).append("\");}");
				}
				
				// If the banner text and icon color isn't the default, shift the position of the sprite containing arrow icons to better align the arrow used by drop-down menus in the banner (i.e., user session and tools menu)
				String bannerTextIconColor = themeConfig.getBannerTextIconColor();
				if (!bannerTextIconColor.equals("default"))
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmBanner * .dijitArrowButtonInner {background-position: -10px -206px !important;}");
				
				// If the navigation background color isn't the default, apply it on the launch bar
				String navigationBackgroundColor = themeConfig.getNavigationBackgroundColor();
				boolean isDefaultNavigationBackgroundColor = navigationBackgroundColor.equals("default");
				if (!isDefaultNavigationBackgroundColor) {
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .launchBarButtonArea {background:").append(navigationBackgroundColor).append(";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .launchBarButtons .dijitDownArrowButton .dijitArrowButtonInner {background-position: -10px -204px !important;}");
				}
				
				// If the selected icon color isn't the default, apply it on the feature drop-down menu's text
				navigationSelectedIconColor = themeConfig.getNavigationSelectedIconColor();
				boolean isDefaultNavigationSelectedIconColor = navigationBackgroundColor.equals("default");
				if (!isDefaultNavigationSelectedIconColor) {
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmLaunchBarContainer .launchBarButtonArea.launchBarFeatureDropDown .launchBarButton.dijitToggleButtonChecked .launchBarButtonNode .dijitButtonText {color:").append(navigationSelectedIconColor).append(";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmLaunchBarContainer .launchBarButtonArea.launchBarFeatureDropDown .launchBarButton.dijitToggleButtonChecked.dijitToggleButtonHover .launchBarButtonNode .dijitButtonText {color:").append(navigationSelectedIconColor).append(";}");
				}

				// If the navigation icon color isn't set to "auto" or the navigation background color isn't the default, apply the navigation icon color on labels and icons in the features drop-down menu
				navigationIconColor = themeConfig.getNavigationIconColor();
				if (!navigationIconColor.equals("auto") || !isDefaultNavigationBackgroundColor) {
					if (navigationIconColor.equals("auto"))
						navigationIconColor = "#" + ColorUtil.generateAutoHexColor(Color.decode(navigationBackgroundColor.replace("#", "0x")), 0.15);
					
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmLaunchBarContainer .launchBarButtonArea.launchBarFeatureDropDown .launchBarButton .launchBarButtonNode .dijitButtonText {color:").append(navigationIconColor).append(";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmLaunchBarContainer .launchBarButtonArea.launchBarFeatureDropDown .launchBarButton.dijitToggleButtonHover .launchBarButtonNode .dijitButtonText {color:").append(navigationIconColor).append(";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmLaunchBarContainer .launchBarButtonArea.launchBarFeatureDropDown .dijitDownArrowButton .dijitButtonText {color:").append(navigationIconColor).append(";}");
					
					String svgContent = readSvgFile(this.getClass(), "WebContent/images/features.svg");
					svgContent = svgContent.replaceAll(".iconBaseColor\\{fill:.*;\\}", ".iconBaseColor{fill:" + navigationSelectedIconColor + ";}");
					if (!isDefaultNavigationSelectedIconColor) {
						// Since the navigation selected icon color isn't the default, apply the navigation icon color on the feature icons' selected state
						svgContent = svgContent.replaceAll(".iconSelectedColor\\{fill:.*;\\}", ".iconSelectedColor{fill:" + navigationIconColor + ";}");
						svgContent = svgContent.replaceAll(".st0\\{fill:.*;\\}", ".st0{fill:" + navigationIconColor + ";}");
					}
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .workLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .icaLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .recentActivityLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .favoritesLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .browseLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .adminLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .teamspacesLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .entryTemplatesLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .searchLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .taskLaunchIcon {background-image: url(\"data:image/svg+xml;base64,").append(DatatypeConverter.printBase64Binary(svgContent.getBytes("UTF-8"))).append("\") !important;}");
					
					svgContent = readSvgFile(this.getClass(), "WebContent/images/icnNavArrows.svg");
					svgContent = svgContent.replaceAll(".iconBaseColor\\{fill:.*;\\}", ".iconBaseColor{fill:" + navigationIconColor + ";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .launchBarButtonArea * .dijitArrowButtonInner {background-image: url(\"data:image/svg+xml;base64,").append(DatatypeConverter.printBase64Binary(svgContent.getBytes("UTF-8"))).append("\");}");
				} else if (!isDefaultNavigationSelectedIconColor) {
					// Since the navigation selected icon color isn't the default, apply the navigation icon color on the feature icons' selected state
					String svgContent = readSvgFile(this.getClass(), "WebContent/images/features.svg");
					svgContent = svgContent.replaceAll(".iconSelectedColor\\{fill:.*;\\}", ".iconSelectedColor{fill:" + navigationIconColor + ";}");
					svgContent = svgContent.replaceAll(".st0\\{fill:.*;\\}", ".st0{fill:" + navigationIconColor + ";}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .workLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .icaLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .recentActivityLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .favoritesLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .browseLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .adminLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .teamspacesLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .entryTemplatesLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .searchLaunchIcon,")
							.append(themeSelector).append(".navLayoutRefreshTheme .taskLaunchIcon {background-image: url(\"data:image/svg+xml;base64,").append(DatatypeConverter.printBase64Binary(svgContent.getBytes("UTF-8"))).append("\") !important;}");
				}
				
				// If the button style isn't "text", adjust the margin and padding of elements of the content list's tool bar for best alignment
				String buttonStyle = themeConfig.getButtonStyle();
				if (!buttonStyle.equals("text")) {
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmToolbar .dijitButton .dijitButtonNode,")
							.append(themeSelector).append(".navLayoutRefreshTheme .ecmToolbar .dijitDropDownButton .dijitButtonNode,")
							.append(themeSelector).append(".navLayoutRefreshTheme .ecmToolbar .dijitComboButton .dijitButtonNode,")
							.append(themeSelector).append(".navLayoutRefreshTheme .ecmToolbar .dijitToggleButton .dijitButtonNode {padding: 3px 10px 4px;}");
					cssStr.append(themeSelector).append(".navLayoutRefreshTheme .ecmContentList .BarViewModules .toggleView {margin-top: 4px;}");
				}
			}
			
			// Apply the same color used for system feature icons on plug-in feature icons that are enabled on the desktop
			String features[] = desktopConfig.getFeatures();
			if (features != null) {
				if (navigationIconColor == null)
					navigationIconColor = "#FFFFFF";
				if (navigationSelectedIconColor == null)
					navigationSelectedIconColor = "#4178BE";
				
				List<PluginFeature> pluginFeatures = callbacks.getDesktopPluginFeatures();
				for (PluginFeature pluginFeature : pluginFeatures) {
					if (pluginFeature != null && pluginFeature.getSvgFilePath() != null) {
						String svgContent = readSvgFile(pluginFeature.getClass(), pluginFeature.getSvgFilePath());
						svgContent = svgContent.replaceAll(".iconBaseColor\\{fill:.*;\\}", ".iconBaseColor{fill:" + navigationSelectedIconColor + ";}");
						svgContent = svgContent.replaceAll(".iconSelectedColor\\{fill:.*;\\}", ".iconSelectedColor{fill:" + navigationIconColor + ";}");
						cssStr.append(themeSelector).append(".navLayoutRefreshTheme .").append(pluginFeature.getIconUrl()).append(" {background-image: url('data:image/svg+xml;base64,").append(DatatypeConverter.printBase64Binary(svgContent.getBytes("UTF-8"))).append("');}");
					}
				}
			}
			
			themeJson.put(ThemeConfig.CSS_STRING, cssStr.toString());
		}
	}
	
	private String readSvgFile(Class<?> resClass, String resName) {
		String str = "";
		InputStream is = resClass.getResourceAsStream(resName);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		if (is != null) {
			try {
				byte[] bytes = new byte[1024];
				int length = 0;
				while (length != -1) {
					length = is.read(bytes);
					if (length > 0)
						baos.write(bytes, 0, length);
				}
				str = baos.toString("UTF-8");
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					is.close();
					baos.close();
				} catch (IOException e) {
					// Ignore
				}
			}
		}

		return str;
	}
}
