import { useState, useRef, useEffect, Fragment, ReactElement } from 'react';
import { Inter } from '@next/font/google';
import styles from '../styles/Login.module.css';
import regStyles from '../styles/Register.module.css';
import Header from '../components/atomic/header';
import LoginForm from '../components/molecules/loginForm';
import LoginHero from '../components/molecules/hero';
import RegisterForm from 'components/molecules/registerForm';
import { GetServerSideProps } from 'next';
import registerService from 'services/register.service';

const inter = Inter({ subsets: ['latin'] });

function Login(props:any) {
  const [regState, setRegState] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeOutRef: any = useRef();

  useEffect(() => {
    window.removeEventListener('resize', resizeHandler);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  });

  const resizeHandler = () => {
    setIsMobile(window.innerWidth < 768);
    handleResizing();
  };

  const handleResizing = () => {
    setWindowWidth(0);
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setWindowWidth(window.innerWidth);
      clearTimeout(timeOutRef.current);
    }, 500);
  };

  return (
    <>
      <Header />
      {!regState ? (
        <main className={styles.main}>
          {isMobile ? '' : <LoginHero />}
          <LoginForm setRegState={setRegState} regState={regState} />
        </main>
      ) : (
        <main className={regStyles.main}>
          {isMobile ? '' : <LoginHero />}
          <RegisterForm setRegState={setRegState} regState={regState} countryList={props.country} />
        </main>
      )}
    </>
  );
}

Login.getLayout = (page: ReactElement) => {
  return page;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const countryList = registerService.getCountryCode();
  const country = await countryList;
  return {
    props: {
      country
    },
  };
};

export default Login;
