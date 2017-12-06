'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RenderIntoContainer = require('./helpers/RenderIntoContainer');

var _RenderIntoContainer2 = _interopRequireDefault(_RenderIntoContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global document window */


var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      shouldRender: false,
      isVisible: false
    }, _this.handleScroll = function () {
      _this.hideTooltip();
      if (_this.props.scrollableContainer) {
        _this.removeEventListener(_this.props.scrollableContainer, 'scroll', _this.handleScroll);
      }
    }, _this.handleTransitionEnd = function () {
      _this.clearEvents();
      _this.setState({ shouldRender: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tooltip, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isVisible !== undefined) {
        this.toggleTooltip(nextProps.isVisible);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
      this.clearEvents();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      /* this.tooltip is available after first render, so to calculate
       * tooltipStyles we need to render again
       * call toggleTooltip to achieve this, since calling render without
       * state change will not modify DOM
       */
      this.toggleTooltip(this.props.isVisible);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(el, event, fn) {
      if (el.addEventListener) {
        el.removeEventListener(event, fn, false);
      } else if (el.attachEvent) {
        el.detachEvent(event, fn);
      }
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(el, event, fn) {
      if (el.addEventListener) {
        el.addEventListener(event, fn, false);
      } else if (el.attachEvent) {
        el.attachEvent(event, fn);
      }
    }
  }, {
    key: 'toggleTooltip',
    value: function toggleTooltip(isVisible) {
      if (isVisible) {
        this.showTooltip();
      } else {
        this.hideTooltip();
      }
    }
  }, {
    key: 'showTooltip',
    value: function showTooltip() {
      var _this2 = this;

      this.timer = setTimeout(function () {
        if (_this2.props.renderIntoBody) {
          _this2.setState({ shouldRender: true }, function () {
            if (_this2.props.scrollableContainer) {
              _this2.addEventListener(_this2.props.scrollableContainer, 'scroll', _this2.handleScroll);
            }
            _this2.setState({ isVisible: true });
          });
        } else {
          _this2.setState({ isVisible: true });
        }
      }, this.props.delay * 1000);
    }
  }, {
    key: 'hideTooltip',
    value: function hideTooltip() {
      clearTimeout(this.timer);
      this.setState({ isVisible: false });
      if (this.tooltipDetails && this.props.renderIntoBody && canUseDOM) {
        var event = this.getTransitionEndName();
        this.addEventListener(this.tooltipDetails, event, this.handleTransitionEnd);
      }
    }
  }, {
    key: 'clearEvents',
    value: function clearEvents() {
      if (canUseDOM) {
        var event = this.getTransitionEndName();
        if (this.tooltipDetails) {
          this.removeEventListener(this.tooltipDetails, event, this.handleTransitionEnd);
        }
        this.removeEventListener(this.props.scrollableContainer, 'scroll', this.handleScroll);
      }
    }
  }, {
    key: 'getTransitionEndName',
    value: function getTransitionEndName() {
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
  }, {
    key: 'getOffsetDirection',
    value: function getOffsetDirection() {
      return {
        top: 'top',
        right: 'left',
        bottom: 'bottom',
        left: 'left'
      }[this.props.position];
    }
  }, {
    key: 'getTransform',
    value: function getTransform() {
      return {
        top: 'scaleX(1) translate3d(0, 14px, 0) rotate(0deg)',
        right: 'scaleX(1) translate3d(22px, 0, 0) rotate(0deg)',
        bottom: 'scaleX(1) translate3d(0, 0, 0) rotate(0deg)',
        left: 'scaleX(1) translate3d(-22px, 0, 0) rotate(0deg)'
      }[this.props.position];
    }
  }, {
    key: 'calculateOffset',
    value: function calculateOffset() {
      var tooltipDetails = this.tooltipDetails,
          tooltip = this.tooltip;
      var offset = this.props.offset;

      var customOffset = offset !== undefined ? offset : 0;
      return {
        top: -tooltipDetails.clientHeight,
        right: tooltip.clientWidth,
        bottom: -tooltipDetails.clientHeight - 10, // Extra margin for tail
        left: -tooltipDetails.clientWidth
      }[this.props.position] - customOffset;
    }
  }, {
    key: 'exceeds',
    value: function exceeds() {
      var tooltipDetails = this.tooltipDetails,
          tooltip = this.tooltip;

      var pos = this.props.position;
      var docEl = document.documentElement;
      var body = document.body;
      var viewportWidth = body.clientWidth || docEl.clientWidt || window.innerWidth;
      var elMostRight = tooltip.getBoundingClientRect().left + tooltipDetails.offsetWidth;
      return (pos === 'bottom' || pos === 'top') && elMostRight >= viewportWidth;
    }
  }, {
    key: 'getTooltipStyles',
    value: function getTooltipStyles(exceeds) {
      var _extends2;

      var hideOnHover = this.props.hideOnHover;

      var alignProps = exceeds ? { left: 'auto', right: '0' } : {};
      var transform = this.props.isVisible === undefined ? {} : {
        transform: this.getTransform()
      };
      return _extends((_extends2 = {}, _defineProperty(_extends2, this.getOffsetDirection(), this.calculateOffset()), _defineProperty(_extends2, 'pointerEvents', hideOnHover ? 'none' : 'auto'), _extends2), alignProps, transform);
    }
  }, {
    key: 'getTooltipAbsoluteStyles',
    value: function getTooltipAbsoluteStyles() {
      var _props = this.props,
          position = _props.position,
          offset = _props.offset;
      var tooltip = this.tooltip,
          tooltipDetails = this.tooltipDetails;

      var _tooltip$getBoundingC = tooltip.getBoundingClientRect(),
          left = _tooltip$getBoundingC.left,
          bottom = _tooltip$getBoundingC.bottom,
          top = _tooltip$getBoundingC.top,
          right = _tooltip$getBoundingC.right;

      var customOffset = offset !== undefined ? offset : 0;
      var transform = this.state.isVisible ? {
        transform: this.getTransform()
      } : {};
      var positionMap = {
        bottom: {
          left: left,
          top: bottom + 10 + customOffset
        },
        top: {
          left: left,
          top: top - tooltipDetails.clientHeight + customOffset
        },
        left: {
          left: left - tooltipDetails.clientWidth + customOffset,
          top: top
        },
        right: {
          left: right + customOffset,
          top: top
        }
      };
      return _extends({}, positionMap[position], transform, {
        bottom: 'auto'
      });
    }
  }, {
    key: 'renderTooltipDetails',
    value: function renderTooltipDetails(style, tailStyles) {
      var _this3 = this;

      var _props2 = this.props,
          id = _props2.id,
          position = _props2.position,
          text = _props2.text,
          nowrap = _props2.nowrap;

      var detailsContent = nowrap ? _react2.default.createElement(
        'span',
        { style: { whiteSpace: 'nowrap' } },
        text
      ) : text;
      return _react2.default.createElement(
        'div',
        {
          role: 'tooltip',
          ref: function ref(el) {
            return _this3.tooltipDetails = el;
          },
          className: 'tooltip__details tooltip--' + position,
          style: style,
          id: id,
          'aria-hidden': !this.state.isVisible
        },
        _react2.default.createElement(
          'svg',
          {
            x: '0px',
            y: '0px',
            viewBox: '0 0 9.1 16.1',
            style: tailStyles
          },
          _react2.default.createElement('polyline', { points: '9.1,15.7 1.4,8.1 9.1,0.5' }),
          _react2.default.createElement('polygon', { points: '8.1,16.1 0,8.1 8.1,0 8.1,1.4 1.4,8.1 8.1,14.7' })
        ),
        detailsContent
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props,
          id = _props3.id,
          children = _props3.children,
          style = _props3.style,
          renderIntoBody = _props3.renderIntoBody;

      var tooltipStyles = style;
      var tailStyles = {};
      if (this.tooltip && this.tooltipDetails) {
        if (renderIntoBody) {
          tooltipStyles = _extends({}, this.getTooltipAbsoluteStyles(), tooltipStyles);
        } else {
          var exceeds = this.exceeds();
          tooltipStyles = _extends({}, this.getTooltipStyles(exceeds), tooltipStyles);
          tailStyles = exceeds ? { right: '18px', left: 'auto' } : {};
        }
      }
      var eventHandlers = this.props.isVisible !== undefined ? {} : {
        onMouseEnter: this.showTooltip.bind(this),
        onMouseLeave: this.hideTooltip.bind(this),
        onFocus: this.showTooltip.bind(this),
        onBlur: this.hideTooltip.bind(this),
        onKeyDown: function onKeyDown(e) {
          return e.keyCode === 27 && _this4.hideTooltip();
        } // hide on esc
      };
      return _react2.default.createElement(
        'div',
        _extends({
          className: 'tooltip',
          ref: function ref(el) {
            return _this4.tooltip = el;
          }
        }, eventHandlers),
        _react2.default.createElement(
          'span',
          {
            className: 'tooltip__trigger',
            'aria-describedby': id
          },
          children
        ),
        !renderIntoBody && this.renderTooltipDetails(tooltipStyles, tailStyles),
        renderIntoBody && _react2.default.createElement(
          _RenderIntoContainer2.default,
          {
            className: 'tooltip',
            styles: { pointerEvents: 'none' },
            isVisible: this.state.shouldRender
          },
          this.renderTooltipDetails(tooltipStyles, tailStyles)
        )
      );
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = {
  id: _propTypes2.default.string,
  offset: _propTypes2.default.number,
  text: _propTypes2.default.node,
  style: _propTypes2.default.object,
  position: _propTypes2.default.oneOf(['top', 'right', 'bottom', 'left']),
  children: _propTypes2.default.node,
  hideOnHover: _propTypes2.default.bool,
  nowrap: _propTypes2.default.bool,
  delay: _propTypes2.default.number,
  isVisible: _propTypes2.default.bool,
  renderIntoBody: _propTypes2.default.bool,
  scrollableContainer: _propTypes2.default.object
};
Tooltip.defaultProps = {
  position: 'top',
  delay: 0,
  renderIntoBody: false,
  scrollableContainer: canUseDOM ? window : null
};
exports.default = Tooltip;