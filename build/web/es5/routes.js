'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRoutes = getRoutes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _MenuItem = require('./components/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _TabItem = require('./components/TabItem');

var _TabItem2 = _interopRequireDefault(_TabItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes(menuConfig) {
    var defaultMenuItem = menuConfig.getMenuItems()[0];
    var defaultRoute = '/' + defaultMenuItem.route + '/' + menuConfig.getTabItems(defaultMenuItem.route)[0].route;

    return {
        path: '/',
        component: _App2.default,
        indexRoute: {
            onEnter: function onEnter(nextState, replace) {
                return replace(defaultRoute);
            }
        },
        menuConfig: menuConfig,
        childRoutes: [{
            path: '/:menuItemRoute',
            component: _MenuItem2.default,
            menuConfig: menuConfig,
            childRoutes: [{
                path: '/:menuItemRoute/:tabItemRoute',
                component: _TabItem2.default,
                menuConfig: menuConfig
            }]
        }]
    };
};