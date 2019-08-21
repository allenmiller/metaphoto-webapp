import { SET_FILMSTOCK_ID } from './types';

export function setFilmstockId(filmstockId: string) {
    return {
        type: SET_FILMSTOCK_ID,
        filmstockId
    }
}
