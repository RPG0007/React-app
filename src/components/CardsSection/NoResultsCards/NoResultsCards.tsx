import noResultsImg from '../../../assets/no-results.png';
import Image from 'next/image';
import React from 'react';

export default function NoResultsCards() {
  return (
    <div className="noResultsWrapper">
      <Image
        src={noResultsImg}
        width={300}
        height={200}
        alt="no results cards"
      ></Image>
      <h3 className="title">Unfortunately, no suitable result was found</h3>
    </div>
  );
}
