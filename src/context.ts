import { createContext } from 'react';
import { ICardDescription } from './App';

interface IContextDefaultValue {
  searchString: string;
  cards: Record<string, string>[];
  cardDescription: ICardDescription;
}

export const Context = createContext<IContextDefaultValue>(
  {} as IContextDefaultValue
);
