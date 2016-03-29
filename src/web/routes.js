import React from 'react';
import App from './components/App';
import MenuItem from './components/MenuItem';
import TabItem from './components/TabItem';


export function getRoutes (menuConfig) {
    let defaultMenuItem = menuConfig.getMenuItems()[0];
    let defaultRoute = '/' + defaultMenuItem.route + '/' +
        menuConfig.getTabItems(defaultMenuItem.route)[0].route;

    return {
        path: '/',
        component: App,
        indexRoute: {
            onEnter: (nextState, replace) => replace(defaultRoute)
        },
        menuConfig: menuConfig,
        childRoutes: [
            {
                path: '/:menuItemRoute',
                component: MenuItem,
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