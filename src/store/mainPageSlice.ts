import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cards, ICardDescription } from '../types/interfaces';

interface IMainPageState {
  cards: Cards;
  cardDescription: ICardDescription | null;
  isCardsLoading: boolean;
  isModalActive: boolean;
  isModalLoading: boolean;
  searchString: string;
  prevSearchString: string;
  isNewSearchCalled: number;
  currentPage: number;
  allPage: number;
  cardDescriptionId: string;
  numPerpage: number;
}

const initialState: IMainPageState = {
  cards: [],
  cardDescription: null,
  isCardsLoading: true,
  isModalActive: false,
  isModalLoading: false,
  searchString: '',
  prevSearchString: '',
  isNewSearchCalled: 0,
  currentPage: 1,
  allPage: 1,
  cardDescriptionId: '',
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
      action: PayloadAction<ICardDescription | null>
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
    changePrevSearchString: (state, action: PayloadAction<string>) => {
      state.prevSearchString = action.payload;
    },
    changeCardDescriptionId: (state, action: PayloadAction<string>) => {
      state.cardDescriptionId = action.payload;
    },
    changeIsNewSearchCalled: (state, action: PayloadAction<number>) => {
      state.isNewSearchCalled = action.payload;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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
  changeIsNewSearchCalled,
  changePrevSearchString,
  changeCurrentPage,
  changeAllPage,
  changeCardDescriptionId,
  changenumPerpage,
} = mainPageSlice.actions;

export default mainPageSlice.reducer;
