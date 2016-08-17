import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import {loadSection, openSection} from './actions';
import store from './store';


export default class Sections extends Component {
    constructor (props) {
        super(props);

        this.routeAttr = 'data-route';
        this.ariaExpandedAttr = 'aria-expanded';
        this.ariaSelectedAttr = 'aria-selected';
        this.isActiveClass = 'is-active'
        this.sectionAccordionId = 'sectionAccordion';
        
        this.binbedHandleSectionClick = this.handleSectionClick.bind(this);
        this.bindedUpdateText = this.updateText.bind(this);
        
        store.subscribe(this.bindedUpdateText);
        
        store.dispatch(loadSection(props.parentTabRoute, props.childTabRoute, ''));
        
        this.state = {
            text: store.getState()
        };
    }
    
    handleSectionClick(event) {
        store.dispatch({type: 'OPEN_SECTION'});
        
        let isActive = Array.from(event.target.parentNode.classList)
            .indexOf(this.isActiveClass) > -1;
        let sectionId = event.target.getAttribute(this.routeAttr);

        this.updateQuery(sectionId, !isActive);
    }
    
    updateQuery(sectionId, isCollapse) {
        let query = this.props.location.query;
        let collapse = [];
        
        if (query.collapse) {
            collapse = JSON.parse(query.collapse);
        }
        
        let indexOfSection = collapse.indexOf(sectionId);

        if (isCollapse && indexOfSection === -1) {
            collapse.push(sectionId);
        } else if (!isCollapse && indexOfSection >= 0) {
            collapse.splice(indexOfSection, 1);
        }
        
        browserHistory.push(this.props.location.pathname + '?collapse=' + JSON.stringify(collapse));
    }
    
    updateText() {
        this.setState({
            text: store.getState()
        });
    }
    
    getSectionsView(sections, collapse, parentTabRoute, childTabRoute) {
        return sections.map((val, i) => {
            let isActive = this.isActiveClass;
            let fullRoute = `${parentTabRoute}/${childTabRoute}/${val.route}`;
            
            if (collapse.indexOf(val.route) > -1) {
                isActive = '';
            }

            return (
                <li className={'accordion-item ' + isActive} data-accordion-item>
                    <a href="#" className="accordion-title"
                        data-route={val.route}>{val.name}</a>
                    <div className="accordion-content" data-tab-content>
                        <div>
                            {fullRoute}
                            <br />
                            {this.state.text}
                        </div>
                    </div>
                </li>
            );
        });
    }
    
    componentDidMount() {
        $('#' + this.sectionAccordionId).foundation();
    }
    
    componentWillReceiveProps(newProps) {
        let query = newProps.location.query;
        let collapse = query.collapse ? JSON.parse(query.collapse) : [];
        
        if (collapse.length == 0) {
            $('#' + this.sectionAccordionId + ' .accordion')
                .foundation('down', $('#' + this.sectionAccordionId + ' .accordion-content'), true);
        }
    }
    
    componentDidUpdate() {
        let active = $('#' + this.sectionAccordionId + ' li.is-active .accordion-content');
        let collapse = $('#' + this.sectionAccordionId + ' li:not(.is-active) .accordion-content');
        let accordion = $('#' + this.sectionAccordionId + ' .accordion');
        
        accordion.foundation('up', collapse, true);
        accordion.foundation('down', active, true);
    }
    
    render() {
        let {parentTabRoute, childTabRoute} = this.props.params;
        let sections = this.props.route.navigationConfig.getSections(parentTabRoute, childTabRoute);
        let query = this.props.location.query;
        let collapse = query.collapse ? JSON.parse(query.collapse) : [];
        
        return (
            <div id={this.sectionAccordionId}>
                <ul className="accordion" data-accordion data-multi-expand="true"
                    data-allow-all-closed="true" onClick={this.binbedHandleSectionClick}>
                    {this.getSectionsView(sections, collapse, parentTabRoute, childTabRoute)}
                </ul>
            </div>
        )
    }
}
