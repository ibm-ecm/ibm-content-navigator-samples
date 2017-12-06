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

var _ProgressBarStep = require('./ProgressBarStep');

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