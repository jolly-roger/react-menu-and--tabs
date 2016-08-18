import {createStore} from 'redux';

import reducers from './reducers';


const store = createStore(reducers);

export default store;

export {store};
export {loadSection, openSection, loadNavigation} from './actions';