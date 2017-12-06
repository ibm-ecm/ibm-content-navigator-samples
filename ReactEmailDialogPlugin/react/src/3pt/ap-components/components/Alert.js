'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('./Icon');

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