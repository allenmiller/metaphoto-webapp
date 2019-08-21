import {
    SET_FILM_STOCKS,
    SET_MODAL_MODE,
    SET_SELECTED_FILMSTOCK_KEY,
    SET_SELECTED_FILMSTOCK_ROW,
    SET_SHOW_ADD_FILMSTOCK_BUTTON,
    SET_SHOW_ADD_FILMSTOCK_MODAL,
    SET_SHOW_DELETE_FILMSTOCK_BUTTON,
    SET_SHOW_EDIT_FILMSTOCK_BUTTON,
    SetFilmstocks,
    SetModalMode,
    SetSelectedFilmstockKey,
    SetSelectedFilmstockRow,
    SetShowAddFilmstockModal,
    SetShowAddFilmstockButton,
    SetShowDeleteFilmstockButton,
    SetShowEditFilmstockButton
} from './types';

export const setFilmStocks = (filmstocks:object[]) : SetFilmstocks => {  //TODO: better
    return {
        type: SET_FILM_STOCKS,
        filmstocks
    }
}

export const setModalMode = (modalMode: string) : SetModalMode => {
    return {
        type : SET_MODAL_MODE,
        modalMode
    }
}

export const setSelectedFilmstockKey = (selectedFilmstockKey: string) : SetSelectedFilmstockKey => {
    return {
        type: SET_SELECTED_FILMSTOCK_KEY,
        selectedFilmstockKey
    }
}

export const setSelectedFilmstockRow = (selectedFilmstockRow: object) : SetSelectedFilmstockRow => {  //TODO: better type
    return {
        type: SET_SELECTED_FILMSTOCK_ROW,
        selectedFilmstockRow
    }
}

export const setShowAddFilmstockModal = (showAddFilmstockModal: boolean) : SetShowAddFilmstockModal => {
    return {
        type: SET_SHOW_ADD_FILMSTOCK_MODAL,
        showAddFilmstockModal
    }
}

export const setShowAddFilmstockButton = (showAddFilmstockButton: boolean) : SetShowAddFilmstockButton => {
    return {
        type: SET_SHOW_ADD_FILMSTOCK_BUTTON,
        showAddFilmstockButton
    }
}

export const setShowDeleteFilmstockButton = (showDeleteFilmstockButton: boolean) : SetShowDeleteFilmstockButton => {
    return {
        type: SET_SHOW_DELETE_FILMSTOCK_BUTTON,
        showDeleteFilmstockButton
    }
}

export const setShowEditFilmstockButton = (showEditFilmstockButton: boolean) : SetShowEditFilmstockButton => {
    return {
        type: SET_SHOW_EDIT_FILMSTOCK_BUTTON,
        showEditFilmstockButton
    }
}
