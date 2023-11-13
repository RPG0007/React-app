import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardsSection from './CardsSection';
import { Context } from '../../context/context';
import {
  mockCards,
  mockCardDescription,
  mockSearchString,
} from '../../mocks/mockData';
import { ICards } from '../../types/interfaces';
import { BrowserRouter } from 'react-router-dom';

const mockFn = vi.fn();

const renderCardsSection = (cardsValueContext: ICards) => {
  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          cards: cardsValueContext,
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
        <CardsSection isLoading={false} currentPage={1} />
      </Context.Provider>
    </BrowserRouter>
  );
};

describe('Cards section component:', () => {
  test('displays 2 cards', () => {
    render(renderCardsSection(mockCards));

    const renderCards = screen.getAllByTestId('card');

    expect(renderCards.length).toBe(2);
  });

  test('an empty result message is displayed', () => {
    render(renderCardsSection([]));

    expect(
      screen.getByText('Unfortunately, no suitable result was found')
    ).toBeInTheDocument();
  });

  test('function "getCardDescription" currectly work without errors', async () => {
    render(renderCardsSection(mockCards));
    vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => mockCards));
    const cards = screen.getAllByTestId('card');
    fireEvent.click(cards[0]);
  });
});
