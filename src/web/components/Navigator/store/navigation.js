import {createStore} from 'redux';

import reducers from './reducers';


const store = createStore(reducers);

export {store};


function getStateArray() {
    let state = store.getState();
    
    return Object.keys(state).map( key => state[key]);
}

export function getParentTabs() {
    return getStateArray();
}

export function getChildTabs(parentTabRoute) {
    return findParentTab(parentTabRoute).tabs;
}

export function getSections(parentTabRoute, childTabRoute) {
    return findChildTab(parentTabRoute, childTabRoute).sections;
}

export function findParentTab(parentTabRoute) {
    return getStateArray().find((tab) => tab.route === parentTabRoute);
}

export function findChildTab(parentTabRoute, childTabRoute) {
    let parentTab = findParentTab(parentTabRoute);
    
    return parentTab.tabs.find((tab) => tab.route === childTabRoute);
}

export function findSection(parentTabRoute, childTabRoute, sectionRoute) {
    return getSections(parentTabRoute, childTabRoute)
        .find((section) => section.route === sectionRoute);
}