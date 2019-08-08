export const ADD_FILM_STOCK = 'ADD_FILM_STOCK';
export const SET_FILM_NAME = 'SET_FILM_NAME';
export const SET_FILM_FORMAT = 'SET_FILM_FORMAT';
export const SET_FILM_ISO = 'SET_FILM_ISO';
export const SET_FILM_CODE = 'SET_FILM_CODE';
export const SET_FILM_TYPE = 'SET_FILM_TYPE';
export const SET_DEFAULT_FILM_TYPES = 'SET_DEFAULT_FILM_TYPES';
export const SET_DEFAULT_FILM_FORMATS = 'SET_DEFAULT_FILM_FORMATS';

export function addFilmStock(filmStock) {
    return {
        type: ADD_FILM_STOCK,
        filmStock
    }
}

export function setFilmName(filmName) {
    return {
        type: SET_FILM_NAME,
        filmName
    }
}

export function setFilmFormat(filmFormat) {
    return {
        type: SET_FILM_FORMAT,
        filmFormat
    }
}

export function setFilmIso(filmIso) {
    return {
        type: SET_FILM_ISO,
        filmIso
    }
}

export function setFilmCode(filmCode) {
    return {
        type: SET_FILM_CODE,
        filmCode
    }
}

export function setFilmType(filmType) {
    return {
        type: SET_FILM_TYPE,
        filmType
    }
}

export function setDefaultFilmTypes(defaultFilmTypes) {
    return {
        type: SET_DEFAULT_FILM_TYPES,
        defaultFilmTypes
    }
}
export function setDefaultFilmFormats(defaultFilmFormats) {
    return {
        type: SET_DEFAULT_FILM_FORMATS,
        defaultFilmFormats
    }
}
