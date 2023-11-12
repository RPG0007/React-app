import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Context } from '../../context/context';
import {
  mockCards,
  mockCardDescription,
  mockSearchString,
} from '../../mocks/mockData';

import { BrowserRouter, Link } from 'react-router-dom';
import Pagination from './Pagination';

const mockFn = vi.fn();

const renderPagination = (currentPage: number) => {
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
        }}
      >
        <Link to="/" />
        <Link to="/" />

        <Pagination
          allPage={14}
          currentPage={currentPage}
          linkPrevPage={''}
          linkNextPage={''}
        />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe('Pagination component:', () => {
  test('updates URL query parameter when page changes', () => {
    render(renderPagination(1));
    const location = window.location.search;
    expect(location).toBe('');
    vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => ''));
    fireEvent.click(screen.getByTestId('button-next-page'));
    expect(window.location.search === '?name=&page=2').toBe(true);
  });

  test('button prev page currectly work without errors', () => {
    render(renderPagination(4));
    vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => ''));
    fireEvent.click(screen.getByTestId('button-prev-page'));
  });
});
