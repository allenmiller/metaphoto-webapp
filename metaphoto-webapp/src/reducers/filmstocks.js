import { ADD_FILM_STOCK, SET_FILM_STOCKS } from "../actions/actions";

const initialState = {
    filmStocks: []
};

export default(state = initialState, action) => {
    if (action.type === SET_FILM_STOCKS) {
        return {
            ...state,
            filmStocks: [...action.filmStocks]
        };
    }
    if (action.type === ADD_FILM_STOCK) {
        return {
            ...state,
            filmStocks: [...state.filmStocks, action.filmStocks]  //TODO: filter duplicates.
        };
    }
    return state;
}
