export const SET_TIME = 'SET_TIME';
export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_IS_LOADING = 'SET_IS_LOADING';

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
