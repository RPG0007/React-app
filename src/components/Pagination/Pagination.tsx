import './Pagination.css';
import { IPaginationProps } from '../../types/interfaces';
import { Context } from '../../context/context';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as constants from '../../constants/constants';

export default function Pagination({
  currentPage,
  allPage,
  linkNextPage,
  linkPrevPage,
  handlePerPageChange,
  numPerPage,
}: IPaginationProps) {
  const newSearch = async (searchString: string) => {
    setSearchParams({ name: searchString, page: `1` });
    try {
      const response = await fetch(
        `${constants.BASE_URL}${
          searchString ? `?name=${searchString}&page=1` : `?page=1`
        }`
      );
      const data = await response.json();

      setCards(data.results.slice(0, numPerPage));
      setIsLoading(false);
      setLinkPrevPage(data.info.prev);
      setLinkNextPage(data.info.next);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };
  function handlePerPageChanges(event: React.ChangeEvent<HTMLInputElement>) {
    handlePerPageChange(parseInt(event.target.value));
  }
  function handlerKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    return event.code === 'Enter' && newSearch(searchString);
  }
  const {
    searchString,
    setIsLoading,
    setCards,
    setCurrentPage,
    setLinkNextPage,
    setLinkPrevPage,
  } = useContext(Context);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const movePage = async (stringFuturePage: 'next' | 'prev') => {
    setIsLoading(true);

    const pageFutureNumbers =
      stringFuturePage === 'next' ? currentPage + 1 : currentPage - 1;
    const pageFutureLink =
      stringFuturePage === 'next' ? linkNextPage : linkPrevPage;

    setSearchParams({ name: searchString, page: `${pageFutureNumbers}` });
    try {
      const response = await fetch(`${pageFutureLink}`);
      const data = await response.json();

      setCards(data.results.slice(0, numPerPage));
      setIsLoading(false);
      setLinkPrevPage(data.info.prev);
      setLinkNextPage(data.info.next);
      setCurrentPage(pageFutureNumbers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPrevPage = () => {
    movePage('prev');
  };

  const handleClickNextPage = () => {
    movePage('next');
  };

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
