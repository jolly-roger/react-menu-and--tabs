import React, {Component} from 'react';


export default class App extends Component {
    constructor () {
        super();
        
        this.tabsContainerId = 'tabsContainer';
        this.ariaSelectedAttr = 'aria-selected';
        this.isActiveClass = 'is-active';
    }
    
    handleTabClick(event) {
        let ariaSelected = Boolean(event.target.getAttribute(this.ariaSelectedAttr));
        let tabLinks = Array.from(document.querySelectorAll(`#${this.tabsContainerId} .tabs-title a`));
        
        if (ariaSelected) {
            return;
        } else {
            let tabs = Array.from(document.querySelectorAll(`#${this.tabItemsId} .tabs-title`));
            
            tabLinks.forEach((el) => el.removeAttribute(this.ariaSelectedAttr));
            tabs.forEach((el) => el.classList.remove(this.isActiveClass));
            
            event.target.setAttribute(this.ariaSelectedAttr, true);
            event.target.parentNode.classList.add(this.isActiveClass);
        }

        tabLinks.forEach((el) => el.blur());
    }
}