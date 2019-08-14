import {ActionType} from 'typesafe-actions';
import {createReducer} from 'typesafe-actions';
import {combineReducers} from 'redux';

import {
    SET_IS_AUTHENTICATED,
    SET_IS_AUTHENTICATING,
    SET_EMAIL,
    SET_PASSWORD
} from "../actions/authentication";

import * as actions from '../actions/authentication';

export type AuthenticationAction = ActionType<typeof actions>

export type  AuthenticationState = Readonly<{
    isAuthenticated: boolean,
    isAuthenticating: boolean,
    email: string,
    password: string
}>;

const initialState: AuthenticationState = {
    isAuthenticated: false,
    isAuthenticating: false,
    email: '',
    password: ''
};

const isAuthenticated = createReducer(initialState.isAuthenticated) 
    .handleAction(SET_IS_AUTHENTICATED, (state, authenticationAction) => authenticationAction.isAuthenticated);
const isAuthenticating = createReducer(initialState.isAuthenticating) 
    .handleAction(SET_IS_AUTHENTICATING, (state, authenticationAction) => authenticationAction.isAuthenticating);
const email = createReducer(initialState.email)
    .handleAction(SET_EMAIL, (state, authenticaitonAction) => authenticaitonAction.email);
const password = createReducer(initialState.password)    
    .handleAction(SET_PASSWORD, (state, authenticationAction) => authenticationAction.password);

export default combineReducers({
    isAuthenticated,
    isAuthenticating,
    email,
    password
})
