import './App.css';
import Seacrh from './components/Search/Search';
import Card from './components/Card/Card';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import { useEffect, useState } from 'react';

export default function App() {
  const localStorageSearchValue: string | null =
    localStorage.getItem('queryString');
  const initSearchString: string = localStorageSearchValue
    ? localStorageSearchValue
    : '';
  const arrayNumsFrom1To100: number[] = Array.from(
    { length: 100 },
    (_, i) => i + 1
  );

  const [cards, setCards] = useState<Record<string, string>[]>([]);
  const [searchString, setSearchString] = useState(initSearchString);
  const [isLoading, setIsLoading] = useState(true);

  function searchStringQuery(stringQuery: string) {
    setIsLoading(true);

    stringQuery = stringQuery.trim();
    localStorage.setItem('queryString', stringQuery);

    fetch(
      `https://rickandmortyapi.com/api/character/${
        stringQuery === '' ? `${arrayNumsFrom1To100}` : `?name=${stringQuery}`
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setCards(data.results ? data.results : data);
        setSearchString(stringQuery);
        setIsLoading(false);
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
    </ErrorBoundary>
  );
}
