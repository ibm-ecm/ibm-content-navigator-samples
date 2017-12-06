'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NumberCloseButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  onReset: _propTypes2.default.func
};

function NumberCloseButton(props) {
  return _react2.default.createElement(
    'div',
    {
      className: 'number__close',
      onClick: props.onReset
    },
    _react2.default.createElement(
      'svg',
      {
        className: 'numpinput__close',
        x: '0px',
        y: '0px',
        width: '18.5px',
        height: '18px',
        viewBox: '0 0 18.5 18',
        style: { enableBackground: 'new 0 0 18.5 18' },
        xmlSpace: 'preserve'
      },
      _react2.default.createElement('rect', {
        className: 'numpinput__close__hover',
        width: '18.5',
        height: '18'
      })
    ),
    _react2.default.createElement(
      'svg',
      {
        className: 'numpinput__close',
        x: '0px',
        y: '0px',
        width: '18.5px',
        height: '18px',
        viewBox: '0 0 18.5 18',
        style: { enableBackground: 'new 0 0 18.5 18' },
        xmlSpace: 'preserve'
      },
      _react2.default.createElement('path', {
        className: 'numpinput__close__x',
        d: 'M10.7,9l4.6,4.6L13.9,15l-4.6-4.6L4.7,15l-1.4-1.4L7.8,9L3.2,4.4L4.7,3l4.6,4.6L13.9,3l1.4,1.4L10.7,9z' })
    )
  );
}

NumberCloseButton.propTypes = propTypes;