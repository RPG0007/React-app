import './Pagination.css';
import { IPagination } from '../../types/interfaces';
import { Context } from '../../context/context';
import { useContext } from 'react';

export default function Pagination({
  currentPage,
  allPage,
  doChangeForUseEffect,
  setPerpage,
}: IPagination) {
  const { setClickedButtonFuturePage } = useContext(Context);

  const handleClickPrevPage = () => {
    setClickedButtonFuturePage('prev');
    doChangeForUseEffect();
  };

  const handleClickNextPage = () => {
    setClickedButtonFuturePage('next');
    doChangeForUseEffect();
  };

  function handlePerPageChanges(event: React.ChangeEvent<HTMLInputElement>) {
    setPerpage(parseInt(event.target.value));
  }
  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    return event.code === 'Enter' && doChangeForUseEffect();
  }

  return (
    <div className="pagination-section">
      <button
        className={
          currentPage === 1
            ? 'pagination-button disabled-button'
            : 'pagination-button'
        }
        onClick={handleClickPrevPage}
        disabled={currentPage === 1}
        data-testid="button-prev-page"
      >{`<`}</button>
      <h4 className="pagination-page">
        {currentPage} / {allPage ? allPage : currentPage}
      </h4>
      <button
        className={
          currentPage === allPage
            ? 'pagination-button disabled-button'
            : 'pagination-button'
        }
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
