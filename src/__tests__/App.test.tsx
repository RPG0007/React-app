import React from 'react';
import App from '@/pages/_app';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';
import { Router } from 'next/router';
 

const mockRouter: Partial<Router> = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  basePath: '',
  isReady: true,
  isPreview: false,
  isLocaleDomain: false,
  forward: vi.fn(),
};

vi.mock('react-redux', () => ({
  Provider: vi.fn(({ children }) => children),
}));
vi.mock('@/components/error-boundary/ErrorBoundary', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => children),
}));

describe('App Component', () => {
  test('renders Provider', () => {
    const TestComponent = () => <div>Test Component</div>;
    render(
      <App
        Component={TestComponent}
        pageProps={{}}
        router={mockRouter as Router}
      />
    );

    expect(Provider).toHaveBeenCalled();
  });

  test('renders passed Component with pageProps', () => {
    const TestComponent = vi.fn(() => <div>Test Component</div>);
    const pageProps = { testProp: 'test' };

    render(
      <App
        Component={TestComponent}
        pageProps={pageProps}
        router={mockRouter as Router}
      />
    );

    expect(TestComponent).toHaveBeenCalledWith(
      expect.objectContaining(pageProps),
      {}
    );
  });
});