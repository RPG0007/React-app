import { useAppSelector } from '../store/store';
import { ISubmitForm } from '../types/types';
import styles from '../styles/main.module.css';

const FormFields = ({
  el,
  i,
  key,
  highlightedIndex,
}: {
  el: ISubmitForm;
  i: number;
  key: number | undefined;
  highlightedIndex: number;
}) => {
  const borderStyle = useAppSelector((store) => store.borderStyle);

  return (
    <>
      <div
        key={key}
        className={styles.card}
        style={highlightedIndex === i ? borderStyle : {}}
      >
        <div className={styles.content}>
          <p className={styles.cardField}>
            <b>Name:</b> {el.name}
          </p>
          <p className={styles.cardField}>
            <b>Age:</b> {el.age}
          </p>
          <p className={styles.cardField}>
            <b>Gender: </b>
            {el.gender}
          </p>
          <p className={styles.cardField}>
            <b>Country:</b> {el.country}
          </p>
          <p className={styles.cardField}>
            <b>Email:</b> {el.email}
          </p>
          <p className={styles.cardField}>
            <b>Password:</b> {el.password}
          </p>
          <p className={styles.cardField}>
            <b>Password confirmation:</b> {el.confirmPassword}
          </p>
          <p className={styles.cardField}>
            <b>Accepted ToS:</b> {String(el.accept)}
          </p>
        </div>
        <div className={styles.imgBlock}>
          <img src={el.picture} alt="photo" />
        </div>
      </div>
    </>
  );
};
export default FormFields;
