import { createContext } from 'react';
import { IContextDefaultValue } from '../types/interfaces';

export const Context = createContext<IContextDefaultValue>(
  {} as IContextDefaultValue
);
