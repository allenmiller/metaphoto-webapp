import { createStore, applyMiddleware, compose } from 'redux';
import {createBrowserHistory} from 'history';
import rootReducer from './reducers/root-reducer';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import config from './config';
import AuthenticationState from './reducers/authentication';
export const history = createBrowserHistory();

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

const store = createStore(rootReducer(history), initialState, composedEnhancers);

export default store;
