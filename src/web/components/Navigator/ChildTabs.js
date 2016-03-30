import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import BaseTabs from './BaseTabs';


export default class ChildTabs extends BaseTabs {
    constructor () {
        super();
        
        this.tabItemsId = 'tabItems';
    }
    
    updateTabRoute (props) {
        let {menuItemRoute, tabItemRoute} = props.params;
        let tabItems = props.route.menuConfig.getTabItems(menuItemRoute);

        if (!tabItemRoute) {
            browserHistory.replace('/' + menuItemRoute + '/' + tabItems[0].route);
        }
    }
    
    
    componentWillMount() {
        this.updateTabRoute(this.props);
    }
    
    componentWillReceiveProps(newProps) {
        this.updateTabRoute(newProps);
    }
    
    render() {
        let {menuItemRoute, tabItemRoute} = this.props.params;
        let tabItems = this.props.route.menuConfig.getTabItems(menuItemRoute);
        let binbedHandleTabItemClick = this.handleTabItemClick.bind(this);
        
        return (
            <div id={this.tabItemsId}>
                <ul className="tabs" onClick={binbedHandleTabItemClick}>
                    {tabItems.map((val, i) => {
                        let props = {};
                        let route = '/' + menuItemRoute + '/' + val.route;
                        let isActive = this.isActiveClass;

                        if ((tabItemRoute && val.route == tabItemRoute) ||
                            (!tabItemRoute && i == 0)) {
                            props[this.ariaSelectedAttr] = true;
                        } else {
                            isActive = '';
                        }

                        return (
                            <li className={'tabs-title ' + isActive}>
                                <Link to={route} {...props}>{val.name}</Link>
                            </li>
                        );
                    })}
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
