import './MainPage.css';
import ModalCard from '../../ModalCard/ModalCard';
import CardsSection from '../../CardsSection/CardsSection';
import ErrorButton from '../../ErrorBoundary/ErrorButton/ErrorButton';
import Pagination from '../../Pagination/Pagination';
import Seacrh from '../../Search/Search';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { BASE_URL } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  changeCurrentPage,
  changeCurrentCards,
  changeIsCardsLoading,
  changeSearchString,
  changeAllPage,
} from '../../../store/mainPageSlice';

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
  const searchString = useAppSelector((state) => state.mainPage.searchString);
  const isNewSearchCalled = useAppSelector(
    (state) => state.mainPage.isNewSearchCalled
  );
  const currentPage = useAppSelector((state) => state.mainPage.currentPage);

  const deleteCardStringQuery = useCallback(() => {
    setSearchParams({ name: searchString, page: `${currentPage}` });
  }, [currentPage, searchString]);

  useEffect(() => {
    const initialSearch = async () => {
      const searchStringTrimed = initSearchString.trim();

      dispatch(changeIsCardsLoading(true));
      dispatch(changeSearchString(searchStringTrimed));
      dispatch(changeCurrentPage(initSearchPage));

      const queryString = `${
        searchString
          ? `?name=${searchStringTrimed}&page=${initSearchPage}`
          : `?page=${initSearchPage}`
      }`;

      const nextLinkPage: string = `${BASE_URL}${queryString}`;

      try {
        const response = await fetch(nextLinkPage);
        const data = await response.json();

        dispatch(changeCurrentCards(data.results.slice(0, numPerpage)));
        dispatch(changeIsCardsLoading(false));
        dispatch(changeSearchString(searchStringTrimed));
        dispatch(changeAllPage(data.info.pages));
      } catch (error) {
        console.log(error);
        dispatch(changeCurrentCards([]));
        dispatch(changeIsCardsLoading(false));
      }
    };

    initialSearch();
  }, [
    currentPage,
    isNewSearchCalled,
    initSearchString,
    initSearchPage,
    numPerpage,
  ]);

  return (
    <>
      <Seacrh disabled={isCardsLoading}></Seacrh>
      <ErrorButton />
      <CardsSection />
      {!isCardsLoading && Boolean(cards.length) && <Pagination />}
      <ModalCard deleteCardStringQuery={deleteCardStringQuery} />
    </>
  );
}
