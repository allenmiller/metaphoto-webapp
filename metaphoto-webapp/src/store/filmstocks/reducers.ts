import {
    SET_FILM_STOCKS,
    SET_SELECTED_FILMSTOCK_KEY,
    SET_SELECTED_FILMSTOCK_ROW,
    SET_SHOW_ADD_FILMSTOCK_MODAL,
    SET_SHOW_ADD_FILMSTOCK_BUTTON,
    SET_SHOW_DELETE_FILMSTOCK_BUTTON,
    SET_SHOW_EDIT_FILMSTOCK_BUTTON,
    SET_MODAL_MODE,
    FilmstocksState,
    FilmstocksActionTypes
} from "./types";

const initialState: FilmstocksState = {
    filmstocks: [],
    modalMode: "",
    showAddFilmstockModal: false,
    showAddFilmstockButton: true,
    showDeleteFilmstockButton: false,
    showEditFilmstockButton: false,
    selectedFilmstockKey: "",
    selectedFilmstockRow: {}
};

export const filmstocksReducer = (state = initialState, action: FilmstocksActionTypes): FilmstocksState => {
    if (action.type === SET_FILM_STOCKS) {
        return {
            ...state,
            filmstocks: [...action.filmstocks]
        };
    }

    if (action.type === SET_MODAL_MODE) {
        return {
            ...state,
            modalMode: action.modalMode
        }
    }

    if (action.type === SET_SELECTED_FILMSTOCK_KEY) {
        return {
            ...state,
            selectedFilmstockKey: action.selectedFilmstockKey
        }
    }

    if (action.type === SET_SELECTED_FILMSTOCK_ROW) {
        return {
            ...state,
            selectedFilmstockRow: action.selectedFilmstockRow
        }
    }

    if (action.type === SET_SHOW_ADD_FILMSTOCK_MODAL) {
        return {
            ...state,
            showAddFilmstockModal: action.showAddFilmstockModal
        }
    }

    if (action.type === SET_SHOW_ADD_FILMSTOCK_BUTTON) {
        return {
            ...state,
            showAddFilmstockButton: action.showAddFilmstockButton
        }
    }

    if (action.type === SET_SHOW_DELETE_FILMSTOCK_BUTTON) {
        return {
            ...state,
            showDeleteFilmstockButton: action.showDeleteFilmstockButton
        }
    }

    if (action.type === SET_SHOW_EDIT_FILMSTOCK_BUTTON) {
        return {
            ...state,
            showEditFilmstockButton: action.showEditFilmstockButton
        }
    }

    return state;
}
