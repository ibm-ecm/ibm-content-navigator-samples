'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _Hyperlink = require('../Hyperlink');

var _Hyperlink2 = _interopRequireDefault(_Hyperlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('Hyperlink Base Component Tests', function () {

  test('1. Should render Hyperlink component with default prop values (shallow)', function () {
    var hyperlink_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Hyperlink2.default, null));

    // console.log(hyperlink_wrapper.find('a').props());
    expect(hyperlink_wrapper.find('a').length).toBe(1);
    expect(hyperlink_wrapper.find('a').text()).toBe('Button');
    expect(hyperlink_wrapper.find('a').props().className).toBe('hyperlink');
    expect(hyperlink_wrapper.find('a').props().href).toBe('');
    // expect(hyperlink_wrapper.find('a').props().target).toBe('');  // default target prop is not being used
  });

  test('2. Should render Hyperlink component with user specified prop values (shallow)', function () {
    var href_val = 'https://ibm.com';
    var text_val = 'Hyperlink';

    var hyperlink_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Hyperlink2.default, { href: href_val, text: text_val }));

    // console.log(wrapper.find('a').props());
    expect(hyperlink_wrapper.find('a').text()).toBe('Hyperlink');
    expect(hyperlink_wrapper.find('a').props().className).toBe('hyperlink');
    expect(hyperlink_wrapper.find('a').props().href).toBe('https://ibm.com');
  });
});