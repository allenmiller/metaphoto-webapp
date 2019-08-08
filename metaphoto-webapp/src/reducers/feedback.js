import {SET_IS_LOADING} from "../actions/feedback";

const initialState = {
    isLoading: false
};

export default(state = initialState, action) => {
    if (action.type === SET_IS_LOADING) {
        return {
            ...state,
            isLoading: action.isLoading
        }
    } else {
        return state;
    }
}
