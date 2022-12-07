import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './github/github.api';
import githubSlice from './github/github.slice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
