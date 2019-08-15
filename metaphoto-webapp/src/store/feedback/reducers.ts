import {SET_IS_LOADING, FeedbackState, FeedbackActionTypes} from "./types";
import {setIsLoading} from './actions';

const initialState: FeedbackState= {
    isLoading: false,
    setIsLoading: setIsLoading
};

export const feedbackReducer = ( state = initialState, action: FeedbackActionTypes) : FeedbackState  => {
    switch (action.type) {
        case SET_IS_LOADING: return {...state, isLoading: action.isLoading};
        default: return state;
    }
}
