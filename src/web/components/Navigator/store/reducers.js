import loremIpsum from 'lorem-ipsum-react-native';

import {Filter} from './filter';


export default function navigator (state, action) {
    switch (action.type) {
        case 'LOAD_NAVIGATION':
            return action.navigation;
        case 'LOAD_SECTION':
            let newState = Object.assign({}, state);
            let filter = new Filter(newState);
            let section = filter.findSection(action.parentRoute, action.childRoute, action.sectionRoute);
            
            !section.text && (section.text = loremIpsum({
                    units: 'paragraphs'
                }));
            
            if (typeof action.isInactive !== 'undefined') {
                section.isInactive = action.isInactive;
            }
            
            return newState;
        default:
            return state;
    }
}