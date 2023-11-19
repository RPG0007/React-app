import styles from './Card.module.css';
import { ICard } from '../../../types/interfaces';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

export default function Card({
  img,
  name,
  species,
  gender,
  status,
  id,
  getCardModalDescription,
}: ICard) {
  const [, setSearchParams] = useSearchParams();
  const searchString = useAppSelector((state) => state.mainPage.searchString);
  const currentPage = useAppSelector((state) => state.mainPage.currentPage);

  function handlerClick() {
    getCardModalDescription(id);
    setSearchParams({
      name: searchString,
      page: `${currentPage}`,
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
