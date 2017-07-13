import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import SectionText from './SectionText';
import {getSections} from './store';


export default class Sections extends Component {
    constructor (props) {
        super(props);

        this.isInactiveClass = 'inactive';
    }
    
    getSectionsView(sections, collapse, parentTabRoute, childTabRoute) {
        return sections.map((val, i) => {
            let isInactive = '';
            let sectionCollapse = [...collapse];
            let indexOfSection = collapse.indexOf(val.route);
            
            if (indexOfSection > -1) {
                isInactive = this.isInactiveClass;
                sectionCollapse.splice(indexOfSection, 1);
            } else {
                sectionCollapse.push(val.route);
            }

            return (
                <li className="section" key={val.route}>
                    <Link to={{pathname: this.props.location.pathname, search: 'collapse=' + JSON.stringify(sectionCollapse)}}>{val.name}</Link>
                    <div className={isInactive}>
                        <SectionText parentRoute={parentTabRoute} childRoute={childTabRoute} sectionRoute={val.route} />
                    </div>
                </li>
            );
        });
    }
    
    render() {
        let {parentTabRoute, childTabRoute} = this.props;
        let sections = getSections(parentTabRoute, childTabRoute);
        let query = queryString.parse(this.props.location.search);
        let collapse = query.collapse ? JSON.parse(query.collapse) : [];

        return (
            <div>
                <ul>
                    {this.getSectionsView(sections, collapse, parentTabRoute, childTabRoute)}
                </ul>
            </div>
        )
    }
}
