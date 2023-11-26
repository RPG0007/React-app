import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '../pages/index';
import { CardRequest } from './_fakeData';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Search from '@/components/Search/Search';

vi.mock('next/router', () => require('next-router-mock'));
test('Make sure the component updates URL query parameter when page changes', async () => {
  mockRouter.setCurrentUrl('/?page=2');
  render(
    <Provider store={store}>
      <RouterContext.Provider value={mockRouter}>
        <Home datar={CardRequest} />
      </RouterContext.Provider>
    </Provider>
  );

  const nextBtn = screen.getByTestId('button-next-page');
  const prevBtn = screen.getByTestId('button-prev-page');
  const pagination = screen.getByTestId('pagination');

  expect(pagination).toBeInTheDocument();
  expect(nextBtn).toBeInTheDocument();
  expect(prevBtn).toBeInTheDocument();
  expect(mockRouter.query).toEqual({ page: '2' });
  await waitFor(() => {
    fireEvent.click(nextBtn);
  });
  await waitFor(() => {
    fireEvent.click(prevBtn);
  });
  setTimeout(() => {
    expect(mockRouter.query).toEqual({ page: '1', name: '' });
  }, 200);
});

test('function "new search" currectly work without error', async () => {
  render(
    <Provider store={store}>
      <RouterContext.Provider value={mockRouter}>
        <Search disabled={false} />
      </RouterContext.Provider>
    </Provider>
  );

  fireEvent.click(screen.getByTestId('input-btn'));
});
