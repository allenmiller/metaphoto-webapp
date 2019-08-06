import {
    ADD_FILM_STOCK,
    SET_FILM_CODE,
    SET_FILM_FORMAT,
    SET_FILM_ISO,
    SET_FILM_NAME,
    SET_FILM_TYPE,
    SET_FILMSTOCK_DEFAULTS
} from "../actions/actions";

const initialState = {
    filmStock: {},
    filmName: "",
    filmFormat: "",
    filmIso: "",
    filmCode: "",
    filmType: "",
    defaults: {}
};

export default(state = initialState, action) => {
    if (action.type === ADD_FILM_STOCK) {
        return {
            ...state,
            filmStock: [...state.filmStock, action.filmStock]
        };
    }

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

    if (action.type === SET_FILMSTOCK_DEFAULTS) {
        return {
            ...state,
            defaults: action.defaults
        }
    }

    return state;
}
