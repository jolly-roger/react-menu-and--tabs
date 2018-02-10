import { LOAD_NAVIGATION, LOAD_SECTION } from './constants';

export function loadNavigation(navigation) {
  return {
    type: LOAD_NAVIGATION,
    navigation,
  };
}

export function loadSection(parentRoute, childRoute, sectionRoute, isInactive) {
  return {
    type: LOAD_SECTION,
    parentRoute,
    childRoute,
    sectionRoute,
    isInactive,
  };
}
