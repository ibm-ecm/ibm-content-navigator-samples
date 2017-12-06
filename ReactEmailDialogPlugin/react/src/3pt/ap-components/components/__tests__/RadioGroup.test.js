'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _sinon = require('sinon');

var _RadioGroup = require('../RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _RadioButton = require('../RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint "no-undef": 0 */
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

describe('RadioGroupTests', function () {

  test('1. Should render a RadioGroup with 4 choices with Default value for other properties', function () {
    var radiogroup = (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'Radio-Group', choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));
    //Verify that 4 radio buttons were created one for each choice item
    expect(radiogroup.find(_RadioButton2.default).length).toBe(4);
    //Verify that each one of the radio buttons have the default name set to the passed in name
    var radiobuttons = radiogroup.find(_RadioButton2.default).getElements();
    expect(radiobuttons.length).toBe(4);
    for (var i = 0; i < radiobuttons.length; i++) {
      expect(radiobuttons[i].props.name).toBe('Radio-Group');
      expect(radiobuttons[i].props.selected).toBeFalsy();
      expect(radiobuttons[i].props.dark).toBeFalsy();
    }
  });

  test('2. Should render a RadioGroup with 4 RadioButtons with the specified name', function () {
    var radiogroup = (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Pineapple', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));
    //Verify that 4 radio buttons were created one for each choice item
    expect(radiogroup.find(_RadioButton2.default).length).toBe(4);
    //Verify that each one of the radio buttons have the name set to the passed in name
    var radiobuttons = radiogroup.find(_RadioButton2.default).getElements();
    expect(radiobuttons.length).toBe(4);
    for (var i = 0; i < radiobuttons.length; i++) {
      expect(radiobuttons[i].props.name).toBe('fruit');
    }
  });

  test('3. Should render a RadioGroup with all disabled radiobuttons', function () {
    var radiogroup = (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Orange', dark: true, choices: [["Apple", "disabled"], ["Banana", "disabled"], ["Orange", "disabled"]] }));
    var radiobuttons = radiogroup.find(_RadioButton2.default).getElements();
    expect(radiobuttons.length).toBe(3);
    for (var i = 0; i < radiobuttons.length; i++) {
      expect(radiobuttons[i].props.disabled).toBeTruthy();
    }
  });

  //this is a bug in component code that needs to be fixed
  test('4. Should render a RadioGroup with no choices - Ensure no error is thrown', function () {
    expect(function () {
      (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', dark: true, choices: [] }));
    }).not.toThrowError();
  });

  test('5. Should render a RadioGroup with the specified radio button selected', function () {
    var radiogroup = (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Pineapple', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));
    //Verify that the appropriate radiobutton has the selected set to true
    expect(radiogroup.find({ id: 'fruit3' }).props().selected).toBeTruthy();
    expect(radiogroup.find({ id: 'fruit0' }).props().selected).toBeFalsy();
  });

  test('6. Should render a RadioGroup with none of the radiobuttons selected', function () {
    var radiogroup = (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));
    //Verify that none of the radiobuttons are selected by default
    var radiobuttons = radiogroup.find(_RadioButton2.default).getElements();
    expect(radiobuttons.length).toBe(4);
    for (var i = 0; i < radiobuttons.length; i++) {
      expect(radiobuttons[i].props.selected).toBeFalsy();
    }
  });

  test('7. Should renders a RadioGroup with all radiobuttons that are of dark style', function () {
    var radiogroup = (0, _enzyme.shallow)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Pineapple', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));
    // console.log(radiogroup.find(RadioButton));
    var radiobuttons = radiogroup.find(_RadioButton2.default).getElements();
    expect(radiobuttons.length).toBe(4);
    for (var i = 0; i < radiobuttons.length; i++) {
      // console.log(radiobuttons[i].props.dark);
      expect(radiobuttons[i].props.dark).toBeTruthy();
    }
  });

  // test('8. Should change the selection accordingly when state is changed to select a specific item', () => {
  //   const radiogroup = shallow(
  //     <RadioGroup name="fruit" selected="Pineapple" dark={true} choices={["Apple", ["Banana", "disabled"], "Orange", "Pineapple"]} />
  //   );
  //   radiogroup.setState({selected: 'Orange'});
  //   expect(radiogroup.find({id: 'fruit2'}).props().selected).toBeTruthy();
  //   expect(radiogroup.find({id: 'fruit3'}).props().selected).toBeFalsy();
  // });

  test('8. Should handle the change without throwing any error when no onChange callback is passed in', function () {
    var radiogroup = (0, _enzyme.mount)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Apple', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));

    //Simulating radiobutton selection
    var radiobutton = radiogroup.find('input#fruit3');
    radiobutton.simulate('change');
    //If it reaches here it means, the onChange function has been correctly handled by not calling it
  });

  test('9a. Should trigger handleCheckedChange upon a change event', function () {
    var handledCheckedChangeSpy = (0, _sinon.spy)(_RadioGroup2.default.prototype, 'handleCheckedChange');
    // var myMock = jest.fn();
    // RadioGroup.prototype.handleCheckedChange = myMock;
    var radiogroup = (0, _enzyme.mount)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Apple', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"] }));

    //Simulating radiobutton selection
    var radiobutton = radiogroup.find('input#fruit3');
    radiobutton.simulate('change');
    //verify that the callback method specified in onChange was called
    // expect(handledCheckedChangeSpy.mock.calls.length).toBe(1);
    expect(handledCheckedChangeSpy.calledOnce).toBeTruthy();

    // printMap(radiobutton.props());
    //Simulating radiobutton selection again'
    radiobutton = radiogroup.find('input#fruit2');
    radiobutton.simulate('change');

    expect(handledCheckedChangeSpy.calledTwice).toBeTruthy();
  });

  test('9b. Should trigger the onChange callback upon change event', function () {
    // var myMock = jest.fn();
    var myMock = (0, _sinon.spy)();
    var radiogroup = (0, _enzyme.mount)(_react2.default.createElement(_RadioGroup2.default, { name: 'fruit', selected: 'Apple', dark: true, choices: ["Apple", ["Banana", "disabled"], "Orange", "Pineapple"], onChange: myMock.bind(undefined) }));

    //Simulating radiobutton selection
    var radiobutton = radiogroup.find('input#fruit3');
    radiobutton.simulate('change');
    //verify that the callback method specified in onChange was called
    // expect(myMock.mock.calls.length).toBe(1);
    expect(myMock.calledOnce).toBeTruthy();

    //Simulating radiobutton selection again'
    radiobutton = radiogroup.find('input#fruit2');
    radiobutton.simulate('change');
    //verify that the callback method specified in onChange was called again
    // expect(myMock.mock.calls.length).toBe(2);
    expect(myMock.calledTwice).toBeTruthy();
  });

  // test('9c. Should trigger state change upon a change event', () => {
  //   // var myMock = jest.fn();
  //   var myMock = spy();
  //   const radiogroup = mount(
  //     <RadioGroup name="fruit" selected="Apple" dark={true} choices={["Apple", ["Banana", "disabled"], "Orange", "Pineapple"]} onChange={myMock.bind(this)}/>
  //   );
  //
  //   //Simulating radiobutton selection
  //   var radiobutton = radiogroup.find({id: 'fruit3'});
  //   radiobutton.simulate('change');
  //   //verify that the correct radio button is checked in the Virtual DOM tree
  //   expect(radiogroup.find({id: 'fruit3'}).html().defaultChecked).toBeTruthy();
  //   expect(radiogroup.find({id: 'fruit0'}).props().defaultChecked).toBeFalsy();
  //   //verify that the correct radio button is checked in the actual rendered DOM
  //   expect(radiogroup.find({id: 'fruit3'}).render().find('#fruit3').attr('checked')).toBeDefined();
  //   expect(radiogroup.find({id: 'fruit0'}).render().find('#fruit0').attr('checked')).not.toBeDefined();
  //   expect(radiogroup.find({id: 'fruit3'}).html()).toMatch(/checked/);
  //   expect(radiogroup.find({id: 'fruit0'}).html()).not.toMatch(/checked/);
  //   //verify that the callback method specified in onChange was called
  //   // expect(myMock.mock.calls.length).toBe(1);
  //   expect(myMock.calledOnce).toBeTruthy();
  //
  //   // printMap(radiobutton.props());
  //   //Simulating radiobutton selection again'
  //   radiobutton = radiogroup.find({id: 'fruit2'});
  //   radiobutton.simulate('change');
  //   expect(radiogroup.find({id: 'fruit1'}).html()).not.toMatch(/checked/);
  //   expect(radiogroup.find({id: 'fruit2'}).html()).toMatch(/checked/);
  //   expect(radiogroup.find({id: 'fruit1'}).props().defaultChecked).toBeFalsy;
  //   expect(radiogroup.find({id: 'fruit2'}).props().defaultChecked).toBeTruthy();
  //   // expect(myMock.mock.calls.length).toBe(2);
  //   expect(myMock.calledTwice).toBeTruthy();
  // });

  // test('10a. Snapshot testing - Full Tree', () => {
  //   // var myMock = jest.fn();
  //   var myMock = spy();
  //   const radiogroup = renderer.create(
  //     <RadioGroup name="fruit" selected="Apple" dark={true} choices={["Apple", ["Banana", "disabled"], "Orange", "Pineapple"]} onChange={myMock.bind(this)}/>
  //   );
  //   let tree = radiogroup.toJSON();
  //   // console.log(tree.children);
  //   expect(tree).toMatchSnapshot();
  //
  //   //Call onChange on the Orange radiobutton directly to simulate selection
  //   tree.children[2].children[0].props.onChange();
  //   //re-render and get snapshot
  //   tree = radiogroup.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test('10b. Snapshot testing with shallow render', () => {
  //   // var myMock = jest.fn();
  //   var myMock = spy();
  //   const radiogroup = shallow(
  //     <RadioGroup name="fruit" selected="Apple" dark={true} choices={["Apple", ["Banana", "disabled"], "Orange", "Pineapple"]} onChange={myMock.bind(this)}/>
  //   );
  //   let tree = radiogroup;
  //   // console.log(tree.children());
  //   expect(tree).toMatchSnapshot();
  //
  //   // console.log(radiogroup.children());
  //
  //   //Call onChange on the Orange radiobutton directly to simulate selection
  //   // tree.children[2].children[0].props.onChange();
  //   //re-render and get snapshot
  //   // tree = radiogroup.toJSON();
  //   // expect(tree).toMatchSnapshot();
  // });

  // test('11. Static rendering', () => {
  //   // var myMock = jest.fn();
  //   var myMock = spy();
  //   const radiogroup = render(
  //     <RadioGroup name="fruit" selected="Apple" dark={true} choices={["Apple", ["Banana", "disabled"], "Orange", "Pineapple"]} onChange={myMock.bind(this)}/>
  //   );
  //   expect(radiogroup.find('input[name="fruit"]').length).toBe(4);
  // });
});