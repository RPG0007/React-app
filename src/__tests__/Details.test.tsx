import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { CardRequest, propsToDetails } from './_fakeData';
import mockRouter from 'next-router-mock';
import ModalCard from '../components/ModalCard/ModalCard';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Details, { getServerSideProps } from '@/pages/details/[id]';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

vi.stubGlobal('getServerSideProps', {
  datar: CardRequest,
  detailsdatar:propsToDetails,
});

describe('Tests for the Detailed Card component', () => {
  it('Detailed card component correctly displays the detailed card data;', async () => {
     

    render(
      <Provider store={store}> 
      <RouterContext.Provider value={mockRouter}>
     <Details  datar={ CardRequest} detailsdatar={propsToDetails} />
     </RouterContext.Provider>
   </Provider>
    );
  

    expect(await screen.findByTestId('modal-card-content')).toHaveTextContent(
      'Morty Smith'
    );
    expect(screen.getByText('location: Citadel of Ricks')).toBeInTheDocument();
    cleanup();
  });

  it('Clicking the close button hides the component.', async () => {
    mockRouter.push('/details/2');
    render(
      <Provider store={store}> 
       <RouterContext.Provider value={mockRouter}>
      <ModalCard detailsData={propsToDetails} />,
      </RouterContext.Provider>
    </Provider>
    );
    expect(await screen.findByTestId('modal-close')).toBeInTheDocument();
 
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(mockRouter.asPath).toEqual('/?page=1');
  });
  it('checking serversideprops',async ()=>{
    const context = {
      query: { page:'1',name:"",id: "fjdks" } as ParsedUrlQuery
  };
   const value =  getServerSideProps(context as GetServerSidePropsContext);
   expect (value).toBeTruthy(); 
  }

  )
});