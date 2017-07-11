import React, {Component} from 'react';

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

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
        return (
            <BrowserRouter>
                <div>
                    <Route exact path={'/:parentTabRoute'} component={ParentTabs} />
                    <Route path={'/:parentTabRoute/:childTabRoute'} component={ParentTabs} />
                </div>
            </BrowserRouter>
        );
    }
}