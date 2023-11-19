import { describe, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Context } from '../../context/context';
import {
  mockCards,
  mockCardDescription,
  mockSearchString,
} from '../../mocks/mockData';

import { BrowserRouter } from 'react-router-dom';
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
          setClickedButtonFuturePage: mockFn,
          setIsNewSearchCalled: mockFn,
        }}
      >
        <Pagination
          allPage={14}
          currentPage={currentPage}
          linkPrevPage={''}
          linkNextPage={''}
          doChangeForUseEffect={mockFn}
          handlePerPageChange={mockFn}
          numPerPage={20}
        />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe('Pagination component:', () => {
  test('button prev page currectly work without errors', () => {
    render(renderPagination(4));
    vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => ''));
    fireEvent.click(screen.getByTestId('button-prev-page'));
  });
});
