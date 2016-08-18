import loremIpsum from 'lorem-ipsum-react-native';


export default function section (state, action) {
    switch (action.type) {
        case 'LOAD_SECTION':
            return {
                parentRoute: action.parentRoute,
                childRoute: action.childRoute,
                section: action.section,
                text: loremIpsum({
                    units: 'paragraphs'
                })
            };
            
            //return loremIpsum({
            //    units: 'paragraphs'
            //});
        
        case 'OPEN_SECTION':
            //return {
            //    parentRoute: action.parentRoute,
            //    childRoute: action.childRoute,
            //    section: action.section,
            //    testx: loremIpsum({
            //        units: 'paragraphs'
            //    })
            //};

            return loremIpsum({
                units: 'paragraphs'
            });
        default:
            return state;
    }
}