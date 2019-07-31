import { ADD_FILM_STOCK } from "../actions/actions";

const initialState = {
    filmStocks: [{}]
};

export default(state = initialState, action) => {
    switch (action.type) {
        case ADD_FILM_STOCK:
            return {
                ...state,
                filmStocks: [...state.filmStocks, action.addFilmStock]
            };
        default:
            return state;
    }
}
