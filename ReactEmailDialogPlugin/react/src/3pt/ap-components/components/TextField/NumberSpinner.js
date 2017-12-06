'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NumberSpinner;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  onIncrease: _propTypes2.default.func,
  onDecrease: _propTypes2.default.func
};

function NumberSpinner(props) {
  return _react2.default.createElement(
    'div',
    { className: 'number__spinnerdiv' },
    _react2.default.createElement(
      'svg',
      {
        className: 'numpinput__spinner__top',
        x: '0px',
        y: '0px',
        width: '18px',
        height: '16px',
        viewBox: '0 0 18 16',
        style: { enableBackground: 'new 0 0 18 16' },
        xmlSpace: 'preserve',
        onClick: props.onIncrease
      },
      _react2.default.createElement('rect', { className: 'numinputhovertop', width: '18', height: '16' }),
      _react2.default.createElement('polygon', {
        className: 'numinputtop',
        points: '12.5,11.2 9,7.6 5.5,11.2 4.1,9.8 9,4.8 13.9,9.8'
      })
    ),
    _react2.default.createElement(
      'svg',
      {
        className: 'numpinput__spinner__bottom',
        x: '0px',
        y: '0px',
        width: '18px',
        height: '16px',
        viewBox: '0 0 18 16',
        style: { enableBackground: 'new 0 0 18 16' },
        xmlSpace: 'preserve',
        onClick: props.onDecrease
      },
      _react2.default.createElement('rect', { className: 'numinputhoverbottom', width: '18', height: '16' }),
      _react2.default.createElement('polygon', {
        className: 'numinputbottom',
        points: '9,11.2 4.1,6.2 5.5,4.8 9,8.4 12.5,4.8 13.9,6.2'
      })
    )
  );
}

NumberSpinner.propTypes = propTypes;