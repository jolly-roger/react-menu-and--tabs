import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Filter} from './store';
import Sections from './Sections';
import TabLink from './TabLink';


export default function ChildTabs(props) {
    let filter = new Filter();
    let {parentTabRoute, childTabRoute} = props;
    let tabs = filter.getChildTabs(parentTabRoute);
    
    return (
        <div className="tabs">
            <ul className="child-tabs">
                {tabs.map((val) => {
                    return (
                      <TabLink link={val} currentRoute={childTabRoute} parentTabRoute={parentTabRoute} key={val.route} />
                    );
                })}
            </ul>
            <div className="child-tab-content">
                <Sections parentTabRoute={parentTabRoute} childTabRoute={childTabRoute} location={props.location}/>
            </div>
        </div>
    )
}
