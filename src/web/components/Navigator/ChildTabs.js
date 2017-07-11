import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory';
import {Link} from 'react-router-dom';

import BaseTabs from './BaseTabs';
import {getChildTabs} from './store';
import Sections from './Sections';


const history = createHistory();


export default class ChildTabs extends BaseTabs {
    constructor () {
        super();
        
        this.tabsContainerId = 'childTabsContainer';
        
        this.binbedHandleTabClick = this.handleTabClick.bind(this);
    }
    
    updateTabRoute (props) {
        let {parentTabRoute, childTabRoute} = props;
        let tabItems = getChildTabs(parentTabRoute);

        if (!childTabRoute) {
            history.replace('/' + parentTabRoute + '/' + tabItems[0].route);
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
        let {parentTabRoute, childTabRoute} = this.props;
        let tabs = getChildTabs(parentTabRoute);
        
        return (
            <div id={this.tabsContainerId}>
                <ul className="tabs" onClick={this.binbedHandleTabClick}>
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
