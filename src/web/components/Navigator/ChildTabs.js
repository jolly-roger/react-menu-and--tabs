import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import BaseTabs from './BaseTabs';


export default class ChildTabs extends BaseTabs {
    constructor () {
        super();
        
        this.tabsContainerId = 'childTabsContainer';
        
        this.binbedHandleTabClick = this.handleTabClick.bind(this);
    }
    
    updateTabRoute (props) {
        let {parentTabRoute, childTabRoute} = props.params;
        let tabItems = props.route.navigationConfig.getChildTabs(parentTabRoute);

        if (!childTabRoute) {
            browserHistory.replace('/' + parentTabRoute + '/' + tabItems[0].route);
        }
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
                <li className={'tabs-title ' + isActive}>
                    <Link to={route} {...props}>{val.name}</Link>
                </li>
            );
        });
    }
    
    componentWillMount() {
        this.updateTabRoute(this.props);
    }
    
    componentWillReceiveProps(newProps) {
        this.updateTabRoute(newProps);
    }
    
    render() {
        let {parentTabRoute, childTabRoute} = this.props.params;
        let tabs = this.props.route.navigationConfig.getChildTabs(parentTabRoute);
        
        return (
            <div id={this.tabsContainerId}>
                <ul className="tabs" onClick={this.binbedHandleTabClick}>
                    {this.getTabsView(tabs, parentTabRoute, childTabRoute)}
                </ul>
                <div className="tabs-content">
                    <div className="tabs-panel is-active">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
