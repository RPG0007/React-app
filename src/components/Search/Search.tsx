import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { Context } from '../../context/context';
import { useContext, useState } from 'react';
import { ISearch } from '../../types/interfaces';
import { useSearchParams } from 'react-router-dom';

export default function Search({ disabled }: ISearch) {
  const { searchString, setSearchString, setIsNewSearchCalled } =
    useContext(Context);
  const [, setSearchParams] = useSearchParams();

  const [prevSearchString, setPrevSearchString] = useState(searchString);

  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter' && prevSearchString !== searchString) {
      setPrevSearchString(searchString);
      setIsNewSearchCalled(Math.random());
      setSearchParams({
        name: searchString,
        page: '1',
      });
    }
  }

  function handlerClick() {
    if (prevSearchString !== searchString) {
      setPrevSearchString(searchString);
      setIsNewSearchCalled(Math.random());
      setSearchParams({
        name: searchString,
        page: '1',
      });
    }
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
