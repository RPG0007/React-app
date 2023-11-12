import { ErrorInfo } from 'react';

export type ICards = Record<string, string>[];

export interface ICardProps {
  img: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  id: string;
  getCardModalDescription(id: string): void;
}

export interface ICardsSectionProps {
  isLoading: boolean;
  currentPage: number;
}

export interface IModalCardContetntProps {
  isModalLoading: boolean;
}

export interface IModalCardProps {
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

export interface IPaginationProps {
  currentPage: number;
  allPage: number | null;
  linkPrevPage: string;
  linkNextPage: string;
}

export interface ISearchProps {
  disabled: boolean;
}

export interface IErrorBoundaryProps {
  children?: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

export interface IContextDefaultValue {
  searchString: string;
  cards: ICards;
  cardDescription: ICardDescription | null;
  setIsLoading(newState: boolean): void;
  setCards(newState: ICards): void;
  setCurrentPage(newState: number): void;
  setAllPage(newState: number): void;
  setLinkNextPage(newState: string): void;
  setLinkPrevPage(newState: string): void;
  setIsModalLoading(newState: boolean): void;
  setCardDescription(newState: ICardDescription | null): void;
  setModalActive(newState: boolean): void;
  setSearchString(newState: string): void;
}
