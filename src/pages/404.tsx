import error404Img from '@/assets/404-error.jpg';
import React from 'react';
import Image from 'next/image';
export default function Custom404() {
  return (
    <Image
      src={error404Img}
      height={600}
      width={300}
      alt="404-error img"
      className="error404img"
      data-testid="404-error-page"
    ></Image>
  );
}
