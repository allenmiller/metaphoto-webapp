export const SET_FILMSTOCK_ID = 'SET_FILMSTOCK_ID';

export type FilmState = Readonly<{
    filmstockId: string,
    setFilmstockId: (filmstockId: string) => void
}>;

interface SetFilmstockId {
    type: typeof SET_FILMSTOCK_ID;
    filmstockId: string;
}

export type FilmActionTypes = SetFilmstockId;
