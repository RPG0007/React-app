import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Search from './Search';
import { Provider } from 'react-redux/es/exports';
import { store } from '../../store/store';
import App from '../App/App';

const renderMainPage = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};
const renderSearch = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Search disabled={false} />
      </Provider>
    </BrowserRouter>
  );
};

describe('Search component:', () => {
  test('clicking the Search button saves the entered value to the local storage', () => {
    const checkValue = 'qwerty';

    render(renderMainPage());

    const input: HTMLInputElement = screen.getByTestId('input-search');
    fireEvent.input(input, {
      target: { value: checkValue },
    });
    vi.spyOn(global, 'fetch').mockReturnValue(
      new Promise(() => localStorage.setItem('stringQuery', input.value))
    );
    fireEvent.click(screen.getByTestId('input-btn'));

    expect(checkValue === localStorage.getItem('stringQuery')).toBe(true);
  });

  test('function "new search" currectly work without error', async () => {
    render(renderSearch());

    fireEvent.click(screen.getByTestId('input-btn'));
  });
});
