import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import SectionText from './SectionText';
import {getSections} from './store';


export default function Sections(props) {
    let {parentTabRoute, childTabRoute} = props;
    let sections = getSections(parentTabRoute, childTabRoute);
    let query = queryString.parse(props.location.search);
    let collapse = query.collapse ? JSON.parse(query.collapse) : [];

    return (
        <div>
            <ul>
                {sections.map((val, i) => {
                    let isInactive = '';
                    let sectionCollapse = [...collapse];
                    let indexOfSection = collapse.indexOf(val.route);
                    
                    if (indexOfSection >= 0) {
                        isInactive = 'inactive';
                        sectionCollapse.splice(indexOfSection, 1);
                    } else {
                        sectionCollapse.push(val.route);
                    }
        
                    return (
                        <li className="section" key={val.route}>
                            <Link to={{pathname: props.location.pathname, search: 'collapse=' + JSON.stringify(sectionCollapse)}}>{val.name}</Link>
                            <div className={isInactive}>
                                <SectionText parentRoute={parentTabRoute} childRoute={childTabRoute} sectionRoute={val.route} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
