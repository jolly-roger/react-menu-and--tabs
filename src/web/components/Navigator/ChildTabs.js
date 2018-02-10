import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Filter} from './store';
import Sections from './Sections';
import TabLink from './TabLink';

import style from './Tabs.css';


export default function ChildTabs(props) {
    let filter = new Filter();
    let {parentTabRoute, childTabRoute} = props;
    let tabs = filter.getChildTabs(parentTabRoute);
    
    return (
        <div className={style.tabs}>
            <ul className={style.child_tabs}>
                {tabs.map((val) => {
                    return (
                      <TabLink link={val} currentRoute={childTabRoute} parentTabRoute={parentTabRoute} key={val.route} />
                    );
                })}
            </ul>
            <div>
                <Sections parentTabRoute={parentTabRoute} childTabRoute={childTabRoute} location={props.location}/>
            </div>
        </div>
    )
}
