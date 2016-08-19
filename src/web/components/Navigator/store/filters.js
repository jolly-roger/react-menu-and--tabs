import {createStore} from 'redux';

import reducers from './reducers';


const store = createStore(reducers);


function getStateArray() {
    let state = store.getState();
    
    return Object.keys(state).map( key => state[key]);
}

function getParentTabs() {
    return getStateArray();
}

function getChildTabs(parentTabRoute) {
    return findParentTab(parentTabRoute).tabs;
}

function getSections(parentTabRoute, childTabRoute) {
    return findChildTab(parentTabRoute, childTabRoute).sections;
}

function findParentTab(parentTabRoute) {
    return getStateArray().find((tab) => tab.route === parentTabRoute);
}

function findChildTab(parentTabRoute, childTabRoute) {
    let parentTab = findParentTab(parentTabRoute);
    
    return parentTab.tabs.find((tab) => tab.route === childTabRoute);
}

function findSection(parentTabRoute, childTabRoute, sectionRoute) {
    return getSections(parentTabRoute, childTabRoute)
        .find((section) => section.route === sectionRoute);
}

export {store, getParentTabs, getChildTabs, getSections, findParentTab, findChildTab, findSection};