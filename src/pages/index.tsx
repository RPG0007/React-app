import Layout from './layout';
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
        datar: data?.data,
      },
    };
  }
);
