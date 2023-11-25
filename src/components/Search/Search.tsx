import styles from './Search.module.css';
import searchIcon from '../../assets/search.png';
import { ISearch } from '../../types/interfaces';
//import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSearchString } from '../../store/mainPageSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Search({ disabled }: ISearch) {
  // const name = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchString = useAppSelector((state) => state.mainPage.searchString);
  const actionOnNewSearch = () => {
    router.push({
      query: { page:'1', name:searchString },
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
    <div className={styles.searchSection}>
      <input
        type="search"
        className={styles.searchInput}
        value={searchString}
        placeholder="search by name"
        disabled={disabled}
        onChange={handlerChange}
        onKeyUp={handlerKeyUp}
        data-testid={'input-search'}
      ></input>
      <button
        className={styles.searchButton}
        onClick={handlerClick}
        disabled={disabled}
        data-testid={'input-btn'}
      >
        <Image
          src={searchIcon}
          alt="search icon"
          width={40}
          height={40}
          priority={true}
          className={styles.searchIcon}
        />
      </button>
    </div>
  );
}
