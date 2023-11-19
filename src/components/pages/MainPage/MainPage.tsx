import './MainPage.css';
import ModalCard from '../../ModalCard/ModalCard';
import CardsSection from '../../CardsSection/CardsSection';
import ErrorButton from '../../ErrorBoundary/ErrorButton/ErrorButton';
import Pagination from '../../Pagination/Pagination';
import Seacrh from '../../Search/Search';
import { Context } from '../../../context/context';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  ICardDescription,
  ClickedButtonFuturePage,
} from '../../../types/interfaces';
import { BASE_URL } from '../../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  changeCurrentPageCards,
  changeIsCardsLoading,
  changeSearchString,
} from '../../../store/cardsSlice';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const cards = useAppSelector((state) => state.cards.cards);
  const isCardsLoading = useAppSelector((state) => state.cards.isCardsLoading);
  const searchString = useAppSelector((state) => state.cards.searchString);
  const isNewSearchCalled = useAppSelector(
    (state) => state.cards.isNewSearchCalled
  );

  const dispatch = useAppDispatch();
  //const changeCards = (cards: Cards) => dispatch(changeCurrentPageCards(cards));

  const searchValue: string | null = searchParams.get('name');
  const initSearchString: string = searchValue ? searchValue : '';

  const searchPage: string | null = searchParams.get('page');
  const initSearchPage: string =
    searchPage && +searchPage > 0 ? searchPage : '1';
  const [currentPage, setCurrentPage] = useState(+initSearchPage);
  const [numPerPage, setPerPage] = useState(20);

  const [allPage, setAllPage] = useState(1);
  const [linkPrevPage, setLinkPrevPage] = useState('');
  const [linkNextPage, setLinkNextPage] = useState('');

  const [cardDescription, setCardDescription] =
    useState<ICardDescription | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [clickedButtonFuturePage, setClickedButtonFuturePage] =
    useState<ClickedButtonFuturePage>('');

  const deleteCardStringQuery = useCallback(() => {
    setSearchParams({ name: searchString, page: `${currentPage}` });
  }, [currentPage, searchString]);

  useEffect(() => {
    const initialSearch = async () => {
      //
      //setIsLoading(true);
      dispatch(changeIsCardsLoading(true));
      //setSearchString(initSearchString);
      dispatch(changeSearchString(initSearchString));

      //

      setCurrentPage(+initSearchPage);

      const searchStringTrimed = initSearchString.trim();

      let futureLinkPage: string = `${BASE_URL}${
        searchString
          ? `?name=${searchStringTrimed}&page=${currentPage}`
          : `?page=${currentPage}`
      }`;

      if (clickedButtonFuturePage === 'next') futureLinkPage = linkNextPage;
      if (clickedButtonFuturePage === 'prev') futureLinkPage = linkPrevPage;

      try {
        const response = await fetch(futureLinkPage);
        const data = await response.json();

        // REDUX
        //setCards(data.results);
        dispatch(changeCurrentPageCards(data.results.slice(0, numPerPage)));
        //setIsLoading(false);
        dispatch(changeIsCardsLoading(false));
        //setSearchString(searchStringTrimed);
        dispatch(changeSearchString(searchStringTrimed));
        //

        setAllPage(data.info.pages);
        setLinkPrevPage(data.info.prev);
        setLinkNextPage(data.info.next);
      } catch (error) {
        console.log(error);
        dispatch(changeCurrentPageCards([]));
        //setCards([]);
        dispatch(changeIsCardsLoading(false));
        //setIsLoading(false);
      }
    };

    initialSearch();
  }, [
    currentPage,
    isNewSearchCalled,
    initSearchString,
    initSearchPage,
    numPerPage,
  ]);

  return (
    <Context.Provider
      value={{
        cards,
        searchString,
        cardDescription,
        //setIsLoading,
        changeIsCardsLoading,
        //setCards,

        setCurrentPage,
        setAllPage,
        setLinkNextPage,
        setLinkPrevPage,
        setIsModalLoading,
        setCardDescription,
        setModalActive,
        //setSearchString,
        setClickedButtonFuturePage,
        //setIsNewSearchCalled,
      }}
    >
      <Seacrh disabled={isCardsLoading}></Seacrh>
      <ErrorButton />
      <CardsSection isLoading={isCardsLoading} currentPage={currentPage} />
      {!isCardsLoading && Boolean(cards.length) && (
        <Pagination
          allPage={allPage}
          currentPage={currentPage}
          linkPrevPage={linkPrevPage}
          linkNextPage={linkNextPage}
          setPerpage={setPerPage}
        />
      )}
      <ModalCard
        modalActive={modalActive}
        isModalLoading={isModalLoading}
        deleteCardStringQuery={deleteCardStringQuery}
      />
    </Context.Provider>
  );
}
