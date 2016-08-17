import React, {Component} from 'react';
import {Router, browserHistory, hashHistory} from 'react-router';

import NavigationConfig from './NavigationConfig';
import ParentTabs from './ParentTabs';
import ChildTabs from './ChildTabs';
import Sections from './Sections';


export default class Navigator extends Component {
    getRoutes (navigationConfig) {
        let parentTabs = navigationConfig.getParentTabs();
        let defaultParentTab = (parentTabs.length > 0) ? parentTabs[0] : null;
        
        let routes = {
            path: '/',
            component: ParentTabs,
            navigationConfig: navigationConfig,
            childRoutes: [
                {
                    path: '/:parentTabRoute',
                    component: ChildTabs,
                    navigationConfig: navigationConfig,
                    childRoutes: [{
                        path: '/:parentTabRoute/:childTabRoute',
                        component: Sections,
                        navigationConfig: navigationConfig
                    }]
                }
            ]
        };
        
        if (defaultParentTab) {
            let childTabs = navigationConfig.getChildTabs(defaultParentTab.route);
            let defaultRoute;
            
            if (childTabs.length > 0) {
                defaultRoute = `/${defaultParentTab.route}/${childTabs[0].route}`;
            } else {
                defaultRoute = `/${defaultParentTab.route}`;
            }
            
            routes.indexRoute = {
                onEnter: (nextState, replace) => replace(defaultRoute)
            };
        }
        
        return routes;
    };
    
    render() {
        let {navigationConfig} = this.props;
        let routes = this.getRoutes(new NavigationConfig(navigationConfig));
        
        return (
            <Router routes={routes} history={browserHistory} />
        );
    }
}