import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cards } from '../types/interfaces';

interface ICardsState {
  cards: Cards;
  isCardsLoading: boolean;
  searchString: string;
  prevSearchString: string;
  isNewSearchCalled: number;
}

const initialState: ICardsState = {
  cards: [],
  isCardsLoading: true,
  searchString: '',
  prevSearchString: '',
  isNewSearchCalled: 0,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeCurrentPageCards: (state, action: PayloadAction<Cards>) => {
      state.cards.length = 0;
      action.payload.map((el) => {
        state.cards.push(el);
      });
    },
    changeIsCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isCardsLoading = action.payload;
    },
    changeSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    changePrevSearchString: (state, action: PayloadAction<string>) => {
      state.prevSearchString = action.payload;
    },
    changeIsNewSearchCalled: (state, action: PayloadAction<number>) => {
      state.isNewSearchCalled = action.payload;
    },
  },
});

export const {
  changeCurrentPageCards,
  changeIsCardsLoading,
  changeSearchString,
  changeIsNewSearchCalled,
  changePrevSearchString,
} = cardsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default cardsSlice.reducer;
