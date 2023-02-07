import React from 'react';
import Paragraph from 'components/atomic/paragraph';
import Image from 'components/atomic/image';

function SplashScreen({
  imageClass,
  imageWidth,
  imageHeight,
  paraClass,
  imageText,
  paraText,
  imageSrc,
  paraImageClass
}: any) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Paragraph className={paraClass} text={paraText} />
      <Image
        src={imageSrc}
        className={imageClass}
        width={imageWidth}
        height={imageHeight}
        alt={'splash'}
        priority={true}
      />
      <Paragraph className={paraImageClass} text={imageText} />
    </div>
  );
}

export default SplashScreen;
