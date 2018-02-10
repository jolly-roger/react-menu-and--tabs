import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import style from './TabLink.css';

export default function TabLink(props) {
    let route = "/" + props.link.route;
    let isActive = '';
    
    if (props.parentTabRoute) {
        route = '/' + props.parentTabRoute + '/' + props.link.route;
    } else if (props.childTabRoute) {
        route = '/' + props.link.route + '/' + props.childTabRoute;
    }

    if (props.currentRoute && props.currentRoute == props.link.route) {
        isActive = style.active;
    }
    
    return (
        <li className={isActive}>
            <Link to={route}>{props.link.name}</Link>
        </li>
    );
}