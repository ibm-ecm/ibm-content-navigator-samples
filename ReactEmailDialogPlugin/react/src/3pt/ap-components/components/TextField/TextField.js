'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ibmColors = require('ibm-design-colors/ibm-colors.json');

var _ibmColors2 = _interopRequireDefault(_ibmColors);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _NumberSpinner = require('./NumberSpinner');

var _NumberSpinner2 = _interopRequireDefault(_NumberSpinner);

var _NumberCloseButton = require('./NumberCloseButton');

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