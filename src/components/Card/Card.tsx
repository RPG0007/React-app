import styles from './Card.module.css';

interface ICardProps {
  img: string;
  name: string;
  species: string;
  gender: string;
  status: string;
}

export default function Card({
  img,
  name,
  species,
  gender,
  status,
}: ICardProps) {
  return (
    <div className={styles.card}>
      <img src={img} alt="image character"></img>
      <h2>{name}</h2>
      <h4>{`species: ${species}`}</h4>
      <h4>{`gender: ${gender}`}</h4>
      <h4>{`status: ${status}`}</h4>
    </div>
  );
}
