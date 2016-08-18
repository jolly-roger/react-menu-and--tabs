import React, {Component} from 'react';
import {Router, browserHistory, hashHistory} from 'react-router';

import {getParentTabs, getChildTabs} from './store';
import ParentTabs from './ParentTabs';
import ChildTabs from './ChildTabs';
import Sections from './Sections';


export default class Navigator extends Component {
    getRoutes () {
        let parentTabs = getParentTabs();
        let defaultParentTab = (parentTabs.length > 0) ? parentTabs[0] : null;
        
        let routes = {
            path: '/',
            component: ParentTabs,
            childRoutes: [
                {
                    path: '/:parentTabRoute',
                    component: ChildTabs,
                    childRoutes: [{
                        path: '/:parentTabRoute/:childTabRoute',
                        component: Sections
                    }]
                }
            ]
        };
        
        if (defaultParentTab) {
            let childTabs = getChildTabs(defaultParentTab.route);
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
        let routes = this.getRoutes();
        
        return (
            <Router routes={routes} history={browserHistory} />
        );
    }
}