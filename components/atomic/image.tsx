import React from 'react';
import NextImage from 'next/image';
import { imageType } from 'types/components/image.type';

function Image({ src, alt, className, width, height, priority }:imageType) {
  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      priority={priority}
    />
  );
}

export default Image;
