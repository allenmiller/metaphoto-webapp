import { setIsAuthenticated, setIsAuthenticating, setEmail, setPassword } from "./actions";

export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

export type  AuthenticationState = Readonly<{
    isAuthenticated: boolean,
    isAuthenticating: boolean,
    email: string,
    password: string,
    setIsAuthenticated: typeof setIsAuthenticated,
    setIsAuthenticating: typeof setIsAuthenticating,
    setEmail: typeof setEmail,
    setPassword: typeof setPassword
}>;

interface SetIsAuthenticatedAction {
    type: typeof SET_IS_AUTHENTICATED;
    isAuthenticated: boolean;
}

interface SetIsAuthenticatingAction {
    type: typeof SET_IS_AUTHENTICATING;
    isAuthenticating: boolean;
}

interface SetEmailAction {
    type: typeof SET_EMAIL;
    email: string;
}

interface SetPasswordAction {
    type: typeof SET_PASSWORD;
    password: string;
}

export type AuthenticationActionTypes = SetIsAuthenticatedAction 
                                    | SetIsAuthenticatingAction
                                    | SetEmailAction
                                    | SetPasswordAction;