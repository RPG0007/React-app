import styles from './Card.module.css';
import React from 'react';
import { ICard } from '../../../types/interfaces';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Card({
  img,
  name,
  species,
  gender,
  status,
  id,
}: ICard) {
  const router = useRouter();
  const pathname = usePathname();
  const { page } = router.query;

  function handlerClick() {
    router.push(
      `${pathname}details/${id}?page=${page ? page : '1'}&name=${
        router.query.name ? router.query.name : ''
      }`
    );
  }

  return (
    <div className={styles.card} onClick={handlerClick} data-testid="card">
      <img src={img} className={styles.cardImg} alt="image character"></img>
      <h2>{name}</h2>
      <h4>{`species: ${species}`}</h4>
      <h4>{`gender: ${gender}`}</h4>
      <h4>{`status: ${status}`}</h4>
    </div>
  );
}
