import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';

interface ISearchString {
  searchString: string;
  setSearchString(searchString: string): void;
  searchStringQuery(searchString: string): void;
  disabled: boolean;
}

export default function Search({
  searchString,
  setSearchString,
  searchStringQuery,
  disabled,
}: ISearchString) {
  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    return event.code === 'Enter' && searchStringQuery(searchString);
  }

  function handlerClick() {
    searchStringQuery(searchString);
  }

  function handlerChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  return (
    <div className={styles['search-section']}>
      <input
        type="text"
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
