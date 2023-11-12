import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { Context } from '../../context';
import { useContext } from 'react';

interface ISearchString {
  setSearchString(searchString: string): void;
  newSearch(searchString: string): void;
  disabled: boolean;
}

export default function Search({
  setSearchString,
  newSearch,
  disabled,
}: ISearchString) {
  const { searchString } = useContext(Context);

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
      ></input>
      <button
        className={styles['search-button']}
        onClick={handlerClick}
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
