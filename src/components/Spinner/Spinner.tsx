import spinner from '../../assets/spinner.svg';
import Image from 'next/image';
import React from 'react';

export default function Spinner() {
  return (
    <Image src={spinner} alt="spinner loading" width={150} height={150} data-testid="spinner"></Image>
  );
}
