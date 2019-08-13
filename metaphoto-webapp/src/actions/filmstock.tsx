import {action} from 'typesafe-actions';

export const SET_FILM_NAME = 'SET_FILM_NAME';
export const SET_FILM_FORMAT = 'SET_FILM_FORMAT';
export const SET_FILM_ISO = 'SET_FILM_ISO';
export const SET_FILM_CODE = 'SET_FILM_CODE';
export const SET_FILM_TYPE = 'SET_FILM_TYPE';
export const SET_DEFAULT_FILM_TYPES = 'SET_DEFAULT_FILM_TYPES';
export const SET_DEFAULT_FILM_FORMATS = 'SET_DEFAULT_FILM_FORMATS';

export const setFilmName = (filmName: string) => action(SET_FILM_NAME,  {
            type: SET_FILM_NAME,
            filmName
    });

export function setFilmFormat(filmFormat: string) {
    return {
        type: SET_FILM_FORMAT,
        filmFormat
    }
}

export function setFilmIso(filmIso: string) {
    return {
        type: SET_FILM_ISO,
        filmIso
    }
}

export function setFilmCode(filmCode: string) {
    return {
        type: SET_FILM_CODE,
        filmCode
    }
}

export function setFilmType(filmType: string) {
    return {
        type: SET_FILM_TYPE,
        filmType
    }
}

export function setDefaultFilmTypes(defaultFilmTypes: string[]) {
    return {
        type: SET_DEFAULT_FILM_TYPES,
        defaultFilmTypes
    }
}
export function setDefaultFilmFormats(defaultFilmFormats: string[]) {
    return {
        type: SET_DEFAULT_FILM_FORMATS,
        defaultFilmFormats
    }
}
