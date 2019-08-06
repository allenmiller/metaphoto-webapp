import {combineReducers} from "redux";

import authentication from "./authentication";
import feedback from "./feedback";
import filmstock from "./filmstock";
import filmstocks from "./filmstocks";

export default combineReducers({
    authentication,
    feedback,
    filmstock,
    filmstocks
})
