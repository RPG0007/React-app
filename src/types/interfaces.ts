import { ErrorInfo } from 'react';

export type Cards = Record<string, string>[];
export type ClickedButtonFuturePage = 'prev' | 'next' | '';

export interface ICard {
  img: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  id: string;
  getCardModalDescription(id: string): void;
}

export interface ICardsSection {
  isLoading: boolean;
  currentPage: number;
}

export interface IModalCardContetnt {
  isModalLoading: boolean;
}

export interface IModalCard {
  modalActive: boolean;
  isModalLoading: boolean;
  deleteCardStringQuery(): void;
}

export interface ICardDescription {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  image: string;
}

export interface IPagination {
  currentPage: number;
  allPage: number | null;
  linkPrevPage: string;
  linkNextPage: string;
  setPerpage(num: number): void;
}

export interface ISearch {
  disabled: boolean;
}

export interface IErrorBoundary {
  children?: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

export interface IContextDefaultValue {
  searchString: string;
  cards: Cards;
  cardDescription: ICardDescription | null;
  changeIsCardsLoading(newState: boolean): void;
  //setCards(newState: Cards): void;
  setCurrentPage(newState: number): void;
  setAllPage(newState: number): void;
  setLinkNextPage(newState: string): void;
  setLinkPrevPage(newState: string): void;
  setIsModalLoading(newState: boolean): void;
  setCardDescription(newState: ICardDescription | null): void;
  setModalActive(newState: boolean): void;
  //setSearchString(newState: string): void;
  setClickedButtonFuturePage(newState: ClickedButtonFuturePage): void;
  //setIsNewSearchCalled(newState: number): void;
}
