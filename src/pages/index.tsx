import Layout from './layout';
import React from 'react';
import { wrapper } from '@/store/store';
import { getResultNewSearch, rickAndMortyApi } from '@/store/api';
import { checkRouterElement } from '@/utils/functions';
import { IResponseApi } from '@/types/interfaces';

export default function Home(data: { datar: IResponseApi }) {
  const newData = data.datar;
  return <Layout data={newData} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, name } = context.query;

    const data = await store.dispatch(
      getResultNewSearch.initiate(`?page=${checkRouterElement(
        page,
        '1'
      )}&name=${checkRouterElement(name, '')}
      `)
    );

    await Promise.all(
      store.dispatch(rickAndMortyApi.util.getRunningQueriesThunk())
    );
    return {
      props: {
        datar: data?.data?.results
          ? data.data
          : {
              info: {
                count: 1,
                pages: 1,
                next: 'https://rickandmortyapi.com/api/character/?page=2',
                prev: null,
              },
              results: [],
            },
      },
    };
  }
);
