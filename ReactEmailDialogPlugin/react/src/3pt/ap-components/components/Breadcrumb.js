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