import { SET_TIME } from '../actions/actions';

const initialState = {
    time: "uninitialized"
};

export default(state = initialState, action) => {
    switch (action.type) {
        case SET_TIME:
            return Object.assign({}, state, {
                time: action.time
            });
        default:
            return state;
    }
}
