import styles from './Card.module.css';
import { ICard } from '../../../types/interfaces';
import { useContext } from 'react';
import { Context } from '../../../context/context';

export default function Card({
  img,
  name,
  species,
  gender,
  status,
  id,
  getCardModalDescription,
}: ICard) {
  const { setModalActive } = useContext(Context);
  function handlerClick() {
    setModalActive(true);
    getCardModalDescription(id);
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
