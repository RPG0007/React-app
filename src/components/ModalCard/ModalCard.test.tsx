import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalCard from './ModalCard';
import { useState } from 'react';
import { Provider } from 'react-redux/es/exports';
import { store } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import CardsSection from '../CardsSection/CardsSection';

const mockFn = vi.fn(() => true);

const { result } = renderHook(() => useState(true));

describe('The detailed card:', () => {
  test('clicking the close button hides the component', async () => {
    render(
      <MemoryRouter initialEntries={['/?name=&page=1&card=3']}>
        <Provider store={store}>
          <ModalCard deleteCardStringQuery={mockFn} />
        </Provider>
      </MemoryRouter>
    );
    expect(result.current[0]).toBe(true);
    fireEvent.click(screen.getByTestId('modal-close'));
    await expect(result.current[0]).toBe(true);
  });

  test('loading indicator is displayed while fetching data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardsSection />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('component correctly displays data', async () => {
    render(
      <MemoryRouter initialEntries={['/?name=&page=1&card=2']}>
        <Provider store={store}>
          <ModalCard deleteCardStringQuery={mockFn} />
        </Provider>
      </MemoryRouter>
    );

    expect(await screen.getByText('character not found')).toBeInTheDocument();
  });
});
