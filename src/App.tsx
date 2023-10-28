import './App.css';
import { Component } from 'react';
import Seacrh from './components/Search/Search';
import Card from './components/Card/Card';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';

interface IState {
  cards: Record<string, string>[];
  searchString: string;
  isLoading: boolean;
}

export default class App extends Component {
  localStorageSearchValue: string | null = localStorage.getItem('queryString');
  initSearchString: string = this.localStorageSearchValue
    ? this.localStorageSearchValue
    : '';
  arrayNumsFrom1To100: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  constructor(props: Record<string, never>) {
    super(props);
    this.searchStringQuery = this.searchStringQuery.bind(this);
    this.changeStateSearchString = this.changeStateSearchString.bind(this);
  }

  state: IState = {
    cards: [],
    searchString: this.initSearchString,
    isLoading: true,
  };

  changeStateSearchString(newSearchString: string) {
    const { isLoading, cards } = this.state;
    this.setState({ searchString: newSearchString, cards, isLoading });
  }

  searchStringQuery(stringQuery: string) {
    const { cards, searchString } = this.state;

    this.setState({ isLoading: true, cards, searchString });

    stringQuery = stringQuery.trim();
    localStorage.setItem('queryString', stringQuery);

    fetch(
      `https://rickandmortyapi.com/api/character/${
        stringQuery === ''
          ? `${this.arrayNumsFrom1To100}`
          : `?name=${stringQuery}`
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cards: data.results ? data.results : data,
          searchString: stringQuery,
          isLoading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.searchStringQuery(this.state.searchString);
  }

  render() {
    const { isLoading, cards, searchString } = this.state;
    return (
      <ErrorBoundary>
        <Seacrh
          searchString={searchString}
          setSearchString={this.changeStateSearchString}
          searchStringQuery={this.searchStringQuery}
          disabled={this.state.isLoading}
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
      </ErrorBoundary>
    );
  }
}
