'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint "no-undef": 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _elementClass = require('element-class');

var _elementClass2 = _interopRequireDefault(_elementClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// helpers
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function removeEventListener(el, event, fn) {
  if (window.addEventListener) {
    el.removeEventListener(event, fn, false);
  } else if (window.attachEvent) {
    el.detachEvent(event, fn);
  }
}

function addEventListener(el, event, fn) {
  if (window.addEventListener) {
    el.addEventListener(event, fn, false);
  } else if (window.attachEvent) {
    el.attachEvent(event, fn);
  }
}

function getTransitionEndName() {
  var el = document.createElement('div');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'otransitionend',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  var _Object$keys$filter = Object.keys(transitions).filter(function (t) {
    return el.style[t] !== undefined;
  }),
      _Object$keys$filter2 = _slicedToArray(_Object$keys$filter, 1),
      tKey = _Object$keys$filter2[0];

  return transitions[tKey];
}

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onKeyup = _this.onKeyup.bind(_this);
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _elementClass2.default)(document.body).add('vanilla-modal');
      addEventListener(this.modal, getTransitionEndName(), this.onTransitionEnd);
      if (this.props.isOpen) {
        this.open();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.toggle();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      removeEventListener(this.modal, getTransitionEndName(), this.onTransitionEnd);
      removeEventListener(window, 'keyup', this.onKeyup);
    }
  }, {
    key: 'onTransitionEnd',
    value: function onTransitionEnd(e) {
      if (!this.props.isOpen && e.target === this.modal) {
        this.modal.setAttribute('style', 'display: none');
      } else if (e.target === this.modal) {
        this.setTabIndex();
      }
    }
  }, {
    key: 'onKeyup',
    value: function onKeyup(e) {
      if (e.keyCode === 27) {
        // escape
        this.props.onRequestClose();
      }
    }
  }, {
    key: 'setTabIndex',
    value: function setTabIndex() {
      this.content.setAttribute('tabindex', '0');
      this.content.focus();
    }
  }, {
    key: 'getModifier',
    value: function getModifier() {
      return this.props.type ? 'modal--' + this.props.type : '';
    }
  }, {
    key: 'close',
    value: function close() {
      if (canUseDOM) {
        (0, _elementClass2.default)(document.body).remove('modal-visible');
        removeEventListener(window, 'keyup', this.onKeyup);
      }
    }
  }, {
    key: 'open',
    value: function open() {
      if (canUseDOM) {
        if (this.modal) {
          this.modal.setAttribute('style', '');
        }
        addEventListener(window, 'keyup', this.onKeyup);
        setTimeout(function () {
          // Workaround for transition animation
          (0, _elementClass2.default)(document.body).add('modal-visible');
        }, 0);
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.props.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'modal',
          ref: function ref(el) {
            return _this2.modal = el;
          },
          onClick: this.props.onRequestClose,
          style: { display: 'none' },
          role: 'dialog',
          tabIndex: '-1'
        },
        _react2.default.createElement(
          'div',
          {
            className: 'modal-inner',
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
            role: 'presentation',
            tabIndex: '-1'
          },
          _react2.default.createElement(
            'div',
            {
              className: 'modal-content',
              ref: function ref(el) {
                return _this2.content = el;
              },
              tabIndex: '0'
            },
            _react2.default.createElement(
              'div',
              { className: 'modal__container ' + this.getModifier() },
              this.props.children
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool,
  onRequestClose: _propTypes2.default.func,
  children: _propTypes2.default.node,
  type: _propTypes2.default.oneOf(['error', 'warning', 'info'])
};
Modal.defaultProps = {
  isOpen: false,
  onRequestClose: function onRequestClose(_) {
    return _;
  }
};
exports.default = Modal;