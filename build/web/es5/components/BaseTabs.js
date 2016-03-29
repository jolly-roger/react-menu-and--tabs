'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

        _this.tabItemsId = 'menuItems';
        _this.ariaSelectedAttr = 'aria-selected';
        _this.isActiveClass = 'is-active';
        return _this;
    }

    _createClass(App, [{
        key: 'handleTabItemClick',
        value: function handleTabItemClick(event) {
            var ariaSelected = Boolean(event.target.getAttribute(this.ariaSelectedAttr));

            if (ariaSelected) {
                return;
            } else {
                $('#' + this.tabItemsId + ' .tabs-title a').removeAttr(this.ariaSelectedAttr);
                $('#' + this.tabItemsId + ' .tabs-title').removeClass(this.isActiveClass);

                $(event.target).attr(this.ariaSelectedAttr, true).parent().addClass(this.isActiveClass);
            }

            this.initFoundation();
        }
    }, {
        key: 'initFoundation',
        value: function initFoundation() {
            $('#' + this.tabItemsId).foundation();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initFoundation();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.initFoundation();
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;