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
  localStorageSearchValue: string | null = localStorage.getItem('savedSearch');
  initSearchString: string = this.localStorageSearchValue
    ? this.localStorageSearchValue
    : '';
  arrayNumsFrom1To100: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  constructor(props: Record<string, never>) {
    super(props);
    this.searchInput = this.searchInput.bind(this);
    this.changeStateSearchInput = this.changeStateSearchInput.bind(this);
  }

  state: IState = {
    cards: [],
    searchString: this.initSearchString,
    isLoading: true,
  };

  changeStateSearchInput(newSearchString: string) {
    const { isLoading, cards } = this.state;
    this.setState({ searchString: newSearchString, cards, isLoading });
  }

  searchInput(stringQuery: string) {
    const { cards, searchString } = this.state;

    this.setState({ isLoading: true, cards, searchString });

    stringQuery = stringQuery.trim();
    localStorage.setItem('savedSearch', stringQuery);

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
    this.searchInput(this.state.searchString);
  }

  render() {
    const { isLoading, cards, searchString } = this.state;
    return (
      <ErrorBoundary>
        <Seacrh
          searchString={searchString}
          setSearchString={this.changeStateSearchInput}
          searchStringQuery={this.searchInput}
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
