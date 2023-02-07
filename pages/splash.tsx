import React, { ReactElement, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Header from 'components/atomic/header';
import SplashScreen from 'components/organisms/splashScreen';
import { imgMsg } from 'static';
import { ImageElem } from 'components/assets/images';

function Splash() {
  const router = useRouter();
  const session: any = useSession();
  const [index, setIndex] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const [imageSource, setImageSource] = useState(ImageElem[index]);
  const [imageText, setImageText] = useState(imgMsg[index]);
  const [name, setName] = useState('');

  useEffect(() => {
    if (session.status === 'authenticated') {
      setName(session.data?.user?.firstName);
      localStorage.setItem('accessToken', session?.data.token);
      const intervals = setInterval(() => {
        setIndex((index) => index + 1);
        setImageText(imgMsg[index]);
        setImageSource(ImageElem[index]);
      }, 1500);
      return () => {
        clearInterval(intervals);
        setNextPage(true);
      };
    }
  }, [index, session]);

  useEffect(() => {
    if (session.status === 'authenticated' && nextPage) {
      const timeout = setTimeout(() => {
        router.push('/dashboard');
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [nextPage, session]);

  return (
    <>
      <Header />
      <div className='bg-white min-h-screen flex justify-center items-center'>
        <SplashScreen
          imageClass='mt-10 rounded-lg'
          imageWidth={''}
          imageHeight={''}
          imageText={imageText}
          paraImageClass={
            'text-center text-sm w-full text-gray-600 font-normal tracking-tight font-serif'
          }
          paraText={`Hi ${name}, Welcome to FinInspect`}
          paraClass='text-center text-3xl w-full text-gray-600 font-bold tracking-wide font-serif'
          imageSrc={imageSource}
        />
      </div>
    </>
  );
}

Splash.getLayout = (page: ReactElement) => {
  return page;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session: any = await getSession(context);
  if (!session?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Splash;
