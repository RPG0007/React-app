import './App.css';
import Seacrh from './components/Search/Search';
import Card from './components/Card/Card';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination/Pagination';

export default function App() {
  const localStorageSearchValue: string | null =
    localStorage.getItem('queryString');
  const initSearchString: string = localStorageSearchValue
    ? localStorageSearchValue
    : '';

  const [cards, setCards] = useState<Record<string, string>[]>([]);
  const [searchString, setSearchString] = useState(initSearchString);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(1);
  const [linkPrevPage, setLinkPrevPage] = useState(null);
  const [linkNextPage, setLinkNextPage] = useState(null);

  function searchStringQuery(stringQuery: string) {
    setIsLoading(true);

    stringQuery = stringQuery.trim();
    localStorage.setItem('queryString', stringQuery);

    fetch(
      `https://rickandmortyapi.com/api/character/${
        stringQuery === '' ? `` : `?name=${stringQuery}`
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
    searchStringQuery(searchString);
  }

  useEffect(handlerUseEffect, []);

  return (
    <ErrorBoundary>
      <Seacrh
        searchString={searchString}
        setSearchString={changeStateSearchString}
        searchStringQuery={searchStringQuery}
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
            <h3 className="title">No suitable result was found</h3>
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
    </ErrorBoundary>
  );
}
