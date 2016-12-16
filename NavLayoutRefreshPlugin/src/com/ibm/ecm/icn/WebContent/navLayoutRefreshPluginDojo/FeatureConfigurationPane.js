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

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/store/Memory",
	"dojo/_base/array",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/aspect",
	"dojo/dom-style",
	"dojo/keys",
	"dojo/_base/json",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"gridx/Grid",
	"gridx/core/model/cache/Sync",
	"gridx/modules/Focus",
	"gridx/modules/select/Row",
	"gridx/modules/extendedSelect/Row",
	"gridx/modules/CellWidget",
	"gridx/modules/move/Row",
	"ecm/model/Desktop",
	"ecm/model/Item",
	"ecm/widget/admin/PluginConfigurationPane",
	"ecm/widget/ValidationTextBox",
	"ecm/widget/HoverHelp",
	"ecm/widget/RadioButton",
	"ecm/widget/_MoveUpDownGridxMixin",
	"ecm/widget/FilteringSelect",
	"ecm/widget/CheckBox",
	"dojo/text!./templates/FeatureConfigurationPane.html"
],
function(declare, lang, MemoryStore, array, domClass, domAttr, aspect, style, keys, dojojson, _TemplatedMixin, _WidgetsInTemplateMixin, Grid, Cache, Focus, SelectRow, ExtendedSelectRow, CellWidget, MoveRow,
	Desktop, Item, PluginConfigurationPane, ValidationTextBox, HoverHelp, RadioButton, _MoveUpDownGridxMixin, FilteringSelect, CheckBox, template) {

	/**
	 * @name navLayoutRefreshPluginDojo.FeatureConfigurationPane
	 * @class Provides a configuration pane for the plug-in's Home feature. This pane appears in each desktop's layout tab in the IBM Content Navigator administration tool for configuration specific to this feature.
	 * @augments ecm.widget.admin.PluginConfigurationPane
	 */
	return declare("navLayoutRefreshPluginDojo.FeatureConfigurationPane", [
	    PluginConfigurationPane, 
	    _TemplatedMixin, 
	    _WidgetsInTemplateMixin, 
	    _MoveUpDownGridxMixin
	], {
		/** @lends navLayoutRefreshPluginDojo.ConfigurationPane.prototype */

		templateString: template,
		widgetsInTemplate: true,
		
		// the current feature config object being edited
		_currentFeatureConfig: null,

		// holds the list of filtered repositories that can be used for this feature:
		_filteredRepositories: null,

		// constant vals for selectedState:
		_SELECTED_EDITABLE: 0,
		_NOTSELECTED_EDITABLE: 1,
		_SELECTED_NOTEDITABLE: 2,
		
		_isLoading: false,

		postCreate: function() {
			this.inherited(arguments);
			this._setHoverHelp();
			this._initDocInfo();
		},

		_setHoverHelp: function() {
			this._myCheckoutsEnabled.setHoverHelp(this._layout_myCheckouts_hover_help);
			this._myCheckoutsDisabled.setHoverHelp(this._layout_myCheckouts_hover_help);
			this._defaultRepository.setHoverHelp(this._layout_default_repository_hover_help);
			this._docinfopaneEnabled.setHoverHelp(this._layout_docinfopane_hover_help);
			this._docinfopaneDisabled.setHoverHelp(this._layout_docinfopane_hover_help);
		},

		/**
		 * Initially load all the values from the configurationString onto the various fields.
		 */
		load: function(callback) {
			this._isLoading = true;
			this._currentFeatureConfig = {};
			if (this.configurationString) {
				this._currentFeatureConfig = dojojson.fromJson(this.configurationString);
			
				if (this._currentFeatureConfig.showMyCheckouts) {
					this._myCheckoutsEnabled.set('checked', true);
					this._myCheckoutsDisabled.set('checked', false);
				} else {
					this._myCheckoutsEnabled.set('checked', false);
					this._myCheckoutsDisabled.set('checked', true);
				}
				
				if (this._currentFeatureConfig.showDocumentInfoPane) {
					this._docinfopaneEnabled.set("checked", true);
					this._docinfopaneDisabled.set("checked", false);
					if (this._currentFeatureConfig.documentInfoPaneDefaultOpen) {
						this._docInfoPaneDefault.set("value", 0);
					} if (this._currentFeatureConfig.documentInfoPaneOpenOnSelection) {
						this._docInfoPaneDefault.set("value", 1);
					} else {
						this._docInfoPaneDefault.set("value", 2);
					}
				} else {
					this._docinfopaneEnabled.set("checked", false);
					this._docinfopaneDisabled.set("checked", true);
					this._docInfoPaneDefault.set("value", 1);
				}
			}

			this.own(aspect.after(this.desktopFeaturePanel.tabFeatures, "onAddAndRemoveRepositories", lang.hitch(this, this._onAddAndRemoveRepositories)));

			this._getRepositories(lang.hitch(this, function() {
				this._initSelectedReposGrid();
				this._loadRepositoriesControl(this._filteredRepositories, lang.hitch(this, function() {
					this._initViewsGrid();
					this._isLoading = false;
				}));
			}));
		},
		
		/**
		 * Saves all the values from fields onto the configuration string which will be stored into the admin's configuration.
		 */
		save: function() {
			var configString = {}; 
			
			configString.showMyCheckouts = this._myCheckoutsEnabled.get('checked');
			configString.defaultRepository = this._defaultRepository.get('value');
			
			var showRepos = this._getRepositoriesToShow();
			if (showRepos != null) {
				configString.showRepositories = showRepos;
			}
			
			var showViews = this._getViewsToShow();
			if (showViews) {
				configString.showViews = showViews;
			}
			
			configString.showDocumentInfoPane = this._docinfopaneEnabled.get("checked");
			
			var docInfoDefault = this._docInfoPaneDefault.get("value");
			configString.documentInfoPaneDefaultOpen = docInfoDefault == 0;
			configString.documentInfoPaneOpenOnSelection = docInfoDefault == 1;
			
			this.configurationString = JSON.stringify(configString);
		},
		
		_onFieldChange: function() {
			if (!this._isLoading) {
				this.onSaveNeeded(true);
			}
		},

		_onMyCheckoutsEnabledChange: function(checked) {
			if (checked) {
				domClass.remove(this._myCheckoutsRepositorySettingsTable, "disabled");
			} else {
				domClass.add(this._myCheckoutsRepositorySettingsTable, "disabled");
			}
			this._onFieldChange();
		},

		_setRepositoryGridDisabled: function(disabled) {
			array.forEach(this._selReposGrid.rows(), function(row) {
				var item = row.item();
				var cell = row.cell(1);
				var widget = cell.widget();
				if (widget && widget.cb)
					widget.cb.set("disabled", disabled || item.isDefault); // default repository shall remain disabled
			});
		},

		/**
		 * Validates this feature configuration pane.
		 */
		validate: function() {
			return true;
		},
		
		_getRepositories: function(callback) {
			if (!this._allRepositories) {
				// Get the list of repositories from whats currently selected in the Repositories tab
				if (this.desktopFeaturePanel && this.desktopFeaturePanel.tabRepositories) {
					var selectedReposData = this.desktopFeaturePanel.tabRepositories.sloshBucket.getSelectedItems();
					this._allRepositories = selectedReposData;
					this._filterRepositories(selectedReposData, callback);
				} else if (this.desktopData.desktopConfig) { // if we don't have repositories tab then get it by using desktopConfig
					this.desktopData.desktopConfig.getRepositoryObjects(lang.hitch(this, function(repositories) {
						this._allRepositories = repositories;
						this._filterRepositories(repositories, callback);							
					}));
				}
			} else {
				this._filterRepositories(this._allRepositories, callback);
			}
		},
		
		// filter out the repositories based on the current feature being edited
		_filterRepositories: function(repositories, callback) {
			var filteredRepositories = [];
			if (repositories) {
				for (var i = 0; i < repositories.length; i++) {
					var repository = repositories[i];
					if (repository.type != "od")
						filteredRepositories.push(repository);
				}
			}
			this._filteredRepositories = filteredRepositories;
			if (callback)
				callback();
		},

		_loadRepositoriesControl: function(repositories, callback) {
			var currentRepository = null;
			var hasCurrentValue = false;
			
			if (this._currentFeatureConfig && this._currentFeatureConfig.defaultRepository) {
				currentRepository = this._currentFeatureConfig.defaultRepository;
				hasCurrentValue = true;
			} else {
				if (repositories[0]) {
					currentRepository = repositories[0].id; // Take first repo in the list as default setting
				}
			}
			
			var _items = [];
			var self = this;

			array.forEach(repositories, function(entry, index) {
				var id = entry.getId ? entry.id : entry.id;

				var selected = true;
				// if showing the select repositories grid see if it was selected:
				var item = self._selReposGrid.model.store.get(id);
				if (item)
					selected = item.selected;

				if (selected) {
					if (id && currentRepository && currentRepository == id)
						hasCurrentValue = true;
					_items.push({
						id: id,
						label: entry.getName ? entry.getName() : entry.name
					});
				}
			});
			this._defaultRepository.set("store", new MemoryStore({
				data: _items
			}));
			this._defaultRepository.set('value', hasCurrentValue ? currentRepository : "");
			this._onFieldChange();
			if (callback)
				callback();
		},
		
		_onChangeDefaultRepository: function() {
			var oldval = this._currentFeatureConfig.defaultRepository;
			var newval = this._defaultRepository.get('value');
			if (oldval && newval && oldval != newval) {
				this._currentFeatureConfig.defaultRepository = newval;
				this._onFieldChange();

				// update grid (if displaying the selected repositories):
				if (this._showSelRepository) {
					var item = this._selReposGrid.model.store.get(newval);
					if (item) {
						item.selected = true;
						item.selectedState = this._getSelectedState(newval, true, newval);
						item.isDefault = true;
						this._selReposGrid.model.store.put(item, {
							id: item.id,
							overwrite: true
						});
					}
	
					if (oldval) {
						var item = this._selReposGrid.model.store.get(oldval);
						if (item) {
							item.selectedState = this._getSelectedState(oldval, item.selected, newval);
							item.isDefault = false;
							this._selReposGrid.model.store.put(item, {
								id: item.id,
								overwrite: true
							});
						}
					}
				}
			}
		},

		_initSelectedReposGrid: function(callback) {
			if (this._selReposGrid) {
				this._selReposGrid.destroy();
			}
			
			this._selReposGrid = new Grid({
				region: "center",
				"aria-label": this.messages.admin_feature_config_selected_repositories_label,
				id: this.id + "_selReposGrid",
				cacheClass: Cache,
				store: this._createStore(),
				structure: [
					{
						field: "isDefault",
						name: " ",
						sortable: false,
						filterable: false,
						width: "25px",
						decorator: lang.hitch(this, function(data, rowId, rowIndex) {
							if (data == true) {
								var stateClass = Item.StateToCssClass["default"];
								if (!stateClass) {
									stateClass = "ecmDefaultIcon";
								}
								return '<img class="ecmStatusIcon ' + stateClass + '" alt="' + this.messages.admin_feature_config_default_repository_icon_text + '" title="' + this.messages.admin_feature_config_default_repository_icon_text + '" src="' + this._blankGif + '"/>';
							}
							return "";
						}),
						styles: 'align: center; text-align: center;'
					},
					{
						field: "selectedState",
						name: "",
						width: "30px",
						widgetsInCell: true,
						navigable: true,
						style: 'align: center; text-align: center;',
						headerStyle: 'align: center; text-align: center;',
						decorator: function(data, rowId, rowIndex) {
							return '<span data-dojo-type="ecm/widget/CheckBox" data-dojo-attach-point="cb">';
						},
						setCellValue: function(data, storeData, cellWidget) {
							var item = cellWidget.cell.row.item();
							this.cb.set("checked", item.selected);

							// Disable the check box if this is the default repository or my checkouts is disabled
							this.cb.set("disabled", item.isDefault);
							domAttr.set(this.cb.focusNode, "aria-label", item.name);
						}
					},
					{
						field: "name",
						name: this.messages.admin_feature_config_selected_repositories_name_hdr
					}
				],
				style: "height: 200px; width: 300px;",
				modules: [
					CellWidget,
					Focus,
					MoveRow,
					SelectRow,
					{
						moduleClass: SelectRow,
						multiple: false,
						triggerOnCell: true
					}
				]
			});
			domClass.add(this._selReposGrid.domNode, "compact gridxWholeRow");
			this._selRepositoriesGridArea.appendChild(this._selReposGrid.domNode);
			this._selReposGrid.startup();
			this.own(aspect.after(this._selReposGrid, "onCellClick", lang.hitch(this, "_onCellClick"), true));
			this.own(aspect.after(this._selReposGrid, "onCellKeyDown", lang.hitch(this, "_onCellClick"), true));
			
			if (callback)
				callback();
		},

		// toggle the checked state
		_onCellClick: function(evt) {
			if (evt.columnId == "2" && ((evt.type == "keydown" && evt.keyCode == keys.SPACE) || evt.type == "click")) {
				var item = this._selReposGrid.model.store.get(evt.rowId);
				if (item && item.selectedState != this._SELECTED_NOTEDITABLE) {
					item.selected = !item.selected;
					var defRepo = this._defaultRepository.get('value');
					item.selectedState = this._getSelectedState(item.id, item.selected, defRepo);
					this._selReposGrid.model.store.put(item, {
						id: item.id,
						overwrite: true
					});
					this._loadRepositoriesControl(this._filteredRepositories);
				}
			}
		},

		_createStore: function() {
			var items = [];
			if (this._filteredRepositories) {
				// get the current value of the selected repositories
				var currentDefault = this._currentFeatureConfig.defaultRepository;
				if (!currentDefault &&  this._filteredRepositories[0])
					currentDefault = this._filteredRepositories[0].id;
				
				for (var i = 0; i < this._filteredRepositories.length; i++) {
					var selected = true;
					var currentRep = this._filteredRepositories[i];
					var isDefault = false;
					// the default rep should always be selected
					if (currentDefault && currentRep.id == currentDefault) {
						selected = true;
						isDefault = true;
					}
					items.push({
						"id": currentRep.id,
						"name": currentRep.getName ? currentRep.getName() : currentRep.name,
						"selected": selected,
						"isDefault": isDefault,
						"selectedState": this._getSelectedState(currentRep.id, selected, currentDefault)
					});
				}
			}

			return new MemoryStore({
				data: items
			});
		},
		
		_initViewsGrid: function() {
			if (this._viewsGrid) {
				this._viewsGrid.destroy();
			}
			this._viewsGrid = new Grid({
				"aria-label": this.messages.admin_feature_config_view,
				id: this.id + "_viewsGrid",
				cacheClass: Cache,
				store: this._createViewsStore(),
				structure: [
					{
						field: "selectedState",
						name: "",
						width: "30px",
						widgetsInCell: true,
						navigable: true,
						style: 'align: center; text-align: center;',
						headerStyle: 'align: center; text-align: center;',
						decorator: function(data, rowId, rowIndex) {
							return '<span data-dojo-type="ecm/widget/CheckBox" data-dojo-attach-point="viewCb">';
						},
						setCellValue: function(data, storeData, cellWidget) {
							var item = cellWidget.cell.row.item();
							this.viewCb.set("checked", item.selected);
							domAttr.set(this.viewCb.focusNode, "aria-label", item.name);
						}
					},
					{
						field: "name",
						name: this.messages.admin_feature_config_view_hdr
					}
				],
				modules: [
					CellWidget,
					Focus,
					MoveRow,
					{
						moduleClass: SelectRow,
						multiple: false,
						triggerOnCell: true
					}
				],
				style: "height: 145px; width: 300px;"
			});
			domClass.add(this._viewsGrid.domNode, "compact gridxWholeRow");
			this._selViewsGridArea.appendChild(this._viewsGrid.domNode);
			this._viewsGrid.startup();
			this._checkViewGridButtons();

			var moveUpTooltip = this.messages.move_up_selected_tooltip;
			this.moveUpViewButton.set("title", moveUpTooltip);
			domAttr.set(this.moveUpViewButton.focusNode, "aria-label", moveUpTooltip);
			var moveDownTooltip = this.messages.move_down_selected_tooltip;
			this.moveDownViewButton.set("title", moveDownTooltip);
			domAttr.set(this.moveDownViewButton.focusNode, "aria-label", moveDownTooltip);

			this.own(aspect.after(this._viewsGrid.select.row, "onSelectionChange", lang.hitch(this, "_checkViewGridButtons"), true));
			this.own(aspect.after(this._viewsGrid, "onCellClick", lang.hitch(this, "_onViewCellClick"), true));
			this.own(aspect.after(this._viewsGrid, "onCellKeyDown", lang.hitch(this, "_onViewCellClick"), true));
		},

		// toggle the checked state
		_onViewCellClick: function(evt) {
			if (evt.columnId == "1" && ((evt.type == "keydown" && evt.keyCode == keys.SPACE) || evt.type == "click")) {
				var item = this._viewsGrid.model.store.get(evt.rowId);
				if (item) {
					item.selected = !item.selected;
					this._viewsGrid.model.store.put(item, {
						id: item.id,
						overwrite: true
					});
					this._onFieldChange();
				}
			}
		},

		_createViewsStore: function() {
			var items = [];
			var i = 0;
			var showViews = this._currentFeatureConfig.showViews || [];
			if (showViews.length == 0) {
				showViews.push("detail");
				showViews.push("magazine");
				showViews.push("filmstrip");
			}
			for (i = 0; i < showViews.length; i++) {
				var viewId = showViews[i];
				var name = this.messages[viewId + "_view_button"];
				if (!name) {
					name = viewId;
				}
				items.push({
					"id": viewId,
					"name": name,
					"selected": true,
					"order": i
				});
			}
			
			// Add the de-selected views
			if (!this._hasView("detail", showViews)) {
				items.push({
					"id": "detail",
					"name": ecm.messages.detail_view_button,
					"order": ++i,
					"selected": false
				});
			}
			if (!this._hasView("magazine", showViews)) {
				items.push({
					"id": "magazine",
					"name": ecm.messages.magazine_view_button,
					"order": ++i,
					"selected": false
				});
			}
			if (!this._hasView("filmstrip", showViews)) {
				items.push({
					"id": "filmstrip",
					"name": ecm.messages.filmstrip_view_button,
					"order": ++i,
					"selected": false
				});
			}
			
			return new MemoryStore({
				data: items
			});
		},

		_hasView: function(viewId, views) {
			if (views) {
				for (var i = 0; i < views.length; i++) {
					if (views[i] == viewId) {
						return true;
					}
				}
			}
			return false;
		},

		_onMoveUpView: function() {
			this._moveUpSelectedRows(this._viewsGrid);
			this._checkViewGridButtons();
			this._onFieldChange();
		},

		_onMoveDownView: function() {
			this._moveDownSelectedRows(this._viewsGrid);
			this._checkViewGridButtons();
			this._onFieldChange();
		},

		_checkViewGridButtons: function() {
			var selectedItems = this._viewsGrid.select.row.getSelected();
			this.moveUpViewButton.set('disabled', selectedItems.length == 0 || !this._hasRowsToMoveUp(this._viewsGrid));
			this.moveDownViewButton.set('disabled', selectedItems.length == 0 || !this._hasRowsToMoveDown(this._viewsGrid));
		},

		// get the list of views to show from the selected views grid
		_getViewsToShow: function() {
			var views = null;
			if (this._viewsGrid) {
				var items = this.getData(this._viewsGrid);
				views = [];
				array.forEach(items, function(entry) {
					if (entry.selected)
						views.push(entry.id);
				});
			}
			return views;
		},

		// get the value for selected state, this is just a value to use to represent the 
		// selected checkbox in the grid
		_getSelectedState: function(repositoryId, selected, defaultRep) {
			var selState = this._SELECTED_EDITABLE;
			if (defaultRep) {
				if (defaultRep == repositoryId)
					selState = this._SELECTED_NOTEDITABLE;
				else
					selState = selected ? this._SELECTED_EDITABLE : this._NOTSELECTED_EDITABLE;
			}
			return selState;
		},

		// the repository list changed, update the grid
		_updateSelectedRepositoriesGrid: function(callback) {
			if (this._selReposGrid) {
				var newStore = this._createStore();
				this._selReposGrid.setStore(newStore);
			}
			if (callback)
				callback();
		},

		// get the list of repositories to show from the selected repositories grid
		_getRepositoriesToShow: function() {
			var showRepositories = null;
			if (this._selReposGrid) {
				var items = this._selReposGrid.model.store.query({});
				showRepositories = [];
				array.forEach(items, function(entry) {
					if (entry.selected)
						showRepositories.push(entry.id);
				});
			}
			return showRepositories;
		},

		onSelect: function() {
			if (this._reloadRepository) {
				if (this._selReposGrid && this._showSelRepository) {
					this._initSelectedReposGrid(lang.hitch(this, function() {
						this._loadRepositoriesControl(this._filteredRepositories);
					}));
					this._reloadRepository = false;
				}
			}
		},

		// a repository was added or removed in the repositories tab:
		//  -repopulate the repositories drop down
		//  -repopulate the selected repositories grid
		//  -if the current config default repository was updated then update the UI
		_onAddAndRemoveRepositories: function() {
			// reset current list of repositories
			if (this._currentFeatureConfig != null) {
				this._allRepositories = null;
				this._getRepositories(lang.hitch(this, function() {
					this._updateSelectedRepositoriesGrid(lang.hitch(this, function() {
						this._reloadRepository = true;
						this._loadRepositoriesControl(this._filteredRepositories);
						// if default repo changed then update the form value
						var screenVal = this._defaultRepository.get('value');
						var configVal = this._currentFeatureConfig.defaultRepository;
						if (screenVal != configVal) {
							this._defaultRepository.set('value', configVal);
							this._onFieldChange();
						}
					}));
				}));
			}
		},
		
		_onDocInfoPaneEnabledClick: function() {
			this._setDocInfoPaneState(true);
			this._onFieldChange();
		},

		_onDocInfoPaneDisabledClick: function() {
			this._setDocInfoPaneState(false);
			this._onFieldChange();
		},

		_setDocInfoPaneState: function(paneEnabled) {
			this._docInfoPaneDefault.set("disabled", !paneEnabled);
		},

		_initDocInfo: function() {
			this._docInfoPaneDefault.set("store", new MemoryStore({
				data: [
					{
						"id": "0",
						"label": this.messages.admin_feature_config_docinfopane_expanded
					},
					{
						"id": "1",
						"label": this.messages.admin_feature_config_docinfopane_expand_on_select
					},
					{
						"id": "2",
						"label": this.messages.admin_feature_config_docinfopane_collapsed
					}
				]
			}));
			this._docInfoPaneDefault.set("value", "1");
		}
	});
});
