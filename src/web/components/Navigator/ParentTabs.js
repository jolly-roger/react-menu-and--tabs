import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

import BaseTabs from './BaseTabs';
import {getParentTabs, getChildTabs} from './store';
import ChildTabs from './ChildTabs';


export default class ParentTabs extends Component {
    constructor() {
        super();
        
        //this.binbedHandleTabClick = this.handleTabClick.bind(this);
    }
    
    getTabsView(tabs, parentTabRoute) {
        return tabs.map((val, i) => {
            let props = {};
            
            if (parentTabRoute && val.route == parentTabRoute) {
                props[this.ariaSelectedAttr] = true;
            }
            
            return (
                <li className="tabs-title" key={val.route}>
                    <Link to={"/" + val.route} >{val.name}</Link>
                </li>
            );
        });
    }
    
    render() {
        let {parentTabRoute, childTabRoute} = this.props.match.params;
        let parentTabs = getParentTabs();
        
        if (!parentTabRoute) {
            parentTabRoute = (parentTabs.length > 0) ? parentTabs[0].route : null;
        }
        
        if (parentTabRoute && !childTabRoute) {
            let childTabs = getChildTabs(parentTabRoute);
            
            childTabRoute = (childTabs.length > 0) ? childTabs[0].route : null;
        }

        return (
            <div className="row collapse navigator">
                <div className="small-3 columns parent-tabs">
                    <ul className="tabs vertical">
                        {this.getTabsView(parentTabs, parentTabRoute)}
                    </ul>
                </div>
                <div className="columns">
                    <div className="tabs-panel is-active parent-tabs-panel">
                        <ChildTabs parentTabRoute={parentTabRoute} childTabRoute={childTabRoute} location={this.props.location}/>
                    </div>
                </div>
            </div>
        );
    }
}
