import { ADD_FILM_STOCKS } from "../actions/actions";

const initialState = {
    filmStocks: [{}]
};

export default(state = initialState, action) => {
    switch (action.type) {
        case ADD_FILM_STOCKS:
            return {
                ...state,
                filmStocks: [...state.filmStocks, ...action.addFilmStocks]
            };
        default:
            return state;
    }
}
