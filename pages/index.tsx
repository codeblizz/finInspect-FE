import { Inter } from '@next/font/google';
import styles from '../styles/Login.module.css';
import Header from '../components/atomic/header';
import LoginForm from '../components/molecules/loginForm';
import LoginHero from '../components/molecules/hero';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <LoginHero />
        <LoginForm />
      </main>
    </>
  );
}
