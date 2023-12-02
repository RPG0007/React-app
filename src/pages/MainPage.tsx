// import styles from '../styles/form.module.css';
import { Link } from 'react-router-dom';
// import { useAppSelector } from '../store/store';

const MainPage = () => {
  // const data = useAppSelector((store) => {
  //   store.data;
  // });
  return (
    <>
      <p>Choose the form:</p>
      <nav>
        <Link to="/hookForm">Hook form</Link>
        <Link to="/uncontrolledForm">Uncontrolled form</Link>
      </nav>
    </>
  );
};
export default MainPage;
