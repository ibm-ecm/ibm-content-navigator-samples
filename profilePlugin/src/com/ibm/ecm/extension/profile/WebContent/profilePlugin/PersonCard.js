/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/_base/html",
		"dojo/_base/array",
		"dojo/_base/xhr",
		"dojo/request/script",
		"idx/widget/PersonCard"
	],
function(declare, dojo_lang, dojo_html, dojo_array, dojo_xhr, dojo_script, idxPersonCard) {

	/**
	 * @name profilePlugin.PersonCard
	 * @class
	 * @augments idx.widget.PersonCard
	 */
	return declare("profilePlugin.PersonCard", [ idxPersonCard ], {
		/** @lends profilePlugin.PersonCard.prototype */
	
		role: "",
		
		repository: null,
		
		profileData: null,
		
		valueCallback: null,
		
		errorCallback: null,
		
		teamEntry: null,
		
		_setQueryAttr: function(query) {
			this.query = query;
			this.containerNode.innerHTML = ""; // clear content
			if (query && this.url) {
				this._load = (this._load || dojo_lang.hitch(this, this._setValueAttr));
				if (this.jsonp) {
					 dojo_script.get(this.url, {
					      jsonp: this.jsonp,
					      query: query
					    }).then(dojo_lang.hitch(this, function(data) {
					    	this._load(data);
					    }), dojo_lang.hitch(this, function(error) {
					    	if (dojo_lang.isFunction(this.errorCallback))
								this.errorCallback(error);
						}));
				} else if (this.method) {
					dojo_xhr(this.method, {url: this.url, content: query, load: this._load, 
						 error: dojo_lang.hitch(this, function(error) {
							if (dojo_lang.isFunction(this.errorCallback))
								this.errorCallback(error);
						 })},
						this.method.toUpperCase() == "POST");
				}
			}
		},
		
		_setValueAttr: function(value) {
			if (dojo_lang.isFunction(this.valueCallback)) {
				this.valueCallback(value);
			}
			
			this.value = value;
			this.containerNode.innerHTML = ""; // clear content
			if (value && this.spec) {
				dojo_array.forEach(this.spec, function(prop) {
					this.render(prop, value);
				}, this);
			}
		},
		
		/**
		 * Renders a property.
		 * 
		 * @param {String} prop
		 *  Property name.
		 * @param {Object} value
		 *  Object containing properties.
		 */
		render: function(prop, value) {
			var type = prop.split(".")[0];
			var className = this.baseClass + type.charAt(0).toUpperCase() + type.substring(1);
			
			if (prop == "role") {
				dojo_html.create("div", {"class": className, innerHTML: this.role}, this.containerNode);
			} else if (prop == "photo") {
				var alt = (dojo_lang.getObject("fn", false, value) || "");
				value = dojo_lang.getObject(prop, false, value);
				
				if (this.teamEntry && (value.indexOf("NoPhoto") > -1)) {
					var blankImg = require.toUrl("dojo/resources/blank.gif");
					if (this.teamEntry.isInstanceOf && this.teamEntry.isInstanceOf(ecm.model.User)) {
						className += " entryUser";
					} else {
						className += " entryGroup";
					}
					dojo_html.create("img", {src: blankImg, "class": className, title: alt, alt: alt}, this.containerNode);
				} else {
					dojo_html.create("img", {src: value, "class": className, alt: alt}, this.containerNode);
				}
			} else if (prop == "email.internet") {
				value = dojo_lang.getObject(prop, false, value);
				dojo_html.create("a", {href: "mailto:" + value, innerHTML: value},
					dojo_html.create("div", {"class": className}, this.containerNode));
			} else if (prop == "sametime.awareness") {
				var emailAddr = dojo_lang.getObject("email.internet", false, value);
				if (!emailAddr)
					emailAddr = this.placeHolder;
					
				if (window["sametime_loadAwareness"]) {
					value = dojo_lang.getObject("email.internet", false, value);
					dojo_html.create("span", {userId: value, "class": "awareness", innerHTML: "&nbsp;"},
						dojo_html.create("div", {"class": className}, this.containerNode));
				} else {
					dojo_html.create("div", {"class": className, innerHTML: emailAddr}, this.containerNode);
				}
				var shortName = emailAddr;
				if (emailAddr.indexOf("@") > 0) {
				shortName = emailAddr.substring(0, emailAddr.indexOf("@"));
				}
				if (profilePlugin.isSametimeAvailable()) {
					var t = dojo_html.create("div", {"class": className, innerHTML: shortName}, this.containerNode);
					var shouldUseShortName = profilePlugin.shouldUseShortName();
					profilePlugin.Sametime.createLiveName(shortName, t, this.repository, shouldUseShortName);
				}
			} else {
				value = dojo_lang.getObject(prop, false, value);
				if (!value) return;
				if (type == "adr") {
					var adr = (value.locality || "");
					if (value.region) {
						if (adr) {
							adr += ", ";
						}
						adr += value.region;
					}
					value = adr + " " + (value.country_name || "");
				} else if (type == "fn") {
					//rearrange first and last name
					var last = value.substring(0, value.indexOf(","));
					var first = value.substring(value.indexOf(",")+1);
					value = first + " " + last;
					value = value.replace(/^\s*/, '').replace(/\s*$/, '');//trim leading and trailing spaces
				}
				
				dojo_html.create("div", {innerHTML: value, "class": className}, this.containerNode);
			}
		}
	});
});
