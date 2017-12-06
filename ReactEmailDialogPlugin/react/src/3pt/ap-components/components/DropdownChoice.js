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

var _isObject = require('core-js/library/fn/object/is-object');

var _isObject2 = _interopRequireDefault(_isObject);

var _classnames = require('classnames');

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