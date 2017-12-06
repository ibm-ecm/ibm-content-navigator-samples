'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _sinon = require('sinon');

var _Alert = require('../Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Hyperlink = require('../Hyperlink');

var _Hyperlink2 = _interopRequireDefault(_Hyperlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('Alert Base Component Test', function () {

  test('1. Should render an Alert component with default props', function () {
    var expClassName = 'alert alert--success alert__fadeOut';
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, { id: 'alert1' }));
    //assert default value of component
    expect(alert_wrapper.props().type).toBe('success');
    //assert default values for rendered top level components
    //asset div element default props
    expect(alert_wrapper.find('div').props().type).toBe('success');
    expect(alert_wrapper.find('div').props().className.includes('alert')).toBe(true);
    expect(alert_wrapper.find('div').props().className.includes('alert--success')).toBe(true);
    expect(alert_wrapper.find('div').props().className.includes('alert__fadeOut')).toBe(true);
    //assert button element default props
    expect(alert_wrapper.find('button').props().className).toBe('alert__close');
    expect(alert_wrapper.find('button').props().onClick).toBeUndefined();
    expect(alert_wrapper.find('button').children().find(_Icon2.default).props().className).toBe('icon--close');
    expect(alert_wrapper.find('button').children().find(_Icon2.default).props().type).toBe('close');
    //assert icon element default props
    expect(alert_wrapper.find({ className: 'alert__icon' }).props().type).toBe('success');

    //assert default state value
    expect(alert_wrapper.state('closed')).toBeFalsy();
  });

  test('2. Should render an Alert component of type warning', function () {
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, { id: 'alert1', type: 'warning' }));

    expect(alert_wrapper.find('div').props().type).toBe('warning');
    expect(alert_wrapper.find({ className: 'alert__icon' }).props().type).toBe('warning');
    expect(alert_wrapper.find({ className: 'alert__icon', type: 'warning' }).length).toBe(1);
  });

  test('3. Should render an Alert component of type info', function () {
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, { id: 'alert1', type: 'info' }));

    expect(alert_wrapper.find('div').props().type).toBe('info');
    expect(alert_wrapper.find({ className: 'alert__icon' }).props().type).toBe('info');
    expect(alert_wrapper.find({ className: 'alert__icon', type: 'info' }).length).toBe(1);
  });

  test('4. Should render an Alert component of type error', function () {
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, { id: 'alert1', type: 'error' }));

    expect(alert_wrapper.find('div').props().type).toBe('error');
    expect(alert_wrapper.find({ className: 'alert__icon' }).props().type).toBe('error');
    expect(alert_wrapper.find({ className: 'alert__icon', type: 'error' }).length).toBe(1);
  });

  test('5a. Should render an Alert component isOpen=true with default state closed=false', function () {
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, { id: 'alert1', isOpen: true }));
    expect(alert_wrapper.find('div').props().className).not.toContain('alert__fadeOut');
  });

  test('5b. Should render an Alert component isOpen=false with default state closed=false', function () {
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Alert2.default, { id: 'alert1', isOpen: false }));
    expect(alert_wrapper.find('div').props().className).toContain('alert__fadeOut');
  });

  // test.only('5c. Renders Alert component isOpen=false with default state closed=false', () => {
  //   const alert_wrapper = mount(<Alert id="alert1" isOpen={false} />);
  //   expect(alert_wrapper.find('div').props().className).toContain('alert__fadeOut');
  //   console.log(alert_wrapper.ref('alert').getDOMNode().simulate());
  // })

  test('6. Should render an Alert component with children', function () {
    var alert_wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _Alert2.default,
      { id: 'alert1', isOpen: false, type: 'success' },
      _react2.default.createElement(_Hyperlink2.default, { 'class': 'hyperlink', href: 'https://www.ibm.com' })
    ));
    expect(alert_wrapper.find('Hyperlink').length).toBe(1);
  });

  test('7. Should not render an Alert component when state is closed', function () {
    var alert_wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Alert2.default, { id: 'alert1' }));
    //Set the state to closed
    alert_wrapper.setState({ closed: true }); //Note that using a shallow render and setting the state does not work here
    expect(alert_wrapper.find('div').props()).toEqual({});
  });

  test('8a. Should set the state to be open upon isOpen property change from false to true', function () {
    var alert_wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Alert2.default, { id: 'alert1' }));
    //Set state to closed
    alert_wrapper.setState({ closed: true });
    expect(alert_wrapper.state().closed).toBeTruthy();
    //Property change using setProps - Triggers ComponentWillReceiveProps
    alert_wrapper.setProps({ isOpen: true });
    expect(alert_wrapper.state().closed).toBeFalsy();
  });

  //triggers alternate conditional path ( LOOK INTO THIS TESTCASE MORE)
  test('8b. Should not trigger any state change upon isOpen property change from true to false', function () {
    var alert_wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Alert2.default, { id: 'alert1', isOpen: true }));
    expect(alert_wrapper.state().closed).toBeFalsy();
    //Property change using setProps - TriggersComponentWillReceiveProps
    alert_wrapper.setProps({ isOpen: false });
    //State change not triggered as it takes alternate path
    expect(alert_wrapper.state().closed).toBeFalsy();
  });

  test('9. Should trigger componentDidMount and onTransitionEnd upon mount', function () {
    //Spy on componentDidMount
    var componentDidMountSpy = (0, _sinon.spy)(_Alert2.default.prototype, 'componentDidMount');
    //Spy on onTransitionEnd event callback
    var onTransitionEndSpy = (0, _sinon.spy)(_Alert2.default.prototype, 'onTransitionEnd');
    //Stub out the getTransitionEndName behavior
    var getTransitionEndNameStub = (0, _sinon.stub)(_Alert2.default.prototype, 'getTransitionEndName');
    getTransitionEndNameStub.returns("onMyTransition");

    //mount should trigger the componentDidMount and register the event listener
    var alert_wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Alert2.default, { id: 'alert1', type: 'success', isOpen: false }));
    //verify that the componentDidMount was called
    expect(componentDidMountSpy.calledOnce).toBeTruthy();
    //verify that the event was registered by triggering the event and ensuring onTransitionEnd was called
    var myEvent = new CustomEvent('onMyTransition', null);
    alert_wrapper.instance().alert.dispatchEvent(myEvent);
    //restore the spy and stub behaviors
    componentDidMountSpy.restore();
    getTransitionEndNameStub.restore();
    onTransitionEndSpy.restore();
    //verify that the onTransitionEnd was called as a result of the event trigger
    expect(onTransitionEndSpy.calledOnce).toBeTruthy();
    expect(alert_wrapper.state().closed).toBeTruthy();
  });

  test('10. Should trigger onRequestClose upon clicking the close button', function () {
    // var myMock = jest.fn();
    var myMock = (0, _sinon.spy)();
    var alert_wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Alert2.default, { id: 'alert1', type: 'success', isOpen: true, onRequestClose: myMock.bind(undefined) }));
    alert_wrapper.find({ className: 'alert__close' }).simulate('click');
    expect(myMock.calledOnce).toBeTruthy();
    // expect(myMock.mock.calls.length).toBe(1);
  });

  test('11. Should trigger the componentWillUnMount upon unmount', function () {
    // const onTransitionEndSpy = spy(Alert.prototype, 'onTransitionEnd');
    var componentWillUnmountSpy = (0, _sinon.spy)(_Alert2.default.prototype, 'componentWillUnmount');
    var getTransitionEndNameStub = (0, _sinon.stub)(_Alert2.default.prototype, 'getTransitionEndName');
    getTransitionEndNameStub.returns("mytransition");

    var alert_wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Alert2.default, { id: 'alert1', type: 'success', isOpen: true }));
    alert_wrapper.unmount();
    componentWillUnmountSpy.restore();
    getTransitionEndNameStub.restore();
    expect(componentWillUnmountSpy.calledOnce).toBeTruthy();
  });

  // test('12. When a required property is not passed in a warning should be throws', () => {
  //   expect(()=>{shallow(
  //     <Alert />
  //   );}).toThrow();
  //
  // })

  // test.skip('10b. Renders Alert and triggers onRequestClose', () => {
  //   var parentComponent = React.createFactory(
  //     class myComponent {
  //       constructor(props) {
  //         this.state = {
  //           alert: true,
  //         };
  //       }
  //       render() {
  //         return(
  //         <div>
  //           <Alert
  //             id="alert1"
  //             type="success"
  //             isOpen={this.state.alert1}
  //             onRequestClose={() => this.setState({ alert: false })}
  //           >
  //             Successful messages appear here.
  //           </Alert>
  //         </div>
  //         )
  //       }
  //     }
  //   );
  //   const alert_wrapper = mount(parentComponent);
  //   console.log(alert_wrapper);
  //   // alert_wrapper.find({className: 'alert__close'}).simulate('click');
  //
  //
  //   // expect(myMock.mock.calls.length).toBe(1);
  // })

  // verify onRequestClose . - by closing the x button


  //   test.skip('7. Renders Alert component and tests componentDidMount', () => {
  //     var
  //     const alert_wrapper = mount(<Alert onClick={myMock.bind(this)} />);
  //
  // //    console.log(alert_wrapper.find('div').props().className);
  //     //alert_wrapper.find('button').simulate('click');
  //
  //
  //   })
});