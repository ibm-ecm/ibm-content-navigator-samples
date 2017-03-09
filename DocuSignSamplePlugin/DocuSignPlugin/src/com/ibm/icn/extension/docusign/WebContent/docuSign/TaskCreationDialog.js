define([ 
	"dojo/_base/declare",
	"dojo/_base/lang", 
	"dojo/_base/array", 
	"ecm/widget/taskManager/BaseTaskCreationDialog", 
	"docuSign/TaskCreationPane", 
	"dojo/text!./templates/TaskCreationDialog.html",
], function(declare, lang, array, BaseTaskCreationDialog, TaskCreationPane, contentString) 
{
	return declare("docuSign.TaskCreationDialog", [ 
	  BaseTaskCreationDialog
	], 
		
	{
		contentString: contentString, 
		widgetsInTemplate: true,
		
		postCreate: function() { 
			this.inherited(arguments);
			
			var p8RepoList = this._getP8Repositories();
			this.taskCreationPane = new TaskCreationPane({repoList: p8RepoList});
			this.taskSchedulerPane.addTitlePaneSection("DocuSign Auto Check-in Configuration", this.taskCreationPane, 0);
		},

		onSchedule: function() {
			var valid = this.taskCreationPane.validate();
			
			if (valid == true) {
				this.taskParameters.targetRepositoryId = this.taskCreationPane.getSelectedRepository();
				this.taskParameters.docusignUserName = this.taskCreationPane.getDocusignUser();
				this.taskParameters.docusignPassword = this.taskCreationPane.getDocusignPassword();
				this.taskParameters.docusignIntegratorKey = this.taskCreationPane.getDocusignIntegrationKey();
				this.taskParameters.docusignP8Folder = this.taskCreationPane.getDocusignP8Folder();
				this.taskParameters.docusignAutocheckinFlag = this.taskCreationPane.getDocuSignAutocheckinFlag();
				
				this.inherited(arguments);
			}
		},

		_getP8Repositories: function () {
			var repoList = [];
			var repositories = ecm.model.desktop.repositories;
			array.forEach (repositories, function(repository) {
				// Only get P8 repository that has been configured with Task Manager
				//if ((repository.type === "p8") && (repository.taskManagerProxyUserId != null) && (repository.taskManagerProxyUserId.length > 0))
				if (repository.type === "p8")
					repoList.push(repository);
			});
			return repoList;
		}

	});
});
