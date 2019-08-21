import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import {authenticationReducer} from './authentication/reducers';
import {feedbackReducer} from './feedback/reducers';
import { filmReducer } from './film/reducers';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    feedback: feedbackReducer,
    film: filmReducer
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
