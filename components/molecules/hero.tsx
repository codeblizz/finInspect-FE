import React, { useEffect, useRef, useState } from 'react';
import Image from '../atomic/image';
import { ImageElem, ImageDesc } from '../assets/images';
import styles from '../../styles/Login.module.css';
import Box from '../atomic/box';
import classNames from 'classnames';
import { BsDot } from 'react-icons/bs';
import Paragraph from 'components/atomic/paragragh';

function Hero() {
  const [index, setIndex] = useState(0);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((index + 1) % ImageElem.length);
    }, 4000);
    return () => {
      resetTimeout();
    };
  }, [ImageElem, index]);

  return (
    <Box
      classes={classNames([
        styles.loginHero,
        '-mt-3 border-r-2 border-teal-900 flex flex-col',
      ])}
    >
      <Image
        src={ImageElem[index]}
        alt='hero'
        className='rounded-lg -ml-10'
        width={''}
        height={''}
        priority={true}
      />
      <div className='flex flex-col justify-center items-center'>
        <Paragraph className='text-[9px] -ml-5 my-2' text={ImageDesc[`${index + 1 % ImageDesc.length}`]} />
        <div className=''>
          <ul className='flex -ml-10'>
            {ImageElem.map((img, i) => (
              <li
                key={i}
                className={`${index === i ? 'text-white' : 'text-gray-500'}`}
              >
                <BsDot onClick={() => setIndex(i)} className='cursor-pointer'/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Box>
  );
}

export default Hero;
