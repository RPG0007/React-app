import { Link } from 'react-router-dom';
import styles from '../../styles/form.module.css';

const SubmitBtn = () => {
  return (
    <>
      <div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </div>
      <Link className={styles.smallLink} to="/">
        Go to main page
      </Link>
    </>
  );
};
export default SubmitBtn;
