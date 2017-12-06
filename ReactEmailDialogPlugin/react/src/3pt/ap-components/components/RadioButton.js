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