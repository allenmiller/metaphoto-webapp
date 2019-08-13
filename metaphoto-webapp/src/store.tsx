import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import config from './config';

export const history = require('history').createBrowserHistory;

const initialState = {};
const enhancers=[];
const middleware = [
    thunk,
    routerMiddleware(history)
];

if (config.env === 'dev') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25});

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const AppStore = createStore(rootReducer, initialState, composedEnhancers);

export default AppStore;
