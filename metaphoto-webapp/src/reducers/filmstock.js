import {ADD_FILM_STOCK, SET_FILMNAME} from "../actions/actions";

const initialState = {
    filmStock: {},
    filmName: ""
};

export default(state = initialState, action) => {
    if (action.type === ADD_FILM_STOCK) {
        return {
            ...state,
            filmStock: [...state.filmStock, action.filmStock]
        };
    }

    if (action.type === SET_FILMNAME) {
        return {
            ...state,
            filmName: [action.filmName]
        }
    }

    return state;
}
