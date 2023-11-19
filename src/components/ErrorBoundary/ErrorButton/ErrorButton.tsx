import { useState } from 'react';
import styles from './ErrorButton.module.css';

export default function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Custom error');
  }

  function handlerClick() {
    setHasError(true);
  }

  return (
    <button onClick={handlerClick} className={styles['error-button']}>
      Error button
    </button>
  );
}
