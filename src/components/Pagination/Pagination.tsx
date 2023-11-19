import './Pagination.css';
import { useSearchParams } from 'react-router-dom';
import { changeCurrentPage } from '../../store/mainPageSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changenumPerpage } from '../../store/mainPageSlice';
import { useState } from 'react';

export default function Pagination() {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const perpagenumber = useAppSelector((state) => state.mainPage.numPerpage);
  const [prevPerpagenumber, setppn] = useState(20);
  const searchString = useAppSelector((state) => state.mainPage.searchString);
  const allPage = useAppSelector((state) => state.mainPage.allPage);
  const currentPage = useAppSelector((state) => state.mainPage.currentPage);
  const handleClickPrevPage = () => {
    dispatch(changeCurrentPage(currentPage - 1));
    setSearchParams({
      name: searchString,
      page: `${currentPage - 1}`,
    });
  };

  const handleClickNextPage = () => {
    dispatch(changeCurrentPage(currentPage + 1));
    setSearchParams({
      name: searchString,
      page: `${currentPage + 1}`,
    });
  };

  function handlePerPageChanges(event: React.ChangeEvent<HTMLInputElement>) {
    setppn(parseInt(event.target.value));
  }
  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      dispatch(changenumPerpage(prevPerpagenumber));
      console.log(perpagenumber);
    }
  };

  return (
    <div className="pagination-section">
      <button
        className={`pagination-button ${
          currentPage === 1 && 'disabled-button'
        }`}
        onClick={handleClickPrevPage}
        disabled={currentPage === 1}
        data-testid="button-prev-page"
      >{`<`}</button>
      <h4 className="pagination-page">
        {currentPage} / {allPage ? allPage : currentPage}
      </h4>
      <button
        className={`pagination-button ${
          currentPage === allPage && 'disabled-button'
        }`}
        onClick={handleClickNextPage}
        disabled={currentPage === allPage}
        data-testid="button-next-page"
      >{`>`}</button>
      <input
        type="text"
        className={'page-input'}
        max={20}
        placeholder="max 20 per page"
        onChange={handlePerPageChanges}
        onKeyUp={handlerKeyUp}
      ></input>
    </div>
  );
}
