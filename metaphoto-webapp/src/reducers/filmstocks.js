import { ADD_FILM_STOCKS } from "../actions/actions";

const initialState = {
    filmStocks: []
};

export default(state = initialState, action) => {
    if (action.type === ADD_FILM_STOCKS) {
        return {
            ...state,
            filmStocks: [...state.filmStocks, ...action.filmStocks]
        };
    }
    return state;
}
