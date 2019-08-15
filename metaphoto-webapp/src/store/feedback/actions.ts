import {SET_IS_LOADING} from './types';

export const setIsLoading = (isLoading: boolean) => {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
}
