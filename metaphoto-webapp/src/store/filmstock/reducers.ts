import {
    ADD_FILM_STOCK,
    SET_FILM_CODE,
    SET_FILM_FORMAT,
    SET_FILM_ISO,
    SET_FILM_NAME,
    SET_FILM_TYPE,
    SET_DEFAULT_FILM_FORMATS,
    SET_DEFAULT_FILM_TYPES,
    FilmstockState,
    FilmstockActionTypes,
    FilmValueLabelPair,

} from "./types";
import { EmptyFilmstockRow } from "../filmstocks/types";

const initialState : FilmstockState = {
    filmName: "",
    filmFormat: "",
    filmIso: "",
    filmCode: "",
    filmType: "",
    defaultFilmFormats:[],
    defaultFilmTypes: []
};

export const filmstockReducer = (state = initialState, action: FilmstockActionTypes) : FilmstockState => {
/*     if (action.type === ADD_FILM_STOCK) {
        return {
            ...state,
            filmstock: action.filmstock
        };
    } */

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
        let defaultFilmFormats:FilmValueLabelPair[] = [];
        action.defaultFilmFormats.forEach((filmFormat:FilmValueLabelPair) => {
            defaultFilmFormats.push({value:filmFormat.value, label:filmFormat.label});
        });

        return {
            ...state,
            defaultFilmFormats: defaultFilmFormats
        }
    }

    if (action.type === SET_DEFAULT_FILM_TYPES) {
        let defaultFilmTypes:FilmValueLabelPair[] = [];
        action.defaultFilmTypes.forEach(filmFormat => {
            defaultFilmTypes.push({value:filmFormat.value, label:filmFormat.label});
        });

        return {
            ...state,
            defaultFilmTypes: defaultFilmTypes
        }
    }

    return state;
}
