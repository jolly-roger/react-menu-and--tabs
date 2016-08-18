import loremIpsum from 'lorem-ipsum-react-native';

import {findSection} from './navigation';


export default function navigator (state, action) {
    switch (action.type) {
        case 'LOAD_NAVIGATION':
            return action.navigation;
        case 'LOAD_SECTION':
            let newState = Object.assign({}, state);
            let section = findSection(action.parentRoute, action.childRoute, action.sectionRoute);
        
            !section.text && (section.text = loremIpsum({
                    units: 'paragraphs'
                }));
            
            return newState;
        default:
            return state;
    }
}