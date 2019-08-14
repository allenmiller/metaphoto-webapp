import { createStore, applyMiddleware } from 'redux';
import {createBrowserHistory} from 'history';
import rootReducer from './reducers/root-reducer';
import { routerMiddleware as createRouterMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);
const initialState = {};
const middleware = [
    thunk,
    routerMiddleware
];

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware)
);

const store = createStore(rootReducer(history), initialState, composedEnhancers);

export default store;
