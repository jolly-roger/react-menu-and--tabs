import React, {Component} from 'react';

import Section from './Section';
import {Filter} from './store';


export default function Sections(props) {
    let filter = new Filter();
    let {parentTabRoute, childTabRoute} = props;
    let sections = filter.getSections(parentTabRoute, childTabRoute);

    return (
        <div>
            <ul>
                {sections.map((val, i) => {
                    return (
                        <li className="section" key={val.route}>
                            <Section parentRoute={parentTabRoute} childRoute={childTabRoute} section={val} location={props.location} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
