import { describe, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './Pagination';
import { Provider } from 'react-redux/es/exports';
import { store } from '../../store/store';

const renderPagination = (currentPage: number) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Pagination currentPage={currentPage} />
      </Provider>
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
