import { SET_FILMSTOCK_ID, FilmActionTypes, FilmState } from "./types";
import { setFilmstockId } from "./actions";

const initialState: FilmState = {
    filmstockId: "",
    setFilmstockId: setFilmstockId
};

export const filmReducer = (state = initialState, action: FilmActionTypes) : FilmState => {
    if (action.type === SET_FILMSTOCK_ID) {
        return {
            ...state,
            filmstockId: action.filmstockId
        }
    }

    return state;
}
