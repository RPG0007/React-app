import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { Component } from 'react';

interface ISearchString {
  searchString: string;
  setSearchString(searchString: string): void;
  searchStringQuery(searchString: string): void;
  disabled: boolean;
}

export default class Search extends Component<ISearchString> {
  constructor(props: ISearchString) {
    super(props);
    this.handlerKeyUp = this.handlerKeyUp.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const { searchString, searchStringQuery } = this.props;
    return event.code === 'Enter' && searchStringQuery(searchString);
  }

  handlerClick() {
    const { searchStringQuery, searchString } = this.props;
    searchStringQuery(searchString);
  }

  handlerChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { setSearchString } = this.props;
    setSearchString(event.target.value);
  }

  render() {
    const { searchString, disabled } = this.props;

    return (
      <div className={styles['search-section']}>
        <input
          type="text"
          className={styles['search-input']}
          value={searchString}
          placeholder="search by name"
          disabled={disabled}
          onChange={this.handlerChange}
          onKeyUp={this.handlerKeyUp}
        ></input>
        <button
          className={styles['search-button']}
          onClick={this.handlerClick}
          disabled={disabled}
        >
          <img
            className={styles['search-icon']}
            src={searchIcon}
            alt="search icon"
          ></img>
        </button>
      </div>
    );
  }
}
