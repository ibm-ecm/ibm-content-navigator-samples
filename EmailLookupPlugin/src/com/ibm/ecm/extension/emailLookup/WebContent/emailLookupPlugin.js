/*
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/aspect",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/json",
        "dojo/parser",
        "dojo/store/Memory",
        "dojo/store/JsonRest",
        "dojo/keys",
        "dojo/string",
        "dojo/window",
        "dojo/store/util/QueryResults",
        "dijit/form/ComboBox",
        "dijit/_TemplatedMixin",
	    "dijit/_WidgetBase",
	    "dijit/_WidgetsInTemplateMixin",
        "ecm/MessagesMixin",
	    "ecm/LoggerMixin",
        "ecm/widget/dialog/EmailDialog",
        "ecm/model/Desktop",
        "ecm/model/User",
        "ecm/model/Request",
        "ecm/widget/ValidationTextBox"
], function(aspect, dom, domConstruct, domClass, declare, lang, array, JSON, parser, MemoryStore, JsonRest, keys, string, win, QueryResults, ComboBox, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, MessagesMixin, LoggerMixin, EmailDialog, Desktop, User, Request, ValidationTextBox) {

    /**
     * @private An input for users to share with.
     */
    var _UserListInput = declare("_UserListInput", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, MessagesMixin, LoggerMixin ], {
        /** @lends _UserListInput.prototype */

        /**
         * Maximum number of matching users to display in the dropdown.
         */
        _MAX_ROWS: 5,

        _NO_RESULTS_MSG: "No Users Found",

        _SELECT_USER_ERROR: "You must select a valid user",

        /**
         * Minimum elapsed time (ms) in between keystrokes before querying for users.
         */
        _INTERVAL_LOOKUP: 500,

        _NO_RESULTS_ID: "NO_RESULTS",

        templateString: '<div><div data-dojo-type="ecm/widget/CompositeButtonListPane" data-dojo-attach-point="list"></div></div>',

        widgetsInTemplate: true,

        postCreate: function() {
            this.inherited(arguments);

            this._searchResultsCache = {
            };

            this.store = new MemoryStore({
                data: [],
                idProperty: "id"
            });

            this.input = new ComboBox({
                id: this.id + '_input',
                onKeyUp: lang.hitch(this, "onInputChange"),
                onChange: lang.hitch(this, "onInputSelect"),
                onFocus: lang.hitch(this, "onInputFocus"),
                onBlur: lang.hitch(this, "onInputBlur"),
                store: this.store,
                required:false,
                trim:true,
                propercase:false,
                pageSize: this._MAX_ROWS,
                autoComplete:false,
                autoWidth: true,
                labelType:'html',
                labelFunc:this.labelFunc,
            }).placeAt(this.list._itemsNode, "last");
            domClass.add(this.input._buttonNode, "dijitHidden");
            this.input.startup();

            this.own(aspect.after(this.list, "onItemRemoved", lang.hitch(this, this.onChange)));

            this.own(aspect.around(this.store, "query", lang.hitch(this, function(originalQuery){
                return lang.hitch(this, function() {
                    var usersLength = this.list.getItems().length;
                    var options = arguments[1];

                    // When options.start == 0 is handled in getUsers
                    if (options.start > 0) {
                        this._processing = true;
                        var numberNeeded = options.start + this._MAX_ROWS + 1 + usersLength;
                        if (numberNeeded > this.store.data.length){
                            var deferred = new Deferred();
                            deferred.total = new Deferred();
                            var queryResults = new QueryResults(deferred);

                            // Get the next page of results.
                            this.queryForResults(numberNeeded, options.start, this._lastQueryString, deferred);

                            return queryResults;
                        }
                        else {
                            return (originalQuery.apply(this.store, arguments));
                        }
                    }
                    else {
                        return (originalQuery.apply(this.store, arguments));
                    }
                });
            })))
        },

        /**
         * Adds formatting to users displayed in the user lookup dropdown.
         */
        labelFunc: function(item, store){
            var listItem = new Array();

            listItem.push("<div id='" + item.value + "' ");

            // Highlight the text that matches the query.
            if (item.query){
                listItem.push(">");
                listItem.push(this.doHighlight(item.name, item.query));
            }
            else {

                // the "No Results" item.
                listItem.push(">");
                listItem.push(item.name);
            }
            listItem.push("</div>");

            return listItem.join("");
        },

        /**
         * Opens the user lookup dropdown when the user clicks on the text area of the combo box.
         */
        onInputFocus: function(evt){
            // If the dropdown was closed because it lost focus, re-open it when the user selects the input field
            if (this.store.data.length > 0){
                this.input.openDropDown();
            }
        },

        /**
         * Display an error if the user has entered text for a user but not selected a valid one.
         */
        onInputBlur: function(evt){
            if (this.input.value && this.input.value.length > 0) {
                // cancel pending query
                if (this._queryTimeout) {
                    clearTimeout(this._queryTimeout);
                }
                // cancel store initialization timeout
                if (this._initializationTimeout) {
                    clearTimeout(this._initializationTimeout);
                }

                if (!this.isUserAdded(this.input.value) && this.isTrueEmail(this.input.value)) {
                    // this is an e-mail address
                    var user = {
                        "id": this.input.value,
                        "name": this.input.value,
                        "query": this.input.value
                    };

                    this.input.list.addItem({ id: user.id, displayName: user.name, email: user.email, user: user })
                    this.placeAt(this.list._itemsNode, "last");
                    this._lastQueryString = null;
                    this.cleanupDropDown();
                    this.input.set("value", "");
                    this.onChange();
                } else {
                    this.displayResults(null, null, false);
                }
            }
        },

        /**
         * Adds the user selected in the dropdown to the list of valid users.
         */
        onInputSelect:function(evt){
            // Add the selected item in the dropdown to the list.
            if (this.input.item){
                if (this.input.item.value == this._NO_RESULTS_ID || this.input.item.value == this._SELECT_USER_ERROR){
                    this.input.set("value", this._lastQueryString);
                    this.input.openDropDown();
                }
                else {
                    this.addInputToList(this.input.item);
                }
            }
        },

        /**
         * Called when the user types into the user lookup combo box.
         */
        onInputChange: function(evt) {
            var methodName = "onInputChange";

            // keep track of last search criteria
            this._lastInput = this.input.get("value").trim();
            this._lastInputLowerCase = this._lastInput.toLowerCase();

            // hide tooltip if necessary
            if (this.userTooltip) {
                dijit.hideTooltip(this.userTooltip);
                this.userTooltip = null;
            }

            // Cancel pending query
            if (this._queryTimeout) {
                clearTimeout(this._queryTimeout);
            }

            // show tooltip when navigating up and down in the email dropdown
            if (this._tooltipTimeout) {
                clearTimeout(this._tooltipTimeout);
            }
            this._tooltipTimeout = setTimeout(lang.hitch(this, function() {
                if (this.input.dropDown.selected != null && this.input.item && this.input.item.maxResultsTooltip) {
                    var userDiv = dojo.byId(this.input.item.value);
                    if (userDiv && userDiv.firstChild && userDiv.firstChild.innerHTML) {
                        dijit.showTooltip(userDiv.firstChild.innerHTML, userDiv);
                        this.userTooltip = userDiv;
                    }
                }
            }), 1000);

            // Handle special keys.
            if (evt){
                if (evt.keyCode == keys.ESCAPE || evt.keyCode == keys.UP_ARROW || evt.keyCode == keys.DOWN_ARROW ||
                         evt.keyCode == keys.LEFT_ARROW || evt.keyCode == keys.RIGHT_ARROW || evt.keyCode == keys.PAGE_DOWN ||
                         evt.keyCode == keys.PAGE_UP) {
                    return;
                }
                else if (evt.keyCode == keys.ENTER || evt.keyCode == 188 /* comma */){

                    if (this.store.data.length > 0 && this.input.dropDown.items.length > 0){

                        // If the dropdown is open, add the first user in the dropdown to the list if there are users in the store.
                        if (!this._processing && this.input.dropDown.items[0].value != this._NO_RESULTS_ID){
                            var user = this.input.dropDown.items[0];
                            this.addInputToList(user);
                            this.cleanupDropDown();
                        }
                        else if (this.input.value && this.input.value.length > 0 && evt.keyCode == keys.ENTER){
                            this.input.openDropDown();
                        }
                        return;
                    }
                }
            }

            if (!this._processing){
                if (this._lastInput.length == 0){
                    this.cleanupDropDown();
                }
                else {
                    // If the current string is more specific than the one we issued the last query for and we have all the results, we don't need to do anything.
                    var useCurrent = false;

                    if ((this._lastQueryString && this._lastInputLowerCase.indexOf(this._lastQueryString.toLowerCase()) == 0) && this.input.dropDown.items && this.input.dropDown.items.length > 0){
                        var cachedResult = this._searchResultsCache[this._lastQueryString];
                        if (!cachedResult.maxResultsReached) {
                            // The user may have typed something that doesn't match any values in the current list. See if we have at least one match.
                            var foundMatch = false;
                            for (var index in this.input.dropDown.items){
                                var item = this.input.dropDown.items[index];
                                if (item && item.name && (item.name.toLowerCase().indexOf(this._lastInputLowerCase) == 0)){
                                    handledFromCache = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (!useCurrent) {
                        // Get users that matches what the user typed when they pause.
                        this._queryTimeout = setTimeout(lang.hitch(this, function() {
                            this.cleanupDropDown();
                            this.getUsers();
                        }), this._INTERVAL_LOOKUP);
                    }
                }
            }
        },

        /**
         * Gets a set of users to display in the dropdown based on what the user typed.
         */
        getUsers: function(){
            var numberNeeded = this._MAX_ROWS + 1 + this.list.getItems().length;

            // Before we issue the query, see if we have the results already in cache.
            var usedCache = false;
            var queryString = this._lastInput.trim();
            if (this._searchResultsCache[queryString]){
                var cachedResult = this._searchResultsCache[queryString];

                if (cachedResult.searchResults.length >= numberNeeded){
                    this._lastQueryString = queryString;
                    this.displayResults(cachedResult.searchResults, cachedResult.maxResultsReached, false);
                    usedCache = true;
                }
            }
            if (!usedCache){

                // Use one more than the max to see if we have more users past the first page.
                this.queryForResults(numberNeeded, 0, queryString, false);
            }
        },

        /**
         * Queries for a set of users to display in the dropdown.
         */
        queryForResults: function(maxRows, startIndex, queryString, nextPageDeferred){
            var isBackgroundRequest = true;
            if (nextPageDeferred){
                isBackgroundRequest = false;
            }

            // start processing
            this._processing = true;
            try {
                var _this = this;
                var users;
                //write request to service or data source
                Request.invokePluginService("EmailLookupPlugin", "EmailLookupPluginService", {
                    requestParams: {
                        query : queryString
                    },
                    requestCompleteCallback: function(response) {
                        if (response && response.userList)
                        {
                            users = response.userList
                            _this.queryForResultsComplete(queryString, startIndex, nextPageDeferred, users);
                        }
                    },
                    backgroundRequest : false,
                    requestFailedCallback: function(errorResponse) {
                        // ignore handline failures
                    }
                });

                this._lastQueryString = queryString;

                // clear store to remove existing data if this is a new query
                if (!nextPageDeferred){
                    this.cleanupDropDown();
                }
            } catch (e) {
                this._processing = false;
                throw e;
            }
        },

        /**
         * Callback for user query, checks to see if the text entered by the user has changed since the query was issued.
         */
        queryForResultsComplete: function(queryText, startIndex, nextPageDeferred, response) {
            var maxResultsReached = response.length > this._MAX_ROWS ? true : false;

            // Cache the results.
            var result = {
                searchResults: response,
                maxResultsReached: maxResultsReached
            };
            this._searchResultsCache[queryText] = result;

            // If the user entered more characters since we issued the query and the last query returned the maximum, we need to get new results.
            if (!nextPageDeferred && (maxResultsReached && (this._lastInputLowerCase.indexOf(queryText.toLowerCase()) == 0)&& this._lastInput.length > queryText.length)){
                this.getUsers();
            }
            else if (!nextPageDeferred && !this._lastInputLowerCase.indexOf(queryText.toLowerCase()) == 0){

                // The user has changed the input and the query returned is no longer valid.
                this.getUsers();
            }
            else{
                this._lastQueryString = queryText;
                this.displayResults(response, maxResultsReached, startIndex, nextPageDeferred);
            }
        },

        /**
         * Displays a set of users in the dropdown.
         */
        displayResults: function(searchResults, maxResultsReached, startIndex, nextPageDeferred) {
            var searchResultsLength = searchResults != null ? searchResults.length : 0;

            try {
                // If the store hasn't been cleared, do it now for a new query.
                if (this.store.data.length != 0 && searchResultsLength <= this._MAX_ROWS && !nextPageDeferred){
                    this.cleanupDropDown();
                }

                // add new items to store
                var newResults = [];
                var numberOfUsersFound = 0;
                for (var i = 0; i < searchResultsLength; i++) {
                    var user = searchResults[i];

                    // If a user name or email contains extended characters, don't attempt to compare to the user input.
                    var alphaNumPattern = /^[a-zA-Z0-9]*$/;

                    var foundUser = this.isUserAdded(user.userId);
                    if (foundUser){
                        numberOfUsersFound++;
                    }
                    else if (nextPageDeferred || (!alphaNumPattern.test(user.name) || user.name.toLowerCase().indexOf(this._lastInputLowerCase) > -1) || (!alphaNumPattern.test(user.email) || user.email.toLowerCase().indexOf(this._lastInputLowerCase) > -1)) {
                        var item = {
                                "id": user.userId,
                                "name": user.email ? user.name + " (" + user.email + ")" : user.name,
                                "email": user.email,
                                "query": this._lastQueryString,
                        };

                        // Add users to the array that will be based to the combo box control when paging.
                        if (nextPageDeferred && (i >= startIndex + numberOfUsersFound) && (newResults.length < this._MAX_ROWS)){
                            newResults.push(item);
                        }

                        // Skip over results that are already in the store.
                        var itemInStore = this.store.get(item.id);
                        if (itemInStore){
                            continue;
                        }
                        this.store.add(item);
                    }
                }
                newResults.total = this.store.data.length;

                if (this.store.data.length == 1 && this.store.data[0].name.toLowerCase() == this._lastInputLowerCase){

                    // If there is a single user and it matches the user input, add to the list without opening the dropdown.
                    this.addInputToList(this.store.data[0]);
                }
                else {

                    if (this.store.data.length == 0 && numberOfUsersFound == 0 && this._lastQueryString && this.isTrueEmail(this._lastQueryString)) {
                        // this is an e-mail address of a non-provisioned user
                        this.store.add({
                            "id": this._lastQueryString,
                            "name": this._lastQueryString,
                        });
                        
                    } else if (this.store.data.length == 0 && searchResults == null) {
                    // If there are no results, create an item that will display a message in the dropdown.
                        this.store.add({
                            "id": this._SELECT_USER_ERROR,
                            "value": this._SELECT_USER_ERROR,
                            "name": "<i>" + this._SELECT_USER_ERROR + "</i>"
                        });
                        this._initializationTimeout = setTimeout(lang.hitch(this, function() {
                            if (!this.input.focused) {
                                this.input.toggleDropDown();
                            }
                        }));
                    }
                      else if (this.store.data.length == 0){
                        // If there are no results, create an item that will display a message in the dropdown.
                            this.store.add({
                                "id": this._NO_RESULTS_ID,
                                "value": this._NO_RESULTS_ID,
                                "name": "<i>" + this._NO_RESULTS_MSG + "</i>"
                            });
                    }

                    // Open the dropdown. Need to timeout so the store is initialized.
                    if (nextPageDeferred){
                        try{
                            nextPageDeferred.total.resolve(this.store.data.length);
                            nextPageDeferred.resolve(newResults);
                        }
                        catch (ex) {

                            // If resolving the deferred fails (because they closed the dropdown), reset the input field.
                            this.input.set("value", "");
                            this.cleanupDropDown();
                        }
                    }
                    else {
                        this._initializationTimeout = setTimeout(lang.hitch(this, function() {
                            if (this.input.focused) {
                                this.input.toggleDropDown();
                            }
                        }));
                    }
                }
            } finally {
                this._processing = false;
            }
        },

        isTrueEmail: function(email) {
            var emailReg = /^([a-zA-Z0-9])+([a-zA-Z0-9_.+-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            return emailReg.test(email);
        },

        /**
         * Checks to see if a user has been added to the list.
         */
        isUserAdded: function(userId){
            var isAdded = false;

            var users = this.list.getItems();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == userId){
                    isAdded = true;
                    break;
                }
            }

            return isAdded;
        },

        /**
         * Clears the store and the dropdown.
         */
        cleanupDropDown:function(){
            // close dropdown
            this.input.closeDropDown();

            // remove all items from store
            var items = new Array();
            for (var i = 0; i < this.store.data.length; i++) {
                items[items.length] = this.store.data[i];
            }
            for (var i = 0; i < items.length; i++) {
                this.store.remove(items[i].id);
                if (dojo.byId(items[i].id)) {
                    dojo.destroy(items[i].id);
                }
            }
        },

        /**
         * Adds a user to the list of selected users.
         */
        addInputToList: function(user) {
            this.list.addItem({ id: user.id, displayName: user.name, email: user.email, user: user})
            this.input.placeAt(this.list._itemsNode, "last");
            this._lastQueryString = null;
            this.cleanupDropDown();
            this.input.focus();
            this.input.set("value", "");
            this.onChange();
        },

        /**
         * Checks to see if the control is valid.
         */
        isValid: function(){
            return this.input.isValid();
        },

        /**
         * Returns the users in the list
         */
        getRecipients: function(){
            return this.list.getItems();
        },

        /**
         * Put focus on the combo box when this control gets focus.
         */
        focus: function() {
            this.input.focus();
        },

        onChange: function(){
        },

        destroy: function() {
            this.inherited(arguments);

            if (this.input) {
                this.input.destroy();
                delete this.input;
            }

            if (this.list){
                this.list.destroy();
                delete this.list;
            }
        }
    });

    EmailDialog.prototype.createEmailAddressListInput = function(id, domNode) {
        var input = new _UserListInput({
            id: id,
            onChange: lang.hitch(this, "updateSendButtonState"),
            dialog: this
        }).placeAt(domNode);
        input.startup();
        return input;
    }

});
