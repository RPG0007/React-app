import { ErrorInfo } from 'react';

export type Cards = Record<string, string>[];

export interface ICard {
  img: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  id: string;
  getCardModalDescription(id: string): void;
}

export interface IModalCard {
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

export interface IResponseApi {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Cards;
}
