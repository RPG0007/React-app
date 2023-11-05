import './Pagination.css';

interface IPaginationProps {
  currentPage: number;
  allPage: number | null;
  goToNextPage(): void;
  goToPrevPage(): void;
}

export default function Pagination({
  currentPage,
  allPage,
  goToNextPage,
  goToPrevPage,
}: IPaginationProps) {
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
    </div>
  );
}
