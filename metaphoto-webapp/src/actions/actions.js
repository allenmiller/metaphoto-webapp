export const SET_TIME = 'SET_TIME';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';

export function setTime(time) {
    return {
        type: SET_TIME,
        time
    }
}
