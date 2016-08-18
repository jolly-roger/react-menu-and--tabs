export const LOAD_SECTION = 'LOAD_SECTION';
export const LOAD_NAVIGATION = 'LOAD_NAVIGATION';


export function loadNavigation (navigation) {
    return {
        type: LOAD_NAVIGATION,
        navigation: navigation
    };
}

export function loadSection (parentRoute, childRoute, sectionRoute) {
    return {
        type: LOAD_SECTION,
        parentRoute: parentRoute,
        childRoute: childRoute,
        sectionRoute: sectionRoute
    };
}