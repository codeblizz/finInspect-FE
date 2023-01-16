import { GetServerSideProps } from 'next';
import React, { ReactElement } from 'react';

function Dashboard() {
  return <div className='bg-white flex flex-col justify-center items-center'>Dashboard</div>;
}

Dashboard.getLayout = (page: ReactElement) => {
  return page;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default Dashboard;
