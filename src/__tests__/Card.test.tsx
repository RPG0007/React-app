import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { CardRequest, propsToCard, propsToDetails } from './_fakeData';
import Card from '@/components/CardsSection/Card/Card';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import NoResultsCards from '@/components/CardsSection/NoResultsCards/NoResultsCards';
import Details from '@/pages/details/[id]';
import Spinner from '@/components/Spinner/Spinner';

describe('Tests for the Card component', () => {
  beforeAll(() => {
    vi.mock('next/router', () => require('next-router-mock'));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Ensure that the card component renders the relevant card data', () => {
    mockRouter.setCurrentUrl('/?page=1');

    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...propsToCard} />
        <NoResultsCards />
        <Spinner />
      </RouterContext.Provider>
    );

    const cardName = screen.getByText(propsToCard.name);
    const cardEffect = screen.getByText((content) => {
      return content.includes(propsToCard.status);
    });
    const cardImage = screen.getByAltText('image character');

    expect(cardName).toBeTruthy();
    expect(cardEffect).toBeTruthy();
    expect(cardImage.getAttribute('src')).toBe(propsToCard.img);
  });

  test('Validate that clicking on a card opens a detailed card component && Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    mockRouter.setCurrentUrl('/?page=1&name=');

    render(
      <Provider store={store}>
        <RouterContext.Provider value={mockRouter}>
          <Details datar={CardRequest} detailsdatar={propsToDetails} />
        </RouterContext.Provider>
      </Provider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toBeTruthy();

    expect(mockRouter.query).toEqual(
      expect.not.objectContaining({
        id: expect.anything(),
      })
    );

    await waitFor(() => {
      fireEvent.click(cards[0]);
    });

    expect(mockRouter.query).toEqual(
      expect.objectContaining({
        page: '1',
        name: '',
      })
    );
  });
});
