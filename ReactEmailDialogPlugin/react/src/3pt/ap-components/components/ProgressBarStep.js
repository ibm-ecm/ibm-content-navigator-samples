'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ProgressBarStep;

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

function ProgressBarStep(props) {
  var children = props.children,
      active = props.active,
      completed = props.completed,
      href = props.href,
      rest = _objectWithoutProperties(props, ['children', 'active', 'completed', 'href']);

  var innerComponent = [_react2.default.createElement(_Icon2.default, {
    key: Math.random(),
    className: 'progress-bar__icon',
    type: (0, _classnames2.default)({ active: active, completed: completed && !active, dot: !active && !completed })
  }), _react2.default.createElement(
    'p',
    { key: Math.random(), className: 'progress-bar__label' },
    children
  )];
  return _react2.default.createElement(
    'li',
    _extends({
      className: (0, _classnames2.default)('progress-bar__step', {
        'progress-bar__step--complete': completed,
        'progress-bar__step--withlink': href && (completed || active),
        'progress-bar__step--active': active
      })
    }, rest),
    href && completed && !active ? _react2.default.createElement(
      'a',
      { href: href, className: 'progress-bar__link' },
      innerComponent
    ) : innerComponent
  );
}

ProgressBarStep.propTypes = {
  children: _propTypes2.default.string.isRequired,
  href: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  completed: _propTypes2.default.bool
};