import {createStore} from 'redux';

import reducers from './reducers';


const store = createStore(reducers);


class Filter {
    constructor(state) {
        this.state = store.getState();
        
        if (state) {
            this.state = state;
        }
    }
    
    getStateArray() {
        return Object.keys(this.state).map( key => this.state[key]);
    }

    getParentTabs() {
        return this.getStateArray();
    }

    getChildTabs(parentTabRoute) {
        return this.findParentTab(parentTabRoute).tabs;
    }

    getSections(parentTabRoute, childTabRoute) {
        return this.findChildTab(parentTabRoute, childTabRoute).sections;
    }

    findParentTab(parentTabRoute) {
        return this.getStateArray().find((tab) => tab.route === parentTabRoute);
    }

    findChildTab(parentTabRoute, childTabRoute) {
        let parentTab = this.findParentTab(parentTabRoute);
        
        return parentTab.tabs.find((tab) => tab.route === childTabRoute);
    }

    findSection(parentTabRoute, childTabRoute, sectionRoute) {
        return this.getSections(parentTabRoute, childTabRoute)
            .find((section) => section.route === sectionRoute);
    }
}

export {store, Filter};