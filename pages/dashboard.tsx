import React, { ReactElement, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';

import NavIcon from 'components/assets/icons/navIcon';
import NavMenu from 'components/molecules/navMenu';
import Navbar from 'components/organisms/dashboard/navbar';
import SideBar from 'components/organisms/dashboard/sidebar';
import Main from 'components/organisms/dashboard/main';
import Header from 'components/atomic/header';
import DropdownMenu from 'components/molecules/dropdownMenu';

function Dashboard() {
  const session: any = useSession();

  useEffect(() => {
    if (session.status !== 'authenticated') {
      localStorage.setItem('accessToken', session?.data?.token);
      router.push('/');
    }
  }, [session]);

  useEffect(() => {
    window.history.pushState(null, '', router.asPath);
    window.onpopstate = () => {
      window.history.pushState(null, '', router.asPath);
    };
  }, []);

  return (
    <>
      <Header />
      <div className='bg-white min-h-screen'>
        <Navbar
          className=''
          navIcon={<NavIcon />}
          navMenu={<NavMenu />}
          dropdownMenu={<DropdownMenu />}
        />
        <div className='grid grid-cols-5'>
          <SideBar className='col-span-1' />
          <Main className='col-span-4' />
        </div>
      </div>
    </>
  );
}

Dashboard.getLayout = (page: ReactElement) => {
  return page;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session: any = await getSession(context);
  // console.log('session dashboard', session);
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

export default Dashboard;
