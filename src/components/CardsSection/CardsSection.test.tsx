import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockCards } from '../../mocks/mockData';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux/es/exports';
import { store } from '../../store/store';
import CardsSection from './CardsSection';
import Card from './Card/Card';
import NoResultsCards from './NoResultsCards/NoResultsCards';

const mockFn = vi.fn(() => true);

const renderCardsSection = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CardsSection />
        <Card
          id="1"
          name="Rick Sanchez"
          status="Alive"
          species="Human"
          gender="Male"
          img="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          getCardModalDescription={mockFn}
        />
        <Card
          id="1"
          name="Rick Sanchez"
          status="Alive"
          species="Human"
          gender="Male"
          img="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          getCardModalDescription={mockFn}
        />
      </Provider>
      <NoResultsCards />
    </BrowserRouter>
  );
};

describe('Cards section component:', () => {
  test('displays 2 cards', async () => {
    render(renderCardsSection());
    const renderCards = await screen.getAllByTestId('card');

    expect(renderCards.length).toBe(2);
  });

  test('an empty result message is displayed', () => {
    render(renderCardsSection());

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('function "getCardDescription" currectly work without errors', async () => {
    render(renderCardsSection());
    vi.spyOn(global, 'fetch').mockReturnValue(new Promise(() => mockCards));
    const cards = await screen.getAllByTestId('card');
    fireEvent.click(cards[0]);
  });
});
