import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_FAV_KEY = 'rfk';

interface GithubSliceState {
  favourites: string[];
}

const initialState: GithubSliceState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) || '[]'),
};

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((fav) => fav !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

export const { addFavourite, removeFavourite } = githubSlice.actions;

export default githubSlice.reducer;
