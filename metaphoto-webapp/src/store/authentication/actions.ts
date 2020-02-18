//import {action} from 'typesafe-actions';  TODO: come back to this when I get the basic layout working
import {
    SET_IS_AUTHENTICATED,
    SET_IS_AUTHENTICATING,
    SET_EMAIL,
    SET_PASSWORD,
    SetIsAuthenticatedAction,
    SetIsAuthenticatingAction,
    SetEmailAction,
    SetPasswordAction
} from './types'

export const setIsAuthenticated = (isAuthenticated: boolean) : SetIsAuthenticatedAction => {
    return {
        type: SET_IS_AUTHENTICATED,
        isAuthenticated
    }
};

export const setIsAuthenticating = (isAuthenticating: boolean) : SetIsAuthenticatingAction => {
//    action(SET_IS_AUTHENTICATING, {
//        isAuthenticating
//    })
    return {
        type: SET_IS_AUTHENTICATING,
        isAuthenticating
    }
};


export const setEmail = (email: string) : SetEmailAction => {
    console.log("in setEmail(): ", email);
    return {
        type: SET_EMAIL,
        email
    }
};

export const setPassword = (password: string) : SetPasswordAction => {
    return {
        type: SET_PASSWORD,
        password
    }
};
