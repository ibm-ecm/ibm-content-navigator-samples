/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"pvr/controller/converters/_Converter"
], function(declare, lang, _Converter) {

	/**
	 * @name pvr.controller.converters.SampleObjectConverter
	 * @class Extends the {@link pvr.controller.converters._Converter} class to support runtime attributes that are of type object
	 * @augments pvr.controller.converters._Converter
	 */
	var SampleObjectConverter =  declare("samplePluginDojo.SampleObjectConverter", _Converter, {
		/** @lends samplePluginDojo.SampleObjectConverter.prototype */

		/**
		 * Indicates the type of values that are supported by this converter.
		 * 
		 * @constant
		 */
		type: "object",

		/**
		 * Overloaded just return the object itself, it's not necessary to do any conversion on the object,
		 * however a converter is required by the sample controller
		 */
		parse: function(value, localized) {
			return value;
		}

	});
	lang.mixin(SampleObjectConverter, {

		/**
		 * The default {@link samplePluginDojo.SampleObjectConverter} instance.
		 * 
		 * @static
		 */
		Default: new SampleObjectConverter()

	});

	return SampleObjectConverter;

});
