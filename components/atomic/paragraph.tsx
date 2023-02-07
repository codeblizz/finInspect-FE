import React from 'react';
import styles from '../../styles/components/Paragraph.module.css';

const Paragraph = ({ text, textLink, className, ...rest }: any) => {
  return (
    <p className={`${className || ''}` || `${styles.main}`} {...rest}>
      {text}
      {textLink ? (<a rel="noreferrer" target={'_blank'} href={`mailto:${textLink}`}><strong>{textLink}</strong></a>) : null}
    </p>
  );
};

export default Paragraph;
