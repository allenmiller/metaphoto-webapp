import { SET_FILMSTOCK_ID, FilmActionTypes } from "./types";

const initialState = {
    filmstockId: ""
};

export const filmReducer = (state = initialState, action: FilmActionTypes) => {
    if (action.type === SET_FILMSTOCK_ID) {
        return {
            ...state,
            filmstockId: action.filmstockId
        }
    }

    return state;
}
