import {
    AuthenticationState,
    SET_IS_AUTHENTICATED,
    SET_IS_AUTHENTICATING,
    SET_EMAIL,
    SET_PASSWORD,
    AuthenticationActionTypes
} from "./types";

import {
    setIsAuthenticated,
    setIsAuthenticating,
    setEmail,
    setPassword
} from './actions';

const initialState: AuthenticationState = {
    isAuthenticated: false,
    isAuthenticating: false,
    email: '',
    password: '',
    setIsAuthenticated: setIsAuthenticated,
    setIsAuthenticating: setIsAuthenticating,
    setEmail: setEmail,
    setPassword: setPassword
};

export const authenticationReducer = ( state = initialState, action: AuthenticationActionTypes) : AuthenticationState  => {
    switch (action.type) {
        case SET_IS_AUTHENTICATED: return {...state, isAuthenticated: action.isAuthenticated};
        case SET_IS_AUTHENTICATING: return {...state, isAuthenticating: action.isAuthenticating};
        case SET_EMAIL: return {...state, email: action.email};
        case SET_PASSWORD: return {...state, password: action.password};
        default: return state;
    }
}