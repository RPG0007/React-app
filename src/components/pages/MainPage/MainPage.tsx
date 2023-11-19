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
  Cards,
  ClickedButtonFuturePage,
} from '../../../types/interfaces';
import { BASE_URL } from '../../../constants/constants';

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue: string | null = searchParams.get('name');
  const initSearchString: string = searchValue ? searchValue : '';
  const [searchString, setSearchString] = useState(initSearchString);

  const searchPage: string | null = searchParams.get('page');
  const initSearchPage: string =
    searchPage && +searchPage > 0 ? searchPage : '1';
  const [currentPage, setCurrentPage] = useState(+initSearchPage);
  const [numPerPage, setPerPage] = useState(20);
  const [cards, setCards] = useState<Cards>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [allPage, setAllPage] = useState(1);
  const [linkPrevPage, setLinkPrevPage] = useState('');
  const [linkNextPage, setLinkNextPage] = useState('');

  const [cardDescription, setCardDescription] =
    useState<ICardDescription | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [clickedButtonFuturePage, setClickedButtonFuturePage] =
    useState<ClickedButtonFuturePage>('');

  const [isNewSearchCalled, setIsNewSearchCalled] = useState(0);

  const deleteCardStringQuery = useCallback(() => {
    setSearchParams({ name: searchString, page: `${currentPage}` });
  }, [currentPage, searchString]);

  useEffect(() => {
    const initialSearch = async () => {
      setIsLoading(true);
      setCurrentPage(+initSearchPage);
      setSearchString(initSearchString);

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

        setCards(data.results.slice(0, numPerPage));
        setSearchString(searchStringTrimed);
        setAllPage(data.info.pages);
        setLinkPrevPage(data.info.prev);
        setLinkNextPage(data.info.next);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setCards([]);
        setIsLoading(false);
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
        setIsLoading,
        setCards,
        setCurrentPage,
        setAllPage,
        setLinkNextPage,
        setLinkPrevPage,
        setIsModalLoading,
        setCardDescription,
        setModalActive,
        setSearchString,
        setClickedButtonFuturePage,
        setIsNewSearchCalled,
      }}
    >
      <Seacrh disabled={isLoading}></Seacrh>
      <ErrorButton />
      <CardsSection isLoading={isLoading} currentPage={currentPage} />
      {!isLoading && Boolean(cards.length) && (
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
