import styles from './Card.module.css';

interface ICardProps {
  img: string;
  name: string;
  species: string;
  gender: string;
  status: string;
  id: string;
  setModalActive(setState: boolean): void;
  getCardDescription(id: string): void;
}

export default function Card({
  img,
  name,
  species,
  gender,
  status,
  id,
  setModalActive,
  getCardDescription,
}: ICardProps) {
  function handlerClick() {
    setModalActive(true);
    getCardDescription(id);
  }

  return (
    <div className={styles.card} onClick={handlerClick}>
      <img src={img} alt="image character"></img>
      <h2>{name}</h2>
      <h4>{`species: ${species}`}</h4>
      <h4>{`gender: ${gender}`}</h4>
      <h4>{`status: ${status}`}</h4>
    </div>
  );
}
