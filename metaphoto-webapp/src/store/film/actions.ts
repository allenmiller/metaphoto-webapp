import { SET_FILMSTOCK_ID } from './types';

export const setFilmstockId = (filmstockId: string) => {
    return {
        type: SET_FILMSTOCK_ID,
        filmstockId
    }
}
