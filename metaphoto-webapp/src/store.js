import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import config from './config';

export const history = createHistory();

const initialState = {};
const enhancers=[];
const middleware = [
    thunk,
    routerMiddleware(history)
];

if (config.env === 'dev') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

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
