import React, {Component} from 'react';


export default class App extends Component {
    constructor () {
        super();
        
        this.tabItemsId = 'menuItems';
        this.ariaSelectedAttr = 'aria-selected';
        this.isActiveClass = 'is-active';
    }
    
    handleTabItemClick(event) {
        let ariaSelected = Boolean(event.target.getAttribute(this.ariaSelectedAttr));

        if (ariaSelected) {
            return;
        } else {
            $('#' + this.tabItemsId + ' .tabs-title a').removeAttr(this.ariaSelectedAttr);
            $('#' + this.tabItemsId + ' .tabs-title').removeClass(this.isActiveClass);
            
            $(event.target).attr(this.ariaSelectedAttr, true).parent().addClass(this.isActiveClass);
        }
        
        this.initFoundation();
    }
    
    initFoundation() {
        $('#' + this.tabItemsId).foundation();
    }
    
    componentDidMount() {
        this.initFoundation();
    }
    
    componentDidUpdate() {
        this.initFoundation();
    }
}