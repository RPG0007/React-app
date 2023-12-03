import { Link } from 'react-router-dom';
import styles from '../../styles/form.module.css';

const SubmitBtn = ({ isValid }: { isValid: boolean }) => {
  return (
    <>
      <div>
        {isValid ? (
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        ) : (
          <button type="submit" className={styles.submitBtn} disabled>
            Submit
          </button>
        )}
      </div>
      <Link to="/" className={styles.smallLink}>
        Go to main page
      </Link>
    </>
  );
};
export default SubmitBtn;
