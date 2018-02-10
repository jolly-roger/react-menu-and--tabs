import loremIpsum from 'lorem-ipsum-react-native';

import { LOAD_NAVIGATION, LOAD_SECTION } from './constants';
import { Filter } from './filter';


export default function navigator(state, action) {
  switch (action.type) {
    case LOAD_NAVIGATION: {
      return action.navigation;
    }
    case LOAD_SECTION: {
      const newState = Object.assign({}, state);
      const filter = new Filter(newState);
      const section = filter.findSection(
        action.parentRoute,
        action.childRoute,
        action.sectionRoute,
      );

      if (!section.text) {
        section.text = loremIpsum({
          units: 'paragraphs',
        });
      }

      if (typeof action.isInactive !== 'undefined') {
        section.isInactive = action.isInactive;
      }

      return newState;
    }
    default: {
      return state;
    }
  }
}
