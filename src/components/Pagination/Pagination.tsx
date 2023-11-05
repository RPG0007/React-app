import './Pagination.css';

interface IPaginationProps {
  currentPage: number;
  allPage: number | null;
  goToNextPage(): void;
  goToPrevPage(): void;
  handlePerPageChange(perpage: number): void;
  newSearch(searchString: string): void;
  searchString: string;
}

export default function Pagination({
  currentPage,
  allPage,
  goToNextPage,
  goToPrevPage,
  handlePerPageChange,
  newSearch,
  searchString,
}: IPaginationProps) {
  function handlePerPageChanges(event: React.ChangeEvent<HTMLInputElement>) {
    handlePerPageChange(parseInt(event.target.value));
  }

  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    return event.code === 'Enter' && newSearch(searchString);
  }
  return (
    <div className="pagination-section">
      <button
        className={
          currentPage === 1
            ? 'pagination-button disabled-button'
            : 'pagination-button'
        }
        onClick={goToPrevPage}
        disabled={currentPage === 1}
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
        onClick={goToNextPage}
        disabled={currentPage === allPage}
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
