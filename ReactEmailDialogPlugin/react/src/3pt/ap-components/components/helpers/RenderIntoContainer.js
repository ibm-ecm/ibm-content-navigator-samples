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

var _reactDom = require('react-dom');

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