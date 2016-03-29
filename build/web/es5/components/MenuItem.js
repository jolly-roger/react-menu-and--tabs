'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _NavLink = require('./NavLink');

var _NavLink2 = _interopRequireDefault(_NavLink);

var _BaseTabs2 = require('./BaseTabs');

var _BaseTabs3 = _interopRequireDefault(_BaseTabs2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_BaseTabs) {
    _inherits(MenuItem, _BaseTabs);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuItem).call(this));

        _this.tabItemsId = 'tabItems';
        return _this;
    }

    _createClass(MenuItem, [{
        key: 'updateTabRoute',
        value: function updateTabRoute(props) {
            var _props$params = props.params;
            var menuItemRoute = _props$params.menuItemRoute;
            var tabItemRoute = _props$params.tabItemRoute;

            var tabItems = props.route.menuConfig.getTabItems(menuItemRoute);

            if (!tabItemRoute) {
                _reactRouter.browserHistory.replace('/' + menuItemRoute + '/' + tabItems[0].route);
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.updateTabRoute(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.updateTabRoute(newProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$params2 = this.props.params;
            var menuItemRoute = _props$params2.menuItemRoute;
            var tabItemRoute = _props$params2.tabItemRoute;

            var tabItems = this.props.route.menuConfig.getTabItems(menuItemRoute);
            var binbedHandleTabItemClick = this.handleTabItemClick.bind(this);

            return _react2.default.createElement(
                'div',
                { id: this.tabItemsId },
                _react2.default.createElement(
                    'ul',
                    { className: 'tabs', onClick: binbedHandleTabItemClick },
                    tabItems.map(function (val, i) {
                        var props = {};
                        var route = '/' + menuItemRoute + '/' + val.route;
                        var isActive = _this2.isActiveClass;

                        if (tabItemRoute && val.route == tabItemRoute || !tabItemRoute && i == 0) {
                            props[_this2.ariaSelectedAttr] = true;
                        } else {
                            isActive = '';
                        }

                        return _react2.default.createElement(
                            'li',
                            { className: 'tabs-title ' + isActive },
                            _react2.default.createElement(
                                _NavLink2.default,
                                _extends({ to: route }, props),
                                val.name
                            )
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tabs-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'tabs-panel is-active' },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return MenuItem;
}(_BaseTabs3.default);

exports.default = MenuItem;