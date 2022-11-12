
import { createStore } from 'redux';

import reducers from "./reducers/index";


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(reducers);

export default store;