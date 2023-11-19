import styles from './Card.module.css';
import { ICard } from '../../../types/interfaces';
import { useSearchParams } from 'react-router-dom';

export default function Card({
  img,
  name,
  species,
  gender,
  status,
  id,
  getCardModalDescription,
}: ICard) {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryStringSearch: string | null = searchParams.get('name');
  const initSearchString: string = queryStringSearch ? queryStringSearch : '';

  const queryStringPage: string | null = searchParams.get('page');
  const initSearchPage: number =
    queryStringPage && +queryStringPage > 0 ? +queryStringPage : 1;

  function handlerClick() {
    getCardModalDescription(id);
    setSearchParams({
      name: initSearchString,
      page: `${initSearchPage}`,
      card: `${id}`,
    });
  }

  return (
    <div className={styles.card} onClick={handlerClick} data-testid="card">
      <img src={img} alt="image character"></img>
      <h2>{name}</h2>
      <h4>{`species: ${species}`}</h4>
      <h4>{`gender: ${gender}`}</h4>
      <h4>{`status: ${status}`}</h4>
    </div>
  );
}
