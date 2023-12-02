// import styles from '../styles/form.module.css';
import { Link } from 'react-router-dom';

const MainPage = () => {
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
