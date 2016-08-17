export const LOAD_SECTION = 'LOAD_SECTION';
export const OPEN_SECTION = 'OPEN_SECTION';


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