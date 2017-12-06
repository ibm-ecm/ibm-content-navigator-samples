'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Card;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Card(props) {
  return _react2.default.createElement(
    'div',
    _extends({}, props, { className: 'card ' + props.className }),
    _react2.default.createElement(
      'div',
      { className: 'card__inner' },
      props.children
    )
  );
}

Card.defaultProps = {
  className: ''
};

Card.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};