import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Search from './Search';
import {
  mockCardDescription,
  mockCards,
  mockSearchString,
} from '../../mocks/mockData';
import { Context } from '../../context/context';

const mockFn = vi.fn();

const renderMainPage = () => {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
};
const renderSearch = () => {
  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          cards: mockCards,
          searchString: mockSearchString,
          cardDescription: mockCardDescription,
          setIsLoading: mockFn,
          setCards: mockFn,
          setCurrentPage: mockFn,
          setAllPage: mockFn,
          setLinkNextPage: mockFn,
          setLinkPrevPage: mockFn,
          setIsModalLoading: mockFn,
          setCardDescription: mockFn,
          setModalActive: mockFn,
          setSearchString: mockFn,
          setClickedButtonFuturePage: mockFn,
          setIsNewSearchCalled: mockFn,
        }}
      >
        <Search disabled={false} />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe('Search component:', () => {
  test('clicking the Search button saves the entered value to the local storage', () => {
    const checkValue = 'qwerty';

    render(renderMainPage());

    const input: HTMLInputElement = screen.getByTestId('input-search');
    fireEvent.input(input, {
      target: { value: checkValue },
    });
    vi.spyOn(global, 'fetch').mockReturnValue(
      new Promise(() => localStorage.setItem('stringQuery', input.value))
    );
    fireEvent.click(screen.getByTestId('input-btn'));

    expect(checkValue === localStorage.getItem('stringQuery')).toBe(true);
  });

  test('function "new search" currectly work without error', async () => {
    render(renderSearch());

    fireEvent.click(screen.getByTestId('input-btn'));
  });
});
