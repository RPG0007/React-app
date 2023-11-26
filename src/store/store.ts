import { configureStore } from '@reduxjs/toolkit';
import mainPageSlice from './mainPageSlice';
import { rickAndMortyApi } from './api';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    mainPage: mainPageSlice,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

const makeStore: MakeStore<AppStore> = () => store;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
