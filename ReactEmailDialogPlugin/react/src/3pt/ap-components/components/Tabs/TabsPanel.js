'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Panel;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  children: _propTypes2.default.node,
  isActive: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired
};

function Panel() {
  throw new Error('It is not allowed to use Tabs.Panel element outside of Tabs block');
}

Panel.propTypes = propTypes;