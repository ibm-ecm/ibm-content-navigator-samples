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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _find = require('core-js/library/fn/array/find');

var _find2 = _interopRequireDefault(_find);

var _findIndex = require('core-js/library/fn/array/find-index');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _isObject = require('core-js/library/fn/object/is-object');

var _isObject2 = _interopRequireDefault(_isObject);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _DropdownChoice = require('./DropdownChoice');

var _DropdownChoice2 = _interopRequireDefault(_DropdownChoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window */


var instances = [];

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.handleKeyPress = function (event) {
      // Filter enter and space to avoid selecting
      if (event.keyCode === 27) {
        _this.close();
      } else if (event.keyCode === 32 || event.keyCode === 13) {
        _this.handleCheckedChange(event, {
          value: _this.state.value
        });
      } else if (event.keyCode === 38 || event.keyCode === 40) {
        var index = 0;
        if (_this.focusIndex >= 0) {
          index = _this.focusIndex + (event.keyCode === 40 ? 1 : -1);
        }
        if (index < 0) {
          index = _this.options.length - 1;
        }
        if (index >= _this.options.length) {
          index = 0;
        }
        _this.options[index].el.button.focus();
        _this.focusIndex = index;
        event.preventDefault();
      } else {
        var key = String.fromCharCode(event.keyCode);
        clearTimeout(_this.keyTimer);
        _this.keyTimer = setTimeout(_this.clearKeyStack.bind(_this), _this.props.searchTimeout);
        _this.keyStack += key;
        // Search for matching items and select them
        var searchResult = _this.searchOption(_this.keyStack.toLowerCase());
        if (searchResult) {
          _this.setState({ value: searchResult.value });
        }
      }
    };

    _this.handleWindowClick = function () {
      _this.close();
    };

    _this.handleClick = function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          disabled = _this$props.disabled;
      var open = _this.state.open;

      e.stopPropagation();
      if (open) {
        _this.close();
      } else if (!disabled) {
        _this.open();
      }
      if (onClick) onClick(e, !open);
    };

    _this.keyStack = '';
    _this.keyTimer = {};
    var value = props.value,
        text = props.text,
        options = props.options;
    // When options are no objects, convert

    _this.options = _this.prepareOptions(options);
    _this.focusIndex = -1;
    _this.state = {
      open: false,
      value: value || (text ? undefined : _this.options[0].value)
    };
    return _this;
  }

  // options can be either an array of string or an array of object


  _createClass(Dropdown, [{
    key: 'prepareOptions',
    value: function prepareOptions(options) {
      return options.length > 0 && options[0].label !== undefined ? options : options.map(function (o) {
        return { label: o, value: o };
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      instances.push(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.open) this.scrollToChoice(this.state.value);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          options = nextProps.options;

      this.options = this.prepareOptions(options);
      if (this.props.value !== value) this.setState({ value: value });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      instances = instances.filter(function (item) {
        return item !== _this2;
      });
    }

    // Searches for the items where the selected value fits and returns its label

  }, {
    key: 'getRelatedOption',
    value: function getRelatedOption(value) {
      return (0, _find2.default)(this.options, function (el) {
        return el.value === value;
      });
    }
  }, {
    key: 'scrollToChoice',
    value: function scrollToChoice(value) {
      var index = (0, _findIndex2.default)(this.options, function (el) {
        return value === el.value;
      });
      // when found
      if (index !== -1) this.list.scrollTop = this.list.childNodes[index].offsetTop;
    }
  }, {
    key: 'isSomeOptionFocused',
    value: function isSomeOptionFocused() {
      return this.options.some(function (option) {
        return option.el.isFocused();
      });
    }
  }, {
    key: 'getDropdownChoice',
    value: function getDropdownChoice(option, key) {
      var _this3 = this;

      var open = this.state.open;

      var id = option.id,
          value = option.value,
          rest = _objectWithoutProperties(option, ['id', 'value']);

      delete rest.el;
      return _react2.default.createElement(_DropdownChoice2.default, _extends({
        open: open,
        ref: function ref(el) {
          if (el) {
            _this3.options[key].el = el;
          }
        },
        key: key,
        value: value,
        id: id || 'ui_' + this.props.name + key,
        selected: this.state.value === value,
        onCheckedChange: this.handleCheckedChange.bind(this),
        onBlur: function onBlur() {
          setTimeout(function () {
            if (!_this3.isSomeOptionFocused()) _this3.close();
          }, 0);
        }
      }, rest));
    }
  }, {
    key: 'getOption',
    value: function getOption(option, key) {
      var value = option.value,
          id = option.id;

      return _react2.default.createElement(
        'option',
        { value: value, key: key, id: id || '' + this.props.name + key },
        value
      );
    }
  }, {
    key: 'clearKeyStack',
    value: function clearKeyStack() {
      this.keyStack = '';
    }

    // Searches if a label in options starts with the keyStack and returns its value

  }, {
    key: 'searchOption',
    value: function searchOption(searchTerm) {
      return (0, _find2.default)(this.options, function (item) {
        return item.label.toString().toLowerCase().startsWith(searchTerm);
      });
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.state.open) {
        clearTimeout(this.keyTimer);
        this.clearKeyStack();
        this.focusIndex = -1;
        this.removeEventListener('click', this.handleWindowClick);
        this.removeEventListener('keydown', this.handleKeyPress);
        this.setState({ open: false });
      }
    }
  }, {
    key: 'open',
    value: function open() {
      if (!this.state.open) {
        instances.forEach(function (item) {
          return item.close();
        });
        this.addEventListener('click', this.handleWindowClick);
        this.addEventListener('keydown', this.handleKeyPress);
        this.setState({ open: true });
      }
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(event, fn) {
      if (window.addEventListener) {
        window.addEventListener(event, fn, false);
      } else if (window.attachEvent) {
        window.attachEvent(event, fn);
      }
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(event, fn) {
      if (window.addEventListener) {
        window.removeEventListener(event, fn, false);
      } else if (window.attachEvent) {
        window.detachEvent(event, fn);
      }
    }

    // Called when one clicks anywhere on the window


    // Called when one clicks on the dropdown. Toggles open state

  }, {
    key: 'handleCheckedChange',
    value: function handleCheckedChange(event, check) {
      var onSelect = this.props.onSelect;

      this.setState(check);
      if (onSelect) onSelect(event, { selected: check.value });
    }
  }, {
    key: 'getUlHeight',
    value: function getUlHeight() {
      var _Array$prototype = Array.prototype,
          reduce = _Array$prototype.reduce,
          slice = _Array$prototype.slice;

      var listHeight = 0;
      if (this.state.open) {
        var items = slice.call(this.list.childNodes, 0, this.props.maxVisibleItems);
        listHeight = reduce.call(items, function (acc, item) {
          return acc + (item.offsetHeight || 0);
        }, 0);
      }
      return listHeight;
    }
  }, {
    key: 'getOverflowY',
    value: function getOverflowY() {
      var _props = this.props,
          options = _props.options,
          maxVisibleItems = _props.maxVisibleItems;

      return this.state.open && options.length > maxVisibleItems ? 'scroll' : 'hidden';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          text = _props2.text,
          dark = _props2.dark,
          inline = _props2.inline,
          form = _props2.form,
          id = _props2.id,
          name = _props2.name,
          compact = _props2.compact,
          medium = _props2.medium,
          disabled = _props2.disabled,
          widthBasedOnContent = _props2.widthBasedOnContent;
      var _state = this.state,
          value = _state.value,
          open = _state.open;

      var className = (0, _classnames2.default)('select', {
        'select--inline': inline,
        'select--form': form,
        'select--dark': dark,
        'select--40': medium,
        'select--compact': compact,
        'select--content': widthBasedOnContent,
        open: open
      });
      // Extra padding for ellipsis
      var textStyles = widthBasedOnContent ? {} : { paddingRight: '1em' };

      var selectedOption = value && this.getRelatedOption(value);
      var label = '';
      var title = '';
      if (selectedOption) {
        label = selectedOption.label;
        title = selectedOption.title || !(0, _isObject2.default)(label) && label;
      }
      return _react2.default.createElement(
        'div',
        { onClick: this.handleClick, className: className, role: 'menu', tabIndex: '-1' },
        _react2.default.createElement(
          'select',
          {
            id: id,
            tabIndex: '-1',
            'aria-hidden': 'true',
            style: {
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0
            },
            name: name,
            value: value,
            readOnly: true,
            disabled: true
          },
          this.options.map(this.getOption.bind(this))
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            className: (0, _classnames2.default)('select__button', {
              'button--disabled': disabled && !inline,
              'select--disabled': disabled && inline
            }),
            title: title || text,
            dark: dark,
            semantic: true
          },
          _react2.default.createElement(
            'span',
            { className: 'select__button__text', style: textStyles },
            label || text
          ),
          _react2.default.createElement(_Icon2.default, { type: 'arrow', className: 'select__button__arrow' })
        ),
        _react2.default.createElement(
          'ul',
          {
            className: 'select__options',
            ref: function ref(el) {
              return _this4.list = el;
            },
            id: id && 'ui_' + id,
            style: {
              height: this.getUlHeight(),
              overflowY: this.getOverflowY(),
              overflowX: 'hidden'
            }
          },
          this.options.map(this.getDropdownChoice.bind(this))
        )
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
  maxVisibleItems: 5,
  searchTimeout: 750,
  widthBasedOnContent: false
};
Dropdown.propTypes = {
  name: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.arrayOf(_propTypes2.default.object), _propTypes2.default.arrayOf(_propTypes2.default.number)]).isRequired,
  searchTimeout: _propTypes2.default.number,
  dark: _propTypes2.default.bool,
  medium: _propTypes2.default.bool,
  compact: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  inline: _propTypes2.default.bool,
  form: _propTypes2.default.bool,
  widthBasedOnContent: _propTypes2.default.bool,
  maxVisibleItems: _propTypes2.default.number,
  onClick: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  text: _propTypes2.default.node,
  disabled: _propTypes2.default.bool
};
exports.default = Dropdown;