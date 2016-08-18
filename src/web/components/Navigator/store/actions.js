export const LOAD_SECTION = 'LOAD_SECTION';
export const OPEN_SECTION = 'OPEN_SECTION';
export const LOAD_NAVIGATION = 'LOAD_NAVIGATION';


export function loadNavigation (navigation) {
    return {
        type: LOAD_NAVIGATION,
        navigation: navigation
    };
}

export function loadSection (parentRoute, childRoute, section) {
    return {
        type: LOAD_SECTION,
        parentRoute: parentRoute,
        childRoute: childRoute,
        section: section
    };
}

export function openSection (parentRoute, childRoute, section) {
    return {
        type: LOAD_SECTION,
        parentRoute: parentRoute,
        childRoute: childRoute,
        section: section
    };
}