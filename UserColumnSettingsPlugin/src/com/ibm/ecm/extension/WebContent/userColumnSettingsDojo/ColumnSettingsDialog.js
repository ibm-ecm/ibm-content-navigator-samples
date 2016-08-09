/* This is where the behavior and functionality of the ColumnSettingsDialog box is defined.
 * This widget will:
 * - Retrieve data including available document property list and users previously saved properties, if any.
 * - Populate the dialogs SloshBucket with the data.
 * - Allow a user to select properties they want shown in Browse view and save them to the user configuration file. 
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/json",
	"dojo/_base/array",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/store/Memory",
	"dojo/on",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"dijit/form/CheckBox",
	"dijit/form/Button",
	"dijit/form/Select",
	"dijit/registry",
	"ecm/widget/dialog/BaseDialog",
	"ecm/widget/FilterTextBox",
	"ecm/widget/layout/BrowsePane",
	"ecm/model/Request",
	"idx/widget/SloshBucket",
	"dojo/text!./templates/ColumnSettingsDialog.html"
], function(declare, lang, json, dojoArray, dom, domStyle, Memory, on, WidgetsInTemplateMixin, BorderContainer, ContentPane, CheckBox, Button, Select, registry, BaseDialog, FilterTextBox, BrowsePane, Request, SloshBucket, templateText) {
	return declare("ColumnSettingsDialog", [BaseDialog, WidgetsInTemplateMixin], {
		
		contentString: templateText,
		widgetsInTemplate: true, // Property is used in BaseDialog's buildRendering to attach points and events using this.contentString
		
		baseClass: "ColumnSettingsDialog",
		
		title: "Set Display Preferences for Columns",
		description: "Select the column properties that you would like to be displayed in Browse view.",
		dropDownLabel: "Select Repository:",
		defaultSettingsCheckBoxLabel: "Use the default Browse view settings",
		
		attributeDefinitions: [], // A new value should get passed into the constructor from retrieveAttributeDefinitionsForSearches callback.
		_keyPrefix: "UserColumnSettings",
		_savedUserItems: undefined, // Initialized in getSavedSelectedItems.
		_propertyList: undefined, // Initialized in createPropertyList.
		_desktopRepos: ecm.model.desktop.repositories,
		_selectedRepositoryId: ecm.model.desktop.defaultRepositoryId,
		_selectedRepository: undefined, // Initialized in initRepoSelectDropDown.
		_repositoryDefaultProperties: undefined, // Initialized in constructor.
		_repositoryDefaultPropertiesMap: {},
		_useDefaultSettings: false,
		_fixedValues: [], // Used to add fixed values to selected grid.
		_fixedValuesIDs: ["DocumentTitle"], // Defines fixed values. Passed into SloshBucket.setSelectedGridData to set fixed values.
		_fixedValuesIdMap: {"DocumentTitle": "Name"}, // Internally used to identify if a grid item is fixed. Must correspond with _fixedValuesIDs.
		
		constructor: function() {
			this._messages = ecm.messages;
			console.debug("messages: ", this._messages);
		},
		
		postCreate: function() {
			console.debug("ENTER postCreate");
			this.inherited(arguments);
			this.setMaximized(true);
			
			this._filterBox.set("placeholder", "Filter available list");
			this.initRepoSelectDropDown();
			this._refreshSelectedRepository();
			
			this.connect(this._filterBox, "_onInput", "_filter");
			this.connect(this._filterBox, "_setValueAttr", "_filter");
			on(this._repoSelect, "change", lang.hitch(this, function(event) {
				this._refreshSelectedRepository();
			}));
			on(this._defaultSettingsCheckBox, "change", lang.hitch(this, function(event) {
				this._updateDefaultSettingsState(); // 
			}));
			this._okButton = this.addButton(this.messages.ok, "onSave", false, true); // addButton is a BaseDialog method
			
			// Set tab order to start with the filter box, then the 'Save' button, and finally the 'Cancel' button.
			this._filterBox.set("tabIndex", 1);
			this._okButton.set("tabIndex", 2);
			this.cancelButton.set("tabIndex", 3);
			
			console.debug("EXIT postCreate");
		},
		
		show: function() {
			console.debug("ENTER show");
			this.inherited(arguments);
			this._refreshSelectedRepository(); // This call is needed if the dialog has already been created.
			console.debug("EXIT show");
		},
		
		// Initialize the dropdown menu with desktop repositories.
		initRepoSelectDropDown: function() {
			var options = [];
			var isDefault = false;
			this._desktopRepos.forEach(lang.hitch(this, function(repo) {
				if (ecm.model.desktop.defaultRepositoryId === repo.repositoryId) {
					isDefault = true;
					this._selectedRepository = repo;
				}
				var option = {label: repo.displayName, value: repo.repositoryId, selected: isDefault};
				options.push(option);
				isDefault = false;
			}));
			
			this._repoSelect.addOption(options);
		},
		
		// Calls plugin service to retrieve the userSettings entry from the plugin's user configuration file.
		// When complete will save the settings in this._savedUserItems and call initSloshBucket function.
		getSavedSelectedItems: function() {
			console.debug("ENTER getSavedSelectedItems");
			var key = this._keyPrefix + this._selectedRepositoryId;
			Request.invokePluginService("UserColumnSettingsPlugin", "UserSettingsService", {
				requestParams: {
					userSettingsAction: "load",
					userSettingsKey: key
				},
				requestCompleteCallback: lang.hitch(this, function(response) {
					if (response.userSettings) {
						this._savedUserItems = response.userSettings;
						this._useDefaultSettings = false;
					} else {
						this._savedUserItems = this._repositoryDefaultPropertiesMap[this._selectedRepositoryId];
						this._useDefaultSettings = true;
					}
					
					this.initSloshBucket();
					console.debug("EXIT requestCompleteCallback in getSavedSelectedItems");
				})
			});
			console.debug("EXIT getSavedSelectedItems");
		},

		/*
		 * Sets the available and selected lists.
		 * This function gets called after the service request to retrieve the saved user settings is complete.
		 * */
		initSloshBucket: function() {
			console.debug("ENTER initSloshBucket");
			var availableList = [];
			var selectedList = [];
			availableList = this._propertyList; // this._propertyList was initialized in createPropertyList call from constructor.
			selectedList = this.getSelectedItems(this._savedUserItems);
			this.createSloshBucketStores(availableList, selectedList);
			this.populateSloshBucket();
			this._setDefaultSettingsReadOnlyState();
			console.debug("EXIT initSloshBucket");
		},
		
		// Uses the attribute definitions from the 'Document' ContentClass to create the SloshBucket's available grid data.
		// Sets this._propertyList and _repositoryDefaultPropertiesMap[this._selectedRepositoryId]
		createPropertyList: function(attributes) {
			console.debug("ENTER createPropertyList");
			this._repositoryDefaultProperties = this._getRepositoryDefaultProperties();
			var columnData = [];
			// Create the default selected values for the corresponding repository's property list.
			var defaultSelected = {};
			var selectedRepoDefaultList = this._repositoryDefaultProperties[this._selectedRepositoryId];
			var selectedRepoDefaultMap = {};
			var defaultValuesOrderOffset = this._fixedValuesIDs.length;
			dojoArray.forEach(selectedRepoDefaultList, lang.hitch(this, function(item) {
				selectedRepoDefaultMap[item.id] = item;
			}));
			
			
			// Var used to assign values to the fixed items 'order' property so they appear at the top of the Selected grid list.
			var fixedValuesCounter = 0;
			dojoArray.forEach(attributes, lang.hitch(this, function (attr) {
				if (!attr.hidden && attr.dataType != "xs:object") {
					var dv = (attr.id !== "CmThumbnails" && attr.id.substr(0,3) !== "Clb");
						var item = {id: attr.id, label: attr.label, detailsView: dv, magazineView: true};
						columnData.push(item);
						
						// If item is a default property, save the item in the default list.
						if (selectedRepoDefaultMap.hasOwnProperty(item.id)) {
							var index = selectedRepoDefaultList.indexOf(selectedRepoDefaultMap[item.id]) + defaultValuesOrderOffset;
							var defaultItem = {id: item.id, label: item.label, order: index, detailsView: selectedRepoDefaultMap[item.id].detailsView, magazineView: selectedRepoDefaultMap[item.id].magazineView};
							defaultSelected[item.id] = defaultItem;
						}
						
						// Get the fixed items that will be added to the selected grid. Note: For reference, see properties _fixedValuesIdMap, _fixedValues, _fixedValuesIDs defined at top of this file.
						if (this._fixedValuesIdMap.hasOwnProperty(item.id)  && this._fixedValues.length < this._fixedValuesIDs.length) {
							var fixedItem = {id: item.id, label: this._fixedValuesIdMap[item.id], order: fixedValuesCounter, detailsView: item.detailsView, magazineView: item.magazineView};
							this._fixedValues.push(fixedItem);
							fixedValuesCounter++;
						}
				}
			}));
			
			// {CLASS} property to _propertyList and defaultSelected if it exists.
			columnData.push({id: "{CLASS}", label: this._messages.class_label_no_html_encode, detailsView: true, magazineView: true});
			
			if (selectedRepoDefaultMap.hasOwnProperty("{CLASS}")) {
				var classItem = selectedRepoDefaultMap["{CLASS}"];
				
				var classItemIndex = selectedRepoDefaultList.indexOf(classItem) + defaultValuesOrderOffset;
				var classDefaultItem = {id: classItem.id, label: this._messages.class_label_no_html_encode, order: classItemIndex, detailsView: classItem.detailsView, magazineView: classItem.magazineView};
				defaultSelected[classItem.id] = classDefaultItem;

			}
			
			// Update the value of the selected repositories default list.
			this._repositoryDefaultPropertiesMap[this._selectedRepositoryId] = defaultSelected;
			
			// Sort the list so it's displayed in alphabetical order within the available grid.
			this._sortList(columnData);
			if (this._propertyList !== null) {
				this._propertyList = null;
			}
			
			this._propertyList = columnData;
		},
		// Create the items for the selected grid using values passed in with @param selected.
		getSelectedItems: function(selected) {
			console.debug("ENTER getSelectedItems");
			var selectedItems = [];
			// Add fixedValues to selected items.
			this._fixedValues.forEach(function(fixedVal) {
				selectedItems.push(fixedVal);
			});
			if (selected !== undefined) {
				// this._savedUserItems is what gets returned from loadUserConfiguration on the server side.
				for (var key in selected) {
					// Use of hasOwnProperty in the if condition ensures that we only process direct, non-inherited, properties.
					// Also used to make sure we don't add the fixedValues twice.
					// The 'order' property is set to start after all fixed values in the list.
					if (selected.hasOwnProperty(key) && !this._fixedValuesIdMap.hasOwnProperty(key)) {
						var item = {id: key, label: selected[key].label, order: selected[key].order + this._fixedValuesIDs.length, detailsView: selected[key].detailsView, magazineView: selected[key].magazineView};
						selectedItems.push(item);
					}
				}
			}
			console.debug("EXIT getSelectedItems");
			return selectedItems;
		},
		
		// Create the memory stores and layouts for the SloshBucket data grids.
		createSloshBucketStores: function(availableData, selectedData) {
			this._availableStore = new Memory({data: availableData});
			this._availableStoreLayout = [{field: "label", name: "Available", width: "100%"}];
			this._selectedStore = new Memory({data: selectedData});
			this._selectedStoreLayout = [
			                             { field: "label", name: "Selected", width: "50%"}, 
			                             {
			                            	 field: "detailsView",
			                            	 name: "Details View",
			                            	 width: "25%",
			                            	 widgetsInCell: true,
			                            	 editable: true,
			                            	 decorator: function() {
			                            		 return [
			                            		         '<input data-dojo-type="dijit.form.CheckBox" ',
			                            		         'data-dojo-attach-point="dv" ',
			                            		         '></input>'
			                            		         ].join('');
			                            	 },
			                            	 // NOTE: data is the value of the corresponding property detailsView;
			                            	 setCellValue: function(gridData, storeData, cellWidget) {
			                            		 // Set check box in first row to read only. Corresponds with number of fixed values.
			                            		 var disabled = (cellWidget.cell.row.index() == 0);
			                            		 cellWidget.dv.set('value', gridData);
			                            		 cellWidget.dv.set('disabled', disabled);
			                            	 },
			                            	 getCellWidgetConnects: function(cellWidget, cell) {
			                            		 return [
			                            		         [cellWidget.dv, "onClick", function(e) {
			                            		        	  cell.setRawData(cellWidget.dv.checked);	  
			                            		          }]
			                            		        ];
			                            	 }
			                             },
			                             {
			                            	 field: "magazineView",
			                            	 name: "Magazine View",
			                            	 width: "25%",
			                            	 widgetsInCell: true,
			                            	 editable: true,
			                            	 decorator: function() {
			                            		 return [
			                            		         '<input data-dojo-type="dijit.form.CheckBox" ',
			                            		         'data-dojo-attach-point="mv" ',
			                            		         '></input>'
			                            		         ].join('');
			                            	 },
			                            	 // NOTE: data is the value of the corresponding property magazineView;
			                            	 setCellValue: function(gridData, storeData, cellWidget) {
			                            		 // Set check box in first row to read only. Corresponds with number of fixed values.
			                            		 var disabled = (cellWidget.cell.row.index() == 0);
			                            		 cellWidget.mv.set('disabled', disabled);
			                            		 cellWidget.mv.set('value', gridData);
			                            	 },
			                            	 getCellWidgetConnects: function(cellWidget, cell) {
			                            		 return [
			                            		         [cellWidget.mv, "onClick", function(e) {
			                            		        	  cell.setRawData(cellWidget.mv.checked);	  
			                            		          }]
			                            		        ];
			                            	 }
			                             }
			                            ];
		},
		
		// Call idx.widget.SloshBucket functions to set the labels and data.
		populateSloshBucket: function() {
			console.debug("BEFORE new SloshBucket");
			this._sloshBucket.set({availableLabel: "Available", selectedLabel: "Selected"});
			this._sloshBucket.setAvailableGridData(this._availableStore, this._availableStoreLayout);
			this._sloshBucket.setSelectedGridData(this._selectedStore, this._selectedStoreLayout, this._fixedValuesIDs);
			console.debug("AFTER new SloshBucket");
		},
		
		onSave: function() {
			console.debug("ENTER onSave");
			// If default settings are set to use, pass null to storeSelectedItems.
			if (this._defaultSettingsCheckBox.checked) {
				this._useDefaultSettings = true;
				this.storeSelectedItems(null); // Setting to null will reduce request/response filter execution if user chooses to use default settings.
			} else {
				this._useDefaultSettings = false;
				// Fetch selected grid items from the SloshBucket.
				var results = this._sloshBucket.getSelectedItems();
				// Create object to store column data.
				var selectedItems = {};
				// Reset order starting at 0, which is used within the plugin's com.ibm.ecm.extension.ColumnsDisplayedResponseFilter @method getSortOrderList. The order set by the SloshBucket changes to non-integer values as the user selects the up/down buttons.
				var order = 0;
				results.forEach(lang.hitch(this, function(result) {
					// Prevent fixed values from being saved since they will be added to the selected grid regardless.
					if(!this._fixedValuesIdMap.hasOwnProperty(result.id)) {
						selectedItems[result.id] =	{
								id: result.id,
								label: result.label,
								order: order,
								detailsView: result.detailsView,
								magazineView: result.magazineView
							};
						order++;
					}
				}));
				// Call the plugin service to store the items.
				this.storeSelectedItems(selectedItems);
			}
			
			this.onCancel();
			console.debug("EXIT onSave");
		},
		
		// Call the plugin service that stores @param selectedItems in the plugin's user configuration settings.
		storeSelectedItems: function (selectedItems) {
			var listOfColumns;
			// Turn JSON object into type String, which is required by the service to save the user settings.
			if (selectedItems !== null) {
				listOfColumns = json.toJson(selectedItems);
			} else {
				// Pass null to the plugin service, which triggers Util.updateRepoUserSavedSettings to remove any custom settings for the repository.
				listOfColumns = selectedItems;
			}
			
			var key = this._keyPrefix + this._selectedRepositoryId;
			
			// Call the service that will save the selected columns.
			Request.invokePluginService("UserColumnSettingsPlugin", "UserSettingsService", {
				requestParams: {
					userSettingsAction: "save",
					userSettings: listOfColumns,
					userSettingsKey: key
				},
				requestCompleteCallback: lang.hitch(this, function() { 
					// After new settings are saved, reset the BrowsePane to show the changes.
					this._resetBrowsePane();
				})
			});
		},
		
		_resetBrowsePane: function() {
			// Remove reference to any previously saved BrowsePane widget.
			var browsePane = null;
			// Retrieve the set of existing ecm.widget.layout.BrowsePane widgets. If none, browsePaneSet will have 0 items.
			var browsePaneSet = registry.byClass("ecm.widget.layout.BrowsePane");
			browsePaneSet.forEach(function(widget) {
				// If the user is currently in Browse view, the BrowsePane widget's selected property will be true.
				if (widget.selected) {
					browsePane = widget;
				}
			});
			// If there is a BrowsePane widget and it is currently in view, reset it's contents.
			if (browsePane !== null && browsePane.selected) {
				browsePane.reset();
			}
		},
		
		// Change the repository and re-populate the SloshBucket grid data with respective attribute definitions.
		_refreshSelectedRepository: function() {
			this._selectedRepositoryId = this._repoSelect.get("value");
			var repo = this._desktopRepos.filter(lang.hitch(this, function(obj) {
				return obj.repositoryId === this._selectedRepositoryId;
			}));
			if(repo[0] !== undefined) {
				this._selectedRepository = repo[0];
				this._selectedRepository.getContentClass("Document").retrieveAttributeDefinitionsForSearches(lang.hitch(this, function(res) {
					this.createPropertyList(res);
					this.getSavedSelectedItems();
				}), true);
			}
		},
		
		// Utility function to sort the Available list alphabetically by 'label'
		_sortList: function(list) {
			list.sort(function(a, b) {
				var labelA = a.label.replace(/ /g, '').toLowerCase();
				var labelB = b.label.replace(/ /g, '').toLowerCase();
				if (labelA < labelB)
				    return -1;
				if (labelA > labelB)
					return 1;
				return 0;
			});
		},
		
		// Function that calls the idx.widget.SloshBucket filter.
		_filter: function() {			
			var filterData = this._filterBox.get("value");
			if (this._filterData != filterData) {
				this._filterData = filterData;
				this._sloshBucket.filter({
					label: filterData
				});
			}
		},
		
		_changeDefaultSettingsState: function() {
			if (this._useDefaultSettings) {
				var availableList = this._propertyList;
				var selectedList = this._repositoryDefaultPropertiesMap[this._selectedRepositoryId];
				selectedList = this.getSelectedItems(selectedList);
				var selectedStore = new Memory({data: selectedList});
				this._sloshBucket.setSelectedGridData(selectedStore, this._selectedStoreLayout);
				// Disable SloshBucket
				domStyle.set(dom.byId("columnSettingsDialogOverlay"), "display", "block");
				this._sloshBucket.set('disabled', true);
			} else {
				// Enable SloshBucket
				this._sloshBucket.set('disabled', false);
				domStyle.set(dom.byId("columnSettingsDialogOverlay"), "display", "none");
			}
		},
		
		_updateDefaultSettingsState: function() {
			this._useDefaultSettings = this._defaultSettingsCheckBox.checked;
			this._changeDefaultSettingsState();
		},
		
		_setDefaultSettingsReadOnlyState: function() {
			if (this._useDefaultSettings) {
				// Disable SloshBucket
				domStyle.set(dom.byId("columnSettingsDialogOverlay"), "display", "block");
				this._sloshBucket.set('disabled', true);				
			} else {
				// Enable SloshBucket
				this._sloshBucket.set('disabled', false);
				domStyle.set(dom.byId("columnSettingsDialogOverlay"), "display", "none");
			}
			this._defaultSettingsCheckBox.set('checked', this._useDefaultSettings);
		},
		
		// Retrieve and set the default properties to populate the Selected grid when the default checkbox gets checked.
		_getRepositoryDefaultProperties: function() {
			var defaultLists = {};
			this._desktopRepos.forEach(lang.hitch(this, function(repo) {
				var repoConfig = repo.getRepositoryConfig();
				var repoColumns = {}; // Local structure so we can query for keys.
				var repoColumnsArray = []; // Returned structure since idx.widget.SloshBucket.setSelectedGridData takes in array type.
				
				var folderDefaultColumns = repoConfig.getFolderDefaultColumns();
				var magazineDefaultColumns = repoConfig.getFolderMagazineDefaultColumns();
				
				// Get default columns for Details view
				if (folderDefaultColumns) {
					folderDefaultColumns.forEach(lang.hitch(this, function(column) {
							var item = {id: column, label: column, detailsView: true, magazineView: false};
							repoColumns[column] = item;
					}));
				}
				
				// Get default columns for Magazine view.
				if (magazineDefaultColumns) {
					magazineDefaultColumns.forEach(lang.hitch(this, function(column) {
							if(repoColumns.hasOwnProperty(column)) {
								repoColumns[column].magazineView = true;
								var item = repoColumns[column];
								repoColumnsArray.push(item);
							} else {
								var item = {id: column, label: column, detailsView: false, magazineView: true};
								repoColumnsArray.push(item);
							}
					}));
				}
				
				defaultLists[repo.repositoryId] = repoColumnsArray;
			}));
			
			return defaultLists;
		},
		
		onCancel: function() {
			this.inherited(arguments);
		}
	});
});