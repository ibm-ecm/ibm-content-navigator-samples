define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/connect",
	"dojo/_base/array",
	"dojo/aspect",
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"dijit/layout/ContentPane",
	"dojo/store/Memory",
	"dojo/dom-class",
   	"dojo/json",
	"gridx/Grid",
	"gridx/modules/Focus",
	"gridx/modules/select/Row",
	"gridx/modules/SingleSort",
	"gridx/modules/ColumnResizer",
	"gridx/modules/CellWidget",
	"gridx/modules/Body",
	"gridx/modules/Edit",
	"gridx/modules/Filter",
	"dojo/text!./templates/TaskCreationPane.html",
	"dijit/layout/BorderContainer",
	"dijit/form/FilteringSelect",
	"dijit/form/Button"
], function(declare, lang, connect, array, aspect, TemplatedMixin, WidgetsInTemplateMixin, ContentPane, MemoryStore, domClass, json,
		Grid, Focus, SelectRow, SingleSort, ColumnResizer, CellWidget, Body, Edit, FilterModule, contentString) {
			
      return declare("docuSign.TaskCreationPane", [ContentPane, TemplatedMixin, WidgetsInTemplateMixin ], {
         templateString: contentString,
         widgetsInTemplate: true,
         
		constructor: function (args) {
			this._repoList = args.repoList;
		},
		
		destroy: function() {
        	this.inherited(arguments);
			
    		if (this._repoList)
				delete this._repoList;
        },

		postCreate: function() {
			this.inherited(arguments);
			
			this._showRepositories();
		},
		
        /**
        * Returns true if this pane contains all valid values. */
        validate: function() { 
			return true;
		},

		getSelectedRepository: function () {
			return this.p8RepoSelect.get('value');
		},
		
		getDocusignUser: function () {
			return this.docuSignUser.get('value');
		},
		
		getDocusignPassword: function () {
			return this.docuSignPassword.get('value');
		},
		
		getDocusignIntegrationKey: function () {
			return this.docuSignIntegrationKey.get('value');
		},
		
		getDocusignP8Folder: function () {
			return this.docuSignP8Folder.get('value');
		},
		
		_showRepositories: function () {
			if (this._repoList != null) {
				var reposData = {identifier: "id", items:[]};
				array.forEach(this._repoList, function(p8Repo) {
					reposData.items.push(p8Repo);
				});
				var reposStore = new MemoryStore({data: reposData});
				this.p8RepoSelect.set("store", reposStore);
				this.p8RepoSelect.set("value", reposStore.getIdentity(reposStore.data[0]));
			}
		}
			
      });
   });
