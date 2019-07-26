import { SET_IS_AUTHENTICATED, SET_IS_AUTHENTICATING, SET_EMAIL, SET_PASSWORD} from "../actions/actions";

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    email: '',
    password: ''
};

export default(state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTHENTICATED:
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        case SET_IS_AUTHENTICATING:
            return Object.assign({}, state, {isAuthenticating: action.isAuthenticating});
        case SET_EMAIL:
            return Object.assign({}, state, {email: action.email});
        case SET_PASSWORD:
            return Object.assign({}, state, {password: action.password});
        default:
            return state;
    }
}
