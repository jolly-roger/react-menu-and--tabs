import React, {Component} from 'react';

import {Filter} from './store';
import ChildTabs from './ChildTabs';
import TabLink from './TabLink';

import style from './Tabs.css';
import {navigator as navigatorClass} from './Navigator.css';


export default function ParentTabs (props) {
    let filter = new Filter();
    let {parentTabRoute, childTabRoute} = props.match.params;
    let parentTabs = filter.getParentTabs();
    
    if (!parentTabRoute) {
        parentTabRoute = (parentTabs.length > 0) ? parentTabs[0].route : null;
    }
    
    if (parentTabRoute && !childTabRoute) {
        let childTabs = filter.getChildTabs(parentTabRoute);
        
        childTabRoute = (childTabs.length > 0) ? childTabs[0].route : null;
    }

    return (
        <div className={navigatorClass}>
            <div className={style.tabs + ' ' +  style.parent_tabs}>
                <ul>
                    {parentTabs.map((val) => {
                        let localChildTabs = filter.getChildTabs(val.route);
                        let localChildTabRoute = childTabRoute;
                        
                        if (localChildTabs.indexOf(childTabRoute) < 0) {
                            localChildTabRoute = localChildTabs[0].route;
                        }
                        
                        return (
                          <TabLink link={val} currentRoute={parentTabRoute} childTabRoute={localChildTabRoute} key={val.route} />
                        );
                    })}
                </ul>
            </div>
            <div className={style.columns}>
                <div>
                    <ChildTabs parentTabRoute={parentTabRoute} childTabRoute={childTabRoute} location={props.location}/>
                </div>
            </div>
        </div>
    );
}
