import styles from '../styles/main.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { setLastElement } from '../store/reducers/dataSlice';
import FormFields from '../components/FormFields';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.data);

  useEffect(() => {
    if (data.length > 0) {
      const timeoutId = setTimeout(() => {
        dispatch(setLastElement({ boxShadow: '' }));
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [data]);

  return (
    <>
      <h1>Choose Form Type:</h1>
      <nav>
        <Link to="/hookForm" className={styles.link}>
          Hook form
        </Link>
        <Link to="/uncontrolledForm" className={styles.link}>
          Uncontrolled form
        </Link>
      </nav>
      {data.length ? (
        data.map((el, i) => {
          return <FormFields key={i} el={el} i={i} highlightedIndex={0} />;
        })
      ) : (
        <div className={styles.emptyBlock}>
          <div>
            <h2>No data yet.</h2>
            <h3>Select the form and fill it out with your information.</h3>
          </div>
        </div>
      )}
    </>
  );
};
export default MainPage;
