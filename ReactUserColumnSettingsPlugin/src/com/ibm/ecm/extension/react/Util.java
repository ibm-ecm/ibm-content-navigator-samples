package com.ibm.ecm.extension.react;

import java.util.Hashtable;

import javax.security.auth.Subject;

import com.filenet.api.core.Folder;
import com.filenet.api.util.Id;
import com.filenet.api.util.UserContext;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONObject;

public class Util {

	public static JSONObject getUsersSavedColumns(PluginServiceCallbacks callbacks, String userSettingsKey) throws Exception {
		try {
			// Get user's saved settings if they exist
			String[] keys = callbacks.getUserConfigurationKeys();
			String[] userSettingsData = null;
			// If the key exists, get the value.
			if (keys != null && keys.length > 0) {
				for (int i = 0; i < keys.length; i++) {
					if (keys[i].equals(userSettingsKey)) {
						// Retrieve the saved settings from the user configuration. Format is a JSON string.
						userSettingsData = callbacks.loadUserConfiguration(new String[] {userSettingsKey});
						break;
					}
				}
				
				if (userSettingsData != null && userSettingsData.length > 0)
					return JSONObject.parse(userSettingsData[0]);
			}
		} catch (Exception e) {
			// Prevent block of execution if settings cannot be retrieved.
			callbacks.getLogger().logError(Util.class, "getUsersSavedColumns", "Error loading UserConfiguration in UserColumnSettings Plugin - ColumnsDisplayedResponseFilter", e);
		}
		
		return null;
	}
	
	public static boolean isRootFolder(PluginServiceCallbacks callbacks, String repositoryId, String folderId) {
		Subject subject = callbacks.getP8Subject(repositoryId);
		UserContext.get().pushSubject(subject);
		Folder rootFolder = callbacks.getP8ObjectStore(repositoryId).get_RootFolder();
		Id rootFolderId = rootFolder != null ? rootFolder.get_Id() : null; // user might not have access to root folder, in this case null is returned
		UserContext.get().popSubject();
		
		if (folderId.equals("/")) {
			return true;
		} else { 
			String objectIdentity = "";
			int firstSeparator = folderId.indexOf(",");
			int secondSeparator = 0;
			if (firstSeparator == -1) { // not found, this might be already an object identity
				objectIdentity = folderId;
			} else { 
				secondSeparator = folderId.indexOf(",", firstSeparator + 1);
			}
			
			if (secondSeparator != -1) // not found, this might be already an object identity
				objectIdentity = folderId.substring(secondSeparator + 1);
			
			if (rootFolderId != null && objectIdentity.equals(rootFolderId.toString())) {
				return true;
			}
		}
			
		return false;
	}
	
	public static void updateRepoUserSavedSettings(PluginServiceCallbacks callbacks, String repoKey, String updatedSettings) {
		Hashtable <String, String> userSettingsData = new Hashtable<String, String>();
		
		try {
			String[] keys = callbacks.getUserConfigurationKeys();
			if (keys != null && keys.length > 0) {
				boolean repoSettingsExist = false;
				boolean setRepoSettingsToNull = false;
				for (int i = 0; i < keys.length; i++) {
					if (keys[i].equals(repoKey)) {
						repoSettingsExist = true;
						if (updatedSettings != null) {
							// Update existing settings.
							callbacks.saveUserConfiguration(repoKey, updatedSettings);
						} else {
							// Settings exist but need to be removed.
							setRepoSettingsToNull = true;
						}
					} else {
						// Save all other repository settings that have been saved for the user.
						String existingConfig = callbacks.loadUserConfiguration(keys[i]);
						userSettingsData.put(keys[i], existingConfig);
					}
				}
				if (!repoSettingsExist) {
					// Add a new key/value entry for the new repository saved settings.
					userSettingsData.put(repoKey, updatedSettings);
					callbacks.saveUserConfiguration(userSettingsData);
				}
				if (setRepoSettingsToNull) {
					if (userSettingsData.size() == 0) {
						// All repositories are set to default. Placeholder key to avoid null pointer if there are no saved settings.
						userSettingsData.put("PluginId", "UserColumnSettingsPluginReact");
					}
					// Save all the other repository settings that have not been modified.
					callbacks.saveUserConfiguration(userSettingsData);
				}
			} else {
				// Needed if there have not been any previously saved user configurations
				userSettingsData.put(repoKey, updatedSettings);
				callbacks.saveUserConfiguration(userSettingsData);
			}
		} catch (Exception e) {
			callbacks.getLogger().logError(Util.class, "updateRepoUserSavedSettings", "Error in UserColumnSettings Plugin - Util.java class", e);
		}
	}
}
