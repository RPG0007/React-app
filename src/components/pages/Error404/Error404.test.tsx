import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { BrowserRouter, Link } from 'react-router-dom';
import App from '../../App/App';

const renderApp = () => {
  return (
    <BrowserRouter>
      <Link to="/some-text" data-testid="404-page-link">
        Error 404 page link
      </Link>
      <App />
    </BrowserRouter>
  );
};

describe('404 Page component:', () => {
  test('displayed when navigating to an invalid route', () => {
    render(renderApp());

    expect(screen.queryByTestId('404-error-page')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('404-page-link'));

    expect(screen.getByTestId('404-error-page')).toBeInTheDocument();
  });
});
