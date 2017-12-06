(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ap-components-react"] = factory(require("prop-types"), require("react"), require("react-dom"));
	else
		root["ap-components-react"] = factory(root["PropTypes"], root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_43__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tooltip = exports.ToggleButton = exports.TextField = exports.Tabs = exports.Slider = exports.ResponsiveTable = exports.RadioGroup = exports.RadioButton = exports.Popover = exports.ProgressBarStep = exports.ProgressBar = exports.Modal = exports.Loader = exports.Icon = exports.Hyperlink = exports.Dropdown = exports.Checkbox = exports.Card = exports.Button = exports.Breadcrumb = exports.Alert = undefined;

	var _Alert2 = __webpack_require__(44);

	var _Alert3 = _interopRequireDefault(_Alert2);

	var _Breadcrumb2 = __webpack_require__(45);

	var _Breadcrumb3 = _interopRequireDefault(_Breadcrumb2);

	var _Button2 = __webpack_require__(23);

	var _Button3 = _interopRequireDefault(_Button2);

	var _Card2 = __webpack_require__(46);

	var _Card3 = _interopRequireDefault(_Card2);

	var _Checkbox2 = __webpack_require__(47);

	var _Checkbox3 = _interopRequireDefault(_Checkbox2);

	var _Dropdown2 = __webpack_require__(48);

	var _Dropdown3 = _interopRequireDefault(_Dropdown2);

	var _Hyperlink2 = __webpack_require__(50);

	var _Hyperlink3 = _interopRequireDefault(_Hyperlink2);

	var _Icon2 = __webpack_require__(6);

	var _Icon3 = _interopRequireDefault(_Icon2);

	var _Loader2 = __webpack_require__(51);

	var _Loader3 = _interopRequireDefault(_Loader2);

	var _Modal2 = __webpack_require__(52);

	var _Modal3 = _interopRequireDefault(_Modal2);

	var _ProgressBar2 = __webpack_require__(54);

	var _ProgressBar3 = _interopRequireDefault(_ProgressBar2);

	var _ProgressBarStep2 = __webpack_require__(25);

	var _ProgressBarStep3 = _interopRequireDefault(_ProgressBarStep2);

	var _Popover2 = __webpack_require__(53);

	var _Popover3 = _interopRequireDefault(_Popover2);

	var _RadioButton2 = __webpack_require__(26);

	var _RadioButton3 = _interopRequireDefault(_RadioButton2);

	var _RadioGroup2 = __webpack_require__(55);

	var _RadioGroup3 = _interopRequireDefault(_RadioGroup2);

	var _ResponsiveTable2 = __webpack_require__(56);

	var _ResponsiveTable3 = _interopRequireDefault(_ResponsiveTable2);

	var _Slider2 = __webpack_require__(57);

	var _Slider3 = _interopRequireDefault(_Slider2);

	var _Tabs2 = __webpack_require__(58);

	var _Tabs3 = _interopRequireDefault(_Tabs2);

	var _TextField2 = __webpack_require__(62);

	var _TextField3 = _interopRequireDefault(_TextField2);

	var _ToggleButton2 = __webpack_require__(63);

	var _ToggleButton3 = _interopRequireDefault(_ToggleButton2);

	var _Tooltip2 = __webpack_require__(64);

	var _Tooltip3 = _interopRequireDefault(_Tooltip2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Alert = _Alert3.default;
	exports.Breadcrumb = _Breadcrumb3.default;
	exports.Button = _Button3.default;
	exports.Card = _Card3.default;
	exports.Checkbox = _Checkbox3.default;
	exports.Dropdown = _Dropdown3.default;
	exports.Hyperlink = _Hyperlink3.default;
	exports.Icon = _Icon3.default;
	exports.Loader = _Loader3.default;
	exports.Modal = _Modal3.default;
	exports.ProgressBar = _ProgressBar3.default;
	exports.ProgressBarStep = _ProgressBarStep3.default;
	exports.Popover = _Popover3.default;
	exports.RadioButton = _RadioButton3.default;
	exports.RadioGroup = _RadioGroup3.default;
	exports.ResponsiveTable = _ResponsiveTable3.default;
	exports.Slider = _Slider3.default;
	exports.Tabs = _Tabs3.default;
	exports.TextField = _TextField3.default;
	exports.ToggleButton = _ToggleButton3.default;
	exports.Tooltip = _Tooltip3.default;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	module.exports = __webpack_require__(2);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	var slashReplaceRegex = /\//g;
	var cache = {};

	function getClassName(className) {
	  if (cache[className]) {
	    return cache[className];
	  }

	  cache[className] = className.replace(slashReplaceRegex, '_');
	  return cache[className];
	}

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  var classNamesArray;
	  if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) == 'object') {
	    classNamesArray = Object.keys(classNames).filter(function (className) {
	      return classNames[className];
	    });
	  } else {
	    classNamesArray = Array.prototype.slice.call(arguments);
	  }

	  return classNamesArray.map(getClassName).join(' ');
	}

	module.exports = cx;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ibmColors = __webpack_require__(42);

	var _ibmColors2 = _interopRequireDefault(_ibmColors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint max-len: 0 */


	var Icon = function (_React$Component) {
	  _inherits(Icon, _React$Component);

	  function Icon() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Icon);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.types = {
	      completed: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 17.9 17.9',
	          style: _this.getSize()
	        }, _this.props),
	        _react2.default.createElement('circle', { className: 'st0', cx: '9', cy: '9', r: '9' }),
	        _react2.default.createElement('polygon', { fill: 'white', points: '7.1,13.2 3.8,9.8 5.2,8.4 7.2,10.4 12.8,5.4 14.1,6.9' })
	      ),
	      active: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 17.9 17.9',
	          style: _this.getSize()
	        }, _this.props),
	        _react2.default.createElement('circle', { cx: '9', cy: '9', r: '9' }),
	        _react2.default.createElement('path', { fill: 'white', d: 'M9,14c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5c2.8,0,5,2.2,5,5S11.7,14,9,14z M9,6C7.3,6,6,7.3,6,9c0,1.7,1.3,3,3,3 s3-1.3,3-3S10.6,6,9,6z' })
	      ),
	      dot: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 17.9 17.9',
	          style: _this.getSize()
	        }, _this.props),
	        _react2.default.createElement('circle', { cx: '9', cy: '9', r: '9' })
	      ),
	      plus: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 16 16',
	          fill: _ibmColors2.default.magenta[60]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement(
	          'g',
	          null,
	          _react2.default.createElement('polygon', {
	            points: '8.6,4 7.4,4 7.4,7.4 4,7.4 4,8.6 7.4,8.6 7.4,12 8.6,12 8.6,8.6 12,8.6 12,7.4 8.6,7.4'
	          }),
	          _react2.default.createElement('path', {
	            d: 'M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,14.9c-3.8,0-6.9-3.1-6.9-6.9S4.2,1.1,8,1.1s6.9,3.1,6.9,6.9 S11.8,14.9,8,14.9z'
	          })
	        )
	      ),
	      back: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '-4.9 9.1 24 24',
	          fill: _ibmColors2.default.magenta[60]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('path', {
	          d: 'M7.1,9.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12S13.7,9.1,7.1,9.1z M7.1,31.4 c-5.7,0-10.3-4.6-10.3-10.3S1.4,10.8,7.1,10.8s10.3,4.6,10.3,10.3S12.8,31.4,7.1,31.4z'
	        }),
	        _react2.default.createElement('circle', { cx: '7.1', cy: '21.1', r: '12', fill: 'none' }),
	        _react2.default.createElement('polygon', {
	          points: '7.5,16.6 6.3,15.4 0.5,21.1 6.3,26.8 7.5,25.6 3.8,22 13.8,22 13.8,20.2 3.8,20.2 '
	        })
	      ),
	      check: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 12 9.1',
	          fill: _ibmColors2.default.green[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('polygon', { className: 'checkbox', points: '4.2,6.5 1.3,3.6 0,4.8 4.2,9.1 12,1.3 10.7,0 ' })
	      ),
	      'error-o': _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 1024 1024',
	          fill: _ibmColors2.default.red[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('path', {
	          className: 'path1',
	          d: 'M455.68 225.28v117.76l25.6 286.72h56.32l30.72-286.72v-117.76h-112.64z'
	        }),
	        _react2.default.createElement('path', {
	          className: 'path2',
	          d: 'M568.32 742.4c0 31.105-25.215 56.32-56.32 56.32s-56.32-25.215-56.32-56.32c0-31.105 25.215-56.32 56.32-56.32s56.32 25.215 56.32 56.32z'
	        }),
	        _react2.default.createElement('path', {
	          className: 'path3',
	          d: 'M512 71.68c240.64 0 440.32 199.68 440.32 440.32s-199.68 440.32-440.32 440.32-440.32-194.56-440.32-440.32 199.68-440.32 440.32-440.32zM512 0c-281.6 0-512 230.4-512 512s230.4 512 512 512 512-230.4 512-512-230.4-512-512-512z'
	        })
	      ),
	      error: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 1024 1024',
	          fill: _ibmColors2.default.red[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('path', { className: 'path1', d: 'M512 42.667c-260.267 0-469.333 209.067-469.333 469.333s209.067 469.333 469.333 469.333 469.333-209.067 469.333-469.333-209.067-469.333-469.333-469.333zM554.667 725.333h-85.333v-85.333h85.333v85.333zM554.667 426.667l-25.6 153.6h-34.133l-25.6-153.6v-170.667h85.333v170.667z' })
	      ),
	      warning: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 1024 1024',
	          fill: _ibmColors2.default.yellow[20]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement(
	          'g',
	          null,
	          _react2.default.createElement('path', { d: 'M42.667 938.667l469.333-810.667 469.333 810.667z' }),
	          _react2.default.createElement('path', { fill: '#000', className: 'text', d: 'M469.333 725.333h85.333v85.333h-85.333v-85.333z' }),
	          _react2.default.createElement('path', { fill: '#000', className: 'text', d: 'M469.333 469.333h85.333v170.667h-85.333v-170.667z' })
	        )
	      ),
	      info: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 1024 1024',
	          fill: _ibmColors2.default.blue[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement(
	          'g',
	          null,
	          _react2.default.createElement('path', { className: 'path1', d: 'M512 42.667c-260.267 0-469.333 209.067-469.333 469.333s209.067 469.333 469.333 469.333 469.333-209.067 469.333-469.333-209.067-469.333-469.333-469.333zM482.133 311.467c8.533-8.533 17.067-12.8 29.867-12.8s21.333 4.267 29.867 12.8 12.8 17.067 12.8 29.867-4.267 21.333-12.8 29.867-17.067 12.8-29.867 12.8-21.333-4.267-29.867-12.8-12.8-17.067-12.8-29.867 4.267-21.333 12.8-29.867zM597.333 725.333h-170.667v-42.667h42.667v-170.667h-42.667v-42.667h128v213.333h42.667v42.667z' })
	        )
	      ),
	      close: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 24 24',
	          fill: _ibmColors2.default.magenta[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('circle', { fill: 'none', cx: '11.9', cy: '12', r: '10' }),
	        _react2.default.createElement('path', { className: 'icon--close-x', d: 'M15.2 7.6l-3.3 3.3-3.4-3.3-1.1 1.1 3.4 3.3-3.4 3.4 1.1 1.1 3.4-3.4 3.3 3.4 1.1-1.1L13 12l3.3-3.3' }),
	        _react2.default.createElement('path', { fill: '#A6276E', d: 'M11.9 1C5.8 1 .9 6 .9 12s4.9 11 11 11 11-5 11-11-5-11-11-11zm0 20.5c-5.2 0-9.4-4.2-9.4-9.4s4.2-9.4 9.4-9.4 9.4 4.2 9.4 9.4-4.2 9.4-9.4 9.4z' })
	      ),
	      success: _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 1024 1024',
	          fill: _ibmColors2.default.green[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('path', { className: 'path1', d: 'M512 42.667c-260.267 0-469.333 209.067-469.333 469.333s209.067 469.333 469.333 469.333 469.333-209.067 469.333-469.333-209.067-469.333-469.333-469.333zM426.667 699.733l-157.867-157.867 59.733-59.733 98.133 98.133 268.8-238.933 55.467 64-324.267 294.4z' })
	      ),
	      'success-o': _react2.default.createElement(
	        'svg',
	        _extends({
	          xmlns: 'http://www.w3.org/2000/svg',
	          viewBox: '0 0 1024 1024',
	          fill: _ibmColors2.default.green[50]
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('path', {
	          className: 'path1',
	          d: 'M512 69.818c242.036 0 442.182 200.145 442.182 442.182s-200.145 442.182-442.182 442.182-442.182-200.145-442.182-442.182 200.145-442.182 442.182-442.182zM512 0c-283.927 0-512 228.073-512 512s228.073 512 512 512 512-228.073 512-512-228.073-512-512-512z'
	        }),
	        _react2.default.createElement('path', {
	          className: 'path2',
	          d: 'M698.182 297.891l-32.582 37.236-232.727 246.691-74.473-69.818-32.582-32.582-69.818 69.818 176.873 176.873 32.582-37.236 269.964-283.927 32.582-37.236-69.818-69.818z'
	        })
	      ),
	      arrow: _react2.default.createElement(
	        'svg',
	        _extends({
	          width: '13',
	          height: '8',
	          xmlns: 'http://www.w3.org/2000/svg'
	        }, _this.props, {
	          style: _this.getSize()
	        }),
	        _react2.default.createElement('path', { d: 'M11.2 7.8l-5-5-4.8 4.8L0 6.2 6.2 0l6.4 6.4' })
	      ),
	      'vertical-meatballs': _react2.default.createElement(
	        'svg',
	        {
	          xmlns: 'http://www.w3.org/2000/svg',
	          xmlnsXlink: 'http://www.w3.org/1999/xlink',
	          x: '0px',
	          y: '0px',
	          viewBox: '0 0 16 16',
	          style: { enableBackground: 'new 0 0 16 16' },
	          xmlSpace: 'preserve'
	        },
	        _react2.default.createElement(
	          'title',
	          null,
	          'Vertical Meatballs'
	        ),
	        _react2.default.createElement('path', { d: 'M9.5,2c0,0.8-0.7,1.5-1.5,1.5S6.5,2.9,6.5,2S7.2,0.5,8,0.5S9.5,1.2,9.5,2z M8,6.5C7.2,6.5,6.5,7.2,6.5,8S7.2,9.5,8,9.5S9.5,8.8,9.5,8S8.8,6.5,8,6.5z M8,12.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S8.8,12.5,8,12.5z' })
	      )
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Icon, [{
	    key: 'getSize',
	    value: function getSize() {
	      var size = this.props.size;

	      return _extends({}, this.props.style, { width: size, height: size });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.types[this.props.type];
	    }
	  }]);

	  return Icon;
	}(_react2.default.Component);

	Icon.propTypes = {
	  type: _propTypes2.default.oneOf(['completed', 'active', 'dot', 'plus', 'back', 'check', 'error', 'error-o', 'success', 'success-o', 'warning', 'info', 'close', 'arrow', 'vertical-meatballs']).isRequired,
	  style: _propTypes2.default.object,
	  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
	};
	Icon.defaultProps = {
	  className: 'icon'
	};
	exports.default = Icon;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var React = __webpack_require__(2);
	var factory = __webpack_require__(90);

	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}

	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;

	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} className
	 * @return {string}
	 */

	function joinClasses(className /*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _translateDOMPositionXY = __webpack_require__(123);

	var _translateDOMPositionXY2 = _interopRequireDefault(_translateDOMPositionXY);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function FixedDataTableTranslateDOMPosition( /*object*/style, /*number*/x, /*number*/y) {
	  var initialRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  if (initialRender) {
	    style.left = x + 'px';
	    style.top = y + 'px';
	  } else {
	    (0, _translateDOMPositionXY2.default)(style, x, y);
	  }
	} /**
	   * Copyright Schrodinger, LLC
	   * All rights reserved.
	   *
	   * This source code is licensed under the BSD-style license found in the
	   * LICENSE file in the root directory of this source tree. An additional grant
	   * of patent rights can be found in the PATENTS file in the same directory.
	   *
	   * @providesModule FixedDataTableTranslateDOMPosition
	   * @typechecks
	   */

	module.exports = FixedDataTableTranslateDOMPosition;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */

	'use strict';

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule clamp
	 * @typechecks
	 */

	/**
	 * Clamps (or clips or confines) the value to be between min and max.
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 */
	function clamp(value, min, max) {
	  if (value < min) {
	    return min;
	  }
	  if (value > max) {
	    return max;
	  }
	  return value;
	}

	module.exports = clamp;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(32)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13);
	var core = __webpack_require__(12);
	var ctx = __webpack_require__(31);
	var hide = __webpack_require__(74);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This class listens to events on the document and then updates a react
	 * component through callbacks.
	 * Please note that captureMouseMove must be called in
	 * order to initialize listeners on mousemove and mouseup.
	 * releaseMouseMove must be called to remove them. It is important to
	 * call releaseMouseMoves since mousemove is expensive to listen to.
	 *
	 * @providesModule DOMMouseMoveTracker
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _EventListener = __webpack_require__(97);

	var _EventListener2 = _interopRequireDefault(_EventListener);

	var _cancelAnimationFramePolyfill = __webpack_require__(117);

	var _cancelAnimationFramePolyfill2 = _interopRequireDefault(_cancelAnimationFramePolyfill);

	var _requestAnimationFramePolyfill = __webpack_require__(22);

	var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

	var _FixedDataTableEventHelper = __webpack_require__(20);

	var _FixedDataTableEventHelper2 = _interopRequireDefault(_FixedDataTableEventHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DOMMouseMoveTracker = function () {
	  /**
	   * onMove is the callback that will be called on every mouse move.
	   * onMoveEnd is called on mouse up when movement has ended.
	   */
	  function DOMMouseMoveTracker(
	  /*function*/onMove,
	  /*function*/onMoveEnd,
	  /*DOMElement*/domNode,
	  /*boolean*/touchEnabled) {
	    _classCallCheck(this, DOMMouseMoveTracker);

	    this._isDragging = false;
	    this._isTouchEnabled = touchEnabled;
	    this._animationFrameID = null;
	    this._domNode = domNode;
	    this._onMove = onMove;
	    this._onMoveEnd = onMoveEnd;
	    this._onMouseEnd = this._onMouseEnd.bind(this);
	    this._onMouseMove = this._onMouseMove.bind(this);
	    this._onMouseUp = this._onMouseUp.bind(this);
	    this._didMouseMove = this._didMouseMove.bind(this);
	  }

	  /**
	   * This is to set up the listeners for listening to mouse move
	   * and mouse up signaling the movement has ended. Please note that these
	   * listeners are added at the document.body level. It takes in an event
	   * in order to grab inital state.
	   */


	  _createClass(DOMMouseMoveTracker, [{
	    key: 'captureMouseMoves',
	    value: function captureMouseMoves( /*object*/event) {
	      if (!this._eventMoveToken && !this._eventUpToken && !this._eventLeaveToken && !this._eventOutToken) {
	        this._eventMoveToken = _EventListener2.default.listen(this._domNode, 'mousemove', this._onMouseMove);
	        this._eventUpToken = _EventListener2.default.listen(this._domNode, 'mouseup', this._onMouseUp);
	        this._eventLeaveToken = _EventListener2.default.listen(this._domNode, 'mouseleave', this._onMouseEnd);
	        this._eventOutToken = _EventListener2.default.listen(this._domNode, 'mouseout', this.onMouseEnd);
	      }

	      if (this._isTouchEnabled && !this._eventTouchStartToken && !this._eventTouchMoveToken && !this._eventTouchEndToken) {
	        this._eventTouchStartToken = _EventListener2.default.listen(this._domNode, 'touchstart', this._onMouseMove);
	        this._eventTouchMoveToken = _EventListener2.default.listen(this._domNode, 'touchmove', this._onMouseMove);
	        this._eventTouchEndToken = _EventListener2.default.listen(this._domNode, 'touchend', this._onMouseUp);
	      }

	      if (!this._isDragging) {
	        this._deltaX = 0;
	        this._deltaY = 0;
	        this._isDragging = true;
	        var coordinates = _FixedDataTableEventHelper2.default.getCoordinatesFromEvent(event);
	        var x = coordinates.x;
	        var y = coordinates.y;
	        this._x = x;
	        this._y = y;
	      }
	      event.preventDefault();
	    }

	    /**
	     * These releases all of the listeners on document.body.
	     */

	  }, {
	    key: 'releaseMouseMoves',
	    value: function releaseMouseMoves() {
	      if (this._eventMoveToken && this._eventUpToken && this._eventLeaveToken && this._eventOutToken) {
	        this._eventMoveToken.remove();
	        this._eventMoveToken = null;
	        this._eventUpToken.remove();
	        this._eventUpToken = null;
	        this._eventLeaveToken.remove();
	        this._eventLeaveToken = null;
	        this._eventOutToken.remove();
	        this._eventOutToken = null;
	      }

	      if (this._isTouchEnabled && this._eventTouchStartToken && this._eventTouchMoveToken && this._eventTouchEndToken) {
	        this._eventTouchStartToken.remove();
	        this._eventTouchStartToken = null;
	        this._eventTouchMoveToken.remove();
	        this._eventTouchMoveToken = null;
	        this._eventTouchEndToken.remove();
	        this._eventTouchEndToken = null;
	      }

	      if (this._animationFrameID !== null) {
	        (0, _cancelAnimationFramePolyfill2.default)(this._animationFrameID);
	        this._animationFrameID = null;
	      }

	      if (this._isDragging) {
	        this._isDragging = false;
	        this._x = null;
	        this._y = null;
	      }
	    }

	    /**
	     * Returns whether or not if the mouse movement is being tracked.
	     */

	  }, {
	    key: 'isDragging',
	    value: function isDragging() /*boolean*/{
	      return this._isDragging;
	    }

	    /**
	     * Calls onMove passed into constructor and updates internal state.
	     */

	  }, {
	    key: '_onMouseMove',
	    value: function _onMouseMove( /*object*/event) {
	      var coordinates = _FixedDataTableEventHelper2.default.getCoordinatesFromEvent(event);
	      var x = coordinates.x;
	      var y = coordinates.y;

	      this._deltaX += x - this._x;
	      this._deltaY += y - this._y;

	      if (this._animationFrameID === null) {
	        // The mouse may move faster then the animation frame does.
	        // Use `requestAnimationFramePolyfill` to avoid over-updating.
	        this._animationFrameID = (0, _requestAnimationFramePolyfill2.default)(this._didMouseMove);
	      }

	      this._x = x;
	      this._y = y;
	      event.preventDefault();
	    }
	  }, {
	    key: '_didMouseMove',
	    value: function _didMouseMove() {
	      this._animationFrameID = null;
	      this._onMove(this._deltaX, this._deltaY);
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }

	    /**
	     * Calls onMoveEnd passed into constructor and updates internal state.
	     */

	  }, {
	    key: '_onMouseUp',
	    value: function _onMouseUp() {
	      if (this._animationFrameID) {
	        this._didMouseMove();
	      }
	      this._onMoveEnd(false);
	    }

	    /**
	     * Calls onMoveEnd passed into the constructor, updates internal state, and cancels the move.
	     */

	  }, {
	    key: '_onMouseEnd',
	    value: function _onMouseEnd() {
	      this._onMoveEnd(true);
	    }
	  }]);

	  return DOMMouseMoveTracker;
	}();

	module.exports = DOMMouseMoveTracker;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableEventHelper
	 * @typechecks
	 */

	'use strict';

	/**
	 * Gets the horizontal and vertical coordinates from a mouse or touch event.
	 */

	function getCoordinatesFromEvent( /*object*/event) /*object*/{
	    var x = 0;
	    var y = 0;

	    if (!event.clientX || !event.clientY) {
	        if (event.touches && event.touches.length > 0) {
	            var touch = event.touches[0];
	            x = touch.clientX;
	            y = touch.clientY;
	        }
	    } else {
	        x = event.clientX;
	        y = event.clientY;
	    }

	    return { x: x, y: y };
	}

	var FixedDataTableEventHelper = {
	    getCoordinatesFromEvent: getCoordinatesFromEvent
	};

	module.exports = FixedDataTableEventHelper;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Locale
	 */

	"use strict";

	// Hard code this for now.

	var Locale = {
	  isRTL: function isRTL() {
	    return false;
	  },
	  getDirection: function getDirection() {
	    return 'LTR';
	  }
	};

	module.exports = Locale;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	var _nativeRequestAnimationFrame = __webpack_require__(121);

	var _nativeRequestAnimationFrame2 = _interopRequireDefault(_nativeRequestAnimationFrame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule requestAnimationFramePolyfill
	 */

	var lastTime = 0;

	/**
	 * Here is the native and polyfill version of requestAnimationFrame.
	 * Please don't use it directly and use requestAnimationFrame module instead.
	 */
	var requestAnimationFrame = _nativeRequestAnimationFrame2.default || function (callback) {
	  var currTime = Date.now();
	  var timeDelay = Math.max(0, 16 - (currTime - lastTime));
	  lastTime = currTime + timeDelay;
	  return global.setTimeout(function () {
	    callback(Date.now());
	  }, timeDelay);
	};

	// Works around a rare bug in Safari 6 where the first request is never invoked.
	requestAnimationFrame(_emptyFunction2.default);

	module.exports = requestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Icon = __webpack_require__(6);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_Component) {
	  _inherits(Button, _Component);

	  function Button() {
	    _classCallCheck(this, Button);

	    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	  }

	  _createClass(Button, [{
	    key: 'renderIcon',
	    value: function renderIcon(props) {
	      var medium = props.medium,
	          compact = props.compact,
	          large = props.large,
	          icon = props.icon,
	          back = props.back;

	      return _react2.default.createElement(_Icon2.default, _extends({
	        className: back ? 'icon--' + (large ? 32 : 24) + ' icon--back' : '',
	        type: icon
	      }, back ? {} : { size: medium || compact ? 16 : 20 }));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          medium = _props.medium,
	          compact = _props.compact,
	          focus = _props.focus,
	          secondary = _props.secondary,
	          hyperlink = _props.hyperlink,
	          icon = _props.icon,
	          children = _props.children,
	          dark = _props.dark,
	          back = _props.back,
	          disabled = _props.disabled,
	          large = _props.large,
	          highlight = _props.highlight,
	          on = _props.on,
	          semantic = _props.semantic,
	          rest = _objectWithoutProperties(_props, ['className', 'medium', 'compact', 'focus', 'secondary', 'hyperlink', 'icon', 'children', 'dark', 'back', 'disabled', 'large', 'highlight', 'on', 'semantic']);

	      var content = hyperlink ? _react2.default.createElement(
	        'span',
	        { className: 'button__text' },
	        children
	      ) : children;

	      return _react2.default.createElement(semantic ? 'button' : 'a', _extends({}, rest, {
	        className: (0, _classnames2.default)('button', className, {
	          'button--40': medium,
	          'button--compact': compact,
	          'button--focus': focus,
	          'button--secondary': secondary,
	          'button--icon': icon && !children,
	          'button--dark': dark,
	          'button--hyperlink': back || hyperlink,
	          'button--disabled': disabled,
	          'button--back': back,
	          'button--large': large,
	          'button--highlight': highlight,
	          on: on
	        }),
	        disabled: disabled
	      }, semantic && { type: 'button' }), icon && this.renderIcon(this.props), content);
	    }
	  }]);

	  return Button;
	}(_react.Component);

	Button.propTypes = {
	  className: _propTypes2.default.string,
	  medium: _propTypes2.default.bool,
	  compact: _propTypes2.default.bool,
	  focus: _propTypes2.default.bool,
	  secondary: _propTypes2.default.bool,
	  hyperlink: _propTypes2.default.bool,
	  icon: _propTypes2.default.string,
	  children: _propTypes2.default.node,
	  back: _propTypes2.default.bool,
	  disabled: _propTypes2.default.bool,
	  dark: _propTypes2.default.bool,
	  large: _propTypes2.default.bool,
	  highlight: _propTypes2.default.bool,
	  id: _propTypes2.default.string,
	  semantic: _propTypes2.default.bool,
	  on: _propTypes2.default.bool,
	  href: _propTypes2.default.string
	};
	exports.default = Button;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CheckboxInput = function (_Component) {
	  _inherits(CheckboxInput, _Component);

	  function CheckboxInput() {
	    _classCallCheck(this, CheckboxInput);

	    return _possibleConstructorReturn(this, (CheckboxInput.__proto__ || Object.getPrototypeOf(CheckboxInput)).apply(this, arguments));
	  }

	  _createClass(CheckboxInput, [{
	    key: 'getClassName',
	    value: function getClassName() {
	      var _props = this.props,
	          dark = _props.dark,
	          toggle = _props.toggle,
	          alternative = _props.alternative;

	      return (0, _classnames2.default)(this.props.customClass, {
	        'checkbox--light': !dark && !alternative && !toggle,
	        'checkbox--dark': dark && !alternative && !toggle,
	        'checkbox--light--indeterminate': !dark && alternative,
	        'checkbox--dark--indeterminate': dark && alternative,
	        'toggle--dark': dark && toggle,
	        toggle: !dark && toggle
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          alternative = _props2.alternative,
	          customClass = _props2.customClass,
	          dark = _props2.dark,
	          toggle = _props2.toggle,
	          rest = _objectWithoutProperties(_props2, ['alternative', 'customClass', 'dark', 'toggle']);

	      return _react2.default.createElement('input', _extends({}, rest, {
	        type: 'checkbox',
	        className: this.getClassName()
	      }));
	    }
	  }]);

	  return CheckboxInput;
	}(_react.Component);

	CheckboxInput.propTypes = {
	  alternative: _propTypes2.default.bool,
	  checked: _propTypes2.default.bool,
	  customClass: _propTypes2.default.string,
	  dark: _propTypes2.default.bool,
	  disabled: _propTypes2.default.bool,
	  id: _propTypes2.default.string.isRequired,
	  name: _propTypes2.default.string,
	  onChange: _propTypes2.default.func,
	  toggle: _propTypes2.default.bool
	};
	CheckboxInput.defaultProps = {
	  customClass: ''
	};
	exports.default = CheckboxInput;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = ProgressBarStep;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Icon = __webpack_require__(6);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function ProgressBarStep(props) {
	  var children = props.children,
	      active = props.active,
	      completed = props.completed,
	      href = props.href,
	      rest = _objectWithoutProperties(props, ['children', 'active', 'completed', 'href']);

	  var innerComponent = [_react2.default.createElement(_Icon2.default, {
	    key: Math.random(),
	    className: 'progress-bar__icon',
	    type: (0, _classnames2.default)({ active: active, completed: completed && !active, dot: !active && !completed })
	  }), _react2.default.createElement(
	    'p',
	    { key: Math.random(), className: 'progress-bar__label' },
	    children
	  )];
	  return _react2.default.createElement(
	    'li',
	    _extends({
	      className: (0, _classnames2.default)('progress-bar__step', {
	        'progress-bar__step--complete': completed,
	        'progress-bar__step--withlink': href && (completed || active),
	        'progress-bar__step--active': active
	      })
	    }, rest),
	    href && completed && !active ? _react2.default.createElement(
	      'a',
	      { href: href, className: 'progress-bar__link' },
	      innerComponent
	    ) : innerComponent
	  );
	}

	ProgressBarStep.propTypes = {
	  children: _propTypes2.default.string.isRequired,
	  href: _propTypes2.default.string,
	  active: _propTypes2.default.bool,
	  completed: _propTypes2.default.bool
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioButton = function (_React$Component) {
	  _inherits(RadioButton, _React$Component);

	  function RadioButton() {
	    _classCallCheck(this, RadioButton);

	    return _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).apply(this, arguments));
	  }

	  _createClass(RadioButton, [{
	    key: 'handleChange',
	    value: function handleChange(event) {
	      this.props.onCheckedChange(event, {
	        selected: this.props.value
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          id = _props.id,
	          name = _props.name,
	          label = _props.label,
	          value = _props.value,
	          checked = _props.checked,
	          dark = _props.dark,
	          disabled = _props.disabled,
	          selected = _props.selected;

	      var controlling = checked !== undefined ? { checked: checked } : { defaultChecked: selected };
	      var text = label || value;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('input', _extends({
	          id: id,
	          name: name,
	          value: value,
	          disabled: disabled,
	          className: (0, _classnames2.default)({
	            'radio--light': !dark,
	            'radio--dark': dark
	          }),
	          type: 'radio',
	          onChange: this.handleChange.bind(this),
	          'aria-label': text
	        }, controlling)),
	        _react2.default.createElement(
	          'label',
	          { htmlFor: id },
	          _react2.default.createElement('div', null),
	          text
	        )
	      );
	    }
	  }]);

	  return RadioButton;
	}(_react2.default.Component);

	RadioButton.propTypes = {
	  id: _propTypes2.default.string.isRequired,
	  name: _propTypes2.default.string.isRequired,
	  label: _propTypes2.default.string,
	  value: _propTypes2.default.string,
	  onCheckedChange: _propTypes2.default.func,
	  selected: _propTypes2.default.bool,
	  disabled: _propTypes2.default.bool,
	  dark: _propTypes2.default.bool,
	  checked: _propTypes2.default.bool
	};
	exports.default = RadioButton;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	module.exports = __webpack_require__(12).Object.isObject;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(31);
	var IObject = __webpack_require__(76);
	var toObject = __webpack_require__(83);
	var toLength = __webpack_require__(82);
	var asc = __webpack_require__(71);
	module.exports = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = IObject(O);
	    var f = ctx(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(68);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _joinClasses = __webpack_require__(11);

	var _joinClasses2 = _interopRequireDefault(_joinClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableCellDefault
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * Component that handles default cell layout and styling.
	 *
	 * All props unless specified below will be set onto the top level `div`
	 * rendered by the cell.
	 *
	 * Example usage via from a `Column`:
	 * ```
	 * const MyColumn = (
	 *   <Column
	 *     cell={({rowIndex, width, height}) => (
	 *       <Cell
	 *         width={width}
	 *         height={height}
	 *         className="my-class">
	 *         Cell number: <span>{rowIndex}</span>
	*        </Cell>
	 *     )}
	 *     width={100}
	 *   />
	 * );
	 * ```
	 */
	var FixedDataTableCellDefault = function (_React$Component) {
	  _inherits(FixedDataTableCellDefault, _React$Component);

	  function FixedDataTableCellDefault() {
	    _classCallCheck(this, FixedDataTableCellDefault);

	    return _possibleConstructorReturn(this, (FixedDataTableCellDefault.__proto__ || Object.getPrototypeOf(FixedDataTableCellDefault)).apply(this, arguments));
	  }

	  _createClass(FixedDataTableCellDefault, [{
	    key: 'render',
	    value: function render() {
	      //Remove some props like columnKey and rowIndex so we don't pass it into the div
	      var _props = this.props,
	          height = _props.height,
	          width = _props.width,
	          style = _props.style,
	          className = _props.className,
	          children = _props.children,
	          columnKey = _props.columnKey,
	          rowIndex = _props.rowIndex,
	          props = _objectWithoutProperties(_props, ['height', 'width', 'style', 'className', 'children', 'columnKey', 'rowIndex']);

	      var innerStyle = _extends({
	        height: height,
	        width: width
	      }, style);

	      return _React2.default.createElement(
	        'div',
	        _extends({}, props, {
	          className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/wrap1'), (0, _cx2.default)('public/fixedDataTableCell/wrap1'), className),
	          style: innerStyle }),
	        _React2.default.createElement(
	          'div',
	          {
	            className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/wrap2'), (0, _cx2.default)('public/fixedDataTableCell/wrap2')) },
	          _React2.default.createElement(
	            'div',
	            {
	              className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/wrap3'), (0, _cx2.default)('public/fixedDataTableCell/wrap3')) },
	            _React2.default.createElement(
	              'div',
	              { className: (0, _cx2.default)('public/fixedDataTableCell/cellContent') },
	              children
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return FixedDataTableCellDefault;
	}(_React2.default.Component);

	FixedDataTableCellDefault.propTypes = {

	  /**
	   * Outer height of the cell.
	   */
	  height: _propTypes2.default.number,

	  /**
	   * Outer width of the cell.
	   */
	  width: _propTypes2.default.number,

	  /**
	   * Optional prop that if specified on the `Column` will be passed to the
	   * cell. It can be used to uniquely identify which column is the cell is in.
	   */
	  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	  /**
	   * Optional prop that represents the rows index in the table.
	   * For the 'cell' prop of a Column, this parameter will exist for any
	   * cell in a row with a positive index.
	   *
	   * Below that entry point the user is welcome to consume or
	   * pass the prop through at their discretion.
	   */
	  rowIndex: _propTypes2.default.number
	};


	module.exports = FixedDataTableCellDefault;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumn
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * Component that defines the attributes of table column.
	 */
	var FixedDataTableColumn = function (_React$Component) {
	  _inherits(FixedDataTableColumn, _React$Component);

	  function FixedDataTableColumn() {
	    _classCallCheck(this, FixedDataTableColumn);

	    return _possibleConstructorReturn(this, (FixedDataTableColumn.__proto__ || Object.getPrototypeOf(FixedDataTableColumn)).apply(this, arguments));
	  }

	  _createClass(FixedDataTableColumn, [{
	    key: 'render',
	    value: function render() {
	      if (true) {
	        throw new Error('Component <FixedDataTableColumn /> should never render');
	      }
	      return null;
	    }
	  }]);

	  return FixedDataTableColumn;
	}(_React2.default.Component);

	FixedDataTableColumn.__TableColumn__ = true;
	FixedDataTableColumn.propTypes = {
	  /**
	   * The horizontal alignment of the table cell content.
	   */
	  align: _propTypes2.default.oneOf(['left', 'center', 'right']),

	  /**
	   * Controls if the column is fixed when scrolling in the X axis.
	   */
	  fixed: _propTypes2.default.bool,

	  /**
	   * Controls if the column is fixed to the right side of the table when scrolling in the X axis.
	   */
	  fixedRight: _propTypes2.default.bool,

	  /**
	   * The header cell for this column.
	   * This can either be a string a React element, or a function that generates
	   * a React Element. Passing in a string will render a default header cell
	   * with that string. By default, the React element passed in can expect to
	   * receive the following props:
	   *
	   * ```
	   * props: {
	   *   columnKey: string // (of the column, if given)
	   *   height: number // (supplied from the Table or rowHeightGetter)
	   *   width: number // (supplied from the Column)
	   * }
	   * ```
	   *
	   * Because you are passing in your own React element, you can feel free to
	   * pass in whatever props you may want or need.
	   *
	   * If you pass in a function, you will receive the same props object as the
	   * first argument.
	   */
	  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

	  /**
	   * This is the body cell that will be cloned for this column.
	   * This can either be a string a React element, or a function that generates
	   * a React Element. Passing in a string will render a default header cell
	   * with that string. By default, the React element passed in can expect to
	   * receive the following props:
	   *
	   * ```
	   * props: {
	   *   rowIndex; number // (the row index of the cell)
	   *   columnKey: string // (of the column, if given)
	   *   height: number // (supplied from the Table or rowHeightGetter)
	   *   width: number // (supplied from the Column)
	   * }
	   * ```
	   *
	   * Because you are passing in your own React element, you can feel free to
	   * pass in whatever props you may want or need.
	   *
	   * If you pass in a function, you will receive the same props object as the
	   * first argument.
	   */
	  cell: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

	  /**
	   * This is the footer cell for this column.
	   * This can either be a string a React element, or a function that generates
	   * a React Element. Passing in a string will render a default header cell
	   * with that string. By default, the React element passed in can expect to
	   * receive the following props:
	   *
	   * ```
	   * props: {
	   *   columnKey: string // (of the column, if given)
	   *   height: number // (supplied from the Table or rowHeightGetter)
	   *   width: number // (supplied from the Column)
	   * }
	   * ```
	   *
	   * Because you are passing in your own React element, you can feel free to
	   * pass in whatever props you may want or need.
	   *
	   * If you pass in a function, you will receive the same props object as the
	   * first argument.
	   */
	  footer: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),

	  /**
	   * This is used to uniquely identify the column, and is not required unless
	   * you a resizing columns. This will be the key given in the
	   * `onColumnResizeEndCallback` on the Table.
	   */
	  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	  /**
	   * The pixel width of the column.
	   */
	  width: _propTypes2.default.number.isRequired,

	  /**
	   * If this is a resizable column this is its minimum pixel width.
	   */
	  minWidth: _propTypes2.default.number,

	  /**
	   * If this is a resizable column this is its maximum pixel width.
	   */
	  maxWidth: _propTypes2.default.number,

	  /**
	   * The grow factor relative to other columns. Same as the flex-grow API
	   * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
	   * extra width and distribute it proportionally according to all columns'
	   * flexGrow values. Defaults to zero (no-flexing).
	   */
	  flexGrow: _propTypes2.default.number,

	  /**
	   * Whether the column can be resized with the
	   * FixedDataTableColumnResizeHandle. Please note that if a column
	   * has a flex grow, once you resize the column this will be set to 0.
	   *
	   * This property only provides the UI for the column resizing. If this
	   * is set to true, you will need to set the onColumnResizeEndCallback table
	   * property and render your columns appropriately.
	   */
	  isResizable: _propTypes2.default.bool,

	  /**
	   * Whether the column can be dragged to reorder.
	   */
	  isReorderable: _propTypes2.default.bool,

	  /**
	   * Whether cells in this column can be removed from document when outside
	   * of viewport as a result of horizontal scrolling.
	   * Setting this property to true allows the table to not render cells in
	   * particular column that are outside of viewport for visible rows. This
	   * allows to create table with many columns and not have vertical scrolling
	   * performance drop.
	   * Setting the property to false will keep previous behaviour and keep
	   * cell rendered if the row it belongs to is visible.
	   */
	  allowCellsRecycling: _propTypes2.default.bool,

	  /**
	   * Flag to enable performance check when rendering. Stops the component from
	   * rendering if none of it's passed in props have changed
	   */
	  pureRendering: _propTypes2.default.bool
	};
	FixedDataTableColumn.defaultProps = {
	  allowCellsRecycling: false,
	  fixed: false,
	  fixedRight: false
	};


	module.exports = FixedDataTableColumn;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumnGroup
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * Component that defines the attributes of a table column group.
	 */
	var FixedDataTableColumnGroup = function (_React$Component) {
	  _inherits(FixedDataTableColumnGroup, _React$Component);

	  function FixedDataTableColumnGroup() {
	    _classCallCheck(this, FixedDataTableColumnGroup);

	    return _possibleConstructorReturn(this, (FixedDataTableColumnGroup.__proto__ || Object.getPrototypeOf(FixedDataTableColumnGroup)).apply(this, arguments));
	  }

	  _createClass(FixedDataTableColumnGroup, [{
	    key: 'render',
	    value: function render() {
	      if (true) {
	        throw new Error('Component <FixedDataTableColumnGroup /> should never render');
	      }
	      return null;
	    }
	  }]);

	  return FixedDataTableColumnGroup;
	}(_React2.default.Component);

	FixedDataTableColumnGroup.__TableColumnGroup__ = true;
	FixedDataTableColumnGroup.propTypes = {
	  /**
	   * The horizontal alignment of the table cell content.
	   */
	  align: _propTypes2.default.oneOf(['left', 'center', 'right']),

	  /**
	   * Controls if the column group is fixed when scrolling in the X axis.
	   */
	  fixed: _propTypes2.default.bool,

	  /**
	   * This is the header cell for this column group.
	   * This can either be a string or a React element. Passing in a string
	   * will render a default footer cell with that string. By default, the React
	   * element passed in can expect to receive the following props:
	   *
	   * ```
	   * props: {
	   *   height: number // (supplied from the groupHeaderHeight)
	   *   width: number // (supplied from the Column)
	   * }
	   * ```
	   *
	   * Because you are passing in your own React element, you can feel free to
	   * pass in whatever props you may want or need.
	   *
	   * You can also pass in a function that returns a react elemnt, with the
	   * props object above passed in as the first parameter.
	   */
	  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])

	};
	FixedDataTableColumnGroup.defaultProps = {
	  fixed: false
	};


	module.exports = FixedDataTableColumnGroup;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableHelper
	 * @typechecks
	 */

	'use strict';

	var _Locale = __webpack_require__(21);

	var _Locale2 = _interopRequireDefault(_Locale);

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _FixedDataTableColumnGroup = __webpack_require__(36);

	var _FixedDataTableColumnGroup2 = _interopRequireDefault(_FixedDataTableColumnGroup);

	var _FixedDataTableColumn = __webpack_require__(35);

	var _FixedDataTableColumn2 = _interopRequireDefault(_FixedDataTableColumn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DIR_SIGN = _Locale2.default.isRTL() ? -1 : +1;
	// A cell up to 5px outside of the visible area will still be considered visible
	var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

	function renderToString(value) /*string*/{
	  if (value === null || value === undefined) {
	    return '';
	  } else {
	    return String(value);
	  }
	}

	/**
	 * Helper method to execute a callback against all columns given the children
	 * of a table.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column.
	 */
	function forEachColumn(children, callback) {
	  _React2.default.Children.forEach(children, function (child) {
	    if (child.type === _FixedDataTableColumnGroup2.default) {
	      forEachColumn(child.props.children, callback);
	    } else if (child.type === _FixedDataTableColumn2.default) {
	      callback(child);
	    }
	  });
	}

	/**
	 * Helper method to map columns to new columns. This takes into account column
	 * groups and will generate a new column group if its columns change.
	 * @param {?object|array} children
	 *    Children of a table.
	 * @param {function} callback
	 *    Function to excecute for each column. It is passed the column and should
	 *    return a result column.
	 */
	function mapColumns(children, callback) {
	  var newChildren = [];
	  _React2.default.Children.forEach(children, function (originalChild) {
	    var newChild = originalChild;

	    // The child is either a column group or a column. If it is a column group
	    // we need to iterate over its columns and then potentially generate a
	    // new column group
	    if (originalChild.type === _FixedDataTableColumnGroup2.default) {
	      var haveColumnsChanged = false;
	      var newColumns = [];

	      forEachColumn(originalChild.props.children, function (originalcolumn) {
	        var newColumn = callback(originalcolumn);
	        if (newColumn !== originalcolumn) {
	          haveColumnsChanged = true;
	        }
	        newColumns.push(newColumn);
	      });

	      // If the column groups columns have changed clone the group and supply
	      // new children
	      if (haveColumnsChanged) {
	        newChild = _React2.default.cloneElement(originalChild, {
	          children: newColumns
	        });
	      }
	    } else if (originalChild.type === _FixedDataTableColumn2.default) {
	      newChild = callback(originalChild);
	    }

	    newChildren.push(newChild);
	  });

	  return newChildren;
	}

	var FixedDataTableHelper = {
	  DIR_SIGN: DIR_SIGN,
	  CELL_VISIBILITY_TOLERANCE: CELL_VISIBILITY_TOLERANCE,
	  renderToString: renderToString,
	  forEachColumn: forEachColumn,
	  mapColumns: mapColumns
	};

	module.exports = FixedDataTableHelper;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRow
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _FixedDataTableCellGroup = __webpack_require__(101);

	var _FixedDataTableCellGroup2 = _interopRequireDefault(_FixedDataTableCellGroup);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _joinClasses = __webpack_require__(11);

	var _joinClasses2 = _interopRequireDefault(_joinClasses);

	var _FixedDataTableTranslateDOMPosition = __webpack_require__(14);

	var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// .fixedDataTableLayout/header border-bottom-width
	var HEADER_BORDER_BOTTOM_WIDTH = 1;

	/**
	 * Component that renders the row for <FixedDataTable />.
	 * This component should not be used directly by developer. Instead,
	 * only <FixedDataTable /> should use the component internally.
	 */

	var FixedDataTableRowImpl = function (_React$Component) {
	  _inherits(FixedDataTableRowImpl, _React$Component);

	  function FixedDataTableRowImpl() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, FixedDataTableRowImpl);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableRowImpl.__proto__ || Object.getPrototypeOf(FixedDataTableRowImpl)).call.apply(_ref, [this].concat(args))), _this), _this.mouseLeaveIndex = null, _this._getColumnsWidth = function ( /*array*/columns) /*number*/{
	      var width = 0;
	      for (var i = 0; i < columns.length; ++i) {
	        width += columns[i].props.width;
	      }
	      return width;
	    }, _this._getRowExpanded = function ( /*number*/subRowHeight) /*?object*/{
	      if (_this.props.rowExpanded) {
	        var rowExpandedProps = {
	          rowIndex: _this.props.index,
	          height: subRowHeight,
	          width: _this.props.width
	        };

	        var rowExpanded;
	        if (_React2.default.isValidElement(_this.props.rowExpanded)) {
	          rowExpanded = _React2.default.cloneElement(_this.props.rowExpanded, rowExpandedProps);
	        } else if (typeof _this.props.rowExpanded === 'function') {
	          rowExpanded = _this.props.rowExpanded(rowExpandedProps);
	        }

	        return rowExpanded;
	      }
	    }, _this._renderColumnsLeftShadow = function ( /*number*/left) /*?object*/{
	      var className = (0, _cx2.default)({
	        'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
	        'fixedDataTableRowLayout/columnsShadow': _this.props.scrollLeft > 0,
	        'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
	        'public/fixedDataTableRow/columnsShadow': _this.props.scrollLeft > 0
	      });
	      var dividerHeight = _this.props.cellGroupWrapperHeight ? _this.props.cellGroupWrapperHeight - HEADER_BORDER_BOTTOM_WIDTH : _this.props.height;
	      var style = {
	        left: left,
	        height: dividerHeight
	      };
	      return _React2.default.createElement('div', { className: className, style: style });
	    }, _this._renderFixedRightColumnsShadow = function ( /*number*/left) /*?object*/{
	      var className = (0, _cx2.default)('fixedDataTableRowLayout/columnsShadow', 'fixedDataTableRowLayout/columnsRightShadow', 'fixedDataTableRowLayout/fixedColumnsDivider', 'public/fixedDataTableRow/columnsShadow', 'public/fixedDataTableRow/columnsRightShadow', 'public/fixedDataTableRow/fixedColumnsDivider');
	      var style = {
	        height: _this.props.height,
	        left: left
	      };
	      return _React2.default.createElement('div', { className: className, style: style });
	    }, _this._renderColumnsRightShadow = function ( /*number*/totalWidth) /*?object*/{
	      if (Math.ceil(_this.props.scrollLeft + _this.props.width) < Math.floor(totalWidth)) {
	        var className = (0, _cx2.default)('fixedDataTableRowLayout/columnsShadow', 'fixedDataTableRowLayout/columnsRightShadow', 'public/fixedDataTableRow/columnsShadow', 'public/fixedDataTableRow/columnsRightShadow');
	        var style = {
	          height: _this.props.height
	        };
	        return _React2.default.createElement('div', { className: className, style: style });
	      }
	    }, _this._onClick = function ( /*object*/event) {
	      _this.props.onClick(event, _this.props.index);
	    }, _this._onDoubleClick = function ( /*object*/event) {
	      _this.props.onDoubleClick(event, _this.props.index);
	    }, _this._onMouseUp = function ( /*object*/event) {
	      _this.props.onMouseUp(event, _this.props.index);
	    }, _this._onMouseDown = function ( /*object*/event) {
	      _this.props.onMouseDown(event, _this.props.index);
	    }, _this._onMouseEnter = function ( /*object*/event) {
	      /**
	       * This is necessary so that onMouseLeave is fired with the initial
	       * row index since this row could be updated with a different index
	       * when scrolling.
	       */
	      _this.mouseLeaveIndex = _this.props.index;
	      if (_this.props.onMouseEnter) {
	        _this.props.onMouseEnter(event, _this.props.index);
	      }
	    }, _this._onMouseLeave = function ( /*object*/event) {
	      if (_this.mouseLeaveIndex === null) {
	        _this.mouseLeaveIndex = _this.props.index;
	      }
	      _this.props.onMouseLeave(event, _this.mouseLeaveIndex);
	      _this.mouseLeaveIndex = null;
	    }, _this._onTouchStart = function ( /*object*/event) {
	      _this.props.onTouchStart(event, _this.props.index);
	    }, _this._onTouchEnd = function ( /*object*/event) {
	      _this.props.onTouchEnd(event, _this.props.index);
	    }, _this._onTouchMove = function ( /*object*/event) {
	      _this.props.onTouchMove(event, _this.props.index);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  /**
	   * The index of a row for which to fire the onMouseLeave event.
	   */


	  _createClass(FixedDataTableRowImpl, [{
	    key: 'render',
	    value: function render() /*object*/{
	      var subRowHeight = this.props.subRowHeight || 0;
	      var style = {
	        width: this.props.width,
	        height: this.props.height + subRowHeight
	      };
	      var className = (0, _cx2.default)({
	        'fixedDataTableRowLayout/main': true,
	        'public/fixedDataTableRow/main': true,
	        'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
	        'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
	        'public/fixedDataTableRow/even': this.props.index % 2 === 0
	      });
	      var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
	      var fixedColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
	        key: 'fixed_cells',
	        isScrolling: this.props.isScrolling,
	        height: this.props.height,
	        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
	        left: 0,
	        width: fixedColumnsWidth,
	        zIndex: 2,
	        columns: this.props.fixedColumns,
	        touchEnabled: this.props.touchEnabled,
	        onColumnResize: this.props.onColumnResize,
	        onColumnReorder: this.props.onColumnReorder,
	        onColumnReorderMove: this.props.onColumnReorderMove,
	        onColumnReorderEnd: this.props.onColumnReorderEnd,
	        isColumnReordering: this.props.isColumnReordering,
	        columnReorderingData: this.props.columnReorderingData,
	        rowHeight: this.props.height,
	        rowIndex: this.props.index
	      });
	      var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);
	      var fixedRightColumnsWidth = this._getColumnsWidth(this.props.fixedRightColumns);
	      var fixedRightColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
	        key: 'fixed_right_cells',
	        isScrolling: this.props.isScrolling,
	        height: this.props.height,
	        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
	        offsetLeft: this.props.width - fixedRightColumnsWidth,
	        width: fixedRightColumnsWidth,
	        zIndex: 2,
	        columns: this.props.fixedRightColumns,
	        touchEnabled: this.props.touchEnabled,
	        onColumnResize: this.props.onColumnResize,
	        onColumnReorder: this.props.onColumnReorder,
	        onColumnReorderMove: this.props.onColumnReorderMove,
	        onColumnReorderEnd: this.props.onColumnReorderEnd,
	        isColumnReordering: this.props.isColumnReordering,
	        columnReorderingData: this.props.columnReorderingData,
	        rowHeight: this.props.height,
	        rowIndex: this.props.index
	      });
	      var fixedRightColumnsShdadow = fixedRightColumnsWidth ? this._renderFixedRightColumnsShadow(this.props.width - fixedRightColumnsWidth - 5) : null;
	      var scrollableColumns = _React2.default.createElement(_FixedDataTableCellGroup2.default, {
	        key: 'scrollable_cells',
	        isScrolling: this.props.isScrolling,
	        height: this.props.height,
	        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
	        align: 'right',
	        left: this.props.scrollLeft,
	        offsetLeft: fixedColumnsWidth,
	        width: this.props.width - fixedColumnsWidth - fixedRightColumnsWidth,
	        zIndex: 0,
	        columns: this.props.scrollableColumns,
	        touchEnabled: this.props.touchEnabled,
	        onColumnResize: this.props.onColumnResize,
	        onColumnReorder: this.props.onColumnReorder,
	        onColumnReorderMove: this.props.onColumnReorderMove,
	        onColumnReorderEnd: this.props.onColumnReorderEnd,
	        isColumnReordering: this.props.isColumnReordering,
	        columnReorderingData: this.props.columnReorderingData,
	        rowHeight: this.props.height,
	        rowIndex: this.props.index
	      });
	      var scrollableColumnsWidth = this._getColumnsWidth(this.props.scrollableColumns);
	      var columnsRightShadow = this._renderColumnsRightShadow(fixedColumnsWidth + scrollableColumnsWidth);
	      var rowExpanded = this._getRowExpanded(subRowHeight);
	      var rowExpandedStyle = {
	        height: subRowHeight,
	        top: this.props.height,
	        width: this.props.width
	      };

	      return _React2.default.createElement(
	        'div',
	        {
	          className: (0, _joinClasses2.default)(className, this.props.className),
	          onClick: this.props.onClick ? this._onClick : null,
	          onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
	          onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
	          onMouseUp: this.props.onMouseUp ? this._onMouseUp : null,
	          onMouseEnter: this.props.onMouseEnter || this.props.onMouseLeave ? this._onMouseEnter : null,
	          onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
	          onTouchStart: this.props.onTouchStart ? this._onTouchStart : null,
	          onTouchEnd: this.props.onTouchEnd ? this._onTouchEnd : null,
	          onTouchMove: this.props.onTouchMove ? this._onTouchMove : null,
	          style: style },
	        _React2.default.createElement(
	          'div',
	          { className: (0, _cx2.default)('fixedDataTableRowLayout/body') },
	          fixedColumns,
	          scrollableColumns,
	          columnsLeftShadow,
	          fixedRightColumns,
	          fixedRightColumnsShdadow
	        ),
	        rowExpanded && _React2.default.createElement(
	          'div',
	          {
	            className: (0, _cx2.default)('fixedDataTableRowLayout/rowExpanded'),
	            style: rowExpandedStyle },
	          rowExpanded
	        ),
	        columnsRightShadow
	      );
	    }
	  }]);

	  return FixedDataTableRowImpl;
	}(_React2.default.Component);

	FixedDataTableRowImpl.propTypes = {

	  isScrolling: _propTypes2.default.bool,

	  /**
	   * Array of <FixedDataTableColumn /> for the fixed columns.
	   */
	  fixedColumns: _propTypes2.default.array.isRequired,

	  /**
	   * Array of <FixedDataTableColumn /> for the fixed columns positioned at end of the table.
	   */
	  fixedRightColumns: _propTypes2.default.array.isRequired,

	  /**
	   * Height of the row.
	   */
	  height: _propTypes2.default.number.isRequired,

	  /**
	   * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
	   */
	  cellGroupWrapperHeight: _propTypes2.default.number,

	  /**
	   * Height of the content to be displayed below the row.
	   */
	  subRowHeight: _propTypes2.default.number,

	  /**
	   * the row expanded.
	   */
	  rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

	  /**
	   * The row index.
	   */
	  index: _propTypes2.default.number.isRequired,

	  /**
	   * Array of <FixedDataTableColumn /> for the scrollable columns.
	   */
	  scrollableColumns: _propTypes2.default.array.isRequired,

	  /**
	   * The distance between the left edge of the table and the leftmost portion
	   * of the row currently visible in the table.
	   */
	  scrollLeft: _propTypes2.default.number.isRequired,

	  /**
	   * Width of the row.
	   */
	  width: _propTypes2.default.number.isRequired,

	  /**
	   * Fire when a row is clicked.
	   */
	  onClick: _propTypes2.default.func,

	  /**
	   * Fire when a row is double clicked.
	   */
	  onDoubleClick: _propTypes2.default.func,

	  /**
	   * Callback for when resizer knob (in FixedDataTableCell) is clicked
	   * to initialize resizing. Please note this is only on the cells
	   * in the header.
	   * @param number combinedWidth
	   * @param number leftOffset
	   * @param number cellWidth
	   * @param number|string columnKey
	   * @param object event
	   */
	  onColumnResize: _propTypes2.default.func,

	  isColumnReordering: _propTypes2.default.bool,
	  /**
	   * Callback for when reorder handle (in FixedDataTableCell) is clicked
	   * to initialize reordering. Please note this is only on the cells
	   * in the header.
	   * @param number|string columnKey
	   * @param number cellWidth
	   * @param number leftOffset
	   * @param object event
	   */
	  onColumnReorder: _propTypes2.default.func,

	  /**
	   * Callback for when a cell is moved while reordering.
	   * @param number distance
	   */
	  onColumnReorderMove: _propTypes2.default.func,

	  /**
	   * Callback for when the mouse is released to complete reordering.
	   * @param number distance
	   */
	  onColumnReorderEnd: _propTypes2.default.func,

	  touchEnabled: _propTypes2.default.bool
	};

	var FixedDataTableRow = function (_React$Component2) {
	  _inherits(FixedDataTableRow, _React$Component2);

	  function FixedDataTableRow() {
	    _classCallCheck(this, FixedDataTableRow);

	    return _possibleConstructorReturn(this, (FixedDataTableRow.__proto__ || Object.getPrototypeOf(FixedDataTableRow)).apply(this, arguments));
	  }

	  _createClass(FixedDataTableRow, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this._initialRender = true;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._initialRender = false;
	    }
	  }, {
	    key: 'render',
	    value: function render() /*object*/{
	      var style = {
	        width: this.props.width,
	        height: this.props.height,
	        zIndex: this.props.zIndex ? this.props.zIndex : 0
	      };
	      (0, _FixedDataTableTranslateDOMPosition2.default)(style, 0, this.props.offsetTop, this._initialRender);

	      return _React2.default.createElement(
	        'div',
	        {
	          style: style,
	          className: (0, _cx2.default)('fixedDataTableRowLayout/rowWrapper') },
	        _React2.default.createElement(FixedDataTableRowImpl, _extends({}, this.props, {
	          offsetTop: undefined,
	          zIndex: undefined
	        }))
	      );
	    }
	  }]);

	  return FixedDataTableRow;
	}(_React2.default.Component);

	FixedDataTableRow.propTypes = {

	  isScrolling: _propTypes2.default.bool,

	  /**
	   * Height of the row.
	   */
	  height: _propTypes2.default.number.isRequired,

	  /**
	   * Z-index on which the row will be displayed. Used e.g. for keeping
	   * header and footer in front of other rows.
	   */
	  zIndex: _propTypes2.default.number,

	  /**
	   * The vertical position where the row should render itself
	   */
	  offsetTop: _propTypes2.default.number.isRequired,

	  /**
	   * Width of the row.
	   */
	  width: _propTypes2.default.number.isRequired
	};


	module.exports = FixedDataTableRow;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is utility that handles onWheel events and calls provided wheel
	 * callback with correct frame rate.
	 *
	 * @providesModule ReactWheelHandler
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	var _normalizeWheel = __webpack_require__(122);

	var _normalizeWheel2 = _interopRequireDefault(_normalizeWheel);

	var _requestAnimationFramePolyfill = __webpack_require__(22);

	var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ReactWheelHandler = function () {
	  /**
	   * onWheel is the callback that will be called with right frame rate if
	   * any wheel events happened
	   * onWheel should is to be called with two arguments: deltaX and deltaY in
	   * this order
	   */
	  function ReactWheelHandler(
	  /*function*/onWheel,
	  /*boolean|function*/handleScrollX,
	  /*boolean|function*/handleScrollY,
	  /*?boolean|?function*/stopPropagation) {
	    _classCallCheck(this, ReactWheelHandler);

	    this._animationFrameID = null;
	    this._deltaX = 0;
	    this._deltaY = 0;
	    this._didWheel = this._didWheel.bind(this);
	    if (typeof handleScrollX !== 'function') {
	      handleScrollX = handleScrollX ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
	    }

	    if (typeof handleScrollY !== 'function') {
	      handleScrollY = handleScrollY ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
	    }

	    if (typeof stopPropagation !== 'function') {
	      stopPropagation = stopPropagation ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
	    }

	    this._handleScrollX = handleScrollX;
	    this._handleScrollY = handleScrollY;
	    this._stopPropagation = stopPropagation;
	    this._onWheelCallback = onWheel;
	    this.onWheel = this.onWheel.bind(this);
	  }

	  _createClass(ReactWheelHandler, [{
	    key: 'onWheel',
	    value: function onWheel( /*object*/event) {
	      var normalizedEvent = (0, _normalizeWheel2.default)(event);
	      var deltaX = this._deltaX + normalizedEvent.pixelX;
	      var deltaY = this._deltaY + normalizedEvent.pixelY;
	      var handleScrollX = this._handleScrollX(deltaX, deltaY);
	      var handleScrollY = this._handleScrollY(deltaY, deltaX);
	      if (!handleScrollX && !handleScrollY) {
	        return;
	      }

	      this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
	      this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
	      event.preventDefault();

	      var changed;
	      if (this._deltaX !== 0 || this._deltaY !== 0) {
	        if (this._stopPropagation()) {
	          event.stopPropagation();
	        }
	        changed = true;
	      }

	      if (changed === true && this._animationFrameID === null) {
	        this._animationFrameID = (0, _requestAnimationFramePolyfill2.default)(this._didWheel);
	      }
	    }
	  }, {
	    key: '_didWheel',
	    value: function _didWheel() {
	      this._animationFrameID = null;
	      this._onWheelCallback(this._deltaX, this._deltaY);
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }
	  }]);

	  return ReactWheelHandler;
	}();

	module.exports = ReactWheelHandler;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _ExecutionEnvironment = __webpack_require__(33);

	var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

	var _camelize = __webpack_require__(116);

	var _camelize2 = _interopRequireDefault(_camelize);

	var _invariant = __webpack_require__(10);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var memoized = {}; /**
	                    * Copyright Schrodinger, LLC
	                    * All rights reserved.
	                    *
	                    * This source code is licensed under the BSD-style license found in the
	                    * LICENSE file in the root directory of this source tree. An additional grant
	                    * of patent rights can be found in the PATENTS file in the same directory.
	                    *
	                    * @providesModule getVendorPrefixedName
	                    * @typechecks
	                    */

	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
	var testStyle = _ExecutionEnvironment2.default.canUseDOM ? document.createElement('div').style : {};

	function getWithPrefix(name) {
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixedName = prefixes[i] + name;
	    if (prefixedName in testStyle) {
	      return prefixedName;
	    }
	  }
	  return null;
	}

	/**
	 * @param {string} property Name of a css property to check for.
	 * @return {?string} property name supported in the browser, or null if not
	 * supported.
	 */
	function getVendorPrefixedName(property) {
	  var name = (0, _camelize2.default)(property);
	  if (memoized[name] === undefined) {
	    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	    if (prefixRegex.test(capitalizedName)) {
	      (0, _invariant2.default)(false, 'getVendorPrefixedName must only be called with unprefixed' + 'CSS property names. It was called with %s', property);
	    }
	    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
	  }
	  return memoized[name];
	}

	module.exports = getVendorPrefixedName;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = {"blue":{"10":"#c0e6ff","20":"#7cc7ff","30":"#5aaafa","40":"#5596e6","50":"#4178be","60":"#325c80","70":"#264a60","80":"#1d3649","90":"#152935","100":"#010205","core":"#4178be"},"green":{"10":"#c8f08f","20":"#b4e051","30":"#8cd211","40":"#5aa700","50":"#4b8400","60":"#2d660a","70":"#144d14","80":"#0a3c02","90":"#0c2808","100":"#010200","core":"#4b8400"},"teal":{"10":"#a7fae6","20":"#6eedd8","30":"#41d6c3","40":"#00b4a0","50":"#008571","60":"#006d5d","70":"#005448","80":"#003c32","90":"#012b22","100":"#000202","core":"#008571"},"purple":{"10":"#eed2ff","20":"#d7aaff","30":"#ba8ff7","40":"#af6ee8","50":"#9855d4","60":"#734098","70":"#562f72","80":"#412356","90":"#311a41","100":"#030103","core":"#9855d4"},"magenta":{"10":"#ffd2ff","20":"#ff9eee","30":"#ff71d4","40":"#ff3ca0","50":"#db2780","60":"#a6266e","70":"#7c1c58","80":"#601146","90":"#3a0b2e","100":"#040102","core":"#db2780"},"red":{"10":"#ffd2dd","20":"#ffa5b4","30":"#ff7d87","40":"#ff5050","50":"#e71d32","60":"#ad1625","70":"#8c101c","80":"#6e0a1e","90":"#4c0a17","100":"#040001","core":"#e71d32"},"orange":{"10":"#ffd4a0","20":"#ffa573","30":"#ff7832","40":"#ff5003","50":"#d74108","60":"#a53725","70":"#872a0f","80":"#6d120f","90":"#43100b","100":"#030100","core":"#ff7832"},"yellow":{"10":"#fde876","20":"#fdd600","30":"#efc100","40":"#be9b00","50":"#8c7300","60":"#735f00","70":"#574a00","80":"#3c3200","90":"#281e00","100":"#020100","core":"#fdd600"},"aqua":{"10":"#b6eff2","20":"#7de1eb","30":"#4cc3d2","40":"#2ea4b2","50":"#1e818c","60":"#186a73","70":"#0e5158","80":"#0c373c","90":"#07272b","100":"#010203","core":"#1e818c"},"indigo":{"10":"#dedeff","20":"#b4b4ff","30":"#9b9bff","40":"#8282f0","50":"#6969d4","60":"#4d4d9b","70":"#3c3c73","80":"#2a2a5a","90":"#202041","100":"#010102","core":"#6969d4"},"gray":{"10":"#e0e0e0","20":"#c7c7c7","30":"#aeaeae","40":"#959595","50":"#777677","60":"#5a5a5a","70":"#464646","80":"#323232","90":"#121212","100":"#000","core":"#777677"},"cool-gray":{"10":"#dfe9e9","20":"#c8d2d2","30":"#aeb8b8","40":"#959f9f","50":"#6d7777","60":"#5a6464","70":"#3c4646","80":"#323c3c","90":"#0d1111","100":"#000203","core":"#6d7777"},"warm-gray":{"10":"#e9e0e0","20":"#d0c7c7","30":"#b8aeae","40":"#9e9494","50":"#7d7373","60":"#645a5a","70":"#504646","80":"#3c3232","90":"#1a1314","100":"#030000","core":"#7d7373"},"neutral-white":{"10":"#fdfdfd","20":"#f9f9f9","30":"#f4f4f4","40":"#ececec","core":"#fdfdfd"},"cool-white":{"10":"#fbfcfc","20":"#f9f9fb","30":"#f0f2f4","40":"#ecf0f2","core":"#fbfcfc"},"warm-white":{"10":"#fbfbfb","20":"#fdfbfb","30":"#f7f5f5","40":"#f2eeee","core":"#fbfbfb"},"black":{"core":"#000"},"white":{"core":"#fff"}}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_43__;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Icon = __webpack_require__(6);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Alert = function (_Component) {
	  _inherits(Alert, _Component);

	  function Alert(props) {
	    _classCallCheck(this, Alert);

	    var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

	    _this.state = {
	      closed: false
	    };
	    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
	    return _this;
	  }

	  _createClass(Alert, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var alert = this.alert;

	      alert && alert.addEventListener(this.getTransitionEndName(), this.onTransitionEnd);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.isOpen) {
	        this.setState({ closed: false });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var alert = this.alert;

	      if (alert) {
	        alert.removeEventListener(this.getTransitionEndName(), this.onTransitionEnd);
	      }
	    }
	  }, {
	    key: 'onTransitionEnd',
	    value: function onTransitionEnd() {
	      this.setState({ closed: !this.props.isOpen });
	    }
	  }, {
	    key: 'getTransitionEndName',
	    value: function getTransitionEndName() {
	      var el = document.createElement('div');
	      var transitions = {
	        transition: 'transitionend',
	        OTransition: 'otransitionend',
	        MozTransition: 'transitionend',
	        WebkitTransition: 'webkitTransitionEnd'
	      };

	      var _Object$keys$filter = Object.keys(transitions).filter(function (t) {
	        return el.style[t] !== undefined;
	      }),
	          _Object$keys$filter2 = _slicedToArray(_Object$keys$filter, 1),
	          tKey = _Object$keys$filter2[0];

	      return transitions[tKey];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      if (this.state.closed) {
	        return _react2.default.createElement('div', null);
	      }
	      var className = '';

	      if (!this.props.isOpen && !this.state.closed) {
	        className = 'alert__fadeOut';
	      }

	      var _props = this.props,
	          isOpen = _props.isOpen,
	          onRequestClose = _props.onRequestClose,
	          rest = _objectWithoutProperties(_props, ['isOpen', 'onRequestClose']);

	      return _react2.default.createElement(
	        'div',
	        _extends({
	          ref: function ref(el) {
	            return _this2.alert = el;
	          },
	          className: '\n          alert\n          alert--' + this.props.type + '\n          ' + className + '\n          ' + (this.props.className || '') + '\n        '
	        }, rest),
	        _react2.default.createElement(
	          'button',
	          {
	            className: 'alert__close',
	            onClick: this.props.onRequestClose
	          },
	          _react2.default.createElement(_Icon2.default, { type: 'close', className: 'icon--close' })
	        ),
	        _react2.default.createElement(_Icon2.default, { className: 'alert__icon', type: this.props.type }),
	        this.props.children
	      );
	    }
	  }]);

	  return Alert;
	}(_react.Component);

	Alert.propTypes = {
	  id: _propTypes2.default.string,
	  onRequestClose: _propTypes2.default.func,
	  type: _propTypes2.default.oneOf(['error', 'warning', 'info', 'success']),
	  children: _propTypes2.default.node,
	  isOpen: _propTypes2.default.bool,
	  style: _propTypes2.default.object,
	  className: _propTypes2.default.string
	};
	Alert.defaultProps = {
	  type: 'success'
	};
	exports.default = Alert;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Breadcrumb = function (_Component) {
	  _inherits(Breadcrumb, _Component);

	  function Breadcrumb() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Breadcrumb);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      popoverWidth: 0
	    }, _this.onFocus = function () {
	      _this.setState({ crumbActive: true });
	    }, _this.onBlur = function () {
	      _this.setState({ crumbActive: false });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Breadcrumb, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.popover) {
	        this.setState({ // eslint-disable-line
	          popoverWidth: this.popover.offsetWidth
	        });
	      }
	    }
	  }, {
	    key: 'getItemData',
	    value: function getItemData(item) {
	      var data = item;
	      if (Array.isArray(item)) {
	        data = {
	          text: item[0],
	          href: item[1]
	        };
	      }
	      return data;
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(start, end) {
	      var _this2 = this;

	      return this.props.items.slice(start, end).map(function (item, index) {
	        var _getItemData = _this2.getItemData(item),
	            text = _getItemData.text,
	            className = _getItemData.className,
	            rest = _objectWithoutProperties(_getItemData, ['text', 'className']);

	        return _react2.default.createElement(
	          'li',
	          { className: 'breadcrumb__item', key: index },
	          _react2.default.createElement(
	            'a',
	            _extends({ className: (0, _classnames2.default)('breadcrumb__link', className) }, rest),
	            text
	          ),
	          _react2.default.createElement(
	            'svg',
	            { className: 'breadcrumb__divider', xmlns: 'http://www.w3.org/2000/svg', width: '6', height: '11', viewBox: '0 0 6 11' },
	            _react2.default.createElement('path', { width: '6', height: '11', d: 'M.7 10.7L0 10l4.6-4.6L0 .7.7 0l5.4 5.4' })
	          )
	        );
	      });
	    }
	  }, {
	    key: 'renderLastItem',
	    value: function renderLastItem() {
	      var lastItem = this.props.items[this.props.items.length - 1];

	      var _getItemData2 = this.getItemData(lastItem),
	          text = _getItemData2.text,
	          className = _getItemData2.className,
	          rest = _objectWithoutProperties(_getItemData2, ['text', 'className']);

	      return _react2.default.createElement(
	        'li',
	        { className: 'breadcrumb__item--current' },
	        _react2.default.createElement(
	          'span',
	          _extends({ className: (0, _classnames2.default)('breadcrumb__current', className) }, rest),
	          text
	        )
	      );
	    }
	  }, {
	    key: 'renderCondensedItems',
	    value: function renderCondensedItems(children) {
	      var _this3 = this;

	      return _react2.default.createElement(
	        'li',
	        {
	          className: 'breadcrumb__item--condensed',
	          onFocus: this.onFocus,
	          onBlur: this.onBlur
	        },
	        _react2.default.createElement(
	          'button',
	          {
	            className: (0, _classnames2.default)('breadcrumb__link--condensed', {
	              active: this.state.crumbActive
	            }),
	            style: { backgroundColor: 'transparent', border: 'none' }
	          },
	          '\u2026',
	          _react2.default.createElement(
	            'ul',
	            {
	              className: 'breadcrumb__condensed--container',
	              style: { marginLeft: -this.state.popoverWidth / 2 },
	              ref: function ref(el) {
	                return _this3.popover = el;
	              }
	            },
	            children
	          )
	        ),
	        _react2.default.createElement(
	          'svg',
	          { className: 'breadcrumb__divider', xmlns: 'http://www.w3.org/2000/svg', width: '6', height: '11', viewBox: '0 0 6 11' },
	          _react2.default.createElement('path', { width: '6', height: '11', d: 'M.7 10.7L0 10l4.6-4.6L0 .7.7 0l5.4 5.4' })
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          items = _props.items,
	          maxVisibleItems = _props.maxVisibleItems,
	          dark = _props.dark,
	          className = _props.className,
	          rest = _objectWithoutProperties(_props, ['items', 'maxVisibleItems', 'dark', 'className']);

	      var isCondensed = items.length > maxVisibleItems;
	      return _react2.default.createElement(
	        'nav',
	        _extends({
	          className: (0, _classnames2.default)({
	            breadcrumb: !dark,
	            'breadcrumb--dark': dark,
	            'breadcrumb--condensed': isCondensed
	          }, className)
	        }, rest),
	        _react2.default.createElement(
	          'ul',
	          { className: 'breadcrumb__container' },
	          this.renderItems(0, isCondensed ? 1 : -1),
	          isCondensed && this.renderCondensedItems(this.renderItems(1, -1)),
	          this.renderLastItem()
	        )
	      );
	    }
	  }]);

	  return Breadcrumb;
	}(_react.Component);

	Breadcrumb.propTypes = {
	  dark: _propTypes2.default.bool,
	  items: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.string)), _propTypes2.default.arrayOf(_propTypes2.default.object)]),
	  maxVisibleItems: _propTypes2.default.number,
	  className: _propTypes2.default.string
	};
	Breadcrumb.defaultProps = {
	  dark: false,
	  items: [],
	  maxVisibleItems: 6
	};
	exports.default = Breadcrumb;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = Card;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Card(props) {
	  return _react2.default.createElement(
	    'div',
	    _extends({}, props, { className: 'card ' + props.className }),
	    _react2.default.createElement(
	      'div',
	      { className: 'card__inner' },
	      props.children
	    )
	  );
	}

	Card.defaultProps = {
	  className: ''
	};

	Card.propTypes = {
	  children: _propTypes2.default.node,
	  className: _propTypes2.default.string
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _CheckboxInput = __webpack_require__(24);

	var _CheckboxInput2 = _interopRequireDefault(_CheckboxInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox = function (_Component) {
	  _inherits(Checkbox, _Component);

	  function Checkbox() {
	    _classCallCheck(this, Checkbox);

	    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	  }

	  _createClass(Checkbox, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          wrapperClass = _props.wrapperClass,
	          inputClass = _props.inputClass,
	          rest = _objectWithoutProperties(_props, ['wrapperClass', 'inputClass']);

	      return _react2.default.createElement(
	        'div',
	        { className: wrapperClass },
	        _react2.default.createElement(_CheckboxInput2.default, _extends({}, rest, {
	          customClass: inputClass
	        })),
	        _react2.default.createElement(
	          'label',
	          { htmlFor: this.props.id },
	          this.props.name
	        )
	      );
	    }
	  }]);

	  return Checkbox;
	}(_react.Component);

	Checkbox.propTypes = {
	  alternative: _propTypes2.default.bool,
	  checked: _propTypes2.default.bool,
	  dark: _propTypes2.default.bool,
	  disabled: _propTypes2.default.bool,
	  id: _propTypes2.default.string.isRequired,
	  inputClass: _propTypes2.default.string,
	  name: _propTypes2.default.string,
	  onChange: _propTypes2.default.func,
	  wrapperClass: _propTypes2.default.string
	};
	Checkbox.defaultProps = {
	  wrapperClass: '',
	  name: ''
	};
	exports.default = Checkbox;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _find = __webpack_require__(67);

	var _find2 = _interopRequireDefault(_find);

	var _findIndex = __webpack_require__(66);

	var _findIndex2 = _interopRequireDefault(_findIndex);

	var _isObject = __webpack_require__(27);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _Button = __webpack_require__(23);

	var _Button2 = _interopRequireDefault(_Button);

	var _Icon = __webpack_require__(6);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _DropdownChoice = __webpack_require__(49);

	var _DropdownChoice2 = _interopRequireDefault(_DropdownChoice);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


	var instances = [];

	var Dropdown = function (_Component) {
	  _inherits(Dropdown, _Component);

	  function Dropdown(props) {
	    _classCallCheck(this, Dropdown);

	    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

	    _this.handleKeyPress = function (event) {
	      // Filter enter and space to avoid selecting
	      if (event.keyCode === 27) {
	        _this.close();
	      } else if (event.keyCode === 32 || event.keyCode === 13) {
	        _this.handleCheckedChange(event, {
	          value: _this.state.value
	        });
	      } else if (event.keyCode === 38 || event.keyCode === 40) {
	        var index = 0;
	        if (_this.focusIndex >= 0) {
	          index = _this.focusIndex + (event.keyCode === 40 ? 1 : -1);
	        }
	        if (index < 0) {
	          index = _this.options.length - 1;
	        }
	        if (index >= _this.options.length) {
	          index = 0;
	        }
	        _this.options[index].el.button.focus();
	        _this.focusIndex = index;
	        event.preventDefault();
	      } else {
	        var key = String.fromCharCode(event.keyCode);
	        clearTimeout(_this.keyTimer);
	        _this.keyTimer = setTimeout(_this.clearKeyStack.bind(_this), _this.props.searchTimeout);
	        _this.keyStack += key;
	        // Search for matching items and select them
	        var searchResult = _this.searchOption(_this.keyStack.toLowerCase());
	        if (searchResult) {
	          _this.setState({ value: searchResult.value });
	        }
	      }
	    };

	    _this.handleWindowClick = function () {
	      _this.close();
	    };

	    _this.handleClick = function (e) {
	      var _this$props = _this.props,
	          onClick = _this$props.onClick,
	          disabled = _this$props.disabled;
	      var open = _this.state.open;

	      e.stopPropagation();
	      if (open) {
	        _this.close();
	      } else if (!disabled) {
	        _this.open();
	      }
	      if (onClick) onClick(e, !open);
	    };

	    _this.keyStack = '';
	    _this.keyTimer = {};
	    var value = props.value,
	        text = props.text,
	        options = props.options;
	    // When options are no objects, convert

	    _this.options = _this.prepareOptions(options);
	    _this.focusIndex = -1;
	    _this.state = {
	      open: false,
	      value: value || (text ? undefined : _this.options[0].value)
	    };
	    return _this;
	  }

	  // options can be either an array of string or an array of object


	  _createClass(Dropdown, [{
	    key: 'prepareOptions',
	    value: function prepareOptions(options) {
	      return options.length > 0 && options[0].label !== undefined ? options : options.map(function (o) {
	        return { label: o, value: o };
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      instances.push(this);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.state.open) this.scrollToChoice(this.state.value);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var value = nextProps.value,
	          options = nextProps.options;

	      this.options = this.prepareOptions(options);
	      if (this.props.value !== value) this.setState({ value: value });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var _this2 = this;

	      instances = instances.filter(function (item) {
	        return item !== _this2;
	      });
	    }

	    // Searches for the items where the selected value fits and returns its label

	  }, {
	    key: 'getRelatedOption',
	    value: function getRelatedOption(value) {
	      return (0, _find2.default)(this.options, function (el) {
	        return el.value === value;
	      });
	    }
	  }, {
	    key: 'scrollToChoice',
	    value: function scrollToChoice(value) {
	      var index = (0, _findIndex2.default)(this.options, function (el) {
	        return value === el.value;
	      });
	      // when found
	      if (index !== -1) this.list.scrollTop = this.list.childNodes[index].offsetTop;
	    }
	  }, {
	    key: 'isSomeOptionFocused',
	    value: function isSomeOptionFocused() {
	      return this.options.some(function (option) {
	        return option.el.isFocused();
	      });
	    }
	  }, {
	    key: 'getDropdownChoice',
	    value: function getDropdownChoice(option, key) {
	      var _this3 = this;

	      var open = this.state.open;

	      var id = option.id,
	          value = option.value,
	          rest = _objectWithoutProperties(option, ['id', 'value']);

	      delete rest.el;
	      return _react2.default.createElement(_DropdownChoice2.default, _extends({
	        open: open,
	        ref: function ref(el) {
	          if (el) {
	            _this3.options[key].el = el;
	          }
	        },
	        key: key,
	        value: value,
	        id: id || 'ui_' + this.props.name + key,
	        selected: this.state.value === value,
	        onCheckedChange: this.handleCheckedChange.bind(this),
	        onBlur: function onBlur() {
	          setTimeout(function () {
	            if (!_this3.isSomeOptionFocused()) _this3.close();
	          }, 0);
	        }
	      }, rest));
	    }
	  }, {
	    key: 'getOption',
	    value: function getOption(option, key) {
	      var value = option.value,
	          id = option.id;

	      return _react2.default.createElement(
	        'option',
	        { value: value, key: key, id: id || '' + this.props.name + key },
	        value
	      );
	    }
	  }, {
	    key: 'clearKeyStack',
	    value: function clearKeyStack() {
	      this.keyStack = '';
	    }

	    // Searches if a label in options starts with the keyStack and returns its value

	  }, {
	    key: 'searchOption',
	    value: function searchOption(searchTerm) {
	      return (0, _find2.default)(this.options, function (item) {
	        return item.label.toString().toLowerCase().startsWith(searchTerm);
	      });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      if (this.state.open) {
	        clearTimeout(this.keyTimer);
	        this.clearKeyStack();
	        this.focusIndex = -1;
	        this.removeEventListener('click', this.handleWindowClick);
	        this.removeEventListener('keydown', this.handleKeyPress);
	        this.setState({ open: false });
	      }
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      if (!this.state.open) {
	        instances.forEach(function (item) {
	          return item.close();
	        });
	        this.addEventListener('click', this.handleWindowClick);
	        this.addEventListener('keydown', this.handleKeyPress);
	        this.setState({ open: true });
	      }
	    }
	  }, {
	    key: 'addEventListener',
	    value: function addEventListener(event, fn) {
	      if (window.addEventListener) {
	        window.addEventListener(event, fn, false);
	      } else if (window.attachEvent) {
	        window.attachEvent(event, fn);
	      }
	    }
	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(event, fn) {
	      if (window.addEventListener) {
	        window.removeEventListener(event, fn, false);
	      } else if (window.attachEvent) {
	        window.detachEvent(event, fn);
	      }
	    }

	    // Called when one clicks anywhere on the window


	    // Called when one clicks on the dropdown. Toggles open state

	  }, {
	    key: 'handleCheckedChange',
	    value: function handleCheckedChange(event, check) {
	      var onSelect = this.props.onSelect;

	      this.setState(check);
	      if (onSelect) onSelect(event, { selected: check.value });
	    }
	  }, {
	    key: 'getUlHeight',
	    value: function getUlHeight() {
	      var _Array$prototype = Array.prototype,
	          reduce = _Array$prototype.reduce,
	          slice = _Array$prototype.slice;

	      var listHeight = 0;
	      if (this.state.open) {
	        var items = slice.call(this.list.childNodes, 0, this.props.maxVisibleItems);
	        listHeight = reduce.call(items, function (acc, item) {
	          return acc + (item.offsetHeight || 0);
	        }, 0);
	      }
	      return listHeight;
	    }
	  }, {
	    key: 'getOverflowY',
	    value: function getOverflowY() {
	      var _props = this.props,
	          options = _props.options,
	          maxVisibleItems = _props.maxVisibleItems;

	      return this.state.open && options.length > maxVisibleItems ? 'scroll' : 'hidden';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _props2 = this.props,
	          text = _props2.text,
	          dark = _props2.dark,
	          inline = _props2.inline,
	          form = _props2.form,
	          id = _props2.id,
	          name = _props2.name,
	          compact = _props2.compact,
	          medium = _props2.medium,
	          disabled = _props2.disabled,
	          widthBasedOnContent = _props2.widthBasedOnContent;
	      var _state = this.state,
	          value = _state.value,
	          open = _state.open;

	      var className = (0, _classnames2.default)('select', {
	        'select--inline': inline,
	        'select--form': form,
	        'select--dark': dark,
	        'select--40': medium,
	        'select--compact': compact,
	        'select--content': widthBasedOnContent,
	        open: open
	      });
	      // Extra padding for ellipsis
	      var textStyles = widthBasedOnContent ? {} : { paddingRight: '1em' };

	      var selectedOption = value && this.getRelatedOption(value);
	      var label = '';
	      var title = '';
	      if (selectedOption) {
	        label = selectedOption.label;
	        title = selectedOption.title || !(0, _isObject2.default)(label) && label;
	      }
	      return _react2.default.createElement(
	        'div',
	        { onClick: this.handleClick, className: className, role: 'menu', tabIndex: '-1' },
	        _react2.default.createElement(
	          'select',
	          {
	            id: id,
	            tabIndex: '-1',
	            'aria-hidden': 'true',
	            style: {
	              position: 'absolute',
	              width: '100%',
	              height: '100%',
	              opacity: 0
	            },
	            name: name,
	            value: value,
	            readOnly: true,
	            disabled: true
	          },
	          this.options.map(this.getOption.bind(this))
	        ),
	        _react2.default.createElement(
	          _Button2.default,
	          {
	            className: (0, _classnames2.default)('select__button', {
	              'button--disabled': disabled && !inline,
	              'select--disabled': disabled && inline
	            }),
	            title: title || text,
	            dark: dark,
	            semantic: true
	          },
	          _react2.default.createElement(
	            'span',
	            { className: 'select__button__text', style: textStyles },
	            label || text
	          ),
	          _react2.default.createElement(_Icon2.default, { type: 'arrow', className: 'select__button__arrow' })
	        ),
	        _react2.default.createElement(
	          'ul',
	          {
	            className: 'select__options',
	            ref: function ref(el) {
	              return _this4.list = el;
	            },
	            id: id && 'ui_' + id,
	            style: {
	              height: this.getUlHeight(),
	              overflowY: this.getOverflowY(),
	              overflowX: 'hidden'
	            }
	          },
	          this.options.map(this.getDropdownChoice.bind(this))
	        )
	      );
	    }
	  }]);

	  return Dropdown;
	}(_react.Component);

	Dropdown.defaultProps = {
	  maxVisibleItems: 5,
	  searchTimeout: 750,
	  widthBasedOnContent: false
	};
	Dropdown.propTypes = {
	  name: _propTypes2.default.string.isRequired,
	  options: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.arrayOf(_propTypes2.default.object), _propTypes2.default.arrayOf(_propTypes2.default.number)]).isRequired,
	  searchTimeout: _propTypes2.default.number,
	  dark: _propTypes2.default.bool,
	  medium: _propTypes2.default.bool,
	  compact: _propTypes2.default.bool,
	  id: _propTypes2.default.string,
	  inline: _propTypes2.default.bool,
	  form: _propTypes2.default.bool,
	  widthBasedOnContent: _propTypes2.default.bool,
	  maxVisibleItems: _propTypes2.default.number,
	  onClick: _propTypes2.default.func,
	  onSelect: _propTypes2.default.func,
	  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	  text: _propTypes2.default.node,
	  disabled: _propTypes2.default.bool
	};
	exports.default = Dropdown;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _isObject = __webpack_require__(27);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DropdownChoice = function (_Component) {
	  _inherits(DropdownChoice, _Component);

	  function DropdownChoice() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, DropdownChoice);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownChoice.__proto__ || Object.getPrototypeOf(DropdownChoice)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      focused: false
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(DropdownChoice, [{
	    key: 'isFocused',
	    value: function isFocused() {
	      return this.state.focused;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          selected = _props.selected,
	          open = _props.open,
	          value = _props.value,
	          onCheckedChange = _props.onCheckedChange,
	          label = _props.label,
	          id = _props.id,
	          disabled = _props.disabled,
	          title = _props.title,
	          _onBlur = _props.onBlur,
	          _onFocus = _props.onFocus,
	          rest = _objectWithoutProperties(_props, ['selected', 'open', 'value', 'onCheckedChange', 'label', 'id', 'disabled', 'title', 'onBlur', 'onFocus']);

	      return _react2.default.createElement(
	        'li',
	        {
	          id: id,
	          className: (0, _classnames2.default)('select__options__item', {
	            'select__options__item--selected': selected,
	            'select__options__item--disabled': disabled
	          })
	        },
	        _react2.default.createElement(
	          'button',
	          _extends({
	            tabIndex: open ? 0 : -1,
	            ref: function ref(el) {
	              return _this2.button = el;
	            },
	            className: 'select__options__item__a',
	            onClick: function onClick(e) {
	              return onCheckedChange(e, { value: value });
	            },
	            style: {
	              textOverflow: 'ellipsis',
	              overflow: 'hidden'
	            },
	            title: title || !(0, _isObject2.default)(label) && label || '',
	            onFocus: function onFocus(e) {
	              _this2.setState({ focused: true });
	              if (_onFocus) _onFocus(e);
	            },
	            onBlur: function onBlur(e) {
	              _this2.setState({ focused: false });
	              if (_onBlur) _onBlur(e);
	            },
	            disabled: disabled
	          }, rest),
	          label
	        )
	      );
	    }
	  }]);

	  return DropdownChoice;
	}(_react.Component);

	DropdownChoice.propTypes = {
	  id: _propTypes2.default.string,
	  label: _propTypes2.default.node.isRequired,
	  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
	  onCheckedChange: _propTypes2.default.func,
	  selected: _propTypes2.default.bool,
	  open: _propTypes2.default.bool,
	  title: _propTypes2.default.string,
	  disabled: _propTypes2.default.bool,
	  onFocus: _propTypes2.default.func,
	  onBlur: _propTypes2.default.func
	};
	DropdownChoice.defaultProps = {
	  disabled: false
	};
	exports.default = DropdownChoice;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hyperlink = function (_React$Component) {
	  _inherits(Hyperlink, _React$Component);

	  function Hyperlink() {
	    _classCallCheck(this, Hyperlink);

	    return _possibleConstructorReturn(this, (Hyperlink.__proto__ || Object.getPrototypeOf(Hyperlink)).apply(this, arguments));
	  }

	  _createClass(Hyperlink, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'a',
	        { className: this.props.class, id: this.props.id, href: this.props.href },
	        this.props.text
	      );
	    }
	  }]);

	  return Hyperlink;
	}(_react2.default.Component);

	Hyperlink.defaultProps = {
	  href: '',
	  target: '',
	  text: 'Button',
	  class: 'hyperlink'
	};
	Hyperlink.propTypes = {
	  href: _propTypes2.default.string.isRequired,
	  text: _propTypes2.default.string.isRequired,
	  class: _propTypes2.default.string.isRequired,
	  id: _propTypes2.default.string
	};
	exports.default = Hyperlink;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Loader;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Loader(props) {
	  var dark = props.dark,
	      small = props.small,
	      value = props.value;

	  var determinate = value !== undefined;

	  var loaderClass = (0, _classnames2.default)('loader', {
	    'loader--dark': dark,
	    determinate: determinate
	  });

	  return _react2.default.createElement(
	    'div',
	    {
	      className: (0, _classnames2.default)({
	        small: small,
	        large: !small,
	        'ibm-spinner-determinate': determinate
	      }),
	      'data-percent': determinate && value
	    },
	    _react2.default.createElement(
	      'svg',
	      { className: loaderClass, viewBox: '25 25 50 50' },
	      _react2.default.createElement('circle', { className: 'loader__path', cx: '50', cy: '50', r: '20' })
	    )
	  );
	}

	Loader.propTypes = {
	  small: _propTypes2.default.bool,
	  dark: _propTypes2.default.bool,
	  value: _propTypes2.default.number
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint "no-undef": 0 */


	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _elementClass = __webpack_require__(91);

	var _elementClass2 = _interopRequireDefault(_elementClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// helpers
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	function removeEventListener(el, event, fn) {
	  if (window.addEventListener) {
	    el.removeEventListener(event, fn, false);
	  } else if (window.attachEvent) {
	    el.detachEvent(event, fn);
	  }
	}

	function addEventListener(el, event, fn) {
	  if (window.addEventListener) {
	    el.addEventListener(event, fn, false);
	  } else if (window.attachEvent) {
	    el.attachEvent(event, fn);
	  }
	}

	function getTransitionEndName() {
	  var el = document.createElement('div');
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'otransitionend',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };

	  var _Object$keys$filter = Object.keys(transitions).filter(function (t) {
	    return el.style[t] !== undefined;
	  }),
	      _Object$keys$filter2 = _slicedToArray(_Object$keys$filter, 1),
	      tKey = _Object$keys$filter2[0];

	  return transitions[tKey];
	}

	var Modal = function (_React$Component) {
	  _inherits(Modal, _React$Component);

	  function Modal(props) {
	    _classCallCheck(this, Modal);

	    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

	    _this.onKeyup = _this.onKeyup.bind(_this);
	    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
	    return _this;
	  }

	  _createClass(Modal, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      (0, _elementClass2.default)(document.body).add('vanilla-modal');
	      addEventListener(this.modal, getTransitionEndName(), this.onTransitionEnd);
	      if (this.props.isOpen) {
	        this.open();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (this.props.isOpen !== prevProps.isOpen) {
	        this.toggle();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      removeEventListener(this.modal, getTransitionEndName(), this.onTransitionEnd);
	      removeEventListener(window, 'keyup', this.onKeyup);
	    }
	  }, {
	    key: 'onTransitionEnd',
	    value: function onTransitionEnd(e) {
	      if (!this.props.isOpen && e.target === this.modal) {
	        this.modal.setAttribute('style', 'display: none');
	      } else if (e.target === this.modal) {
	        this.setTabIndex();
	      }
	    }
	  }, {
	    key: 'onKeyup',
	    value: function onKeyup(e) {
	      if (e.keyCode === 27) {
	        // escape
	        this.props.onRequestClose();
	      }
	    }
	  }, {
	    key: 'setTabIndex',
	    value: function setTabIndex() {
	      this.content.setAttribute('tabindex', '0');
	      this.content.focus();
	    }
	  }, {
	    key: 'getModifier',
	    value: function getModifier() {
	      return this.props.type ? 'modal--' + this.props.type : '';
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      if (canUseDOM) {
	        (0, _elementClass2.default)(document.body).remove('modal-visible');
	        removeEventListener(window, 'keyup', this.onKeyup);
	      }
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      if (canUseDOM) {
	        if (this.modal) {
	          this.modal.setAttribute('style', '');
	        }
	        addEventListener(window, 'keyup', this.onKeyup);
	        setTimeout(function () {
	          // Workaround for transition animation
	          (0, _elementClass2.default)(document.body).add('modal-visible');
	        }, 0);
	      }
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      if (this.props.isOpen) {
	        this.open();
	      } else {
	        this.close();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        {
	          className: 'modal',
	          ref: function ref(el) {
	            return _this2.modal = el;
	          },
	          onClick: this.props.onRequestClose,
	          style: { display: 'none' },
	          role: 'dialog',
	          tabIndex: '-1'
	        },
	        _react2.default.createElement(
	          'div',
	          {
	            className: 'modal-inner',
	            onClick: function onClick(e) {
	              return e.stopPropagation();
	            },
	            role: 'presentation',
	            tabIndex: '-1'
	          },
	          _react2.default.createElement(
	            'div',
	            {
	              className: 'modal-content',
	              ref: function ref(el) {
	                return _this2.content = el;
	              },
	              tabIndex: '0'
	            },
	            _react2.default.createElement(
	              'div',
	              { className: 'modal__container ' + this.getModifier() },
	              this.props.children
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Modal;
	}(_react2.default.Component);

	Modal.propTypes = {
	  isOpen: _propTypes2.default.bool,
	  onRequestClose: _propTypes2.default.func,
	  children: _propTypes2.default.node,
	  type: _propTypes2.default.oneOf(['error', 'warning', 'info'])
	};
	Modal.defaultProps = {
	  isOpen: false,
	  onRequestClose: function onRequestClose(_) {
	    return _;
	  }
	};
	exports.default = Modal;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


	var Popover = function (_Component) {
	  _inherits(Popover, _Component);

	  function Popover() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Popover);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popover.__proto__ || Object.getPrototypeOf(Popover)).call.apply(_ref, [this].concat(args))), _this), _this.handleWindowClick = function (e) {
	      _this.props.onRequestClose(e);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Popover, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (!prevProps.open && this.props.open) {
	        this.addEventListener(window, 'click', this.handleWindowClick);
	      } else {
	        this.removeEventListener(window, 'click', this.handleWindowClick);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.removeEventListener(window, 'click', this.handleWindowClick);
	    }
	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(el, event, fn) {
	      if (el.addEventListener) {
	        el.removeEventListener(event, fn, false);
	      } else if (el.attachEvent) {
	        el.detachEvent(event, fn);
	      }
	    }
	  }, {
	    key: 'addEventListener',
	    value: function addEventListener(el, event, fn) {
	      if (el.addEventListener) {
	        el.addEventListener(event, fn, false);
	      } else if (el.attachEvent) {
	        el.attachEvent(event, fn);
	      }
	    }
	  }, {
	    key: 'renderOption',
	    value: function renderOption(option, i) {
	      var className = option.className,
	          label = option.label,
	          rest = _objectWithoutProperties(option, ['className', 'label']);

	      return _react2.default.createElement(
	        'li',
	        { className: 'popover__item', key: i },
	        _react2.default.createElement(
	          'a',
	          _extends({
	            className: (0, _classnames2.default)('popover__link', className),
	            style: { cursor: 'pointer' }
	          }, rest),
	          label
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          className = _props.className,
	          children = _props.children,
	          open = _props.open,
	          options = _props.options,
	          left = _props.left,
	          top = _props.top,
	          dark = _props.dark,
	          onRequestClose = _props.onRequestClose,
	          rest = _objectWithoutProperties(_props, ['className', 'children', 'open', 'options', 'left', 'top', 'dark', 'onRequestClose']);

	      return _react2.default.createElement(
	        'div',
	        _extends({
	          className: (0, _classnames2.default)(className, 'popover')
	        }, rest),
	        _react2.default.createElement(
	          'div',
	          { className: 'popover__toggle' },
	          children
	        ),
	        _react2.default.createElement(
	          'ul',
	          {
	            className: (0, _classnames2.default)('popover__list', {
	              'popover--show': open,
	              'popover--left': left,
	              'popover--top': top,
	              'popover--dark': dark
	            })
	          },
	          options.map(this.renderOption)
	        )
	      );
	    }
	  }]);

	  return Popover;
	}(_react.Component);

	Popover.propTypes = {
	  open: _propTypes2.default.bool.isRequired,
	  className: _propTypes2.default.string,
	  options: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
	  children: _propTypes2.default.node,
	  onRequestClose: _propTypes2.default.func,
	  top: _propTypes2.default.bool,
	  left: _propTypes2.default.bool,
	  dark: _propTypes2.default.bool
	};
	Popover.defaultProps = {
	  className: '',
	  children: null,
	  onRequestClose: function onRequestClose(_) {
	    return _;
	  },
	  top: false,
	  left: false,
	  dark: false
	};
	exports.default = Popover;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _ProgressBarStep = __webpack_require__(25);

	var _ProgressBarStep2 = _interopRequireDefault(_ProgressBarStep);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProgressBar = function (_Component) {
	  _inherits(ProgressBar, _Component);

	  function ProgressBar() {
	    _classCallCheck(this, ProgressBar);

	    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
	  }

	  _createClass(ProgressBar, [{
	    key: 'renderStep',
	    value: function renderStep(el, i) {
	      var _props = this.props,
	          active = _props.active,
	          completed = _props.completed;

	      return _react2.default.createElement(_ProgressBarStep2.default, _extends({
	        active: i === active,
	        completed: i < completed,
	        key: i
	      }, el.props));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // eslint-disable-next-line no-unused-vars
	      var _props2 = this.props,
	          dark = _props2.dark,
	          children = _props2.children,
	          className = _props2.className,
	          completed = _props2.completed,
	          active = _props2.active,
	          rest = _objectWithoutProperties(_props2, ['dark', 'children', 'className', 'completed', 'active']);

	      return _react2.default.createElement(
	        'ul',
	        _extends({
	          className: (0, _classnames2.default)('progress-bar ' + className, {
	            'progress-bar--dark': dark
	          })
	        }, rest),
	        children.map(this.renderStep.bind(this))
	      );
	    }
	  }]);

	  return ProgressBar;
	}(_react.Component);

	ProgressBar.propTypes = {
	  dark: _propTypes2.default.bool,
	  active: _propTypes2.default.number,
	  completed: _propTypes2.default.number,
	  children: _propTypes2.default.arrayOf(_propTypes2.default.node),
	  className: _propTypes2.default.string
	};
	ProgressBar.defaultProps = {
	  active: 0,
	  completed: 0,
	  className: ''
	};
	exports.default = ProgressBar;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _RadioButton = __webpack_require__(26);

	var _RadioButton2 = _interopRequireDefault(_RadioButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RadioGroup = function (_React$Component) {
	  _inherits(RadioGroup, _React$Component);

	  function RadioGroup() {
	    _classCallCheck(this, RadioGroup);

	    return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
	  }

	  _createClass(RadioGroup, [{
	    key: 'handleCheckedChange',
	    value: function handleCheckedChange(event, check) {
	      if (this.props.onChange) this.props.onChange(event, check);
	    }
	  }, {
	    key: 'renderRadioButton',
	    value: function renderRadioButton(choice) {
	      var _props = this.props,
	          dark = _props.dark,
	          name = _props.name,
	          selected = _props.selected,
	          checked = _props.checked;
	      var value = choice.value,
	          id = choice.id;

	      return _react2.default.createElement(_RadioButton2.default, _extends({
	        key: id,
	        dark: dark,
	        selected: selected === value,
	        name: name,
	        checked: checked && checked(choice),
	        onCheckedChange: this.handleCheckedChange.bind(this)
	      }, choice));
	    }
	  }, {
	    key: 'prepareChoices',
	    value: function prepareChoices(choices, name) {
	      return choices === undefined ? [] : choices.map(function (el, i) {
	        var defaultID = name ? name + i : i.toString();
	        if (Array.isArray(el)) {
	          return {
	            label: el[0],
	            value: el[0],
	            id: defaultID,
	            disabled: el[1] === 'disabled'
	          };
	        } else if (el.label !== undefined) {
	          return _extends({
	            id: defaultID
	          }, el);
	        }
	        return {
	          label: el,
	          value: el,
	          id: defaultID,
	          disabled: false
	        };
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          choices = _props2.choices,
	          name = _props2.name;

	      var fixedChoices = this.prepareChoices(choices, name);
	      return _react2.default.createElement(
	        'div',
	        null,
	        fixedChoices.map(this.renderRadioButton.bind(this))
	      );
	    }
	  }]);

	  return RadioGroup;
	}(_react2.default.Component);

	RadioGroup.propTypes = {
	  name: _propTypes2.default.string.isRequired,
	  choices: _propTypes2.default.array.isRequired,
	  onChange: _propTypes2.default.func,
	  selected: _propTypes2.default.string,
	  dark: _propTypes2.default.bool,
	  checked: _propTypes2.default.func
	};
	exports.default = RadioGroup;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _fixedDataTable = __webpack_require__(124);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ResponsiveTable = function (_React$Component) {
	  _inherits(ResponsiveTable, _React$Component);

	  function ResponsiveTable() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ResponsiveTable);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResponsiveTable.__proto__ || Object.getPrototypeOf(ResponsiveTable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      columnWidths: [],
	      isColumnResizing: false,
	      tableWidth: 1000
	    }, _this.rows = [], _this.columns = [], _this.updateTimer = null, _this.saveData = function (data) {
	      _this.rows = data.rows;
	      if (_this.props.numbered) {
	        _this.rows = data.rows.map(function (row, i) {
	          row.push(i + 1);
	          return row;
	        });
	      }
	      _this.columns = data.columns;
	      _this.updateTableWidth();
	    }, _this.rowGetter = function (rowIndex) {
	      return _this.rows[rowIndex];
	    }, _this.onResize = function () {
	      clearTimeout(_this.updateTimer);
	      _this.updateTimer = setTimeout(_this.update, 16);
	    }, _this.update = function () {
	      var newTableWidth = _this.refs.container.offsetWidth;
	      _this.updateTableWidth(_this.state.columnWidths, newTableWidth);
	    }, _this.onColumnResizeEndCallback = function (newColumnWidth, dataKey) {
	      if (newColumnWidth < _this.props.columnMinWidth) {
	        newColumnWidth = _this.props.columnMinWidth;
	      }
	      var availableTableWidth = _this.getTableWidth();
	      if (_this.props.numbered) {
	        availableTableWidth -= _this.props.numberedColumnWidth;
	      }
	      var columnWidths = _this.state.columnWidths;

	      columnWidths[dataKey] = newColumnWidth;
	      var allColumnsWidth = _this.getSum(columnWidths);
	      var numOfColumns = _this.columns.length;

	      if (allColumnsWidth < availableTableWidth) {
	        var numOfAffectedColumns = numOfColumns - dataKey - 1;
	        var delta = availableTableWidth - allColumnsWidth;
	        var columnDelta = Math.round(delta / numOfAffectedColumns);
	        columnWidths = columnWidths.map(function (width, key) {
	          if (key > dataKey) {
	            width += columnDelta;
	          }
	          return Math.max(width, _this.props.columnMinWidth);
	        });
	        if (numOfAffectedColumns > 0) {
	          var lastColumnDelta = delta - columnDelta * numOfAffectedColumns;
	          columnWidths[columnWidths.length - 1] += lastColumnDelta;
	        }
	      }
	      _this.updateState({
	        columnWidths: columnWidths,
	        isColumnResizing: false,
	        tableWidth: _this.state.tableWidth
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ResponsiveTable, [{
	    key: 'updateState',
	    value: function updateState(newState) {
	      var columnWidths = newState.columnWidths;
	      var columnMinWidth = this.props.columnMinWidth;

	      columnWidths = columnWidths.map(function (width) {
	        return Math.max(width, columnMinWidth);
	      });
	      this.setState(_extends({}, newState, {
	        columnWidths: columnWidths
	      }));
	    }
	  }, {
	    key: 'getAllColumnsWidth',
	    value: function getAllColumnsWidth() {
	      return this.state.columnWidths.reduce(function (acc, num) {
	        return acc + num;
	      });
	    }
	  }, {
	    key: 'getTableWidth',
	    value: function getTableWidth() {
	      return this.state.tableWidth;
	    }
	  }, {
	    key: 'getTableHeight',
	    value: function getTableHeight() {
	      var tableBodyHeight = this.props.numberOfVisibleRows * this.props.rowHeight;
	      var scrollBar = 17;
	      var height = tableBodyHeight + this.props.headerHeight + scrollBar;
	      if (this.props.height > -1) {
	        height = this.props.height;
	      }
	      return height;
	    }
	  }, {
	    key: 'getMinTableWidth',
	    value: function getMinTableWidth() {
	      return this.columns.length * this.props.columnMinWidth;
	    }
	  }, {
	    key: 'getSum',
	    value: function getSum(array) {
	      return array.reduce(function (acc, num) {
	        return acc + num;
	      }, 0);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dataSource(this.saveData);
	      var win = window;
	      if (win.addEventListener) {
	        win.addEventListener('resize', this.onResize, false);
	      } else if (win.attachEvent) {
	        win.attachEvent('onresize', this.onResize);
	      } else {
	        win.onresize = this.onResize;
	      }
	      this.update();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var win = window;
	      if (win.removeEventListener) {
	        win.removeEventListener('resize', this.onResize, false);
	      } else if (win.detachEvent) {
	        win.detachEvent('onresize', this.onResize);
	      } else {
	        win.onresize = null;
	      }
	    }
	  }, {
	    key: 'updateTableWidth',
	    value: function updateTableWidth() {
	      var columnWidths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      var newTableWidth = arguments[1];

	      var allColumnsWidth = this.getSum(columnWidths);
	      var numOfColumns = this.columns.length;
	      var minTableWidth = this.getMinTableWidth();

	      if (!newTableWidth) {
	        newTableWidth = this.getTableWidth();
	      }

	      var currentTableWidth = this.getTableWidth();
	      var tableDelta = newTableWidth - currentTableWidth;

	      var availableTableWidth = newTableWidth;
	      if (this.props.numbered) {
	        availableTableWidth -= this.props.numberedColumnWidth;
	      }

	      // initial state
	      if (allColumnsWidth === 0) {
	        columnWidths = [];
	        for (var i = numOfColumns; i > 0; i--) {
	          columnWidths.push(Math.floor(availableTableWidth / this.columns.length));
	        }
	        allColumnsWidth = this.getSum(columnWidths);
	      }

	      // table resize
	      if (tableDelta !== 0 && newTableWidth > minTableWidth) {
	        var columnDelta = Math.round(tableDelta / numOfColumns);
	        columnWidths = columnWidths.map(function (width) {
	          return width + columnDelta;
	        });
	      }

	      // change width of the last column becouse of the Math.floor
	      allColumnsWidth = this.getSum(columnWidths);
	      var lastColumnDelta = availableTableWidth - allColumnsWidth;
	      var lastColumnIndex = columnWidths.length - 1;
	      var lastColumnWidth = columnWidths[lastColumnIndex] + lastColumnDelta;
	      columnWidths[lastColumnIndex] = lastColumnWidth;

	      // save new table size and updated size of columns
	      this.updateState({
	        tableWidth: newTableWidth,
	        isColumnResizing: false,
	        columnWidths: columnWidths
	      });
	    }
	  }, {
	    key: 'getNumberedColumn',
	    value: function getNumberedColumn() {
	      var columns = [];
	      if (this.props.numbered) {
	        columns.push(_react2.default.createElement(_fixedDataTable.Column, {
	          label: '',
	          fixed: true,
	          width: this.props.numberedColumnWidth,
	          key: this.columns.length,
	          dataKey: this.columns.length,
	          align: 'center',
	          cellClassName: 'public_fixedDataTableCell_fixed',
	          headerClassName: 'public_fixedDataTableCell_fixed',
	          cell: function cell(_ref2) {
	            var rowIndex = _ref2.rowIndex,
	                props = _objectWithoutProperties(_ref2, ['rowIndex']);

	            return _react2.default.createElement(
	              _fixedDataTable.Cell,
	              props,
	              rowIndex + 1
	            );
	          }
	        }));
	      }
	      return columns;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { ref: 'container' },
	        _react2.default.createElement(
	          _fixedDataTable.Table,
	          _extends({}, this.props, {
	            rowsCount: this.rows.length,
	            width: this.state.tableWidth,
	            height: this.getTableHeight(),
	            onColumnResizeEndCallback: this.onColumnResizeEndCallback,
	            isColumnResizing: this.state.isColumnResizing
	          }),
	          this.getNumberedColumn().concat(this.columns.map(function (column, i) {
	            return _react2.default.createElement(_fixedDataTable.Column, {
	              key: i,
	              columnKey: i,
	              header: _react2.default.createElement(
	                _fixedDataTable.Cell,
	                null,
	                column.label
	              ),
	              width: _this2.state.columnWidths[i],
	              dataKey: i,
	              isResizable: i < _this2.columns.length - 1,
	              cell: function cell(_ref3) {
	                var rowIndex = _ref3.rowIndex,
	                    props = _objectWithoutProperties(_ref3, ['rowIndex']);

	                return _react2.default.createElement(
	                  _fixedDataTable.Cell,
	                  props,
	                  _this2.rowGetter(rowIndex)[i]
	                );
	              }
	            });
	          }))
	        )
	      );
	    }
	  }]);

	  return ResponsiveTable;
	}(_react2.default.Component);

	ResponsiveTable.defaultProps = {
	  rowHeight: 50,
	  headerHeight: 50,
	  columnMinWidth: 100,
	  numbered: false,
	  numberedColumnWidth: 50,
	  numberOfVisibleRows: 10
	};
	ResponsiveTable.propTypes = {
	  rowHeight: _propTypes2.default.number,
	  headerHeight: _propTypes2.default.number,
	  columnMinWidth: _propTypes2.default.number,
	  numbered: _propTypes2.default.bool,
	  numberedColumnWidth: _propTypes2.default.number,
	  numberOfVisibleRows: _propTypes2.default.number,
	  height: _propTypes2.default.number,
	  dataSource: _propTypes2.default.func
	};
	exports.default = ResponsiveTable;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _nouislider = __webpack_require__(125);

	var _nouislider2 = _interopRequireDefault(_nouislider);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document */


	var Slider = function (_React$Component) {
	  _inherits(Slider, _React$Component);

	  function Slider() {
	    _classCallCheck(this, Slider);

	    return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
	  }

	  _createClass(Slider, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.slider.noUiSlider.set(nextProps.start);
	    }
	  }, {
	    key: 'appendInput',
	    value: function appendInput(el, title, sliderClass, wrapperClass) {
	      var input = document.createElement('input');
	      input.type = 'number';
	      input.className = 'text--light ' + sliderClass + ' text--input';
	      input.title = title;
	      if (this.props.disabled) input.setAttribute('disabled', true);
	      input.setAttribute('style', 'width: auto');
	      input.setAttribute('role', 'slider');
	      input.setAttribute('touched', 'false');
	      input.addEventListener('change', this.handleInputChange.bind(this));
	      input.addEventListener('click', function () {
	        input.focus();
	      });
	      el.getElementsByClassName(wrapperClass)[0].appendChild(input);
	      return input;
	    }
	  }, {
	    key: 'handleInputChange',
	    value: function handleInputChange(e) {
	      var newValue = e.target.value;
	      // Check if value is valid
	      if (!newValue) {
	        // if not revert
	        this.updateInputs();
	      } else {
	        this.slider.noUiSlider.set(this.upperInput ? [this.lowerInput.value, this.upperInput.value] : this.lowerInput.value);
	        this.handleSliderChange(e);
	      }
	    }

	    // XXX Deprecated but neccessary

	  }, {
	    key: 'initializeInputs',
	    value: function initializeInputs(el) {
	      var start = this.props.start;

	      this.lowerInput = this.appendInput(el, (typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object' ? 'Range Minimum' : 'Range Amount Choice', 'text--slider', 'noUi-handle-lower');
	      if ((typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object') {
	        this.upperInput = this.appendInput(el, 'Range Maximum', 'text--right', 'noUi-handle-upper');
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props,
	          start = _props.start,
	          step = _props.step,
	          lower = _props.lower,
	          upper = _props.upper;

	      var connect = (typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object' ? true : this.props.connect;

	      var el = this.slider;
	      _nouislider2.default.create(el, {
	        start: start,
	        connect: connect,
	        range: {
	          min: lower,
	          max: upper
	        },
	        step: Number(step)
	      });
	      this.initializeInputs(el);

	      el.noUiSlider.on('update', this.updateInputs.bind(this));
	      el.noUiSlider.on('change', this.handleSliderChange.bind(this));
	    }

	    // Updates inputs to noUiSlider values

	  }, {
	    key: 'updateInputs',
	    value: function updateInputs() {
	      var convertedValue = void 0;
	      if (_typeof(this.props.start) === 'object') {
	        convertedValue = this.slider.noUiSlider.get().map(Number);
	        this.lowerInput.value = convertedValue[0];
	        this.upperInput.value = convertedValue[1];
	      } else {
	        convertedValue = Number(this.slider.noUiSlider.get());
	        this.lowerInput.value = convertedValue;
	      }
	    }

	    // Fire on change event if present

	  }, {
	    key: 'handleSliderChange',
	    value: function handleSliderChange(event) {
	      var onChange = this.props.onChange;

	      if (onChange) {
	        var value = this.upperInput ? [this.lowerInput.value, this.upperInput.value] : this.lowerInput.value;
	        onChange(event, value);
	      }
	    }
	  }, {
	    key: 'getRangeElement',
	    value: function getRangeElement(rangeValue, bottom) {
	      var dark = this.props.dark;

	      var classNames = (0, _classnames2.default)('text--slider', {
	        'text--dark': dark,
	        'text--light': !dark,
	        'text--bottom': bottom,
	        'text--top': !bottom
	      });
	      return _react2.default.createElement(
	        'p',
	        { className: classNames, title: 'Range ' + (bottom ? 'Bottom' : 'Top') },
	        rangeValue
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props2 = this.props,
	          lower = _props2.lower,
	          upper = _props2.upper,
	          disabled = _props2.disabled,
	          hideValue = _props2.hideValue,
	          start = _props2.start,
	          dark = _props2.dark,
	          id = _props2.id;

	      var className = (0, _classnames2.default)('slider noUi-target noUi-ltr noUi-horizontal text--before', {
	        'noUi-connect': (typeof start === 'undefined' ? 'undefined' : _typeof(start)) !== 'object',
	        'noinput--view': hideValue,
	        'noUi-background': (typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object',
	        'slider--range': (typeof start === 'undefined' ? 'undefined' : _typeof(start)) === 'object',
	        'slider--dark': dark
	      });
	      return _react2.default.createElement(
	        'div',
	        {
	          id: id,
	          ref: function ref(el) {
	            return _this2.slider = el;
	          },
	          className: className,
	          disabled: disabled
	        },
	        this.getRangeElement(lower, true),
	        this.getRangeElement(upper, false)
	      );
	    }
	  }]);

	  return Slider;
	}(_react2.default.Component);

	Slider.defaultProps = {
	  connect: 'lower',
	  start: 0,
	  step: 1,
	  lower: 0,
	  upper: 100
	};
	Slider.propTypes = {
	  // Start can either be array (object) or number
	  start: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.number)]),
	  lower: _propTypes2.default.number,
	  upper: _propTypes2.default.number,
	  step: _propTypes2.default.number,
	  disabled: _propTypes2.default.bool,
	  hideValue: _propTypes2.default.bool,
	  connect: _propTypes2.default.string,
	  onChange: _propTypes2.default.func,
	  dark: _propTypes2.default.bool,
	  id: _propTypes2.default.string
	};
	exports.default = Slider;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _TabsPanel = __webpack_require__(59);

	var _TabsPanel2 = _interopRequireDefault(_TabsPanel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Validator for Panel type
	var panelType = _propTypes2.default.shape({
	  type: _propTypes2.default.oneOf([_TabsPanel2.default])
	});

	var Tabs = function (_React$Component) {
	  _inherits(Tabs, _React$Component);

	  function Tabs(props) {
	    _classCallCheck(this, Tabs);

	    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

	    if (!props.children) {
	      throw new Error('Tabs must contain at least one Tabs.Panel.');
	    }
	    var children = props.children;

	    if (!children.length) children = [children];
	    var activeItems = children.filter(function (item) {
	      return item.isActive;
	    }).concat(children[0]); // show the first tab if active tab is not specified
	    _this.state = { activeTab: activeItems[0].props.id };
	    return _this;
	  }

	  _createClass(Tabs, [{
	    key: 'showTabPanel',
	    value: function showTabPanel(e, id) {
	      this.setState({ activeTab: id });
	      this.props.onTabClickHandler(e, id);
	    }
	  }, {
	    key: 'isTabActive',
	    value: function isTabActive(id) {
	      var isActive = this.props.isTabActive(id);
	      if (isActive === null) {
	        isActive = this.state.activeTab === id;
	      }
	      return isActive;
	    }
	  }, {
	    key: 'renderList',
	    value: function renderList(items) {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'ul',
	        {
	          role: 'tablist',
	          className: (0, _classnames2.default)('tabs__list', {
	            'tabs__list--vertical': this.props.vertical
	          })
	        },
	        items.map(function (item) {
	          return _react2.default.createElement(
	            'li',
	            {
	              tabIndex: 1,
	              className: (0, _classnames2.default)('tabs__tab', {
	                'tabs__tab--vertical': _this2.props.vertical
	              }),
	              key: item.props.id,
	              id: item.props.id,
	              'aria-controls': item.props.id + '-panel',
	              'aria-selected': _this2.isTabActive(item.props.id),
	              onClick: function onClick(e) {
	                return _this2.showTabPanel(e, item.props.id);
	              }
	            },
	            item.props.title
	          );
	        })
	      );
	    }
	  }, {
	    key: 'renderPanels',
	    value: function renderPanels(items) {
	      var _this3 = this;

	      return _react2.default.createElement(
	        'div',
	        null,
	        items.map(function (item) {
	          return _react2.default.createElement('div', {
	            role: 'tabpanel',
	            className: (0, _classnames2.default)('tabs__tabpanel', {
	              'tabs__tabpanel--vertical': _this3.props.vertical
	            }),
	            key: item.props.id + '-panel',
	            id: item.props.id + '-panel',
	            'aria-labelledby': item.props.id,
	            'aria-hidden': !_this3.isTabActive(item.props.id),
	            children: item.props.children
	          });
	        })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      if (!children.length) children = [children];
	      return _react2.default.createElement(
	        'div',
	        {
	          className: (0, _classnames2.default)('tabs', {
	            'tabs--dark': this.props.dark,
	            'tabs--dark--alt': this.props.darkAlt,
	            'tabs--vertical': this.props.vertical
	          })
	        },
	        this.renderList(children),
	        this.renderPanels(children)
	      );
	    }
	  }]);

	  return Tabs;
	}(_react2.default.Component);

	Tabs.Panel = _TabsPanel2.default;
	Tabs.propTypes = {
	  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(panelType), panelType]),
	  dark: _propTypes2.default.bool,
	  darkAlt: _propTypes2.default.bool,
	  vertical: _propTypes2.default.bool,
	  isTabActive: _propTypes2.default.func,
	  onTabClickHandler: _propTypes2.default.func
	};
	Tabs.defaultProps = {
	  isTabActive: function isTabActive() {
	    return null;
	  },
	  onTabClickHandler: function onTabClickHandler() {
	    return null;
	  }
	};
	exports.default = Tabs;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Panel;

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  children: _propTypes2.default.node,
	  isActive: _propTypes2.default.bool,
	  id: _propTypes2.default.string,
	  title: _propTypes2.default.string.isRequired
	};

	function Panel() {
	  throw new Error('It is not allowed to use Tabs.Panel element outside of Tabs block');
	}

	Panel.propTypes = propTypes;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = NumberCloseButton;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  onReset: _propTypes2.default.func
	};

	function NumberCloseButton(props) {
	  return _react2.default.createElement(
	    'div',
	    {
	      className: 'number__close',
	      onClick: props.onReset
	    },
	    _react2.default.createElement(
	      'svg',
	      {
	        className: 'numpinput__close',
	        x: '0px',
	        y: '0px',
	        width: '18.5px',
	        height: '18px',
	        viewBox: '0 0 18.5 18',
	        style: { enableBackground: 'new 0 0 18.5 18' },
	        xmlSpace: 'preserve'
	      },
	      _react2.default.createElement('rect', {
	        className: 'numpinput__close__hover',
	        width: '18.5',
	        height: '18'
	      })
	    ),
	    _react2.default.createElement(
	      'svg',
	      {
	        className: 'numpinput__close',
	        x: '0px',
	        y: '0px',
	        width: '18.5px',
	        height: '18px',
	        viewBox: '0 0 18.5 18',
	        style: { enableBackground: 'new 0 0 18.5 18' },
	        xmlSpace: 'preserve'
	      },
	      _react2.default.createElement('path', {
	        className: 'numpinput__close__x',
	        d: 'M10.7,9l4.6,4.6L13.9,15l-4.6-4.6L4.7,15l-1.4-1.4L7.8,9L3.2,4.4L4.7,3l4.6,4.6L13.9,3l1.4,1.4L10.7,9z' })
	    )
	  );
	}

	NumberCloseButton.propTypes = propTypes;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = NumberSpinner;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var propTypes = {
	  onIncrease: _propTypes2.default.func,
	  onDecrease: _propTypes2.default.func
	};

	function NumberSpinner(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'number__spinnerdiv' },
	    _react2.default.createElement(
	      'svg',
	      {
	        className: 'numpinput__spinner__top',
	        x: '0px',
	        y: '0px',
	        width: '18px',
	        height: '16px',
	        viewBox: '0 0 18 16',
	        style: { enableBackground: 'new 0 0 18 16' },
	        xmlSpace: 'preserve',
	        onClick: props.onIncrease
	      },
	      _react2.default.createElement('rect', { className: 'numinputhovertop', width: '18', height: '16' }),
	      _react2.default.createElement('polygon', {
	        className: 'numinputtop',
	        points: '12.5,11.2 9,7.6 5.5,11.2 4.1,9.8 9,4.8 13.9,9.8'
	      })
	    ),
	    _react2.default.createElement(
	      'svg',
	      {
	        className: 'numpinput__spinner__bottom',
	        x: '0px',
	        y: '0px',
	        width: '18px',
	        height: '16px',
	        viewBox: '0 0 18 16',
	        style: { enableBackground: 'new 0 0 18 16' },
	        xmlSpace: 'preserve',
	        onClick: props.onDecrease
	      },
	      _react2.default.createElement('rect', { className: 'numinputhoverbottom', width: '18', height: '16' }),
	      _react2.default.createElement('polygon', {
	        className: 'numinputbottom',
	        points: '9,11.2 4.1,6.2 5.5,4.8 9,8.4 12.5,4.8 13.9,6.2'
	      })
	    )
	  );
	}

	NumberSpinner.propTypes = propTypes;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _ibmColors = __webpack_require__(42);

	var _ibmColors2 = _interopRequireDefault(_ibmColors);

	var _Icon = __webpack_require__(6);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _NumberSpinner = __webpack_require__(61);

	var _NumberSpinner2 = _interopRequireDefault(_NumberSpinner);

	var _NumberCloseButton = __webpack_require__(60);

	var _NumberCloseButton2 = _interopRequireDefault(_NumberCloseButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextField = function (_Component) {
	  _inherits(TextField, _Component);

	  function TextField(props) {
	    _classCallCheck(this, TextField);

	    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

	    _this.state = {
	      focused: false,
	      selected: false,
	      length: props.value && props.value.toString().length || 0
	    };
	    _this.isTextarea = props.type === 'textarea';
	    _this.isNumber = !!props.numberInput;
	    return _this;
	  }

	  _createClass(TextField, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value !== undefined) {
	        this.setState({
	          length: nextProps.value.toString().length
	        });
	      }
	    }
	  }, {
	    key: 'getElementName',
	    value: function getElementName() {
	      return this.isTextarea ? 'textarea' : 'input';
	    }
	  }, {
	    key: 'getTextFieldClasses',
	    value: function getTextFieldClasses() {
	      var _cx;

	      var baseClass = this.isTextarea ? 'textarea' : 'text';
	      return (0, _classnames2.default)('text', (_cx = {}, _defineProperty(_cx, baseClass + '--dark', this.props.dark), _defineProperty(_cx, baseClass + '--light', !this.props.dark), _defineProperty(_cx, 'textarea--autosize', this.isTextarea), _defineProperty(_cx, 'haslabel', this.hasLabel()), _defineProperty(_cx, 'nolabel', this.props.disabledPlaceholderAnimation), _defineProperty(_cx, 'selected', this.state.selected), _defineProperty(_cx, 'error', this.hasError()), _cx));
	    }
	  }, {
	    key: 'getLabelClasses',
	    value: function getLabelClasses() {
	      return (0, _classnames2.default)({
	        'label__text--dark': this.props.dark,
	        'label__text--light': !this.props.dark,
	        'active-label': this.state.focused || this.state.length > 0,
	        required: this.props.required
	      });
	    }
	  }, {
	    key: 'getMsgClass',
	    value: function getMsgClass() {
	      return 'form__validation--' + this.props.msg.type;
	    }
	  }, {
	    key: 'getNumberFieldHolderClass',
	    value: function getNumberFieldHolderClass() {
	      return 'number__has' + this.props.numberInput;
	    }
	  }, {
	    key: 'getNumberFieldClasses',
	    value: function getNumberFieldClasses() {
	      return (0, _classnames2.default)('number', {
	        'number--light': !this.props.dark,
	        'number--dark': this.props.dark
	      });
	    }
	  }, {
	    key: 'getPlaceholder',
	    value: function getPlaceholder() {
	      return this.state.focused ? '' : this.props.placeholder;
	    }
	  }, {
	    key: 'hasLabel',
	    value: function hasLabel() {
	      return !this.isTextarea && !this.isNumber && !this.props.disabledPlaceholderAnimation;
	    }
	  }, {
	    key: 'hasError',
	    value: function hasError() {
	      return this.props.msg && this.props.msg.type === 'invalid';
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid() {
	      return this.props.msg && this.props.msg.type === 'valid';
	    }
	  }, {
	    key: 'hasMsg',
	    value: function hasMsg() {
	      return !this.isTextarea && this.props.msg && this.props.msg.type;
	    }
	  }, {
	    key: 'hasCounter',
	    value: function hasCounter() {
	      return this.props.maxCount;
	    }
	  }, {
	    key: 'hasFormValidation',
	    value: function hasFormValidation() {
	      return this.props.formValidation;
	    }
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur(e) {
	      this.setState({ focused: false, selected: true });
	      if (this.props.onBlur) this.props.onBlur(e);
	    }
	  }, {
	    key: 'handleFocus',
	    value: function handleFocus(e) {
	      this.setState({ focused: true });
	      if (this.props.onFocus) this.props.onFocus(e);
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(e) {
	      this.setState({ length: e.target.value.length });
	      if (this.props.onChange) this.props.onChange(e);
	    }
	  }, {
	    key: 'renderLabel',
	    value: function renderLabel() {
	      return _react2.default.createElement(
	        'label',
	        { htmlFor: this.props.id, className: this.getLabelClasses() },
	        this.props.placeholder
	      );
	    }
	  }, {
	    key: 'renderTextField',
	    value: function renderTextField() {
	      var _props = this.props,
	          msg = _props.msg,
	          dark = _props.dark,
	          maxCount = _props.maxCount,
	          disabledPlaceholderAnimation = _props.disabledPlaceholderAnimation,
	          rest = _objectWithoutProperties(_props, ['msg', 'dark', 'maxCount', 'disabledPlaceholderAnimation']);

	      return _react2.default.createElement(this.getElementName(), _extends({}, rest, {
	        type: this.isTextarea ? '' : this.props.type,
	        placeholder: this.getPlaceholder(),
	        className: this.getTextFieldClasses(),
	        onBlur: this.handleBlur.bind(this),
	        onFocus: this.handleFocus.bind(this),
	        onChange: this.handleChange.bind(this)
	      }));
	    }
	  }, {
	    key: 'renderNumberField',
	    value: function renderNumberField() {
	      var _props2 = this.props,
	          msg = _props2.msg,
	          dark = _props2.dark,
	          maxCount = _props2.maxCount,
	          numberInput = _props2.numberInput,
	          onIncrease = _props2.onIncrease,
	          onDecrease = _props2.onDecrease,
	          disabledPlaceholderAnimation = _props2.disabledPlaceholderAnimation,
	          rest = _objectWithoutProperties(_props2, ['msg', 'dark', 'maxCount', 'numberInput', 'onIncrease', 'onDecrease', 'disabledPlaceholderAnimation']);

	      var input = _react2.default.createElement('input', _extends({}, rest, {
	        className: this.getNumberFieldClasses()
	      }));

	      if (this.props.numberInput) {
	        input = _react2.default.createElement(
	          'div',
	          { className: this.getNumberFieldHolderClass() },
	          input,
	          this.props.numberInput === 'spinner' && _react2.default.createElement(_NumberSpinner2.default, this.props),
	          this.props.numberInput === 'close' && _react2.default.createElement(_NumberCloseButton2.default, this.props)
	        );
	      }
	      return input;
	    }
	  }, {
	    key: 'renderMsg',
	    value: function renderMsg() {
	      return _react2.default.createElement(
	        'p',
	        { className: 'form__validation', style: { display: 'block' } },
	        _react2.default.createElement(
	          'span',
	          { className: this.getMsgClass() },
	          this.props.msg.text,
	          this.hasError() && _react2.default.createElement(_Icon2.default, { type: 'error-o', className: 'icon--24 icon--validate', fill: _ibmColors2.default.red['50'] }),
	          this.isValid() && _react2.default.createElement(_Icon2.default, { type: 'success-o', className: 'icon--24 icon--validate', fill: _ibmColors2.default.green['50'] })
	        )
	      );
	    }
	  }, {
	    key: 'renderCounter',
	    value: function renderCounter() {
	      if (this.props.maxCount) {
	        return _react2.default.createElement(
	          'span',
	          { className: 'counter text__counter' },
	          this.props.maxCount - this.state.length
	        );
	      } else if (this.props.formValidation) {
	        return _react2.default.createElement(
	          'p',
	          { className: 'form__validation' },
	          _react2.default.createElement(
	            'span',
	            { className: 'form__validation--info' },
	            this.props.formValidation[0]
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'form__validation--invalid' },
	            this.props.formValidation[1]
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'form__validation--valid' },
	            this.props.formValidation[2]
	          )
	        );
	      }
	      return _react2.default.createElement('span', null);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var field = !this.isNumber ? this.renderTextField() : this.renderNumberField();
	      return _react2.default.createElement(
	        'div',
	        null,
	        this.hasLabel() && this.renderLabel(),
	        field,
	        this.hasMsg() && this.renderMsg(),
	        (this.hasCounter() || this.hasFormValidation()) && this.renderCounter()
	      );
	    }
	  }]);

	  return TextField;
	}(_react.Component);

	TextField.propTypes = {
	  id: _propTypes2.default.string,
	  type: _propTypes2.default.oneOf(['text', 'textarea', 'number', 'email', 'hidden', 'password', 'search', 'tel', 'url']),
	  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	  maxCount: _propTypes2.default.number,
	  placeholder: _propTypes2.default.string,
	  style: _propTypes2.default.object,
	  required: _propTypes2.default.bool,
	  formValidation: _propTypes2.default.arrayOf(_propTypes2.default.func),
	  rows: _propTypes2.default.number,
	  dark: _propTypes2.default.bool,
	  disabledPlaceholderAnimation: _propTypes2.default.bool,
	  disabled: _propTypes2.default.bool,
	  onChange: _propTypes2.default.func,
	  onFocus: _propTypes2.default.func,
	  onBlur: _propTypes2.default.func,
	  msg: _propTypes2.default.shape({
	    type: _propTypes2.default.oneOf(['info', 'valid', 'invalid']).isRequired,
	    text: _propTypes2.default.string
	  }),
	  numberInput: _propTypes2.default.oneOf(['spinner', 'close']),
	  onIncrease: _propTypes2.default.func,
	  onDecrease: _propTypes2.default.func,
	  onReset: _propTypes2.default.func
	};
	TextField.defaultProps = {
	  type: 'text',
	  required: false
	};
	exports.default = TextField;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _CheckboxInput = __webpack_require__(24);

	var _CheckboxInput2 = _interopRequireDefault(_CheckboxInput);

	var _Icon = __webpack_require__(6);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox = function (_Component) {
	  _inherits(Checkbox, _Component);

	  function Checkbox() {
	    _classCallCheck(this, Checkbox);

	    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	  }

	  _createClass(Checkbox, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          wrapperClass = _props.wrapperClass,
	          inputClass = _props.inputClass,
	          rest = _objectWithoutProperties(_props, ['wrapperClass', 'inputClass']);

	      return _react2.default.createElement(
	        'div',
	        { className: wrapperClass },
	        _react2.default.createElement(_CheckboxInput2.default, _extends({}, rest, {
	          toggle: true,
	          customClass: inputClass
	        })),
	        _react2.default.createElement(
	          'label',
	          { htmlFor: this.props.id },
	          _react2.default.createElement(_Icon2.default, { type: 'check', className: 'toggle__checkbox' })
	        )
	      );
	    }
	  }]);

	  return Checkbox;
	}(_react.Component);

	Checkbox.propTypes = {
	  checked: _propTypes2.default.bool,
	  dark: _propTypes2.default.bool,
	  id: _propTypes2.default.string.isRequired,
	  inputClass: _propTypes2.default.string,
	  onChange: _propTypes2.default.func,
	  wrapperClass: _propTypes2.default.string
	};
	Checkbox.defaultProps = {
	  wrapperClass: ''
	};
	exports.default = Checkbox;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _RenderIntoContainer = __webpack_require__(65);

	var _RenderIntoContainer2 = _interopRequireDefault(_RenderIntoContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document window */


	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	var Tooltip = function (_React$Component) {
	  _inherits(Tooltip, _React$Component);

	  function Tooltip() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Tooltip);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      shouldRender: false,
	      isVisible: false
	    }, _this.handleScroll = function () {
	      _this.hideTooltip();
	      if (_this.props.scrollableContainer) {
	        _this.removeEventListener(_this.props.scrollableContainer, 'scroll', _this.handleScroll);
	      }
	    }, _this.handleTransitionEnd = function () {
	      _this.clearEvents();
	      _this.setState({ shouldRender: false });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Tooltip, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.isVisible !== undefined) {
	        this.toggleTooltip(nextProps.isVisible);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.timer);
	      this.clearEvents();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      /* this.tooltip is available after first render, so to calculate
	       * tooltipStyles we need to render again
	       * call toggleTooltip to achieve this, since calling render without
	       * state change will not modify DOM
	       */
	      this.toggleTooltip(this.props.isVisible);
	    }
	  }, {
	    key: 'removeEventListener',
	    value: function removeEventListener(el, event, fn) {
	      if (el.addEventListener) {
	        el.removeEventListener(event, fn, false);
	      } else if (el.attachEvent) {
	        el.detachEvent(event, fn);
	      }
	    }
	  }, {
	    key: 'addEventListener',
	    value: function addEventListener(el, event, fn) {
	      if (el.addEventListener) {
	        el.addEventListener(event, fn, false);
	      } else if (el.attachEvent) {
	        el.attachEvent(event, fn);
	      }
	    }
	  }, {
	    key: 'toggleTooltip',
	    value: function toggleTooltip(isVisible) {
	      if (isVisible) {
	        this.showTooltip();
	      } else {
	        this.hideTooltip();
	      }
	    }
	  }, {
	    key: 'showTooltip',
	    value: function showTooltip() {
	      var _this2 = this;

	      this.timer = setTimeout(function () {
	        if (_this2.props.renderIntoBody) {
	          _this2.setState({ shouldRender: true }, function () {
	            if (_this2.props.scrollableContainer) {
	              _this2.addEventListener(_this2.props.scrollableContainer, 'scroll', _this2.handleScroll);
	            }
	            _this2.setState({ isVisible: true });
	          });
	        } else {
	          _this2.setState({ isVisible: true });
	        }
	      }, this.props.delay * 1000);
	    }
	  }, {
	    key: 'hideTooltip',
	    value: function hideTooltip() {
	      clearTimeout(this.timer);
	      this.setState({ isVisible: false });
	      if (this.tooltipDetails && this.props.renderIntoBody && canUseDOM) {
	        var event = this.getTransitionEndName();
	        this.addEventListener(this.tooltipDetails, event, this.handleTransitionEnd);
	      }
	    }
	  }, {
	    key: 'clearEvents',
	    value: function clearEvents() {
	      if (canUseDOM) {
	        var event = this.getTransitionEndName();
	        if (this.tooltipDetails) {
	          this.removeEventListener(this.tooltipDetails, event, this.handleTransitionEnd);
	        }
	        this.removeEventListener(this.props.scrollableContainer, 'scroll', this.handleScroll);
	      }
	    }
	  }, {
	    key: 'getTransitionEndName',
	    value: function getTransitionEndName() {
	      var el = document.createElement('div');
	      var transitions = {
	        transition: 'transitionend',
	        OTransition: 'otransitionend',
	        MozTransition: 'transitionend',
	        WebkitTransition: 'webkitTransitionEnd'
	      };

	      var _Object$keys$filter = Object.keys(transitions).filter(function (t) {
	        return el.style[t] !== undefined;
	      }),
	          _Object$keys$filter2 = _slicedToArray(_Object$keys$filter, 1),
	          tKey = _Object$keys$filter2[0];

	      return transitions[tKey];
	    }
	  }, {
	    key: 'getOffsetDirection',
	    value: function getOffsetDirection() {
	      return {
	        top: 'top',
	        right: 'left',
	        bottom: 'bottom',
	        left: 'left'
	      }[this.props.position];
	    }
	  }, {
	    key: 'getTransform',
	    value: function getTransform() {
	      return {
	        top: 'scaleX(1) translate3d(0, 14px, 0) rotate(0deg)',
	        right: 'scaleX(1) translate3d(22px, 0, 0) rotate(0deg)',
	        bottom: 'scaleX(1) translate3d(0, 0, 0) rotate(0deg)',
	        left: 'scaleX(1) translate3d(-22px, 0, 0) rotate(0deg)'
	      }[this.props.position];
	    }
	  }, {
	    key: 'calculateOffset',
	    value: function calculateOffset() {
	      var tooltipDetails = this.tooltipDetails,
	          tooltip = this.tooltip;
	      var offset = this.props.offset;

	      var customOffset = offset !== undefined ? offset : 0;
	      return {
	        top: -tooltipDetails.clientHeight,
	        right: tooltip.clientWidth,
	        bottom: -tooltipDetails.clientHeight - 10, // Extra margin for tail
	        left: -tooltipDetails.clientWidth
	      }[this.props.position] - customOffset;
	    }
	  }, {
	    key: 'exceeds',
	    value: function exceeds() {
	      var tooltipDetails = this.tooltipDetails,
	          tooltip = this.tooltip;

	      var pos = this.props.position;
	      var docEl = document.documentElement;
	      var body = document.body;
	      var viewportWidth = body.clientWidth || docEl.clientWidt || window.innerWidth;
	      var elMostRight = tooltip.getBoundingClientRect().left + tooltipDetails.offsetWidth;
	      return (pos === 'bottom' || pos === 'top') && elMostRight >= viewportWidth;
	    }
	  }, {
	    key: 'getTooltipStyles',
	    value: function getTooltipStyles(exceeds) {
	      var _extends2;

	      var hideOnHover = this.props.hideOnHover;

	      var alignProps = exceeds ? { left: 'auto', right: '0' } : {};
	      var transform = this.props.isVisible === undefined ? {} : {
	        transform: this.getTransform()
	      };
	      return _extends((_extends2 = {}, _defineProperty(_extends2, this.getOffsetDirection(), this.calculateOffset()), _defineProperty(_extends2, 'pointerEvents', hideOnHover ? 'none' : 'auto'), _extends2), alignProps, transform);
	    }
	  }, {
	    key: 'getTooltipAbsoluteStyles',
	    value: function getTooltipAbsoluteStyles() {
	      var _props = this.props,
	          position = _props.position,
	          offset = _props.offset;
	      var tooltip = this.tooltip,
	          tooltipDetails = this.tooltipDetails;

	      var _tooltip$getBoundingC = tooltip.getBoundingClientRect(),
	          left = _tooltip$getBoundingC.left,
	          bottom = _tooltip$getBoundingC.bottom,
	          top = _tooltip$getBoundingC.top,
	          right = _tooltip$getBoundingC.right;

	      var customOffset = offset !== undefined ? offset : 0;
	      var transform = this.state.isVisible ? {
	        transform: this.getTransform()
	      } : {};
	      var positionMap = {
	        bottom: {
	          left: left,
	          top: bottom + 10 + customOffset
	        },
	        top: {
	          left: left,
	          top: top - tooltipDetails.clientHeight + customOffset
	        },
	        left: {
	          left: left - tooltipDetails.clientWidth + customOffset,
	          top: top
	        },
	        right: {
	          left: right + customOffset,
	          top: top
	        }
	      };
	      return _extends({}, positionMap[position], transform, {
	        bottom: 'auto'
	      });
	    }
	  }, {
	    key: 'renderTooltipDetails',
	    value: function renderTooltipDetails(style, tailStyles) {
	      var _this3 = this;

	      var _props2 = this.props,
	          id = _props2.id,
	          position = _props2.position,
	          text = _props2.text,
	          nowrap = _props2.nowrap;

	      var detailsContent = nowrap ? _react2.default.createElement(
	        'span',
	        { style: { whiteSpace: 'nowrap' } },
	        text
	      ) : text;
	      return _react2.default.createElement(
	        'div',
	        {
	          role: 'tooltip',
	          ref: function ref(el) {
	            return _this3.tooltipDetails = el;
	          },
	          className: 'tooltip__details tooltip--' + position,
	          style: style,
	          id: id,
	          'aria-hidden': !this.state.isVisible
	        },
	        _react2.default.createElement(
	          'svg',
	          {
	            x: '0px',
	            y: '0px',
	            viewBox: '0 0 9.1 16.1',
	            style: tailStyles
	          },
	          _react2.default.createElement('polyline', { points: '9.1,15.7 1.4,8.1 9.1,0.5' }),
	          _react2.default.createElement('polygon', { points: '8.1,16.1 0,8.1 8.1,0 8.1,1.4 1.4,8.1 8.1,14.7' })
	        ),
	        detailsContent
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _props3 = this.props,
	          id = _props3.id,
	          children = _props3.children,
	          style = _props3.style,
	          renderIntoBody = _props3.renderIntoBody;

	      var tooltipStyles = style;
	      var tailStyles = {};
	      if (this.tooltip && this.tooltipDetails) {
	        if (renderIntoBody) {
	          tooltipStyles = _extends({}, this.getTooltipAbsoluteStyles(), tooltipStyles);
	        } else {
	          var exceeds = this.exceeds();
	          tooltipStyles = _extends({}, this.getTooltipStyles(exceeds), tooltipStyles);
	          tailStyles = exceeds ? { right: '18px', left: 'auto' } : {};
	        }
	      }
	      var eventHandlers = this.props.isVisible !== undefined ? {} : {
	        onMouseEnter: this.showTooltip.bind(this),
	        onMouseLeave: this.hideTooltip.bind(this),
	        onFocus: this.showTooltip.bind(this),
	        onBlur: this.hideTooltip.bind(this),
	        onKeyDown: function onKeyDown(e) {
	          return e.keyCode === 27 && _this4.hideTooltip();
	        } // hide on esc
	      };
	      return _react2.default.createElement(
	        'div',
	        _extends({
	          className: 'tooltip',
	          ref: function ref(el) {
	            return _this4.tooltip = el;
	          }
	        }, eventHandlers),
	        _react2.default.createElement(
	          'span',
	          {
	            className: 'tooltip__trigger',
	            'aria-describedby': id
	          },
	          children
	        ),
	        !renderIntoBody && this.renderTooltipDetails(tooltipStyles, tailStyles),
	        renderIntoBody && _react2.default.createElement(
	          _RenderIntoContainer2.default,
	          {
	            className: 'tooltip',
	            styles: { pointerEvents: 'none' },
	            isVisible: this.state.shouldRender
	          },
	          this.renderTooltipDetails(tooltipStyles, tailStyles)
	        )
	      );
	    }
	  }]);

	  return Tooltip;
	}(_react2.default.Component);

	Tooltip.propTypes = {
	  id: _propTypes2.default.string,
	  offset: _propTypes2.default.number,
	  text: _propTypes2.default.node,
	  style: _propTypes2.default.object,
	  position: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),
	  children: _propTypes2.default.node,
	  hideOnHover: _propTypes2.default.bool,
	  nowrap: _propTypes2.default.bool,
	  delay: _propTypes2.default.number,
	  isVisible: _propTypes2.default.bool,
	  renderIntoBody: _propTypes2.default.bool,
	  scrollableContainer: _propTypes2.default.object
	};
	Tooltip.defaultProps = {
	  position: 'top',
	  delay: 0,
	  renderIntoBody: false,
	  scrollableContainer: canUseDOM ? window : null
	};
	exports.default = Tooltip;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom = __webpack_require__(43);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document window */


	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	var RenderIntoContainer = function (_React$Component) {
	  _inherits(RenderIntoContainer, _React$Component);

	  function RenderIntoContainer() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, RenderIntoContainer);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RenderIntoContainer.__proto__ || Object.getPrototypeOf(RenderIntoContainer)).call.apply(_ref, [this].concat(args))), _this), _this.overlay = null, _this.defaultStyles = {
	      zIndex: 99,
	      position: 'fixed',
	      top: 0,
	      bottom: 0,
	      left: 0,
	      right: 0
	    }, _this.onOverlayClick = function (event) {
	      if (event.target === _this.overlay && _this.props.isVisible) {
	        _this.props.onOverlayClick(event);
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(RenderIntoContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.renderComponent();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.renderComponent();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unmountComponent();
	    }
	  }, {
	    key: 'unmountComponent',
	    value: function unmountComponent() {
	      if (!this.overlay || !canUseDOM) return;

	      this.overlay.removeEventListener('touchstart', this.onOverlayClick);
	      this.overlay.removeEventListener('click', this.onOverlayClick);
	      (0, _reactDom.unmountComponentAtNode)(this.overlay);
	      if (this.props.container) {
	        this.props.container.removeChild(this.overlay);
	      }
	      this.overlay = null;
	    }
	  }, {
	    key: 'createElement',
	    value: function createElement() {
	      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
	      var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var element = document.createElement(tagName);
	      Object.keys(styles).forEach(function (key) {
	        element.style[key] = styles[key];
	      });
	      return element;
	    }
	  }, {
	    key: 'renderComponent',
	    value: function renderComponent() {
	      if (!canUseDOM) return;
	      var _props = this.props,
	          isVisible = _props.isVisible,
	          children = _props.children,
	          styles = _props.styles,
	          container = _props.container,
	          className = _props.className;

	      if (isVisible) {
	        if (!this.overlay) {
	          var overlayStyles = _extends({}, this.defaultStyles, styles);
	          this.overlay = this.createElement('div', overlayStyles);
	          this.overlay.classList.add(className);
	          this.overlay.addEventListener('touchstart', this.onOverlayClick);
	          this.overlay.addEventListener('click', this.onOverlayClick);
	          container.appendChild(this.overlay);
	        }
	        (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, children, this.overlay);
	      } else {
	        this.unmountComponent();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return null;
	    }
	  }]);

	  return RenderIntoContainer;
	}(_react2.default.Component);

	RenderIntoContainer.propTypes = {
	  isVisible: _propTypes2.default.bool.isRequired,
	  onOverlayClick: _propTypes2.default.func,
	  children: _propTypes2.default.node,
	  styles: _propTypes2.default.object,
	  container: _propTypes2.default.object,
	  className: _propTypes2.default.string
	};
	RenderIntoContainer.defaultProps = {
	  onOverlayClick: function onOverlayClick(_) {
	    return _;
	  },
	  children: null,
	  styles: {},
	  container: canUseDOM ? document.body : null,
	  className: ''
	};
	exports.default = RenderIntoContainer;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	module.exports = __webpack_require__(12).Array.findIndex;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	module.exports = __webpack_require__(12).Array.find;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	var isArray = __webpack_require__(77);
	var SPECIES = __webpack_require__(86)('species');

	module.exports = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(70);

	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	var document = __webpack_require__(13).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(78);
	var createDesc = __webpack_require__(79);
	module.exports = __webpack_require__(17) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(17) && !__webpack_require__(32)(function () {
	  return Object.defineProperty(__webpack_require__(73)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(30);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(30);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(69);
	var IE8_DOM_DEFINE = __webpack_require__(75);
	var toPrimitive = __webpack_require__(84);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(81);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(72);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(9);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(80)('wks');
	var uid = __webpack_require__(85);
	var Symbol = __webpack_require__(13).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(18);

	$export($export.S + $export.F, 'Object', { isObject: __webpack_require__(9) });


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(18);
	var $find = __webpack_require__(29)(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(28)(KEY);


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(18);
	var $find = __webpack_require__(29)(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(28)(KEY);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(126);

	var emptyObject = __webpack_require__(93);
	var _invariant = __webpack_require__(94);

	if (true) {
	  var warning = __webpack_require__(95);
	}

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	var ReactPropTypeLocationNames;
	if (true) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}

	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */

	  var injectedMixins = [];

	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',

	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',

	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',

	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',

	    // ==== Definition methods ====

	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',

	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',

	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',

	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',

	    // ==== Delegate methods ====

	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',

	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',

	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',

	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',

	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',

	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',

	    // ==== Advanced methods ====

	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };

	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (true) {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (true) {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (true) {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };

	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (true) {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }

	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;

	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }

	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }

	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (true) {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;

	        if (true) {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }

	      return;
	    }

	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );

	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;

	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }

	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }

	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }

	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);

	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;

	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];

	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );

	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (true) {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }

	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }

	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );

	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
	      Constructor[name] = property;
	    }
	  }

	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );

	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }

	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }

	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }

	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (true) {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }

	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (true) {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (true) {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }

	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }

	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };

	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };

	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },

	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (true) {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };

	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (true) {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (true) {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (true) {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );

	    if (true) {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  }

	  return createClass;
	}

	module.exports = factory;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

	module.exports = function(opts) {
	  return new ElementClass(opts)
	}

	function indexOf(arr, prop) {
	  if (arr.indexOf) return arr.indexOf(prop)
	  for (var i = 0, len = arr.length; i < len; i++)
	    if (arr[i] === prop) return i
	  return -1
	}

	function ElementClass(opts) {
	  if (!(this instanceof ElementClass)) return new ElementClass(opts)
	  var self = this
	  if (!opts) opts = {}

	  // similar doing instanceof HTMLElement but works in IE8
	  if (opts.nodeType) opts = {el: opts}

	  this.opts = opts
	  this.el = opts.el || document.body
	  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
	}

	ElementClass.prototype.add = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return el.className = className
	  var classes = el.className.split(' ')
	  if (indexOf(classes, className) > -1) return classes
	  classes.push(className)
	  el.className = classes.join(' ')
	  return classes
	}

	ElementClass.prototype.remove = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return
	  var classes = el.className.split(' ')
	  var idx = indexOf(classes, className)
	  if (idx > -1) classes.splice(idx, 1)
	  el.className = classes.join(' ')
	  return classes
	}

	ElementClass.prototype.has = function(className) {
	  var el = this.el
	  if (!el) return
	  var classes = el.className.split(' ')
	  return indexOf(classes, className) > -1
	}

	ElementClass.prototype.toggle = function(className) {
	  var el = this.el
	  if (!el) return
	  if (this.has(className)) this.remove(className)
	  else this.add(className)
	}


/***/ }),
/* 92 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (true) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (true) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(92);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _getVendorPrefixedName = __webpack_require__(40);

	var _getVendorPrefixedName2 = _interopRequireDefault(_getVendorPrefixedName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BrowserSupportCore = {
	  /**
	   * @return {bool} True if browser supports css animations.
	   */
	  hasCSSAnimations: function hasCSSAnimations() {
	    return !!(0, _getVendorPrefixedName2.default)('animationName');
	  },

	  /**
	   * @return {bool} True if browser supports css transforms.
	   */
	  hasCSSTransforms: function hasCSSTransforms() {
	    return !!(0, _getVendorPrefixedName2.default)('transform');
	  },

	  /**
	   * @return {bool} True if browser supports css 3d transforms.
	   */
	  hasCSS3DTransforms: function hasCSS3DTransforms() {
	    return !!(0, _getVendorPrefixedName2.default)('perspective');
	  },

	  /**
	   * @return {bool} True if browser supports css transitions.
	   */
	  hasCSSTransitions: function hasCSSTransitions() {
	    return !!(0, _getVendorPrefixedName2.default)('transition');
	  }
	}; /**
	    * Copyright Schrodinger, LLC
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree. An additional grant
	    * of patent rights can be found in the PATENTS file in the same directory.
	    *
	    * @providesModule BrowserSupportCore
	    */

	module.exports = BrowserSupportCore;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function capture(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    } else {
	      if (true) {
	        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
	      }
	      return {
	        remove: _emptyFunction2.default
	      };
	    }
	  },

	  registerDefault: function registerDefault() {}
	}; /**
	    * Copyright Schrodinger, LLC
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree. An additional grant
	    * of patent rights can be found in the PATENTS file in the same directory.
	    *
	    * @providesModule EventListener
	    * @typechecks
	    */

	module.exports = EventListener;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * Copyright Schrodinger, LLC
	                                                                                                                                                                                                                                                                   * All rights reserved.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                                                                                                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * @providesModule FixedDataTable
	                                                                                                                                                                                                                                                                   * @typechecks
	                                                                                                                                                                                                                                                                   * @noflow
	                                                                                                                                                                                                                                                                   */

	/*eslint no-bitwise:1*/

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ReactComponentWithPureRenderMixin = __webpack_require__(15);

	var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

	var _ReactWheelHandler = __webpack_require__(39);

	var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

	var _ReactTouchHandler = __webpack_require__(113);

	var _ReactTouchHandler2 = _interopRequireDefault(_ReactTouchHandler);

	var _Scrollbar = __webpack_require__(114);

	var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

	var _FixedDataTableBufferedRows = __webpack_require__(99);

	var _FixedDataTableBufferedRows2 = _interopRequireDefault(_FixedDataTableBufferedRows);

	var _FixedDataTableColumnResizeHandle = __webpack_require__(103);

	var _FixedDataTableColumnResizeHandle2 = _interopRequireDefault(_FixedDataTableColumnResizeHandle);

	var _FixedDataTableRow = __webpack_require__(38);

	var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

	var _FixedDataTableScrollHelper = __webpack_require__(106);

	var _FixedDataTableScrollHelper2 = _interopRequireDefault(_FixedDataTableScrollHelper);

	var _FixedDataTableWidthHelper = __webpack_require__(107);

	var _FixedDataTableWidthHelper2 = _interopRequireDefault(_FixedDataTableWidthHelper);

	var _FixedDataTableEventHelper = __webpack_require__(20);

	var _FixedDataTableEventHelper2 = _interopRequireDefault(_FixedDataTableEventHelper);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _debounceCore = __webpack_require__(119);

	var _debounceCore2 = _interopRequireDefault(_debounceCore);

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	var _invariant = __webpack_require__(10);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _joinClasses = __webpack_require__(11);

	var _joinClasses2 = _interopRequireDefault(_joinClasses);

	var _shallowEqual = __webpack_require__(41);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _FixedDataTableTranslateDOMPosition = __webpack_require__(14);

	var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ReactChildren = _React2.default.Children;

	var EMPTY_OBJECT = {};
	var BORDER_HEIGHT = 1;
	var HEADER = 'header';
	var FOOTER = 'footer';
	var CELL = 'cell';
	var ARROW_SCROLL_SPEED = 25;
	var DRAG_SCROLL_SPEED = 15;
	var DRAG_SCROLL_BUFFER = 100;

	/**
	 * Data grid component with fixed or scrollable header and columns.
	 *
	 * The layout of the data table is as follows:
	 *
	 * ```
	 * +---------------------------------------------------+
	 * | Fixed Column Group    | Scrollable Column Group   |
	 * | Header                | Header                    |
	 * |                       |                           |
	 * +---------------------------------------------------+
	 * |                       |                           |
	 * | Fixed Header Columns  | Scrollable Header Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Body Columns    | Scrollable Body Columns   |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * |                       |                           |
	 * | Fixed Footer Columns  | Scrollable Footer Columns |
	 * |                       |                           |
	 * +-----------------------+---------------------------+
	 * ```
	 *
	 * - Fixed Column Group Header: These are the headers for a group
	 *   of columns if included in the table that do not scroll
	 *   vertically or horizontally.
	 *
	 * - Scrollable Column Group Header: The header for a group of columns
	 *   that do not move while scrolling vertically, but move horizontally
	 *   with the horizontal scrolling.
	 *
	 * - Fixed Header Columns: The header columns that do not move while scrolling
	 *   vertically or horizontally.
	 *
	 * - Scrollable Header Columns: The header columns that do not move
	 *   while scrolling vertically, but move horizontally with the horizontal
	 *   scrolling.
	 *
	 * - Fixed Body Columns: The body columns that do not move while scrolling
	 *   horizontally, but move vertically with the vertical scrolling.
	 *
	 * - Scrollable Body Columns: The body columns that move while scrolling
	 *   vertically or horizontally.
	 */
	var FixedDataTable = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTable',

	  propTypes: {

	    /**
	     * Pixel width of table. If all columns do not fit,
	     * a horizontal scrollbar will appear.
	     */
	    width: _propTypes2.default.number.isRequired,

	    /**
	     * Pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    height: _propTypes2.default.number,

	    /**
	     * Class name to be passed into parent container
	     */
	    className: _propTypes2.default.string,

	    /**
	     * Maximum pixel height of table. If all rows do not fit,
	     * a vertical scrollbar will appear.
	     *
	     * Either `height` or `maxHeight` must be specified.
	     */
	    maxHeight: _propTypes2.default.number,

	    /**
	     * Pixel height of table's owner, this is used in a managed scrolling
	     * situation when you want to slide the table up from below the fold
	     * without having to constantly update the height on every scroll tick.
	     * Instead, vary this property on scroll. By using `ownerHeight`, we
	     * over-render the table while making sure the footer and horizontal
	     * scrollbar of the table are visible when the current space for the table
	     * in view is smaller than the final, over-flowing height of table. It
	     * allows us to avoid resizing and reflowing table when it is moving in the
	     * view.
	     *
	     * This is used if `ownerHeight < height` (or `maxHeight`).
	     */
	    ownerHeight: _propTypes2.default.number,

	    overflowX: _propTypes2.default.oneOf(['hidden', 'auto']),
	    overflowY: _propTypes2.default.oneOf(['hidden', 'auto']),

	    /**
	     * Boolean flag indicating of touch scrolling should be enabled
	     * This feature is current in beta and may have bugs
	     */
	    touchScrollEnabled: _propTypes2.default.bool,

	    /**
	     * Boolean flags to control if scrolling with keys is enabled
	     */
	    keyboardScrollEnabled: _propTypes2.default.bool,
	    keyboardPageEnabled: _propTypes2.default.bool,

	    /**
	     * Hide the scrollbar but still enable scroll functionality
	     */
	    showScrollbarX: _propTypes2.default.bool,
	    showScrollbarY: _propTypes2.default.bool,

	    /**
	     * Callback when horizontally scrolling the grid.
	     *
	     * Return false to stop propagation.
	     */
	    onHorizontalScroll: _propTypes2.default.func,

	    /**
	     * Callback when vertically scrolling the grid.
	     *
	     * Return false to stop propagation.
	     */
	    onVerticalScroll: _propTypes2.default.func,

	    /**
	     * Number of rows in the table.
	     */
	    rowsCount: _propTypes2.default.number.isRequired,

	    /**
	     * Pixel height of rows unless `rowHeightGetter` is specified and returns
	     * different value.
	     */
	    rowHeight: _propTypes2.default.number.isRequired,

	    /**
	     * If specified, `rowHeightGetter(index)` is called for each row and the
	     * returned value overrides `rowHeight` for particular row.
	     */
	    rowHeightGetter: _propTypes2.default.func,

	    /**
	     * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
	     * different value.  Defaults to 0 and no sub-row being displayed.
	     */
	    subRowHeight: _propTypes2.default.number,

	    /**
	     * If specified, `subRowHeightGetter(index)` is called for each row and the
	     * returned value overrides `subRowHeight` for particular row.
	     */
	    subRowHeightGetter: _propTypes2.default.func,

	    /**
	     * The row expanded for table row.
	     * This can either be a React element, or a function that generates
	     * a React Element. By default, the React element passed in can expect to
	     * receive the following props:
	     *
	     * ```
	     * props: {
	     *   rowIndex; number // (the row index)
	     *   height: number // (supplied from the Table or rowHeightGetter)
	     *   width: number // (supplied from the Table)
	     * }
	     * ```
	     *
	     * Because you are passing in your own React element, you can feel free to
	     * pass in whatever props you may want or need.
	     *
	     * If you pass in a function, you will receive the same props object as the
	     * first argument.
	     */
	    rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

	    /**
	     * To get any additional CSS classes that should be added to a row,
	     * `rowClassNameGetter(index)` is called.
	     */
	    rowClassNameGetter: _propTypes2.default.func,

	    /**
	     * If specified, `rowKeyGetter(index)` is called for each row and the
	     * returned value overrides `key` for the particular row.
	     */
	    rowKeyGetter: _propTypes2.default.func,

	    /**
	     * Pixel height of the column group header.
	     */
	    groupHeaderHeight: _propTypes2.default.number,

	    /**
	     * Pixel height of header.
	     */
	    headerHeight: _propTypes2.default.number.isRequired,

	    /**
	     * Pixel height of fixedDataTableCellGroupLayout/cellGroupWrapper.
	     * Default is headerHeight and groupHeaderHeight.
	     *
	     * This can be used with CSS to make a header cell span both the group & normal header row.
	     * Setting this to a value larger than height will cause the content to
	     * overflow the height. This is useful when adding a 2nd table as the group
	     * header and vertically merging the 2 headers when a column is not part
	     * of a group. Here are the necessary CSS changes:
	     *
	     * Both headers:
	     *  - cellGroupWrapper needs overflow-x: hidden and pointer-events: none
	     *  - cellGroup needs pointer-events: auto to reenable them on child els
	     * Group header:
	     *  - Layout/main needs overflow: visible and a higher z-index
	     *  - CellLayout/main needs overflow-y: visible
	     *  - cellGroup needs overflow: visible
	     */
	    cellGroupWrapperHeight: _propTypes2.default.number,

	    /**
	     * Pixel height of footer.
	     */
	    footerHeight: _propTypes2.default.number,

	    /**
	     * Value of horizontal scroll.
	     */
	    scrollLeft: _propTypes2.default.number,

	    /**
	     * Index of column to scroll to.
	     */
	    scrollToColumn: _propTypes2.default.number,

	    /**
	     * Value of vertical scroll.
	     */
	    scrollTop: _propTypes2.default.number,

	    /**
	     * Index of row to scroll to.
	     */
	    scrollToRow: _propTypes2.default.number,

	    /**
	     * Callback that is called when scrolling starts with current horizontal
	     * and vertical scroll values.
	     */
	    onScrollStart: _propTypes2.default.func,

	    /**
	     * Callback that is called when scrolling ends or stops with new horizontal
	     * and vertical scroll values.
	     */
	    onScrollEnd: _propTypes2.default.func,

	    /**
	     * If enabled scroll events will not be propagated outside of the table.
	     */
	    stopScrollPropagation: _propTypes2.default.bool,

	    /**
	     * Callback that is called when `rowHeightGetter` returns a different height
	     * for a row than the `rowHeight` prop. This is necessary because initially
	     * table estimates heights of some parts of the content.
	     */
	    onContentHeightChange: _propTypes2.default.func,

	    /**
	     * Callback that is called when a row is clicked.
	     */
	    onRowClick: _propTypes2.default.func,

	    /**
	     * Callback that is called when a row is double clicked.
	     */
	    onRowDoubleClick: _propTypes2.default.func,

	    /**
	     * Callback that is called when a mouse-down event happens on a row.
	     */
	    onRowMouseDown: _propTypes2.default.func,

	    /**
	     * Callback that is called when a mouse-up event happens on a row.
	     */
	    onRowMouseUp: _propTypes2.default.func,

	    /**
	     * Callback that is called when a mouse-enter event happens on a row.
	     */
	    onRowMouseEnter: _propTypes2.default.func,

	    /**
	     * Callback that is called when a mouse-leave event happens on a row.
	     */
	    onRowMouseLeave: _propTypes2.default.func,

	    /**
	     * Callback that is called when a touch-start event happens on a row.
	     */
	    onRowTouchStart: _propTypes2.default.func,

	    /**
	     * Callback that is called when a touch-end event happens on a row.
	     */
	    onRowTouchEnd: _propTypes2.default.func,

	    /**
	     * Callback that is called when a touch-move event happens on a row.
	     */
	    onRowTouchMove: _propTypes2.default.func,

	    /**
	     * Callback that is called when resizer has been released
	     * and column needs to be updated.
	     *
	     * Required if the isResizable property is true on any column.
	     *
	     * ```
	     * function(
	     *   newColumnWidth: number,
	     *   columnKey: string,
	     * )
	     * ```
	     */
	    onColumnResizeEndCallback: _propTypes2.default.func,

	    /**
	     * Callback that is called when reordering has been completed
	     * and columns need to be updated.
	     *
	     * ```
	     * function(
	     *   event {
	     *     columnBefore: string|undefined, // the column before the new location of this one
	     *     columnAfter: string|undefined,  // the column after the new location of this one
	     *     reorderColumn: string,          // the column key that was just reordered
	     *   }
	     * )
	     * ```
	     */
	    onColumnReorderEndCallback: _propTypes2.default.func,

	    /**
	     * Whether a column is currently being resized.
	     */
	    isColumnResizing: _propTypes2.default.bool,

	    /**
	     * Whether columns are currently being reordered.
	     */
	    isColumnReordering: _propTypes2.default.bool,

	    /**
	     * The number of rows outside the viewport to prerender. Defaults to roughly
	     * half of the number of visible rows.
	     */
	    bufferRowCount: _propTypes2.default.number
	  },

	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      footerHeight: 0,
	      groupHeaderHeight: 0,
	      headerHeight: 0,
	      showScrollbarX: true,
	      showScrollbarY: true,
	      touchScrollEnabled: false,
	      keyboardScrollEnabled: false,
	      keyboardPageEnabled: false,
	      stopScrollPropagation: false
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var props = this.props;

	    var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
	    this._scrollHelper = new _FixedDataTableScrollHelper2.default(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter, props.subRowHeight, props.subRowHeightGetter);

	    this._didScrollStop = (0, _debounceCore2.default)(this._didScrollStopSync, 200, this);

	    this._wheelHandler = new _ReactWheelHandler2.default(this._onScroll, this._shouldHandleWheelX, this._shouldHandleWheelY, props.stopScrollPropagation);
	    this._touchHandler = new _ReactTouchHandler2.default(this._onScroll, this._shouldHandleTouchX, this._shouldHandleTouchY, props.stopScrollPropagation);

	    this.setState(this._calculateState(props));
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._wheelHandler = null;
	    this._touchHandler = null;

	    // Cancel any pending debounced scroll handling and handle immediately.
	    this._didScrollStop.reset();
	    this._didScrollStopSync();
	  },
	  _shouldHandleTouchX: function _shouldHandleTouchX( /*number*/delta) /*boolean*/{
	    return this.props.touchScrollEnabled && this._shouldHandleWheelX(delta);
	  },
	  _shouldHandleTouchY: function _shouldHandleTouchY( /*number*/delta) /*boolean*/{
	    return this.props.touchScrollEnabled && this._shouldHandleWheelY(delta);
	  },
	  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
	    if (this.props.overflowX === 'hidden') {
	      return false;
	    }

	    delta = Math.round(delta);
	    if (delta === 0) {
	      return false;
	    }

	    return delta < 0 && this.state.scrollX > 0 || delta >= 0 && this.state.scrollX < this.state.maxScrollX;
	  },
	  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
	    if (this.props.overflowY === 'hidden' || delta === 0) {
	      return false;
	    }

	    delta = Math.round(delta);
	    if (delta === 0) {
	      return false;
	    }

	    return delta < 0 && this.state.scrollY > 0 || delta >= 0 && this.state.scrollY < this.state.maxScrollY;
	  },
	  _onKeyDown: function _onKeyDown(event) {
	    if (this.props.keyboardPageEnabled) {
	      switch (event.key) {
	        case 'PageDown':
	          this._onScroll(0, this._scrollbarYHeight);
	          event.preventDefault();
	          break;

	        case 'PageUp':
	          this._onScroll(0, this._scrollbarYHeight * -1);
	          event.preventDefault();
	          break;

	        default:
	          break;
	      }
	    }
	    if (this.props.keyboardScrollEnabled) {
	      switch (event.key) {

	        case 'ArrowDown':
	          this._onScroll(0, ARROW_SCROLL_SPEED);
	          event.preventDefault();
	          break;

	        case 'ArrowUp':
	          this._onScroll(0, ARROW_SCROLL_SPEED * -1);
	          event.preventDefault();
	          break;

	        case 'ArrowRight':
	          this._onScroll(ARROW_SCROLL_SPEED, 0);
	          event.preventDefault();
	          break;

	        case 'ArrowLeft':
	          this._onScroll(ARROW_SCROLL_SPEED * -1, 0);
	          event.preventDefault();
	          break;

	        default:
	          break;
	      }
	    }
	  },
	  _reportContentHeight: function _reportContentHeight() {
	    var scrollContentHeight = this.state.scrollContentHeight;
	    var reservedHeight = this.state.reservedHeight;
	    var requiredHeight = scrollContentHeight + reservedHeight;
	    var contentHeight;
	    var useMaxHeight = this.props.height === undefined;
	    if (useMaxHeight && this.props.maxHeight > requiredHeight) {
	      contentHeight = requiredHeight;
	    } else if (this.state.height > requiredHeight && this.props.ownerHeight) {
	      contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
	    } else {
	      contentHeight = this.state.height + this.state.maxScrollY;
	    }
	    if (contentHeight !== this._contentHeight && this.props.onContentHeightChange) {
	      this.props.onContentHeightChange(contentHeight);
	    }
	    this._contentHeight = contentHeight;
	  },
	  componentDidMount: function componentDidMount() {
	    this._reportContentHeight();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    var newOverflowX = nextProps.overflowX;
	    var newOverflowY = nextProps.overflowY;

	    // In the case of controlled scrolling, notify.
	    if (this.props.ownerHeight !== nextProps.ownerHeight || this.props.scrollTop !== nextProps.scrollTop || this.props.scrollLeft !== nextProps.scrollLeft) {
	      this._didScrollStart();
	    }

	    // Cancel any pending debounced scroll handling and handle immediately.
	    this._didScrollStop.reset();
	    this._didScrollStopSync();

	    this.setState(this._calculateState(nextProps, this.state));
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._reportContentHeight();
	  },
	  render: function render() /*object*/{
	    var state = this.state;
	    var props = this.props;

	    var onColumnReorder = props.onColumnReorderEndCallback ? this._onColumnReorder : null;

	    var groupHeader;
	    if (state.useGroupHeader) {
	      groupHeader = _React2.default.createElement(_FixedDataTableRow2.default, {
	        key: 'group_header',
	        isScrolling: this._isScrolling,
	        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
	        width: state.width,
	        height: state.groupHeaderHeight,
	        cellGroupWrapperHeight: state.cellGroupWrapperHeight,
	        index: 0,
	        zIndex: 1,
	        offsetTop: 0,
	        scrollLeft: state.scrollX,
	        fixedColumns: state.groupHeaderFixedColumns,
	        fixedRightColumns: state.groupHeaderFixedRightColumns,
	        scrollableColumns: state.groupHeaderScrollableColumns,
	        onColumnResize: this._onColumnResize,
	        onColumnReorder: onColumnReorder,
	        onColumnReorderMove: this._onColumnReorderMove
	      });
	    }

	    var maxScrollY = this.state.maxScrollY;
	    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden' && state.showScrollbarX !== false;
	    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden' && state.showScrollbarY !== false;
	    var scrollbarXHeight = showScrollbarX ? _Scrollbar2.default.SIZE : 0;
	    var scrollbarYHeight = state.height - scrollbarXHeight - 2 * BORDER_HEIGHT - state.footerHeight;

	    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
	    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
	    scrollbarYHeight -= bodyOffsetTop;
	    var bottomSectionOffset = 0;
	    var footOffsetTop = props.maxHeight != null ? bodyOffsetTop + state.bodyHeight : bodyOffsetTop + scrollbarYHeight;
	    var rowsContainerHeight = footOffsetTop + state.footerHeight;

	    if (props.ownerHeight !== undefined && props.ownerHeight < state.height) {
	      bottomSectionOffset = props.ownerHeight - state.height;

	      footOffsetTop = Math.min(footOffsetTop, props.ownerHeight - state.footerHeight - scrollbarXHeight);

	      scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
	    }
	    this._scrollbarYHeight = scrollbarYHeight;

	    var verticalScrollbar;
	    if (showScrollbarY) {
	      verticalScrollbar = _React2.default.createElement(_Scrollbar2.default, {
	        size: scrollbarYHeight,
	        contentSize: scrollbarYHeight + maxScrollY,
	        onScroll: this._onVerticalScroll,
	        verticalTop: bodyOffsetTop,
	        position: state.scrollY
	      });
	    }

	    var horizontalScrollbar;
	    if (showScrollbarX) {
	      var scrollbarXWidth = state.width;
	      horizontalScrollbar = _React2.default.createElement(HorizontalScrollbar, {
	        contentSize: scrollbarXWidth + state.maxScrollX,
	        offset: bottomSectionOffset,
	        onScroll: this._onHorizontalScroll,
	        position: state.scrollX,
	        size: scrollbarXWidth
	      });
	    }

	    var dragKnob = _React2.default.createElement(_FixedDataTableColumnResizeHandle2.default, {
	      height: state.height,
	      initialWidth: state.columnResizingData.width || 0,
	      minWidth: state.columnResizingData.minWidth || 0,
	      maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE,
	      visible: !!state.isColumnResizing,
	      leftOffset: state.columnResizingData.left || 0,
	      knobHeight: state.headerHeight,
	      initialEvent: state.columnResizingData.initialEvent,
	      onColumnResizeEnd: props.onColumnResizeEndCallback,
	      columnKey: state.columnResizingData.key,
	      touchEnabled: state.touchScrollEnabled
	    });

	    var footer = null;
	    if (state.footerHeight) {
	      footer = _React2.default.createElement(_FixedDataTableRow2.default, {
	        key: 'footer',
	        isScrolling: this._isScrolling,
	        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/footer'), (0, _cx2.default)('public/fixedDataTable/footer')),
	        width: state.width,
	        height: state.footerHeight,
	        index: -1,
	        zIndex: 1,
	        offsetTop: footOffsetTop,
	        fixedColumns: state.footFixedColumns,
	        fixedRightColumns: state.footFixedRightColumns,
	        scrollableColumns: state.footScrollableColumns,
	        scrollLeft: state.scrollX
	      });
	    }

	    var rows = this._renderRows(bodyOffsetTop);

	    var header = _React2.default.createElement(_FixedDataTableRow2.default, {
	      key: 'header',
	      isScrolling: this._isScrolling,
	      className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
	      width: state.width,
	      height: state.headerHeight,
	      cellGroupWrapperHeight: state.cellGroupWrapperHeight,
	      index: -1,
	      zIndex: 1,
	      offsetTop: headerOffsetTop,
	      scrollLeft: state.scrollX,
	      fixedColumns: state.headFixedColumns,
	      fixedRightColumns: state.headFixedRightColumns,
	      scrollableColumns: state.headScrollableColumns,
	      touchEnabled: state.touchScrollEnabled,
	      onColumnResize: this._onColumnResize,
	      onColumnReorder: onColumnReorder,
	      onColumnReorderMove: this._onColumnReorderMove,
	      onColumnReorderEnd: this._onColumnReorderEnd,
	      isColumnReordering: !!state.isColumnReordering,
	      columnReorderingData: state.columnReorderingData
	    });

	    var topShadow;
	    var bottomShadow;
	    if (state.scrollY) {
	      topShadow = _React2.default.createElement('div', {
	        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/topShadow'), (0, _cx2.default)('public/fixedDataTable/topShadow')),
	        style: { top: bodyOffsetTop }
	      });
	    }

	    if (state.ownerHeight != null && state.ownerHeight < state.height && state.scrollContentHeight + state.reservedHeight > state.ownerHeight || state.scrollY < maxScrollY) {
	      bottomShadow = _React2.default.createElement('div', {
	        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/bottomShadow'), (0, _cx2.default)('public/fixedDataTable/bottomShadow')),
	        style: { top: footOffsetTop }
	      });
	    }

	    return _React2.default.createElement(
	      'div',
	      {
	        className: (0, _joinClasses2.default)(this.state.className, (0, _cx2.default)('fixedDataTableLayout/main'), (0, _cx2.default)('public/fixedDataTable/main')),
	        tabIndex: 0,
	        onKeyDown: this._onKeyDown,
	        onWheel: this._wheelHandler.onWheel,
	        onTouchStart: this._touchHandler.onTouchStart,
	        onTouchEnd: this._touchHandler.onTouchEnd,
	        onTouchMove: this._touchHandler.onTouchMove,
	        onTouchCancel: this._touchHandler.onTouchCancel,
	        style: { height: state.height, width: state.width } },
	      _React2.default.createElement(
	        'div',
	        {
	          className: (0, _cx2.default)('fixedDataTableLayout/rowsContainer'),
	          style: { height: rowsContainerHeight, width: state.width } },
	        dragKnob,
	        groupHeader,
	        header,
	        rows,
	        footer,
	        topShadow,
	        bottomShadow
	      ),
	      verticalScrollbar,
	      horizontalScrollbar
	    );
	  },
	  _renderRows: function _renderRows( /*number*/offsetTop) /*object*/{
	    var state = this.state;

	    return _React2.default.createElement(_FixedDataTableBufferedRows2.default, {
	      isScrolling: this._isScrolling,
	      defaultRowHeight: state.rowHeight,
	      firstRowIndex: state.firstRowIndex,
	      firstRowOffset: state.firstRowOffset,
	      fixedColumns: state.bodyFixedColumns,
	      fixedRightColumns: state.bodyFixedRightColumns,
	      height: state.bodyHeight,
	      offsetTop: offsetTop,
	      onRowClick: state.onRowClick,
	      onRowDoubleClick: state.onRowDoubleClick,
	      onRowMouseDown: state.onRowMouseDown,
	      onRowMouseUp: state.onRowMouseUp,
	      onRowMouseEnter: state.onRowMouseEnter,
	      onRowMouseLeave: state.onRowMouseLeave,
	      onRowTouchStart: state.touchScrollEnabled ? state.onRowTouchStart : null,
	      onRowTouchEnd: state.touchScrollEnabled ? state.onRowTouchEnd : null,
	      onRowTouchMove: state.touchScrollEnabled ? state.onRowTouchMove : null,
	      rowClassNameGetter: state.rowClassNameGetter,
	      rowsCount: state.rowsCount,
	      rowGetter: state.rowGetter,
	      rowHeightGetter: state.rowHeightGetter,
	      subRowHeight: state.subRowHeight,
	      subRowHeightGetter: state.subRowHeightGetter,
	      rowExpanded: state.rowExpanded,
	      rowKeyGetter: state.rowKeyGetter,
	      scrollLeft: state.scrollX,
	      scrollableColumns: state.bodyScrollableColumns,
	      showLastRowBorder: true,
	      width: state.width,
	      rowPositionGetter: this._scrollHelper.getRowPosition,
	      bufferRowCount: this.state.bufferRowCount
	    });
	  },


	  /**
	   * This is called when a cell that is in the header of a column has its
	   * resizer knob clicked on. It displays the resizer and puts in the correct
	   * location on the table.
	   */
	  _onColumnResize: function _onColumnResize(
	  /*number*/combinedWidth,
	  /*number*/leftOffset,
	  /*number*/cellWidth,
	  /*?number*/cellMinWidth,
	  /*?number*/cellMaxWidth,
	  /*number|string*/columnKey,
	  /*object*/event) {

	    var coordinates = _FixedDataTableEventHelper2.default.getCoordinatesFromEvent(event);
	    var x = coordinates.x;
	    var y = coordinates.y;

	    this.setState({
	      isColumnResizing: true,
	      columnResizingData: {
	        left: leftOffset + combinedWidth - cellWidth,
	        width: cellWidth,
	        minWidth: cellMinWidth,
	        maxWidth: cellMaxWidth,
	        initialEvent: {
	          clientX: x,
	          clientY: y,
	          preventDefault: _emptyFunction2.default
	        },
	        key: columnKey
	      }
	    });
	  },
	  _onColumnReorder: function _onColumnReorder(
	  /*string*/columnKey,
	  /*number*/width,
	  /*number*/left,
	  /*object*/event) {
	    // No native support in IE11 for find, findIndex, or includes, so using some.
	    var isFixed = this.state.headFixedColumns.some(function (column) {
	      return column.props.columnKey === columnKey;
	    });

	    this.setState({
	      isColumnReordering: true,
	      columnReorderingData: {
	        dragDistance: 0,
	        isFixed: isFixed,
	        scrollStart: this.state.scrollX,
	        columnKey: columnKey,
	        columnWidth: width,
	        originalLeft: left,
	        columnsBefore: [],
	        columnsAfter: []
	      }
	    });
	  },
	  _onColumnReorderMove: function _onColumnReorderMove(
	  /*number*/deltaX) {
	    //NOTE Need to clone this object when use pureRendering
	    var reorderingData = _extends({}, this.state.columnReorderingData);
	    reorderingData.dragDistance = deltaX;
	    reorderingData.columnBefore = undefined;
	    reorderingData.columnAfter = undefined;

	    var isFixedColumn = this.state.columnReorderingData.isFixed;
	    var scrollX = this.state.scrollX;

	    if (!isFixedColumn) {
	      //Relative dragX position on scroll
	      var dragX = reorderingData.originalLeft - reorderingData.scrollStart + reorderingData.dragDistance;

	      var fixedColumnsWidth = this.state.bodyFixedColumns.reduce(function (sum, column) {
	        return sum + column.props.width;
	      }, 0);
	      var relativeWidth = this.props.width - fixedColumnsWidth;

	      //Scroll the table left or right if we drag near the edges of the table
	      if (dragX > relativeWidth - DRAG_SCROLL_BUFFER) {
	        scrollX = Math.min(scrollX + DRAG_SCROLL_SPEED, this.state.maxScrollX);
	      } else if (dragX <= DRAG_SCROLL_BUFFER) {
	        scrollX = Math.max(scrollX - DRAG_SCROLL_SPEED, 0);
	      }

	      reorderingData.dragDistance += this.state.scrollX - reorderingData.scrollStart;
	    }

	    this.setState({
	      scrollX: scrollX,
	      columnReorderingData: reorderingData
	    });
	  },
	  _onColumnReorderEnd: function _onColumnReorderEnd(
	  /*object*/props,
	  /*object*/event) {

	    var columnBefore = this.state.columnReorderingData.columnBefore;
	    var columnAfter = this.state.columnReorderingData.columnAfter;
	    var reorderColumn = this.state.columnReorderingData.columnKey;
	    var cancelReorder = this.state.columnReorderingData.cancelReorder;

	    this.setState({
	      isColumnReordering: false,
	      columnReorderingData: {}
	    });

	    if (cancelReorder) {
	      return;
	    }

	    this.props.onColumnReorderEndCallback({
	      columnBefore: columnBefore, columnAfter: columnAfter, reorderColumn: reorderColumn
	    });

	    var onHorizontalScroll = this.props.onHorizontalScroll;
	    if (this.state.columnReorderingData.scrollStart !== this.state.scrollX && onHorizontalScroll) {
	      onHorizontalScroll(this.state.scrollX);
	    };
	  },
	  _areColumnSettingsIdentical: function _areColumnSettingsIdentical(oldColumns, newColumns) {
	    if (oldColumns.length !== newColumns.length) {
	      return false;
	    }
	    for (var index = 0; index < oldColumns.length; ++index) {
	      if (!(0, _shallowEqual2.default)(oldColumns[index].props, newColumns[index].props)) {
	        return false;
	      }
	    }
	    return true;
	  },
	  _populateColumnsAndColumnData: function _populateColumnsAndColumnData(columns, columnGroups, oldState) {
	    var canReuseColumnSettings = false;
	    var canReuseColumnGroupSettings = false;

	    if (oldState && oldState.columns) {
	      canReuseColumnSettings = this._areColumnSettingsIdentical(columns, oldState.columns);
	    }
	    if (oldState && oldState.columnGroups && columnGroups) {
	      canReuseColumnGroupSettings = this._areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
	    }

	    var columnInfo = {};
	    if (canReuseColumnSettings) {
	      columnInfo.bodyFixedColumns = oldState.bodyFixedColumns;
	      columnInfo.bodyFixedRightColumns = oldState.bodyFixedRightColumns;
	      columnInfo.bodyScrollableColumns = oldState.bodyScrollableColumns;
	      columnInfo.headFixedColumns = oldState.headFixedColumns;
	      columnInfo.headFixedRightColumns = oldState.headFixedRightColumns;
	      columnInfo.headScrollableColumns = oldState.headScrollableColumns;
	      columnInfo.footFixedColumns = oldState.footFixedColumns;
	      columnInfo.footFixedRightColumns = oldState.footFixedRightColumns;
	      columnInfo.footScrollableColumns = oldState.footScrollableColumns;
	    } else {
	      var bodyColumnTypes = this._splitColumnTypes(columns);
	      columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
	      columnInfo.bodyFixedRightColumns = bodyColumnTypes.fixedRight;
	      columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

	      var headColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columns));
	      columnInfo.headFixedColumns = headColumnTypes.fixed;
	      columnInfo.headFixedRightColumns = headColumnTypes.fixedRight;
	      columnInfo.headScrollableColumns = headColumnTypes.scrollable;

	      var footColumnTypes = this._splitColumnTypes(this._selectColumnElement(FOOTER, columns));
	      columnInfo.footFixedColumns = footColumnTypes.fixed;
	      columnInfo.footFixedRightColumns = footColumnTypes.fixedRight;
	      columnInfo.footScrollableColumns = footColumnTypes.scrollable;
	    }

	    if (canReuseColumnGroupSettings) {
	      columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
	      columnInfo.groupHeaderFixedRightColumns = oldState.groupHeaderFixedRightColumns;
	      columnInfo.groupHeaderScrollableColumns = oldState.groupHeaderScrollableColumns;
	    } else {
	      if (columnGroups) {
	        var groupHeaderColumnTypes = this._splitColumnTypes(this._selectColumnElement(HEADER, columnGroups));
	        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
	        columnInfo.groupHeaderFixedRightColumns = groupHeaderColumnTypes.fixedRight;
	        columnInfo.groupHeaderScrollableColumns = groupHeaderColumnTypes.scrollable;
	      }
	    }

	    return columnInfo;
	  },
	  _calculateState: function _calculateState( /*object*/props, /*?object*/oldState) /*object*/{
	    (0, _invariant2.default)(props.height !== undefined || props.maxHeight !== undefined, 'You must set either a height or a maxHeight');

	    var children = [];
	    ReactChildren.forEach(props.children, function (child, index) {
	      if (child == null) {
	        return;
	      }
	      (0, _invariant2.default)(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or ' + '<FixedDataTableColumnGroup />');
	      children.push(child);
	    });

	    var scrollState;
	    var firstRowIndex = oldState && oldState.firstRowIndex || 0;
	    var firstRowOffset = oldState && oldState.firstRowOffset || 0;
	    var scrollY = oldState ? oldState.scrollY : 0;
	    var scrollX = oldState ? oldState.scrollX : 0;

	    var lastScrollLeft = oldState ? oldState.scrollLeft : 0;
	    if (props.scrollLeft !== undefined && props.scrollLeft !== lastScrollLeft) {
	      scrollX = props.scrollLeft;
	    }

	    if (oldState && (props.rowsCount !== oldState.rowsCount || props.rowHeight !== oldState.rowHeight || props.height !== oldState.height)) {
	      // Number of rows changed, try to scroll to the row from before the
	      // change
	      var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);

	      var oldViewportHeight = this._scrollHelper._viewportHeight;

	      this._scrollHelper = new _FixedDataTableScrollHelper2.default(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter, props.subRowHeight, props.subRowHeightGetter);
	      scrollState = this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    } else if (oldState) {
	      if (props.rowHeightGetter !== oldState.rowHeightGetter) {
	        this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
	      }
	      if (props.subRowHeightGetter !== oldState.subRowHeightGetter) {
	        this._scrollHelper.setSubRowHeightGetter(props.subRowHeightGetter);
	      }
	    }

	    // Figure out if the vertical scrollbar will be visible first, 
	    // because it will determine the width of the table
	    var useGroupHeader = false;
	    var groupHeaderHeight = 0;

	    if (children.length && children[0].type.__TableColumnGroup__) {
	      useGroupHeader = true;
	      groupHeaderHeight = props.groupHeaderHeight;
	    }

	    var useMaxHeight = props.height === undefined;
	    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
	    var totalHeightReserved = props.footerHeight + props.headerHeight + groupHeaderHeight + 2 * BORDER_HEIGHT;
	    var bodyHeight = height - totalHeightReserved;
	    var scrollContentHeight = this._scrollHelper.getContentHeight();
	    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
	    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);

	    // If vertical scrollbar is necessary, adjust the table width to give it room
	    var adjustedWidth = props.width;
	    if (maxScrollY) {
	      adjustedWidth = adjustedWidth - _Scrollbar2.default.SIZE - 1;
	    }

	    var lastScrollToRow = oldState ? oldState.scrollToRow : undefined;
	    if (props.scrollToRow != null && (props.scrollToRow !== lastScrollToRow || viewportHeight !== oldViewportHeight)) {
	      scrollState = this._scrollHelper.scrollRowIntoView(props.scrollToRow);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    }

	    var lastScrollTop = oldState ? oldState.scrollTop : undefined;
	    if (props.scrollTop != null && props.scrollTop !== lastScrollTop) {
	      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    }

	    var columnResizingData;
	    if (props.isColumnResizing) {
	      columnResizingData = oldState && oldState.columnResizingData;
	    } else {
	      columnResizingData = EMPTY_OBJECT;
	    }

	    var columns;
	    var columnGroups;

	    if (useGroupHeader) {
	      var columnGroupSettings = _FixedDataTableWidthHelper2.default.adjustColumnGroupWidths(children, adjustedWidth);
	      columns = columnGroupSettings.columns;
	      columnGroups = columnGroupSettings.columnGroups;
	    } else {
	      columns = _FixedDataTableWidthHelper2.default.adjustColumnWidths(children, adjustedWidth);
	    }

	    var columnInfo = this._populateColumnsAndColumnData(columns, columnGroups, oldState);

	    var lastScrollToColumn = oldState ? oldState.scrollToColumn : undefined;
	    if (props.scrollToColumn !== null && props.scrollToColumn !== lastScrollToColumn) {
	      // If selected column is a fixed column, don't scroll
	      var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
	      if (props.scrollToColumn >= fixedColumnsCount) {
	        var totalFixedColumnsWidth = 0;
	        var i, column;
	        for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
	          column = columnInfo.bodyFixedColumns[i];
	          totalFixedColumnsWidth += column.props.width;
	        }

	        var j;
	        for (j = 0; j < columnInfo.bodyFixedRightColumns.length; ++j) {
	          column = columnInfo.bodyFixedRightColumns[j];
	          totalFixedColumnsWidth += column.props.width;
	        }

	        // Convert column index (0 indexed) to scrollable index (0 indexed)
	        // and clamp to max scrollable index
	        var scrollableColumnIndex = Math.min(props.scrollToColumn - fixedColumnsCount, columnInfo.bodyScrollableColumns.length - 1);

	        // Sum width for all columns before column
	        var previousColumnsWidth = 0;
	        for (i = 0; i < scrollableColumnIndex; ++i) {
	          column = columnInfo.bodyScrollableColumns[i];
	          previousColumnsWidth += column.props.width;
	        }

	        // Get width of scrollable columns in viewport
	        var availableScrollWidth = adjustedWidth - totalFixedColumnsWidth;

	        // Get width of specified column
	        var selectedColumnWidth = columnInfo.bodyScrollableColumns[scrollableColumnIndex].props.width;

	        // Must scroll at least far enough for end of column (prevColWidth + selColWidth)
	        // to be in viewport (availableScrollWidth = viewport width)
	        var minAcceptableScrollPosition = previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

	        // If scrolled less than minimum amount, scroll to minimum amount
	        // so column on right of viewport
	        if (scrollX < minAcceptableScrollPosition) {
	          scrollX = minAcceptableScrollPosition;
	        }

	        // If scrolled more than previous columns, at least part of column will be offscreen to left
	        // Scroll so column is flush with left edge of viewport
	        if (scrollX > previousColumnsWidth) {
	          scrollX = previousColumnsWidth;
	        }
	      }
	    }

	    var scrollContentWidth = _FixedDataTableWidthHelper2.default.getTotalWidth(columns);

	    var horizontalScrollbarVisible = scrollContentWidth > adjustedWidth && props.overflowX !== 'hidden' && props.showScrollbarX !== false;

	    if (horizontalScrollbarVisible) {
	      bodyHeight -= _Scrollbar2.default.SIZE;
	      totalHeightNeeded += _Scrollbar2.default.SIZE;
	      totalHeightReserved += _Scrollbar2.default.SIZE;
	      // If the horizontal scrollbar appears, the vertical scrollbar may now be needed
	      // since the bottom row might be partially obscured by the horizontal scrollbar.
	      // We also need to make sure we don't double-dip and adjust the width twice
	      var notAdjusted = adjustedWidth === props.width;
	      maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
	      if (notAdjusted && maxScrollY) {
	        adjustedWidth = adjustedWidth - _Scrollbar2.default.SIZE - 1;
	      }
	    }

	    var maxScrollX = Math.max(0, scrollContentWidth - adjustedWidth);
	    scrollX = Math.min(scrollX, maxScrollX);
	    scrollY = Math.min(scrollY, maxScrollY);

	    if (!maxScrollY) {
	      // no vertical scrollbar necessary, use the totals we tracked so we
	      // can shrink-to-fit vertically
	      if (useMaxHeight) {
	        height = totalHeightNeeded;
	      }
	      bodyHeight = totalHeightNeeded - totalHeightReserved;
	    }

	    this._scrollHelper.setViewportHeight(bodyHeight);

	    // This calculation is synonymous to Element.scrollTop
	    var scrollTop = Math.abs(firstRowOffset - this._scrollHelper.getRowPosition(firstRowIndex));
	    // This case can happen when the user is completely scrolled down and resizes the viewport to be taller vertically.
	    // This is because we set the viewport height after having calculated the rows
	    if (scrollTop !== scrollY) {
	      scrollTop = maxScrollY;
	      scrollState = this._scrollHelper.scrollTo(scrollTop);
	      firstRowIndex = scrollState.index;
	      firstRowOffset = scrollState.offset;
	      scrollY = scrollState.position;
	    }

	    var cellGroupWrapperHeight = props.cellGroupWrapperHeight;

	    // The order of elements in this object metters and bringing bodyHeight,
	    // height or useGroupHeader to the top can break various features
	    var newState = _extends({
	      isColumnResizing: oldState && oldState.isColumnResizing
	    }, columnInfo, props, {

	      columns: columns,
	      columnGroups: columnGroups,
	      columnResizingData: columnResizingData,
	      firstRowIndex: firstRowIndex,
	      firstRowOffset: firstRowOffset,
	      horizontalScrollbarVisible: horizontalScrollbarVisible,
	      maxScrollX: maxScrollX,
	      maxScrollY: maxScrollY,
	      reservedHeight: totalHeightReserved,
	      scrollContentHeight: scrollContentHeight,
	      scrollX: scrollX,
	      scrollY: scrollY,
	      // These properties may overwrite properties defined in
	      // columnInfo and props
	      bodyHeight: bodyHeight,
	      height: height,
	      cellGroupWrapperHeight: cellGroupWrapperHeight,
	      groupHeaderHeight: groupHeaderHeight,
	      useGroupHeader: useGroupHeader
	    });

	    return newState;
	  },
	  _selectColumnElement: function _selectColumnElement( /*string*/type, /*array*/columns) /*array*/{
	    var newColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      var column = columns[i];
	      newColumns.push(_React2.default.cloneElement(column, {
	        cell: type ? column.props[type] : column.props[CELL]
	      }));
	    }
	    return newColumns;
	  },
	  _splitColumnTypes: function _splitColumnTypes( /*array*/columns) /*object*/{
	    var fixedColumns = [];
	    var fixedRightColumns = [];
	    var scrollableColumns = [];
	    for (var i = 0; i < columns.length; ++i) {
	      if (columns[i].props.fixed) {
	        fixedColumns.push(columns[i]);
	      } else if (columns[i].props.fixedRight) {
	        fixedRightColumns.push(columns[i]);
	      } else {
	        scrollableColumns.push(columns[i]);
	      }
	    }
	    return {
	      fixed: fixedColumns,
	      fixedRight: fixedRightColumns,
	      scrollable: scrollableColumns
	    };
	  },
	  _onScroll: function _onScroll( /*number*/deltaX, /*number*/deltaY) {
	    if (!this._isScrolling) {
	      this._didScrollStart();
	    }
	    var x = this.state.scrollX;
	    if (Math.abs(deltaY) > Math.abs(deltaX) && this.props.overflowY !== 'hidden') {
	      var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
	      var onVerticalScroll = this.props.onVerticalScroll;
	      if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
	        var maxScrollY = Math.max(0, scrollState.contentHeight - this.state.bodyHeight);
	        this.setState({
	          firstRowIndex: scrollState.index,
	          firstRowOffset: scrollState.offset,
	          scrollY: scrollState.position,
	          scrollContentHeight: scrollState.contentHeight,
	          maxScrollY: maxScrollY
	        });
	      }
	    } else if (deltaX && this.props.overflowX !== 'hidden') {
	      x += deltaX;
	      x = x < 0 ? 0 : x;
	      x = x > this.state.maxScrollX ? this.state.maxScrollX : x;

	      //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
	      var onHorizontalScroll = this.props.onHorizontalScroll;
	      if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
	        this.setState({
	          scrollX: x
	        });
	      }
	    }

	    this._didScrollStop();
	  },
	  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
	    if (scrollPos === this.state.scrollX) {
	      return;
	    }

	    if (!this._isScrolling) {
	      this._didScrollStart();
	    }
	    var onHorizontalScroll = this.props.onHorizontalScroll;
	    if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
	      this.setState({
	        scrollX: scrollPos
	      });
	    }
	    this._didScrollStop();
	  },
	  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
	    if (scrollPos === this.state.scrollY) {
	      return;
	    }

	    if (!this._isScrolling) {
	      this._didScrollStart();
	    }
	    var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));

	    var onVerticalScroll = this.props.onVerticalScroll;
	    if (onVerticalScroll ? onVerticalScroll(scrollState.position) : true) {
	      this.setState({
	        firstRowIndex: scrollState.index,
	        firstRowOffset: scrollState.offset,
	        scrollY: scrollState.position,
	        scrollContentHeight: scrollState.contentHeight
	      });
	      this._didScrollStop();
	    }
	  },
	  _didScrollStart: function _didScrollStart() {
	    if (this._isScrolling) {
	      return;
	    }

	    this._isScrolling = true;
	    if (this.props.onScrollStart) {
	      this.props.onScrollStart(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
	    }
	  },


	  // We need two versions of this function, one to finish up synchronously (for
	  // example, in componentWillUnmount), and a debounced version for normal
	  // scroll handling.
	  _didScrollStopSync: function _didScrollStopSync() {
	    if (!this._isScrolling) {
	      return;
	    }

	    this._isScrolling = false;
	    this.setState({ redraw: true });
	    if (this.props.onScrollEnd) {
	      this.props.onScrollEnd(this.state.scrollX, this.state.scrollY, this.state.firstRowIndex);
	    }
	  }
	});

	var HorizontalScrollbar = (0, _createReactClass2.default)({
	  displayName: 'HorizontalScrollbar',
	  mixins: [_ReactComponentWithPureRenderMixin2.default],

	  propTypes: {
	    contentSize: _propTypes2.default.number.isRequired,
	    offset: _propTypes2.default.number.isRequired,
	    onScroll: _propTypes2.default.func.isRequired,
	    position: _propTypes2.default.number.isRequired,
	    size: _propTypes2.default.number.isRequired
	  },

	  componentWillMount: function componentWillMount() {
	    this._initialRender = true;
	  },
	  componentDidMount: function componentDidMount() {
	    this._initialRender = false;
	  },
	  render: function render() /*object*/{
	    var outerContainerStyle = {
	      height: _Scrollbar2.default.SIZE,
	      width: this.props.size
	    };
	    var innerContainerStyle = {
	      height: _Scrollbar2.default.SIZE,
	      position: 'absolute',
	      overflow: 'hidden',
	      width: this.props.size
	    };
	    (0, _FixedDataTableTranslateDOMPosition2.default)(innerContainerStyle, 0, this.props.offset, this._initialRender);

	    return _React2.default.createElement(
	      'div',
	      {
	        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/horizontalScrollbar'), (0, _cx2.default)('public/fixedDataTable/horizontalScrollbar')),
	        style: outerContainerStyle },
	      _React2.default.createElement(
	        'div',
	        { style: innerContainerStyle },
	        _React2.default.createElement(_Scrollbar2.default, _extends({}, this.props, {
	          isOpaque: true,
	          orientation: 'horizontal',
	          offset: undefined
	        }))
	      )
	    );
	  }
	});

	module.exports = FixedDataTable;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _FixedDataTableRowBuffer = __webpack_require__(105);

	var _FixedDataTableRowBuffer2 = _interopRequireDefault(_FixedDataTableRowBuffer);

	var _FixedDataTableRow = __webpack_require__(38);

	var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	var _joinClasses = __webpack_require__(11);

	var _joinClasses2 = _interopRequireDefault(_joinClasses);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableBufferedRows
	 * @typechecks
	 */

	var FixedDataTableBufferedRows = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTableBufferedRows',

	  propTypes: {
	    bufferRowCount: _propTypes2.default.number,
	    isScrolling: _propTypes2.default.bool,
	    defaultRowHeight: _propTypes2.default.number.isRequired,
	    firstRowIndex: _propTypes2.default.number.isRequired,
	    firstRowOffset: _propTypes2.default.number.isRequired,
	    fixedColumns: _propTypes2.default.array.isRequired,
	    fixedRightColumns: _propTypes2.default.array.isRequired,
	    height: _propTypes2.default.number.isRequired,
	    offsetTop: _propTypes2.default.number.isRequired,
	    onRowClick: _propTypes2.default.func,
	    onRowDoubleClick: _propTypes2.default.func,
	    onRowMouseDown: _propTypes2.default.func,
	    onRowMouseUp: _propTypes2.default.func,
	    onRowMouseEnter: _propTypes2.default.func,
	    onRowMouseLeave: _propTypes2.default.func,
	    onRowTouchStart: _propTypes2.default.func,
	    onRowTouchEnd: _propTypes2.default.func,
	    onRowTouchMove: _propTypes2.default.func,
	    rowClassNameGetter: _propTypes2.default.func,
	    rowsCount: _propTypes2.default.number.isRequired,
	    rowHeightGetter: _propTypes2.default.func,
	    subRowHeight: _propTypes2.default.number,
	    subRowHeightGetter: _propTypes2.default.func,
	    rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
	    rowKeyGetter: _propTypes2.default.func,
	    rowPositionGetter: _propTypes2.default.func.isRequired,
	    scrollLeft: _propTypes2.default.number.isRequired,
	    scrollableColumns: _propTypes2.default.array.isRequired,
	    showLastRowBorder: _propTypes2.default.bool,
	    width: _propTypes2.default.number.isRequired
	  },

	  getInitialState: function getInitialState() /*object*/{
	    this._rowBuffer = new _FixedDataTableRowBuffer2.default(this.props.rowsCount, this.props.defaultRowHeight, this.props.height, this._getRowHeight, this.props.bufferRowCount);
	    return {
	      rowsToRender: this._rowBuffer.getRows(this.props.firstRowIndex, this.props.firstRowOffset)
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this._staticRowArray = [];
	    this._initialRender = true;
	  },
	  componentDidMount: function componentDidMount() {
	    setTimeout(this._updateBuffer, 1000);
	    this._initialRender = false;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    if (nextProps.rowsCount !== this.props.rowsCount || nextProps.defaultRowHeight !== this.props.defaultRowHeight || nextProps.height !== this.props.height) {
	      this._rowBuffer = new _FixedDataTableRowBuffer2.default(nextProps.rowsCount, nextProps.defaultRowHeight, nextProps.height, this._getRowHeight, this.props.bufferRowCount);
	    }
	    if (this.props.isScrolling && !nextProps.isScrolling) {
	      this._updateBuffer();
	    } else {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRows(nextProps.firstRowIndex, nextProps.firstRowOffset)
	      });
	    }
	  },
	  _updateBuffer: function _updateBuffer() {
	    if (this._rowBuffer) {
	      this.setState({
	        rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer()
	      });
	    }
	  },
	  shouldComponentUpdate: function shouldComponentUpdate() /*boolean*/{
	    // Don't add PureRenderMixin to this component please.
	    return true;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._rowBuffer = null;
	    this._staticRowArray.length = 0;
	  },
	  render: function render() /*object*/{
	    var props = this.props;
	    var rowClassNameGetter = props.rowClassNameGetter || _emptyFunction2.default;
	    var rowPositionGetter = props.rowPositionGetter;

	    var rowsToRender = this.state.rowsToRender;

	    //Sort the rows, we slice first to avoid changing original
	    var sortedRowsToRender = rowsToRender.slice().sort(function (a, b) {
	      return a - b;
	    });
	    var rowPositions = {};

	    //Row position calculation requires that rows are calculated in order
	    sortedRowsToRender.forEach(function (rowIndex) {
	      rowPositions[rowIndex] = rowPositionGetter(rowIndex);
	    });

	    this._staticRowArray.length = rowsToRender.length;

	    var baseOffsetTop = props.firstRowOffset - props.rowPositionGetter(props.firstRowIndex) + props.offsetTop;

	    for (var i = 0; i < rowsToRender.length; ++i) {
	      var rowIndex = rowsToRender[i];
	      var currentRowHeight = this._getRowHeight(rowIndex);
	      var currentSubRowHeight = this._getSubRowHeight(rowIndex);
	      var rowOffsetTop = baseOffsetTop + rowPositions[rowIndex];
	      var rowKey = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : i;

	      var hasBottomBorder = rowIndex === props.rowsCount - 1 && props.showLastRowBorder;

	      this._staticRowArray[i] = _React2.default.createElement(_FixedDataTableRow2.default, {
	        key: rowKey,
	        isScrolling: props.isScrolling,
	        index: rowIndex,
	        width: props.width,
	        height: currentRowHeight,
	        subRowHeight: currentSubRowHeight,
	        rowExpanded: props.rowExpanded,
	        scrollLeft: Math.round(props.scrollLeft),
	        offsetTop: Math.round(rowOffsetTop),
	        fixedColumns: props.fixedColumns,
	        fixedRightColumns: props.fixedRightColumns,
	        scrollableColumns: props.scrollableColumns,
	        onClick: props.onRowClick,
	        onDoubleClick: props.onRowDoubleClick,
	        onMouseDown: props.onRowMouseDown,
	        onMouseUp: props.onRowMouseUp,
	        onMouseEnter: props.onRowMouseEnter,
	        onMouseLeave: props.onRowMouseLeave,
	        onTouchStart: props.onRowTouchStart,
	        onTouchEnd: props.onRowTouchEnd,
	        onTouchMove: props.onRowTouchMove,
	        className: (0, _joinClasses2.default)(rowClassNameGetter(rowIndex), (0, _cx2.default)('public/fixedDataTable/bodyRow'), (0, _cx2.default)({
	          'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
	          'public/fixedDataTable/hasBottomBorder': hasBottomBorder
	        }))
	      });
	    }

	    return _React2.default.createElement(
	      'div',
	      null,
	      this._staticRowArray
	    );
	  },
	  _getRowHeight: function _getRowHeight( /*number*/index) /*number*/{
	    return this.props.rowHeightGetter ? this.props.rowHeightGetter(index) : this.props.defaultRowHeight;
	  },
	  _getSubRowHeight: function _getSubRowHeight( /*number*/index) /*number*/{
	    return this.props.subRowHeightGetter ? this.props.subRowHeightGetter(index) : this.props.subRowHeight;
	  }
	});

	module.exports = FixedDataTableBufferedRows;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _FixedDataTableCellDefault = __webpack_require__(34);

	var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

	var _FixedDataTableColumnReorderHandle = __webpack_require__(102);

	var _FixedDataTableColumnReorderHandle2 = _interopRequireDefault(_FixedDataTableColumnReorderHandle);

	var _FixedDataTableHelper = __webpack_require__(37);

	var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _joinClasses = __webpack_require__(11);

	var _joinClasses2 = _interopRequireDefault(_joinClasses);

	var _shallowEqual = __webpack_require__(41);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
	                                                                                                                                                                                                                              * Copyright Schrodinger, LLC
	                                                                                                                                                                                                                              * All rights reserved.
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              * This source code is licensed under the BSD-style license found in the
	                                                                                                                                                                                                                              * LICENSE file in the root directory of this source tree. An additional grant
	                                                                                                                                                                                                                              * of patent rights can be found in the PATENTS file in the same directory.
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              * @providesModule FixedDataTableCell
	                                                                                                                                                                                                                              * @typechecks
	                                                                                                                                                                                                                              */

	var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

	var DEFAULT_PROPS = {
	  align: 'left',
	  highlighted: false
	};

	var FixedDataTableCell = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTableCell',

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {
	    isScrolling: _propTypes2.default.bool,
	    align: _propTypes2.default.oneOf(['left', 'center', 'right']),
	    className: _propTypes2.default.string,
	    highlighted: _propTypes2.default.bool,
	    width: _propTypes2.default.number.isRequired,
	    minWidth: _propTypes2.default.number,
	    maxWidth: _propTypes2.default.number,
	    height: _propTypes2.default.number.isRequired,

	    cell: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]),

	    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	    /**
	     * The row index that will be passed to `cellRenderer` to render.
	     */
	    rowIndex: _propTypes2.default.number.isRequired,

	    /**
	     * Callback for when resizer knob (in FixedDataTableCell) is clicked
	     * to initialize resizing. Please note this is only on the cells
	     * in the header.
	     * @param number combinedWidth
	     * @param number left
	     * @param number width
	     * @param number minWidth
	     * @param number maxWidth
	     * @param number|string columnKey
	     * @param object event
	     */
	    onColumnResize: _propTypes2.default.func,
	    onColumnReorder: _propTypes2.default.func,

	    /**
	     * The left offset in pixels of the cell.
	     */
	    left: _propTypes2.default.number,

	    /**
	     * Flag for enhanced performance check
	     */
	    pureRendering: _propTypes2.default.bool,

	    /**
	     * Whether touch is enabled or not.
	     */
	    touchEnabled: _propTypes2.default.bool
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isReorderingThisColumn: false,
	      displacement: 0,
	      reorderingDisplacement: 0
	    };
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
	      return false;
	    }

	    //Performance check not enabled
	    if (!nextProps.pureRendering) {
	      return true;
	    }

	    var _props = this.props,
	        oldCell = _props.cell,
	        oldIsScrolling = _props.isScrolling,
	        oldProps = _objectWithoutProperties(_props, ['cell', 'isScrolling']);

	    var newCell = nextProps.cell,
	        newIsScrolling = nextProps.isScrolling,
	        newProps = _objectWithoutProperties(nextProps, ['cell', 'isScrolling']);

	    if (!(0, _shallowEqual2.default)(oldProps, newProps)) {
	      return true;
	    }

	    if (!oldCell || !newCell || oldCell.type !== newCell.type) {
	      return true;
	    }

	    if (!(0, _shallowEqual2.default)(oldCell.props, newCell.props)) {
	      return true;
	    }

	    return false;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(props) {
	    var left = props.left + this.state.displacement;

	    var newState = {
	      isReorderingThisColumn: false
	    };

	    if (props.isColumnReordering) {
	      var originalLeft = props.columnReorderingData.originalLeft;
	      var reorderCellLeft = originalLeft + props.columnReorderingData.dragDistance;
	      var farthestPossiblePoint = props.columnGroupWidth - props.columnReorderingData.columnWidth;

	      // ensure the cell isn't being dragged out of the column group
	      reorderCellLeft = Math.max(reorderCellLeft, 0);
	      reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);

	      if (props.columnKey === props.columnReorderingData.columnKey) {
	        newState.displacement = reorderCellLeft - props.left;
	        newState.isReorderingThisColumn = true;
	      } else {
	        var reorderCellRight = reorderCellLeft + props.columnReorderingData.columnWidth;
	        var reorderCellCenter = reorderCellLeft + props.columnReorderingData.columnWidth / 2;
	        var centerOfThisColumn = left + props.width / 2;

	        var cellIsBeforeOneBeingDragged = reorderCellCenter > centerOfThisColumn;
	        var cellWasOriginallyBeforeOneBeingDragged = originalLeft > props.left;
	        var changedPosition = false;

	        var dragPoint, thisCellPoint;
	        if (cellIsBeforeOneBeingDragged) {
	          if (reorderCellLeft < centerOfThisColumn) {
	            changedPosition = true;
	            if (cellWasOriginallyBeforeOneBeingDragged) {
	              newState.displacement = props.columnReorderingData.columnWidth;
	            } else {
	              newState.displacement = 0;
	            }
	          }
	        } else {
	          if (reorderCellRight > centerOfThisColumn) {
	            changedPosition = true;
	            if (cellWasOriginallyBeforeOneBeingDragged) {
	              newState.displacement = 0;
	            } else {
	              newState.displacement = props.columnReorderingData.columnWidth * -1;
	            }
	          }
	        }

	        if (changedPosition) {
	          if (cellIsBeforeOneBeingDragged) {
	            if (!props.columnReorderingData.columnAfter) {
	              props.columnReorderingData.columnAfter = props.columnKey;
	            }
	          } else {
	            props.columnReorderingData.columnBefore = props.columnKey;
	          }
	        } else if (cellIsBeforeOneBeingDragged) {
	          props.columnReorderingData.columnBefore = props.columnKey;
	        } else if (!props.columnReorderingData.columnAfter) {
	          props.columnReorderingData.columnAfter = props.columnKey;
	        }
	      }
	    } else {
	      newState.displacement = 0;
	    }

	    this.setState(newState);
	  },
	  getDefaultProps: function getDefaultProps() /*object*/{
	    return DEFAULT_PROPS;
	  },
	  render: function render() /*object*/{
	    var _props2 = this.props,
	        height = _props2.height,
	        width = _props2.width,
	        columnKey = _props2.columnKey,
	        props = _objectWithoutProperties(_props2, ['height', 'width', 'columnKey']);

	    var style = {
	      height: height,
	      width: width
	    };

	    if (DIR_SIGN === 1) {
	      style.left = props.left;
	    } else {
	      style.right = props.left;
	    }

	    if (this.state.isReorderingThisColumn) {
	      style.transform = 'translateX(' + this.state.displacement + 'px) translateZ(0)';
	      style.zIndex = 1;
	    }

	    var className = (0, _joinClasses2.default)((0, _cx2.default)({
	      'fixedDataTableCellLayout/main': true,
	      'fixedDataTableCellLayout/lastChild': props.lastChild,
	      'fixedDataTableCellLayout/alignRight': props.align === 'right',
	      'fixedDataTableCellLayout/alignCenter': props.align === 'center',
	      'public/fixedDataTableCell/alignRight': props.align === 'right',
	      'public/fixedDataTableCell/highlighted': props.highlighted,
	      'public/fixedDataTableCell/main': true,
	      'public/fixedDataTableCell/hasReorderHandle': !!props.onColumnReorder,
	      'public/fixedDataTableCell/reordering': this.state.isReorderingThisColumn
	    }), props.className);

	    var columnResizerComponent;
	    if (props.onColumnResize) {
	      var columnResizerStyle = {
	        height: height
	      };
	      columnResizerComponent = _React2.default.createElement(
	        'div',
	        {
	          className: (0, _cx2.default)('fixedDataTableCellLayout/columnResizerContainer'),
	          style: columnResizerStyle,
	          onMouseDown: this._onColumnResizerMouseDown,
	          onTouchStart: this.props.touchEnabled ? this._onColumnResizerMouseDown : null,
	          onTouchEnd: this.props.touchEnabled ? function (e) {
	            return e.stopPropagation();
	          } : null,
	          onTouchMove: this.props.touchEnabled ? function (e) {
	            return e.stopPropagation();
	          } : null },
	        _React2.default.createElement('div', {
	          className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/columnResizerKnob'), (0, _cx2.default)('public/fixedDataTableCell/columnResizerKnob')),
	          style: columnResizerStyle
	        })
	      );
	    }

	    var columnReorderComponent;
	    if (props.onColumnReorder) {
	      //header row
	      columnReorderComponent = _React2.default.createElement(_FixedDataTableColumnReorderHandle2.default, _extends({
	        columnKey: this.columnKey,
	        touchEnabled: this.props.touchEnabled,
	        onMouseDown: this._onColumnReorderMouseDown,
	        onTouchStart: this._onColumnReorderMouseDown,
	        height: height
	      }, this.props));
	    }

	    var cellProps = {
	      columnKey: columnKey,
	      height: height,
	      width: width
	    };

	    if (props.rowIndex >= 0) {
	      cellProps.rowIndex = props.rowIndex;
	    }

	    var content;
	    if (_React2.default.isValidElement(props.cell)) {
	      content = _React2.default.cloneElement(props.cell, cellProps);
	    } else if (typeof props.cell === 'function') {
	      content = props.cell(cellProps);
	    } else {
	      content = _React2.default.createElement(
	        _FixedDataTableCellDefault2.default,
	        cellProps,
	        props.cell
	      );
	    }

	    return _React2.default.createElement(
	      'div',
	      { className: className, style: style },
	      columnResizerComponent,
	      columnReorderComponent,
	      content
	    );
	  },
	  _onColumnResizerMouseDown: function _onColumnResizerMouseDown( /*object*/event) {
	    this.props.onColumnResize(this.props.left, this.props.width, this.props.minWidth, this.props.maxWidth, this.props.columnKey, event);
	    /**
	     * This prevents the rows from moving around when we resize the
	     * headers on touch devices.
	     */
	    if (this.props.touchEnabled) {
	      event.stopPropagation();
	    }
	  },
	  _onColumnReorderMouseDown: function _onColumnReorderMouseDown( /*object*/event) {
	    this.props.onColumnReorder(this.props.columnKey, this.props.width, this.props.left, event);
	  }
	});

	module.exports = FixedDataTableCell;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableCellGroup
	 * @typechecks
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _FixedDataTableHelper = __webpack_require__(37);

	var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _FixedDataTableCell = __webpack_require__(100);

	var _FixedDataTableCell2 = _interopRequireDefault(_FixedDataTableCell);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _FixedDataTableTranslateDOMPosition = __webpack_require__(14);

	var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

	var FixedDataTableCellGroupImpl = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTableCellGroupImpl',

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {

	    /**
	     * Array of <FixedDataTableColumn />.
	     */
	    columns: _propTypes2.default.array.isRequired,

	    isScrolling: _propTypes2.default.bool,

	    left: _propTypes2.default.number,

	    onColumnResize: _propTypes2.default.func,

	    onColumnReorder: _propTypes2.default.func,
	    onColumnReorderMove: _propTypes2.default.func,
	    onColumnReorderEnd: _propTypes2.default.func,

	    height: _propTypes2.default.number.isRequired,

	    /**
	     * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
	     */
	    cellGroupWrapperHeight: _propTypes2.default.number,

	    rowHeight: _propTypes2.default.number.isRequired,

	    rowIndex: _propTypes2.default.number.isRequired,

	    width: _propTypes2.default.number.isRequired,

	    zIndex: _propTypes2.default.number.isRequired,

	    touchEnabled: _propTypes2.default.bool
	  },

	  componentWillMount: function componentWillMount() {
	    this._initialRender = true;
	  },
	  componentDidMount: function componentDidMount() {
	    this._initialRender = false;
	  },
	  render: function render() /*object*/{
	    var props = this.props;
	    var columns = props.columns;
	    var cells = new Array(columns.length);

	    var contentWidth = this._getColumnsWidth(columns);

	    var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
	      return acc || props.columnReorderingData.columnKey === column.props.columnKey;
	    }, false);

	    var currentPosition = 0;
	    for (var i = 0, j = columns.length; i < j; i++) {
	      var columnProps = columns[i].props;
	      var recycable = columnProps.allowCellsRecycling && !isColumnReordering;
	      if (!recycable || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
	        var key = columnProps.columnKey || 'cell_' + i;
	        cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, currentPosition, key, contentWidth, isColumnReordering);
	      }
	      currentPosition += columnProps.width;
	    }
	    var style = {
	      height: props.height,
	      position: 'absolute',
	      width: contentWidth,
	      zIndex: props.zIndex
	    };
	    (0, _FixedDataTableTranslateDOMPosition2.default)(style, -1 * DIR_SIGN * props.left, 0, this._initialRender);

	    return _React2.default.createElement(
	      'div',
	      {
	        className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroup'),
	        style: style },
	      cells
	    );
	  },
	  _renderCell: function _renderCell(
	  /*number*/rowIndex,
	  /*number*/height,
	  /*object*/columnProps,
	  /*number*/left,
	  /*string*/key,
	  /*number*/columnGroupWidth,
	  /*boolean*/isColumnReordering) /*object*/{

	    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
	    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

	    var cellIsReorderable = columnProps.isReorderable && this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
	    var onColumnReorder = cellIsReorderable ? this.props.onColumnReorder : null;

	    var className = columnProps.cellClassName;
	    var pureRendering = columnProps.pureRendering || false;

	    return _React2.default.createElement(_FixedDataTableCell2.default, {
	      isScrolling: this.props.isScrolling,
	      align: columnProps.align,
	      className: className,
	      height: height,
	      key: key,
	      maxWidth: columnProps.maxWidth,
	      minWidth: columnProps.minWidth,
	      touchEnabled: this.props.touchEnabled,
	      onColumnResize: onColumnResize,
	      onColumnReorder: onColumnReorder,
	      onColumnReorderMove: this.props.onColumnReorderMove,
	      onColumnReorderEnd: this.props.onColumnReorderEnd,
	      isColumnReordering: isColumnReordering,
	      columnReorderingData: this.props.columnReorderingData,
	      rowIndex: rowIndex,
	      columnKey: columnProps.columnKey,
	      width: columnProps.width,
	      left: left,
	      cell: columnProps.cell,
	      columnGroupWidth: columnGroupWidth,
	      pureRendering: pureRendering
	    });
	  },
	  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
	    var width = 0;
	    for (var i = 0; i < columns.length; ++i) {
	      width += columns[i].props.width;
	    }
	    return width;
	  }
	});

	var FixedDataTableCellGroup = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTableCellGroup',

	  /**
	   * PropTypes are disabled in this component, because having them on slows
	   * down the FixedDataTable hugely in DEV mode. You can enable them back for
	   * development, but please don't commit this component with enabled propTypes.
	   */
	  propTypes_DISABLED_FOR_PERFORMANCE: {
	    isScrolling: _propTypes2.default.bool,
	    /**
	     * Height of the row.
	     */
	    height: _propTypes2.default.number.isRequired,

	    offsetLeft: _propTypes2.default.number,

	    left: _propTypes2.default.number,
	    /**
	     * Z-index on which the row will be displayed. Used e.g. for keeping
	     * header and footer in front of other rows.
	     */
	    zIndex: _propTypes2.default.number.isRequired
	  },

	  shouldComponentUpdate: function shouldComponentUpdate( /*object*/nextProps) /*boolean*/{
	    return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
	  },
	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      left: 0,
	      offsetLeft: 0
	    };
	  },
	  render: function render() /*object*/{
	    var _props = this.props,
	        offsetLeft = _props.offsetLeft,
	        props = _objectWithoutProperties(_props, ['offsetLeft']);

	    var style = {
	      height: props.cellGroupWrapperHeight || props.height,
	      width: props.width
	    };

	    if (DIR_SIGN === 1) {
	      style.left = offsetLeft;
	    } else {
	      style.right = offsetLeft;
	    }

	    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

	    return _React2.default.createElement(
	      'div',
	      {
	        style: style,
	        className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroupWrapper') },
	      _React2.default.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
	        onColumnResize: onColumnResize
	      }))
	    );
	  },
	  _onColumnResize: function _onColumnResize(
	  /*number*/left,
	  /*number*/width,
	  /*?number*/minWidth,
	  /*?number*/maxWidth,
	  /*string|number*/columnKey,
	  /*object*/event) {
	    this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, left - this.props.left + width, width, minWidth, maxWidth, columnKey, event);
	  }
	});

	module.exports = FixedDataTableCellGroup;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _DOMMouseMoveTracker = __webpack_require__(19);

	var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

	var _Locale = __webpack_require__(21);

	var _Locale2 = _interopRequireDefault(_Locale);

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ReactComponentWithPureRenderMixin = __webpack_require__(15);

	var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

	var _FixedDataTableEventHelper = __webpack_require__(20);

	var _FixedDataTableEventHelper2 = _interopRequireDefault(_FixedDataTableEventHelper);

	var _clamp = __webpack_require__(16);

	var _clamp2 = _interopRequireDefault(_clamp);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FixedDataTableColumnReorderHandle = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTableColumnReorderHandle',
	  mixins: [_ReactComponentWithPureRenderMixin2.default],

	  propTypes: {

	    /**
	     * When resizing is complete this is called.
	     */
	    onColumnReorderEnd: _propTypes2.default.func,

	    /**
	     * Column key for the column being reordered.
	     */
	    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	    /**
	     * Whether the reorder handle should respond to touch events or not.
	     */
	    touchEnabled: _propTypes2.default.bool
	  },

	  getInitialState: function getInitialState() /*object*/{
	    return {
	      dragDistance: 0
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {},
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._mouseMoveTracker) {
	      cancelAnimationFrame(this.frameId);
	      this.frameId = null;
	      this._mouseMoveTracker.releaseMouseMoves();
	      this._mouseMoveTracker = null;
	    }
	  },
	  render: function render() /*object*/{
	    var style = {
	      height: this.props.height
	    };
	    return _React2.default.createElement('div', {
	      className: (0, _cx2.default)({
	        'fixedDataTableCellLayout/columnReorderContainer': true,
	        'fixedDataTableCellLayout/columnReorderContainer/active': false
	      }),
	      onMouseDown: this.onMouseDown,
	      onTouchStart: this.props.touchEnabled ? this.onMouseDown : null,
	      onTouchEnd: this.props.touchEnabled ? function (e) {
	        return e.stopPropagation();
	      } : null,
	      onTouchMove: this.props.touchEnabled ? function (e) {
	        return e.stopPropagation();
	      } : null,
	      style: style });
	  },
	  onMouseDown: function onMouseDown(event) {
	    var targetRect = event.target.getBoundingClientRect();
	    var coordinates = _FixedDataTableEventHelper2.default.getCoordinatesFromEvent(event);

	    var mouseLocationInElement = coordinates.x - targetRect.offsetLeft;
	    var mouseLocationInRelationToColumnGroup = mouseLocationInElement + event.target.parentElement.offsetLeft;

	    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMove, this._onColumnReorderEnd, document.body, this.props.touchEnabled);
	    this._mouseMoveTracker.captureMouseMoves(event);
	    this.setState({
	      dragDistance: 0
	    });
	    this.props.onMouseDown({
	      columnKey: this.props.columnKey,
	      mouseLocation: {
	        dragDistance: 0,
	        inElement: mouseLocationInElement,
	        inColumnGroup: mouseLocationInRelationToColumnGroup
	      }
	    });

	    this._distance = 0;
	    this._animating = true;
	    this.frameId = requestAnimationFrame(this._updateState);

	    /**
	     * This prevents the rows from moving around when we drag the
	     * headers on touch devices.
	     */
	    if (this.props.touchEnabled) {
	      event.stopPropagation();
	    }
	  },
	  _onMove: function _onMove( /*number*/deltaX) {
	    this._distance = this.state.dragDistance + deltaX;
	  },
	  _onColumnReorderEnd: function _onColumnReorderEnd( /*boolean*/cancelReorder) {
	    this._animating = false;
	    cancelAnimationFrame(this.frameId);
	    this.frameId = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.props.columnReorderingData.cancelReorder = cancelReorder;
	    this.props.onColumnReorderEnd();
	  },
	  _updateState: function _updateState() {
	    if (this._animating) {
	      this.frameId = requestAnimationFrame(this._updateState);
	    }
	    this.setState({
	      dragDistance: this._distance
	    });
	    this.props.onColumnReorderMove(this._distance);
	  }
	}); /**
	     * Copyright Schrodinger, LLC
	     * All rights reserved.
	     *
	     * This source code is licensed under the BSD-style license found in the
	     * LICENSE file in the root directory of this source tree. An additional grant
	     * of patent rights can be found in the PATENTS file in the same directory.
	     *
	     * This is to be used with the FixedDataTable. It is a header icon
	     * that allows you to reorder the corresponding column.
	     *
	     * @providesModule FixedDataTableColumnReorderHandle
	     * @typechecks
	     */

	module.exports = FixedDataTableColumnReorderHandle;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _DOMMouseMoveTracker = __webpack_require__(19);

	var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

	var _Locale = __webpack_require__(21);

	var _Locale2 = _interopRequireDefault(_Locale);

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ReactComponentWithPureRenderMixin = __webpack_require__(15);

	var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

	var _clamp = __webpack_require__(16);

	var _clamp2 = _interopRequireDefault(_clamp);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is to be used with the FixedDataTable. It is a read line
	 * that when you click on a column that is resizable appears and allows
	 * you to resize the corresponding column.
	 *
	 * @providesModule FixedDataTableColumnResizeHandle
	 * @typechecks
	 */

	var FixedDataTableColumnResizeHandle = (0, _createReactClass2.default)({
	  displayName: 'FixedDataTableColumnResizeHandle',
	  mixins: [_ReactComponentWithPureRenderMixin2.default],

	  propTypes: {
	    visible: _propTypes2.default.bool.isRequired,

	    /**
	     * This is the height of the line
	     */
	    height: _propTypes2.default.number.isRequired,

	    /**
	     * Offset from left border of the table, please note
	     * that the line is a border on diff. So this is really the
	     * offset of the column itself.
	     */
	    leftOffset: _propTypes2.default.number.isRequired,

	    /**
	     * Height of the clickable region of the line.
	     * This is assumed to be at the top of the line.
	     */
	    knobHeight: _propTypes2.default.number.isRequired,

	    /**
	     * The line is a border on a diff, so this is essentially
	     * the width of column.
	     */
	    initialWidth: _propTypes2.default.number,

	    /**
	     * The minimum width this dragger will collapse to
	     */
	    minWidth: _propTypes2.default.number,

	    /**
	     * The maximum width this dragger will collapse to
	     */
	    maxWidth: _propTypes2.default.number,

	    /**
	     * Initial click event on the header cell.
	     */
	    initialEvent: _propTypes2.default.object,

	    /**
	     * When resizing is complete this is called.
	     */
	    onColumnResizeEnd: _propTypes2.default.func,

	    /**
	     * Column key for the column being resized.
	     */
	    columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

	    /**
	     * Whether the resize handle should respond to touch events or not.
	     */
	    touchEnabled: _propTypes2.default.bool
	  },

	  getInitialState: function getInitialState() /*object*/{
	    return {
	      width: 0,
	      cursorDelta: 0
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {
	    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
	      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
	      this.setState({
	        width: newProps.initialWidth,
	        cursorDelta: newProps.initialWidth
	      });
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMove, this._onColumnResizeEnd, document.body, this.props.touchEnabled);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this._mouseMoveTracker = null;
	  },
	  render: function render() /*object*/{
	    var style = {
	      width: this.state.width,
	      height: this.props.height
	    };
	    if (_Locale2.default.isRTL()) {
	      style.right = this.props.leftOffset;
	    } else {
	      style.left = this.props.leftOffset;
	    }
	    return _React2.default.createElement(
	      'div',
	      {
	        className: (0, _cx2.default)({
	          'fixedDataTableColumnResizerLineLayout/main': true,
	          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
	          'public/fixedDataTableColumnResizerLine/main': true
	        }),
	        style: style },
	      _React2.default.createElement('div', {
	        className: (0, _cx2.default)('fixedDataTableColumnResizerLineLayout/mouseArea'),
	        style: { height: this.props.height }
	      })
	    );
	  },
	  _onMove: function _onMove( /*number*/deltaX) {
	    if (_Locale2.default.isRTL()) {
	      deltaX = -deltaX;
	    }
	    var newWidth = this.state.cursorDelta + deltaX;
	    var newColumnWidth = (0, _clamp2.default)(newWidth, this.props.minWidth, this.props.maxWidth);

	    // Please note cursor delta is the different between the currently width
	    // and the new width.
	    this.setState({
	      width: newColumnWidth,
	      cursorDelta: newWidth
	    });
	  },
	  _onColumnResizeEnd: function _onColumnResizeEnd() {
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.props.onColumnResizeEnd(this.state.width, this.props.columnKey);
	  }
	});

	module.exports = FixedDataTableColumnResizeHandle;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRoot
	 */

	'use strict';

	var _FixedDataTable = __webpack_require__(98);

	var _FixedDataTable2 = _interopRequireDefault(_FixedDataTable);

	var _FixedDataTableCellDefault = __webpack_require__(34);

	var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

	var _FixedDataTableColumn = __webpack_require__(35);

	var _FixedDataTableColumn2 = _interopRequireDefault(_FixedDataTableColumn);

	var _FixedDataTableColumnGroup = __webpack_require__(36);

	var _FixedDataTableColumnGroup2 = _interopRequireDefault(_FixedDataTableColumnGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FixedDataTableRoot = {
	  Cell: _FixedDataTableCellDefault2.default,
	  Column: _FixedDataTableColumn2.default,
	  ColumnGroup: _FixedDataTableColumnGroup2.default,
	  Table: _FixedDataTable2.default
	};

	FixedDataTableRoot.version = '0.8.6';
	module.exports = FixedDataTableRoot;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableRowBuffer
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _IntegerBufferSet = __webpack_require__(109);

	var _IntegerBufferSet2 = _interopRequireDefault(_IntegerBufferSet);

	var _clamp = __webpack_require__(16);

	var _clamp2 = _interopRequireDefault(_clamp);

	var _invariant = __webpack_require__(10);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MIN_BUFFER_ROWS = 3;
	var MAX_BUFFER_ROWS = 6;

	// FixedDataTableRowBuffer is a helper class that executes row buffering
	// logic for FixedDataTable. It figures out which rows should be rendered
	// and in which positions.

	var FixedDataTableRowBuffer = function () {
	  function FixedDataTableRowBuffer(
	  /*number*/rowsCount,
	  /*number*/defaultRowHeight,
	  /*number*/viewportHeight,
	  /*?function*/rowHeightGetter,
	  /*?number*/bufferRowCount) {
	    _classCallCheck(this, FixedDataTableRowBuffer);

	    (0, _invariant2.default)(defaultRowHeight !== 0, "defaultRowHeight musn't be equal 0 in FixedDataTableRowBuffer");

	    this._bufferSet = new _IntegerBufferSet2.default();
	    this._defaultRowHeight = defaultRowHeight;
	    this._viewportRowsBegin = 0;
	    this._viewportRowsEnd = 0;
	    this._maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;
	    this._bufferRowsCount = bufferRowCount != null ? bufferRowCount : (0, _clamp2.default)(Math.floor(this._maxVisibleRowCount / 2), MIN_BUFFER_ROWS, MAX_BUFFER_ROWS);
	    this._rowsCount = rowsCount;
	    this._rowHeightGetter = rowHeightGetter;
	    this._rows = [];
	    this._viewportHeight = viewportHeight;

	    this.getRows = this.getRows.bind(this);
	    this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this);
	  }

	  _createClass(FixedDataTableRowBuffer, [{
	    key: 'getRowsWithUpdatedBuffer',
	    value: function getRowsWithUpdatedBuffer() /*array*/{
	      var remainingBufferRows = 2 * this._bufferRowsCount;
	      var bufferRowIndex = Math.max(this._viewportRowsBegin - this._bufferRowsCount, 0);
	      while (bufferRowIndex < this._viewportRowsBegin) {
	        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
	        bufferRowIndex++;
	        remainingBufferRows--;
	      }
	      bufferRowIndex = this._viewportRowsEnd;
	      while (bufferRowIndex < this._rowsCount && remainingBufferRows > 0) {
	        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
	        bufferRowIndex++;
	        remainingBufferRows--;
	      }
	      return this._rows;
	    }
	  }, {
	    key: 'getRows',
	    value: function getRows(
	    /*number*/firstRowIndex,
	    /*number*/firstRowOffset) /*array*/{
	      var top = firstRowOffset;
	      var totalHeight = top;
	      var rowIndex = firstRowIndex;
	      var endIndex = Math.min(firstRowIndex + this._maxVisibleRowCount, this._rowsCount);

	      this._viewportRowsBegin = firstRowIndex;
	      while (rowIndex < endIndex || totalHeight < this._viewportHeight && rowIndex < this._rowsCount) {
	        this._addRowToBuffer(rowIndex, firstRowIndex, endIndex - 1);
	        totalHeight += this._rowHeightGetter(rowIndex);
	        ++rowIndex;
	        // Store index after the last viewport row as end, to be able to
	        // distinguish when there are no rows rendered in viewport
	        this._viewportRowsEnd = rowIndex;
	      }

	      return this._rows;
	    }
	  }, {
	    key: '_addRowToBuffer',
	    value: function _addRowToBuffer(
	    /*number*/rowIndex,
	    /*number*/firstViewportRowIndex,
	    /*number*/lastViewportRowIndex) {
	      var rowPosition = this._bufferSet.getValuePosition(rowIndex);
	      var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
	      var allowedRowsCount = viewportRowsCount + this._bufferRowsCount * 2;
	      if (rowPosition === null && this._bufferSet.getSize() >= allowedRowsCount) {
	        rowPosition = this._bufferSet.replaceFurthestValuePosition(firstViewportRowIndex, lastViewportRowIndex, rowIndex);
	      }
	      if (rowPosition === null) {
	        // We can't reuse any of existing positions for this row. We have to
	        // create new position
	        rowPosition = this._bufferSet.getNewPositionForValue(rowIndex);
	        this._rows[rowPosition] = rowIndex;
	      } else {
	        // This row already is in the table with rowPosition position or it
	        // can replace row that is in that position
	        this._rows[rowPosition] = rowIndex;
	      }
	    }
	  }]);

	  return FixedDataTableRowBuffer;
	}();

	module.exports = FixedDataTableRowBuffer;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableScrollHelper
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PrefixIntervalTree = __webpack_require__(111);

	var _PrefixIntervalTree2 = _interopRequireDefault(_PrefixIntervalTree);

	var _clamp = __webpack_require__(16);

	var _clamp2 = _interopRequireDefault(_clamp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BUFFER_ROWS = 5;
	var NO_ROWS_SCROLL_RESULT = {
	  index: 0,
	  offset: 0,
	  position: 0,
	  contentHeight: 0
	};

	var FixedDataTableScrollHelper = function () {
	  function FixedDataTableScrollHelper(
	  /*number*/rowCount,
	  /*number*/defaultRowHeight,
	  /*number*/viewportHeight,
	  /*?function*/rowHeightGetter) {
	    var _this = this;

	    var defaultSubRowHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	    var
	    /*?function*/subRowHeightGetter = arguments[5];

	    _classCallCheck(this, FixedDataTableScrollHelper);

	    var defaultFullRowHeight = defaultRowHeight + defaultSubRowHeight;
	    this._rowOffsets = _PrefixIntervalTree2.default.uniform(rowCount, defaultFullRowHeight);
	    this._storedHeights = new Array(rowCount);
	    for (var i = 0; i < rowCount; ++i) {
	      this._storedHeights[i] = defaultFullRowHeight;
	    }
	    this._rowCount = rowCount;
	    this._position = 0;
	    this._contentHeight = rowCount * defaultFullRowHeight;

	    this._rowHeightGetter = rowHeightGetter;
	    this._subRowHeightGetter = subRowHeightGetter;
	    this._fullRowHeightGetter = function (rowIdx) {
	      var rowHeight = _this._rowHeightGetter ? _this._rowHeightGetter(rowIdx) : defaultRowHeight;
	      var subRowHeight = _this._subRowHeightGetter ? _this._subRowHeightGetter(rowIdx) : defaultSubRowHeight;
	      return rowHeight + subRowHeight;
	    };
	    this._viewportHeight = viewportHeight;
	    this.scrollRowIntoView = this.scrollRowIntoView.bind(this);
	    this.setViewportHeight = this.setViewportHeight.bind(this);
	    this.scrollBy = this.scrollBy.bind(this);
	    this.scrollTo = this.scrollTo.bind(this);
	    this.scrollToRow = this.scrollToRow.bind(this);
	    this.setRowHeightGetter = this.setRowHeightGetter.bind(this);
	    this.setSubRowHeightGetter = this.setSubRowHeightGetter.bind(this);
	    this.getContentHeight = this.getContentHeight.bind(this);
	    this.getRowPosition = this.getRowPosition.bind(this);

	    this._updateHeightsInViewport(0, 0);
	  }

	  _createClass(FixedDataTableScrollHelper, [{
	    key: 'setRowHeightGetter',
	    value: function setRowHeightGetter( /*function*/rowHeightGetter) {
	      this._rowHeightGetter = rowHeightGetter;
	    }
	  }, {
	    key: 'setSubRowHeightGetter',
	    value: function setSubRowHeightGetter( /*function*/subRowHeightGetter) {
	      this._subRowHeightGetter = subRowHeightGetter;
	    }
	  }, {
	    key: 'setViewportHeight',
	    value: function setViewportHeight( /*number*/viewportHeight) {
	      this._viewportHeight = viewportHeight;
	    }
	  }, {
	    key: 'getContentHeight',
	    value: function getContentHeight() /*number*/{
	      return this._contentHeight;
	    }
	  }, {
	    key: '_updateHeightsInViewport',
	    value: function _updateHeightsInViewport(
	    /*number*/firstRowIndex,
	    /*number*/firstRowOffset) {
	      var top = firstRowOffset;
	      var index = firstRowIndex;
	      while (top <= this._viewportHeight && index < this._rowCount) {
	        this._updateRowHeight(index);
	        top += this._storedHeights[index];
	        index++;
	      }
	    }
	  }, {
	    key: '_updateHeightsAboveViewport',
	    value: function _updateHeightsAboveViewport( /*number*/firstRowIndex) {
	      var index = firstRowIndex - 1;
	      while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
	        var delta = this._updateRowHeight(index);
	        this._position += delta;
	        index--;
	      }
	    }
	  }, {
	    key: '_updateRowHeight',
	    value: function _updateRowHeight( /*number*/rowIndex) /*number*/{
	      if (rowIndex < 0 || rowIndex >= this._rowCount) {
	        return 0;
	      }
	      var newHeight = this._fullRowHeightGetter(rowIndex);
	      if (newHeight !== this._storedHeights[rowIndex]) {
	        var change = newHeight - this._storedHeights[rowIndex];
	        this._rowOffsets.set(rowIndex, newHeight);
	        this._storedHeights[rowIndex] = newHeight;
	        this._contentHeight += change;
	        return change;
	      }
	      return 0;
	    }
	  }, {
	    key: 'getRowPosition',
	    value: function getRowPosition( /*number*/rowIndex) /*number*/{
	      this._updateRowHeight(rowIndex);
	      return this._rowOffsets.sumUntil(rowIndex);
	    }
	  }, {
	    key: 'scrollBy',
	    value: function scrollBy( /*number*/delta) /*object*/{
	      if (this._rowCount === 0) {
	        return NO_ROWS_SCROLL_RESULT;
	      }
	      var firstRow = this._rowOffsets.greatestLowerBound(this._position);
	      firstRow = (0, _clamp2.default)(firstRow, 0, Math.max(this._rowCount - 1, 0));
	      var firstRowPosition = this._rowOffsets.sumUntil(firstRow);
	      var rowIndex = firstRow;
	      var position = this._position;

	      var rowHeightChange = this._updateRowHeight(rowIndex);
	      if (firstRowPosition !== 0) {
	        position += rowHeightChange;
	      }
	      var visibleRowHeight = this._storedHeights[rowIndex] - (position - firstRowPosition);

	      if (delta >= 0) {

	        while (delta > 0 && rowIndex < this._rowCount) {
	          if (delta < visibleRowHeight) {
	            position += delta;
	            delta = 0;
	          } else {
	            delta -= visibleRowHeight;
	            position += visibleRowHeight;
	            rowIndex++;
	          }
	          if (rowIndex < this._rowCount) {
	            this._updateRowHeight(rowIndex);
	            visibleRowHeight = this._storedHeights[rowIndex];
	          }
	        }
	      } else if (delta < 0) {
	        delta = -delta;
	        var invisibleRowHeight = this._storedHeights[rowIndex] - visibleRowHeight;

	        while (delta > 0 && rowIndex >= 0) {
	          if (delta < invisibleRowHeight) {
	            position -= delta;
	            delta = 0;
	          } else {
	            position -= invisibleRowHeight;
	            delta -= invisibleRowHeight;
	            rowIndex--;
	          }
	          if (rowIndex >= 0) {
	            var change = this._updateRowHeight(rowIndex);
	            invisibleRowHeight = this._storedHeights[rowIndex];
	            position += change;
	          }
	        }
	      }

	      var maxPosition = this._contentHeight - this._viewportHeight;
	      position = (0, _clamp2.default)(position, 0, maxPosition);
	      this._position = position;
	      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
	      firstRowIndex = (0, _clamp2.default)(firstRowIndex, 0, Math.max(this._rowCount - 1, 0));
	      firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
	      var firstRowOffset = firstRowPosition - position;

	      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
	      this._updateHeightsAboveViewport(firstRowIndex);

	      return {
	        index: firstRowIndex,
	        offset: firstRowOffset,
	        position: this._position,
	        contentHeight: this._contentHeight
	      };
	    }
	  }, {
	    key: '_getRowAtEndPosition',
	    value: function _getRowAtEndPosition( /*number*/rowIndex) /*number*/{
	      // We need to update enough rows above the selected one to be sure that when
	      // we scroll to selected position all rows between first shown and selected
	      // one have most recent heights computed and will not resize
	      this._updateRowHeight(rowIndex);
	      var currentRowIndex = rowIndex;
	      var top = this._storedHeights[currentRowIndex];
	      while (top < this._viewportHeight && currentRowIndex >= 0) {
	        currentRowIndex--;
	        if (currentRowIndex >= 0) {
	          this._updateRowHeight(currentRowIndex);
	          top += this._storedHeights[currentRowIndex];
	        }
	      }
	      var position = this._rowOffsets.sumTo(rowIndex) - this._viewportHeight;
	      if (position < 0) {
	        position = 0;
	      }
	      return position;
	    }
	  }, {
	    key: 'scrollTo',
	    value: function scrollTo( /*number*/position) /*object*/{
	      if (this._rowCount === 0) {
	        return NO_ROWS_SCROLL_RESULT;
	      }
	      if (position <= 0) {
	        // If position less than or equal to 0 first row should be fully visible
	        // on top
	        this._position = 0;
	        this._updateHeightsInViewport(0, 0);

	        return {
	          index: 0,
	          offset: 0,
	          position: this._position,
	          contentHeight: this._contentHeight
	        };
	      } else if (position >= this._contentHeight - this._viewportHeight) {
	        // If position is equal to or greater than max scroll value, we need
	        // to make sure to have bottom border of last row visible.
	        var rowIndex = this._rowCount - 1;
	        position = this._getRowAtEndPosition(rowIndex);
	      }
	      this._position = position;

	      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
	      firstRowIndex = (0, _clamp2.default)(firstRowIndex, 0, Math.max(this._rowCount - 1, 0));
	      var firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
	      var firstRowOffset = firstRowPosition - position;

	      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
	      this._updateHeightsAboveViewport(firstRowIndex);

	      return {
	        index: firstRowIndex,
	        offset: firstRowOffset,
	        position: this._position,
	        contentHeight: this._contentHeight
	      };
	    }

	    /**
	     * Allows to scroll to selected row with specified offset. It always
	     * brings that row to top of viewport with that offset
	     */

	  }, {
	    key: 'scrollToRow',
	    value: function scrollToRow( /*number*/rowIndex, /*number*/offset) /*object*/{
	      rowIndex = (0, _clamp2.default)(rowIndex, 0, Math.max(this._rowCount - 1, 0));
	      offset = (0, _clamp2.default)(offset, -this._storedHeights[rowIndex], 0);
	      var firstRow = this._rowOffsets.sumUntil(rowIndex);
	      return this.scrollTo(firstRow - offset);
	    }

	    /**
	     * Allows to scroll to selected row by bringing it to viewport with minimal
	     * scrolling. This that if row is fully visible, scroll will not be changed.
	     * If top border of row is above top of viewport it will be scrolled to be
	     * fully visible on the top of viewport. If the bottom border of row is
	     * below end of viewport, it will be scrolled up to be fully visible on the
	     * bottom of viewport.
	     */

	  }, {
	    key: 'scrollRowIntoView',
	    value: function scrollRowIntoView( /*number*/rowIndex) /*object*/{
	      rowIndex = (0, _clamp2.default)(rowIndex, 0, Math.max(this._rowCount - 1, 0));
	      this._updateRowHeight(rowIndex);
	      var rowBegin = this._rowOffsets.sumUntil(rowIndex);
	      var rowEnd = rowBegin + this._storedHeights[rowIndex];
	      if (rowBegin < this._position) {
	        return this.scrollTo(rowBegin);
	      } else if (this._position + this._viewportHeight < rowEnd) {
	        var position = this._getRowAtEndPosition(rowIndex);
	        return this.scrollTo(position);
	      }
	      return this.scrollTo(this._position);
	    }
	  }]);

	  return FixedDataTableScrollHelper;
	}();

	module.exports = FixedDataTableScrollHelper;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FixedDataTableWidthHelper
	 * @typechecks
	 */

	'use strict';

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getTotalWidth( /*array*/columns) /*number*/{
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalWidth += columns[i].props.width;
	  }
	  return totalWidth;
	}

	function getTotalFlexGrow( /*array*/columns) /*number*/{
	  var totalFlexGrow = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    totalFlexGrow += columns[i].props.flexGrow || 0;
	  }
	  return totalFlexGrow;
	}

	function distributeFlexWidth(
	/*array*/columns,
	/*number*/flexWidth) /*object*/{
	  if (flexWidth <= 0) {
	    return {
	      columns: columns,
	      width: getTotalWidth(columns)
	    };
	  }
	  var remainingFlexGrow = getTotalFlexGrow(columns);
	  var remainingFlexWidth = flexWidth;
	  var newColumns = [];
	  var totalWidth = 0;
	  for (var i = 0; i < columns.length; ++i) {
	    var column = columns[i];
	    if (!column.props.flexGrow) {
	      totalWidth += column.props.width;
	      newColumns.push(column);
	      continue;
	    }
	    var columnFlexWidth = Math.floor(column.props.flexGrow / remainingFlexGrow * remainingFlexWidth);
	    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
	    totalWidth += newColumnWidth;

	    remainingFlexGrow -= column.props.flexGrow;
	    remainingFlexWidth -= columnFlexWidth;

	    newColumns.push(_React2.default.cloneElement(column, { width: newColumnWidth }));
	  }

	  return {
	    columns: newColumns,
	    width: totalWidth
	  };
	}

	function adjustColumnGroupWidths(
	/*array*/columnGroups,
	/*number*/expectedWidth) /*object*/{
	  var allColumns = [];
	  var i;
	  for (i = 0; i < columnGroups.length; ++i) {
	    _React2.default.Children.forEach(columnGroups[i].props.children, function (column) {
	      allColumns.push(column);
	    });
	  }
	  var columnsWidth = getTotalWidth(allColumns);
	  var remainingFlexGrow = getTotalFlexGrow(allColumns);
	  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

	  var newAllColumns = [];
	  var newColumnGroups = [];

	  for (i = 0; i < columnGroups.length; ++i) {
	    var columnGroup = columnGroups[i];
	    var currentColumns = [];

	    _React2.default.Children.forEach(columnGroup.props.children, function (column) {
	      currentColumns.push(column);
	    });

	    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
	    var columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth);

	    var newColumnSettings = distributeFlexWidth(currentColumns, columnGroupFlexWidth);

	    remainingFlexGrow -= columnGroupFlexGrow;
	    remainingFlexWidth -= columnGroupFlexWidth;

	    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
	      newAllColumns.push(newColumnSettings.columns[j]);
	    }

	    newColumnGroups.push(_React2.default.cloneElement(columnGroup, { width: newColumnSettings.width }));
	  }

	  return {
	    columns: newAllColumns,
	    columnGroups: newColumnGroups
	  };
	}

	function adjustColumnWidths(
	/*array*/columns,
	/*number*/expectedWidth) /*array*/{
	  var columnsWidth = getTotalWidth(columns);
	  if (columnsWidth < expectedWidth) {
	    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
	  }
	  return columns;
	}

	var FixedDataTableWidthHelper = {
	  getTotalWidth: getTotalWidth,
	  getTotalFlexGrow: getTotalFlexGrow,
	  distributeFlexWidth: distributeFlexWidth,
	  adjustColumnWidths: adjustColumnWidths,
	  adjustColumnGroupWidths: adjustColumnGroupWidths
	};

	module.exports = FixedDataTableWidthHelper;

/***/ }),
/* 108 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Heap
	 * @typechecks
	 * @preventMunge
	 */

	'use strict';

	/*
	 * @param {*} a
	 * @param {*} b
	 * @return {boolean}
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function defaultComparator(a, b) {
	  return a < b;
	}

	var Heap = function () {
	  function Heap(items, comparator) {
	    _classCallCheck(this, Heap);

	    this._items = items || [];
	    this._size = this._items.length;
	    this._comparator = comparator || defaultComparator;
	    this._heapify();
	  }

	  /*
	   * @return {boolean}
	   */


	  _createClass(Heap, [{
	    key: 'empty',
	    value: function empty() {
	      return this._size === 0;
	    }

	    /*
	     * @return {*}
	     */

	  }, {
	    key: 'pop',
	    value: function pop() {
	      if (this._size === 0) {
	        return;
	      }

	      var elt = this._items[0];

	      var lastElt = this._items.pop();
	      this._size--;

	      if (this._size > 0) {
	        this._items[0] = lastElt;
	        this._sinkDown(0);
	      }

	      return elt;
	    }

	    /*
	     * @param {*} item
	     */

	  }, {
	    key: 'push',
	    value: function push(item) {
	      this._items[this._size++] = item;
	      this._bubbleUp(this._size - 1);
	    }

	    /*
	     * @return {number}
	     */

	  }, {
	    key: 'size',
	    value: function size() {
	      return this._size;
	    }

	    /*
	     * @return {*}
	     */

	  }, {
	    key: 'peek',
	    value: function peek() {
	      if (this._size === 0) {
	        return;
	      }

	      return this._items[0];
	    }
	  }, {
	    key: '_heapify',
	    value: function _heapify() {
	      for (var index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
	        this._sinkDown(index);
	      }
	    }

	    /*
	     * @parent {number} index
	     */

	  }, {
	    key: '_bubbleUp',
	    value: function _bubbleUp(index) {
	      var elt = this._items[index];
	      while (index > 0) {
	        var parentIndex = Math.floor((index + 1) / 2) - 1;
	        var parentElt = this._items[parentIndex];

	        // if parentElt < elt, stop
	        if (this._comparator(parentElt, elt)) {
	          return;
	        }

	        // swap
	        this._items[parentIndex] = elt;
	        this._items[index] = parentElt;
	        index = parentIndex;
	      }
	    }

	    /*
	     * @parent {number} index
	     */

	  }, {
	    key: '_sinkDown',
	    value: function _sinkDown(index) {
	      var elt = this._items[index];

	      while (true) {
	        var leftChildIndex = 2 * (index + 1) - 1;
	        var rightChildIndex = 2 * (index + 1);
	        var swapIndex = -1;

	        if (leftChildIndex < this._size) {
	          var leftChild = this._items[leftChildIndex];
	          if (this._comparator(leftChild, elt)) {
	            swapIndex = leftChildIndex;
	          }
	        }

	        if (rightChildIndex < this._size) {
	          var rightChild = this._items[rightChildIndex];
	          if (this._comparator(rightChild, elt)) {
	            if (swapIndex === -1 || this._comparator(rightChild, this._items[swapIndex])) {
	              swapIndex = rightChildIndex;
	            }
	          }
	        }

	        // if we don't have a swap, stop
	        if (swapIndex === -1) {
	          return;
	        }

	        this._items[index] = this._items[swapIndex];
	        this._items[swapIndex] = elt;
	        index = swapIndex;
	      }
	    }
	  }]);

	  return Heap;
	}();

	module.exports = Heap;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule IntegerBufferSet
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Heap = __webpack_require__(108);

	var _Heap2 = _interopRequireDefault(_Heap);

	var _invariant = __webpack_require__(10);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Data structure that allows to store values and assign positions to them
	// in a way to minimize changing positions of stored values when new ones are
	// added or when some values are replaced. Stored elements are alwasy assigned
	// a consecutive set of positoins startin from 0 up to count of elements less 1
	// Following actions can be executed
	// * get position assigned to given value (null if value is not stored)
	// * create new entry for new value and get assigned position back
	// * replace value that is furthest from specified value range with new value
	//   and get it's position back
	// All operations take amortized log(n) time where n is number of elements in
	// the set.
	var IntegerBufferSet = function () {
	  function IntegerBufferSet() {
	    _classCallCheck(this, IntegerBufferSet);

	    this._valueToPositionMap = {};
	    this._size = 0;
	    this._smallValues = new _Heap2.default([], // Initial data in the heap
	    this._smallerComparator);
	    this._largeValues = new _Heap2.default([], // Initial data in the heap
	    this._greaterComparator);

	    this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
	    this.getValuePosition = this.getValuePosition.bind(this);
	    this.getSize = this.getSize.bind(this);
	    this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this);
	  }

	  _createClass(IntegerBufferSet, [{
	    key: 'getSize',
	    value: function getSize() /*number*/{
	      return this._size;
	    }
	  }, {
	    key: 'getValuePosition',
	    value: function getValuePosition( /*number*/value) /*?number*/{
	      if (this._valueToPositionMap[value] === undefined) {
	        return null;
	      }
	      return this._valueToPositionMap[value];
	    }
	  }, {
	    key: 'getNewPositionForValue',
	    value: function getNewPositionForValue( /*number*/value) /*number*/{
	      (0, _invariant2.default)(this._valueToPositionMap[value] === undefined, "Shouldn't try to find new position for value already stored in BufferSet");
	      var newPosition = this._size;
	      this._size++;
	      this._pushToHeaps(newPosition, value);
	      this._valueToPositionMap[value] = newPosition;
	      return newPosition;
	    }
	  }, {
	    key: 'replaceFurthestValuePosition',
	    value: function replaceFurthestValuePosition(
	    /*number*/lowValue,
	    /*number*/highValue,
	    /*number*/newValue) /*?number*/{
	      (0, _invariant2.default)(this._valueToPositionMap[newValue] === undefined, "Shouldn't try to replace values with value already stored value in " + "BufferSet");

	      this._cleanHeaps();
	      if (this._smallValues.empty() || this._largeValues.empty()) {
	        // Threre are currently no values stored. We will have to create new
	        // position for this value.
	        return null;
	      }

	      var minValue = this._smallValues.peek().value;
	      var maxValue = this._largeValues.peek().value;
	      if (minValue >= lowValue && maxValue <= highValue) {
	        // All values currently stored are necessary, we can't reuse any of them.
	        return null;
	      }

	      var valueToReplace;
	      if (lowValue - minValue > maxValue - highValue) {
	        // minValue is further from provided range. We will reuse it's position.
	        valueToReplace = minValue;
	        this._smallValues.pop();
	      } else {
	        valueToReplace = maxValue;
	        this._largeValues.pop();
	      }
	      var position = this._valueToPositionMap[valueToReplace];
	      delete this._valueToPositionMap[valueToReplace];
	      this._valueToPositionMap[newValue] = position;
	      this._pushToHeaps(position, newValue);

	      return position;
	    }
	  }, {
	    key: '_pushToHeaps',
	    value: function _pushToHeaps( /*number*/position, /*number*/value) {
	      var element = {
	        position: position,
	        value: value
	      };
	      // We can reuse the same object in both heaps, because we don't mutate them
	      this._smallValues.push(element);
	      this._largeValues.push(element);
	    }
	  }, {
	    key: '_cleanHeaps',
	    value: function _cleanHeaps() {
	      // We not usually only remove object from one heap while moving value.
	      // Here we make sure that there is no stale data on top of heaps.
	      this._cleanHeap(this._smallValues);
	      this._cleanHeap(this._largeValues);
	      var minHeapSize = Math.min(this._smallValues.size(), this._largeValues.size());
	      var maxHeapSize = Math.max(this._smallValues.size(), this._largeValues.size());
	      if (maxHeapSize > 10 * minHeapSize) {
	        // There are many old values in one of heaps. We nned to get rid of them
	        // to not use too avoid memory leaks
	        this._recreateHeaps();
	      }
	    }
	  }, {
	    key: '_recreateHeaps',
	    value: function _recreateHeaps() {
	      var sourceHeap = this._smallValues.size() < this._largeValues.size() ? this._smallValues : this._largeValues;
	      var newSmallValues = new _Heap2.default([], // Initial data in the heap
	      this._smallerComparator);
	      var newLargeValues = new _Heap2.default([], // Initial datat in the heap
	      this._greaterComparator);
	      while (!sourceHeap.empty()) {
	        var element = sourceHeap.pop();
	        // Push all stil valid elements to new heaps
	        if (this._valueToPositionMap[element.value] !== undefined) {
	          newSmallValues.push(element);
	          newLargeValues.push(element);
	        }
	      }
	      this._smallValues = newSmallValues;
	      this._largeValues = newLargeValues;
	    }
	  }, {
	    key: '_cleanHeap',
	    value: function _cleanHeap( /*object*/heap) {
	      while (!heap.empty() && this._valueToPositionMap[heap.peek().value] === undefined) {
	        heap.pop();
	      }
	    }
	  }, {
	    key: '_smallerComparator',
	    value: function _smallerComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
	      return lhs.value < rhs.value;
	    }
	  }, {
	    key: '_greaterComparator',
	    value: function _greaterComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
	      return lhs.value > rhs.value;
	    }
	  }]);

	  return IntegerBufferSet;
	}();

	module.exports = IntegerBufferSet;

/***/ }),
/* 110 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Keys
	 */

	module.exports = {
	  BACKSPACE: 8,
	  TAB: 9,
	  RETURN: 13,
	  ALT: 18,
	  ESC: 27,
	  SPACE: 32,
	  PAGE_UP: 33,
	  PAGE_DOWN: 34,
	  END: 35,
	  HOME: 36,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40,
	  DELETE: 46,
	  COMMA: 188,
	  PERIOD: 190,
	  A: 65,
	  Z: 90,
	  ZERO: 48,
	  NUMPAD_0: 96,
	  NUMPAD_9: 105
	};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PrefixIntervalTree
	 * 
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _invariant = __webpack_require__(10);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var parent = function parent(node) {
	  return Math.floor(node / 2);
	};

	var Int32Array = global.Int32Array || function (size) {
	  var xs = [];
	  for (var i = size - 1; i >= 0; --i) {
	    xs[i] = 0;
	  }
	  return xs;
	};

	/**
	 * Computes the next power of 2 after or equal to x.
	 */
	function ceilLog2(x) {
	  var y = 1;
	  while (y < x) {
	    y *= 2;
	  }
	  return y;
	}

	/**
	 * A prefix interval tree stores an numeric array and the partial sums of that
	 * array. It is optimized for updating the values of the array without
	 * recomputing all of the partial sums.
	 *
	 *   - O(ln n) update
	 *   - O(1) lookup
	 *   - O(ln n) compute a partial sum
	 *   - O(n) space
	 *
	 * Note that the sequence of partial sums is one longer than the array, so that
	 * the first partial sum is always 0, and the last partial sum is the sum of the
	 * entire array.
	 */

	var PrefixIntervalTree = function () {
	  function PrefixIntervalTree(xs) {
	    _classCallCheck(this, PrefixIntervalTree);

	    /**
	     * Number of elements in the array
	     *
	     * @type {number}
	     * @private
	     */
	    this._size = xs.length;

	    /**
	     * Half the size of the heap. It is also the number of non-leaf nodes, and the
	     * index of the first element in the heap. Always a power of 2.
	     *
	     * @type {number}
	     * @private
	     */
	    this._half = ceilLog2(this._size);

	    /**
	     * Binary heap
	     *
	     * @type {!Array.<number>}
	     * @const
	     * @private
	     */
	    this._heap = new Int32Array(2 * this._half);

	    var i;
	    for (i = 0; i < this._size; ++i) {
	      this._heap[this._half + i] = xs[i];
	    }

	    for (i = this._half - 1; i > 0; --i) {
	      this._heap[i] = this._heap[2 * i] + this._heap[2 * i + 1];
	    }
	  }

	  _createClass(PrefixIntervalTree, [{
	    key: 'set',
	    value: function set(index, value) {
	      (0, _invariant2.default)(0 <= index && index < this._size, 'Index out of range %s', index);

	      var node = this._half + index;
	      this._heap[node] = value;

	      node = parent(node);
	      for (; node !== 0; node = parent(node)) {
	        this._heap[node] = this._heap[2 * node] + this._heap[2 * node + 1];
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get(index) {
	      (0, _invariant2.default)(0 <= index && index < this._size, 'Index out of range %s', index);

	      var node = this._half + index;
	      return this._heap[node];
	    }
	  }, {
	    key: 'getSize',
	    value: function getSize() {
	      return this._size;
	    }

	    /**
	     * Returns the sum get(0) + get(1) + ... + get(end - 1).
	     */

	  }, {
	    key: 'sumUntil',
	    value: function sumUntil(end) {
	      (0, _invariant2.default)(0 <= end && end < this._size + 1, 'Index out of range %s', end);

	      if (end === 0) {
	        return 0;
	      }

	      var node = this._half + end - 1;
	      var sum = this._heap[node];
	      for (; node !== 1; node = parent(node)) {
	        if (node % 2 === 1) {
	          sum += this._heap[node - 1];
	        }
	      }

	      return sum;
	    }

	    /**
	     * Returns the sum get(0) + get(1) + ... + get(inclusiveEnd).
	     */

	  }, {
	    key: 'sumTo',
	    value: function sumTo(inclusiveEnd) {
	      (0, _invariant2.default)(0 <= inclusiveEnd && inclusiveEnd < this._size, 'Index out of range %s', inclusiveEnd);
	      return this.sumUntil(inclusiveEnd + 1);
	    }

	    /**
	     * Returns the sum get(begin) + get(begin + 1) + ... + get(end - 1).
	     */

	  }, {
	    key: 'sum',
	    value: function sum(begin, end) {
	      (0, _invariant2.default)(begin <= end, 'Begin must precede end');
	      return this.sumUntil(end) - this.sumUntil(begin);
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) <= t, or
	     * -1 if no such i exists.
	     */

	  }, {
	    key: 'greatestLowerBound',
	    value: function greatestLowerBound(t) {
	      if (t < 0) {
	        return -1;
	      }

	      var node = 1;
	      if (this._heap[node] <= t) {
	        return this._size;
	      }

	      while (node < this._half) {
	        var leftSum = this._heap[2 * node];
	        if (t < leftSum) {
	          node = 2 * node;
	        } else {
	          node = 2 * node + 1;
	          t -= leftSum;
	        }
	      }

	      return node - this._half;
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) < t, or
	     * -1 if no such i exists.
	     */

	  }, {
	    key: 'greatestStrictLowerBound',
	    value: function greatestStrictLowerBound(t) {
	      if (t <= 0) {
	        return -1;
	      }

	      var node = 1;
	      if (this._heap[node] < t) {
	        return this._size;
	      }

	      while (node < this._half) {
	        var leftSum = this._heap[2 * node];
	        if (t <= leftSum) {
	          node = 2 * node;
	        } else {
	          node = 2 * node + 1;
	          t -= leftSum;
	        }
	      }

	      return node - this._half;
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and t <= sumUntil(i), or
	     * size + 1 if no such i exists.
	     */

	  }, {
	    key: 'leastUpperBound',
	    value: function leastUpperBound(t) {
	      return this.greatestStrictLowerBound(t) + 1;
	    }

	    /**
	     * Returns the smallest i such that 0 <= i <= size and t < sumUntil(i), or
	     * size + 1 if no such i exists.
	     */

	  }, {
	    key: 'leastStrictUpperBound',
	    value: function leastStrictUpperBound(t) {
	      return this.greatestLowerBound(t) + 1;
	    }
	  }], [{
	    key: 'uniform',
	    value: function uniform(size, initialValue) {
	      var xs = [];
	      for (var i = size - 1; i >= 0; --i) {
	        xs[i] = initialValue;
	      }

	      return new PrefixIntervalTree(xs);
	    }
	  }, {
	    key: 'empty',
	    value: function empty(size) {
	      return PrefixIntervalTree.uniform(size, 0);
	    }
	  }]);

	  return PrefixIntervalTree;
	}();

	module.exports = PrefixIntervalTree;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOM
	 */

	module.exports = __webpack_require__(43);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * This is utility that handles touch events and calls provided touch
	 * callback with correct frame rate.
	 * Deceleration logic based on http://ariya.ofilabs.com/2013/11/javascript-kinetic-scrolling-part-2.html
	 *
	 * @providesModule ReactTouchHandler
	 * @typechecks
	 */

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	var _requestAnimationFramePolyfill = __webpack_require__(22);

	var _requestAnimationFramePolyfill2 = _interopRequireDefault(_requestAnimationFramePolyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MOVE_AMPLITUDE = 1.6;
	var DECELERATION_AMPLITUDE = 1.6;
	var DECELERATION_FACTOR = 325;
	var TRACKER_TIMEOUT = 100;

	var ReactTouchHandler = function () {
	  /**
	   * onTouchScroll is the callback that will be called with right frame rate if
	   * any touch events happened
	   * onTouchScroll should is to be called with two arguments: deltaX and deltaY in
	   * this order
	   */
	  function ReactTouchHandler(
	  /*function*/onTouchScroll,
	  /*boolean|function*/handleScrollX,
	  /*boolean|function*/handleScrollY,
	  /*?boolean|?function*/stopPropagation) {
	    _classCallCheck(this, ReactTouchHandler);

	    // The animation frame id for the drag scroll
	    this._dragAnimationId = null;

	    // The interval id for tracking the drag velocity
	    this._trackerId = null;

	    // Used to track the drag scroll delta while waiting for an animation frame
	    this._deltaX = 0;
	    this._deltaY = 0;

	    // The last touch we processed while dragging.  Used to compute the delta and velocity above
	    this._lastTouchX = 0;
	    this._lastTouchY = 0;

	    // Used to track a moving average of the scroll velocity while dragging
	    this._velocityX = 0;
	    this._velocityY = 0;

	    // An accummulated drag scroll delta used to calculate velocity
	    this._accumulatedDeltaX = 0;
	    this._accumulatedDeltaY = 0;

	    // Timestamp from the last interval frame we used to track velocity
	    this._lastFrameTimestamp = Date.now();

	    // Timestamp from the last animation frame we used to autoscroll after drag stop
	    this._autoScrollTimestamp = Date.now();

	    if (typeof handleScrollX !== 'function') {
	      handleScrollX = handleScrollX ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
	    }

	    if (typeof handleScrollY !== 'function') {
	      handleScrollY = handleScrollY ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
	    }

	    // TODO (jordan) Is configuring this necessary
	    if (typeof stopPropagation !== 'function') {
	      stopPropagation = stopPropagation ? _emptyFunction2.default.thatReturnsTrue : _emptyFunction2.default.thatReturnsFalse;
	    }

	    this._handleScrollX = handleScrollX;
	    this._handleScrollY = handleScrollY;
	    this._stopPropagation = stopPropagation;
	    this._onTouchScrollCallback = onTouchScroll;

	    this._didTouchMove = this._didTouchMove.bind(this);
	    this._track = this._track.bind(this);
	    this._autoScroll = this._autoScroll.bind(this);
	    this._startAutoScroll = this._startAutoScroll.bind(this);
	    this.onTouchStart = this.onTouchStart.bind(this);
	    this.onTouchEnd = this.onTouchEnd.bind(this);
	    this.onTouchMove = this.onTouchMove.bind(this);
	    this.onTouchCancel = this.onTouchCancel.bind(this);
	  }

	  _createClass(ReactTouchHandler, [{
	    key: 'onTouchStart',
	    value: function onTouchStart( /*object*/event) {
	      // Start tracking drag delta for scrolling
	      this._lastTouchX = event.touches[0].pageX;
	      this._lastTouchY = event.touches[0].pageY;

	      // Reset our velocity and intermediate data used to compute velocity
	      this._velocityX = 0;
	      this._velocityY = 0;
	      this._accumulatedDeltaX = 0;
	      this._accumulatedDeltaY = 0;
	      this._lastFrameTimestamp = Date.now();

	      // Setup interval for tracking velocity
	      clearInterval(this._trackerId);
	      this._trackerId = setInterval(this._track, TRACKER_TIMEOUT);

	      if (this._stopPropagation()) {
	        event.stopPropagation();
	      }
	    }
	  }, {
	    key: 'onTouchEnd',
	    value: function onTouchEnd( /*object*/event) {

	      // Stop tracking velocity
	      clearInterval(this._trackerId);
	      this._trackerId = null;

	      // Initialize decelerating autoscroll on drag stop
	      (0, _requestAnimationFramePolyfill2.default)(this._startAutoScroll);

	      if (this._stopPropagation()) {
	        event.stopPropagation();
	      }
	    }
	  }, {
	    key: 'onTouchCancel',
	    value: function onTouchCancel( /*object*/event) {

	      // Stop tracking velocity
	      clearInterval(this._trackerId);
	      this._trackerId = null;

	      if (this._stopPropagation()) {
	        event.stopPropagation();
	      }
	    }
	  }, {
	    key: 'onTouchMove',
	    value: function onTouchMove( /*object*/event) {
	      var moveX = event.touches[0].pageX;
	      var moveY = event.touches[0].pageY;

	      // Compute delta scrolled since last drag
	      // Mobile, scrolling is inverted
	      this._deltaX = MOVE_AMPLITUDE * (this._lastTouchX - moveX);
	      this._deltaY = MOVE_AMPLITUDE * (this._lastTouchY - moveY);

	      var handleScrollX = this._handleScrollX(this._deltaX, this._deltaY);
	      var handleScrollY = this._handleScrollY(this._deltaY, this._deltaX);
	      if (!handleScrollX && !handleScrollY) {
	        return;
	      }

	      // If we can handle scroll update last touch for computing delta
	      if (handleScrollX) {
	        this._lastTouchX = moveX;
	      } else {
	        this._deltaX = 0;
	      }
	      if (handleScrollY) {
	        this._lastTouchY = moveY;
	      } else {
	        this._deltaY = 0;
	      }

	      event.preventDefault();

	      // Ensure minimum delta magnitude is met to avoid jitter
	      var changed = false;
	      if (Math.abs(this._deltaX) > 2 || Math.abs(this._deltaY) > 2) {
	        if (this._stopPropagation()) {
	          event.stopPropagation();
	        }
	        changed = true;
	      }

	      // Request animation frame to trigger scroll of computed delta
	      if (changed === true && this._dragAnimationId === null) {
	        this._dragAnimationId = (0, _requestAnimationFramePolyfill2.default)(this._didTouchMove);
	      }
	    }

	    /**
	     * Fire scroll callback based on computed drag delta.
	     * Also track accummulated delta so we can calculate velocity
	     */

	  }, {
	    key: '_didTouchMove',
	    value: function _didTouchMove() {
	      this._dragAnimationId = null;

	      this._onTouchScrollCallback(this._deltaX, this._deltaY);
	      this._accumulatedDeltaX += this._deltaX;
	      this._accumulatedDeltaY += this._deltaY;
	      this._deltaX = 0;
	      this._deltaY = 0;
	    }

	    /**
	     * Compute velocity based on a weighted average of drag over last 100 ms and
	     * previous velocity.  Combining into a moving average results in a smoother scroll.
	     */

	  }, {
	    key: '_track',
	    value: function _track() {
	      var now = Date.now();
	      var elapsed = now - this._lastFrameTimestamp;
	      var oldVelocityX = this._velocityX;
	      var oldVelocityY = this._velocityY;

	      // We compute velocity using a weighted average of the current velocity and the previous velocity
	      // If the previous velocity is 0, put the full weight on the last 100 ms
	      var weight = 0.8;
	      if (elapsed < TRACKER_TIMEOUT) {
	        weight *= elapsed / TRACKER_TIMEOUT;
	      }
	      if (oldVelocityX === 0 && oldVelocityY === 0) {
	        weight = 1;
	      }

	      // Formula for computing weighted average of velocity
	      this._velocityX = weight * (TRACKER_TIMEOUT * this._accumulatedDeltaX / (1 + elapsed));
	      if (weight < 1) {
	        this._velocityX += (1 - weight) * oldVelocityX;
	      }

	      this._velocityY = weight * (TRACKER_TIMEOUT * this._accumulatedDeltaY / (1 + elapsed));
	      if (weight < 1) {
	        this._velocityY += (1 - weight) * oldVelocityY;
	      }

	      this._accumulatedDeltaX = 0;
	      this._accumulatedDeltaY = 0;
	      this._lastFrameTimestamp = now;
	    }

	    /**
	     * To kick off deceleration / momentum scrolling,
	     * handle any scrolling from a drag which was waiting for an animation frame
	     * Then update our velocity
	     * Finally start the momentum scrolling handler (autoScroll)
	     */

	  }, {
	    key: '_startAutoScroll',
	    value: function _startAutoScroll() {
	      this._autoScrollTimestamp = Date.now();
	      if (this._deltaX > 0 || this.deltaY > 0) {
	        this._didTouchMove();
	      }
	      this._track();
	      this._autoScroll();
	    }

	    /**
	     * Compute a scroll delta with an exponential decay based on time elapsed since drag was released.
	     * This is called recursively on animation frames until the delta is below a threshold (5 pixels)
	     */

	  }, {
	    key: '_autoScroll',
	    value: function _autoScroll() {
	      var elapsed = Date.now() - this._autoScrollTimestamp;
	      var factor = DECELERATION_AMPLITUDE * Math.exp(-elapsed / DECELERATION_FACTOR);
	      var deltaX = factor * this._velocityX;
	      var deltaY = factor * this._velocityY;

	      if (Math.abs(deltaX) <= 5 || !this._handleScrollX(deltaX, deltaY)) {
	        deltaX = 0;
	      }
	      if (Math.abs(deltaY) <= 5 || !this._handleScrollY(deltaY, deltaX)) {
	        deltaY = 0;
	      }

	      if (deltaX !== 0 || deltaY !== 0) {
	        this._onTouchScrollCallback(deltaX, deltaY);
	        (0, _requestAnimationFramePolyfill2.default)(this._autoScroll);
	      }
	    }
	  }]);

	  return ReactTouchHandler;
	}();

	module.exports = ReactTouchHandler;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _DOMMouseMoveTracker = __webpack_require__(19);

	var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

	var _Keys = __webpack_require__(110);

	var _Keys2 = _interopRequireDefault(_Keys);

	var _React = __webpack_require__(4);

	var _React2 = _interopRequireDefault(_React);

	var _createReactClass = __webpack_require__(7);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _propTypes = __webpack_require__(1);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ReactDOM = __webpack_require__(112);

	var _ReactDOM2 = _interopRequireDefault(_ReactDOM);

	var _ReactComponentWithPureRenderMixin = __webpack_require__(15);

	var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

	var _ReactWheelHandler = __webpack_require__(39);

	var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

	var _cssVar = __webpack_require__(118);

	var _cssVar2 = _interopRequireDefault(_cssVar);

	var _cx = __webpack_require__(5);

	var _cx2 = _interopRequireDefault(_cx);

	var _emptyFunction = __webpack_require__(8);

	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

	var _FixedDataTableTranslateDOMPosition = __webpack_require__(14);

	var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Scrollbar
	 * @typechecks
	 */

	var UNSCROLLABLE_STATE = {
	  position: 0,
	  scrollable: false
	};

	var FACE_MARGIN = parseInt((0, _cssVar2.default)('scrollbar-face-margin'), 10);
	var FACE_MARGIN_2 = FACE_MARGIN * 2;
	var FACE_SIZE_MIN = 30;
	var KEYBOARD_SCROLL_AMOUNT = 40;

	var _lastScrolledScrollbar = null;

	var Scrollbar = (0, _createReactClass2.default)({
	  displayName: 'Scrollbar',
	  mixins: [_ReactComponentWithPureRenderMixin2.default],

	  propTypes: {
	    contentSize: _propTypes2.default.number.isRequired,
	    defaultPosition: _propTypes2.default.number,
	    isOpaque: _propTypes2.default.bool,
	    orientation: _propTypes2.default.oneOf(['vertical', 'horizontal']),
	    onScroll: _propTypes2.default.func,
	    position: _propTypes2.default.number,
	    size: _propTypes2.default.number.isRequired,
	    trackColor: _propTypes2.default.oneOf(['gray']),
	    zIndex: _propTypes2.default.number,
	    verticalTop: _propTypes2.default.number
	  },

	  getInitialState: function getInitialState() /*object*/{
	    var props = this.props;
	    return this._calculateState(props.position || props.defaultPosition || 0, props.size, props.contentSize, props.orientation);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
	    var controlledPosition = nextProps.position;
	    if (controlledPosition === undefined) {
	      this._setNextState(this._calculateState(this.state.position, nextProps.size, nextProps.contentSize, nextProps.orientation));
	    } else {
	      this._setNextState(this._calculateState(controlledPosition, nextProps.size, nextProps.contentSize, nextProps.orientation), nextProps);
	    }
	  },
	  getDefaultProps: function getDefaultProps() /*object*/{
	    return {
	      defaultPosition: 0,
	      isOpaque: false,
	      onScroll: _emptyFunction2.default,
	      orientation: 'vertical',
	      zIndex: 99
	    };
	  },
	  render: function render() /*?object*/{
	    if (!this.state.scrollable) {
	      return null;
	    }

	    var size = this.props.size;
	    var mainStyle;
	    var faceStyle;
	    var isHorizontal = this.state.isHorizontal;
	    var isVertical = !isHorizontal;
	    var isActive = this.state.focused || this.state.isDragging;
	    var faceSize = this.state.faceSize;
	    var isOpaque = this.props.isOpaque;
	    var verticalTop = this.props.verticalTop || 0;

	    var mainClassName = (0, _cx2.default)({
	      'ScrollbarLayout/main': true,
	      'ScrollbarLayout/mainVertical': isVertical,
	      'ScrollbarLayout/mainHorizontal': isHorizontal,
	      'public/Scrollbar/main': true,
	      'public/Scrollbar/mainOpaque': isOpaque,
	      'public/Scrollbar/mainActive': isActive
	    });

	    var faceClassName = (0, _cx2.default)({
	      'ScrollbarLayout/face': true,
	      'ScrollbarLayout/faceHorizontal': isHorizontal,
	      'ScrollbarLayout/faceVertical': isVertical,
	      'public/Scrollbar/faceActive': isActive,
	      'public/Scrollbar/face': true
	    });

	    var position = this.state.position * this.state.scale + FACE_MARGIN;

	    if (isHorizontal) {
	      mainStyle = {
	        width: size
	      };
	      faceStyle = {
	        width: faceSize - FACE_MARGIN_2
	      };
	      (0, _FixedDataTableTranslateDOMPosition2.default)(faceStyle, position, 0, this._initialRender);
	    } else {
	      mainStyle = {
	        top: verticalTop,
	        height: size
	      };
	      faceStyle = {
	        height: faceSize - FACE_MARGIN_2
	      };
	      (0, _FixedDataTableTranslateDOMPosition2.default)(faceStyle, 0, position, this._initialRender);
	    }

	    mainStyle.zIndex = this.props.zIndex;

	    if (this.props.trackColor === 'gray') {
	      mainStyle.backgroundColor = (0, _cssVar2.default)('fbui-desktop-background-light');
	    }

	    return _React2.default.createElement(
	      'div',
	      {
	        onFocus: this._onFocus,
	        onBlur: this._onBlur,
	        onKeyDown: this._onKeyDown,
	        onMouseDown: this._onMouseDown,
	        onWheel: this._wheelHandler.onWheel,
	        className: mainClassName,
	        style: mainStyle,
	        tabIndex: 0 },
	      _React2.default.createElement('div', {
	        ref: 'face',
	        className: faceClassName,
	        style: faceStyle
	      })
	    );
	  },
	  componentWillMount: function componentWillMount() {
	    var isHorizontal = this.props.orientation === 'horizontal';
	    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

	    this._wheelHandler = new _ReactWheelHandler2.default(onWheel, this._shouldHandleX, // Should hanlde horizontal scroll
	    this._shouldHandleY // Should handle vertical scroll
	    );
	    this._initialRender = true;
	  },
	  componentDidMount: function componentDidMount() {
	    this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMouseMove, this._onMouseMoveEnd, document.documentElement);

	    if (this.props.position !== undefined && this.state.position !== this.props.position) {
	      this._didScroll();
	    }
	    this._initialRender = false;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    if (_lastScrolledScrollbar === this) {
	      _lastScrolledScrollbar = null;
	    }
	    delete this._mouseMoveTracker;
	  },
	  scrollBy: function scrollBy( /*number*/delta) {
	    this._onWheel(delta);
	  },
	  _shouldHandleX: function _shouldHandleX( /*number*/delta) /*boolean*/{
	    return this.props.orientation === 'horizontal' ? this._shouldHandleChange(delta) : false;
	  },
	  _shouldHandleY: function _shouldHandleY( /*number*/delta) /*boolean*/{
	    return this.props.orientation !== 'horizontal' ? this._shouldHandleChange(delta) : false;
	  },
	  _shouldHandleChange: function _shouldHandleChange( /*number*/delta) /*boolean*/{
	    var nextState = this._calculateState(this.state.position + delta, this.props.size, this.props.contentSize, this.props.orientation);
	    return nextState.position !== this.state.position;
	  },
	  _calculateState: function _calculateState(
	  /*number*/position,
	  /*number*/size,
	  /*number*/contentSize,
	  /*string*/orientation) /*object*/{
	    if (size < 1 || contentSize <= size) {
	      return UNSCROLLABLE_STATE;
	    }

	    var stateKey = position + '_' + size + '_' + contentSize + '_' + orientation;
	    if (this._stateKey === stateKey) {
	      return this._stateForKey;
	    }

	    // There are two types of positions here.
	    // 1) Phisical position: changed by mouse / keyboard
	    // 2) Logical position: changed by props.
	    // The logical position will be kept as as internal state and the `render()`
	    // function will translate it into physical position to render.

	    var isHorizontal = orientation === 'horizontal';
	    var scale = size / contentSize;
	    var faceSize = size * scale;

	    if (faceSize < FACE_SIZE_MIN) {
	      scale = (size - FACE_SIZE_MIN) / (contentSize - size);
	      faceSize = FACE_SIZE_MIN;
	    }

	    var scrollable = true;
	    var maxPosition = contentSize - size;

	    if (position < 0) {
	      position = 0;
	    } else if (position > maxPosition) {
	      position = maxPosition;
	    }

	    var isDragging = this._mouseMoveTracker ? this._mouseMoveTracker.isDragging() : false;

	    // This function should only return flat values that can be compared quiclky
	    // by `ReactComponentWithPureRenderMixin`.
	    var state = {
	      faceSize: faceSize,
	      isDragging: isDragging,
	      isHorizontal: isHorizontal,
	      position: position,
	      scale: scale,
	      scrollable: scrollable
	    };

	    // cache the state for later use.
	    this._stateKey = stateKey;
	    this._stateForKey = state;
	    return state;
	  },
	  _onWheelY: function _onWheelY( /*number*/deltaX, /*number*/deltaY) {
	    this._onWheel(deltaY);
	  },
	  _onWheelX: function _onWheelX( /*number*/deltaX, /*number*/deltaY) {
	    this._onWheel(deltaX);
	  },
	  _onWheel: function _onWheel( /*number*/delta) {
	    var props = this.props;

	    // The mouse may move faster then the animation frame does.
	    // Use `requestAnimationFrame` to avoid over-updating.
	    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
	  },
	  _onMouseDown: function _onMouseDown( /*object*/event) {
	    var nextState;

	    if (event.target !== _ReactDOM2.default.findDOMNode(this.refs.face)) {
	      // Both `offsetX` and `layerX` are non-standard DOM property but they are
	      // magically available for browsers somehow.
	      var nativeEvent = event.nativeEvent;
	      var position = this.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX : nativeEvent.offsetY || nativeEvent.layerY;

	      // MouseDown on the scroll-track directly, move the center of the
	      // scroll-face to the mouse position.
	      var props = this.props;
	      position /= this.state.scale;
	      nextState = this._calculateState(position - this.state.faceSize * 0.5 / this.state.scale, props.size, props.contentSize, props.orientation);
	    } else {
	      nextState = {};
	    }

	    nextState.focused = true;
	    this._setNextState(nextState);

	    this._mouseMoveTracker.captureMouseMoves(event);
	    // Focus the node so it may receive keyboard event.
	    _ReactDOM2.default.findDOMNode(this).focus();
	  },
	  _onMouseMove: function _onMouseMove( /*number*/deltaX, /*number*/deltaY) {
	    var props = this.props;
	    var delta = this.state.isHorizontal ? deltaX : deltaY;
	    delta /= this.state.scale;

	    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
	  },
	  _onMouseMoveEnd: function _onMouseMoveEnd() {
	    this._nextState = null;
	    this._mouseMoveTracker.releaseMouseMoves();
	    this.setState({ isDragging: false });
	  },
	  _onKeyDown: function _onKeyDown( /*object*/event) {
	    var keyCode = event.keyCode;

	    if (keyCode === _Keys2.default.TAB) {
	      // Let focus move off the scrollbar.
	      return;
	    }

	    var distance = KEYBOARD_SCROLL_AMOUNT;
	    var direction = 0;

	    if (this.state.isHorizontal) {
	      switch (keyCode) {
	        case _Keys2.default.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case _Keys2.default.LEFT:
	          direction = -1;
	          break;

	        case _Keys2.default.RIGHT:
	          direction = 1;
	          break;

	        default:
	          return;
	      }
	    }

	    if (!this.state.isHorizontal) {
	      switch (keyCode) {
	        case _Keys2.default.SPACE:
	          if (event.shiftKey) {
	            direction = -1;
	          } else {
	            direction = 1;
	          }
	          break;

	        case _Keys2.default.HOME:
	          direction = -1;
	          distance = this.props.contentSize;
	          break;

	        case _Keys2.default.UP:
	          direction = -1;
	          break;

	        case _Keys2.default.DOWN:
	          direction = 1;
	          break;

	        case _Keys2.default.PAGE_UP:
	          direction = -1;
	          distance = this.props.size;
	          break;

	        case _Keys2.default.PAGE_DOWN:
	          direction = 1;
	          distance = this.props.size;
	          break;

	        default:
	          return;
	      }
	    }

	    event.preventDefault();

	    var props = this.props;
	    this._setNextState(this._calculateState(this.state.position + distance * direction, props.size, props.contentSize, props.orientation));
	  },
	  _onFocus: function _onFocus() {
	    this.setState({
	      focused: true
	    });
	  },
	  _onBlur: function _onBlur() {
	    this.setState({
	      focused: false
	    });
	  },
	  _blur: function _blur() {
	    var el = _ReactDOM2.default.findDOMNode(this);
	    if (!el) {
	      return;
	    }

	    try {
	      this._onBlur();
	      el.blur();
	    } catch (oops) {
	      // pass
	    }
	  },
	  _setNextState: function _setNextState( /*object*/nextState, /*?object*/props) {
	    props = props || this.props;
	    var controlledPosition = props.position;
	    var willScroll = this.state.position !== nextState.position;
	    if (controlledPosition === undefined) {
	      var callback = willScroll ? this._didScroll : undefined;
	      this.setState(nextState, callback);
	    } else if (controlledPosition === nextState.position) {
	      this.setState(nextState);
	    } else {
	      // Scrolling is controlled. Don't update the state and let the owner
	      // to update the scrollbar instead.
	      if (nextState.position !== undefined && nextState.position !== this.state.position) {
	        this.props.onScroll(nextState.position);
	      }
	      return;
	    }

	    if (willScroll && _lastScrolledScrollbar !== this) {
	      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
	      _lastScrolledScrollbar = this;
	    }
	  },
	  _didScroll: function _didScroll() {
	    this.props.onScroll(this.state.position);
	  }
	});

	Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
	Scrollbar.SIZE = parseInt((0, _cssVar2.default)('scrollbar-size'), 10);
	Scrollbar.OFFSET = 1;

	module.exports = Scrollbar;

/***/ }),
/* 115 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Copyright Schrodinger, LLC
	 *
	 * @providesModule UserAgent_DEPRECATED
	 */

	/**
	 *  Provides entirely client-side User Agent and OS detection. You should prefer
	 *  the non-deprecated UserAgent module when possible, which exposes our
	 *  authoritative server-side PHP-based detection to the client.
	 *
	 *  Usage is straightforward:
	 *
	 *    if (UserAgent_DEPRECATED.ie()) {
	 *      //  IE
	 *    }
	 *
	 *  You can also do version checks:
	 *
	 *    if (UserAgent_DEPRECATED.ie() >= 7) {
	 *      //  IE7 or better
	 *    }
	 *
	 *  The browser functions will return NaN if the browser does not match, so
	 *  you can also do version compares the other way:
	 *
	 *    if (UserAgent_DEPRECATED.ie() < 7) {
	 *      //  IE6 or worse
	 *    }
	 *
	 *  Note that the version is a float and may include a minor version number,
	 *  so you should always use range operators to perform comparisons, not
	 *  strict equality.
	 *
	 *  **Note:** You should **strongly** prefer capability detection to browser
	 *  version detection where it's reasonable:
	 *
	 *    http://www.quirksmode.org/js/support.html
	 *
	 *  Further, we have a large number of mature wrapper functions and classes
	 *  which abstract away many browser irregularities. Check the documentation,
	 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
	 *  another copy of "event || window.event".
	 *
	 */

	var _populated = false;

	// Browsers
	var _ie, _firefox, _opera, _webkit, _chrome;

	// Actual IE browser for compatibility mode
	var _ie_real_version;

	// Platforms
	var _osx, _windows, _linux, _android;

	// Architectures
	var _win64;

	// Devices
	var _iphone, _ipad, _native;

	var _mobile;

	function _populate() {
	  if (_populated) {
	    return;
	  }

	  _populated = true;

	  // To work around buggy JS libraries that can't handle multi-digit
	  // version numbers, Opera 10's user agent string claims it's Opera
	  // 9, then later includes a Version/X.Y field:
	  //
	  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
	  var uas = navigator.userAgent;
	  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
	  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

	  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
	  _ipad = /\b(iP[ao]d)/.exec(uas);
	  _android = /Android/i.exec(uas);
	  _native = /FBAN\/\w+;/i.exec(uas);
	  _mobile = /Mobile/i.exec(uas);

	  // Note that the IE team blog would have you believe you should be checking
	  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
	  // from either x64 or ia64;  so ultimately, you should just check for Win64
	  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
	  // Windows will send 'WOW64' instead.
	  _win64 = !!/Win64/.exec(uas);

	  if (agent) {
	    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
	    // IE compatibility mode
	    if (_ie && document && document.documentMode) {
	      _ie = document.documentMode;
	    }
	    // grab the "true" ie version from the trident token if available
	    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
	    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

	    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
	    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
	    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
	    if (_webkit) {
	      // We do not add the regexp to the above test, because it will always
	      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
	      // the userAgent string.
	      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
	      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
	    } else {
	      _chrome = NaN;
	    }
	  } else {
	    _ie = _firefox = _opera = _chrome = _webkit = NaN;
	  }

	  if (os) {
	    if (os[1]) {
	      // Detect OS X version.  If no version number matches, set _osx to true.
	      // Version examples:  10, 10_6_1, 10.7
	      // Parses version number as a float, taking only first two sets of
	      // digits.  If only one set of digits is found, returns just the major
	      // version number.
	      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

	      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
	    } else {
	      _osx = false;
	    }
	    _windows = !!os[2];
	    _linux = !!os[3];
	  } else {
	    _osx = _windows = _linux = false;
	  }
	}

	var UserAgent_DEPRECATED = {

	  /**
	   *  Check if the UA is Internet Explorer.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  ie: function ie() {
	    return _populate() || _ie;
	  },

	  /**
	   * Check if we're in Internet Explorer compatibility mode.
	   *
	   * @return bool true if in compatibility mode, false if
	   * not compatibility mode or not ie
	   */
	  ieCompatibilityMode: function ieCompatibilityMode() {
	    return _populate() || _ie_real_version > _ie;
	  },

	  /**
	   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
	   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
	   * this when we don't need it -- tracked by #601957.
	   */
	  ie64: function ie64() {
	    return UserAgent_DEPRECATED.ie() && _win64;
	  },

	  /**
	   *  Check if the UA is Firefox.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  firefox: function firefox() {
	    return _populate() || _firefox;
	  },

	  /**
	   *  Check if the UA is Opera.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  opera: function opera() {
	    return _populate() || _opera;
	  },

	  /**
	   *  Check if the UA is WebKit.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  webkit: function webkit() {
	    return _populate() || _webkit;
	  },

	  /**
	   *  For Push
	   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
	   */
	  safari: function safari() {
	    return UserAgent_DEPRECATED.webkit();
	  },

	  /**
	   *  Check if the UA is a Chrome browser.
	   *
	   *
	   *  @return float|NaN Version number (if match) or NaN.
	   */
	  chrome: function chrome() {
	    return _populate() || _chrome;
	  },

	  /**
	   *  Check if the user is running Windows.
	   *
	   *  @return bool `true' if the user's OS is Windows.
	   */
	  windows: function windows() {
	    return _populate() || _windows;
	  },

	  /**
	   *  Check if the user is running Mac OS X.
	   *
	   *  @return float|bool   Returns a float if a version number is detected,
	   *                       otherwise true/false.
	   */
	  osx: function osx() {
	    return _populate() || _osx;
	  },

	  /**
	   * Check if the user is running Linux.
	   *
	   * @return bool `true' if the user's OS is some flavor of Linux.
	   */
	  linux: function linux() {
	    return _populate() || _linux;
	  },

	  /**
	   * Check if the user is running on an iPhone or iPod platform.
	   *
	   * @return bool `true' if the user is running some flavor of the
	   *    iPhone OS.
	   */
	  iphone: function iphone() {
	    return _populate() || _iphone;
	  },

	  mobile: function mobile() {
	    return _populate() || _iphone || _ipad || _android || _mobile;
	  },

	  nativeApp: function nativeApp() {
	    // webviews inside of the native apps
	    return _populate() || _native;
	  },

	  android: function android() {
	    return _populate() || _android;
	  },

	  ipad: function ipad() {
	    return _populate() || _ipad;
	  }
	};

	module.exports = UserAgent_DEPRECATED;

/***/ }),
/* 116 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ }),
/* 117 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cancelAnimationFramePolyfill
	 */

	/**
	 * Here is the native and polyfill version of cancelAnimationFrame.
	 * Please don't use it directly and use cancelAnimationFrame module instead.
	 */
	var cancelAnimationFrame = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame || global.clearTimeout;

	module.exports = cancelAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 118 */
/***/ (function(module, exports) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cssVar
	 * @typechecks
	 */

	"use strict";

	// If you change these, you'll need to restart the dev server for it to take effect.

	var CSS_VARS = {
	  'scrollbar-face-active-color': '#7d7d7d',
	  'scrollbar-face-color': '#c2c2c2',
	  'scrollbar-face-margin': '4px',
	  'scrollbar-face-radius': '6px',
	  'scrollbar-size': '15px',
	  'scrollbar-size-large': '17px',
	  'scrollbar-track-color': '#fff',
	  'border-color': '#d3d3d3',
	  'fbui-white': '#fff',
	  'fbui-desktop-background-light': '#f6f7f8'
	};

	/**
	 * @param {string} name
	 */
	function cssVar(name) {
	  if (CSS_VARS.hasOwnProperty(name)) {
	    return CSS_VARS[name];
	  }

	  throw new Error('cssVar' + '("' + name + '"): Unexpected class transformation.');
	}

	cssVar.CSS_VARS = CSS_VARS;

	module.exports = cssVar;

/***/ }),
/* 119 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule debounceCore
	 * @typechecks
	 */

	/**
	 * Invokes the given callback after a specified number of milliseconds have
	 * elapsed, ignoring subsequent calls.
	 *
	 * For example, if you wanted to update a preview after the user stops typing
	 * you could do the following:
	 *
	 *   elem.addEventListener('keyup', debounce(this.updatePreview, 250), false);
	 *
	 * The returned function has a reset method which can be called to cancel a
	 * pending invocation.
	 *
	 *   var debouncedUpdatePreview = debounce(this.updatePreview, 250);
	 *   elem.addEventListener('keyup', debouncedUpdatePreview, false);
	 *
	 *   // later, to cancel pending calls
	 *   debouncedUpdatePreview.reset();
	 *
	 * @param {function} func - the function to debounce
	 * @param {number} wait - how long to wait in milliseconds
	 * @param {*} context - optional context to invoke the function in
	 * @param {?function} setTimeoutFunc - an implementation of setTimeout
	 *  if nothing is passed in the default setTimeout function is used
	  * @param {?function} clearTimeoutFunc - an implementation of clearTimeout
	 *  if nothing is passed in the default clearTimeout function is used
	 */
	function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
	  setTimeoutFunc = setTimeoutFunc || setTimeout;
	  clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
	  var timeout;

	  function debouncer() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    debouncer.reset();

	    var callback = function callback() {
	      func.apply(context, args);
	    };
	    callback.__SMmeta = func.__SMmeta;
	    timeout = setTimeoutFunc(callback, wait);
	  }

	  debouncer.reset = function () {
	    clearTimeoutFunc(timeout);
	  };

	  return debouncer;
	}

	module.exports = debounce;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isEventSupported
	 */

	'use strict';

	var _ExecutionEnvironment = __webpack_require__(33);

	var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var useHasFeature;
	if (_ExecutionEnvironment2.default.canUseDOM) {
	  useHasFeature = document.implementation && document.implementation.hasFeature &&
	  // always returns true in newer browsers as per the standard.
	  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	  document.implementation.hasFeature('', '') !== true;
	}

	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!_ExecutionEnvironment2.default.canUseDOM || capture && !('addEventListener' in document)) {
	    return false;
	  }

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = eventName in document;

	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  return isSupported;
	}

	module.exports = isEventSupported;

/***/ }),
/* 121 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule nativeRequestAnimationFrame
	 */

	var nativeRequestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame;

	module.exports = nativeRequestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule normalizeWheel
	 * @typechecks
	 */

	'use strict';

	var _UserAgent_DEPRECATED = __webpack_require__(115);

	var _UserAgent_DEPRECATED2 = _interopRequireDefault(_UserAgent_DEPRECATED);

	var _isEventSupported = __webpack_require__(120);

	var _isEventSupported2 = _interopRequireDefault(_isEventSupported);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Reasonable defaults
	var PIXEL_STEP = 10;
	var LINE_HEIGHT = 40;
	var PAGE_HEIGHT = 800;

	/**
	 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
	 * complicated, thus this doc is long and (hopefully) detailed enough to answer
	 * your questions.
	 *
	 * If you need to react to the mouse wheel in a predictable way, this code is
	 * like your bestest friend. * hugs *
	 *
	 * As of today, there are 4 DOM event types you can listen to:
	 *
	 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
	 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
	 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
	 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
	 *
	 * So what to do?  The is the best:
	 *
	 *   normalizeWheel.getEventType();
	 *
	 * In your event callback, use this code to get sane interpretation of the
	 * deltas.  This code will return an object with properties:
	 *
	 *   spinX   -- normalized spin speed (use for zoom) - x plane
	 *   spinY   -- " - y plane
	 *   pixelX  -- normalized distance (to pixels) - x plane
	 *   pixelY  -- " - y plane
	 *
	 * Wheel values are provided by the browser assuming you are using the wheel to
	 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
	 * significantly on different platforms and browsers, forgetting that you can
	 * scroll at different speeds.  Some devices (like trackpads) emit more events
	 * at smaller increments with fine granularity, and some emit massive jumps with
	 * linear speed or acceleration.
	 *
	 * This code does its best to normalize the deltas for you:
	 *
	 *   - spin is trying to normalize how far the wheel was spun (or trackpad
	 *     dragged).  This is super useful for zoom support where you want to
	 *     throw away the chunky scroll steps on the PC and make those equal to
	 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
	 *     resolve a single slow step on a wheel to 1.
	 *
	 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
	 *     get the crazy differences between browsers, but at least it'll be in
	 *     pixels!
	 *
	 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
	 *     should translate to positive value zooming IN, negative zooming OUT.
	 *     This matches the newer 'wheel' event.
	 *
	 * Why are there spinX, spinY (or pixels)?
	 *
	 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
	 *     with a mouse.  It results in side-scrolling in the browser by default.
	 *
	 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
	 *
	 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
	 *     probably is by browsers in conjunction with fancy 3D controllers .. but
	 *     you know.
	 *
	 * Implementation info:
	 *
	 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
	 * average mouse:
	 *
	 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
	 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
	 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
	 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
	 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
	 *
	 * On the trackpad:
	 *
	 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
	 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
	 *
	 * On other/older browsers.. it's more complicated as there can be multiple and
	 * also missing delta values.
	 *
	 * The 'wheel' event is more standard:
	 *
	 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
	 *
	 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
	 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
	 * backward compatibility with older events.  Those other values help us
	 * better normalize spin speed.  Example of what the browsers provide:
	 *
	 *                          | event.wheelDelta | event.detail
	 *        ------------------+------------------+--------------
	 *          Safari v5/OS X  |       -120       |       0
	 *          Safari v5/Win7  |       -120       |       0
	 *         Chrome v17/OS X  |       -120       |       0
	 *         Chrome v17/Win7  |       -120       |       0
	 *                IE9/Win7  |       -120       |   undefined
	 *         Firefox v4/OS X  |     undefined    |       1
	 *         Firefox v4/Win7  |     undefined    |       3
	 *
	 */
	function normalizeWheel( /*object*/event) /*object*/{
	  var sX = 0,
	      sY = 0,
	      // spinX, spinY
	  pX = 0,
	      pY = 0; // pixelX, pixelY

	  // Legacy
	  if ('detail' in event) {
	    sY = event.detail;
	  }
	  if ('wheelDelta' in event) {
	    sY = -event.wheelDelta / 120;
	  }
	  if ('wheelDeltaY' in event) {
	    sY = -event.wheelDeltaY / 120;
	  }
	  if ('wheelDeltaX' in event) {
	    sX = -event.wheelDeltaX / 120;
	  }

	  // side scrolling on FF with DOMMouseScroll
	  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
	    sX = sY;
	    sY = 0;
	  }

	  pX = sX * PIXEL_STEP;
	  pY = sY * PIXEL_STEP;

	  if ('deltaY' in event) {
	    pY = event.deltaY;
	  }
	  if ('deltaX' in event) {
	    pX = event.deltaX;
	  }

	  if ((pX || pY) && event.deltaMode) {
	    if (event.deltaMode == 1) {
	      // delta in LINE units
	      pX *= LINE_HEIGHT;
	      pY *= LINE_HEIGHT;
	    } else {
	      // delta in PAGE units
	      pX *= PAGE_HEIGHT;
	      pY *= PAGE_HEIGHT;
	    }
	  }

	  // Fall-back if spin cannot be determined
	  if (pX && !sX) {
	    sX = pX < 1 ? -1 : 1;
	  }
	  if (pY && !sY) {
	    sY = pY < 1 ? -1 : 1;
	  }

	  return { spinX: sX,
	    spinY: sY,
	    pixelX: pX,
	    pixelY: pY };
	}

	/**
	 * The best combination if you prefer spinX + spinY normalization.  It favors
	 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
	 * 'wheel' event, making spin speed determination impossible.
	 */
	normalizeWheel.getEventType = function () /*string*/{
	  return _UserAgent_DEPRECATED2.default.firefox() ? 'DOMMouseScroll' : (0, _isEventSupported2.default)('wheel') ? 'wheel' : 'mousewheel';
	};

	module.exports = normalizeWheel;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright Schrodinger, LLC
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule translateDOMPositionXY
	 * @typechecks
	 */

	'use strict';

	var _BrowserSupportCore = __webpack_require__(96);

	var _BrowserSupportCore2 = _interopRequireDefault(_BrowserSupportCore);

	var _getVendorPrefixedName = __webpack_require__(40);

	var _getVendorPrefixedName2 = _interopRequireDefault(_getVendorPrefixedName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TRANSFORM = (0, _getVendorPrefixedName2.default)('transform');
	var BACKFACE_VISIBILITY = (0, _getVendorPrefixedName2.default)('backfaceVisibility');

	var translateDOMPositionXY = function () {
	  if (_BrowserSupportCore2.default.hasCSSTransforms()) {
	    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
	    var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
	    // It appears that Safari messes up the composition order
	    // of GPU-accelerated layers
	    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
	    // Use 2D translation instead.
	    if (!isSafari && _BrowserSupportCore2.default.hasCSS3DTransforms()) {
	      return function ( /*object*/style, /*number*/x, /*number*/y) {
	        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
	        style[BACKFACE_VISIBILITY] = 'hidden';
	      };
	    } else {
	      return function ( /*object*/style, /*number*/x, /*number*/y) {
	        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
	      };
	    }
	  } else {
	    return function ( /*object*/style, /*number*/x, /*number*/y) {
	      style.left = x + 'px';
	      style.top = y + 'px';
	    };
	  }
	}();

	module.exports = translateDOMPositionXY;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(104);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! nouislider - 8.5.1 - 2016-04-24 16:00:29 */

	(function (factory) {

	    if ( true ) {

	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if ( typeof exports === 'object' ) {

	        // Node/CommonJS
	        module.exports = factory();

	    } else {

	        // Browser globals
	        window.noUiSlider = factory();
	    }

	}(function( ){

		'use strict';


		// Removes duplicates from an array.
		function unique(array) {
			return array.filter(function(a){
				return !this[a] ? this[a] = true : false;
			}, {});
		}

		// Round a value to the closest 'to'.
		function closest ( value, to ) {
			return Math.round(value / to) * to;
		}

		// Current position of an element relative to the document.
		function offset ( elem ) {

		var rect = elem.getBoundingClientRect(),
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			pageOffset = getPageOffset();

			// getBoundingClientRect contains left scroll in Chrome on Android.
			// I haven't found a feature detection that proves this. Worst case
			// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
			if ( /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) ) {
				pageOffset.x = 0;
			}

			return {
				top: rect.top + pageOffset.y - docElem.clientTop,
				left: rect.left + pageOffset.x - docElem.clientLeft
			};
		}

		// Checks whether a value is numerical.
		function isNumeric ( a ) {
			return typeof a === 'number' && !isNaN( a ) && isFinite( a );
		}

		// Sets a class and removes it after [duration] ms.
		function addClassFor ( element, className, duration ) {
			addClass(element, className);
			setTimeout(function(){
				removeClass(element, className);
			}, duration);
		}

		// Limits a value to 0 - 100
		function limit ( a ) {
			return Math.max(Math.min(a, 100), 0);
		}

		// Wraps a variable as an array, if it isn't one yet.
		function asArray ( a ) {
			return Array.isArray(a) ? a : [a];
		}

		// Counts decimals
		function countDecimals ( numStr ) {
			var pieces = numStr.split(".");
			return pieces.length > 1 ? pieces[1].length : 0;
		}

		// http://youmightnotneedjquery.com/#add_class
		function addClass ( el, className ) {
			if ( el.classList ) {
				el.classList.add(className);
			} else {
				el.className += ' ' + className;
			}
		}

		// http://youmightnotneedjquery.com/#remove_class
		function removeClass ( el, className ) {
			if ( el.classList ) {
				el.classList.remove(className);
			} else {
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}

		// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
		function hasClass ( el, className ) {
			return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
		function getPageOffset ( ) {

			var supportPageOffset = window.pageXOffset !== undefined,
				isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"),
				x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
				y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

			return {
				x: x,
				y: y
			};
		}

		// we provide a function to compute constants instead
		// of accessing window.* as soon as the module needs it
		// so that we do not compute anything if not needed
		function getActions ( ) {

			// Determine the events to bind. IE11 implements pointerEvents without
			// a prefix, which breaks compatibility with the IE10 implementation.
			return window.navigator.pointerEnabled ? {
				start: 'pointerdown',
				move: 'pointermove',
				end: 'pointerup'
			} : window.navigator.msPointerEnabled ? {
				start: 'MSPointerDown',
				move: 'MSPointerMove',
				end: 'MSPointerUp'
			} : {
				start: 'mousedown touchstart',
				move: 'mousemove touchmove',
				end: 'mouseup touchend'
			};
		}


	// Value calculation

		// Determine the size of a sub-range in relation to a full range.
		function subRangeRatio ( pa, pb ) {
			return (100 / (pb - pa));
		}

		// (percentage) How many percent is this value of this range?
		function fromPercentage ( range, value ) {
			return (value * 100) / ( range[1] - range[0] );
		}

		// (percentage) Where is this value on this range?
		function toPercentage ( range, value ) {
			return fromPercentage( range, range[0] < 0 ?
				value + Math.abs(range[0]) :
					value - range[0] );
		}

		// (value) How much is this percentage on this range?
		function isPercentage ( range, value ) {
			return ((value * ( range[1] - range[0] )) / 100) + range[0];
		}


	// Range conversion

		function getJ ( value, arr ) {

			var j = 1;

			while ( value >= arr[j] ){
				j += 1;
			}

			return j;
		}

		// (percentage) Input a value, find where, on a scale of 0-100, it applies.
		function toStepping ( xVal, xPct, value ) {

			if ( value >= xVal.slice(-1)[0] ){
				return 100;
			}

			var j = getJ( value, xVal ), va, vb, pa, pb;

			va = xVal[j-1];
			vb = xVal[j];
			pa = xPct[j-1];
			pb = xPct[j];

			return pa + (toPercentage([va, vb], value) / subRangeRatio (pa, pb));
		}

		// (value) Input a percentage, find where it is on the specified range.
		function fromStepping ( xVal, xPct, value ) {

			// There is no range group that fits 100
			if ( value >= 100 ){
				return xVal.slice(-1)[0];
			}

			var j = getJ( value, xPct ), va, vb, pa, pb;

			va = xVal[j-1];
			vb = xVal[j];
			pa = xPct[j-1];
			pb = xPct[j];

			return isPercentage([va, vb], (value - pa) * subRangeRatio (pa, pb));
		}

		// (percentage) Get the step that applies at a certain value.
		function getStep ( xPct, xSteps, snap, value ) {

			if ( value === 100 ) {
				return value;
			}

			var j = getJ( value, xPct ), a, b;

			// If 'snap' is set, steps are used as fixed points on the slider.
			if ( snap ) {

				a = xPct[j-1];
				b = xPct[j];

				// Find the closest position, a or b.
				if ((value - a) > ((b-a)/2)){
					return b;
				}

				return a;
			}

			if ( !xSteps[j-1] ){
				return value;
			}

			return xPct[j-1] + closest(
				value - xPct[j-1],
				xSteps[j-1]
			);
		}


	// Entry parsing

		function handleEntryPoint ( index, value, that ) {

			var percentage;

			// Wrap numerical input in an array.
			if ( typeof value === "number" ) {
				value = [value];
			}

			// Reject any invalid input, by testing whether value is an array.
			if ( Object.prototype.toString.call( value ) !== '[object Array]' ){
				throw new Error("noUiSlider: 'range' contains invalid value.");
			}

			// Covert min/max syntax to 0 and 100.
			if ( index === 'min' ) {
				percentage = 0;
			} else if ( index === 'max' ) {
				percentage = 100;
			} else {
				percentage = parseFloat( index );
			}

			// Check for correct input.
			if ( !isNumeric( percentage ) || !isNumeric( value[0] ) ) {
				throw new Error("noUiSlider: 'range' value isn't numeric.");
			}

			// Store values.
			that.xPct.push( percentage );
			that.xVal.push( value[0] );

			// NaN will evaluate to false too, but to keep
			// logging clear, set step explicitly. Make sure
			// not to override the 'step' setting with false.
			if ( !percentage ) {
				if ( !isNaN( value[1] ) ) {
					that.xSteps[0] = value[1];
				}
			} else {
				that.xSteps.push( isNaN(value[1]) ? false : value[1] );
			}
		}

		function handleStepPoint ( i, n, that ) {

			// Ignore 'false' stepping.
			if ( !n ) {
				return true;
			}

			// Factor to range ratio
			that.xSteps[i] = fromPercentage([
				 that.xVal[i]
				,that.xVal[i+1]
			], n) / subRangeRatio (
				that.xPct[i],
				that.xPct[i+1] );
		}


	// Interface

		// The interface to Spectrum handles all direction-based
		// conversions, so the above values are unaware.

		function Spectrum ( entry, snap, direction, singleStep ) {

			this.xPct = [];
			this.xVal = [];
			this.xSteps = [ singleStep || false ];
			this.xNumSteps = [ false ];

			this.snap = snap;
			this.direction = direction;

			var index, ordered = [ /* [0, 'min'], [1, '50%'], [2, 'max'] */ ];

			// Map the object keys to an array.
			for ( index in entry ) {
				if ( entry.hasOwnProperty(index) ) {
					ordered.push([entry[index], index]);
				}
			}

			// Sort all entries by value (numeric sort).
			if ( ordered.length && typeof ordered[0][0] === "object" ) {
				ordered.sort(function(a, b) { return a[0][0] - b[0][0]; });
			} else {
				ordered.sort(function(a, b) { return a[0] - b[0]; });
			}


			// Convert all entries to subranges.
			for ( index = 0; index < ordered.length; index++ ) {
				handleEntryPoint(ordered[index][1], ordered[index][0], this);
			}

			// Store the actual step values.
			// xSteps is sorted in the same order as xPct and xVal.
			this.xNumSteps = this.xSteps.slice(0);

			// Convert all numeric steps to the percentage of the subrange they represent.
			for ( index = 0; index < this.xNumSteps.length; index++ ) {
				handleStepPoint(index, this.xNumSteps[index], this);
			}
		}

		Spectrum.prototype.getMargin = function ( value ) {
			return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
		};

		Spectrum.prototype.toStepping = function ( value ) {

			value = toStepping( this.xVal, this.xPct, value );

			// Invert the value if this is a right-to-left slider.
			if ( this.direction ) {
				value = 100 - value;
			}

			return value;
		};

		Spectrum.prototype.fromStepping = function ( value ) {

			// Invert the value if this is a right-to-left slider.
			if ( this.direction ) {
				value = 100 - value;
			}

			return fromStepping( this.xVal, this.xPct, value );
		};

		Spectrum.prototype.getStep = function ( value ) {

			// Find the proper step for rtl sliders by search in inverse direction.
			// Fixes issue #262.
			if ( this.direction ) {
				value = 100 - value;
			}

			value = getStep(this.xPct, this.xSteps, this.snap, value );

			if ( this.direction ) {
				value = 100 - value;
			}

			return value;
		};

		Spectrum.prototype.getApplicableStep = function ( value ) {

			// If the value is 100%, return the negative step twice.
			var j = getJ(value, this.xPct), offset = value === 100 ? 2 : 1;
			return [this.xNumSteps[j-2], this.xVal[j-offset], this.xNumSteps[j-offset]];
		};

		// Outside testing
		Spectrum.prototype.convert = function ( value ) {
			return this.getStep(this.toStepping(value));
		};

	/*	Every input option is tested and parsed. This'll prevent
		endless validation in internal methods. These tests are
		structured with an item for every option available. An
		option can be marked as required by setting the 'r' flag.
		The testing function is provided with three arguments:
			- The provided value for the option;
			- A reference to the options object;
			- The name for the option;

		The testing function returns false when an error is detected,
		or true when everything is OK. It can also modify the option
		object, to make sure all values can be correctly looped elsewhere. */

		var defaultFormatter = { 'to': function( value ){
			return value !== undefined && value.toFixed(2);
		}, 'from': Number };

		function testStep ( parsed, entry ) {

			if ( !isNumeric( entry ) ) {
				throw new Error("noUiSlider: 'step' is not numeric.");
			}

			// The step option can still be used to set stepping
			// for linear sliders. Overwritten if set in 'range'.
			parsed.singleStep = entry;
		}

		function testRange ( parsed, entry ) {

			// Filter incorrect input.
			if ( typeof entry !== 'object' || Array.isArray(entry) ) {
				throw new Error("noUiSlider: 'range' is not an object.");
			}

			// Catch missing start or end.
			if ( entry.min === undefined || entry.max === undefined ) {
				throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
			}

			// Catch equal start or end.
			if ( entry.min === entry.max ) {
				throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
			}

			parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
		}

		function testStart ( parsed, entry ) {

			entry = asArray(entry);

			// Validate input. Values aren't tested, as the public .val method
			// will always provide a valid location.
			if ( !Array.isArray( entry ) || !entry.length || entry.length > 2 ) {
				throw new Error("noUiSlider: 'start' option is incorrect.");
			}

			// Store the number of handles.
			parsed.handles = entry.length;

			// When the slider is initialized, the .val method will
			// be called with the start options.
			parsed.start = entry;
		}

		function testSnap ( parsed, entry ) {

			// Enforce 100% stepping within subranges.
			parsed.snap = entry;

			if ( typeof entry !== 'boolean' ){
				throw new Error("noUiSlider: 'snap' option must be a boolean.");
			}
		}

		function testAnimate ( parsed, entry ) {

			// Enforce 100% stepping within subranges.
			parsed.animate = entry;

			if ( typeof entry !== 'boolean' ){
				throw new Error("noUiSlider: 'animate' option must be a boolean.");
			}
		}

		function testAnimationDuration ( parsed, entry ) {

			parsed.animationDuration = entry;

			if ( typeof entry !== 'number' ){
				throw new Error("noUiSlider: 'animationDuration' option must be a number.");
			}
		}

		function testConnect ( parsed, entry ) {

			if ( entry === 'lower' && parsed.handles === 1 ) {
				parsed.connect = 1;
			} else if ( entry === 'upper' && parsed.handles === 1 ) {
				parsed.connect = 2;
			} else if ( entry === true && parsed.handles === 2 ) {
				parsed.connect = 3;
			} else if ( entry === false ) {
				parsed.connect = 0;
			} else {
				throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
			}
		}

		function testOrientation ( parsed, entry ) {

			// Set orientation to an a numerical value for easy
			// array selection.
			switch ( entry ){
			  case 'horizontal':
				parsed.ort = 0;
				break;
			  case 'vertical':
				parsed.ort = 1;
				break;
			  default:
				throw new Error("noUiSlider: 'orientation' option is invalid.");
			}
		}

		function testMargin ( parsed, entry ) {

			if ( !isNumeric(entry) ){
				throw new Error("noUiSlider: 'margin' option must be numeric.");
			}

			// Issue #582
			if ( entry === 0 ) {
				return;
			}

			parsed.margin = parsed.spectrum.getMargin(entry);

			if ( !parsed.margin ) {
				throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
			}
		}

		function testLimit ( parsed, entry ) {

			if ( !isNumeric(entry) ){
				throw new Error("noUiSlider: 'limit' option must be numeric.");
			}

			parsed.limit = parsed.spectrum.getMargin(entry);

			if ( !parsed.limit ) {
				throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
			}
		}

		function testDirection ( parsed, entry ) {

			// Set direction as a numerical value for easy parsing.
			// Invert connection for RTL sliders, so that the proper
			// handles get the connect/background classes.
			switch ( entry ) {
			  case 'ltr':
				parsed.dir = 0;
				break;
			  case 'rtl':
				parsed.dir = 1;
				parsed.connect = [0,2,1,3][parsed.connect];
				break;
			  default:
				throw new Error("noUiSlider: 'direction' option was not recognized.");
			}
		}

		function testBehaviour ( parsed, entry ) {

			// Make sure the input is a string.
			if ( typeof entry !== 'string' ) {
				throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
			}

			// Check if the string contains any keywords.
			// None are required.
			var tap = entry.indexOf('tap') >= 0,
				drag = entry.indexOf('drag') >= 0,
				fixed = entry.indexOf('fixed') >= 0,
				snap = entry.indexOf('snap') >= 0,
				hover = entry.indexOf('hover') >= 0;

			// Fix #472
			if ( drag && !parsed.connect ) {
				throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
			}

			parsed.events = {
				tap: tap || snap,
				drag: drag,
				fixed: fixed,
				snap: snap,
				hover: hover
			};
		}

		function testTooltips ( parsed, entry ) {

			var i;

			if ( entry === false ) {
				return;
			} else if ( entry === true ) {

				parsed.tooltips = [];

				for ( i = 0; i < parsed.handles; i++ ) {
					parsed.tooltips.push(true);
				}

			} else {

				parsed.tooltips = asArray(entry);

				if ( parsed.tooltips.length !== parsed.handles ) {
					throw new Error("noUiSlider: must pass a formatter for all handles.");
				}

				parsed.tooltips.forEach(function(formatter){
					if ( typeof formatter !== 'boolean' && (typeof formatter !== 'object' || typeof formatter.to !== 'function') ) {
						throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
					}
				});
			}
		}

		function testFormat ( parsed, entry ) {

			parsed.format = entry;

			// Any object with a to and from method is supported.
			if ( typeof entry.to === 'function' && typeof entry.from === 'function' ) {
				return true;
			}

			throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
		}

		function testCssPrefix ( parsed, entry ) {

			if ( entry !== undefined && typeof entry !== 'string' && entry !== false ) {
				throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
			}

			parsed.cssPrefix = entry;
		}

		function testCssClasses ( parsed, entry ) {

			if ( entry !== undefined && typeof entry !== 'object' ) {
				throw new Error("noUiSlider: 'cssClasses' must be an object.");
			}

			if ( typeof parsed.cssPrefix === 'string' ) {
				parsed.cssClasses = {};

				for ( var key in entry ) {
					if ( !entry.hasOwnProperty(key) ) { continue; }

					parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
				}
			} else {
				parsed.cssClasses = entry;
			}
		}

		// Test all developer settings and parse to assumption-safe values.
		function testOptions ( options ) {

			// To prove a fix for #537, freeze options here.
			// If the object is modified, an error will be thrown.
			// Object.freeze(options);

			var parsed = {
				margin: 0,
				limit: 0,
				animate: true,
				animationDuration: 300,
				format: defaultFormatter
			}, tests;

			// Tests are executed in the order they are presented here.
			tests = {
				'step': { r: false, t: testStep },
				'start': { r: true, t: testStart },
				'connect': { r: true, t: testConnect },
				'direction': { r: true, t: testDirection },
				'snap': { r: false, t: testSnap },
				'animate': { r: false, t: testAnimate },
				'animationDuration': { r: false, t: testAnimationDuration },
				'range': { r: true, t: testRange },
				'orientation': { r: false, t: testOrientation },
				'margin': { r: false, t: testMargin },
				'limit': { r: false, t: testLimit },
				'behaviour': { r: true, t: testBehaviour },
				'format': { r: false, t: testFormat },
				'tooltips': { r: false, t: testTooltips },
				'cssPrefix': { r: false, t: testCssPrefix },
				'cssClasses': { r: false, t: testCssClasses }
			};

			var defaults = {
				'connect': false,
				'direction': 'ltr',
				'behaviour': 'tap',
				'orientation': 'horizontal',
				'cssPrefix' : 'noUi-',
				'cssClasses': {
					target: 'target',
					base: 'base',
					origin: 'origin',
					handle: 'handle',
					handleLower: 'handle-lower',
					handleUpper: 'handle-upper',
					horizontal: 'horizontal',
					vertical: 'vertical',
					background: 'background',
					connect: 'connect',
					ltr: 'ltr',
					rtl: 'rtl',
					draggable: 'draggable',
					drag: 'state-drag',
					tap: 'state-tap',
					active: 'active',
					stacking: 'stacking',
					tooltip: 'tooltip',
					pips: 'pips',
					pipsHorizontal: 'pips-horizontal',
					pipsVertical: 'pips-vertical',
					marker: 'marker',
					markerHorizontal: 'marker-horizontal',
					markerVertical: 'marker-vertical',
					markerNormal: 'marker-normal',
					markerLarge: 'marker-large',
					markerSub: 'marker-sub',
					value: 'value',
					valueHorizontal: 'value-horizontal',
					valueVertical: 'value-vertical',
					valueNormal: 'value-normal',
					valueLarge: 'value-large',
					valueSub: 'value-sub'
				}
			};

			// Run all options through a testing mechanism to ensure correct
			// input. It should be noted that options might get modified to
			// be handled properly. E.g. wrapping integers in arrays.
			Object.keys(tests).forEach(function( name ){

				// If the option isn't set, but it is required, throw an error.
				if ( options[name] === undefined && defaults[name] === undefined ) {

					if ( tests[name].r ) {
						throw new Error("noUiSlider: '" + name + "' is required.");
					}

					return true;
				}

				tests[name].t( parsed, options[name] === undefined ? defaults[name] : options[name] );
			});

			// Forward pips options
			parsed.pips = options.pips;

			// Pre-define the styles.
			parsed.style = parsed.ort ? 'top' : 'left';

			return parsed;
		}


	function closure ( target, options, originalOptions ){
		var
			actions = getActions( ),
			// All variables local to 'closure' are prefixed with 'scope_'
			scope_Target = target,
			scope_Locations = [-1, -1],
			scope_Base,
			scope_Handles,
			scope_Spectrum = options.spectrum,
			scope_Values = [],
			scope_Events = {},
			scope_Self;


		// Delimit proposed values for handle positions.
		function getPositions ( a, b, delimit ) {

			// Add movement to current position.
			var c = a + b[0], d = a + b[1];

			// Only alter the other position on drag,
			// not on standard sliding.
			if ( delimit ) {
				if ( c < 0 ) {
					d += Math.abs(c);
				}
				if ( d > 100 ) {
					c -= ( d - 100 );
				}

				// Limit values to 0 and 100.
				return [limit(c), limit(d)];
			}

			return [c,d];
		}

		// Provide a clean event with standardized offset values.
		function fixEvent ( e, pageOffset ) {

			// Prevent scrolling and panning on touch events, while
			// attempting to slide. The tap event also depends on this.
			e.preventDefault();

			// Filter the event to register the type, which can be
			// touch, mouse or pointer. Offset changes need to be
			// made on an event specific basis.
			var touch = e.type.indexOf('touch') === 0,
				mouse = e.type.indexOf('mouse') === 0,
				pointer = e.type.indexOf('pointer') === 0,
				x,y, event = e;

			// IE10 implemented pointer events with a prefix;
			if ( e.type.indexOf('MSPointer') === 0 ) {
				pointer = true;
			}

			if ( touch ) {
				// noUiSlider supports one movement at a time,
				// so we can select the first 'changedTouch'.
				x = e.changedTouches[0].pageX;
				y = e.changedTouches[0].pageY;
			}

			pageOffset = pageOffset || getPageOffset();

			if ( mouse || pointer ) {
				x = e.clientX + pageOffset.x;
				y = e.clientY + pageOffset.y;
			}

			event.pageOffset = pageOffset;
			event.points = [x, y];
			event.cursor = mouse || pointer; // Fix #435

			return event;
		}

		// Append a handle to the base.
		function addHandle ( direction, index ) {

			var origin = document.createElement('div'),
				handle = document.createElement('div'),
				classModifier = [options.cssClasses.handleLower, options.cssClasses.handleUpper];

			if ( direction ) {
				classModifier.reverse();
			}

			addClass(handle, options.cssClasses.handle);
			addClass(handle, classModifier[index]);

			addClass(origin, options.cssClasses.origin);
			origin.appendChild(handle);

			return origin;
		}

		// Add the proper connection classes.
		function addConnection ( connect, target, handles ) {

			// Apply the required connection classes to the elements
			// that need them. Some classes are made up for several
			// segments listed in the class list, to allow easy
			// renaming and provide a minor compression benefit.
			switch ( connect ) {
				case 1:	addClass(target, options.cssClasses.connect);
						addClass(handles[0], options.cssClasses.background);
						break;
				case 3: addClass(handles[1], options.cssClasses.background);
						/* falls through */
				case 2: addClass(handles[0], options.cssClasses.connect);
						/* falls through */
				case 0: addClass(target, options.cssClasses.background);
						break;
			}
		}

		// Add handles to the slider base.
		function addHandles ( nrHandles, direction, base ) {

			var index, handles = [];

			// Append handles.
			for ( index = 0; index < nrHandles; index += 1 ) {

				// Keep a list of all added handles.
				handles.push( base.appendChild(addHandle( direction, index )) );
			}

			return handles;
		}

		// Initialize a single slider.
		function addSlider ( direction, orientation, target ) {

			// Apply classes and data to the target.
			addClass(target, options.cssClasses.target);

			if ( direction === 0 ) {
				addClass(target, options.cssClasses.ltr);
			} else {
				addClass(target, options.cssClasses.rtl);
			}

			if ( orientation === 0 ) {
				addClass(target, options.cssClasses.horizontal);
			} else {
				addClass(target, options.cssClasses.vertical);
			}

			var div = document.createElement('div');
			addClass(div, options.cssClasses.base);
			target.appendChild(div);
			return div;
		}


		function addTooltip ( handle, index ) {

			if ( !options.tooltips[index] ) {
				return false;
			}

			var element = document.createElement('div');
			element.className = options.cssClasses.tooltip;
			return handle.firstChild.appendChild(element);
		}

		// The tooltips option is a shorthand for using the 'update' event.
		function tooltips ( ) {

			if ( options.dir ) {
				options.tooltips.reverse();
			}

			// Tooltips are added with options.tooltips in original order.
			var tips = scope_Handles.map(addTooltip);

			if ( options.dir ) {
				tips.reverse();
				options.tooltips.reverse();
			}

			bindEvent('update', function(f, o, r) {
				if ( tips[o] ) {
					tips[o].innerHTML = options.tooltips[o] === true ? f[o] : options.tooltips[o].to(r[o]);
				}
			});
		}


		function getGroup ( mode, values, stepped ) {

			// Use the range.
			if ( mode === 'range' || mode === 'steps' ) {
				return scope_Spectrum.xVal;
			}

			if ( mode === 'count' ) {

				// Divide 0 - 100 in 'count' parts.
				var spread = ( 100 / (values-1) ), v, i = 0;
				values = [];

				// List these parts and have them handled as 'positions'.
				while ((v=i++*spread) <= 100 ) {
					values.push(v);
				}

				mode = 'positions';
			}

			if ( mode === 'positions' ) {

				// Map all percentages to on-range values.
				return values.map(function( value ){
					return scope_Spectrum.fromStepping( stepped ? scope_Spectrum.getStep( value ) : value );
				});
			}

			if ( mode === 'values' ) {

				// If the value must be stepped, it needs to be converted to a percentage first.
				if ( stepped ) {

					return values.map(function( value ){

						// Convert to percentage, apply step, return to value.
						return scope_Spectrum.fromStepping( scope_Spectrum.getStep( scope_Spectrum.toStepping( value ) ) );
					});

				}

				// Otherwise, we can simply use the values.
				return values;
			}
		}

		function generateSpread ( density, mode, group ) {

			function safeIncrement(value, increment) {
				// Avoid floating point variance by dropping the smallest decimal places.
				return (value + increment).toFixed(7) / 1;
			}

			var originalSpectrumDirection = scope_Spectrum.direction,
				indexes = {},
				firstInRange = scope_Spectrum.xVal[0],
				lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length-1],
				ignoreFirst = false,
				ignoreLast = false,
				prevPct = 0;

			// This function loops the spectrum in an ltr linear fashion,
			// while the toStepping method is direction aware. Trick it into
			// believing it is ltr.
			scope_Spectrum.direction = 0;

			// Create a copy of the group, sort it and filter away all duplicates.
			group = unique(group.slice().sort(function(a, b){ return a - b; }));

			// Make sure the range starts with the first element.
			if ( group[0] !== firstInRange ) {
				group.unshift(firstInRange);
				ignoreFirst = true;
			}

			// Likewise for the last one.
			if ( group[group.length - 1] !== lastInRange ) {
				group.push(lastInRange);
				ignoreLast = true;
			}

			group.forEach(function ( current, index ) {

				// Get the current step and the lower + upper positions.
				var step, i, q,
					low = current,
					high = group[index+1],
					newPct, pctDifference, pctPos, type,
					steps, realSteps, stepsize;

				// When using 'steps' mode, use the provided steps.
				// Otherwise, we'll step on to the next subrange.
				if ( mode === 'steps' ) {
					step = scope_Spectrum.xNumSteps[ index ];
				}

				// Default to a 'full' step.
				if ( !step ) {
					step = high-low;
				}

				// Low can be 0, so test for false. If high is undefined,
				// we are at the last subrange. Index 0 is already handled.
				if ( low === false || high === undefined ) {
					return;
				}

				// Find all steps in the subrange.
				for ( i = low; i <= high; i = safeIncrement(i, step) ) {

					// Get the percentage value for the current step,
					// calculate the size for the subrange.
					newPct = scope_Spectrum.toStepping( i );
					pctDifference = newPct - prevPct;

					steps = pctDifference / density;
					realSteps = Math.round(steps);

					// This ratio represents the ammount of percentage-space a point indicates.
					// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
					// Round the percentage offset to an even number, then divide by two
					// to spread the offset on both sides of the range.
					stepsize = pctDifference/realSteps;

					// Divide all points evenly, adding the correct number to this subrange.
					// Run up to <= so that 100% gets a point, event if ignoreLast is set.
					for ( q = 1; q <= realSteps; q += 1 ) {

						// The ratio between the rounded value and the actual size might be ~1% off.
						// Correct the percentage offset by the number of points
						// per subrange. density = 1 will result in 100 points on the
						// full range, 2 for 50, 4 for 25, etc.
						pctPos = prevPct + ( q * stepsize );
						indexes[pctPos.toFixed(5)] = ['x', 0];
					}

					// Determine the point type.
					type = (group.indexOf(i) > -1) ? 1 : ( mode === 'steps' ? 2 : 0 );

					// Enforce the 'ignoreFirst' option by overwriting the type for 0.
					if ( !index && ignoreFirst ) {
						type = 0;
					}

					if ( !(i === high && ignoreLast)) {
						// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
						indexes[newPct.toFixed(5)] = [i, type];
					}

					// Update the percentage count.
					prevPct = newPct;
				}
			});

			// Reset the spectrum.
			scope_Spectrum.direction = originalSpectrumDirection;

			return indexes;
		}

		function addMarking ( spread, filterFunc, formatter ) {

			var element = document.createElement('div'),
				out = '',
				valueSizeClasses = [
					options.cssClasses.valueNormal,
					options.cssClasses.valueLarge,
					options.cssClasses.valueSub
				],
				markerSizeClasses = [
					options.cssClasses.markerNormal,
					options.cssClasses.markerLarge,
					options.cssClasses.markerSub
				],
				valueOrientationClasses = [
					options.cssClasses.valueHorizontal,
					options.cssClasses.valueVertical
				],
				markerOrientationClasses = [
					options.cssClasses.markerHorizontal,
					options.cssClasses.markerVertical
				];

			addClass(element, options.cssClasses.pips);
			addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

			function getClasses( type, source ){
				var a = source === options.cssClasses.value,
					orientationClasses = a ? valueOrientationClasses : markerOrientationClasses,
					sizeClasses = a ? valueSizeClasses : markerSizeClasses;

				return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
			}

			function getTags( offset, source, values ) {
				return 'class="' + getClasses(values[1], source) + '" style="' + options.style + ': ' + offset + '%"';
			}

			function addSpread ( offset, values ){

				if ( scope_Spectrum.direction ) {
					offset = 100 - offset;
				}

				// Apply the filter function, if it is set.
				values[1] = (values[1] && filterFunc) ? filterFunc(values[0], values[1]) : values[1];

				// Add a marker for every point
				out += '<div ' + getTags(offset, options.cssClasses.marker, values) + '></div>';

				// Values are only appended for points marked '1' or '2'.
				if ( values[1] ) {
					out += '<div ' + getTags(offset, options.cssClasses.value, values) + '>' + formatter.to(values[0]) + '</div>';
				}
			}

			// Append all points.
			Object.keys(spread).forEach(function(a){
				addSpread(a, spread[a]);
			});

			element.innerHTML = out;

			return element;
		}

		function pips ( grid ) {

		var mode = grid.mode,
			density = grid.density || 1,
			filter = grid.filter || false,
			values = grid.values || false,
			stepped = grid.stepped || false,
			group = getGroup( mode, values, stepped ),
			spread = generateSpread( density, mode, group ),
			format = grid.format || {
				to: Math.round
			};

			return scope_Target.appendChild(addMarking(
				spread,
				filter,
				format
			));
		}


		// Shorthand for base dimensions.
		function baseSize ( ) {
			var rect = scope_Base.getBoundingClientRect(), alt = 'offset' + ['Width', 'Height'][options.ort];
			return options.ort === 0 ? (rect.width||scope_Base[alt]) : (rect.height||scope_Base[alt]);
		}

		// External event handling
		function fireEvent ( event, handleNumber, tap ) {

			var i;

			// During initialization, do not fire events.
			for ( i = 0; i < options.handles; i++ ) {
				if ( scope_Locations[i] === -1 ) {
					return;
				}
			}

			if ( handleNumber !== undefined && options.handles !== 1 ) {
				handleNumber = Math.abs(handleNumber - options.dir);
			}

			Object.keys(scope_Events).forEach(function( targetEvent ) {

				var eventType = targetEvent.split('.')[0];

				if ( event === eventType ) {
					scope_Events[targetEvent].forEach(function( callback ) {

						callback.call(
							// Use the slider public API as the scope ('this')
							scope_Self,
							// Return values as array, so arg_1[arg_2] is always valid.
							asArray(valueGet()),
							// Handle index, 0 or 1
							handleNumber,
							// Unformatted slider values
							asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))),
							// Event is fired by tap, true or false
							tap || false,
							// Left offset of the handle, in relation to the slider
							scope_Locations
						);
					});
				}
			});
		}

		// Returns the input array, respecting the slider direction configuration.
		function inSliderOrder ( values ) {

			// If only one handle is used, return a single value.
			if ( values.length === 1 ){
				return values[0];
			}

			if ( options.dir ) {
				return values.reverse();
			}

			return values;
		}


		// Handler for attaching events trough a proxy.
		function attach ( events, element, callback, data ) {

			// This function can be used to 'filter' events to the slider.
			// element is a node, not a nodeList

			var method = function ( e ){

				if ( scope_Target.hasAttribute('disabled') ) {
					return false;
				}

				// Stop if an active 'tap' transition is taking place.
				if ( hasClass(scope_Target, options.cssClasses.tap) ) {
					return false;
				}

				e = fixEvent(e, data.pageOffset);

				// Ignore right or middle clicks on start #454
				if ( events === actions.start && e.buttons !== undefined && e.buttons > 1 ) {
					return false;
				}

				// Ignore right or middle clicks on start #454
				if ( data.hover && e.buttons ) {
					return false;
				}

				e.calcPoint = e.points[ options.ort ];

				// Call the event handler with the event [ and additional data ].
				callback ( e, data );

			}, methods = [];

			// Bind a closure on the target for every event type.
			events.split(' ').forEach(function( eventName ){
				element.addEventListener(eventName, method, false);
				methods.push([eventName, method]);
			});

			return methods;
		}

		// Handle movement on document for handle and range drag.
		function move ( event, data ) {

			// Fix #498
			// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
			// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
			// IE9 has .buttons and .which zero on mousemove.
			// Firefox breaks the spec MDN defines.
			if ( navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0 ) {
				return end(event, data);
			}

			var handles = data.handles || scope_Handles, positions, state = false,
				proposal = ((event.calcPoint - data.start) * 100) / data.baseSize,
				handleNumber = handles[0] === scope_Handles[0] ? 0 : 1, i;

			// Calculate relative positions for the handles.
			positions = getPositions( proposal, data.positions, handles.length > 1);

			state = setHandle ( handles[0], positions[handleNumber], handles.length === 1 );

			if ( handles.length > 1 ) {

				state = setHandle ( handles[1], positions[handleNumber?0:1], false ) || state;

				if ( state ) {
					// fire for both handles
					for ( i = 0; i < data.handles.length; i++ ) {
						fireEvent('slide', i);
					}
				}
			} else if ( state ) {
				// Fire for a single handle
				fireEvent('slide', handleNumber);
			}
		}

		// Unbind move events on document, call callbacks.
		function end ( event, data ) {

			// The handle is no longer active, so remove the class.
			var active = scope_Base.querySelector( '.' + options.cssClasses.active ),
				handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;

			if ( active !== null ) {
				removeClass(active, options.cssClasses.active);
			}

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				document.body.style.cursor = '';
				document.body.removeEventListener('selectstart', document.body.noUiListener);
			}

			var d = document.documentElement;

			// Unbind the move and end events, which are added on 'start'.
			d.noUiListeners.forEach(function( c ) {
				d.removeEventListener(c[0], c[1]);
			});

			// Remove dragging class.
			removeClass(scope_Target, options.cssClasses.drag);

			// Fire the change and set events.
			fireEvent('set', handleNumber);
			fireEvent('change', handleNumber);

			// If this is a standard handle movement, fire the end event.
			if ( data.handleNumber !== undefined ) {
				fireEvent('end', data.handleNumber);
			}
		}

		// Fire 'end' when a mouse or pen leaves the document.
		function documentLeave ( event, data ) {
			if ( event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null ){
				end ( event, data );
			}
		}

		// Bind move events on document.
		function start ( event, data ) {

			var d = document.documentElement;

			// Mark the handle as 'active' so it can be styled.
			if ( data.handles.length === 1 ) {
				// Support 'disabled' handles
				if ( data.handles[0].hasAttribute('disabled') ) {
					return false;
				}

				addClass(data.handles[0].children[0], options.cssClasses.active);
			}

			// Fix #551, where a handle gets selected instead of dragged.
			event.preventDefault();

			// A drag should never propagate up to the 'tap' event.
			event.stopPropagation();

			// Attach the move and end events.
			var moveEvent = attach(actions.move, d, move, {
				start: event.calcPoint,
				baseSize: baseSize(),
				pageOffset: event.pageOffset,
				handles: data.handles,
				handleNumber: data.handleNumber,
				buttonsProperty: event.buttons,
				positions: [
					scope_Locations[0],
					scope_Locations[scope_Handles.length - 1]
				]
			}), endEvent = attach(actions.end, d, end, {
				handles: data.handles,
				handleNumber: data.handleNumber
			});

			var outEvent = attach("mouseout", d, documentLeave, {
				handles: data.handles,
				handleNumber: data.handleNumber
			});

			d.noUiListeners = moveEvent.concat(endEvent, outEvent);

			// Text selection isn't an issue on touch devices,
			// so adding cursor styles can be skipped.
			if ( event.cursor ) {

				// Prevent the 'I' cursor and extend the range-drag cursor.
				document.body.style.cursor = getComputedStyle(event.target).cursor;

				// Mark the target with a dragging state.
				if ( scope_Handles.length > 1 ) {
					addClass(scope_Target, options.cssClasses.drag);
				}

				var f = function(){
					return false;
				};

				document.body.noUiListener = f;

				// Prevent text selection when dragging the handles.
				document.body.addEventListener('selectstart', f, false);
			}

			if ( data.handleNumber !== undefined ) {
				fireEvent('start', data.handleNumber);
			}
		}

		// Move closest handle to tapped location.
		function tap ( event ) {

			var location = event.calcPoint, total = 0, handleNumber, to;

			// The tap event shouldn't propagate up and cause 'edge' to run.
			event.stopPropagation();

			// Add up the handle offsets.
			scope_Handles.forEach(function(a){
				total += offset(a)[ options.style ];
			});

			// Find the handle closest to the tapped position.
			handleNumber = ( location < total/2 || scope_Handles.length === 1 ) ? 0 : 1;

			// Check if handler is not disablet if yes set number to the next handler
			if (scope_Handles[handleNumber].hasAttribute('disabled')) {
				handleNumber = handleNumber ? 0 : 1;
			}

			location -= offset(scope_Base)[ options.style ];

			// Calculate the new position.
			to = ( location * 100 ) / baseSize();

			if ( !options.events.snap ) {
				// Flag the slider as it is now in a transitional state.
				// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
				addClassFor( scope_Target, options.cssClasses.tap, options.animationDuration );
			}

			// Support 'disabled' handles
			if ( scope_Handles[handleNumber].hasAttribute('disabled') ) {
				return false;
			}

			// Find the closest handle and calculate the tapped point.
			// The set handle to the new position.
			setHandle( scope_Handles[handleNumber], to );

			fireEvent('slide', handleNumber, true);
			fireEvent('set', handleNumber, true);
			fireEvent('change', handleNumber, true);

			if ( options.events.snap ) {
				start(event, { handles: [scope_Handles[handleNumber]] });
			}
		}

		// Fires a 'hover' event for a hovered mouse/pen position.
		function hover ( event ) {

			var location = event.calcPoint - offset(scope_Base)[ options.style ],
				to = scope_Spectrum.getStep(( location * 100 ) / baseSize()),
				value = scope_Spectrum.fromStepping( to );

			Object.keys(scope_Events).forEach(function( targetEvent ) {
				if ( 'hover' === targetEvent.split('.')[0] ) {
					scope_Events[targetEvent].forEach(function( callback ) {
						callback.call( scope_Self, value );
					});
				}
			});
		}

		// Attach events to several slider parts.
		function events ( behaviour ) {

			// Attach the standard drag event to the handles.
			if ( !behaviour.fixed ) {

				scope_Handles.forEach(function( handle, index ){

					// These events are only bound to the visual handle
					// element, not the 'real' origin element.
					attach ( actions.start, handle.children[0], start, {
						handles: [ handle ],
						handleNumber: index
					});
				});
			}

			// Attach the tap event to the slider base.
			if ( behaviour.tap ) {

				attach ( actions.start, scope_Base, tap, {
					handles: scope_Handles
				});
			}

			// Fire hover events
			if ( behaviour.hover ) {
				attach ( actions.move, scope_Base, hover, { hover: true } );
			}

			// Make the range draggable.
			if ( behaviour.drag ){

				var drag = [scope_Base.querySelector( '.' + options.cssClasses.connect )];
				addClass(drag[0], options.cssClasses.draggable);

				// When the range is fixed, the entire range can
				// be dragged by the handles. The handle in the first
				// origin will propagate the start event upward,
				// but it needs to be bound manually on the other.
				if ( behaviour.fixed ) {
					drag.push(scope_Handles[(drag[0] === scope_Handles[0] ? 1 : 0)].children[0]);
				}

				drag.forEach(function( element ) {
					attach ( actions.start, element, start, {
						handles: scope_Handles
					});
				});
			}
		}


		// Test suggested values and apply margin, step.
		function setHandle ( handle, to, noLimitOption ) {

			var trigger = handle !== scope_Handles[0] ? 1 : 0,
				lowerMargin = scope_Locations[0] + options.margin,
				upperMargin = scope_Locations[1] - options.margin,
				lowerLimit = scope_Locations[0] + options.limit,
				upperLimit = scope_Locations[1] - options.limit;

			// For sliders with multiple handles,
			// limit movement to the other handle.
			// Apply the margin option by adding it to the handle positions.
			if ( scope_Handles.length > 1 ) {
				to = trigger ? Math.max( to, lowerMargin ) : Math.min( to, upperMargin );
			}

			// The limit option has the opposite effect, limiting handles to a
			// maximum distance from another. Limit must be > 0, as otherwise
			// handles would be unmoveable. 'noLimitOption' is set to 'false'
			// for the .val() method, except for pass 4/4.
			if ( noLimitOption !== false && options.limit && scope_Handles.length > 1 ) {
				to = trigger ? Math.min ( to, lowerLimit ) : Math.max( to, upperLimit );
			}

			// Handle the step option.
			to = scope_Spectrum.getStep( to );

			// Limit percentage to the 0 - 100 range
			to = limit(to);

			// Return false if handle can't move
			if ( to === scope_Locations[trigger] ) {
				return false;
			}

			// Set the handle to the new position.
			// Use requestAnimationFrame for efficient painting.
			// No significant effect in Chrome, Edge sees dramatic
			// performace improvements.
			if ( window.requestAnimationFrame ) {
				window.requestAnimationFrame(function(){
					handle.style[options.style] = to + '%';
				});
			} else {
				handle.style[options.style] = to + '%';
			}

			// Force proper handle stacking
			if ( !handle.previousSibling ) {
				removeClass(handle, options.cssClasses.stacking);
				if ( to > 50 ) {
					addClass(handle, options.cssClasses.stacking);
				}
			}

			// Update locations.
			scope_Locations[trigger] = to;

			// Convert the value to the slider stepping/range.
			scope_Values[trigger] = scope_Spectrum.fromStepping( to );

			fireEvent('update', trigger);

			return true;
		}

		// Loop values from value method and apply them.
		function setValues ( count, values ) {

			var i, trigger, to;

			// With the limit option, we'll need another limiting pass.
			if ( options.limit ) {
				count += 1;
			}

			// If there are multiple handles to be set run the setting
			// mechanism twice for the first handle, to make sure it
			// can be bounced of the second one properly.
			for ( i = 0; i < count; i += 1 ) {

				trigger = i%2;

				// Get the current argument from the array.
				to = values[trigger];

				// Setting with null indicates an 'ignore'.
				// Inputting 'false' is invalid.
				if ( to !== null && to !== false ) {

					// If a formatted number was passed, attemt to decode it.
					if ( typeof to === 'number' ) {
						to = String(to);
					}

					to = options.format.from( to );

					// Request an update for all links if the value was invalid.
					// Do so too if setting the handle fails.
					if ( to === false || isNaN(to) || setHandle( scope_Handles[trigger], scope_Spectrum.toStepping( to ), i === (3 - options.dir) ) === false ) {
						fireEvent('update', trigger);
					}
				}
			}
		}

		// Set the slider value.
		function valueSet ( input, fireSetEvent ) {

			var count, values = asArray( input ), i;

			// Event fires by default
			fireSetEvent = (fireSetEvent === undefined ? true : !!fireSetEvent);

			// The RTL settings is implemented by reversing the front-end,
			// internal mechanisms are the same.
			if ( options.dir && options.handles > 1 ) {
				values.reverse();
			}

			// Animation is optional.
			// Make sure the initial values where set before using animated placement.
			if ( options.animate && scope_Locations[0] !== -1 ) {
				addClassFor( scope_Target, options.cssClasses.tap, options.animationDuration );
			}

			// Determine how often to set the handles.
			count = scope_Handles.length > 1 ? 3 : 1;

			if ( values.length === 1 ) {
				count = 1;
			}

			setValues ( count, values );

			// Fire the 'set' event for both handles.
			for ( i = 0; i < scope_Handles.length; i++ ) {

				// Fire the event only for handles that received a new value, as per #579
				if ( values[i] !== null && fireSetEvent ) {
					fireEvent('set', i);
				}
			}
		}

		// Get the slider value.
		function valueGet ( ) {

			var i, retour = [];

			// Get the value from all handles.
			for ( i = 0; i < options.handles; i += 1 ){
				retour[i] = options.format.to( scope_Values[i] );
			}

			return inSliderOrder( retour );
		}

		// Removes classes from the root and empties it.
		function destroy ( ) {

			for ( var key in options.cssClasses ) {
				if ( !options.cssClasses.hasOwnProperty(key) ) { continue; }
				removeClass(scope_Target, options.cssClasses[key]);
			}

			while (scope_Target.firstChild) {
				scope_Target.removeChild(scope_Target.firstChild);
			}

			delete scope_Target.noUiSlider;
		}

		// Get the current step size for the slider.
		function getCurrentStep ( ) {

			// Check all locations, map them to their stepping point.
			// Get the step point, then find it in the input list.
			var retour = scope_Locations.map(function( location, index ){

				var step = scope_Spectrum.getApplicableStep( location ),

					// As per #391, the comparison for the decrement step can have some rounding issues.
					// Round the value to the precision used in the step.
					stepDecimals = countDecimals(String(step[2])),

					// Get the current numeric value
					value = scope_Values[index],

					// To move the slider 'one step up', the current step value needs to be added.
					// Use null if we are at the maximum slider value.
					increment = location === 100 ? null : step[2],

					// Going 'one step down' might put the slider in a different sub-range, so we
					// need to switch between the current or the previous step.
					prev = Number((value - step[2]).toFixed(stepDecimals)),

					// If the value fits the step, return the current step value. Otherwise, use the
					// previous step. Return null if the slider is at its minimum value.
					decrement = location === 0 ? null : (prev >= step[1]) ? step[2] : (step[0] || false);

				return [decrement, increment];
			});

			// Return values in the proper order.
			return inSliderOrder( retour );
		}

		// Attach an event to this slider, possibly including a namespace
		function bindEvent ( namespacedEvent, callback ) {
			scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
			scope_Events[namespacedEvent].push(callback);

			// If the event bound is 'update,' fire it immediately for all handles.
			if ( namespacedEvent.split('.')[0] === 'update' ) {
				scope_Handles.forEach(function(a, index){
					fireEvent('update', index);
				});
			}
		}

		// Undo attachment of event
		function removeEvent ( namespacedEvent ) {

			var event = namespacedEvent && namespacedEvent.split('.')[0],
				namespace = event && namespacedEvent.substring(event.length);

			Object.keys(scope_Events).forEach(function( bind ){

				var tEvent = bind.split('.')[0],
					tNamespace = bind.substring(tEvent.length);

				if ( (!event || event === tEvent) && (!namespace || namespace === tNamespace) ) {
					delete scope_Events[bind];
				}
			});
		}

		// Updateable: margin, limit, step, range, animate, snap
		function updateOptions ( optionsToUpdate, fireSetEvent ) {

			// Spectrum is created using the range, snap, direction and step options.
			// 'snap' and 'step' can be updated, 'direction' cannot, due to event binding.
			// If 'snap' and 'step' are not passed, they should remain unchanged.
			var v = valueGet(), newOptions = testOptions({
				start: [0, 0],
				margin: optionsToUpdate.margin,
				limit: optionsToUpdate.limit,
				step: optionsToUpdate.step === undefined ? options.singleStep : optionsToUpdate.step,
				range: optionsToUpdate.range,
				animate: optionsToUpdate.animate,
				snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate.snap
			});

			['margin', 'limit', 'range', 'animate'].forEach(function(name){

				// Only change options that we're actually passed to update.
				if ( optionsToUpdate[name] !== undefined ) {
					options[name] = optionsToUpdate[name];
				}
			});

			// Save current spectrum direction as testOptions in testRange call
			// doesn't rely on current direction
			newOptions.spectrum.direction = scope_Spectrum.direction;
			scope_Spectrum = newOptions.spectrum;

			// Invalidate the current positioning so valueSet forces an update.
			scope_Locations = [-1, -1];
			valueSet(optionsToUpdate.start || v, fireSetEvent);
		}


		// Throw an error if the slider was already initialized.
		if ( scope_Target.noUiSlider ) {
			throw new Error('Slider was already initialized.');
		}

		// Create the base element, initialise HTML and set classes.
		// Add handles and links.
		scope_Base = addSlider( options.dir, options.ort, scope_Target );
		scope_Handles = addHandles( options.handles, options.dir, scope_Base );

		// Set the connect classes.
		addConnection ( options.connect, scope_Target, scope_Handles );

		if ( options.pips ) {
			pips(options.pips);
		}

		if ( options.tooltips ) {
			tooltips();
		}

		scope_Self = {
			destroy: destroy,
			steps: getCurrentStep,
			on: bindEvent,
			off: removeEvent,
			get: valueGet,
			set: valueSet,
			updateOptions: updateOptions,
			options: originalOptions, // Issue #600
			target: scope_Target, // Issue #597
			pips: pips // Issue #594
		};

		// Attach user events.
		events( options.events );

		return scope_Self;

	}


		// Run the standard initializer
		function initialize ( target, originalOptions ) {

			if ( !target.nodeName ) {
				throw new Error('noUiSlider.create requires a single element.');
			}

			// Test the options and create the slider environment;
			var options = testOptions( originalOptions, target ),
				slider = closure( target, options, originalOptions );

			// Use the public value method to set the start values.
			slider.set(options.start);

			target.noUiSlider = slider;
			return slider;
		}

		// Use an object instead of a function for future expansibility;
		return {
			create: initialize
		};

	}));

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ })
/******/ ])
});
;