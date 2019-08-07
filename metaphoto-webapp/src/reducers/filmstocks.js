import {
    SET_FILM_STOCKS,
    SET_SHOW_ADD_FILMSTOCK_MODAL,
    SET_SHOW_DELETE_FILMSTOCK_BUTTON,
    SET_SHOW_EDIT_FILMSTOCK_BUTTON
} from "../actions/actions";

const initialState = {
    filmStocks: [],
    showAddFilmstockModal: false,
    showDeleteFilmstockButton: false,
    showEditFilmstockButton: false
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

    if (action.type === SET_SHOW_DELETE_FILMSTOCK_BUTTON) {
        return {
            ...state,
            showDeleteFilmstockButton: action.showButton
        }
    }

    if (action.type === SET_SHOW_EDIT_FILMSTOCK_BUTTON) {
        return {
            ...state,
            showEditFilmstockButton: action.showButton
        }
    }

    return state;
}
