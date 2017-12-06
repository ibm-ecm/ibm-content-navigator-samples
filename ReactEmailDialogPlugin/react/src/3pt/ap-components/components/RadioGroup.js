'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RadioButton = require('./RadioButton');

var _RadioButton2 = _interopRequireDefault(_RadioButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = function (_React$Component) {
  _inherits(RadioGroup, _React$Component);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
  }

  _createClass(RadioGroup, [{
    key: 'handleCheckedChange',
    value: function handleCheckedChange(event, check) {
      if (this.props.onChange) this.props.onChange(event, check);
    }
  }, {
    key: 'renderRadioButton',
    value: function renderRadioButton(choice) {
      var _props = this.props,
          dark = _props.dark,
          name = _props.name,
          selected = _props.selected,
          checked = _props.checked;
      var value = choice.value,
          id = choice.id;

      return _react2.default.createElement(_RadioButton2.default, _extends({
        key: id,
        dark: dark,
        selected: selected === value,
        name: name,
        checked: checked && checked(choice),
        onCheckedChange: this.handleCheckedChange.bind(this)
      }, choice));
    }
  }, {
    key: 'prepareChoices',
    value: function prepareChoices(choices, name) {
      return choices === undefined ? [] : choices.map(function (el, i) {
        var defaultID = name ? name + i : i.toString();
        if (Array.isArray(el)) {
          return {
            label: el[0],
            value: el[0],
            id: defaultID,
            disabled: el[1] === 'disabled'
          };
        } else if (el.label !== undefined) {
          return _extends({
            id: defaultID
          }, el);
        }
        return {
          label: el,
          value: el,
          id: defaultID,
          disabled: false
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          choices = _props2.choices,
          name = _props2.name;

      var fixedChoices = this.prepareChoices(choices, name);
      return _react2.default.createElement(
        'div',
        null,
        fixedChoices.map(this.renderRadioButton.bind(this))
      );
    }
  }]);

  return RadioGroup;
}(_react2.default.Component);

RadioGroup.propTypes = {
  name: _propTypes2.default.string.isRequired,
  choices: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func,
  selected: _propTypes2.default.string,
  dark: _propTypes2.default.bool,
  checked: _propTypes2.default.func
};
exports.default = RadioGroup;