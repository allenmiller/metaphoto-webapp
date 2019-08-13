export const SET_FILMSTOCK_ID = 'SET_FILMSTOCK_ID';

export function setFilmstockId(filmstockId: string) {
    return {
        type: SET_FILMSTOCK_ID,
        filmstockId
    }
}
