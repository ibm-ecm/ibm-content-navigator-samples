'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('Button Base Component Tests', function () {

    test('1. Should render Button component with default prop values', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { href: '' }));
        //console.log(button_wrapper.find('a').props());
        expect(button_wrapper.find('a').props().href).toBe('');
    });

    test('2. Should render Button component and verifies className', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, null));
        // console.log(button_wrapper.find('a').props());
        expect(button_wrapper.find('a').props().className).toBe('button');
    });

    test('3. Should render Button component and verifies className when semantic=true', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true }));
        //console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find('button').props().className).toBe('button');
    });

    test('4. Should render Button component with semantic=true, disabled=true', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, disabled: true }));
        //console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find('button').props().className).toBe('button button--disabled');
        expect(button_wrapper.find('button').props().disabled).toBe(true);
    });

    test('5. Should render Button component with semantic=true, hyperlink=true', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, hyperlink: true }));
        //console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find('button').props().className).toBe('button button--hyperlink');
    });

    test('6. Should render Button component with semantic=true, icon=plus', function () {
        var icon_type = 'plus';
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, icon: icon_type }));
        expect(button_wrapper.find(_Icon2.default).props().type).toBe('plus');
    });

    test('7. Should render Button component with semantic=true, icon=plus, diabled=true', function () {
        var icon_type = 'plus';
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, icon: icon_type, disabled: true }));
        //console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find(_Icon2.default).props().type).toBe('plus');
        expect(button_wrapper.find('button').props().className).toBe('button button--icon button--disabled');
    });

    test('8. Should render Button component with semantic=true, dark=true', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, dark: true }));
        //console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find('button').props().className).toBe('button button--dark');
    });

    test('9. Should render Button component with semantic=true, large=true', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, large: true }));
        // console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find('button').props().className).toBe('button button--large');
    });

    test('10. Should render Button component with semantic=true, back=true', function () {
        var button_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Button2.default, { semantic: true, back: true }));
        // console.log(button_wrapper.find('button').props());
        expect(button_wrapper.find('button').props().className).toBe('button button--hyperlink button--back');
    });
});