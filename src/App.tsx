import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Seacrh from './components/Search/Search';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Pagination from './components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ModalCard from './components/ModalCard/ModalCard';
import { Context } from './context';
import CardsSection from './components/CardsSection/CardsSection';
import ModalCardContent from './components/ModalCard/ModalCardContent/ModalCardContent';

export interface ICardDescription {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  image: string;
}

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const SearchValue: string | null = searchParams.get('name');
  const initSearchString: string = SearchValue ? SearchValue : '';
  const SearchPage: string | null = searchParams.get('page');
  const initSearchPage: string =
    SearchPage && +SearchPage > 0 ? SearchPage : '1';
  const SearchCard: string | null = searchParams.get('card');
  const initSearchCard: string = SearchCard ? SearchCard : '';

  const [searchString, setSearchString] = useState(initSearchString);
  const [cards, setCards] = useState<Record<string, string>[]>([]);
  const [currentPage, setCurrentPage] = useState(+initSearchPage);
  const [isLoading, setIsLoading] = useState(true);
  const [allPage, setAllPage] = useState(1);
  const [numPerPage, setPerPage] = useState(20);
  const [linkPrevPage, setLinkPrevPage] = useState(null);
  const [linkNextPage, setLinkNextPage] = useState(null);

  const [modalActive, setModalActive] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [cardDescription, setCardDescription] = useState<ICardDescription>(
    {} as ICardDescription
  );

  function setPerPagecount(perpage: number) {
    setPerPage(perpage);
  }

  function initialSearch() {
    setIsLoading(true);
    setSearchString(initSearchString);

    fetch(
      `https://rickandmortyapi.com/api/character/${
        initSearchString
          ? `?name=${initSearchString}&page=${initSearchPage}`
          : `?page=${initSearchPage}`
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Not found results');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setCards(data.results.slice(0, numPerPage));
        setIsLoading(false);
        setCurrentPage(+initSearchPage);
        setAllPage(data.info.pages);
        setLinkPrevPage(data.info.prev);
        setLinkNextPage(data.info.next);
      })
      .then(() => {
        if (initSearchCard) {
          setModalActive(true);
          getCardDescription(initSearchCard);
        }
      })
      .catch((error) => {
        console.log(error);
        setCards([]);
        setIsLoading(false);
      });
  }

  function newSearch(stringQuery: string) {
    setIsLoading(true);
    stringQuery = stringQuery.trim();
    setSearchParams({ name: stringQuery, page: `1` });

    fetch(
      `https://rickandmortyapi.com/api/character/${
        stringQuery ? `?name=${stringQuery}&page=1` : ''
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Not found results');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setCards(data.results.slice(0, numPerPage));
        setSearchString(stringQuery);
        setIsLoading(false);
        setCurrentPage(1);
        setAllPage(data.info.pages);
        setLinkPrevPage(data.info.prev);
        setLinkNextPage(data.info.next);
      })
      .catch((error) => {
        console.log(error);
        setCards([]);
        setIsLoading(false);
      });
  }

  function goToNextPage() {
    setIsLoading(true);
    setSearchParams({ name: searchString, page: `${currentPage + 1}` });

    fetch(`${linkNextPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data.results.slice(0, numPerPage));
        setIsLoading(false);
        setLinkPrevPage(data.info.prev);
        setAllPage(data.info.pages);
        setLinkNextPage(data.info.next);
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => console.log(error));
  }

  function goToPrevPage() {
    setIsLoading(true);
    setSearchParams({ name: searchString, page: `${currentPage - 1}` });

    fetch(`${linkPrevPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data.results.slice(0, numPerPage));
        setIsLoading(false);
        setAllPage(data.info.pages);
        setLinkPrevPage(data.info.prev);
        setLinkNextPage(data.info.next);
        setCurrentPage(currentPage - 1);
      })
      .catch((error) => console.log(error));
  }

  function getCardDescription(cardId: string) {
    setIsModalLoading(true);
    setSearchParams({
      name: searchString,
      page: `${currentPage}`,
      card: `${cardId}`,
    });

    fetch(`https://rickandmortyapi.com/api/character/${cardId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Not found results');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setIsModalLoading(false);
        setCardDescription(data);
      })
      .catch((error) => {
        console.log(error);
        setIsModalLoading(false);
        setCardDescription({} as ICardDescription);
      });
  }
  function deleteCardStringQuery() {
    setSearchParams({ name: searchString, page: `${currentPage}` });
  }

  function changeStateSearchString(newSearchString: string) {
    setSearchString(newSearchString);
  }

  function changeStateModalActive(newState: boolean) {
    setModalActive(newState);
  }

  function handlerUseEffect() {
    initialSearch();
  }

  useEffect(handlerUseEffect, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/"
          element={
            <Context.Provider value={{ cards, searchString, cardDescription }}>
              <Seacrh
                setSearchString={changeStateSearchString}
                newSearch={newSearch}
                disabled={isLoading}
              ></Seacrh>
              <ErrorButton />
              <CardsSection
                isLoading={isLoading}
                changeStateModalActive={changeStateModalActive}
                getCardDescription={getCardDescription}
              />
              {!isLoading && Boolean(cards.length) && (
                <Pagination
                  allPage={allPage}
                  currentPage={currentPage}
                  goToNextPage={goToNextPage}
                  goToPrevPage={goToPrevPage}
                  handlePerPageChange={setPerPagecount}
                  newSearch={newSearch}
                  searchString={searchString}
                />
              )}
              {
                <ModalCard
                  modalActive={modalActive}
                  setModalActive={changeStateModalActive}
                  deleteCardStringQuery={deleteCardStringQuery}
                >
                  <Outlet />
                </ModalCard>
              }
            </Context.Provider>
          }
        >
          <Route
            index
            element={<ModalCardContent isModalLoading={isModalLoading} />}
          ></Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
