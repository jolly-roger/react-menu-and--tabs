import React, {Component} from 'react';
import {Router, browserHistory, hashHistory} from 'react-router';

import MenuConfig from './MenuConfig';
import ParentTabs from './ParentTabs';
import ChildTabs from './ChildTabs';
import TabItem from './TabItem';


export default class Navigator extends Component {
    getRoutes (menuConfig) {
        let defaultMenuItem = menuConfig.getMenuItems()[0];
        let defaultRoute = '/' + defaultMenuItem.route + '/' +
            menuConfig.getTabItems(defaultMenuItem.route)[0].route;
    
        return {
            path: '/',
            component: ParentTabs,
            indexRoute: {
                onEnter: (nextState, replace) => replace(defaultRoute)
            },
            menuConfig: menuConfig,
            childRoutes: [
                {
                    path: '/:menuItemRoute',
                    component: ChildTabs,
                    menuConfig: menuConfig,
                    childRoutes: [{
                        path: '/:menuItemRoute/:tabItemRoute',
                        component: TabItem,
                        menuConfig: menuConfig
                    }]
                }
            ]
        };
    };
    
    render() {
        let {menuConfig} = this.props;
        let routes = this.getRoutes(new MenuConfig(menuConfig));
        
        return (
            <Router routes={routes} history={browserHistory} />
        );
    }
}