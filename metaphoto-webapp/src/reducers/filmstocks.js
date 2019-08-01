import {SET_FILM_STOCKS, SET_SHOW_ADD_FILMSTOCK_MODAL} from "../actions/actions";

const initialState = {
    filmStocks: [],
    showAddFilmstockModal: false
};

export default(state = initialState, action) => {
    if (action.type === SET_FILM_STOCKS) {
        return {
            ...state,
            filmStocks: [...action.filmStocks]
        };
    }

    if (action.type === SET_SHOW_ADD_FILMSTOCK_MODAL) {
        return {
            ...state,
            showAddFilmstockModal: action.showModal
        }
    }
    return state;
}
