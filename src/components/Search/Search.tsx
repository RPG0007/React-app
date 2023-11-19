import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { ISearch } from '../../types/interfaces';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeIsNewSearchCalled,
  changeSearchString,
  changePrevSearchString,
} from '../../store/cardsSlice';

export default function Search({ disabled }: ISearch) {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const searchString = useAppSelector((state) => state.cards.searchString);
  const prevSearchString = useAppSelector(
    (state) => state.cards.prevSearchString
  );

  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter' && prevSearchString !== searchString) {
      dispatch(changePrevSearchString(searchString));
      dispatch(changeIsNewSearchCalled(Math.random()));
      setSearchParams({
        name: searchString,
        page: '1',
      });
    }
  }

  function handlerClick() {
    if (prevSearchString !== searchString) {
      dispatch(changePrevSearchString(searchString));
      dispatch(changeIsNewSearchCalled(Math.random()));
      setSearchParams({
        name: searchString,
        page: '1',
      });
    }
  }

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
