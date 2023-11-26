import Layout from '@/pages/layout';
import { wrapper } from '@/store/store';
import { rickAndMortyApi, getResultNewSearch, getCardDesctiption } from '@/store/api';
import { checkRouterElement } from '@/utils/functions';
import ModalCard from '@/components/ModalCard/ModalCard';
import { ICardDescription, IResponseApi } from '@/types/interfaces';

const Details = (props: {
  datar:IResponseApi ;
  detailsdatar:ICardDescription;
}) => {
   
  const { datar, detailsdatar } = props;
  return (
    <Layout data={datar}>
      <ModalCard detailsData={detailsdatar} />
    </Layout>
  );
};
export default Details;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page, name, id } = context.query;

    const data = await store.dispatch(
        getResultNewSearch.initiate(`?page=${checkRouterElement(page, '1')}&name=${checkRouterElement(name, '')}
      `)
    );
    const detailsdata = await store.dispatch(
        getCardDesctiption.initiate( {id: checkRouterElement(id, '')}
      )
    );

    await Promise.all(store.dispatch(rickAndMortyApi.util.getRunningQueriesThunk()));

    return {
      props: {
        datar: data?.data,
        detailsdatar: detailsdata?.data,
      },
    };
  }
);