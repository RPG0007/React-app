import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../pages/404';
import Home, { getServerSideProps } from '@/pages';
import { CardRequest } from './_fakeData';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the 404 Page component', () => {
  it('404 page is displayed when navigating to an invalid route.', async () => {
    render(<ErrorPage />);
    expect(screen.getByTestId('404-error-page')).toBeInTheDocument();
   
  });

 

  it('renders snapshot of app component', () => {
    const tree = render(
      <ErrorBoundary>
      <Provider store={store}> 
    <Home datar={CardRequest} />
    </Provider>
    </ErrorBoundary>)
    console.log(tree)
    expect(tree).toMatchSnapshot()
  })
  it('prepares pageProps for component', async () => {
    const context2 = {
        query: { page:'1',name:"",id: "fjdks" } as ParsedUrlQuery
    };
     const value2 =  getServerSideProps(context2 as GetServerSidePropsContext);
     expect (value2).toBeTruthy();

  })
});