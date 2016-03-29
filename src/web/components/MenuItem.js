import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import NavLink from './NavLink';
import BaseTabs from './BaseTabs';


export default class MenuItem extends BaseTabs {
    constructor () {
        super();
        
        this.tabItemsId = 'tabItems';
    }
    
    updateTabRoute (props) {
        const {menuItemRoute, tabItemRoute} = props.params;
        const tabItems = props.route.menuConfig.getTabItems(menuItemRoute);

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
        const {menuItemRoute, tabItemRoute} = this.props.params;
        const tabItems = this.props.route.menuConfig.getTabItems(menuItemRoute);
        const binbedHandleTabItemClick = this.handleTabItemClick.bind(this);
        
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
                                <NavLink to={route} {...props}>{val.name}</NavLink>
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
