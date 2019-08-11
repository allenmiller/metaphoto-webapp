import {SET_FILMSTOCK_ID} from "../actions/film";

const initialState = {
    filmstockId: ""
};

export default(state = initialState, action) => {
    if (action.type === SET_FILMSTOCK_ID) {
        return {
            ...state,
            filmstockId: action.filmstockId
        }
    }

    return state;
}
