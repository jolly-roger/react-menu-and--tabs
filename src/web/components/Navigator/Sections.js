import React, {Component} from 'react';
import queryString from 'query-string';

import Section from './Section';
import {Filter} from './store';


export default function Sections(props) {
    let filter = new Filter();
    let {parentTabRoute, childTabRoute} = props;
    let sections = filter.getSections(parentTabRoute, childTabRoute);
    let query = queryString.parse(props.location.search);
    let collapse = query.collapse ? JSON.parse(query.collapse) : [];
    
    if (!props.location.search) {
        collapse = sections.reduce((res, section) => {
            if (section.isInactive) {
                res.push(section.route);
            }
            
            return res;
        }, []);
    }

    return (
        <div>
            <ul>
                {sections.map((val, i) => {
                    return (
                        <li key={val.route}>
                            <Section parentRoute={parentTabRoute} childRoute={childTabRoute} section={val} collapse={collapse} location={props.location}/>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
