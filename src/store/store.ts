import { configureStore } from '@reduxjs/toolkit';
import mainPageSlice from './mainPageSlice';
import { rickAndMortyApi } from './api';

export const store = configureStore({
  reducer: {
    mainPage: mainPageSlice,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
