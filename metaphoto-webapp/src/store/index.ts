import { createStore, combineReducers, applyMiddleware } from 'redux';
//import {createBrowserHistory} from 'history';
//import { routerMiddleware as createRouterMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

//export const history = createBrowserHistory();
//const routerMiddleware = createRouterMiddleware(history);

import {authenticationReducer} from './authentication/reducers';
import {feedbackReducer} from './feedback/reducers';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    feedback: feedbackReducer
})

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );
    return store;
}
