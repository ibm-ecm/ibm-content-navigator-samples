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

var _Icon = require('./Icon');

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