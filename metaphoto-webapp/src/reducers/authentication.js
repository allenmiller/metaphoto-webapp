import { SET_IS_AUTHENTICATED, SET_IS_AUTHENTICATING} from "../actions/actions";

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false
};

export default(state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTHENTICATED:
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        case SET_IS_AUTHENTICATING:
            return Object.assign({}, state, {isAuthenticating: action.isAuthenticating});
        default:
            return state;
    }
}
