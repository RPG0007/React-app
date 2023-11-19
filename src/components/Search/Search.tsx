import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { ISearch } from '../../types/interfaces';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSearchString } from '../../store/mainPageSlice';

export default function Search({ disabled }: ISearch) {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const searchString = useAppSelector((state) => state.mainPage.searchString);

  const actionOnNewSearch = () => {
    setSearchParams({
      name: searchString.trim(),
      page: '1',
    });
  };

  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') actionOnNewSearch();
  }

  const handlerClick = () => {
    actionOnNewSearch();
  };

  function handlerChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeSearchString(event.target.value));
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
