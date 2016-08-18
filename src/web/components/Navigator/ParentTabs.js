import React, {Component} from 'react';
import {Link} from 'react-router'

import BaseTabs from './BaseTabs';
import {getParentTabs} from './store';


export default class ParentTabs extends BaseTabs {
    constructor() {
        super();
        
        this.binbedHandleTabClick = this.handleTabClick.bind(this);
    }
    
    getTabsView(tabs, parentTabRoute) {
        return tabs.map((val, i) => {
            let props = {};
            
            if (parentTabRoute && val.route == parentTabRoute) {
                props[this.ariaSelectedAttr] = true;
            }
            
            return (
                <li className="tabs-title">
                    <Link to={"/" + val.route} {...props} >{val.name}</Link>
                </li>
            );
        });
    }
    
    render() {
        let {parentTabRoute} = this.props.params;
        let tabs = getParentTabs();
        
        return (
            <div className="row collapse navigator">
                <div id={this.tabsContainerId} className="small-3 columns parent-tabs">
                    <ul className="tabs vertical" onClick={this.binbedHandleTabClick}>
                        {this.getTabsView(tabs, parentTabRoute)}
                    </ul>
                </div>
                <div className="columns">
                    <div className="tabs-panel is-active parent-tabs-panel">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
