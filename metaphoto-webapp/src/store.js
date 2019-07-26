import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import config from './config';

const initialState = {};
const enhancers=[];
const middleware = [
    thunk,
    routerMiddleware
];

if (config.env === 'dev') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
