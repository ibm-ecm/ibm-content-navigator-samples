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