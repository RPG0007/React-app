import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { mockCards } from '../../../mocks/mockData';
import ModalCard from '../../ModalCard/ModalCard';
import { useState } from 'react';
import { Provider } from 'react-redux/es/exports';
import { store } from '../../../store/store';
import { BrowserRouter } from 'react-router-dom';

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

const renderCardAndModalCard = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
        <ModalCard deleteCardStringQuery={mockFn} />
      </BrowserRouter>
    </Provider>
  );
};

describe('The card component:', () => {
  test('clicking on a card opens a detailed card component', () => {
    render(renderCardAndModalCard());
    expect(result.current[0]).toBe(false);
    fireEvent.click(screen.getByTestId('card'));
    expect(result.current[0]).toBe(false);
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
