import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import loremIpsum from 'lorem-ipsum-react-native';


export default class Sections extends Component {
    constructor () {
        super();
        
        this.routeAttr = 'data-route';
        this.ariaExpandedAttr = 'aria-expanded';
        this.ariaSelectedAttr = 'aria-selected';
        this.isActiveClass = 'is-active'
        this.sectionAccordionId = 'sectionAccordion';
        
        this.binbedHandleSectionClick = this.handleSectionClick.bind(this);
    }
    
    handleSectionClick(event) {
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
    
    getSectionsView(sections, collapse) {
        return sections.map((val, i) => {
            let isActive = this.isActiveClass;
            
            if (collapse.indexOf(val.route) > -1) {
                isActive = '';
            }

            return (
                <li className={'accordion-item ' + isActive} data-accordion-item>
                    <a href="#" className="accordion-title"
                        data-route={val.route}>{val.name}</a>
                    <div className="accordion-content" data-tab-content>
                        {loremIpsum({
                            units: 'paragraphs'
                        })}
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
                    {this.getSectionsView(sections, collapse)}
                </ul>
            </div>
        )
    }
}
