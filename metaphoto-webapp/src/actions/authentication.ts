import {action} from 'typesafe-actions';

export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';


export const setIsAuthenticating = (isAuthenticating: boolean) => {
    action(SET_IS_AUTHENTICATING, {
        isAuthenticating
    })
};

export const setIsAuthenticated = (isAuthenticated: boolean) => {
    action(SET_IS_AUTHENTICATED, {
        isAuthenticated
    })
};


export const setEmail = (email: string) => {
    action(SET_EMAIL, {
        email
    })
};

export const setPassword = (password: string) => {
    action(SET_PASSWORD, {
        password
    })
};
