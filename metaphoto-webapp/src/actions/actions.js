export const SET_TIME = 'SET_TIME';
export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const ADD_FILM_STOCK = 'ADD_FILM_STOCK';
export const SET_FILM_STOCKS = 'SET_FILM_STOCKS';

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
