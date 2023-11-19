import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cards, ICardDescription } from '../types/interfaces';

interface IMainPageState {
  cards: Cards;
  cardDescription: ICardDescription | undefined;
  isCardsLoading: boolean;
  isModalActive: boolean;
  isModalLoading: boolean;
  searchString: string;
  allPage: number;
  numPerpage: number;
}

const initialState: IMainPageState = {
  cards: [],
  cardDescription: undefined,
  isCardsLoading: true,
  isModalActive: false,
  isModalLoading: false,
  searchString: '',
  allPage: 1,
  numPerpage: 20,
};

export const mainPageSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    changeCurrentCards: (state, action: PayloadAction<Cards>) => {
      state.cards = action.payload;
    },
    changeCardDescription: (
      state,
      action: PayloadAction<ICardDescription | undefined>
    ) => {
      state.cardDescription = action.payload;
    },
    changeIsCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isCardsLoading = action.payload;
    },
    changeIsModalLoading: (state, action: PayloadAction<boolean>) => {
      state.isModalLoading = action.payload;
    },
    changeIsModalActive: (state, action: PayloadAction<boolean>) => {
      state.isModalActive = action.payload;
    },
    changeSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    changeAllPage: (state, action: PayloadAction<number>) => {
      state.allPage = action.payload;
    },
    changenumPerpage: (state, action: PayloadAction<number>) => {
      state.numPerpage = action.payload;
    },
  },
});

export const {
  changeCurrentCards,
  changeCardDescription,
  changeIsCardsLoading,
  changeIsModalLoading,
  changeIsModalActive,
  changeSearchString,
  changeAllPage,
  changenumPerpage,
} = mainPageSlice.actions;

export default mainPageSlice.reducer;
