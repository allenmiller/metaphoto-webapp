import {combineReducers} from "redux";
import {History} from 'history';
import {connectRouter} from 'connected-react-router';

import authenticationReducer from "./authentication";
//import feedback from "./feedback";
//import film from "./film";
//import filmstock from "./filmstock";
//import filmstocks from "./filmstocks";

const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,
//    feedback,
//    film,
//    filmstock,
//    filmstocks
})

export default rootReducer;
