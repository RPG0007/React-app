import './MainPage.css';
import ModalCard from '../../ModalCard/ModalCard';
import CardsSection from '../../CardsSection/CardsSection';
import ErrorButton from '../../ErrorBoundary/ErrorButton/ErrorButton';
import Pagination from '../../Pagination/Pagination';
import Seacrh from '../../Search/Search';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  changeCurrentCards,
  changeIsCardsLoading,
  changeSearchString,
  changeAllPage,
} from '../../../store/mainPageSlice';
import { useGetResultNewSearchQuery } from '../../../store/api';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const queryStringSearch: string | null = searchParams.get('name');
  const initSearchString: string = queryStringSearch ? queryStringSearch : '';

  const queryStringPage: string | null = searchParams.get('page');
  const initSearchPage: number =
    queryStringPage && +queryStringPage > 0 ? +queryStringPage : 1;

  const cards = useAppSelector((state) => state.mainPage.cards);
  const numPerpage = useAppSelector((state) => state.mainPage.numPerpage);
  const isCardsLoading = useAppSelector(
    (state) => state.mainPage.isCardsLoading
  );

  const deleteCardStringQuery = useCallback(() => {
    setSearchParams({ name: initSearchString, page: `${initSearchPage}` });
  }, [initSearchPage, initSearchString]);

  const queryString = `${
    initSearchString
      ? `?name=${initSearchString}&page=${initSearchPage}`
      : `?page=${initSearchPage}`
  }`;

  const { currentData, isFetching } = useGetResultNewSearchQuery(queryString);

  useEffect(() => {
    dispatch(changeIsCardsLoading(isFetching));
  }, [isFetching]);

  useEffect(() => {
    dispatch(changeSearchString(initSearchString));

    if (currentData) {
      dispatch(changeCurrentCards(currentData.results.slice(0, numPerpage)));
      dispatch(changeAllPage(currentData.info.pages));
    } else {
      dispatch(changeCurrentCards([]));
    }
  }, [initSearchString, currentData, numPerpage]);

  return (
    <>
      <Seacrh disabled={isCardsLoading}></Seacrh>
      <ErrorButton />
      <CardsSection />
      {!isCardsLoading && Boolean(cards.length) && (
        <Pagination currentPage={initSearchPage} />
      )}
      <ModalCard deleteCardStringQuery={deleteCardStringQuery} />
    </>
  );
}
