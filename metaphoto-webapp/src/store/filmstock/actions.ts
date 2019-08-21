import {
    ADD_FILM_STOCK,
    SET_FILM_NAME,
    SET_FILM_FORMAT,
    SET_FILM_ISO, 
    SET_FILM_CODE,
    SET_FILM_TYPE,
    SET_DEFAULT_FILM_TYPES,
    SET_DEFAULT_FILM_FORMATS,
    FilmstockDefaultsResponse,
    FilmValueLabelPair
} from "./types";

export function addFilmStock(filmStock: object) {
    return {
        type: ADD_FILM_STOCK,
        filmStock
    }
}

export function setFilmName(filmName: string) {
    return {
        type: SET_FILM_NAME,
        filmName
    }
}

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

export function setDefaultFilmTypes(defaultFilmTypes: FilmValueLabelPair) {
    return {
        type: SET_DEFAULT_FILM_TYPES,
        defaultFilmTypes
    }
}
export function setDefaultFilmFormats(defaultFilmFormats: FilmValueLabelPair) {
    return {
        type: SET_DEFAULT_FILM_FORMATS,
        defaultFilmFormats
    }
}
