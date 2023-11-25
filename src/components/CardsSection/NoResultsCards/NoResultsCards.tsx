import noResultsImg from '../../../assets/no-results.png';
import Image from 'next/image';

export default function NoResultsCards() {
  return (
    <div className="noResultsWrapper">
      <Image src={noResultsImg} alt="no results cards"></Image>
      <h3 className="title">Unfortunately, no suitable result was found</h3>
    </div>
  );
}
