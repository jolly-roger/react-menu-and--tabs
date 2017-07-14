import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import {store, loadSection, Filter} from './store';


export default class SectionText extends Component {
    constructor (props) {
        super(props);
        
        this.parentRoute = props.parentRoute;
        this.childRoute = props.childRoute;
        this.sectionRoute = props.section.route;
        this.location = props.location;

        this.unsubscribeStore = store.subscribe(() => {
            let filter = new Filter();            
            let state = filter.findSection(this.parentRoute, this.childRoute, this.sectionRoute);

            this.setState(state);
        });
    }
    
    componentWillMount() {
        store.dispatch(loadSection(this.parentRoute, this.childRoute, this.sectionRoute));
    }
    
    componentWillReceiveProps(newProps) {
        if (this.parentRoute !== newProps.parentRoute || this.childRoute !== newProps.childRoute || this.sectionRoute !== newProps.section.route ||
            this.location != newProps.location) {
            this.parentRoute = newProps.parentRoute;
            this.childRoute = newProps.childRoute;
            this.sectionRoute = newProps.section.route;
            this.location = newProps.location;
            
            store.dispatch(loadSection(this.parentRoute, this.childRoute, this.sectionRoute, this.getInactivity()));
        }
    }
    
    componentWillUnmount() {
        this.unsubscribeStore();
    }
    
    getInactivity () {
        let query = queryString.parse(this.location.search);
        let collapse = query.collapse ? JSON.parse(query.collapse) : [];
        let isInactive = false;
        let indexOfSection = collapse.indexOf(this.sectionRoute);
        
        if (indexOfSection >= 0) {
            isInactive = true;
        }

        return isInactive;
    }
    
    render() {
        let query = queryString.parse(this.location.search);
        let collapse = query.collapse ? JSON.parse(query.collapse) : [];
        let fullRoute = `${this.parentRoute}/${this.childRoute}/${this.sectionRoute}`;
        let isInactive = '';
        let indexOfSection = collapse.indexOf(this.sectionRoute);
        
        if (!this.location.search && this.state.isInactive) {
            isInactive = 'inactive';
        } else {
            if (this.getInactivity()) {
                isInactive = 'inactive';
                collapse.splice(indexOfSection, 1);
            } else {
                collapse.push(this.sectionRoute);
            }
        }
        
        return (
            <div>
                <Link to={{pathname: this.props.location.pathname, search: 'collapse=' + JSON.stringify(collapse)}}>{this.props.section.name}</Link>
                <div className={isInactive}>
                    {fullRoute}
                    <br />
                    {this.state.text}
                </div>
            </div>
        );    
    }
}