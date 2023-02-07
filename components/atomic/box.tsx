import React from 'react';
import styles from '../../styles/components/Box.module.css';
import { BoxElementType } from '../../types/components/box.type';

function Box({ children, classes }: BoxElementType) {
  return (
    <div className={`${styles.box} ${classes || ''}`}>
      {children}
    </div>
  );
}

export default Box;
