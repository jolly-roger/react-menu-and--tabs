import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import BaseTabs from './BaseTabs';
import {getChildTabs} from './store';
import Sections from './Sections';


export default class ChildTabs extends Component {
    constructor () {
        super();
        
        //this.binbedHandleTabClick = this.handleTabClick.bind(this);
    }
    
    getTabsView(tabs, parentTabRoute, childTabRoute) {
        return tabs.map((val, i) => {
            let props = {};
            let route = '/' + parentTabRoute + '/' + val.route;
            let isActive = this.isActiveClass;

            if ((childTabRoute && val.route == childTabRoute) ||
                (!childTabRoute && i == 0)) {
                props[this.ariaSelectedAttr] = true;
            } else {
                isActive = '';
            }

            return (
                <li className={'tabs-title ' + isActive} key={val.route}>
                    <Link to={route}>{val.name}</Link>
                </li>
            );
        });
    }
    
    render() {
        let {parentTabRoute, childTabRoute} = this.props;
        let tabs = getChildTabs(parentTabRoute);
        
        return (
            <div>
                <ul className="tabs">
                    {this.getTabsView(tabs, parentTabRoute, childTabRoute)}
                </ul>
                <div className="tabs-content">
                    <div className="tabs-panel is-active">
                        <Sections parentTabRoute={parentTabRoute} childTabRoute={childTabRoute} location={this.props.location}/>
                    </div>
                </div>
            </div>
        )
    }
}
