import './Error404.css';
import error404Img from '../../../assets/404-error.jpg';

export default function Error404() {
  return (
    <img
      src={error404Img}
      alt="404-error img"
      className="error-404-img"
      data-testid="404-error-page"
    ></img>
  );
}
