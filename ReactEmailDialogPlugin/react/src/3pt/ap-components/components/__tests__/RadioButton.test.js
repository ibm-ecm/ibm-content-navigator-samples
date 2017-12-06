'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _RadioButton = require('../RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

function printMap(map) {
  for (var item in map) {
    console.log('Item: ' + item);
  }
}

function printChildren(elems) {
  for (var i = 0; i < elems.length; i++) {
    var props = elems[i].props;
    console.log(props);
  }
}

describe('RadioButtonTests', function () {

  test('1. Should render an input element with expected default values', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { name: 'radio-button1', id: 'rb1' }));
    expect(radiobutton.find('input').prop('id')).toBeDefined();
    expect(radiobutton.find('input').prop('id')).not.toBe('');
    expect(radiobutton.find('input').prop('name')).toBeDefined();
    expect(radiobutton.find('input').prop('name')).not.toBe('');
    expect(radiobutton.find('input').prop('className')).toBe('radio--light');
    expect(radiobutton.find('input').prop('defaultChecked')).toBeFalsy();
    expect(radiobutton.find('input').prop('disabled')).toBeFalsy();
    expect(radiobutton.find('label').prop('htmlFor')).toBeDefined();
    expect(radiobutton.find('label').prop('htmlFor')).not.toBe('');
    expect(radiobutton.find('label').text()).toBe('');
  });

  test('2. Should render an input element with specified id and a label element with an attribute htmlFor of the specified id', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('id')).toBe('rb1');
    expect(radiobutton.find('label').prop('htmlFor')).toBe('rb1');
  });

  test('3. Should render an input element with defaultChecked true', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: true, disabled: false, value: 'RadioButton1' }));
    // console.log('radiobutton props:');
    // console.log(radiobutton.props());
    // console.log(radiobutton.props().children);
    // printChildren(radiobutton.props().children);
    // console.log('radiobutton state:');
    // printMap(radiobutton.state());
    expect(radiobutton.find('input').prop('defaultChecked')).toBeTruthy();
  });

  test('4. Should render an input element with defaultChecked false', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('defaultChecked')).toBeFalsy();
  });

  test('5. Should render an input element with disabled true', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: true, disabled: true, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('disabled')).toBeTruthy();
  });

  test('6. Should render an input element with disabled false', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('disabled')).toBeFalsy();
  });

  test('7. Should render an input element of type radio and label element of the specified value', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, value: 'RadioButton1' }));
    expect(radiobutton.find('input').length).toBe(1);
    expect(radiobutton.find('label').length).toBe(1);
    expect(radiobutton.find('label').text()).toBe('RadioButton1');
    expect(radiobutton.find('input').prop('type')).toBe('radio');
  });

  test('8. Should render an input element of class dark style', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, dark: true, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('className')).toBe('radio--dark');
  });

  test('9. Should render an input element of class light style', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, dark: false, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('className')).toBe('radio--light');
  });

  test('10. Should render a label element with the specified value', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, dark: false, value: 'RadioButton1' }));
    expect(radiobutton.find('label').text()).toBe('RadioButton1');
  });

  test('11. Should re-render RadioButton with selected true on PropChange', function () {
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, dark: false, value: 'RadioButton1' }));
    expect(radiobutton.find('input').prop('defaultChecked')).toBeFalsy();
    radiobutton.setProps({ selected: true });
    expect(radiobutton.find('input').prop('defaultChecked')).toBeTruthy();
  });

  // test.skip('12a. Should trigger handleChange on change event', () => {
  //   var handleChangeMock = jest.fn();
  //   var myMock = jest.fn();
  //   // RadioButton.prototype.handleChange = handleChangeMock; //not good. shouldnt use prototype
  //   const radiobutton = mount(
  //     <RadioButton id="rb1" name="rb1" selected={false} disabled={false} dark={true} value="RadioButton1" onCheckedChange={myMock.bind(this)}/>
  //   );
  //   radiobutton.instance().handleChange = handleChangeMock;
  //
  //   //Simulating radiobutton selection
  //   radiobutton.find('input').simulate('change');
  //   expect(handleChangeMock.mock.calls.length).toBe(1);
  //   //Simulating radiobutton selection again'
  //   radiobutton.find('input').simulate('change');
  //   expect(handleChangeMock.mock.calls.length).toBe(2);
  //   handleChangeMock.mockReset();
  // });

  test('12. Should trigger the callback passed to onCheckedChange on change event', function () {
    var myMock = jest.fn();
    var radiobutton = (0, _enzyme.shallow)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, dark: true, value: 'RadioButton1', onCheckedChange: myMock.bind(undefined) }));
    //Simulating radiobutton selection
    radiobutton.find('input').simulate('change');
    expect(myMock.mock.calls.length).toBe(1);
    //Simulating radiobutton selection again'
    radiobutton.find('input').simulate('change');
    expect(myMock.mock.calls.length).toBe(2);
  });

  test('13. Snapshot testing', function () {
    var myMock = jest.fn();
    var radiobutton = _reactTestRenderer2.default.create(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, value: 'RadioButton1', onCheckedChange: myMock.bind(undefined) }));
    var tree = radiobutton.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('14. static rendering', function () {
    var myMock = jest.fn();
    var radiobutton = (0, _enzyme.render)(_react2.default.createElement(_RadioButton2.default, { id: 'rb1', name: 'rb1', selected: false, disabled: false, value: 'RadioButton1', onCheckedChange: myMock.bind(undefined) }));
    expect(radiobutton.find('input[name="rb1"]').length).toBe(1);
  });

  // test.skip('15. full rendering', () => {
  //   console.log("Full Rendering")
  //   var myMock = jest.fn();
  //   const radiobutton = mount(
  //     <RadioButton id="rb1" name="rb1" selected={false} disabled={false} value="RadioButton1" onCheckedChange={myMock.bind(this)} />
  //   );
  //   console.log(radiobutton.find('input').getDOMNode().checked);
  //
  // });

  // test.skip('16. RadioButton changes after click', () => {
  //   console.log('Shallow rendering')
  //   var myMock = jest.fn();
  //   // myMock
  //   //   .mockReturnValueOnce(true)
  //   //   .mockReturnValueOnce(false);

  //   const radiobutton = shallow(
  //     <RadioButton id="rb1" name="rb1" selected={false} disabled={false} value="RadioButton1" onCheckedChange={myMock.bind(this)} />
  //     // <RadioButton id="rb1" name="rb1" selected={false} disabled={false} value="RadioButton1" />
  //   );
  //   // expect(radiobutton.find('input').length).toBe(1);
  //   // expect(radiobutton.find('label').length).toBe(1);
  //   // expect(radiobutton.find('label').text()).toBe('RadioButton1');
  //   // console.log(radiobutton.find('input').prop('defaultChecked'));
  //   console.log(radiobutton.find('input').html());
  //
  //   // console.log(radiobutton.state());
  //   // console.log(radiobutton.state('selected'));
  //   // console.log(radiobutton.state().selected);
  //   // console.log(radiobutton.find('input').getDOMNode().getAttribute('defaultChecked'));
  //   // console.log(radiobutton.getNode());
  //   expect(radiobutton.state().selected).toBeFalsy();
  //   // expect(radiobutton.state('selected')).toBe("false");
  //   expect(radiobutton.find('input').prop('defaultChecked')).toBeFalsy();
  //   expect(radiobutton.find('input').prop('disabled')).toBeFalsy();
  //   expect(radiobutton.find('label').text()).toBe('RadioButton1');
  //   // console.log(myMock.mock);
  //   console.log('Simulating radiobutton selection');
  //   radiobutton.find('input').simulate('change');
  //   expect(myMock.mock.calls.length).toBe(1);
  //   console.log('Simulating radiobutton selection again');
  //   radiobutton.find('input').simulate('change');
  //   expect(myMock.mock.calls.length).toBe(2);
  //   // console.log(radiobutton.state('selected'));
  //   // expect(radiobutton.state('selected')).toBe("true");
  //
  // });


  // test.skip('actual rendering', () => {
  //   console.log('Actual Rendering')
  //   var myMock = jest.fn();
  //   myMock
  //     .mockReturnValueOnce(true)
  //     .mockReturnValueOnce(false);
  //   const div = document.createElement('div');
  //   const radiobutton = ReactDOM.render(
  //     <RadioButton id="rb1" name="rb1" selected={false} disabled={false} value="RadioButton1" onCheckedChange={myMock.bind(this)} />,
  //     div
  //   );
  //   // console.log(radiobutton.find('input').getDOMNode().checked);
  //   var inputElem = ReactTestUtils.scryRenderedDOMComponentsWithTag(radiobutton, 'input');
  //   console.log(inputElem);
  // });

});