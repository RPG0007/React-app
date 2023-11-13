import { describe, expect, test, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockCardDescription, mockSearchString } from '../../mocks/mockData';
import { Context } from '../../context/context';
import ModalCard from './ModalCard';
import { useState } from 'react';

const mockFn = vi.fn(() => true);

const { result } = renderHook(() => useState(true));
const [modalActive, setMockModalActive] = result.current;

const renderModalCard = (isModalLoading: boolean = false) => {
  return (
    <Context.Provider
      value={{
        cards: [],
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
        setModalActive: (newState: boolean) =>
          act(() => setMockModalActive(newState)),
        setSearchString: mockFn,
      }}
    >
      <ModalCard
        modalActive={modalActive}
        isModalLoading={isModalLoading}
        deleteCardStringQuery={mockFn}
      />
    </Context.Provider>
  );
};

describe('The detailed card:', () => {
  test('clicking the close button hides the component', () => {
    render(renderModalCard());

    expect(result.current[0]).toBe(true);
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(result.current[0]).toBe(false);
  });

  test('loading indicator is displayed while fetching data', () => {
    render(renderModalCard(true));

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('component correctly displays data', () => {
    render(renderModalCard());

    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
    expect(screen.getByAltText('image character')).toBeInTheDocument();
  });
});
