import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { Context } from '../../context/context';
import { useContext } from 'react';
import { ISearchProps } from '../../types/interfaces';
import { useSearchParams } from 'react-router-dom';
import * as constants from '../../constants/constants';

export default function Search({ disabled }: ISearchProps) {
  const {
    searchString,
    setIsLoading,
    setCards,
    setCurrentPage,
    setAllPage,
    setLinkNextPage,
    setLinkPrevPage,
    setSearchString,
  } = useContext(Context);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const newSearch = async (stringQuery: string) => {
    setIsLoading(true);
    stringQuery = stringQuery.trim();
    setSearchParams({ name: stringQuery, page: `1` });
    try {
      const response = await fetch(
        `${constants.BASE_URL}${
          stringQuery ? `?name=${stringQuery}&page=1` : ''
        }`
      );
      const data = await response.json();

      setCards(data.results);
      setSearchString(stringQuery);
      setIsLoading(false);
      setCurrentPage(1);
      setAllPage(data.info.pages);
      setLinkPrevPage(data.info.prev);
      setLinkNextPage(data.info.next);
    } catch (error) {
      console.log(error);
      setCards([]);
      setIsLoading(false);
    }
  };

  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    return event.code === 'Enter' && newSearch(searchString);
  }

  function handlerClick() {
    newSearch(searchString);
  }

  function handlerChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  return (
    <div className={styles['search-section']}>
      <input
        type="search"
        className={styles['search-input']}
        value={searchString}
        placeholder="search by name"
        disabled={disabled}
        onChange={handlerChange}
        onKeyUp={handlerKeyUp}
        data-testid={'input-search'}
      ></input>
      <button
        className={styles['search-button']}
        onClick={handlerClick}
        disabled={disabled}
        data-testid={'input-btn'}
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
