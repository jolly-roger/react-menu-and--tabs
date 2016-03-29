'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _MenuConfig = require('./MenuConfig');

var _MenuConfig2 = _interopRequireDefault(_MenuConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

fetch('/menu-config').then(function (data) {
    return data.json();
}).then(function (menuConfig) {
    var routes = (0, _routes.getRoutes)(new _MenuConfig2.default(menuConfig));

    (0, _reactDom.render)(_react2.default.createElement(_reactRouter.Router, { routes: routes, history: _reactRouter.browserHistory }), document.getElementById('app'));
}).catch(function (err) {
    return console.log(err);
});