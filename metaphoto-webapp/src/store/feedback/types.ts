export const SET_IS_LOADING = 'SET_IS_LOADING';

export type FeedbackState = Readonly<{
    isLoading: boolean,
    setIsLoading: (isLoading:boolean) => void
}>;

interface SetIsLoading {
    type: typeof SET_IS_LOADING;
    isLoading: boolean;
}

export type FeedbackActionTypes = SetIsLoading;
