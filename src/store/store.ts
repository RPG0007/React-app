import { configureStore } from '@reduxjs/toolkit';
import mainPageSlice from './mainPageSlice';

export const store = configureStore({
  reducer: {
    mainPage: mainPageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
