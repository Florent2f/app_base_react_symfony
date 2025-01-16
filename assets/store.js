import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import * as env from './env'

import appReducer from './reducers/app';

// combine reducers
const rootReducer = combineReducers({
    app: appReducer
});

// // Enable redux dev tool
const composeEnhancers = (env.environnment == 'dev' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {}
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
