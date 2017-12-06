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

var _fixedDataTable = require('fixed-data-table-2');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveTable = function (_React$Component) {
  _inherits(ResponsiveTable, _React$Component);

  function ResponsiveTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResponsiveTable.__proto__ || Object.getPrototypeOf(ResponsiveTable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      columnWidths: [],
      isColumnResizing: false,
      tableWidth: 1000
    }, _this.rows = [], _this.columns = [], _this.updateTimer = null, _this.saveData = function (data) {
      _this.rows = data.rows;
      if (_this.props.numbered) {
        _this.rows = data.rows.map(function (row, i) {
          row.push(i + 1);
          return row;
        });
      }
      _this.columns = data.columns;
      _this.updateTableWidth();
    }, _this.rowGetter = function (rowIndex) {
      return _this.rows[rowIndex];
    }, _this.onResize = function () {
      clearTimeout(_this.updateTimer);
      _this.updateTimer = setTimeout(_this.update, 16);
    }, _this.update = function () {
      var newTableWidth = _this.refs.container.offsetWidth;
      _this.updateTableWidth(_this.state.columnWidths, newTableWidth);
    }, _this.onColumnResizeEndCallback = function (newColumnWidth, dataKey) {
      if (newColumnWidth < _this.props.columnMinWidth) {
        newColumnWidth = _this.props.columnMinWidth;
      }
      var availableTableWidth = _this.getTableWidth();
      if (_this.props.numbered) {
        availableTableWidth -= _this.props.numberedColumnWidth;
      }
      var columnWidths = _this.state.columnWidths;

      columnWidths[dataKey] = newColumnWidth;
      var allColumnsWidth = _this.getSum(columnWidths);
      var numOfColumns = _this.columns.length;

      if (allColumnsWidth < availableTableWidth) {
        var numOfAffectedColumns = numOfColumns - dataKey - 1;
        var delta = availableTableWidth - allColumnsWidth;
        var columnDelta = Math.round(delta / numOfAffectedColumns);
        columnWidths = columnWidths.map(function (width, key) {
          if (key > dataKey) {
            width += columnDelta;
          }
          return Math.max(width, _this.props.columnMinWidth);
        });
        if (numOfAffectedColumns > 0) {
          var lastColumnDelta = delta - columnDelta * numOfAffectedColumns;
          columnWidths[columnWidths.length - 1] += lastColumnDelta;
        }
      }
      _this.updateState({
        columnWidths: columnWidths,
        isColumnResizing: false,
        tableWidth: _this.state.tableWidth
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ResponsiveTable, [{
    key: 'updateState',
    value: function updateState(newState) {
      var columnWidths = newState.columnWidths;
      var columnMinWidth = this.props.columnMinWidth;

      columnWidths = columnWidths.map(function (width) {
        return Math.max(width, columnMinWidth);
      });
      this.setState(_extends({}, newState, {
        columnWidths: columnWidths
      }));
    }
  }, {
    key: 'getAllColumnsWidth',
    value: function getAllColumnsWidth() {
      return this.state.columnWidths.reduce(function (acc, num) {
        return acc + num;
      });
    }
  }, {
    key: 'getTableWidth',
    value: function getTableWidth() {
      return this.state.tableWidth;
    }
  }, {
    key: 'getTableHeight',
    value: function getTableHeight() {
      var tableBodyHeight = this.props.numberOfVisibleRows * this.props.rowHeight;
      var scrollBar = 17;
      var height = tableBodyHeight + this.props.headerHeight + scrollBar;
      if (this.props.height > -1) {
        height = this.props.height;
      }
      return height;
    }
  }, {
    key: 'getMinTableWidth',
    value: function getMinTableWidth() {
      return this.columns.length * this.props.columnMinWidth;
    }
  }, {
    key: 'getSum',
    value: function getSum(array) {
      return array.reduce(function (acc, num) {
        return acc + num;
      }, 0);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.dataSource(this.saveData);
      var win = window;
      if (win.addEventListener) {
        win.addEventListener('resize', this.onResize, false);
      } else if (win.attachEvent) {
        win.attachEvent('onresize', this.onResize);
      } else {
        win.onresize = this.onResize;
      }
      this.update();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var win = window;
      if (win.removeEventListener) {
        win.removeEventListener('resize', this.onResize, false);
      } else if (win.detachEvent) {
        win.detachEvent('onresize', this.onResize);
      } else {
        win.onresize = null;
      }
    }
  }, {
    key: 'updateTableWidth',
    value: function updateTableWidth() {
      var columnWidths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var newTableWidth = arguments[1];

      var allColumnsWidth = this.getSum(columnWidths);
      var numOfColumns = this.columns.length;
      var minTableWidth = this.getMinTableWidth();

      if (!newTableWidth) {
        newTableWidth = this.getTableWidth();
      }

      var currentTableWidth = this.getTableWidth();
      var tableDelta = newTableWidth - currentTableWidth;

      var availableTableWidth = newTableWidth;
      if (this.props.numbered) {
        availableTableWidth -= this.props.numberedColumnWidth;
      }

      // initial state
      if (allColumnsWidth === 0) {
        columnWidths = [];
        for (var i = numOfColumns; i > 0; i--) {
          columnWidths.push(Math.floor(availableTableWidth / this.columns.length));
        }
        allColumnsWidth = this.getSum(columnWidths);
      }

      // table resize
      if (tableDelta !== 0 && newTableWidth > minTableWidth) {
        var columnDelta = Math.round(tableDelta / numOfColumns);
        columnWidths = columnWidths.map(function (width) {
          return width + columnDelta;
        });
      }

      // change width of the last column becouse of the Math.floor
      allColumnsWidth = this.getSum(columnWidths);
      var lastColumnDelta = availableTableWidth - allColumnsWidth;
      var lastColumnIndex = columnWidths.length - 1;
      var lastColumnWidth = columnWidths[lastColumnIndex] + lastColumnDelta;
      columnWidths[lastColumnIndex] = lastColumnWidth;

      // save new table size and updated size of columns
      this.updateState({
        tableWidth: newTableWidth,
        isColumnResizing: false,
        columnWidths: columnWidths
      });
    }
  }, {
    key: 'getNumberedColumn',
    value: function getNumberedColumn() {
      var columns = [];
      if (this.props.numbered) {
        columns.push(_react2.default.createElement(_fixedDataTable.Column, {
          label: '',
          fixed: true,
          width: this.props.numberedColumnWidth,
          key: this.columns.length,
          dataKey: this.columns.length,
          align: 'center',
          cellClassName: 'public_fixedDataTableCell_fixed',
          headerClassName: 'public_fixedDataTableCell_fixed',
          cell: function cell(_ref2) {
            var rowIndex = _ref2.rowIndex,
                props = _objectWithoutProperties(_ref2, ['rowIndex']);

            return _react2.default.createElement(
              _fixedDataTable.Cell,
              props,
              rowIndex + 1
            );
          }
        }));
      }
      return columns;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { ref: 'container' },
        _react2.default.createElement(
          _fixedDataTable.Table,
          _extends({}, this.props, {
            rowsCount: this.rows.length,
            width: this.state.tableWidth,
            height: this.getTableHeight(),
            onColumnResizeEndCallback: this.onColumnResizeEndCallback,
            isColumnResizing: this.state.isColumnResizing
          }),
          this.getNumberedColumn().concat(this.columns.map(function (column, i) {
            return _react2.default.createElement(_fixedDataTable.Column, {
              key: i,
              columnKey: i,
              header: _react2.default.createElement(
                _fixedDataTable.Cell,
                null,
                column.label
              ),
              width: _this2.state.columnWidths[i],
              dataKey: i,
              isResizable: i < _this2.columns.length - 1,
              cell: function cell(_ref3) {
                var rowIndex = _ref3.rowIndex,
                    props = _objectWithoutProperties(_ref3, ['rowIndex']);

                return _react2.default.createElement(
                  _fixedDataTable.Cell,
                  props,
                  _this2.rowGetter(rowIndex)[i]
                );
              }
            });
          }))
        )
      );
    }
  }]);

  return ResponsiveTable;
}(_react2.default.Component);

ResponsiveTable.defaultProps = {
  rowHeight: 50,
  headerHeight: 50,
  columnMinWidth: 100,
  numbered: false,
  numberedColumnWidth: 50,
  numberOfVisibleRows: 10
};
ResponsiveTable.propTypes = {
  rowHeight: _propTypes2.default.number,
  headerHeight: _propTypes2.default.number,
  columnMinWidth: _propTypes2.default.number,
  numbered: _propTypes2.default.bool,
  numberedColumnWidth: _propTypes2.default.number,
  numberOfVisibleRows: _propTypes2.default.number,
  height: _propTypes2.default.number,
  dataSource: _propTypes2.default.func
};
exports.default = ResponsiveTable;