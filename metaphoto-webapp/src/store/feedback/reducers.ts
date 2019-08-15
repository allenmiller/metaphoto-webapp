import {SET_IS_LOADING, FeedbackState, FeedbackActionTypes} from "./types";

const initialState: FeedbackState= {
    isLoading: false,
    setIsLoading: () => {}
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

export const feedbackReducer = ( state = initialState, action: FeedbackActionTypes) : FeedbackState  => {
    switch (action.type) {
        case SET_IS_LOADING: return {...state, isLoading: action.isLoading};
        default: return state;
    }
}
