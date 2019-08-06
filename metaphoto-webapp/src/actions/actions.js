export const SET_TIME = 'SET_TIME';
export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_FILM_NAME = 'SET_FILM_NAME';
export const SET_FILM_FORMAT = 'SET_FILM_FORMAT';
export const SET_FILM_ISO = 'SET_FILM_ISO';
export const SET_FILM_CODE = 'SET_FILM_CODE';
export const SET_FILM_TYPE = 'SET_FILM_TYPE';
export const ADD_FILM_STOCK = 'ADD_FILM_STOCK';
export const SET_FILM_STOCKS = 'SET_FILM_STOCKS';
export const SET_SHOW_ADD_FILMSTOCK_MODAL = 'SET_SHOW_ADD_FILMSTOCK_MODAL';
export const SET_FILMSTOCK_DEFAULTS = 'SET_FILMSTOCK_DEFAULTS';

export function setTime(time) {
    return {
        type: SET_TIME,
        time
    }
}

export function setIsAuthenticating(isAuthenticating) {
    return {
        type: SET_IS_AUTHENTICATING,
        isAuthenticating
    }
}

export function setIsAuthenticated(isAuthenticated) {
    return {
        type: SET_IS_AUTHENTICATED,
        isAuthenticated
    }
}

export function setIsLoading(isLoading) {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
}

export function setEmail(email) {
    return {
        type: SET_EMAIL,
        email
    }
}

export function setPassword(password) {
    return {
        type: SET_PASSWORD,
        password
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

export function addFilmStock(filmStock) {
    return {
        type: ADD_FILM_STOCK,
        filmStock
    }
}

export function setFilmStocks(filmStocks) {
    return {
        type: SET_FILM_STOCKS,
        filmStocks
    }
}

export function setShowAddFilmstockModal(showModal) {
    return {
        type: SET_SHOW_ADD_FILMSTOCK_MODAL,
        showModal
    }
}

export function setFilmStockDefaults(defaults) {
    return {
        type: SET_FILMSTOCK_DEFAULTS,
        defaults
    }
}
