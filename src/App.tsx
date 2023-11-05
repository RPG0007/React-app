import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Seacrh from './components/Search/Search';
import Card from './components/Card/Card';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Pagination from './components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const SearchValue: string | null = searchParams.get('name');
  const initSearchString: string = SearchValue ? SearchValue : '';
  const SearchPage: string | null = searchParams.get('page');
  const initSearchPage: string =
    SearchPage && +SearchPage > 0 ? SearchPage : '1';

  const [searchString, setSearchString] = useState(initSearchString);
  const [currentPage, setCurrentPage] = useState(+initSearchPage);
  const [cards, setCards] = useState<Record<string, string>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allPage, setAllPage] = useState(1);
  const [linkPrevPage, setLinkPrevPage] = useState(null);
  const [linkNextPage, setLinkNextPage] = useState(null);

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
        setCards(data.results);
        setIsLoading(false);
        setCurrentPage(+initSearchPage);
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
        setCards(data.results);
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
        setCards(data.results);
        setIsLoading(false);
        setLinkPrevPage(data.info.prev);
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
        setCards(data.results);
        setIsLoading(false);
        setLinkPrevPage(data.info.prev);
        setLinkNextPage(data.info.next);
        setCurrentPage(currentPage - 1);
      })
      .catch((error) => console.log(error));
  }

  function changeStateSearchString(newSearchString: string) {
    setSearchString(newSearchString);
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
            <>
              <Seacrh
                searchString={searchString}
                setSearchString={changeStateSearchString}
                newSearch={newSearch}
                disabled={isLoading}
              ></Seacrh>
              <ErrorButton />
              <div className="cards-wrapper">
                {isLoading && <Spinner />}
                {!isLoading &&
                  (cards.length ? (
                    cards.map((card) => (
                      <Card
                        img={card.image}
                        name={card.name}
                        species={card.species}
                        gender={card.gender}
                        status={card.status}
                        key={card.id}
                      ></Card>
                    ))
                  ) : (
                    <h3 className="title">
                      Unfortunately, no suitable result was found
                    </h3>
                  ))}
              </div>
              {!isLoading && Boolean(cards.length) && (
                <Pagination
                  allPage={allPage}
                  currentPage={currentPage}
                  goToNextPage={goToNextPage}
                  goToPrevPage={goToPrevPage}
                ></Pagination>
              )}
            </>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}
