import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {store, loadSection, Filter} from './store';

import style from './Section.css';


export default class SectionText extends Component {
    constructor (props) {
        super(props);
        
        this.parentRoute = props.parentRoute;
        this.childRoute = props.childRoute;
        this.sectionRoute = props.section.route;
        this.collapse = props.collapse;

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
            this.collapse != newProps.collapse) {
            this.parentRoute = newProps.parentRoute;
            this.childRoute = newProps.childRoute;
            this.sectionRoute = newProps.section.route;
            this.collapse = newProps.collapse;
            
            store.dispatch(loadSection(this.parentRoute, this.childRoute, this.sectionRoute, this.getInactivity()));
        }
    }
    
    componentWillUnmount() {
        this.unsubscribeStore();
    }
    
    getInactivity () {
        let isInactive = false;
        let indexOfSection = this.collapse.indexOf(this.sectionRoute);
        
        if (indexOfSection >= 0) {
            isInactive = true;
        }

        return isInactive;
    }
    
    render() {
        let fullRoute = `${this.parentRoute}/${this.childRoute}/${this.sectionRoute}`;
        let isInactive = '';
        let sectionCollapse = [...this.collapse];
        let indexOfSection = sectionCollapse.indexOf(this.sectionRoute);
        
        if ((!this.props.location.search && this.state.isInactive) || this.getInactivity()) {
            isInactive = style.inactive;
            sectionCollapse.splice(indexOfSection, 1);
        } else {
            sectionCollapse.push(this.sectionRoute);
        }
        
        return (
            <div>
                <Link to={{pathname: this.props.location.pathname, search: 'collapse=' + JSON.stringify(sectionCollapse)}}>{this.props.section.name}</Link>
                <div className={isInactive}>
                    {fullRoute}
                    <br />
                    {this.state.text}
                </div>
            </div>
        );    
    }
}