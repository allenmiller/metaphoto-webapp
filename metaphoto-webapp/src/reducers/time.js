import { SET_TIME } from '../actions/actions';

const initialState = {
    time: "uninitialized"
};

export default(state = initialState, action) => {
    if (action.type === SET_TIME) {
        return Object.assign({}, state, {
            time: action.time
        });
    }
    return state;
}
