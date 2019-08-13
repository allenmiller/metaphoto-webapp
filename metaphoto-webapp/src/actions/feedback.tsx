export const SET_IS_LOADING = 'SET_IS_LOADING';

export function setIsLoading(isLoading: boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
}
