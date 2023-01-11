import React from 'react';
import styles from '../../styles/components/Paragraph.module.css';

const Paragraph = ({ text, className, ...rest }: any) => {
  return (
    <p className={`${className || ''}` || `${styles.main}`} {...rest}>
      {text}
    </p>
  );
};

export default Paragraph;
