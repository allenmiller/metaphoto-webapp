import {ActionType} from 'typesafe-actions'
import {
    SET_FILM_CODE,
    SET_FILM_FORMAT,
    SET_FILM_ISO,
    SET_FILM_NAME,
    SET_FILM_TYPE,
    SET_DEFAULT_FILM_FORMATS,
    SET_DEFAULT_FILM_TYPES
} from "../actions/filmstock";

import * as filmStockActions from '../actions/filmstock';

export type FilmStockState = Readonly<{
    filmStock: object,
    filmName: string,
    filmFormat: string,
    filmIso: string,
    filmCode: string,
    filmType: string,
    defaultFilmFormats: string[],
    defaultFilmTypes: string[]
}>;
export type FilmStockAction = ActionType<typeof filmStockActions>;
const initialState = {
    filmStock: {},
    filmName: "",
    filmFormat: "",
    filmIso: "",
    filmCode: "",
    filmType: "",
    defaultFilmFormats: [],
    defaultFilmTypes: []
}
export default(state = initialState, ) => {
    if (action.type === SET_FILM_NAME) {
        return {
            ...state,
            filmName: action.filmName
        }
    }

    if (action.type === SET_FILM_FORMAT) {
        return {
            ...state,
            filmFormat: action.filmFormat
        }
    }

    if (action.type === SET_FILM_ISO) {
        return {
            ...state,
            filmIso: action.filmIso
        }
    }

    if (action.type === SET_FILM_CODE) {
        return {
            ...state,
            filmCode: action.filmCode
        }
    }

    if (action.type === SET_FILM_TYPE) {
        return {
            ...state,
            filmType: action.filmType
        }
    }

    if (action.type === SET_DEFAULT_FILM_FORMATS) {
        let defaultFilmFormats = [];
        action.defaultFilmFormats.filmFormats.forEach(e => {
            defaultFilmFormats.push({value:e, label:e});
        });

        return {
            ...state,
            defaultFilmFormats: defaultFilmFormats
        }
    }

    if (action.type === SET_DEFAULT_FILM_TYPES) {
        let defaultFilmTypes = [];
        action.defaultFilmTypes.filmTypes.forEach(e => {
            defaultFilmTypes.push({value:e, label:e});
        });

        return {
            ...state,
            defaultFilmTypes: defaultFilmTypes
        }
    }

    return state;
}
