define([ "dojo/_base/lang", //
"dojo/ready", //
"dojo/_base/connect", //
"dojo/dom", //
"dijit/registry", //
"ecm/model/Desktop", //
"ecm/model/Message", //
"ecm/Logger" ], function(lang, ready, connect, dom, registry, Desktop, Message, Logger) {

	ready(function() {
		Logger.initLogger(4, true);

		// A simple error handler
		connect.connect(Desktop, "onMessageAdded", function(message) {
			if (message.level > 0) {
				alert(message.text);
				var resultArea = dom.byId("result");
				if (resultArea) {
					resultArea.innerHTML = message.text;
				} else {
					registry.byId("result").domNode.innerHTML = message.text;
				}
			}
		});
	});

	var repository = null;
	var passwordChange = null;

	lang.setObject("passwordChange", function(event) {
		passwordChange = true;
	});

	var _getRepository = function(callback) {
		var repositoryId = dom.byId("repositoryId").value;
		if (repository && repository.id != repositoryId)
			repository.logoff();

		var userId = dom.byId("userId").value;
		var password = dom.byId("password").value;

		if (repository && repositoryId == repository.id && userId == repository.userId && !passwordChange) {
			if (repository.connected) {
				if (lang.isFunction(callback))
					callback(repository);
			} else {
				repository.logon(password, function(msg) {
					if (lang.isFunction(callback))
						callback(repository);
				});
			}
		} else {
			passwordChange = false;
			if (repository && repository.connected) {
				repository.logoff();
			}

			repository = Desktop.getRepository(repositoryId);
			if (!repository) {
				Desktop.addMessage(Message.createErrorMessage("Invalid repository name."));
				return;
			}
			if (!userId) {
				Desktop.addMessage(Message.createErrorMessage("User ID is required."));
				return;
			}
			repository.userId = userId;
			repository.onChange(repository);
			repository.logon(password, function(msg) {
				if (lang.isFunction(callback))
					callback(repository);
			});
		}
	};

	return {
		setupTestEnvironemnt: function(callback) {
			if (Desktop.desktopLoaded) {
				_getRepository(callback);
			} else {
				Desktop.loadDesktop(null, function() {
					_getRepository(callback);
				});
			}
		},

		retrieveItem: function(repository, callback) {
			var itemId = dom.byId("itemId").value;
			repository.retrieveItem(itemId, function(item) {
				if (!item) {
					Desktop.addMessage(Message.createErrorMessage("Invalid Item ID."));
				} else {
					callback(item);
				}
			});
		},

		retrieveOdItems: function(repository) {
			var templateName = dom.byId("templateName").value;
			repository.retrieveSearchTemplates(function(response) {
				var st = null;
				for ( var i = 0; i < response.length; i++) {
					var _st = response[i];
					if (_st.name == templateName) {
						st = _st;
						break;
					}
				}
				if (st != null) {
					st.retrieveSearchCriteria(function(res) {
						st.search(function(resultSet) {
							var item = resultSet.getItems()[0];
							if (!item) {
								Desktop.addMessage(Message.createErrorMessage("Item is not found with the search template."));
								return;
							}
							callback(item);
						}, null, false);
					});
				}
			});
		}
	};
});
