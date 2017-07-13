import React, {Component} from 'react';

import {store, loadSection, findSection} from './store';


export default class SectionText extends Component {
    constructor (props) {
        super(props);
        
        this.parentRoute = props.parentRoute;
        this.childRoute = props.childRoute;
        this.sectionRoute = props.sectionRoute;

        this.unsubscribeStore = store.subscribe(() => {
            this.setState(findSection(this.parentRoute, this.childRoute, this.sectionRoute))
        });
    }
    
    componentWillMount() {
        store.dispatch(loadSection(this.parentRoute, this.childRoute, this.sectionRoute));
    }
    
    componentWillReceiveProps(newProps) {
        if (this.parentRoute !== newProps.parentRoute || this.childRoute !== newProps.childRoute || this.sectionRoute !== newProps.sectionRoute) {
            this.parentRoute = newProps.parentRoute;
            this.childRoute = newProps.childRoute;
            this.sectionRoute = newProps.sectionRoute;
            
            store.dispatch(loadSection(newProps.parentRoute, newProps.childRoute, newProps.sectionRoute));
        }
    }
    
    componentWillUnmount() {
        this.unsubscribeStore();
    }
    
    render() {
        let fullRoute = `${this.parentRoute}/${this.childRoute}/${this.sectionRoute}`;
        
        return (
            <div>
                {fullRoute}
                <br />
                {this.state.text}
            </div>
        );    
    }
}