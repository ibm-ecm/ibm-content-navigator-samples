'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TabsPanel = require('./TabsPanel');

var _TabsPanel2 = _interopRequireDefault(_TabsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Validator for Panel type
var panelType = _propTypes2.default.shape({
  type: _propTypes2.default.oneOf([_TabsPanel2.default])
});

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    if (!props.children) {
      throw new Error('Tabs must contain at least one Tabs.Panel.');
    }
    var children = props.children;

    if (!children.length) children = [children];
    var activeItems = children.filter(function (item) {
      return item.isActive;
    }).concat(children[0]); // show the first tab if active tab is not specified
    _this.state = { activeTab: activeItems[0].props.id };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'showTabPanel',
    value: function showTabPanel(e, id) {
      this.setState({ activeTab: id });
      this.props.onTabClickHandler(e, id);
    }
  }, {
    key: 'isTabActive',
    value: function isTabActive(id) {
      var isActive = this.props.isTabActive(id);
      if (isActive === null) {
        isActive = this.state.activeTab === id;
      }
      return isActive;
    }
  }, {
    key: 'renderList',
    value: function renderList(items) {
      var _this2 = this;

      return _react2.default.createElement(
        'ul',
        {
          role: 'tablist',
          className: (0, _classnames2.default)('tabs__list', {
            'tabs__list--vertical': this.props.vertical
          })
        },
        items.map(function (item) {
          return _react2.default.createElement(
            'li',
            {
              tabIndex: 1,
              className: (0, _classnames2.default)('tabs__tab', {
                'tabs__tab--vertical': _this2.props.vertical
              }),
              key: item.props.id,
              id: item.props.id,
              'aria-controls': item.props.id + '-panel',
              'aria-selected': _this2.isTabActive(item.props.id),
              onClick: function onClick(e) {
                return _this2.showTabPanel(e, item.props.id);
              }
            },
            item.props.title
          );
        })
      );
    }
  }, {
    key: 'renderPanels',
    value: function renderPanels(items) {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        items.map(function (item) {
          return _react2.default.createElement('div', {
            role: 'tabpanel',
            className: (0, _classnames2.default)('tabs__tabpanel', {
              'tabs__tabpanel--vertical': _this3.props.vertical
            }),
            key: item.props.id + '-panel',
            id: item.props.id + '-panel',
            'aria-labelledby': item.props.id,
            'aria-hidden': !_this3.isTabActive(item.props.id),
            children: item.props.children
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      if (!children.length) children = [children];
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('tabs', {
            'tabs--dark': this.props.dark,
            'tabs--dark--alt': this.props.darkAlt,
            'tabs--vertical': this.props.vertical
          })
        },
        this.renderList(children),
        this.renderPanels(children)
      );
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.Panel = _TabsPanel2.default;
Tabs.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(panelType), panelType]),
  dark: _propTypes2.default.bool,
  darkAlt: _propTypes2.default.bool,
  vertical: _propTypes2.default.bool,
  isTabActive: _propTypes2.default.func,
  onTabClickHandler: _propTypes2.default.func
};
Tabs.defaultProps = {
  isTabActive: function isTabActive() {
    return null;
  },
  onTabClickHandler: function onTabClickHandler() {
    return null;
  }
};
exports.default = Tabs;