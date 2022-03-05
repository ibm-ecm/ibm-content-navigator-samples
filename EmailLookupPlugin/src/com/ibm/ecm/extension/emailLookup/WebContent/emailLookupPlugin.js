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
        "dojo/on",
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
], function(aspect, dom, domConstruct, domClass, declare, lang, array, JSON, on, parser, MemoryStore, JsonRest, keys, string, win, QueryResults, ComboBox, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, MessagesMixin, LoggerMixin, EmailDialog, Desktop, User, Request, ValidationTextBox) {

    /**
     * @private An input for users to share with.
     */
    var _UserListInput = declare("_UserListInput", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, MessagesMixin, LoggerMixin ], {
        /** @lends _UserListInput.prototype */

        /**
         * Maximum number of matching users to display in the dropdown.
         */
        _MAX_ROWS: 5,

        _NO_USER_FOUND: "No Users Found",

        _NO_RESULTS_MSG: "No Results Were Found.",

        /**
         * Minimum elapsed time (ms) in between keystrokes before querying for users.
         */
        _INTERVAL_LOOKUP: 500,

        templateString: '<div><div data-dojo-type="ecm/widget/CompositeButtonListPane" data-dojo-attach-point="list"></div></div>',

        widgetsInTemplate: true,

        _notEmailCharacters: /[^a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\-@.\"\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]+/g,

        postCreate: function() {
            this.inherited(arguments);

            this._searchResultsCache = {};
            this.store = new MemoryStore({
                data: [],
                idProperty: "id"
            });

            this.input = new ComboBox({
                id: this.id + '_input',
                trim: true,
                propercase: false,
                pattern: EmailDialog.emailAddressPattern,
                invalidMessage: this.messages.email_address_invalid,
                onKeyUp: lang.hitch(this, "_onInputKeyUp"),
                onBlur: lang.hitch(this, "_onInputBlur"),
                onChange: lang.hitch(this, "_onInputChange"),
                onFocus: lang.hitch(this, "_onInputFocus"),
                isValid: function() {
                    var value = this.get("value");
                    if(this.dropDown && value ) {
                        var user = array.filter(this.dropDown.items, "return item.name == this", value).shift();
                        if (user) {
                            return user.email && user.email.match(EmailDialog.emailAddressPattern);
                        }
                    }
                    return ComboBox.prototype.isValid.apply(this, arguments);
                },
                store: this.store,
                required:false,
                pageSize: this._MAX_ROWS,
                autoComplete:false,
                autoWidth: true,
                labelType:'html',
                labelFunc:this.labelFunc,
            }).placeAt(this.list._itemsNode);
            //Hide the combobox dropdown arrow
            domClass.add(this.input._buttonNode, "dijitHidden");

            this.input.startup();

            this.own(on(this.input.textbox, "paste", lang.hitch(this, function(event) {
                var text = (event.clipboardData || window.clipboardData).getData('text');
                var emailList = this._parseText(text);
                if (emailList.length) {
                    array.forEach(emailList, "this.list.addItem({ id: item, displayName: item, email: item });", this);
                    event.preventDefault();
                }
            })));

            this.own(aspect.after(this.list, "onItemRemoved", lang.hitch(this, function() {
                this.onChange();
            })));

            this.own(aspect.after(this.list, "onItemAdded", lang.hitch(this, function() {
                this.input.placeAt(this.list._itemsNode);
                setTimeout(lang.hitch(this, function(){
                    this.input.focus();
                    win.scrollIntoView(this.input.domNode);
                    this.onChange();
                }));
            })));

        },

        _onInputKeyUp: function(evt) {
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
                if (this.input.dropDown && this.input.dropDown.selected != null && this.input.item && this.input.item.maxResultsTooltip) {
                    var userDiv = dojo.byId(this.input.item.value);
                    if (userDiv && userDiv.firstChild && userDiv.firstChild.innerHTML) {
                        dijit.showTooltip(userDiv.firstChild.innerHTML, userDiv);
                        this.userTooltip = userDiv;
                    }
                }
            }), 1000);

            // Handle special keys.
            if (evt) {
                if (evt.keyCode == keys.ESCAPE || evt.keyCode == keys.UP_ARROW || evt.keyCode == keys.DOWN_ARROW ||
                            evt.keyCode == keys.LEFT_ARROW || evt.keyCode == keys.RIGHT_ARROW || evt.keyCode == keys.PAGE_DOWN ||
                            evt.keyCode == keys.PAGE_UP) {
                    return;
                } else if (evt.keyCode == keys.ENTER) {
                    if (this.input.isValid()) {
                        this._addInputToList();
                        return;
                    } else {
                        this.input.validate(); // shows the error
                    }
                } else if (this._isSeparator(evt.key)) { // We must check for space again.
                    this._addInputToList();
                }
            }

            if (!this._processing) {
                if (this._lastInput.length == 0) {
                    this._cleanupDropDown();
                } else {
                    // If the current string is more specific than the one we issued the last query for and we have all the results, we don't need to do anything.
                    var useCurrent = false;
                    if ((this._lastQueryString && this._lastInputLowerCase.indexOf(this._lastQueryString.toLowerCase()) == 0) && this.input.dropDown.items && this.input.dropDown.items.length > 0) {
                        var cachedResult = this._searchResultsCache[this._lastQueryString];
                        if (cachedResult && !cachedResult.maxResultsReached) {
                            // The user may have typed something that doesn't match any values in the current list. See if we have at least one match.
                            for (var index in this.input.dropDown.items) {
                                var item = this.input.dropDown.items[index];
                                if (item && item.name && (item.name.toLowerCase().indexOf(this._lastInputLowerCase) == 0)) {
                                    handledFromCache = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (!useCurrent) {
                        // Get users that matches what the user typed when they pause.
                        this._queryTimeout = setTimeout(lang.hitch(this, function() {
                            this._cleanupDropDown();
                            this._getUsers();
                        }), this._INTERVAL_LOOKUP);
                    }
                }
            }

        },

        /**
         * Display an error if the user has entered text for a user but not selected a valid one.
         */
        _onInputBlur: function(evt) {
             if (this.input.value && this.input.value.length > 0) {
                // cancel pending query
                if (this._queryTimeout) {
                    clearTimeout(this._queryTimeout);
                }
                // cancel store initialization timeout
                if (this._initializationTimeout) {
                    clearTimeout(this._initializationTimeout);
                }

                if (this.input.isValid())
                    this._addInputToList();
                else
                    this.input.validate(); // shows the error
             }
        },

        /**
         * Opens the user lookup dropdown when the user clicks on the text area of the combo box.
         */
        _onInputFocus: function(evt){
            // If the dropdown was closed because it lost focus, re-open it when the user selects the input field
            if (this.store.data.length > 0){
                this.input.openDropDown();
            }
        },

        /**
        * Adds the user selected in the dropdown to the list of valid users.
        */
        _onInputChange: function() {
            // Add the selected item in the dropdown to the list.
            if (this.input.item) {
                if (this.input.item.value == this._NO_RESULTS_MSG) {
                    this.input.set("value", this._lastQueryString);
                    this.input.openDropDown();
                } else {
                    this._addInputToList();
                }
            }
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
         * Displays a set of users in the dropdown.
         */
        _displayResults: function(searchResults, maxResultsReached, startIndex) {
            var searchResultsLength = searchResults != null ? searchResults.length : 0;

            try {
                // If the store hasn't been cleared, do it now for a new query.
                if (this.input.store.data.length) {
                    this._cleanupDropDown();
                }

                // add new items to store
                for (var i = 0; i < searchResultsLength; i++) {
                    var user = searchResults[i];
                    var item = {
                        "id": user.userId,
                        "name": user.email ? user.name + " (" + user.email + ")" : user.name,
                        "email": user.email,
                        "query": this._lastQueryString,
                    };
                    this.input.store.add(item);
                }

                if (this.input.store.data.length == 0) {
                    // If there are no results, create an item that will display a message in the dropdown.
                    this.input.store.add({
                        "id": this._NO_RESULTS_MSG,
                        "value": this._NO_RESULTS_MSG,
                        "name": "<i>" + this._NO_USER_FOUND + "</i>"
                    });
                    if (this.input.focused) {
                        this.input.toggleDropDown();
                    }
                } else {
                    this._initializationTimeout = setTimeout(lang.hitch(this, function() {
                        if (this.input.focused) {
                            this.input.toggleDropDown();
                        }
                    }));
                }
            } finally {
                this._processing = false;
            }
        },

        /**
         * Checks to see if a user has been added to the list.
         */
        _isUserAdded: function(userId) {
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
        _cleanupDropDown:function() {
            // close dropdown
            this.input.closeDropDown();

            // remove all items from store
            var items = new Array();
            for (var i = 0; i < this.input.store.data.length; i++) {
                items[items.length] = this.input.store.data[i];
            }
            for (var i = 0; i < items.length; i++) {
                this.input.store.remove(items[i].id);
                if (dojo.byId(items[i].id)) {
                    dojo.destroy(items[i].id);
                }
            }
        },

        _addInputToList: function() {
            var email = "";
            var value = this.input.get("value");
            var emailAdded = false;
            if(this.input && this.input.dropDown) {
                var user = array.filter(this.input.dropDown.items, "return item.name == this", value).shift();
                if (user && user.email && user.email.match(EmailDialog.emailAddressPattern)) {
                    this.list.addItem({ id: user.id, displayName: user.name, email: user.email});
                    this.input.set("value", "");
                    emailAdded = true;
                }
            }

            if (!emailAdded) {
                if (email = value.match(EmailDialog.emailAddressPattern)) {
                    this.list.addItem({ id: email[0], displayName: email[0], email: email[0] });
                    this.input.set("value", "");
                } else {
                    this.input.validate(); // shows the error
                }
            }
        },

        _parseText: function(text) {
            var preProcessedValues = [], values = [], value = "";
            preProcessedValues = text.split(this._notEmailCharacters);
            array.forEach(text.split(this._notEmailCharacters), function(email) {
                if(value = email.match(EmailDialog.emailAddressPattern))
                    values.push(value[0]);
            });
            return values;
        },

        /**
         * Gets a set of users to display in the dropdown based on what the user typed.
         */
        _getUsers: function(){
            var numberNeeded = this._MAX_ROWS + 1 + this.list.getItems().length;

            // Before we issue the query, see if we have the results already in cache.
            var usedCache = false;
            var queryString = this._lastInput.trim();
            if (this._searchResultsCache[queryString]){
                var cachedResult = this._searchResultsCache[queryString];

                if (cachedResult.searchResults.length >= numberNeeded){
                    this._lastQueryString = queryString;
                    this._displayResults(cachedResult.searchResults, cachedResult.maxResultsReached);
                    usedCache = true;
                }
            }
            if (!usedCache){

                // Use one more than the max to see if we have more users past the first page.
                this._queryForResults(numberNeeded, 0, queryString);
            }
        },

        /**
         * Queries for a set of users to display in the dropdown.
         */
        _queryForResults: function(maxRows, startIndex, queryString){
            var isBackgroundRequest = true;

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
                            _this._queryForResultsComplete(queryString, startIndex, users);
                        }
                    },
                    backgroundRequest : false,
                    requestFailedCallback: function(errorResponse) {
                        // ignore handline failures
                    }
                });

                this._lastQueryString = queryString;

                // clear store to remove existing data if this is a new query

            } catch (e) {
                this._processing = false;
                throw e;
            }
        },

        /**
         * Callback for user query, checks to see if the text entered by the user has changed since the query was issued.
         */
        _queryForResultsComplete: function(queryText, startIndex, response) {
            var maxResultsReached = response.length > this._MAX_ROWS ? true : false;

            // Cache the results.
            var result = {
                searchResults: response,
                maxResultsReached: maxResultsReached
            };
            this._searchResultsCache[queryText] = result;
            // If the user entered more characters since we issued the query and the last query returned the maximum, we need to get new results.
            if ( (maxResultsReached && (this._lastInputLowerCase.indexOf(queryText.toLowerCase()) == 0)&& this._lastInput.length > queryText.length)) {
                this._getUsers();
            } else if ( !this._lastInputLowerCase.indexOf(queryText.toLowerCase()) == 0) {
                // The user has changed the input and the query returned is no longer valid.
                this._getUsers();
            } else {
                this._lastQueryString = queryText;
                this._displayResults(response, maxResultsReached, startIndex);
            }
        },

        _isSeparator: function(c) {
            return c == " " || c == ";" || c == ",";
        },

        _getValueAttr: function() {
            return array.map(this.list.getItems(), "return item.email;");
        },

        _setValueAttr: function(values) {
            this.list.removeAllItems();
            array.forEach(values, function(value) {
                if (value.match(EmailDialog.emailAddressPattern)) {
                    this.list.addItem({
                        id: value,
                        displayName: value,
                        email: value
                    });
                }
            }, this);
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
            onChange: lang.hitch(this, "updateSendButtonState")
        }).placeAt(domNode);
        input.startup();
        return input;
    }

});
