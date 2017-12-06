'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Loader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loader(props) {
  var dark = props.dark,
      small = props.small,
      value = props.value;

  var determinate = value !== undefined;

  var loaderClass = (0, _classnames2.default)('loader', {
    'loader--dark': dark,
    determinate: determinate
  });

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)({
        small: small,
        large: !small,
        'ibm-spinner-determinate': determinate
      }),
      'data-percent': determinate && value
    },
    _react2.default.createElement(
      'svg',
      { className: loaderClass, viewBox: '25 25 50 50' },
      _react2.default.createElement('circle', { className: 'loader__path', cx: '50', cy: '50', r: '20' })
    )
  );
}

Loader.propTypes = {
  small: _propTypes2.default.bool,
  dark: _propTypes2.default.bool,
  value: _propTypes2.default.number
};