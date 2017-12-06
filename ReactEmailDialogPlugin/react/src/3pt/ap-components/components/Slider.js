'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nouislider = require('nouislider/distribute/nouislider');

var _nouislider2 = _interopRequireDefault(_nouislider);

var _classnames = require('classnames');

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