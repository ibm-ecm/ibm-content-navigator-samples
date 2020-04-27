/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2012, 2013  All Rights Reserved.
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

define([ "dojo/_base/declare", //
"dojo/_base/lang", //
"dojo/_base/connect", //
"dojo/dom-class", //
"dojo/dom-style", //
"dijit/_TemplatedMixin", //
"dijit/_WidgetsInTemplateMixin", //
"dijit/layout/BorderContainer", //
"dijit/layout/ContentPane", //
"dijit/layout/StackContainer", //
"dijit/layout/TabContainer", //
"idx/layout/BorderContainer", // 
"ecm/model/Desktop", //
"ecm/model/SearchTemplate", //
"ecm/widget/LoginPane", //
"ecm/widget/Banner", //
"ecm/widget/MessageBar", //
"ecm/widget/GlobalToolbar", //
"ecm/widget/layout/BaseLayout", //
"ecm/widget/listView/gridModules/RowContextMenu", //
"ecm/widget/listView/modules/Breadcrumb", //
"ecm/widget/listView/modules/Bar", //
"ecm/widget/listView/modules/Toolbar2", //
"ecm/widget/listView/modules/DocInfo", //
"ecm/widget/listView/gridModules/DndRowMoveCopy", //
"ecm/widget/listView/gridModules/DndFromDesktopAddDoc", //
"ecm/widget/listView/modules/ViewDetail", //
"ecm/widget/listView/modules/ViewMagazine", //
"ecm/widget/listView/ContentList", //
"ecm/widget/FolderTree", //
"ecm/widget/search/SearchSelector", //
"ecm/widget/WorklistSelector", //
"ecm/widget/process/InbasketContainer", //
"ecm/widget/dialog/ContentViewerWindow", //
"ecm/widget/search/SearchTabContainer", //
"ecm/widget/layout/_SearchTabMixin",//
"dojo/text!samplePages/layout/templates/ClassicLayout.html" ], //
function(declare, //
lang, //
connect, //
domClass, //
domStyle, //
_TemplatedMixin, //
_WidgetsInTemplateMixin, //
BorderContainer, //
ContentPane, //
StackContainer, //
TabContainer, //
idxBorderContainer, //
Desktop, //
SearchTemplate, //
LoginPane, //
Banner, //
MessageBar, //
GlobalToolbar, //
BaseLayout, //
RowContextMenu, //
Breadcrumb, //
Bar, //
Toolbar, //
DocInfo, //
DndRowMoveCopy, //
DndFromDesktopAddDoc, //
ViewDetail, //
ViewMagazine, //
ContentList, //
FolderTree, //
SearchSelector, //
WorklistSelector, //
InbasketContainer, //
ContentViewerWindow, //
SearchTabContainer, //
_SearchTabMixin, //
template) {

	/**
	 * @name ClassicLayout
	 * @class Provides an application layout similar to earlier IBM ECM web clients.
	 * @augments ecm.widget.layout.BaseLayout
	 */
	return declare("ClassicLayout", [ BaseLayout, _TemplatedMixin, _WidgetsInTemplateMixin, _SearchTabMixin ], {
		/** @lends ClassicLayout.prototype */

		templateString: template,

		// Set this to true if your widget contains other widgets
		widgetsInTemplate: true,

		desktopId: null,

		postCreate: function() {
			this.inherited(arguments);
			var ID = this.id;

			this.folderContents.setContentListModules(this.getContentListModules());
			this.folderContents.setGridExtensionModules(this.getContentListGridModules());

			// Handle connect and disconnect events to show login or main panes
			this.connect(Desktop, "onLogin", lang.hitch(this, function(repository) {
				this.repository = repository;
				if (!repository.getPrivilege("foldering")) {
					this.modeTabContainer.removeChild(this.browseModeContainer);
				} else {
					this._doBrowseConnections();
					this.folderTree.setRepository(repository);
				}

				if (!repository.getPrivilege("search")) {
					this.modeTabContainer.removeChild(this.searchModeContainer);
				} else {
					this.searchSelector.setRepository(repository);
					this._doSearchSelectorConnections();

					if (this.searchTabContainer)
						this.searchTabContainer.setRepository(repository);

					var openTabs = this.searchTabContainer.getChildren();
					if (openTabs || openTabs.length == 0) {
						repository.retrieveRecentSearches(lang.hitch(this, function(recents) {
							if (recents && recents.length > 0) {
								var recentItem = recents[recents.length - 1];
								if (recentItem) {
									var self = this;
									var callback = function(searchTemplate) {
										self.openTab({
											tabType: "search",
											repository: repository,
											selected: true,
											closable: true,
											"searchTemplate": searchTemplate
										});
									};

									if (!repository._isOnDemand() && !recentItem.id) {
										// Retrieve the search before opening it
										repository.retrieveSearchTemplate(recentItem.id, recentItem.vsId, "released", callback);
									} else {
										var cloneItem = recentItem.clone();
										callback(cloneItem);
									}
								}
							}
						}));
					}
				}

				if (!repository.getPrivilege("workflow")) {
					this.modeTabContainer.removeChild(this.workModeContainer);
				} else {
					this._doWorkSelectorConnections(repository);
					this._doWorkConnections();

					this.worklistSelector.setRepository(repository);
				}

				this.globalToolbar.setRepository(repository);
			}));
		},

		getContentListGridModules: function() {
			var array = [];
			array.push(DndRowMoveCopy);
			array.push(DndFromDesktopAddDoc);
			array.push(RowContextMenu);
			//array.push(Column);
			return array;
		},

		getContentListModules: function() {
			var viewModules = [];
			viewModules.push(ViewDetail);
			viewModules.push(ViewMagazine);

			var array = [];
			array.push({
				moduleClass: Bar,
				top: [ [ [ {
					moduleClass: Toolbar
				}, {
					moduleClasses: viewModules,
					"className": "BarViewModules"
				} ] ], [ [ {
					moduleClass: Breadcrumb
				} ] ] ]
			});
			array.push(DocInfo);
			return array;
		},

		_doBrowseConnections: function() {
			// onItemSelected called when user selects a node in the tree
			this.connect(this.folderTree, "onItemSelected", lang.hitch(this, function(item) {
				if (!this.folderContents.getResultSet() || !this.folderContents.getResultSet().isResultSetForItem(item)) {
					this.folderContents.openItem(item);
				}
			}));

			this.connect(this.folderContents, "onOpenItem", lang.hitch(this, function(item, data) {
				var path = item.getPath();
				if (!this.folderTree.isPathSelected(path)) {
					this.folderTree.set("path", path);
				}
			}));
		},

		/**
		 * Sets up event handles for the search list.
		 */
		_doSearchSelectorConnections: function() {
			var self = this;

			this.searchSelector.connect(this.searchSelector, "onSearchTemplateSelected", function(searchTemplate) {
				self.openTab({
					UUID: searchTemplate.UUID,
					tabType: searchTemplate.isNew() ? "searchbuilder" : "search",
					repository: self.repository,
					selected: true,
					closable: true,
					"searchTemplate": searchTemplate
				});
			});

			this.searchSelector.connect(this.searchSelector, "onNewSearchButtonClick", function() {
				if (self.searchSelector)
					self.searchSelector.clearSelection();

				self.openTab({
					tabType: "searchbuilder",
					repository: self.repository,
					selected: true,
					closable: true
				});
			});
		},

		/**
		 * Sets the worklist loaded in this pane.
		 */
		setWorklist: function(worklist, repository) {
			this.logEntry("setWorklist");

			this.inbasketArea.setRepository(repository);

			if (repository.type == "p8") {
				this.openInbaskets(worklist);
			} else if (repository.type == "cm") {
				this.openWorklists(worklist);
			}

			this.logExit("setWorklist");
		},

		/**
		 * Sets up event handles for the work selector.
		 */
		_doWorkSelectorConnections: function(repository) {
			this.logEntry("_doWorkSelectorConnections");

			this.connect(this.worklistSelector, "onProcessRoleSelected", lang.hitch(this, function(processRole) {
				processRole.retrieveWorklists(lang.hitch(this, function(result) {
					this.setWorklist(result[0], repository);
				}));
			}));

			this.connect(this.worklistSelector, "onWorklistSelected", lang.hitch(this, function(worklist) {
				this.setWorklist(worklist, repository);
			}));

			this.logExit("_doWorkSelectorConnections");
		},

		// P8
		openInbaskets: function(worklist) {
			this.logEntry("openInbaskets");

			domStyle.set(this.inbasketArea.tabContainer.domNode, "display", "block");
			domStyle.set(this.inbasketArea.worklistContentsPane.domNode, "display", "none");

			var currentProcessRole = worklist.parent;
			if (currentProcessRole == this.inbasketArea.getProcessRole()) { // inbasket is from a role that is already selected
				var index = this.inbasketArea.getInbasketTabIndex(worklist);
				this.inbasketArea.setSelectedIndex(index);
				var contentList = this.inbasketArea.getSelectedContentList();
				if (index >= 0 && !contentList.getResultSet()) {
					this.inbasketArea.retrieveResultSet(this.inbasketArea.getInbasket(index), index);
				} else {
					// this inbasket has already been opened, just reload and update toolbar state
					this.inbasketArea.selectedInbasket = this.inbasketArea.getInbasket(index);
				}
				this.inbasketArea.selectCurrentContentList();
			} else { // work list is from a role that isn't yet selected
				this.inbasketArea.tabContainer.destroyDescendants(); // remove all tabs from previous role
				this.inbasketArea.setSelectedContentList(null);
				this.inbasketArea.setProcessRole(currentProcessRole);

				// retrieves all inbaskets from current role
				currentProcessRole.retrieveWorklists(lang.hitch(this, function(result) {
					var inbaskets = result;
					this.inbasketArea.setInbaskets(inbaskets);
					// creates content lists for each inbasket, but only retrieves workitems for currently selected tab
					for (var index = 0; index < inbaskets.length; index++) {
						var inbasket = inbaskets[index];
						this.inbasketArea.createInbasketTab(index);
						if (inbasket.id == worklist.id) {
							this.inbasketArea.retrieveResultSet(inbasket, index);
							this.inbasketArea.selectCurrentContentList();
						}
					}
				}));
			}

//			this.inbasketArea.selectCurrentContentList();
			this.logExit("openInbaskets");
		},

		// CM
		openWorklists: function(worklist) {
			this.logEntry("openWorklists");

			domStyle.set(this.inbasketArea.tabContainer.domNode, "display", "none");
			domStyle.set(this.inbasketArea.worklistContentsPane.domNode, "display", "block");

			worklist.retrieveWorkItems(lang.hitch(this, function(resultSet) {
				this.inbasketArea.worklistContents.setResultSet(resultSet);
			}));

			this.connect(worklist, "onRefresh", function() {
				worklist.retrieveWorkItems(lang.hitch(this, function(resultSet) {
					this.inbasketArea.worklistContents.setResultSet(resultSet);
				}));
			});

			this.connect(worklist, "onRefreshWorklist", function() {
				this.inbasketArea.refresh();
			});

			this.inbasketArea.setSelectedWorklist(worklist);
			this.inbasketArea.setSelectedContentList(this.inbasketArea.worklistContents);
			this.logExit("openWorklists");
		},

		_doWorkConnections: function() {
			this.connect(this.inbasketArea.tabContainer, "_transition", function(newInbasket, oldInbasket) {
				var selectedContentList = this.inbasketArea.getSelectedContentList();
				if (oldInbasket && (selectedContentList == null || newInbasket.title != selectedContentList.title)) {
					var inbaskets = this.inbasketArea.getInbaskets();
					for (var index = 0; index < inbaskets.length; index++) {
						var inbasket = inbaskets[index];
						if (inbasket.name == newInbasket.title) {
							this.inbasketArea.setSelectedIndex(index);
							this.inbasketArea.selectedInbasket = inbasket;
							this.inbasketArea.setSelectedContentList(newInbasket);
							if (!newInbasket.getResultSet()) {
								this.inbasketArea.retrieveResultSet(inbasket, index);
							} else {
								this.inbasketArea.setMessage();
							}
							break;
						}
					}
				}

				if (this.worklistSelector) {
					var workflowTree = this.worklistSelector._tree;
					var processRole = this.inbasketArea.getProcessRole();
					var appSpaceNode = workflowTree.getNodesByItem(processRole.parent.id);

					var selectInbasket = lang.hitch(this, function() {
						var currentInbasket = inbasket ? inbasket : this.inbasketArea.selectedInbasket;
						if (currentInbasket && currentInbasket.parent.id == processRole.id) {
							var inbasketNode = workflowTree.getNodesByItem(currentInbasket)[0];
							if (inbasketNode) {
								workflowTree.set('selectedItems', [ inbasketNode.item ]);
								window.scrollIntoView(inbasketNode.rowNode);
								// this.onClick(inbasketNode.item, inbasketNode);
							}
						}
					});

					if (appSpaceNode && appSpaceNode[0]) {
						var deferred = workflowTree._expandNode(appSpaceNode[0], false);
						deferred.then(lang.hitch(this, function() {
							var roleNode = workflowTree.getNodesByItem(processRole.id);
							var def = workflowTree._expandNode(roleNode[0], false);
							def.then(lang.hitch(this, function() {
								selectInbasket(processRole);
							}));
						}));
					} else {
						var roleNode = workflowTree.getNodesByItem(processRole.id);
						if (roleNode && roleNode[0]) {
							var deferred = workflowTree._expandNode(roleNode[0], false);
							deferred.then(lang.hitch(this, function() {
								selectInbasket(processRole);
							}));
						}
					}
				}
			});
		}
	});
});
