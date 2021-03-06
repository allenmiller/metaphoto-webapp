export const SET_SHOW_ADD_FILMSTOCK_MODAL = 'SET_SHOW_ADD_FILMSTOCK_MODAL';
export const SET_FILM_STOCKS = 'SET_FILM_STOCKS';
export const SET_SHOW_ADD_FILMSTOCK_BUTTON = 'SET_SHOW_ADD_FILMSTOCK_BUTTON';
export const SET_SHOW_DELETE_FILMSTOCK_BUTTON = 'SET_SHOW_DELETE_FILMSTOCK_BUTTON';
export const SET_SHOW_EDIT_FILMSTOCK_BUTTON = 'SET_SHOW_EDIT_FILMSTOCK_BUTTON';
export const SET_SELECTED_FILMSTOCK_KEY = 'SET_SELECTED_FILMSTOCK_KEY';
export const SET_SELECTED_FILMSTOCK_ROW = 'SET_SELECTED_FILMSTOCK_ROW';
export const SET_MODAL_MODE = 'SET_MODAL_MODE';

export function setFilmStocks(filmStocks) {
    return {
        type: SET_FILM_STOCKS,
        filmStocks
    }
}

export function setSelectedFilmstockKey(selectedFilmstockKey) {
    return {
        type: SET_SELECTED_FILMSTOCK_KEY,
        selectedFilmstockKey
    }
}

export function setSelectedFilmstockRow(selectedFilmstockRow) {
    return {
        type: SET_SELECTED_FILMSTOCK_ROW,
        selectedFilmstockRow
    }
}

export function setShowAddFilmstockModal(showModal) {
    return {
        type: SET_SHOW_ADD_FILMSTOCK_MODAL,
        showModal
    }
}

export function setShowAddFilmstockButton(showButton) {
    return {
        type: SET_SHOW_ADD_FILMSTOCK_BUTTON,
        showButton
    }
}

export function setShowDeleteFilmstockButton(showButton) {
    return {
        type: SET_SHOW_DELETE_FILMSTOCK_BUTTON,
        showButton
    }
}

export function setShowEditFilmstockButton(showButton) {
    return {
        type: SET_SHOW_EDIT_FILMSTOCK_BUTTON,
        showButton
    }
}

export function setModalMode(modalMode) {
    return {
        type : SET_MODAL_MODE,
        modalMode
    }
}
