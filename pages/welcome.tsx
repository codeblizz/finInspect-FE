import React, { ReactElement } from 'react';
import WelcomeScreen from 'components/molecules/WelcomeScreen';
import { GetServerSideProps } from 'next';
import Header from 'components/atomic/header';
import styles from 'styles/Welcome.module.css';

function Welcome() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <WelcomeScreen />
      </main>
    </>
  );
}

Welcome.getLayout = (page: ReactElement) => {
  return page;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default Welcome;
