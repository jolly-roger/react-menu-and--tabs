"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuConfig = function () {
    function MenuConfig(menuConfig) {
        _classCallCheck(this, MenuConfig);

        this.menuConfig = menuConfig;
    }

    _createClass(MenuConfig, [{
        key: "getMenuItems",
        value: function getMenuItems() {
            return this.menuConfig;
        }
    }, {
        key: "getTabItems",
        value: function getTabItems(menuItemRoute) {
            return this.findMenuItem(menuItemRoute).tabs;
        }
    }, {
        key: "getSectionItems",
        value: function getSectionItems(menuItemRoute, tabItemRoute) {
            return this.findTabItem(menuItemRoute, tabItemRoute).sections;
        }
    }, {
        key: "findMenuItem",
        value: function findMenuItem(menuItemRoute) {
            return this.menuConfig.find(function (item) {
                return item.route === menuItemRoute;
            });
        }
    }, {
        key: "findTabItem",
        value: function findTabItem(menuItemRoute, tabItemRoute) {
            var menuItem = this.findMenuItem(menuItemRoute);

            return menuItem.tabs.find(function (item) {
                return item.route === tabItemRoute;
            });
        }
    }]);

    return MenuConfig;
}();

exports.default = MenuConfig;