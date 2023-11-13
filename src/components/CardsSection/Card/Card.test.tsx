import { describe, expect, test, vi } from 'vitest';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import {
  mockCardDescription,
  mockCards,
  mockSearchString,
} from '../../../mocks/mockData';
import { Context } from '../../../context/context';
import ModalCard from '../../ModalCard/ModalCard';
import { useState } from 'react';

export function mockGetCardDescription() {
  fetch(`https://rickandmortyapi.com/api/character/1`).then((response) => {
    if (!response.ok) {
      throw new Error('Not found results');
    } else {
      return response.json();
    }
  });
}

const mockFn = vi.fn(() => true);
const onClick = vi.fn(mockGetCardDescription);

const { result } = renderHook(() => useState(false));
const [modalActive, setMockModalActive] = result.current;

const renderCardAndModalCard = () => {
  return (
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
        setModalActive: (newState: boolean) =>
          act(() => setMockModalActive(newState)),
        setSearchString: mockFn,
      }}
    >
      <Card
        img={mockCards[0].image}
        name={mockCards[0].name}
        species={mockCards[0].species}
        gender={mockCards[0].gender}
        status={mockCards[0].status}
        key={mockCards[0].id}
        id={mockCards[0].id}
        getCardModalDescription={onClick}
      ></Card>
      <ModalCard
        modalActive={modalActive}
        isModalLoading={false}
        deleteCardStringQuery={mockFn}
      />
    </Context.Provider>
  );
};

describe('The card component:', () => {
  test('clicking on a card opens a detailed card component', () => {
    render(renderCardAndModalCard());
    expect(result.current[0]).toBe(false);
    fireEvent.click(screen.getByTestId('card'));
    expect(result.current[0]).toBe(true);
  });

  test('renders the relevant card data', () => {
    render(renderCardAndModalCard());
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  test('clicking triggers an additional API call to fetch detailed information', () => {
    const spyFetch = vi.spyOn(global, 'fetch');

    render(renderCardAndModalCard());

    fireEvent.click(screen.getByTestId('card'));
    expect(spyFetch).toBeCalledTimes(1);
  });
});
