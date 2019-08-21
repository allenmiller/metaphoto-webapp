export const ADD_FILM_STOCK = 'ADD_FILM_STOCK';
export const SET_FILM_CODE = 'SET_FILM_CODE';
export const SET_FILM_FORMAT = 'SET_FILM_FORMAT';
export const SET_FILM_ISO = 'SET_FILM_ISO';
export const SET_FILM_NAME = 'SET_FILM_NAME';
export const SET_FILM_TYPE = 'SET_FILM_TYPE';
export const SET_DEFAULT_FILM_TYPES = 'SET_DEFAULT_FILM_TYPES';
export const SET_DEFAULT_FILM_FORMATS = 'SET_DEFAULT_FILM_FORMATS';

export type FilmstockState = Readonly<{
    filmstock: object,
    filmName: string,
    filmFormat: string,
    filmIso: string,
    filmCode: string,
    filmType: string,
    defaultFilmFormats: FilmValueLabelPair[],
    defaultFilmTypes: FilmValueLabelPair[]
}>

export type FilmstockRow = Readonly<{
    primaryHashKey: string,
    primaryRangeKey: string,
    data: FilmstockData
}>

export type FilmstockData = Readonly<{
        filmName: string,
        filmFormat: string,
        filmIso: string,
        filmCode: string,
        filmType: string
}>

export type FilmValueLabelPair = Readonly<{
    value: string,
    label: string
}>

export type FilmstockDefaultsResponse = Readonly<{
    filmFormats: FilmValueLabelPair,
    filmTypes: FilmValueLabelPair
}>

export interface AddFilmstockAction {
    type: typeof ADD_FILM_STOCK;
    filmstock: object;
}

export interface SetFilmCodeAction {
    type: typeof SET_FILM_CODE;
    filmCode: string;
}

export interface SetFilmNameAction {
    type: typeof SET_FILM_NAME;
    filmName: string;
}

export interface SetFilmFormatAction {
    type: typeof SET_FILM_FORMAT;
    filmFormat: string
}

export interface SetFilmIsoAction {
    type: typeof SET_FILM_ISO;
    filmIso: string;
}

export interface SetFilmTypeAction {
    type: typeof SET_FILM_TYPE
    filmType: string
}

export interface SetDefaultFilmFormatsAction {
    type: typeof SET_DEFAULT_FILM_FORMATS;
    defaultFilmFormats: FilmstockDefaultsResponse['filmFormats'][];
}

export interface SetDefaultFilmTypesAction {
    type: typeof SET_DEFAULT_FILM_TYPES;
    defaultFilmTypes: FilmstockDefaultsResponse['filmTypes'][];
}

export type FilmstockActionTypes = AddFilmstockAction
                                    | SetFilmCodeAction
                                    | SetFilmNameAction
                                    | SetFilmFormatAction
                                    | SetFilmIsoAction
                                    | SetFilmTypeAction
                                    | SetDefaultFilmFormatsAction
                                    | SetDefaultFilmTypesAction;
