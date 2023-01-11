import React from 'react';
import Image from '../atomic/image';
import { ImageElem } from '../assets/images';
import styles from '../../styles/Login.module.css';
import Box from '../atomic/box';

function Hero() {
  return (
    <Box classes={styles.loginHero}>
      {ImageElem.map((val, index): any => (
        <Image
          key={index}
          src={val.img}
          alt='hero'
          className=''
          width={''}
          height={''}
          priority={true}
        />
      ))}
    </Box>
  );
}

export default Hero;
