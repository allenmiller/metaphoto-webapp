export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

export function setIsAuthenticating(isAuthenticating: boolean) {
    return {
        type: SET_IS_AUTHENTICATING,
        isAuthenticating
    }
}

export function setIsAuthenticated(isAuthenticated: boolean) {
    return {
        type: SET_IS_AUTHENTICATED,
        isAuthenticated
    }
}


export function setEmail(email: string) {
    return {
        type: SET_EMAIL,
        email
    }
}

export function setPassword(password: String) {
    return {
        type: SET_PASSWORD,
        password
    }
}
