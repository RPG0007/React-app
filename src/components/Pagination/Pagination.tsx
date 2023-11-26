import styles from './Pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changenumPerpage } from '../../store/mainPageSlice';
import React from 'react';
import { useState } from 'react';
import { IPagination } from '../../types/interfaces';
import { useRouter } from 'next/router';

export default function Pagination({ currentPage }: IPagination) {
  const router = useRouter();
  let { page } = router.query;
  const dispatch = useAppDispatch();

  if (!page) {
    page = '1';
  }
  const [prevPerpagenumber, setPerPageNumber] = useState(20);
  const searchString = useAppSelector((state) => state.mainPage.searchString);
  const allPage = useAppSelector((state) => state.mainPage.allPage);

  const handleClickPrevPage = () => {
    router.push({
      query: {
        page: page ? `${+page - 1}` : `1`,
        name: searchString ? searchString : '',
      },
    });
  };

  const handleClickNextPage = () => {
    router.push({
      query: {
        page: page ? `${+page + 1}` : `1`,
        name: searchString ? searchString : '',
      },
    });
  };

  function handlePerPageChanges(event: React.ChangeEvent<HTMLInputElement>) {
    setPerPageNumber(parseInt(event.target.value));
  }
  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      dispatch(changenumPerpage(prevPerpagenumber));
      router.push({
        query: {
          page: `1`,
          name: searchString ? searchString : '',
        },
      });
    }
  };

  return (
    <div className={styles.paginationSection} data-testid="pagination">
      <button
        className={`${styles.paginationButton} ${
          currentPage === 1 && 'disabledButton'
        }`}
        onClick={handleClickPrevPage}
        disabled={currentPage === 1}
        data-testid="button-prev-page"
      >{`<`}</button>
      <h4 className="paginationPage">
        {currentPage} / {allPage ? allPage : currentPage}
      </h4>
      <button
        className={`${styles.paginationButton} ${
          currentPage === allPage && 'disabledButton'
        }`}
        onClick={handleClickNextPage}
        disabled={currentPage === allPage}
        data-testid="button-next-page"
      >{`>`}</button>
      <input
        type="text"
        className={styles.pageInput}
        max={20}
        placeholder="max 20 per page"
        onChange={handlePerPageChanges}
        onKeyUp={handlerKeyUp}
      ></input>
    </div>
  );
}
