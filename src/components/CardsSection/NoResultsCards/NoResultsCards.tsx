import './NoResultsCards.css';
import noResultsImg from '../../../assets/no-results.png';

export default function NoResultsCards() {
  return (
    <div className="no-results-wrapper">
      <img src={noResultsImg} alt="no results cards"></img>
      <h3 className="title">Unfortunately, no suitable result was found</h3>
    </div>
  );
}
