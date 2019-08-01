import {ADD_FILM_STOCK} from "../actions/actions";

const initialState = {
    filmStock: {}
};

export default(state = initialState, action) => {
    if (action.type === ADD_FILM_STOCK) {
        return {
            ...state,
            filmStock: [...state.filmStock, action.filmStock]
        };
    }
    return state;
}
