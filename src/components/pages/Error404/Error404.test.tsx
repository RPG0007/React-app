import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Error404 from './Error404';
import MainPage from '../MainPage/MainPage';

describe('Tests for the 404 Page component', () => {
  it('404 page is displayed when navigating to an invalid route.', async () => {
    const page = render(
      <MemoryRouter initialEntries={['/sdfghjsdfghj']}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </MemoryRouter>
    );
    expect(page.getByTestId('404-error-page')).toBeInTheDocument();
    expect(screen.getByTestId('404-error-page')).toBeInTheDocument();
  });

  it('Render errorElements (not errorPage) to get coverage 100%', async () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>
    );
  });
});
