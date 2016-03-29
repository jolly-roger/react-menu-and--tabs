'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabItem = function (_Component) {
    _inherits(TabItem, _Component);

    function TabItem() {
        _classCallCheck(this, TabItem);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TabItem).call(this));

        _this.routeAttr = 'data-route';
        _this.ariaExpandedAttr = 'aria-expanded';
        _this.ariaSelectedAttr = 'aria-selected';
        _this.isActiveClass = 'is-active';
        _this.sectionAccordionId = 'sectionAccordion';
        return _this;
    }

    _createClass(TabItem, [{
        key: 'handleSectionItemClick',
        value: function handleSectionItemClick(event) {
            var isActive = Array.from(event.target.parentNode.classList).indexOf(this.isActiveClass) > -1;
            var sectionId = event.target.getAttribute(this.routeAttr);

            this.updateQuery(sectionId, !isActive);
        }
    }, {
        key: 'updateQuery',
        value: function updateQuery(sectionId, isCollapse) {
            var query = this.props.location.query;
            var collapse = [];

            if (query.collapse) {
                collapse = JSON.parse(query.collapse);
            }

            var indexOfSection = collapse.indexOf(sectionId);

            if (isCollapse && indexOfSection === -1) {
                collapse.push(sectionId);
            } else if (!isCollapse && indexOfSection >= 0) {
                collapse.splice(indexOfSection, 1);
            }

            _reactRouter.browserHistory.push(this.props.location.pathname + '?collapse=' + JSON.stringify(collapse));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            $('#' + this.sectionAccordionId).foundation();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var query = newProps.location.query;
            var collapse = query.collapse ? JSON.parse(query.collapse) : [];

            if (collapse.length == 0) {
                $('#' + this.sectionAccordionId + ' .accordion').foundation('down', $('#' + this.sectionAccordionId + ' .accordion-content'), true);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var active = $('#' + this.sectionAccordionId + ' li.is-active .accordion-content');
            var collapse = $('#' + this.sectionAccordionId + ' li:not(.is-active) .accordion-content');
            var accordion = $('#' + this.sectionAccordionId + ' .accordion');

            accordion.foundation('up', collapse, true);
            accordion.foundation('down', active, true);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props$params = this.props.params;
            var menuItemRoute = _props$params.menuItemRoute;
            var tabItemRoute = _props$params.tabItemRoute;

            var sectionItems = this.props.route.menuConfig.getSectionItems(menuItemRoute, tabItemRoute);
            var binbedHandleSectionItemClick = this.handleSectionItemClick.bind(this);
            var query = this.props.location.query;
            var collapse = query.collapse ? JSON.parse(query.collapse) : [];

            return _react2.default.createElement(
                'div',
                { id: this.sectionAccordionId },
                _react2.default.createElement(
                    'ul',
                    { className: 'accordion', 'data-accordion': true, 'data-multi-expand': 'true',
                        'data-allow-all-closed': 'true', onClick: binbedHandleSectionItemClick },
                    sectionItems.map(function (val, i) {
                        var isActive = _this2.isActiveClass;

                        if (collapse.indexOf(val.route) > -1) {
                            isActive = '';
                        }

                        return _react2.default.createElement(
                            'li',
                            { className: 'accordion-item ' + isActive, 'data-accordion-item': true },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'accordion-title',
                                    'data-route': val.route },
                                val.name
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'accordion-content', 'data-tab-content': true },
                                menuItemRoute,
                                ' / ',
                                tabItemRoute,
                                ' / ',
                                val.route
                            )
                        );
                    })
                )
            );
        }
    }]);

    return TabItem;
}(_react.Component);

exports.default = TabItem;