import React, {Component} from 'react';

import store, {loadSection, openSection} from './store';


export default class SectionText extends Component {
    constructor (props) {
        super(props);
        
        this.parentRoute = props.parentRoute;
        this.childRoute = props.childRoute;
        this.section = props.section;
        
        this.bindedUpdateText = this.updateText.bind(this);
        
        store.subscribe(this.bindedUpdateText);
        
        store.dispatch(loadSection(this.parentRoute, this.childRoute, this.section));
        
        this.state = store.getState();
    }
    
    updateText() {
        let state = store.getState();
        
        if (this.parentRoute === state.parentRoute && this.childRoute === store.childRoute && this.section === state.section) {
            this.setState(state);
        }
    }
    
    render() {
        let fullRoute = `${this.parentRoute}/${this.childRoute}/${this.section}`;
        
        return (
            <div>
                {fullRoute}
                <br />
                {this.state.text}
            </div>
        );    
    }
}