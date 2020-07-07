import { FilmstockRow, FilmstockData, FilmstockState } from "../filmstock/types";
import { setIsAuthenticated } from "../authentication/actions";
import { setFilmStocks, setModalMode, setSelectedFilmstockKey, setSelectedFilmstockRow, setShowAddFilmstockModal, setShowAddFilmstockButton, setShowDeleteFilmstockButton, setShowEditFilmstockButton } from "./actions";
import { setFilmName, setFilmIso, setFilmCode, setFilmType, setFilmFormat, setDefaultFilmFormats, setDefaultFilmTypes } from "../filmstock/actions";

export const SET_SHOW_ADD_FILMSTOCK_MODAL = 'SET_SHOW_ADD_FILMSTOCK_MODAL';
export const SET_FILM_STOCKS = 'SET_FILM_STOCKS';
export const SET_SHOW_ADD_FILMSTOCK_BUTTON = 'SET_SHOW_ADD_FILMSTOCK_BUTTON';
export const SET_SHOW_DELETE_FILMSTOCK_BUTTON = 'SET_SHOW_DELETE_FILMSTOCK_BUTTON';
export const SET_SHOW_EDIT_FILMSTOCK_BUTTON = 'SET_SHOW_EDIT_FILMSTOCK_BUTTON';
export const SET_SELECTED_FILMSTOCK_KEY = 'SET_SELECTED_FILMSTOCK_KEY';
export const SET_SELECTED_FILMSTOCK_ROW = 'SET_SELECTED_FILMSTOCK_ROW';
export const SET_MODAL_MODE = 'SET_MODAL_MODE';

export type FilmStocksProps = Readonly<{
    authentication: {
        isAuthenticated: boolean
    },
//    filmStockDefaults: state.filmstock.defaults,
    filmstockData: FilmstockData,
    filmstocks: FilmstocksState,
    filmstock: FilmstockState,
    setIsAuthenticated: typeof setIsAuthenticated,
    setFilmStocks: typeof setFilmStocks,
    setFilmName: typeof setFilmName,
    setFilmFormat: typeof setFilmFormat,
    setFilmIso: typeof setFilmIso,
    setFilmCode: typeof setFilmCode,
    setFilmType: typeof setFilmType,
    setModalMode: typeof setModalMode,
    setSelectedFilmstockKey: typeof setSelectedFilmstockKey,
    setSelectedFilmstockRow: typeof setSelectedFilmstockRow,
    setDefaultFilmFormats: typeof setDefaultFilmFormats,
    setDefaultFilmTypes: typeof setDefaultFilmTypes,
    setShowAddFilmstockModal: typeof setShowAddFilmstockModal,
    setShowAddFilmstockButton: typeof setShowAddFilmstockButton,
    setShowDeleteFilmstockButton: typeof setShowDeleteFilmstockButton,
    setShowEditFilmstockButton: typeof setShowEditFilmstockButton
}>

export type FilmstocksState = Readonly<{
    filmstocks: object[],  //TODO: better type
    modalMode: string,
    showAddFilmstockButton: boolean,
    showAddFilmstockModal: boolean,
    showDeleteFilmstockButton: boolean,
    showEditFilmstockButton: boolean,
    selectedFilmstockKey: string,
    selectedFilmstockRow: FilmstockRow,
    showModal: boolean
}>;

export interface SetFilmstocks {
    type: typeof SET_FILM_STOCKS;
    filmstocks: object[];
}

export interface SetModalMode {
    type: typeof SET_MODAL_MODE
    modalMode: string
}

export interface SetShowAddFilmstockButton {
    type: typeof SET_SHOW_ADD_FILMSTOCK_BUTTON
    showAddFilmstockButton: boolean
}

export interface SetShowAddFilmstockModal {
    type: typeof SET_SHOW_ADD_FILMSTOCK_MODAL
    showAddFilmstockModal: boolean
}

export interface SetShowDeleteFilmstockButton {
    type: typeof SET_SHOW_DELETE_FILMSTOCK_BUTTON
    showDeleteFilmstockButton: boolean
}

export interface SetShowEditFilmstockButton {
    type: typeof SET_SHOW_EDIT_FILMSTOCK_BUTTON
    showEditFilmstockButton: boolean
}

export interface SetSelectedFilmstockKey {
    type: typeof SET_SELECTED_FILMSTOCK_KEY
    selectedFilmstockKey: string
}

export interface SetSelectedFilmstockRow {
    type: typeof SET_SELECTED_FILMSTOCK_ROW;
    selectedFilmstockRow: FilmstockRow;
}

export type FilmstocksActionTypes = SetFilmstocks
                                    | SetModalMode
                                    | SetShowAddFilmstockButton
                                    | SetShowAddFilmstockModal
                                    | SetShowDeleteFilmstockButton
                                    | SetShowEditFilmstockButton
                                    | SetSelectedFilmstockKey
                                    | SetSelectedFilmstockRow;

export const EmptyFilmstockRow:FilmstockRow = {
        primaryHashKey:"",
        primaryRangeKey:"",
        data:{
            filmCode: "",
            filmFormat: "",
            filmIso: "",
            filmName: "",
            filmType: ""
        }
    }
